const FEATURES = [
  {
    icon: 'fas fa-bolt',
    title: 'Lightning Fast Response',
    desc: 'Answer every call in under 3 seconds. No more missed opportunities or frustrated customers waiting in phone queues.',
  },
  {
    icon: 'fas fa-brain',
    title: 'Smart Lead Qualification',
    desc: 'AI agents ask the right questions, qualify prospects, and collect crucial information so you only talk to serious buyers.',
  },
  {
    icon: 'fas fa-calendar-check',
    title: 'Instant Booking',
    desc: 'Seamlessly book appointments directly into your calendar while the prospect is hot and engaged.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Revenue Growth',
    desc: 'Turn missed calls into closed deals. Our clients see immediate revenue increases from captured leads.',
  },
  {
    icon: 'fas fa-clock',
    title: '24/7 Availability',
    desc: 'Never miss another call. Your AI receptionist works nights, weekends, and holidays without breaks.',
  },
  {
    icon: 'fas fa-plug',
    title: 'Seamless Integration',
    desc: 'Connect with your favorite CRM, calendar, and business tools. Works with any phone system in minutes.',
  },
]

// Duplicate for infinite scroll
const TRACK = [...FEATURES, ...FEATURES]

export default function Features() {
  return (
    <section id="features" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Businesses Choose SixFlow
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your customer communication with AI that works harder than your best employee
          </p>
        </div>
      </div>

      {/* Full-width carousel (intentionally bleeds outside container) */}
      <div className="overflow-hidden">
        <div className="features-track gap-6 px-3">
          {TRACK.map((feature, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 flex-shrink-0 w-72"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center mb-5">
                <i className={`${feature.icon} text-purple-400 text-lg`} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
