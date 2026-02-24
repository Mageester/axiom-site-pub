import React from 'react';

const WorkPage: React.FC = () => {
    return (
        <div className="pt-32 pb-24">
            <section className="px-6 pb-24 border-b border-subtle">
                <div className="max-w-[800px] w-full mx-auto text-center reveal">
                    <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-6">Our Work</div>
                    <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-semibold tracking-[-0.02em] mb-8 leading-[1.02] text-primary">
                        Modern Web Designs
                    </h1>
                    <p className="text-[17px] text-secondary max-w-[650px] mx-auto leading-relaxed font-light reveal reveal-delay-1">
                        A selection of high-performance websites engineered for local businesses, contractors, and service providers. Clean code, flawless aesthetics.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 max-w-[1100px] mx-auto w-full reveal">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                        { title: "HVAC Contractor", niche: "Trade Services", status: "Live" },
                        { title: "Boutique Law Firm", niche: "Professional Services", status: "Live" },
                        { title: "Landscaping & Design", niche: "Local Business", status: "Live" },
                        { title: "Roofing Specialists", niche: "Contractors", status: "Live" }
                    ].map((project, i) => (
                        <div key={i} className="surface-panel p-8 md:p-12 relative overflow-hidden group hover:-translate-y-1 hover:border-white/20 transition-all duration-500 flex flex-col items-center text-center">
                            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="h-[200px] w-[90%] bg-white/5 border border-white/10 mb-8 flex items-center justify-center rounded-sm">
                                <span className="text-[11px] font-mono text-secondary/40 uppercase tracking-widest">[Design Placeholder]</span>
                            </div>
                            <h3 className="text-[20px] font-semibold text-primary/90 mb-2 transition-colors">{project.title}</h3>
                            <div className="flex gap-4 items-center">
                                <span className="text-[12px] text-secondary/60 uppercase font-mono tracking-widest">{project.niche}</span>
                                <span className="w-1 h-1 bg-subtle rounded-full"></span>
                                <span className="text-[12px] text-accent/80 uppercase font-mono tracking-widest border border-accent/20 px-2 py-0.5 rounded-sm">{project.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default WorkPage;
