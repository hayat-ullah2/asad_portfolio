const SOCIALS = [
  {
    icon: 'fab fa-tiktok',
    platform: 'TikTok',
    handle: '@sixflowautomations',
    desc: 'Short-form AI automation tips & demos',
    href: 'https://www.tiktok.com/@sixflowautomations',
    color: 'from-pink-600 to-purple-600',
  },
  {
    icon: 'fab fa-youtube',
    platform: 'YouTube',
    handle: '@SixflowAutomations',
    desc: 'In-depth tutorials, case studies & walkthroughs',
    href: 'https://www.youtube.com/@SixflowAutomations',
    color: 'from-red-600 to-red-500',
  },
  {
    icon: 'fab fa-instagram',
    platform: 'Instagram',
    handle: '@sixflowautomations',
    desc: 'Behind-the-scenes & client success stories',
    href: 'https://www.instagram.com/sixflowautomations/',
    color: 'from-pink-500 to-orange-500',
  },
]

export default function Community() {
  return (
    <section id="community" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <i className="fas fa-users" />
            <span>Join the Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Follow Our Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay up to date with AI automation tips, case studies, and the latest SixFlow news across our social channels.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {SOCIALS.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/[0.07] transition-colors group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                <i className={`${s.icon} text-white text-2xl`} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-lg">{s.platform}</span>
                  <i className="fas fa-external-link-alt text-gray-500 text-xs group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="text-purple-400 text-sm font-medium mb-2">{s.handle}</div>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
