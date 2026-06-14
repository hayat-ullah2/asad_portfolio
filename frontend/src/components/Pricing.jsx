/* ──────────────────────────────────────────────────
   PRICING — three engagement models.
   Each card's CTA opens the BookingModal with the
   engagement type pre-selected:
     openBooking({ plan: 'hourly' | 'monthly' | 'fixed' })
   Edit copy via TIERS at the top of this file.
────────────────────────────────────────────────── */

const TIERS = [
  {
    id:       'hourly',
    name:     'Hourly',
    tag:      'Pay as you go',
    price:    '$15',
    cadence:  '/ hour',
    subnote:  '',
    tagline:  'Flexible help, billed by the hour.',
    bestFor:  'Small tasks, fixes, short engagements, MVP tweaks.',
    features: [
      'Dedicated developer on your hours',
      'No long-term commitment',
      'Weekly invoicing',
      'Ideal when scope is small or unclear',
    ],
    cta:       'Hire hourly',
    highlight: false,
  },
  {
    id:       'monthly',
    name:     'Monthly',
    tag:      'Dedicated · Long-term',
    price:    '$2,500',
    cadence:  '/ month',
    subnote:  'Min. 3 months · best value for 6+ month builds',
    tagline:  'A dedicated developer for long-term projects.',
    bestFor:  'Ongoing products, long roadmaps, dedicated team.',
    features: [
      'Full-time dedicated developer',
      'Priority support',
      'Weekly sprints & progress reporting',
      'Scalable team — add engineers as you grow',
      'Lower effective hourly rate than ad-hoc',
    ],
    cta:       'Start monthly',
    highlight: true,
  },
  {
    id:       'fixed',
    name:     'Fixed Project',
    tag:      'Defined scope',
    price:    'Custom',
    cadence:  '',
    subnote:  'Fixed quote',
    tagline:  'One price for the whole build.',
    bestFor:  'Defined-scope projects — e-commerce, web/mobile apps, AI products.',
    features: [
      'Fixed scope & timeline',
      'Milestone-based payments',
      'Full delivery — design through launch',
      'Post-launch support window',
    ],
    cta:       'Get a quote',
    highlight: false,
  },
]

function Tier({ tier, onGetStarted }) {
  const highlight = tier.highlight
  return (
    <div
      className={`relative rounded-2xl p-7 flex flex-col h-full ${
        highlight
          ? 'glass-card gradient-border shadow-2xl shadow-purple-500/10 lg:scale-[1.03]'
          : 'glass-card'
      }`}
    >
      {/* "Most popular" badge */}
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[11px] font-semibold uppercase tracking-wider shadow-lg shadow-purple-500/30 whitespace-nowrap">
          Most popular
        </div>
      )}

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-white font-bold text-xl mb-1">{tier.name}</h3>
        <div className="text-purple-300/80 text-xs">{tier.tag}</div>
      </div>

      {/* Price */}
      <div className="mb-5">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-3xl sm:text-4xl font-black gradient-text leading-none">{tier.price}</span>
          {tier.cadence && <span className="text-gray-400 text-sm">{tier.cadence}</span>}
        </div>
        {tier.subnote && (
          <div className="mt-1.5 text-[11px] text-gray-500">{tier.subnote}</div>
        )}
      </div>

      {/* Tagline + best for */}
      <p className="text-gray-300 text-sm leading-relaxed mb-2">{tier.tagline}</p>
      <p className="text-gray-500 text-xs mb-5">
        <span className="text-purple-300/80 font-semibold">Best for:</span> {tier.bestFor}
      </p>

      {/* Feature list */}
      <ul className="space-y-2.5 mb-7 flex-1">
        {tier.features.map(f => (
          <li key={f} className="flex items-start gap-3 text-gray-300 text-sm">
            <i className="fas fa-check-circle text-purple-400 mt-0.5 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA — passes engagement type to the booking modal */}
      <button
        onClick={() => onGetStarted({ plan: tier.id })}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          highlight
            ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/20'
            : 'text-white border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06]'
        }`}
      >
        {tier.cta}
      </button>
    </div>
  )
}

export default function Pricing({ onGetStarted }) {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <i className="fas fa-handshake" />
            <span>How you work with us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three engagement models. Pick the one that fits the work.
          </p>
        </div>

        {/* Cards — stack on mobile, row on desktop */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map(t => <Tier key={t.id} tier={t} onGetStarted={onGetStarted} />)}
        </div>

        {/* Reassurance line */}
        <p className="text-center text-sm text-gray-500 mt-10">
          Not sure which fits?{' '}
          <button
            onClick={() => onGetStarted()}
            className="text-purple-300 hover:text-purple-200 underline-offset-4 hover:underline"
          >
            Book a free consultation
          </button>{' '}
          and we'll recommend the right model.
        </p>
      </div>
    </section>
  )
}
