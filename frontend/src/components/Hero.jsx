/* ──────────────────────────────────────────────────
   HERO (Awareness)
   Outcome-led headline, dual CTA (primary → book call,
   secondary → see services), tech trust strip beneath.
   Edit copy via the constants at the top.
────────────────────────────────────────────────── */

const TECH_LOGOS = [
  { name: 'React',     icon: 'fab fa-react' },
  { name: 'Next.js',   icon: 'fas fa-bolt' },
  { name: 'Node.js',   icon: 'fab fa-node-js' },
  { name: 'Python',    icon: 'fab fa-python' },
  { name: 'FastAPI',   icon: 'fas fa-server' },
  { name: 'Flutter',   icon: 'fas fa-mobile-screen' },
  { name: 'Android',   icon: 'fab fa-android' },
  { name: 'iOS',       icon: 'fab fa-apple' },
]

export default function Hero({ onGetStarted }) {
  const scrollTo = id => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="hero-gradient" />
        <div className="hero-pattern" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Eyebrow / positioning badge */}
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-5 py-2 text-sm font-medium mb-8">
          <i className="fas fa-code text-purple-400" />
          <span>Software · Web · Mobile · AI — built end-to-end</span>
        </div>

        {/* Headline — names the outcome, not the technology */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
          We build the software,
          <br />
          web, mobile and <span className="gradient-text">AI products</span>
          <br />
          other teams quote you 6 months for.
        </h1>

        {/* Subhead — one line, benefit-driven */}
        <p className="max-w-2xl mx-auto text-gray-400 text-lg sm:text-xl leading-relaxed mb-10">
          A senior product team for hire — MERN, MEAN, Next.js, FastAPI and AI integrations.
          Ship a working MVP in weeks, not quarters.
        </p>

        {/* Dual CTA — primary (book) + secondary (see services) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5"
          >
            <i className="fas fa-calendar-alt" />
            Book a Free Consultation
          </button>
          <button
            onClick={() => scrollTo('#services')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-white glass-card border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all"
          >
            <i className="fas fa-briefcase" />
            See Our Work
          </button>
        </div>

        {/* Trust strip — tech stack logos */}
        <div className="mt-16">
          <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-5">Stacks we ship every week</div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-gray-400">
            {TECH_LOGOS.map(t => (
              <div key={t.name} className="flex items-center gap-2 text-sm">
                <i className={`${t.icon} text-purple-300/80 text-lg`} />
                <span className="font-medium">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
