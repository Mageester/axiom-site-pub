import React from 'react';

const PricingPage: React.FC = () => {
    return (
        <div className="pt-32 pb-24">
            <section className="px-6 pb-24 border-b border-subtle">
                <div className="max-w-[800px] w-full mx-auto text-center reveal">
                    <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-6">Pricing & Maintenance</div>
                    <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-semibold tracking-[-0.02em] mb-8 leading-[1.02] text-primary">
                        Simple, Honest Pricing
                    </h1>
                    <p className="text-[17px] text-secondary max-w-[650px] mx-auto leading-relaxed font-light reveal reveal-delay-1">
                        No hidden fees. We build your website, host it securely, and keep it fast.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 max-w-[1100px] mx-auto w-full reveal">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    <div className="surface-panel p-10 sm:p-14 relative overflow-hidden group border-white/10 hover:border-white/20 transition-all rounded-sm">
                        <div className="absolute top-0 left-0 w-[4px] h-full bg-accent/80"></div>
                        <h3 className="text-[24px] font-semibold text-primary mb-2">Website Build</h3>
                        <div className="text-[12px] font-mono text-secondary uppercase tracking-widest mb-6 border-b border-subtle pb-6">$1,500 – $4,500 One-Time Setup</div>
                        <ul className="flex flex-col gap-4 text-[14px] text-secondary">
                            <li className="flex items-start gap-3"><span className="text-accent/60 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>Custom Design (No Templates)</li>
                            <li className="flex items-start gap-3"><span className="text-accent/60 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>Lightning Fast Loading Speeds</li>
                            <li className="flex items-start gap-3"><span className="text-accent/60 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>Mobile-First Optimization</li>
                            <li className="flex items-start gap-3"><span className="text-accent/60 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>Basic On-Page SEO (Keywords & Meta)</li>
                            <li className="flex items-start gap-3"><span className="text-accent/60 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>Clear Contact Forms & Call to Actions</li>
                        </ul>
                    </div>

                    <div className="surface-panel p-10 sm:p-14 relative overflow-hidden group border-white/5 hover:border-white/10 transition-all rounded-sm">
                        <div className="absolute top-0 left-0 w-[4px] h-full bg-secondary/30 group-hover:bg-secondary/60 transition-colors"></div>
                        <h3 className="text-[24px] font-semibold text-primary mb-2">Ongoing Infrastructure <span className="text-secondary/60 font-normal text-lg ml-2">(Hosting)</span></h3>
                        <div className="text-[12px] font-mono text-secondary uppercase tracking-widest mb-6 border-b border-subtle pb-6">$150 / Month</div>
                        <ul className="flex flex-col gap-4 text-[14px] text-secondary">
                            <li className="flex items-start gap-3"><span className="text-secondary/40 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>Premium Cloudflare Edge Hosting</li>
                            <li className="flex items-start gap-3"><span className="text-secondary/40 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>SSL Certificates & Security Patching</li>
                            <li className="flex items-start gap-3"><span className="text-secondary/40 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>Uptime Monitoring (24/7)</li>
                            <li className="flex items-start gap-3"><span className="text-secondary/40 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>Minor Text & Image Revisions</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;
