export default function Hero({ onGetStarted }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="hero-gradient" />
        <div className="hero-pattern" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-5 py-2 text-sm font-medium mb-8">
          <i className="fas fa-sparkles text-purple-400" />
          <span>AI-powered business communication</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
          Turn Every Call Into
          <br />
          <span className="gradient-text">Revenue</span>
          <br />
          With AI Voice Agents
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-gray-400 text-lg sm:text-xl leading-relaxed mb-10">
          Never miss another lead. Our AI voice agents handle calls 24/7, qualify prospects,
          and book appointments while you focus on growing your business.
        </p>

        {/* CTA */}
        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5"
        >
          <i className="fas fa-calendar-alt" />
          Schedule a Consultation
        </button>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <i className="fas fa-check-circle text-green-400" />
            <span>No setup fees</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-check-circle text-green-400" />
            <span>Live in 48 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-check-circle text-green-400" />
            <span>24/7 availability</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-check-circle text-green-400" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
