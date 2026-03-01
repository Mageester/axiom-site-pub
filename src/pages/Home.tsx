import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const authorityPillars = [
    {
        title: 'Instant Load Speed',
        desc: 'We build the fastest sites in your market, so customers stay, trust you, and contact you before they bounce.'
    },
    {
        title: 'Conversion Design',
        desc: 'Every page is built to move visitors from curiosity to action with clear offers, clear proof, and clear next steps.'
    },
    {
        title: 'Always-On Reliability',
        desc: 'Enterprise-grade protection and uptime keep your site available day and night when real jobs are on the line.'
    }
];

const processSteps = [
    {
        title: 'Clarity',
        desc: 'We define your best services, best customers, and the offer that wins calls.'
    },
    {
        title: 'Blueprint',
        desc: 'We map the exact pages, messaging, and lead flow before any build work starts.'
    },
    {
        title: 'Build',
        desc: 'We design and build a custom site that looks premium and performs fast on every device.'
    },
    {
        title: 'Launch',
        desc: 'We go live cleanly, track performance, and make sure your site is ready to produce leads.'
    }
];

const differentiationCards = [
    {
        title: 'Speed',
        desc: 'Loads in a snap.'
    },
    {
        title: 'Reliability',
        desc: 'Online when customers need you.'
    },
    {
        title: 'Design',
        desc: 'Built to make competitors look dated.'
    }
];

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
            <SEO
                title="High-performance web design | Axiom Infrastructure"
                description="Contractor lead generation and high-performance web design in Kitchener. We build custom infrastructure that drives Better results than templates."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Axiom Infrastructure",
                    "description": "Web Infrastructure & Lead Generation for Contractors",
                    "url": "https://axiom-site.onrender.com",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Kitchener",
                        "addressRegion": "Ontario",
                        "addressCountry": "CA"
                    },
                    "areaServed": "Kitchener"
                }}
            />

            <section
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 overflow-hidden flex flex-col items-center border-b border-subtle"
            >
                {/* SORA VIDEO BACKGROUND */}
                <video
                    src="/sora.mp4"
                    playsInline
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover z-0"
                ></video>
                {/* DARK OVERLAY FOR CONTRAST */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-80 mix-blend-screen z-10"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.035), transparent 40%)`
                    }}
                />

                <div className="max-w-[1100px] w-full mx-auto relative z-10 flex flex-col items-center text-center">
                    <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-6 reveal">
                        Authority Websites for Service Businesses
                    </div>
                    <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-semibold tracking-[-0.02em] mb-8 leading-[1.02] text-primary reveal max-w-[980px]">
                        The fastest way to look premium and win more jobs.
                    </h1>
                    <p className="text-[17px] text-secondary max-w-[720px] mb-5 leading-relaxed font-light reveal reveal-delay-1">
                        We build high-converting websites for HVAC, roofing, and landscaping companies that turn clicks into calls.
                    </p>
                    <p className="text-[12px] text-secondary/70 font-mono uppercase tracking-widest mb-12 reveal reveal-delay-1">
                        Built for speed. Built to convert. Built to outrank.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 reveal reveal-delay-2 w-full sm:w-auto justify-center">
                        <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-white/90 hover:scale-[1.01] active:scale-[0.99] text-black text-[12px] font-bold tracking-[0.05em] uppercase transition-all duration-300 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Book a Strategy Call
                        </Link>
                        <Link to="/work" className="w-full sm:w-auto px-8 py-4 bg-[#121417]/50 border border-white/10 hover:border-white/30 hover:bg-white/5 text-primary text-[12px] font-semibold tracking-[0.05em] uppercase transition-all duration-300">
                            See Industry Demos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-28 px-6 max-w-[1100px] mx-auto w-full overflow-hidden">
                <div className="text-center mb-14 reveal">
                    <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-5">Authority</div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight mb-4">Three pillars behind every Authority build.</h2>
                    <p className="text-[15px] text-secondary max-w-[700px] mx-auto leading-relaxed">
                        Speed, design, and reliability are non-negotiable if you want more calls and better clients.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {authorityPillars.map((pillar, i) => (
                        <div
                            key={pillar.title}
                            className="surface-panel p-6 sm:p-7 rounded-sm reveal hover:border-white/20 transition-all"
                            style={{ transitionDelay: `${i * 60}ms` }}
                        >
                            <h3 className="text-[15px] font-semibold text-primary mb-3">{pillar.title}</h3>
                            <p className="text-[13px] text-secondary leading-relaxed">{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6 border-y border-subtle bg-[#0a0c0e] reveal">
                <div className="max-w-[1100px] mx-auto">
                    <div className="mb-10">
                        <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-5">Differentiation</div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight mb-4">Why serious operators skip templates.</h2>
                        <p className="text-[15px] text-secondary max-w-[760px] leading-relaxed">
                            Templates are built for convenience. Authority sites are built for growth, trust, and market position.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {differentiationCards.map((card, i) => (
                            <div key={card.title} className="surface-panel p-8 rounded-sm text-center">
                                <div className="text-[12px] font-mono text-accent/80 uppercase tracking-widest mb-3">0{i + 1} {card.title}</div>
                                <h3 className="text-[18px] font-semibold text-primary">{card.desc}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-28 px-6 max-w-[1100px] mx-auto w-full reveal">
                <div className="text-center mb-14">
                    <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-5">Process</div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight mb-4">A clean process from first call to launch.</h2>
                    <p className="text-[15px] text-secondary max-w-[680px] mx-auto leading-relaxed">
                        Fast decisions. Clear milestones. No bloated timelines.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {processSteps.map((step, i) => (
                        <div key={step.title} className="surface-panel p-6 rounded-sm relative reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                            <div className="text-[10px] font-mono text-accent/70 uppercase tracking-widest mb-3">Step {i + 1}</div>
                            <h3 className="text-[18px] font-semibold text-primary mb-3">{step.title}</h3>
                            <p className="text-[13px] text-secondary leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6 border-y border-subtle bg-[#0a0c0e] reveal">
                <div className="max-w-[820px] mx-auto text-center">
                    <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-6">Proof in Progress</div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight mb-4">
                        Results are published as clients launch.
                    </h2>
                    <p className="text-[15px] text-secondary leading-relaxed mb-8">
                        No fake testimonials. No inflated claims. If you want proof before launch case studies are live, we will walk you through a real build.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                        {[
                            'Most owners ask about speed, mobile usability, and lead quality first',
                            'You can review draft builds early before final launch',
                            'Clear performance goals are defined before build starts'
                        ].map((item) => (
                            <div key={item} className="surface-panel p-4 rounded-sm">
                                <p className="text-[12px] text-secondary leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 border-t border-subtle bg-[#0a0c0e] reveal">
                <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-7">
                        <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-5">About Axiom</div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight mb-4">
                            We build digital infrastructure that helps service businesses dominate locally.
                        </h2>
                        <p className="text-[15px] text-secondary leading-relaxed mb-4">
                            Your website should be your best salesperson. It should load instantly, look elite, and make contacting you effortless.
                        </p>
                        <p className="text-[15px] text-secondary leading-relaxed">
                            That is the standard we build to on every Authority project.
                        </p>
                    </div>
                    <div className="lg:col-span-5 surface-panel p-6 rounded-sm">
                        <h3 className="text-[12px] font-mono text-secondary uppercase tracking-widest mb-5">Trust Anchors</h3>
                        <ul className="flex flex-col gap-3 text-[14px] text-secondary">
                            <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0"></span>Built for real local service markets</li>
                            <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0"></span>Speed and conversion targets defined up front</li>
                            <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0"></span>Clear scope, clear pricing, clear outcomes</li>
                            <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0"></span>Custom builds that do not look like everyone else</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-28 px-6 max-w-[800px] mx-auto w-full reveal">
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-primary tracking-tight">Frequently Asked Questions</h2>
                    <div className="w-8 h-[2px] bg-accent mx-auto opacity-60"></div>
                </div>

                <div className="flex flex-col gap-8">
                    {[
                        {
                            q: 'Do you use WordPress or Squarespace?',
                            a: "No. We build custom websites so your business looks unique, loads faster, and is easier to scale as you grow."
                        },
                        {
                            q: 'Do you provide hosting?',
                            a: 'Yes. We handle hosting, security, and uptime so your site stays online and protected.'
                        },
                        {
                            q: 'What about SEO?',
                            a: 'Every build is structured to rank locally with fast performance, clear service pages, and clean on-page SEO basics.'
                        }
                    ].map((faq, i) => (
                        <div key={i} className="border-b border-subtle pb-8 last:border-0">
                            <h3 className="text-lg font-semibold text-primary mb-3">{faq.q}</h3>
                            <p className="text-[15px] text-secondary leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-24 px-6 border-t border-subtle relative overflow-hidden text-center reveal">
                <div className="max-w-[720px] mx-auto w-full relative z-10">
                    <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-5">Next Step</div>
                    <h2 className="text-[32px] font-semibold mb-4 text-primary tracking-tight">Ready to upgrade what your market sees?</h2>
                    <p className="text-[15px] text-secondary mx-auto leading-relaxed mb-8">
                        Start with a strategy call. We will map the fastest path to a site that looks elite and brings in better leads.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="inline-block px-8 py-4 bg-white hover:bg-white/90 hover:scale-[1.01] active:scale-[0.99] text-black text-[12px] font-bold tracking-[0.05em] uppercase transition-all duration-300 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Start Your Authority Build
                        </Link>
                        <Link to="/pricing" className="inline-block px-8 py-4 bg-[#121417]/50 border border-white/10 hover:border-white/30 hover:bg-white/5 text-primary text-[12px] font-semibold tracking-[0.05em] uppercase transition-all duration-300">
                            See Investment Tiers
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
