const CANADA_PROVINCES = new Set(['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']);
const US_STATES = new Set([
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
]);
const GEOCODE_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const WEBSITE_ENRICH_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const WEBSITE_VERIFY_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
let websiteEnrichRequestsThisRun = 0;
let websiteEnrichWindowStartedAt = 0;
const WEBSITE_ENRICH_MAX_PER_RUN = 20;
let websiteVerifyRequestsThisRun = 0;
let websiteVerifyWindowStartedAt = 0;
const WEBSITE_VERIFY_MAX_PER_RUN = 30;

function normalizeCityInput(input: string) {
    return input.replace(/\s+/g, ' ').trim();
}

function inferCountryFromRegion(cityInput: string): { countryCode: 'ca' | 'us' | null; normalizedQuery: string; cacheKey: string } {
    const normalized = normalizeCityInput(cityInput);
    const parts = normalized.split(',').map(p => p.trim()).filter(Boolean);
    const regionRaw = parts.length >= 2 ? parts[1] : '';
    const region = regionRaw.toUpperCase().replace(/\./g, '');

    let countryCode: 'ca' | 'us' | null = null;
    if (CANADA_PROVINCES.has(region)) countryCode = 'ca';
    else if (US_STATES.has(region)) countryCode = 'us';

    const cacheKey = `${normalized.toLowerCase()}|${countryCode || 'any'}`;
    return { countryCode, normalizedQuery: normalized, cacheKey };
}

async function ensureGeocodeCacheTable(env?: any) {
    if (!env?.DB?.prepare) return;
    await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS geocode_cache (
            key TEXT PRIMARY KEY,
            lat REAL NOT NULL,
            lon REAL NOT NULL,
            bbox TEXT,
            updated_at INTEGER NOT NULL
        )
    `).run().catch(() => null);
}

async function ensureWebsiteEnrichCacheTable(env?: any) {
    if (!env?.DB?.prepare) return;
    await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS website_enrich_cache (
            key TEXT PRIMARY KEY,
            website TEXT,
            checked_at INTEGER NOT NULL
        )
    `).run().catch(() => null);
}

async function ensureWebsiteVerifyCacheTable(env?: any) {
    if (!env?.DB?.prepare) return;
    await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS website_verify_cache (
            key TEXT PRIMARY KEY,
            verified_status TEXT NOT NULL,
            final_url TEXT,
            checked_at INTEGER NOT NULL
        )
    `).run().catch(() => null);
}

async function getCachedGeocode(env: any, cacheKey: string) {
    if (!env?.DB?.prepare) return null;
    await ensureGeocodeCacheTable(env);
    const { results } = await env.DB.prepare(
        `SELECT lat, lon, bbox, updated_at FROM geocode_cache WHERE key = ? LIMIT 1`
    ).bind(cacheKey).all();
    if (!results.length) return null;
    const row = results[0];
    const updatedAt = Number(row.updated_at || 0);
    if (!updatedAt || (Date.now() - updatedAt) > GEOCODE_CACHE_TTL_MS) return null;
    return {
        lat: Number(row.lat),
        lon: Number(row.lon),
        bbox: row.bbox || null
    };
}

async function setCachedGeocode(env: any, cacheKey: string, lat: number, lon: number, bbox: string | null) {
    if (!env?.DB?.prepare) return;
    await ensureGeocodeCacheTable(env);
    await env.DB.prepare(`
        INSERT INTO geocode_cache (key, lat, lon, bbox, updated_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET
            lat=excluded.lat,
            lon=excluded.lon,
            bbox=excluded.bbox,
            updated_at=excluded.updated_at
    `).bind(cacheKey, lat, lon, bbox, Date.now()).run().catch(() => null);
}

async function geocodeCity(cityInput: string, env?: any) {
    const { countryCode, normalizedQuery, cacheKey } = inferCountryFromRegion(cityInput);
    const cached = await getCachedGeocode(env, cacheKey);
    if (cached) {
        return { ...cached, countryCode, query: normalizedQuery, cacheHit: true };
    }

    const nomUrl = new URL('https://nominatim.openstreetmap.org/search');
    nomUrl.searchParams.set('format', 'jsonv2');
    nomUrl.searchParams.set('q', normalizedQuery);
    nomUrl.searchParams.set('limit', '1');
    nomUrl.searchParams.set('addressdetails', '1');
    if (countryCode) nomUrl.searchParams.set('countrycodes', countryCode);

    let lastErr = 'Geocode request failed';
    for (let attempt = 0; attempt < 3; attempt++) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000 + (attempt * 2000));
        try {
            const res = await fetch(nomUrl.toString(), {
                headers: {
                    'User-Agent': 'Axiom-Intel/1.0 (internal research tool)',
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timeout);

            if (res.status === 403 || res.status === 429) {
                const retryAfter = res.headers.get('Retry-After');
                throw new Error(`Geocode blocked/rate-limited: status=${res.status}, retry_after=${retryAfter || 'n/a'}`);
            }
            if (res.status >= 500) {
                lastErr = `Geocode upstream error: status=${res.status}`;
                if (attempt < 2) {
                    await new Promise(r => setTimeout(r, 400 * (attempt + 1)));
                    continue;
                }
                throw new Error(lastErr);
            }
            if (!res.ok) {
                throw new Error(`Geocoding failed: status=${res.status}`);
            }

            const nomData: any[] = await res.json();
            if (nomData.length === 0) {
                throw new Error(`Geocode returned no results for q=${normalizedQuery}, country=${countryCode || 'none'}`);
            }
            const lat = parseFloat(nomData[0].lat);
            const lon = parseFloat(nomData[0].lon);
            if (isNaN(lat) || isNaN(lon)) throw new Error('Geocoding failed: invalid coordinates returned');
            const bbox = Array.isArray(nomData[0].boundingbox) ? JSON.stringify(nomData[0].boundingbox) : null;
            await setCachedGeocode(env, cacheKey, lat, lon, bbox);
            return { lat, lon, bbox, countryCode, query: normalizedQuery, cacheHit: false };
        } catch (e: any) {
            clearTimeout(timeout);
            if (e?.name === 'AbortError') {
                lastErr = 'Geocoding failed: request timed out';
            } else {
                lastErr = e?.message || 'Geocode request failed';
                if ((String(lastErr).includes('status=429') || String(lastErr).includes('Geocode upstream error')) && attempt < 2) {
                    await new Promise(r => setTimeout(r, 400 * (attempt + 1)));
                    continue;
                }
            }
            if (attempt === 2) throw new Error(lastErr);
        }
    }

    throw new Error(lastErr);
}

function craftTypeForNiche(niche: string) {
    const n = niche.toLowerCase().replace(/[^a-z_ ]/g, '').slice(0, 64);
    let craftType = n.replace(/\s+/g, '_');
    if (n.includes('hvac')) craftType = 'hvac';
    else if (n.includes('plumb')) craftType = 'plumber';
    else if (n.includes('electric')) craftType = 'electrician';
    else if (n.includes('roof')) craftType = 'roofer';
    else if (n.includes('paint')) craftType = 'painter';
    else if (n.includes('landscap')) craftType = 'gardener';
    else if (n.includes('clean')) craftType = 'cleaning';
    return craftType;
}

function websiteFromTags(tags: any): string | null {
    if (!tags) return null;
    return tags.website || tags['contact:website'] || tags.url || tags['contact:url'] || tags['brand:website'] || tags['operator:website'] || null;
}

function emailFromTags(tags: any): string | null {
    if (!tags) return null;
    const raw = tags.email || tags['contact:email'] || tags['operator:email'] || null;
    if (!raw) return null;
    const match = String(raw).match(/\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/i);
    return match?.[1]?.toLowerCase() || null;
}

function normalizeWebsiteUrl(input?: string | null): string | null {
    if (!input) return null;
    let raw = String(input).trim();
    if (!raw) return null;
    raw = raw.replace(/\s+/g, '');
    if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
    try {
        const u = new URL(raw);
        u.protocol = 'https:';
        u.hash = '';
        if (u.pathname.endsWith('/') && u.pathname !== '/') {
            u.pathname = u.pathname.replace(/\/+$/, '');
        }
        return u.toString().replace(/\/$/, (u.pathname === '/' ? '/' : ''));
    } catch {
        return null;
    }
}

async function getWebsiteEnrichCache(env: any, key: string) {
    if (!env?.DB?.prepare) return null;
    await ensureWebsiteEnrichCacheTable(env);
    const { results } = await env.DB.prepare(
        `SELECT website, checked_at FROM website_enrich_cache WHERE key = ? LIMIT 1`
    ).bind(key).all();
    if (!results.length) return null;
    const row = results[0];
    const checkedAt = Number(row.checked_at || 0);
    if (!checkedAt || (Date.now() - checkedAt) > WEBSITE_ENRICH_CACHE_TTL_MS) return null;
    return { website: row.website ? String(row.website) : null, checkedAt };
}

async function setWebsiteEnrichCache(env: any, key: string, website: string | null) {
    if (!env?.DB?.prepare) return;
    await ensureWebsiteEnrichCacheTable(env);
    await env.DB.prepare(`
        INSERT INTO website_enrich_cache (key, website, checked_at)
        VALUES (?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET website=excluded.website, checked_at=excluded.checked_at
    `).bind(key, website, Date.now()).run().catch(() => null);
}

function resetWebsiteEnrichBudgetWindowIfNeeded() {
    const now = Date.now();
    if (!websiteEnrichWindowStartedAt || (now - websiteEnrichWindowStartedAt) > 60000) {
        websiteEnrichWindowStartedAt = now;
        websiteEnrichRequestsThisRun = 0;
    }
}

function resetWebsiteVerifyBudgetWindowIfNeeded() {
    const now = Date.now();
    if (!websiteVerifyWindowStartedAt || (now - websiteVerifyWindowStartedAt) > 60000) {
        websiteVerifyWindowStartedAt = now;
        websiteVerifyRequestsThisRun = 0;
    }
}

function searchKeyFromBusiness(business: any) {
    const parts = [
        String(business?.name || '').trim(),
        String(business?.address || '').trim(),
        String(business?.city_hint || business?.city || '').trim()
    ].filter(Boolean);
    return parts.join(', ').replace(/\s+/g, ' ').trim();
}

function inferWebsiteFromEmail(email?: string | null) {
    const value = String(email || '').trim().toLowerCase();
    const parts = value.split('@');
    if (parts.length !== 2) return null;
    const domain = parts[1] || '';
    if (!domain || domain.includes('gmail.com') || domain.includes('yahoo.') || domain.includes('hotmail.') || domain.includes('outlook.')) {
        return null;
    }
    return normalizeWebsiteUrl(`https://${domain}`);
}

async function enrichWebsiteFromNominatim(osmType: string, osmId: string, env?: any) {
    const typeLetter = osmType === 'way' ? 'W' : osmType === 'relation' ? 'R' : 'N';
    const cacheKey = `${typeLetter}:${osmId}`;
    const cached = await getWebsiteEnrichCache(env, cacheKey);
    if (cached) {
        return { website: normalizeWebsiteUrl(cached.website), source: cached.website ? 'nominatim' : null, cacheHit: true, attempted: true };
    }

    resetWebsiteEnrichBudgetWindowIfNeeded();
    if (websiteEnrichRequestsThisRun >= WEBSITE_ENRICH_MAX_PER_RUN) {
        return { website: null, source: null, cacheHit: false, attempted: false, error: 'website enrichment skipped: per-run cap reached' };
    }
    websiteEnrichRequestsThisRun++;

    const url = new URL('https://nominatim.openstreetmap.org/lookup');
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('osm_ids', `${typeLetter}${osmId}`);
    url.searchParams.set('extratags', '1');

    let lastError = '';
    for (let attempt = 0; attempt < 2; attempt++) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000 + attempt * 1000);
        try {
            const res = await fetch(url.toString(), {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Axiom-Intel/1.0 (website enrichment)'
                },
                signal: controller.signal
            });
            clearTimeout(timeout);

            if (res.status === 429 || res.status === 403) {
                const retryAfter = res.headers.get('Retry-After');
                lastError = `Geocode blocked/rate-limited: status=${res.status}, retry_after=${retryAfter || 'n/a'}`;
                if (res.status === 429 && attempt < 1) {
                    await new Promise(r => setTimeout(r, 500));
                    continue;
                }
                await setWebsiteEnrichCache(env, cacheKey, null);
                return { website: null, source: null, cacheHit: false, attempted: true, error: lastError };
            }
            if (res.status >= 500) {
                lastError = `Nominatim lookup failed: status=${res.status}`;
                if (attempt < 1) {
                    await new Promise(r => setTimeout(r, 400));
                    continue;
                }
                break;
            }
            if (!res.ok) {
                lastError = `Nominatim lookup failed: status=${res.status}`;
                break;
            }
            const data: any[] = await res.json();
            const extratags = data?.[0]?.extratags || data?.[0]?.tags || {};
            const found = normalizeWebsiteUrl(websiteFromTags(extratags));
            await setWebsiteEnrichCache(env, cacheKey, found);
            return { website: found, source: found ? 'nominatim' : null, cacheHit: false, attempted: true };
        } catch (e: any) {
            clearTimeout(timeout);
            lastError = e?.name === 'AbortError' ? 'Nominatim lookup timed out' : (e?.message || 'Nominatim lookup failed');
        }
    }

    return { website: null, source: null, cacheHit: false, attempted: true, error: lastError || 'Nominatim lookup failed' };
}

async function enrichWebsiteFromNominatimSearch(business: any, env?: any) {
    const searchQuery = searchKeyFromBusiness(business);
    if (!searchQuery || searchQuery.length < 4) {
        return { website: null, source: null, attempted: false };
    }
    const cacheKey = `S:${searchQuery.toLowerCase()}`;
    const cached = await getWebsiteEnrichCache(env, cacheKey);
    if (cached) {
        return { website: normalizeWebsiteUrl(cached.website), source: cached.website ? 'nominatim' : null, attempted: true, cacheHit: true };
    }

    resetWebsiteEnrichBudgetWindowIfNeeded();
    if (websiteEnrichRequestsThisRun >= WEBSITE_ENRICH_MAX_PER_RUN) {
        return { website: null, source: null, attempted: false, error: 'website enrichment skipped: per-run cap reached' };
    }
    websiteEnrichRequestsThisRun++;

    const nomUrl = new URL('https://nominatim.openstreetmap.org/search');
    nomUrl.searchParams.set('format', 'jsonv2');
    nomUrl.searchParams.set('q', searchQuery);
    nomUrl.searchParams.set('limit', '3');
    nomUrl.searchParams.set('addressdetails', '1');
    nomUrl.searchParams.set('extratags', '1');

    let lastError = '';
    for (let attempt = 0; attempt < 2; attempt++) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000 + attempt * 1000);
        try {
            const res = await fetch(nomUrl.toString(), {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Axiom-Intel/1.0 (website enrichment search)'
                },
                signal: controller.signal
            });
            clearTimeout(timeout);
            if (res.status === 429 || res.status === 403) {
                const retryAfter = res.headers.get('Retry-After');
                lastError = `Geocode blocked/rate-limited: status=${res.status}, retry_after=${retryAfter || 'n/a'}`;
                if (res.status === 429 && attempt < 1) {
                    await new Promise(r => setTimeout(r, 500));
                    continue;
                }
                await setWebsiteEnrichCache(env, cacheKey, null);
                return { website: null, source: null, attempted: true, error: lastError };
            }
            if (res.status >= 500) {
                lastError = `Nominatim search failed: status=${res.status}`;
                if (attempt < 1) {
                    await new Promise(r => setTimeout(r, 400));
                    continue;
                }
                break;
            }
            if (!res.ok) {
                lastError = `Nominatim search failed: status=${res.status}`;
                break;
            }
            const data: any[] = await res.json();
            let found: string | null = null;
            for (const row of data || []) {
                found = normalizeWebsiteUrl(
                    websiteFromTags(row?.extratags || row?.tags || {}) ||
                    websiteFromTags(row?.address || {})
                );
                if (found) break;
            }
            await setWebsiteEnrichCache(env, cacheKey, found);
            return { website: found, source: found ? 'nominatim' : null, attempted: true };
        } catch (e: any) {
            clearTimeout(timeout);
            lastError = e?.name === 'AbortError' ? 'Nominatim search timed out' : (e?.message || 'Nominatim search failed');
        }
    }

    return { website: null, source: null, attempted: true, error: lastError || 'Nominatim search failed' };
}

async function getWebsiteVerifyCache(env: any, key: string) {
    if (!env?.DB?.prepare) return null;
    await ensureWebsiteVerifyCacheTable(env);
    const { results } = await env.DB.prepare(
        `SELECT verified_status, final_url, checked_at FROM website_verify_cache WHERE key = ? LIMIT 1`
    ).bind(key).all();
    if (!results.length) return null;
    const row = results[0];
    const checkedAt = Number(row.checked_at || 0);
    if (!checkedAt || (Date.now() - checkedAt) > WEBSITE_VERIFY_CACHE_TTL_MS) return null;
    return {
        verified_status: String(row.verified_status || 'unknown'),
        final_url: row.final_url ? String(row.final_url) : null,
        checked_at: checkedAt
    };
}

async function setWebsiteVerifyCache(env: any, key: string, verifiedStatus: string, finalUrl: string | null) {
    if (!env?.DB?.prepare) return;
    await ensureWebsiteVerifyCacheTable(env);
    await env.DB.prepare(`
        INSERT INTO website_verify_cache (key, verified_status, final_url, checked_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET
            verified_status=excluded.verified_status,
            final_url=excluded.final_url,
            checked_at=excluded.checked_at
    `).bind(key, verifiedStatus, finalUrl, Date.now()).run().catch(() => null);
}

export async function verifyWebsiteCandidate(rawWebsite: string, env?: any) {
    const website = normalizeWebsiteUrl(rawWebsite);
    if (!website) {
        return { website: null, website_verified: 'invalid_format', website_last_checked_at: null };
    }
    const cacheKey = normalizeWebsiteUrl(website) || website;
    const cached = await getWebsiteVerifyCache(env, cacheKey);
    if (cached) {
        return {
            website: normalizeWebsiteUrl(cached.final_url || website) || website,
            website_verified: cached.verified_status || 'unknown',
            website_last_checked_at: new Date(cached.checked_at).toISOString()
        };
    }

    resetWebsiteVerifyBudgetWindowIfNeeded();
    if (websiteVerifyRequestsThisRun >= WEBSITE_VERIFY_MAX_PER_RUN) {
        return { website, website_verified: 'unknown', website_last_checked_at: null, skipped: true };
    }
    websiteVerifyRequestsThisRun++;

    let current = website;
    let finalUrl: string | null = website;
    let redirects = 0;
    const visited = new Set<string>();
    let verifiedStatus: 'confirmed_live' | 'unreachable' | 'unknown' = 'unknown';

    while (redirects <= 3) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        try {
            const res = await fetch(current, {
                method: 'HEAD',
                redirect: 'manual',
                headers: { 'User-Agent': 'Axiom-Intel/1.0 (website verify)' },
                signal: controller.signal
            });
            clearTimeout(timeout);

            if (res.status >= 300 && res.status < 400) {
                const loc = res.headers.get('Location');
                if (!loc) break;
                const next = new URL(loc, current).toString();
                if (visited.has(next)) break;
                visited.add(next);
                current = next;
                finalUrl = next;
                redirects++;
                continue;
            }

            finalUrl = res.url || current;
            verifiedStatus = res.ok ? 'confirmed_live' : (res.status >= 400 ? 'unreachable' : 'unknown');
            break;
        } catch (e: any) {
            clearTimeout(timeout);
            if (current.startsWith('https://')) {
                current = current.replace(/^https:\/\//i, 'http://');
                finalUrl = current;
                redirects++;
                continue;
            }
            verifiedStatus = e?.name === 'AbortError' ? 'unreachable' : 'unreachable';
            break;
        }
    }

    if (verifiedStatus !== 'confirmed_live') {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000);
        try {
            const res = await fetch(finalUrl || website, {
                method: 'GET',
                redirect: 'follow',
                headers: { 'User-Agent': 'Axiom-Intel/1.0 (website verify)' },
                signal: controller.signal
            });
            clearTimeout(timeout);
            finalUrl = res.url || finalUrl || website;
            verifiedStatus = res.ok ? 'confirmed_live' : (res.status >= 400 ? 'unreachable' : verifiedStatus);
        } catch {
            clearTimeout(timeout);
        }
    }

    const checkedAt = Date.now();
    await setWebsiteVerifyCache(env, cacheKey, verifiedStatus, finalUrl);
    return {
        website: normalizeWebsiteUrl(finalUrl || website) || website,
        website_verified: verifiedStatus,
        website_last_checked_at: new Date(checkedAt).toISOString()
    };
}

async function runOverpassQuery(query: string) {
    let data: any;
    const overpassEndpoints = [
        'https://overpass-api.de/api/interpreter',
        'https://overpass.kumi.systems/api/interpreter'
    ];
    let lastError = 'Unknown error';

    for (const url of overpassEndpoints) {
        const ovController = new AbortController();
        const ovTimer = setTimeout(() => ovController.abort(), 25000);
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: 'data=' + encodeURIComponent(query),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                signal: ovController.signal
            });
            if (!res.ok) throw new Error(`Overpass error ${res.status}`);
            data = await res.json();
            clearTimeout(ovTimer);
            break;
        } catch (e: any) {
            clearTimeout(ovTimer);
            lastError = e?.name === 'AbortError' ? 'Overpass timeout' : (e?.message || 'Overpass network error');
        }
    }

    if (!data) {
        throw new Error('Overpass query failed: ' + lastError);
    }
    return data;
}

function mapBusinessesFromOverpass(data: any, fallbackLat: number, fallbackLon: number, hardCap: number) {
    const businesses: any[] = [];
    const byName = new Set<string>();
    for (const el of (data.elements || [])) {
        if (!el.tags?.name) continue;
        const nameKey = String(el.tags.name).toLowerCase().trim();
        if (byName.has(nameKey)) continue;
        byName.add(nameKey);
        businesses.push({
            osm_id: String(el.id),
            osm_type: String(el.type || 'node'),
            name: el.tags.name,
            lat: el.lat ?? el.center?.lat ?? fallbackLat,
            lon: el.lon ?? el.center?.lon ?? fallbackLon,
            phone: el.tags.phone || el.tags['contact:phone'] || null,
            email: emailFromTags(el.tags),
            website: normalizeWebsiteUrl(websiteFromTags(el.tags)),
            address: el.tags['addr:street']
                ? `${el.tags['addr:housenumber'] || ''} ${el.tags['addr:street']}`.trim()
                : null,
            tags: el.tags || {}
        });
    }

    businesses.sort((a, b) => {
        const as = (a.website ? 2 : 0) + (a.phone ? 1 : 0);
        const bs = (b.website ? 2 : 0) + (b.phone ? 1 : 0);
        return bs - as;
    });

    return businesses.slice(0, hardCap);
}

export async function enrichWebsiteForBusiness(business: any, env?: any) {
    const overpassWebsite = normalizeWebsiteUrl(business?.website || null);
    if (overpassWebsite) {
        return { website: overpassWebsite, website_status: 'known', website_source: 'overpass', attempted: false };
    }

    const osmType = String(business?.osm_type || 'node');
    const osmId = String(business?.osm_id || '');
    if (!osmId) {
        return { website: null, website_status: 'unknown', website_source: null, attempted: false };
    }
    const enriched = await enrichWebsiteFromNominatim(osmType, osmId, env);
    if (enriched.error) {
        // Continue to search fallback even if lookup path failed/rate-limited.
    } else if (enriched.website) {
        return { website: enriched.website, website_status: 'known', website_source: 'nominatim', attempted: true };
    }

    const searchFallback = await enrichWebsiteFromNominatimSearch(business, env);
    if (searchFallback.error) {
        const inferredFromEmail = inferWebsiteFromEmail(business?.email);
        if (inferredFromEmail) {
            return {
                website: inferredFromEmail,
                website_status: 'known',
                website_source: 'inferred_email',
                attempted: true,
                error: enriched?.error || searchFallback.error
            };
        }
        return {
            website: null,
            website_status: 'unknown',
            website_source: null,
            attempted: !!(enriched?.attempted || searchFallback.attempted),
            error: [enriched?.error, searchFallback.error].filter(Boolean).join(' | ')
        };
    }
    if (searchFallback.website) {
        return { website: searchFallback.website, website_status: 'known', website_source: 'nominatim', attempted: true };
    }

    const inferredFromEmail = inferWebsiteFromEmail(business?.email);
    if (inferredFromEmail) {
        return { website: inferredFromEmail, website_status: 'known', website_source: 'inferred_email', attempted: true };
    }
    return {
        website: null,
        website_status: (enriched.attempted || searchFallback.attempted) ? 'confirmed_missing' : 'unknown',
        website_source: null,
        attempted: !!(enriched.attempted || searchFallback.attempted),
        error: enriched.error
    };
}

export async function fetchOsmBusinesses(
    niche: string,
    city: string,
    radiusKm: number,
    env?: any,
    mode: 'strict' | 'opportunity' = 'opportunity'
) {
    const r = Math.min(radiusKm, 100) * 1000; // Cap radius at 100km to prevent runaway queries

    const craftType = craftTypeForNiche(niche);

    let lat: number, lon: number;
    try {
        const geo = await geocodeCity(city, env);
        lat = geo.lat;
        lon = geo.lon;
    } catch (e: any) {
        throw new Error(e?.message || 'Geocoding failed');
    }

    const nicheQuery = `
        [out:json][timeout:20];
        (
            node["craft"="${craftType}"](around:${r},${lat},${lon});
            way["craft"="${craftType}"](around:${r},${lat},${lon});
            node["shop"="${craftType}"](around:${r},${lat},${lon});
            way["shop"="${craftType}"](around:${r},${lat},${lon});
        );
        out body;
        >;
        out skel qt;
    `;

    const nicheData = await runOverpassQuery(nicheQuery);
    let businesses = mapBusinessesFromOverpass(nicheData, lat, lon, 300);

    const lowThreshold = mode === 'strict' ? 12 : 40;
    let broadFallbackUsed = false;
    let strictFallbackTriggered = false;

    if (businesses.length < lowThreshold) {
        if (mode === 'strict') strictFallbackTriggered = true;
        const broadQuery = `
            [out:json][timeout:20];
            (
                node["craft"](around:${r},${lat},${lon});
                way["craft"](around:${r},${lat},${lon});
                node["office"](around:${r},${lat},${lon});
                way["office"](around:${r},${lat},${lon});
                node["shop"](around:${r},${lat},${lon});
                way["shop"](around:${r},${lat},${lon});
                node["amenity"](around:${r},${lat},${lon});
                way["amenity"](around:${r},${lat},${lon});
            );
            out body;
            >;
            out skel qt;
        `;
        const broadData = await runOverpassQuery(broadQuery);
        const broad = mapBusinessesFromOverpass(broadData, lat, lon, 300);
        const seen = new Set(businesses.map(b => b.osm_id));
        for (const b of broad) {
            if (seen.has(b.osm_id)) continue;
            businesses.push(b);
            seen.add(b.osm_id);
            if (businesses.length >= 300) break;
        }
        broadFallbackUsed = true;
    }

    return {
        businesses: businesses.slice(0, 300),
        meta: {
            geocode_query: normalizeCityInput(city),
            broad_query_used: broadFallbackUsed,
            strict_fallback_triggered: strictFallbackTriggered,
            geocode_country: inferCountryFromRegion(city).countryCode || null
        }
    };
}
