const RECEPTIONIST_FEATURES = [
  'Handles missed calls automatically',
  'Schedules appointments directly to your calendar',
  'Screens and qualifies potential customers',
  'Provides instant answers to common questions',
  'Collects customer information and requirements',
]

const SALES_FEATURES = [
  'Reaches out to warm leads immediately',
  'Follows up on website inquiries within minutes',
  'Books sales consultations and demos',
  'Sends automated appointment confirmations',
  'Requests reviews from satisfied clients',
  'Performs customer check-ins and follow-ups',
  'Identifies upselling opportunities',
]

function FeatureItem({ text }) {
  return (
    <li className="flex items-start gap-3 text-gray-300 text-sm">
      <i className="fas fa-check-circle text-purple-400 mt-0.5 flex-shrink-0" />
      {text}
    </li>
  )
}

export default function AgentTypes() {
  return (
    <section id="agent-types" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">AI Agent Types</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the right AI agent for your business needs. Each agent is customized to your specific requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Receptionist */}
          <div className="glass-card gradient-border rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <i className="fas fa-headset text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Receptionist</h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your virtual front desk that never sleeps. Handles incoming calls professionally
              while you focus on running your business.
            </p>

            <ul className="space-y-3">
              {RECEPTIONIST_FEATURES.map((f, i) => <FeatureItem key={i} text={f} />)}
            </ul>
          </div>

          {/* AI Sales Rep */}
          <div className="glass-card gradient-border rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <i className="fas fa-chart-line text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Sales Rep</h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your proactive sales team member that reaches out to prospects and nurtures leads
              around the clock.
            </p>

            <ul className="space-y-3">
              {SALES_FEATURES.map((f, i) => <FeatureItem key={i} text={f} />)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
