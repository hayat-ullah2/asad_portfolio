/* ──────────────────────────────────────────────────
   PROOF / RESULTS
   Numbers band — the outcomes a buyer cares about
   before they read a single testimonial.
   Edit copy via METRICS + OUTCOMES below.
────────────────────────────────────────────────── */

const METRICS = [
  { value: '120+', label: 'Products shipped',         hint: 'Across web, mobile, and AI.' },
  { value: '6 wk', label: 'Avg MVP delivery',         hint: 'Idea → live product.' },
  { value: '94%',  label: 'Client retention',         hint: 'Most clients ship a second product with us.' },
  { value: '40+',  label: 'AI features in production',hint: 'Chat, search, voice, agentic flows.' },
]

const OUTCOMES = [
  {
    icon: 'fas fa-rocket',
    title: 'Faster time-to-market',
    desc: 'A senior team that has shipped this stack before — no learning curve, no false starts.',
  },
  {
    icon: 'fas fa-shield-halved',
    title: 'Code your team can own',
    desc: 'Typed, tested, documented. We hand off cleanly so your engineers don\'t inherit a black box.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Measurable business impact',
    desc: 'We define success metrics in week one and instrument the product to track them from day one.',
  },
]

export default function AnalyticsPreview({ onGetStarted }) {
  return (
    <section id="results" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <i className="fas fa-trophy" />
            <span>The numbers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built to ship. Proven by what we shipped.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Output you can point to. Not slide-deck promises.
          </p>
        </div>

        {/* Metrics band */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {METRICS.map(m => (
            <div
              key={m.label}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="text-4xl sm:text-5xl font-black gradient-text leading-none mb-2">
                {m.value}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{m.label}</div>
              <div className="text-gray-500 text-xs leading-snug">{m.hint}</div>
            </div>
          ))}
        </div>

        {/* Outcomes that map to the metrics above */}
        <div className="grid md:grid-cols-3 gap-6">
          {OUTCOMES.map(o => (
            <div key={o.title} className="glass-card rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center mb-4">
                <i className={`${o.icon} text-purple-400`} />
              </div>
              <h4 className="text-white font-semibold mb-1.5">{o.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
          >
            <i className="fas fa-calendar-alt" />
            Get These Outcomes on Your Project
          </button>
        </div>
      </div>
    </section>
  )
}
