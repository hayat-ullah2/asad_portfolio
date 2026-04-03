const DEMOS = [
  {
    icon: 'fas fa-tools',
    title: 'Home & Hardware',
    desc: 'Product support and service scheduling',
    src: '/Home and Hardware.mp3',
  },
  {
    icon: 'fas fa-cut',
    title: 'Salon Booking',
    desc: 'Professional appointment scheduling for salon services',
    src: '/Salon.mp3',
  },
  {
    icon: 'fas fa-home',
    title: 'Real Estate',
    desc: 'Property inquiries and showing appointments',
    src: '/Real Estate.mp3',
  },
]

export default function AudioDemos() {
  return (
    <section id="agents" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Hear Your AI Agents in Action
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Listen to real conversations showcasing how our AI agents handle different
            business scenarios with professional expertise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMOS.map((demo, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center">
                <i className={`${demo.icon} text-purple-400 text-lg`} />
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{demo.title}</h3>
                <p className="text-gray-400 text-sm">{demo.desc}</p>
              </div>

              <audio controls className="mt-auto">
                <source src={demo.src} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
