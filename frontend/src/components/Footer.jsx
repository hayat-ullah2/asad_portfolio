const LINKS = {
  Services: [
    { label: 'Software Apps',  href: '#services' },
    { label: 'Web',            href: '#services' },
    { label: 'Mobile (iOS/Android)', href: '#services' },
    { label: 'AI Integration', href: '#services' },
  ],
  Company: [
    { label: 'Results',       href: '#results' },
    { label: 'Process',       href: '#process' },
    { label: 'Pricing',       href: '#pricing' },
    { label: 'FAQ',           href: '#faq' },
  ],
  Contact: [
    { label: 'hello@nexuraawt.com',      href: 'mailto:hello@nexuraawt.com' },
    { label: 'Book a Free Consultation', href: '#', cta: true },
  ],
}

// 🔧 Replace # with your NexuraAWT social account URLs once they exist.
const SOCIALS = [
  { icon: 'fab fa-tiktok',    href: '#', label: 'TikTok' },
  { icon: 'fab fa-youtube',   href: '#', label: 'YouTube' },
  { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },
  { icon: 'fab fa-linkedin',  href: '#', label: 'LinkedIn' },
]

export default function Footer({ onGetStarted }) {
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="leading-none">
                <div className="font-bold text-white text-sm">NexuraAWT</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Build · AI · Web</div>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed mb-5">
              A senior product team for hire. We ship software, web, mobile and AI products other teams quote you 6 months for.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <i className={`${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    {item.cta ? (
                      <button
                        onClick={onGetStarted}
                        className="text-purple-400 hover:text-purple-300 text-sm transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={e => handleNavClick(e, item.href)}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} NexuraAWT. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
