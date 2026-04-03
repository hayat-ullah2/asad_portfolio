import { useState } from 'react'

const FAQS = [
  {
    q: 'How quickly can I get an AI voice agent set up?',
    a: 'Most clients are up and running within 48 hours. We handle all the configuration, voice tuning, and integration with your existing phone system — no technical knowledge required on your end.',
  },
  {
    q: 'Will the AI agent sound natural to my customers?',
    a: "Absolutely. Our agents are built on cutting-edge conversational AI and are specifically tuned for your industry and business. Most callers won't realize they're talking to an AI unless you tell them.",
  },
  {
    q: 'What phone systems and CRMs does SixFlow integrate with?',
    a: 'SixFlow integrates with virtually any phone system and popular CRMs including HubSpot, Salesforce, GoHighLevel, and more. We also support Google Calendar, Calendly, and most booking platforms for seamless appointment scheduling.',
  },
  {
    q: 'Can I customize what the AI says and how it responds?',
    a: "Yes — entirely. We work with you to script the agent's personality, tone, FAQs, and call flows to match your brand voice. You can also provide ongoing feedback and we'll continue refining the agent.",
  },
  {
    q: 'What happens if a caller asks something the AI can\'t handle?',
    a: 'The agent is trained to recognize when a question is outside its scope and will either take a message, schedule a callback, or transfer the call to a human — however you prefer to handle those situations.',
  },
  {
    q: 'How much does SixFlow cost?',
    a: "Pricing is customized based on call volume, number of agents, and the features you need. We offer flexible plans with no long-term contracts. Book a free consultation and we'll put together a proposal tailored to your business.",
  },
  {
    q: 'Is there a contract or minimum commitment?',
    a: "No long-term contracts required. We operate month-to-month so you're never locked in. That said, most clients stick around because the results speak for themselves.",
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen(v => !v)}
      >
        <span className="text-white font-medium text-sm sm:text-base">{q}</span>
        <i
          className={`fas fa-chevron-down text-purple-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about SixFlow AI voice agents
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
