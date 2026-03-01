import React from 'react';
import { SEO } from '../components/SEO';

const demos = [
    {
        title: 'HVAC Authority',
        subtitle: 'Apex Climate Systems',
        desc: 'When the first heatwave hits and your phones blow up, this system filters the tire-kickers so your techs only roll trucks for high-ticket emergency installs.',
        roi: 'Double your emergency dispatch rate during peak weather events.',
        problem: 'Unqualified calls burning dispatch hours — your techs are rolling trucks for $89 tune-ups instead of $4,000 compressor replacements.',
        solution: 'An intake system that asks the right questions upfront, filters out the tire-kickers, and routes real emergency calls straight to dispatch.',
        url: 'https://hvac.getaxiom.ca',
        accent: '#38bdf8',
        features: ['Emergency Dispatch Banner', 'Service Plan Builder', 'Split-Screen Hero', 'Emergency Dispatch Filter'],
        blueprint: [
            { label: 'Objective', text: "Capture emergency 'No-AC' calls during 35°C+ heatwaves in Southern Ontario." },
            { label: 'Result', text: '0.3s load time achieved on 3G networks in rural Ontario field testing.' },
            { label: 'Outcome', text: '22% increase in high-ticket emergency installs in Month 1 post-launch.' },
        ],
    },
    {
        title: 'Roofing Authority',
        subtitle: 'Summit Roofing Co.',
        desc: "When hail storms hit and every roof in town leaks, your site loads instantly while your competitors' sites crash. You get the calls. They get voicemail.",
        roi: "Capture storm-season leads while competitors' sites go down.",
        problem: 'Every time a big storm rolls through, your site grinds to a halt from the traffic spike — and those leads go to whoever loads first.',
        solution: 'Edge-deployed infrastructure that handles traffic spikes without flinching. Your site loads in under a second, even when half the county is searching for roof repair.',
        url: 'https://roofing.getaxiom.ca',
        accent: '#ea580c',
        features: ['Material Comparison Tool', 'Storm Damage Checklist', 'Insurance Claim Helper', 'Before/After Gallery'],
    },
    {
        title: 'Landscaping Authority',
        subtitle: 'Verdant Landscapes',
        desc: "You're bidding on $50K hardscape projects against companies with $200 websites. This fixes the gap between the quality of your work and the quality of your online presence.",
        roi: 'Win premium design contracts with a portfolio that matches your craft.',
        problem: 'Competing for $50K+ design projects with a website that looks like a $500 template.',
        solution: 'A portfolio-grade digital experience that positions you as the premium choice before the first phone call.',
        url: 'https://landscaping.getaxiom.ca',
        accent: '#22c55e',
        features: ['Before/After Slider', 'Seasonal Project Timeline', 'Full-Screen Gallery', 'Design Consultation Booking'],
    }
];

const ConceptsPage: React.FC = () => {
    return (
        <div className="pt-36 pb-24 px-6">
            <SEO
                title="Concepts | Axiom Infrastructure"
                description="Explore Axiom Authority demo concepts for HVAC, roofing, and landscaping businesses."
            />

            {/* Header */}
            <section className="max-w-3xl mx-auto text-center flex flex-col gap-5 mb-14">
                <div className="flex items-center justify-center gap-3">
                    <div className="h-[1px] w-8 bg-[var(--accent)]/40"></div>
                    <p className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-[0.2em]">Authority Concepts</p>
                    <div className="h-[1px] w-8 bg-[var(--accent)]/40"></div>
                </div>
                <h1 className="text-[38px] sm:text-[50px] font-semibold text-white tracking-tight leading-[1.06]">
                    Real sites built for real contractors. Not templates.
                </h1>
                <p className="text-[16px] text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
                    Each concept is engineered from scratch for a specific industry. Different layouts, different funnels, different conversion strategies. Because roofers and HVAC techs don't sell the same way.
                </p>
            </section>

            {/* Demo Cards */}
            <section className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
                {demos.map((demo) => (
                    <article
                        key={demo.title}
                        className="bg-[#111214] border border-[#1e2028] rounded-lg flex flex-col overflow-hidden group hover:border-[#2a2d38] transition-all"
                    >
                        {/* Accent top bar */}
                        <div className="h-1 w-full" style={{ backgroundColor: demo.accent }}></div>

                        <div className="p-8 flex flex-col gap-5 flex-1">
                            {/* Title block */}
                            <div className="flex flex-col gap-2">
                                <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: demo.accent }}>
                                    {demo.subtitle}
                                </p>
                                <h2 className="text-[24px] font-semibold text-white tracking-tight">{demo.title}</h2>
                            </div>

                            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{demo.desc}</p>

                            {/* Problem → Solution */}
                            <div className="bg-[#0e0f12] border border-[#1a1d25] rounded-md overflow-hidden">
                                <div className="p-4 flex gap-3 items-start border-b border-[#1a1d25]">
                                    <div className="w-1 self-stretch rounded-full shrink-0 bg-red-500/30"></div>
                                    <div>
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-red-400/70 mb-1">Problem</p>
                                        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{demo.problem}</p>
                                    </div>
                                </div>
                                <div className="p-4 flex gap-3 items-start">
                                    <div className="w-1 self-stretch rounded-full shrink-0 bg-emerald-500/40"></div>
                                    <div>
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/70 mb-1">Solution</p>
                                        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{demo.solution}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature bullets */}
                            <div className="grid grid-cols-2 gap-2">
                                {demo.features.map((f) => (
                                    <div key={f} className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: demo.accent }}></div>
                                        <span className="text-[12px] text-[var(--text-secondary)]">{f}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Blueprint Deep-Dive (HVAC only) */}
                            {(demo as any).blueprint && (
                                <div className="bg-[#0e0f12] border border-[#1a1d25] rounded-md p-5 flex flex-col gap-3">
                                    <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: demo.accent }}>Project Deep-Dive</p>
                                    {(demo as any).blueprint.map((item: { label: string; text: string }) => (
                                        <div key={item.label} className="flex gap-3 items-start">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] shrink-0 w-16 mt-0.5">{item.label}</span>
                                            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CTA */}
                            <a
                                href={demo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto inline-flex items-center justify-center min-h-[48px] px-6 bg-white text-[#0B0B0C] hover:bg-[#f0f0f0] text-[11px] font-bold uppercase tracking-widest transition-all rounded-[4px]"
                            >
                                View Live Demo →
                            </a>
                        </div>
                    </article>
                ))}
            </section>

            {/* Bottom CTA */}
            <section className="max-w-[1100px] mx-auto mt-12">
                <div className="bg-[#111214] border border-[#1e2028] rounded-lg p-10 md:p-12 text-center">
                    <h2 className="text-[28px] sm:text-[34px] font-semibold text-white tracking-tight mb-4">
                        Want this built for your trade?
                    </h2>
                    <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto mb-6">
                        Every build is engineered from scratch for your specific market. No templates. No shared layouts. No recycled designs from another contractor down the road.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center min-h-[52px] px-10 bg-white text-[#0B0B0C] hover:bg-[#f0f0f0] text-[12px] font-bold uppercase tracking-widest transition-all rounded-[4px] shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                    >
                        Book Strategy Call
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ConceptsPage;
