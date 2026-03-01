/**
 * Cloudflare Pages Function: POST /api/intake
 * 
 * Edge-native lead intake pipeline for Axiom Infrastructure.
 * Uses Resend API for transactional email delivery (V8 isolate compatible).
 * 
 * Required Cloudflare Environment Variables:
 *   RESEND_API_KEY  - Your Resend API key (re_xxxxxxxxx)
 *   INTAKE_EMAIL    - Destination email (aidan@getaxiom.ca)
 */

interface Env {
    RESEND_API_KEY: string;
    INTAKE_EMAIL: string;
}

interface IntakePayload {
    name?: string;
    email?: string;
    business_name?: string;
    businessName?: string;
    phone?: string;
    current_website?: string;
    websiteUrl?: string;
    website?: string;
    project_scale?: string;
    projectScale?: string;
    pain_points?: string | string[];
    painPoints?: string | string[];
    details?: string;
    primary_goal?: string;
    primaryGoal?: string;
    source_path?: string;
    sourcePath?: string;
    company_fax?: string;
    companyFax?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    try {
        // --- Content-Type Guard ---
        const contentType = request.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return new Response(JSON.stringify({
                error: 'Invalid Content-Type',
                details: 'Expected application/json'
            }), { status: 400, headers });
        }

        // --- Parse Body ---
        let body: IntakePayload;
        try {
            body = await request.json() as IntakePayload;
        } catch {
            return new Response(JSON.stringify({
                error: 'Malformed JSON',
                details: 'Could not parse request body as JSON.'
            }), { status: 400, headers });
        }

        console.log('[INTAKE] Payload received:', JSON.stringify(body));

        // --- Honeypot Check ---
        const companyFax = body.company_fax || body.companyFax || '';
        if (companyFax) {
            return new Response(JSON.stringify({ success: true }), { status: 200, headers });
        }

        // --- Normalize Keys (accept camelCase + snake_case) ---
        const name = (body.name || '').trim();
        const email = (body.email || '').trim();
        const businessName = (body.business_name || body.businessName || '').trim();
        const phone = (body.phone || '').trim();
        const currentWebsite = (body.current_website || body.websiteUrl || body.website || '').trim();
        const projectScale = (body.project_scale || body.projectScale || '').trim();
        const details = (body.details || '').trim();
        const primaryGoal = (body.primary_goal || body.primaryGoal || '').trim();
        const sourcePath = (body.source_path || body.sourcePath || '').trim();

        // --- Parse Pain Points (string or array) ---
        const rawPainPoints = body.pain_points || body.painPoints || '';
        let painPointsList: string[] = [];
        if (Array.isArray(rawPainPoints)) {
            painPointsList = rawPainPoints.map(p => String(p).trim()).filter(p => p.length > 0);
        } else if (typeof rawPainPoints === 'string' && rawPainPoints.trim().length > 0) {
            painPointsList = rawPainPoints.split(',').map(p => p.trim()).filter(p => p.length > 0);
        }

        // --- Validation (only name + email required) ---
        if (!name || name.length < 1) {
            return new Response(JSON.stringify({
                error: 'Validation Failed',
                details: `Name is required. Received: '${name}'`
            }), { status: 400, headers });
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return new Response(JSON.stringify({
                error: 'Validation Failed',
                details: `Valid email is required. Received: '${email}'`
            }), { status: 400, headers });
        }

        // --- Build Email ---
        const scaleText = projectScale ? projectScale.toUpperCase() : 'AUDIT REQUEST';
        const titleLine = businessName || currentWebsite || name;
        const subjectLine = `[NEW LEAD] - ${scaleText} - ${titleLine}`;

        const painPointsHtml = painPointsList.length > 0
            ? `<ul>${painPointsList.map(p => `<li>${p}</li>`).join('')}</ul>`
            : '<em>None selected</em>';

        const htmlBody = `
            <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px;">
                <h2 style="color: #0B0B0C; border-bottom: 2px solid #5a729b; padding-bottom: 8px;">Axiom Infrastructure Request</h2>
                
                <h3 style="margin-top: 24px;">Lead Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 4px 0; width: 150px;"><strong>Name:</strong></td><td>${name}</td></tr>
                    <tr><td style="padding: 4px 0;"><strong>Email:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
                    <tr><td style="padding: 4px 0;"><strong>Phone:</strong></td><td>${phone || 'N/A'}</td></tr>
                    <tr><td style="padding: 4px 0;"><strong>Business:</strong></td><td>${businessName || 'N/A'}</td></tr>
                    <tr><td style="padding: 4px 0;"><strong>Website:</strong></td><td>${currentWebsite ? `<a href="${currentWebsite}">${currentWebsite}</a>` : 'N/A'}</td></tr>
                </table>

                <h3 style="margin-top: 24px;">Project Scope</h3>
                <p><strong>Scale/Goal:</strong> ${projectScale || primaryGoal || 'N/A'}</p>
                <p><strong>Source:</strong> ${sourcePath || 'N/A'}</p>
                
                <p style="margin-top: 16px;"><strong>Identified Pain Points:</strong></p>
                ${painPointsHtml}

                <h3 style="margin-top: 24px;">Technical Details / Notes</h3>
                <div style="background-color: #f4f4f4; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${details || 'No details provided.'}</div>
                
                <p style="margin-top: 32px; font-size: 12px; color: #666;">Routed via Axiom Edge Infrastructure.</p>
            </div>
        `;

        // --- Send Email via Resend API ---
        const destinationEmail = env.INTAKE_EMAIL || 'aidan@getaxiom.ca';
        const resendApiKey = env.RESEND_API_KEY;

        if (!resendApiKey) {
            console.error('[INTAKE] RESEND_API_KEY is not configured.');
            console.log('[INTAKE] SUBJECT:', subjectLine);
            console.log('[INTAKE] BODY (mocked):', htmlBody);
            return new Response(JSON.stringify({ success: true, mocked: true }), { status: 200, headers });
        }

        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Axiom Engine <onboarding@resend.dev>',
                to: [destinationEmail],
                reply_to: email,
                subject: subjectLine,
                html: htmlBody,
            }),
        });

        if (!resendResponse.ok) {
            const errorText = await resendResponse.text();
            console.error('[INTAKE] Resend API Error:', resendResponse.status, errorText);
            return new Response(JSON.stringify({
                error: 'Email delivery failed',
                details: `Resend returned ${resendResponse.status}`
            }), { status: 500, headers });
        }

        console.log('[INTAKE] Email dispatched successfully to', destinationEmail);
        return new Response(JSON.stringify({ success: true }), { status: 200, headers });

    } catch (error: any) {
        console.error('[INTAKE] Unhandled error:', error?.message || error);
        return new Response(JSON.stringify({
            error: 'Internal server error',
            details: error?.message || 'Unknown failure in edge function'
        }), { status: 500, headers });
    }
};

// Handle OPTIONS for CORS preflight
export const onRequestOptions: PagesFunction = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400',
        },
    });
};
