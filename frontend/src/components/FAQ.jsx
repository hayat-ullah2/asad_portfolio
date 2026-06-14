/* ──────────────────────────────────────────────────
   OBJECTION HANDLING — FAQ
   Each answer reframes a real buyer hesitation
   (timeline, pricing, ownership, AI risk, contracts).
────────────────────────────────────────────────── */

import { useState } from 'react'

const FAQS = [
  {
    q: 'How fast can you actually start?',
    a: 'Discovery call within 24 hours of you booking. If we\'re a good fit, we send a written proposal within 48 hours and kick off the build the following Monday.',
  },
  {
    q: "We've been burned by agencies before — what's different here?",
    a: 'Three things: senior engineers only (no juniors silently doing the work), weekly demos so you see progress every Friday, and a 14-day post-launch hypercare guarantee. If something\'s broken at launch, we fix it on our dime.',
  },
  {
    q: 'How much does a typical project cost?',
    a: 'MVPs start at $9.5k for a tightly scoped product. Dedicated team engagements start at $7.5k per engineer per month. Our AI Build Sprint is fixed at $14.5k for a 2-week production-ready feature. Real numbers come on the call once we know your scope.',
  },
  {
    q: 'Do you do MERN, MEAN, Next.js or FastAPI specifically?',
    a: 'Yes — these are our daily stacks. We pick the one that fits the problem, not the one we want to bill for. We\'ll tell you on the discovery call which stack we\'d recommend and why.',
  },
  {
    q: 'Can you actually build serious AI features, or is it a buzzword for you?',
    a: "Both AI integration (adding LLM features to existing products — chat, search, voice, summarization) and AI-powered apps (greenfield products built around agents). We've shipped 40+ AI features in production. We'll show you on the call.",
  },
  {
    q: "What about mobile — do you build native, or just web wrappers?",
    a: 'We ship production-grade React Native and Flutter apps that publish to both App Store and Play Store. Native modules where they matter (camera, payments, push). Not Cordova-style wrappers.',
  },
  {
    q: 'Who owns the code at the end?',
    a: 'You do. 100%. From day one, code lives in your GitHub org. We hand over with full documentation so your team can take it forward without us.',
  },
  {
    q: 'Are we locked into a long contract?',
    a: 'No. Fixed-scope projects end when we ship. Dedicated team engagements are monthly with 2-week notice — scale up, scale down, or stop. We\'d rather earn the next month than trap you.',
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

export default function FAQ({ onGetStarted }) {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <i className="fas fa-circle-question" />
            <span>Before you book</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The questions every buyer asks us.
          </h2>
          <p className="text-gray-400 text-lg">
            Answered honestly. If yours isn't here, ask on the call.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
          >
            <i className="fas fa-calendar-alt" />
            Still Have Questions? Book a Call
          </button>
        </div>
      </div>
    </section>
  )
}
