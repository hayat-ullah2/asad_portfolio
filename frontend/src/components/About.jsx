const STATS = [
  { value: '500+', label: 'Calls Handled Daily' },
  { value: '48h',  label: 'Average Setup Time' },
  { value: '24/7', label: 'Uptime Guarantee' },
  { value: '98%',  label: 'Client Satisfaction' },
]

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <i className="fas fa-users" />
              <span>About SixFlow</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              We're on a Mission to{' '}
              <span className="gradient-text">Eliminate Missed Opportunities</span>
            </h2>

            <p className="text-gray-400 leading-relaxed mb-4">
              SixFlow Automations was founded with a simple belief: every business deserves the power
              of a world-class phone team, regardless of size or budget. Missed calls mean missed
              revenue — and that's a problem we set out to solve.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our AI voice agents are built on the latest large-language models and conversational
              AI technology, designed from the ground up to feel natural, professional, and effective.
              We handle the complex integration and tuning so you can focus on what matters most —
              running your business.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <i className="fas fa-map-marker-alt text-purple-400" />
                <span>Serving businesses worldwide</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <i className="fas fa-envelope text-purple-400" />
                <span>info@sixflowautomations.com</span>
              </div>
            </div>
          </div>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map((stat, i) => (
              <div key={i} className="glass-card gradient-border rounded-2xl p-6 text-center">
                <div className="text-3xl sm:text-4xl font-black gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
