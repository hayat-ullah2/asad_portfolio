import { useState, useEffect, useCallback } from 'react'

// Testimonials longer than this many characters get a "Show more" toggle.
const CHAR_THRESHOLD = 280

const TESTIMONIALS = [
  {
    text: `In one word…WOW! This system has made my life so much easier! Adam and Noah set up my system exactly how I needed it to work for my business and my members. Our assistant, Hollie, has truly become an integral part of our team! I have recommended this system to everyone I know, and I will continue to recommend it. If you need your days to be even a little bit easier, then get SixFlow to set up your system now! Thanks, Adam and Noah!`,
    name: 'Aimee Van Vlack',
    company: 'Business Manager/Owner of van Jango Studio of Martial Arts',
  },
  {
    text: `Working with SixFlow Automations has been nothing short of exceptional. From the very beginning, their team not only understood my vision but also brought it to life with speed, precision, and creativity. One of the AI flows I needed was complex and mission-critical, yet they delivered it faster than I thought possible and with flawless execution.\n\nWhat impressed me most was their commitment to continuous improvement. They provided constant updates, actively sought my feedback, and immediately implemented adjustments that made the solution even more effective. The collaboration felt like a true partnership: they listened carefully, offered expert guidance, and ensured every detail was aligned with Clariset's goals.\n\nThe results speak for themselves. The AI voice calling system they built exceeded expectations, driving impact far beyond what I anticipated. Their combination of technical excellence, responsiveness, and genuine care for client success makes them stand out in this space.\n\nFor anyone considering their services: I cannot recommend SixFlow Automations highly enough. It's a 10/10 experience across the board, and they will absolutely deliver both the service and the results you're looking for.`,
    name: 'Dave Gruskin',
    company: 'CEO, Clariset',
  },
  {
    text: `SixFlow Automations completely changed the way we handle calls. Our new AI voice agent greets clients professionally, answers their questions, and books appointments without needing us to lift a finger. The setup was fast, the support has been excellent, and the results has saved our team hours every week.`,
    name: 'Gurshaan Singh',
    company: 'CEO, Bluehorse Construction Group Ltd.',
  },
]

function Stars() {
  return (
    <div className="flex gap-1 text-yellow-400 text-sm">
      {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star" />)}
    </div>
  )
}

export default function Testimonials({ onGetStarted }) {
  const [current, setCurrent]   = useState(0)
  const [paused, setPaused]     = useState(false)
  const [expanded, setExpanded] = useState(false)

  const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = useCallback(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), [])

  // Auto-advance — paused while user hovers OR while reading an expanded quote.
  useEffect(() => {
    if (paused || expanded) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [paused, expanded, next])

  // Reset "Show more" state when navigating to a different testimonial.
  useEffect(() => { setExpanded(false) }, [current])

  const t      = TESTIMONIALS[current]
  const isLong = t.text.length > CHAR_THRESHOLD

  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SOCIAL PROOF — real founders, real shipped work */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <i className="fas fa-quote-left" />
            <span>Client outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Founders we shipped for.</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Read what the engineering leaders and founders we've built with say — unedited.
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

            {/* Text — clamps to 6 lines when long & collapsed */}
            <p
              className={`text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line ${
                isLong && !expanded ? 'line-clamp-6' : ''
              }`}
            >
              {t.text}
            </p>

            {/* Show more / less toggle — only renders for long quotes */}
            {isLong && (
              <button
                onClick={() => setExpanded(v => !v)}
                className="mt-3 inline-flex items-center gap-1.5 text-purple-300 hover:text-purple-200 text-sm font-medium transition-colors"
              >
                {expanded ? 'Show less' : 'Show more'}
                <i className={`fas fa-chevron-down text-xs transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            )}

            {/* Footer — logo removed; just name/company + stars */}
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-white font-semibold">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.company}</div>
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

        {/* Section CTA */}
        {onGetStarted && (
          <div className="mt-12 text-center">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
            >
              <i className="fas fa-calendar-alt" />
              Be Our Next Case Study
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
