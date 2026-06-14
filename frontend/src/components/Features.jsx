/* ──────────────────────────────────────────────────
   PAIN / INTEREST
   3 cards naming the buyer's actual problem so they
   self-identify. Edit copy via PAINS below.
────────────────────────────────────────────────── */

const PAINS = [
  {
    icon: 'fas fa-hourglass-half',
    title: 'Roadmaps that slip by quarters',
    desc: 'You agreed to "8 weeks" and you\'re now in month five. Engineers ship in fragments while competitors ship features. Sound familiar?',
  },
  {
    icon: 'fas fa-user-slash',
    title: 'Freelancers that ghost mid-build',
    desc: 'Solo devs vanish, communication dies, and you end up paying twice — once to start, once to clean up the mess and finish.',
  },
  {
    icon: 'fas fa-robot',
    title: 'No serious AI capability in-house',
    desc: 'Every competitor brief mentions "AI" and your team can\'t evaluate, ship, or even scope it. The gap widens every month you wait.',
  },
]

export default function Features({ onGetStarted }) {
  return (
    <section id="pain" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <i className="fas fa-triangle-exclamation" />
            <span>Why teams come to us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            If any of this sounds like your last build…
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            You're not alone. These are the three reasons engineering leaders book a call with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PAINS.map((p, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-7 hover:border-purple-500/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center mb-5">
                <i className={`${p.icon} text-purple-400 text-lg`} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Section-level CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
          >
            <i className="fas fa-calendar-alt" />
            Talk to an Engineer — Free 30 min
          </button>
        </div>
      </div>
    </section>
  )
}
