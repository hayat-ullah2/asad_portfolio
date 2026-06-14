/* ──────────────────────────────────────────────────
   PROCESS — "How we work"
   4-step roadmap to reduce risk perception.
   Edit copy via STEPS below.
────────────────────────────────────────────────── */

const STEPS = [
  {
    n: '01',
    icon: 'fas fa-compass',
    title: 'Discovery',
    desc: 'Free 30-min call. We pressure-test your idea, scope the MVP, and send a written plan with timeline + price within 48h.',
  },
  {
    n: '02',
    icon: 'fas fa-hammer',
    title: 'Build',
    desc: 'Weekly demos, shared Linear board, direct Slack to the engineers. You see real progress every Friday — not status reports.',
  },
  {
    n: '03',
    icon: 'fas fa-vial',
    title: 'Test',
    desc: 'Automated test coverage, manual QA, performance audits and a security pass before anything touches production.',
  },
  {
    n: '04',
    icon: 'fas fa-rocket',
    title: 'Launch',
    desc: 'We ship to production, monitor for 14 days, and hand over docs + a clean repo your team can own from day one.',
  },
]

export default function Process({ onGetStarted }) {
  return (
    <section id="process" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <i className="fas fa-route" />
            <span>How we work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Predictable delivery — in four steps.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Same process for every engagement, whether you're shipping a marketing site or an AI agent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(s => (
            <div key={s.n} className="glass-card rounded-2xl p-6 relative overflow-hidden">
              {/* Watermark step number */}
              <div className="absolute -top-3 -right-1 text-7xl font-black text-white/[0.04] select-none leading-none">
                {s.n}
              </div>
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                  <i className={`${s.icon} text-white`} />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-purple-300/80 font-semibold mb-1">
                  Step {s.n}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
          >
            <i className="fas fa-play" />
            Start with Step 1 — Book Discovery
          </button>
        </div>
      </div>
    </section>
  )
}
