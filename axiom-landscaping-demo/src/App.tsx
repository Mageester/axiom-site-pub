import React, { useState } from 'react';

/* ─── Header ─── */
const Header: React.FC = () => (
  <header className="sticky top-0 z-50 w-full bg-surface-base/80 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-grove-500 rounded-sm flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <h1 className="text-white font-bold text-lg tracking-tight leading-none">Verdant</h1>
          <span className="text-grove-300/60 text-[11px] font-mono uppercase tracking-widest">Outdoor Architecture</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-stone-400">
        <a href="#services" className="px-4 py-3 hover:text-white transition-colors">Services</a>
        <a href="#portfolio" className="px-4 py-3 hover:text-white transition-colors">Portfolio</a>
        <a href="#contact" className="px-4 py-3 hover:text-white transition-colors">Contact</a>
      </nav>

      <a href="tel:1-800-555-0300" className="flex items-center gap-2 bg-grove-600 hover:bg-grove-500 text-white px-5 min-h-[48px] text-[13px] font-bold uppercase tracking-wider transition-all active:scale-[0.97] rounded-sm">
        Free Consultation
      </a>
    </div>
  </header>
);

/* ─── Hero ─── */
const Hero: React.FC = () => (
  <section className="relative pt-28 pb-36 px-4 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-grove-700/10 via-surface-base to-surface-base"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-grove-500/5 blur-[120px]"></div>
    </div>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-grove-500/10 border border-grove-500/20 text-grove-300 px-4 py-2 rounded-sm text-[12px] font-mono uppercase tracking-widest mb-8">
          <div className="w-1.5 h-1.5 bg-grove-400 rounded-full animate-pulse"></div>
          Premium Landscape Design
        </div>

        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-white mb-6 leading-[1.05] tracking-tight">
          Transform Your<br />Outdoor Space.
        </h2>

        <p className="text-[17px] text-stone-400 mb-10 max-w-lg leading-relaxed">
          We design and engineer pristine outdoor environments — from living walls to hardscape architecture. Precision craftsmanship for residential and commercial properties.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a href="#contact" className="text-center bg-grove-600 hover:bg-grove-500 text-white px-8 min-h-[52px] flex items-center justify-center text-[14px] font-bold uppercase tracking-widest transition-all active:scale-[0.98] rounded-sm">
            Design Consultation
          </a>
          <a href="tel:1-800-555-0300" className="text-center border border-white/10 hover:border-white/30 text-white px-8 min-h-[52px] flex items-center justify-center text-[14px] font-bold uppercase tracking-widest transition-all rounded-sm">
            1-800-555-0300
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Services ─── */
const services = [
  {
    title: 'Landscape Design',
    desc: 'Custom-engineered garden architecture with 3D rendering. Native plantings, irrigation systems, and seasonal bloom planning.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
  },
  {
    title: 'Hardscape Architecture',
    desc: 'Precision-cut stonework, retaining walls, and outdoor living structures. Engineered for drainage and structural integrity.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    ),
  },
  {
    title: 'Seasonal Maintenance',
    desc: 'Year-round property care programs — spring preparation, summer mowing, fall cleanup, and winter protection protocols.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
];

const Services: React.FC = () => (
  <section id="services" className="py-28 px-4 relative">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <span className="text-[11px] font-mono text-grove-400/70 uppercase tracking-[0.2em] mb-4 block">Core Capabilities</span>
        <h3 className="text-[32px] font-bold text-white tracking-tight">Outdoor Engineering Services</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div key={i} className="group bg-surface-card border border-white/5 p-8 rounded-sm hover:border-grove-500/20 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-grove-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="text-grove-400 mb-6 w-12 h-12 flex items-center justify-center bg-grove-500/10 rounded-sm border border-grove-500/10">
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
        { value: '650+', label: 'Properties Transformed' },
        { value: '12+', label: 'Years of Craft' },
        { value: '100%', label: 'Organic Materials' },
        { value: '4 Season', label: 'Maintenance Plans' },
      ].map((stat, i) => (
        <div key={i}>
          <div className="text-[28px] font-bold text-white tracking-tight mb-1">{stat.value}</div>
          <div className="text-[12px] font-mono text-stone-500 uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ─── Portfolio Showcase ─── */
const Portfolio: React.FC = () => (
  <section id="portfolio" className="py-28 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <span className="text-[11px] font-mono text-grove-400/70 uppercase tracking-[0.2em] mb-4 block">Recent Work</span>
        <h3 className="text-[32px] font-bold text-white tracking-tight">Transformation Gallery</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Modern Zen Courtyard', tag: 'Residential' },
          { title: 'Commercial Atrium', tag: 'Commercial' },
          { title: 'Heritage Stone Path', tag: 'Hardscape' },
        ].map((p, i) => (
          <div key={i} className="group bg-surface-card border border-white/5 rounded-sm overflow-hidden hover:border-grove-500/20 transition-all duration-500">
            <div className="h-48 bg-gradient-to-br from-grove-700/20 to-surface-elevated flex items-center justify-center">
              <svg className="w-12 h-12 text-grove-500/30 group-hover:text-grove-500/50 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div className="p-6">
              <span className="text-[10px] font-mono text-grove-400/70 uppercase tracking-widest">{p.tag}</span>
              <h4 className="text-white font-semibold text-base mt-1">{p.title}</h4>
            </div>
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-grove-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto relative z-10">
        <div className="mb-12">
          <span className="text-[11px] font-mono text-grove-400/70 uppercase tracking-[0.2em] mb-4 block">Get Started</span>
          <h3 className="text-[32px] font-bold text-white tracking-tight mb-4">Begin Your Transformation</h3>
          <p className="text-stone-500 text-[15px]">Our design team will assess your property and develop a custom landscape architecture plan.</p>
        </div>

        {submitted ? (
          <div className="bg-surface-card border border-grove-500/20 p-12 text-center rounded-sm glow-grove">
            <div className="text-grove-400 mb-4 w-12 h-12 mx-auto flex items-center justify-center rounded-full border border-grove-500/30 bg-grove-500/10">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h4 className="text-white font-semibold text-xl mb-2">Consultation Requested.</h4>
            <p className="text-stone-500 text-[14px]">Our lead designer will reach out within 48 hours.</p>
          </div>
        ) : (
          <form className="bg-surface-card border border-white/5 p-8 md:p-10 rounded-sm space-y-6 relative" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-grove-500/20 to-transparent"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Full Name</label>
                <input type="text" required className="bg-surface-base border border-white/10 p-4 min-h-[48px] text-white text-[15px] focus:border-grove-500/40 outline-none transition-colors rounded-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Phone</label>
                <input type="tel" required className="bg-surface-base border border-white/10 p-4 min-h-[48px] text-white text-[15px] focus:border-grove-500/40 outline-none transition-colors rounded-sm" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Property Address</label>
              <input type="text" className="bg-surface-base border border-white/10 p-4 min-h-[48px] text-white text-[15px] placeholder:text-stone-600 focus:border-grove-500/40 outline-none transition-colors rounded-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Project Vision</label>
              <textarea rows={4} required className="bg-surface-base border border-white/10 p-4 min-h-[48px] text-white text-[15px] focus:border-grove-500/40 outline-none transition-colors resize-none rounded-sm" placeholder="Describe your ideal outdoor space..."></textarea>
            </div>

            <button type="submit" className="w-full bg-grove-600 hover:bg-grove-500 text-white min-h-[52px] text-[14px] font-bold uppercase tracking-widest transition-all active:scale-[0.98] mt-2 rounded-sm">
              Request Design Consultation
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
        <h5 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Verdant Landscapes</h5>
        <p className="text-stone-600 text-[12px] font-mono">LIC# L-307215 · Certified Landscape Architects</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-surface-card border border-white/5 px-4 py-2 rounded-sm">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">Performance: Optimized</span>
        </div>
      </div>

      <div className="text-[11px] font-mono text-stone-600 tracking-wide">
        © {new Date().getFullYear()} Verdant Landscapes. All rights reserved.
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
      <Portfolio />
      <ContactForm />
    </main>
    <Footer />
  </div>
);

export default App;
