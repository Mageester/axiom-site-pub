import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const investmentTiers = [
    {
        title: 'The Foundation',
        price: '$2,500',
        desc: 'A focused single-page asset built to convert local traffic into qualified calls fast.'
    },
    {
        title: 'The Engine',
        price: '$5,000',
        desc: 'A multi-page lead system that pre-sells your value, captures better inquiries, and supports steady pipeline growth.'
    },
    {
        title: 'The Authority',
        price: '$7,500+',
        desc: 'Your full market-capture infrastructure with zero-friction onboarding, automated lead qualification, and enterprise reliability.'
    }
];

const roiCards = [
    {
        title: 'Total Market Capture',
        desc: 'Own the premium position in your service area with a site that looks and performs above local competitors.'
    },
    {
        title: 'Automated Lead Qualification',
        desc: 'Filter out low-intent traffic and attract higher-value prospects with smarter page flow and application logic.'
    },
    {
        title: 'Zero-Friction Customer Onboarding',
        desc: 'Make it effortless for serious buyers to request service, share details, and move into your pipeline quickly.'
    },
    {
        title: 'Always-On Revenue Asset',
        desc: 'Your site stays fast, secure, and online so lead flow does not stop after business hours.'
    }
];

const ServicesPage: React.FC = () => {
    return (
        <div className="pt-32 pb-24">
            <SEO
                title="Infrastructure Investments | Axiom"
                description="Choose the right infrastructure investment for your service business: Foundation, Engine, or Authority. Built for speed, conversion, and long-term market position."
            />
            <section className="px-6 pb-24 border-b border-subtle">
                <div className="max-w-[800px] w-full mx-auto text-center reveal">
                    <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-6">Infrastructure Investments</div>
                    <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-semibold tracking-[-0.02em] mb-8 leading-[1.02] text-primary">
                        Built to increase lead quality and close rate.
                    </h1>
                    <p className="text-[17px] text-secondary max-w-[650px] mx-auto leading-relaxed font-light reveal reveal-delay-1">
                        This is not a web design package. It is a business asset engineered to drive pipeline, trust, and long-term local dominance.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 max-w-[1100px] mx-auto w-full reveal">
                <div className="text-center mb-16 max-w-2xl mx-auto flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-6 text-primary tracking-tight">Choose Your Build Tier</h2>
                    <div className="w-8 h-[2px] bg-accent mb-8 opacity-60"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {investmentTiers.map((tier, i) => (
                        <div
                            key={i}
                            className="surface-panel p-8 sm:p-10 relative overflow-hidden group hover:-translate-y-0.5 hover:border-white/20 transition-all duration-400 ease-[cubic-bezier(0.16,0.84,0.44,1)] reveal rounded-sm"
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-3 relative">{tier.price}</div>
                            <h3 className="text-[18px] font-semibold text-primary/90 mb-4 group-hover:text-primary transition-colors leading-tight relative">{tier.title}</h3>
                            <p className="text-[14px] text-secondary leading-relaxed relative">{tier.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-24 px-6 border-y border-subtle bg-[#0a0c0e]">
                <div className="max-w-[1100px] mx-auto">
                    <div className="text-center mb-14">
                        <div className="text-[11px] font-mono text-accent/80 uppercase tracking-widest mb-6">Authority ROI</div>
                        <h2 className="text-[24px] sm:text-[32px] font-semibold text-primary mb-6">What a $7,500+ Authority build does for your bottom line.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {roiCards.map((card, i) => (
                            <div key={card.title} className="surface-panel p-8 rounded-sm reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                                <h3 className="text-[18px] font-semibold text-primary mb-3">{card.title}</h3>
                                <p className="text-[14px] text-secondary leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 border-t border-subtle">
                <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
                    <h2 className="text-[24px] sm:text-[32px] font-semibold text-primary mb-6">Apply for an Infrastructure Audit.</h2>
                    <p className="text-[15px] text-secondary mb-10 leading-relaxed max-w-[600px]">
                        We will review your current site, identify missed revenue opportunities, and recommend the right investment tier.
                    </p>
                    <Link to="/contact" className="px-8 py-4 bg-white text-black hover:bg-[#e2e2e2] text-[12px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300">
                        Start Project Application
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
