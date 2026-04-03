import { useState, useEffect, useCallback } from 'react'

const TESTIMONIALS = [
  {
    text: `In one word…WOW! This system has made my life so much easier! Adam and Noah set up my system exactly how I needed it to work for my business and my members. Our assistant, Hollie, has truly become an integral part of our team! I have recommended this system to everyone I know, and I will continue to recommend it. If you need your days to be even a little bit easier, then get SixFlow to set up your system now! Thanks, Adam and Noah!`,
    name: 'Aimee Van Vlack',
    company: 'Business Manager/Owner of van Jango Studio of Martial Arts',
    logo: '/Testimonials/van Jango/logo.jpg',
  },
  {
    text: `Working with SixFlow Automations has been nothing short of exceptional. From the very beginning, their team not only understood my vision but also brought it to life with speed, precision, and creativity. One of the AI flows I needed was complex and mission-critical, yet they delivered it faster than I thought possible and with flawless execution.\n\nWhat impressed me most was their commitment to continuous improvement. They provided constant updates, actively sought my feedback, and immediately implemented adjustments that made the solution even more effective. The collaboration felt like a true partnership: they listened carefully, offered expert guidance, and ensured every detail was aligned with Clariset's goals.\n\nThe results speak for themselves. The AI voice calling system they built exceeded expectations, driving impact far beyond what I anticipated. Their combination of technical excellence, responsiveness, and genuine care for client success makes them stand out in this space.\n\nFor anyone considering their services: I cannot recommend SixFlow Automations highly enough. It's a 10/10 experience across the board, and they will absolutely deliver both the service and the results you're looking for.`,
    name: 'Dave Gruskin',
    company: 'CEO, Clariset',
    logo: '/Testimonials/Clariset/logo.jpg',
  },
  {
    text: `SixFlow Automations completely changed the way we handle calls. Our new AI voice agent greets clients professionally, answers their questions, and books appointments without needing us to lift a finger. The setup was fast, the support has been excellent, and the results has saved our team hours every week.`,
    name: 'Gurshaan Singh',
    company: 'CEO, Bluehorse Construction Group Ltd.',
    logo: '/Testimonials/Bluehorse Construction Group Ltd/logo.png',
  },
]

function Stars() {
  return (
    <div className="flex gap-1 text-yellow-400 text-sm">
      {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star" />)}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)

  const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = useCallback(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), [])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [paused, next])

  const t = TESTIMONIALS[current]

  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how SixFlow AI voice agents are transforming businesses across industries
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
          >
            <i className="fas fa-chevron-left text-sm" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
          >
            <i className="fas fa-chevron-right text-sm" />
          </button>

          {/* Card */}
          <div className="glass-card gradient-border rounded-2xl p-8">
            {/* Quote icon */}
            <div className="text-purple-500/30 text-6xl leading-none font-serif mb-4 select-none">"</div>

            {/* Text */}
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-8 whitespace-pre-line">
              {t.text}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                  <img
                    src={t.logo}
                    alt={t.company}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.company}</div>
                </div>
              </div>
              <Stars />
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? 'w-6 bg-purple-500'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
