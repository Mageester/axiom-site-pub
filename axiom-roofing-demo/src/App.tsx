import React, { useState } from 'react';

/* ─── Header ─── */
const Header: React.FC = () => (
  <header className="sticky top-0 z-50 w-full bg-surface-base/80 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-ember-500 rounded-sm flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div>
          <h1 className="text-white font-bold text-lg tracking-tight leading-none">Summit Roofing</h1>
          <span className="text-ember-300/60 text-[11px] font-mono uppercase tracking-widest">Structural Protection</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-stone-400">
        <a href="#services" className="px-4 py-3 hover:text-white transition-colors">Services</a>
        <a href="#process" className="px-4 py-3 hover:text-white transition-colors">Process</a>
        <a href="#contact" className="px-4 py-3 hover:text-white transition-colors">Contact</a>
      </nav>

      <a href="tel:1-800-555-0200" className="flex items-center gap-2 bg-ember-600 hover:bg-ember-500 text-white px-5 min-h-[48px] text-[13px] font-bold uppercase tracking-wider transition-all active:scale-[0.97] rounded-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        Storm Response
      </a>
    </div>
  </header>
);

/* ─── Hero ─── */
const Hero: React.FC = () => (
  <section className="relative pt-28 pb-36 px-4 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-ember-700/10 via-surface-base to-surface-base"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-ember-500/5 blur-[120px]"></div>
    </div>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-ember-500/10 border border-ember-500/20 text-ember-300 px-4 py-2 rounded-sm text-[12px] font-mono uppercase tracking-widest mb-8">
          <div className="w-1.5 h-1.5 bg-ember-400 rounded-full animate-pulse"></div>
          Licensed & Insured Contractors
        </div>

        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-white mb-6 leading-[1.05] tracking-tight">
          Built to Withstand.<br />Engineered to Last.
        </h2>

        <p className="text-[17px] text-stone-400 mb-10 max-w-lg leading-relaxed">
          We engineer roofing systems designed for absolute structural integrity. From precision shingle installation to full storm restoration across Ontario.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a href="#contact" className="text-center bg-ember-600 hover:bg-ember-500 text-white px-8 min-h-[52px] flex items-center justify-center text-[14px] font-bold uppercase tracking-widest transition-all active:scale-[0.98] rounded-sm">
            Free Roof Inspection
          </a>
          <a href="tel:1-800-555-0200" className="text-center border border-white/10 hover:border-white/30 text-white px-8 min-h-[52px] flex items-center justify-center text-[14px] font-bold uppercase tracking-widest transition-all rounded-sm">
            1-800-555-0200
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Services ─── */
const services = [
  {
    title: 'Shingle Systems',
    desc: 'Architectural and designer shingle installation with 50-year warranty coverage. Wind-rated to 210 km/h.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    ),
  },
  {
    title: 'Flat Roof Engineering',
    desc: 'Commercial-grade TPO and EPDM membrane systems. Full drainage analysis and structural load assessment.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
    ),
  },
  {
    title: 'Storm Restoration',
    desc: 'Emergency tarp deployment and full insurance claim management. Same-day response for hail and wind damage.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
  },
];

const Services: React.FC = () => (
  <section id="services" className="py-28 px-4 relative">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <span className="text-[11px] font-mono text-ember-400/70 uppercase tracking-[0.2em] mb-4 block">Core Capabilities</span>
        <h3 className="text-[32px] font-bold text-white tracking-tight">Structural Roofing Services</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div key={i} className="group bg-surface-card border border-white/5 p-8 rounded-sm hover:border-ember-500/20 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ember-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="text-ember-400 mb-6 w-12 h-12 flex items-center justify-center bg-ember-500/10 rounded-sm border border-ember-500/10">
              {s.icon}
            </div>
            <h4 className="text-white font-semibold text-lg mb-3 tracking-tight">{s.title}</h4>
            <p className="text-stone-500 text-[14px] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Stats ─── */
const Stats: React.FC = () => (
  <section className="py-20 px-4 border-y border-white/5">
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { value: '1,800+', label: 'Roofs Completed' },
        { value: '50yr', label: 'Warranty Coverage' },
        { value: '210km/h', label: 'Wind Rating' },
        { value: '24hr', label: 'Storm Response' },
      ].map((stat, i) => (
        <div key={i}>
          <div className="text-[28px] font-bold text-white tracking-tight mb-1">{stat.value}</div>
          <div className="text-[12px] font-mono text-stone-500 uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Process ─── */
const Process: React.FC = () => (
  <section id="process" className="py-28 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <span className="text-[11px] font-mono text-ember-400/70 uppercase tracking-[0.2em] mb-4 block">Methodology</span>
        <h3 className="text-[32px] font-bold text-white tracking-tight">Engineering Process</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { step: '01', title: 'Inspection', desc: 'Drone-assisted structural assessment.' },
          { step: '02', title: 'Blueprint', desc: 'Material spec and load engineering.' },
          { step: '03', title: 'Installation', desc: 'Precision crew deployment.' },
          { step: '04', title: 'Certification', desc: 'Final inspection and warranty seal.' },
        ].map((p, i) => (
          <div key={i} className="relative">
            <span className="text-[48px] font-bold text-white/5 leading-none block mb-4">{p.step}</span>
            <h4 className="text-white font-semibold text-base mb-2">{p.title}</h4>
            <p className="text-stone-500 text-[13px]">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Contact Form ─── */
const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-28 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-ember-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto relative z-10">
        <div className="mb-12">
          <span className="text-[11px] font-mono text-ember-400/70 uppercase tracking-[0.2em] mb-4 block">Get Started</span>
          <h3 className="text-[32px] font-bold text-white tracking-tight mb-4">Schedule an Inspection</h3>
          <p className="text-stone-500 text-[15px]">Our structural engineers will assess your roof and deliver a comprehensive durability report.</p>
        </div>

        {submitted ? (
          <div className="bg-surface-card border border-ember-500/20 p-12 text-center rounded-sm glow-ember">
            <div className="text-ember-400 mb-4 w-12 h-12 mx-auto flex items-center justify-center rounded-full border border-ember-500/30 bg-ember-500/10">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h4 className="text-white font-semibold text-xl mb-2">Inspection Scheduled.</h4>
            <p className="text-stone-500 text-[14px]">Our team will contact you within 24 hours to confirm.</p>
          </div>
        ) : (
          <form className="bg-surface-card border border-white/5 p-8 md:p-10 rounded-sm space-y-6 relative" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ember-500/20 to-transparent"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Full Name</label>
                <input type="text" required className="bg-surface-base border border-white/10 p-4 min-h-[48px] text-white text-[15px] focus:border-ember-500/40 outline-none transition-colors rounded-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Phone</label>
                <input type="tel" required className="bg-surface-base border border-white/10 p-4 min-h-[48px] text-white text-[15px] focus:border-ember-500/40 outline-none transition-colors rounded-sm" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Property Address</label>
              <input type="text" className="bg-surface-base border border-white/10 p-4 min-h-[48px] text-white text-[15px] placeholder:text-stone-600 focus:border-ember-500/40 outline-none transition-colors rounded-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Describe the Issue</label>
              <textarea rows={4} required className="bg-surface-base border border-white/10 p-4 min-h-[48px] text-white text-[15px] focus:border-ember-500/40 outline-none transition-colors resize-none rounded-sm"></textarea>
            </div>

            <button type="submit" className="w-full bg-ember-600 hover:bg-ember-500 text-white min-h-[52px] text-[14px] font-bold uppercase tracking-widest transition-all active:scale-[0.98] mt-2 rounded-sm">
              Request Inspection
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

/* ─── Footer ─── */
const Footer: React.FC = () => (
  <footer className="py-12 px-4 border-t border-white/5">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <h5 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Summit Roofing Co.</h5>
        <p className="text-stone-600 text-[12px] font-mono">LIC# R-204819 · CertainTeed SELECT ShingleMaster</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-surface-card border border-white/5 px-4 py-2 rounded-sm">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Performance: Optimized</span>
        </div>
      </div>

      <div className="text-[11px] font-mono text-stone-600 tracking-wide">
        © {new Date().getFullYear()} Summit Roofing. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ─── App ─── */
const App: React.FC = () => (
  <div className="min-h-screen bg-surface-base flex flex-col">
    <Header />
    <main className="flex-1">
      <Hero />
      <Services />
      <Stats />
      <Process />
      <ContactForm />
    </main>
    <Footer />
  </div>
);

export default App;
