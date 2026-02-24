import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <>
            {/* HERO */}
            <section
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 overflow-hidden flex flex-col items-center border-b border-subtle"
            >
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-80 mix-blend-screen"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.035), transparent 40%)`
                    }}
                />

                <div className="max-w-[1100px] w-full mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left max-w-[700px] flex flex-col items-center lg:items-start mx-auto lg:mx-0">
                        <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-semibold tracking-[-0.02em] mb-8 leading-[1.02] text-primary reveal">
                            Professional<br />Website Building.
                        </h1>
                        <p className="text-[17px] text-secondary max-w-[500px] mb-12 leading-relaxed font-light reveal reveal-delay-1">
                            We design, build, and maintain high-performance websites for service-based businesses in Ontario and beyond.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 reveal reveal-delay-2 w-full sm:w-auto">
                            <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-white/90 hover:scale-[1.01] active:scale-[0.99] text-black text-[12px] font-bold tracking-[0.05em] uppercase transition-all duration-300 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                Request a Website Build
                            </Link>
                            <Link to="/work" className="w-full sm:w-auto px-8 py-4 bg-[#121417]/50 border border-white/10 hover:border-white/30 hover:bg-white/5 text-primary text-[12px] font-semibold tracking-[0.05em] uppercase transition-all duration-300">
                                View Our Work
                            </Link>
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-[10px] sm:text-[11px] tracking-widest text-secondary/60 uppercase font-mono reveal reveal-delay-3">
                            <span>Ontario-Based</span>
                            <span className="w-1 h-1 bg-subtle rounded-full hidden sm:block opacity-40"></span>
                            <span>Custom Design</span>
                            <span className="w-1 h-1 bg-subtle rounded-full hidden sm:block opacity-40"></span>
                            <span>Lightning Fast</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUE PROPS */}
            <section className="py-28 px-6 max-w-[1100px] mx-auto w-full overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 w-full">
                    <div className="lg:col-span-4 reveal">
                        <h2 className="text-2xl font-semibold mb-6 text-primary tracking-tight">Why Choose Us?</h2>
                        <div className="w-8 h-[2px] bg-accent mb-8 opacity-60"></div>
                        <ul className="flex flex-col gap-5 text-[14px] text-secondary">
                            {[
                                "No cheap templates",
                                "Lightning fast loading speeds",
                                "Mobile-first, responsive layouts",
                                "Built-in local SEO fundamentals",
                                "Fully managed infrastructure"
                            ].map((prop, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-[6px] block w-[4px] h-[4px] bg-accent/60 shrink-0"></span>
                                    {prop}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-8">
                        <h2 className="text-2xl font-semibold mb-6 text-primary tracking-tight reveal">Our Approach</h2>
                        <div className="w-8 h-[2px] bg-accent mb-8 opacity-60 reveal"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "1. Discovery", desc: "We learn about your business, target audience, and primary goals for the website." },
                                { title: "2. Design", desc: "We create a custom, high-fidelity design tailored strictly to your brand identity." },
                                { title: "3. Development", desc: "We write clean, semantic code optimized for maximum performance and search engines." },
                                { title: "4. Launch", desc: "We deploy your site to premium global edge networks so it loads instantly everywhere." },
                                { title: "5. Maintenance", desc: "We handle security, server updates, and minor content adjustments month after month." }
                            ].map((mod, i) => (
                                <div
                                    key={i}
                                    className="surface-panel p-6 sm:p-7 relative overflow-hidden group hover:-translate-y-0.5 hover:border-white/20 transition-all duration-400 ease-[cubic-bezier(0.16,0.84,0.44,1)] reveal rounded-sm"
                                    style={{ transitionDelay: `${i * 50}ms` }}
                                >
                                    <h3 className="text-[15px] font-semibold text-primary/90 mb-3 group-hover:text-primary transition-colors leading-tight relative">{mod.title}</h3>
                                    <p className="text-[13px] text-secondary leading-relaxed relative">{mod.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-subtle relative overflow-hidden text-center reveal">
                <div className="max-w-[600px] mx-auto w-full relative z-10">
                    <h2 className="text-[32px] font-semibold mb-4 text-primary tracking-tight">Need a professional website?</h2>
                    <p className="text-[15px] text-secondary mx-auto leading-relaxed mb-10">Stop losing customers to outdated design and slow loading speeds.</p>

                    <Link to="/contact" className="inline-block px-8 py-4 bg-white hover:bg-white/90 hover:scale-[1.01] active:scale-[0.99] text-black text-[12px] font-bold tracking-[0.05em] uppercase transition-all duration-300 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Request a Consultation
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;
