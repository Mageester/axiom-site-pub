const MAP: Record<string, string[]> = {
    hvac: ['hvac', 'heating', 'cooling', 'furnace', 'air conditioning', 'mechanical'],
    plumbing: ['plumbing', 'plumber', 'drain', 'sewer', 'pipe', 'emergency'],
    electrician: ['electric', 'electrician', 'electrical', 'wiring', 'panel', 'generator'],
    roofing: ['roof', 'roofing', 'roofer', 'shingle', 'flat roof', 'eavestrough'],
    landscaping: ['landscaping', 'landscape', 'lawn', 'garden', 'yard', 'maintenance'],
    cleaning: ['cleaning', 'clean', 'janitorial', 'maid', 'deep clean', 'commercial cleaning'],
    painting: ['painting', 'painter', 'paint', 'interior paint', 'exterior paint']
};

export function previewNicheKeywords(niche: string) {
    const normalized = niche.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!normalized) return [];
    for (const [k, vals] of Object.entries(MAP)) {
        if (normalized.includes(k)) return vals;
    }
    return Array.from(new Set(normalized.split(' ').filter(Boolean)));
}
