import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#features',    label: 'Features' },
  { href: '#about',       label: 'About' },
  { href: '#agents',      label: 'AI Agents' },
  { href: '#agent-types', label: 'Agent Types' },
  { href: '#analytics',   label: 'Analytics' },
  { href: '#testimonials',label: 'Testimonials' },
  { href: '#community',   label: 'Community' },
  { href: '#faq',         label: 'FAQ' },
]

export default function Navbar({ onGetStarted }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  const handleNavClick = (e, href) => {
    e.preventDefault()
    closeMobile()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Brand */}
            <a
              href="#"
              className="flex items-center gap-3 flex-shrink-0"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              <img src="/logo.png" alt="SixFlow Automations" className="h-9 w-auto" />
              <div className="leading-none">
                <div className="font-bold text-white text-base tracking-tight">SixFlow</div>
                <div className="text-xs text-gray-400 tracking-wider uppercase">Automations</div>
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={onGetStarted}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
              >
                Get Started
              </button>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-6 bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Mobile drawer */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 bg-[#060d1f] border-l border-white/10 flex flex-col transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="SixFlow Automations" className="h-8 w-auto" />
            <div className="leading-none">
              <div className="font-bold text-white text-sm">SixFlow</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Automations</div>
            </div>
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
            onClick={closeMobile}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Mobile links */}
        <div className="flex-1 overflow-y-auto py-4">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleNavClick(e, link.href)}
              className="block px-6 py-3.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="p-5 border-t border-white/10">
          <button
            onClick={() => { closeMobile(); onGetStarted() }}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
          >
            Get Started
          </button>
        </div>
      </nav>
    </>
  )
}
