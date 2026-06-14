/* ──────────────────────────────────────────────────
   FINAL CTA (Action)
   Restated offer + single bold button + lead form.
   Submits via EmailJS — same credentials as BookingModal.
────────────────────────────────────────────────── */

import { useState } from 'react'
import emailjs from '@emailjs/browser'

// EmailJS — same credentials as BookingModal.jsx
const EMAILJS = {
  publicKey:      'i1y9r6EQfitSBB_wi',
  serviceId:      'service_krji98s',
  templateIdLead: 'template_vopxiss',  // notification → hayatka472@gmail.com
  templateIdAuto: 'template_ztgoazh',  // auto-reply  → client
}

// Must match the 9 services in the Services grid.
const PROJECT_TYPES = [
  'Software Application Development',
  'Web Development',
  'Mobile Applications (Android & iOS)',
  'MERN Stack',
  'MEAN Stack',
  'Next.js',
  'FastAPI',
  'AI Integration',
  'AI-Powered Application',
  'Not sure yet — need advice',
]

export default function FinalCTA({ onGetStarted }) {
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    // Build a payload that matches the template variables the BookingModal also uses.
    // Booking-specific fields (date/time/timezone) get sensible defaults since this
    // form is a quote request, not a scheduled call.
    const bookingId = (globalThis.crypto?.randomUUID?.() || `${Date.now()}`).slice(0, 8)
    const templateParams = {
      serviceLabel: data.projectType || 'General inquiry',
      name:         data.name  || '',
      email:        data.email || '',
      message:      data.message || '',
      company:      '—',
      phone:        '—',
      date:         'Quote request',
      time:         'TBD',
      endTime:      'TBD',
      timezone:     '—',
      bookingId,
      source:       'landing-final-cta',
      submittedAt:  new Date().toISOString(),
    }

    try {
      // 1. Lead → admin
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateIdLead,
        templateParams,
        { publicKey: EMAILJS.publicKey },
      )

      // 2. Auto-reply → client (don't fail the whole submit if this bounces)
      try {
        await emailjs.send(
          EMAILJS.serviceId,
          EMAILJS.templateIdAuto,
          templateParams,
          { publicKey: EMAILJS.publicKey },
        )
      } catch (err) {
        console.warn('Auto-reply to client failed (lead notification succeeded):', err)
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      console.error('Lead submission failed:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background flourish — reuses hero gradient utility for visual continuity */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-gradient" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Restated offer */}
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              <i className="fas fa-calendar-alt" />
              <span>Free 30-min consultation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              Ready to ship the thing you've been putting off?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Tell us about your project. We'll reply within 4 business hours with honest feedback,
              a rough timeline, and a price range — before you ever pay us a cent.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Senior engineers only — no juniors hidden behind a PM',
                'Written proposal in 48 hours, never a sales deck',
                'Cancel anytime — month-to-month, no lock-in',
              ].map(p => (
                <li key={p} className="flex items-start gap-3 text-gray-300 text-sm">
                  <i className="fas fa-check-circle text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* Bold redundant CTA — opens scheduling modal for buyers who don't want the form */}
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50"
            >
              <i className="fas fa-calendar-alt" />
              Book a Free Consultation
            </button>
          </div>

          {/* Lead form */}
          <div className="glass-card gradient-border rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Or send us your project</h3>
              <p className="text-gray-400 text-sm">We reply within 4 business hours.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Work email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-1.5">Project type</label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  defaultValue=""
                  className="w-full bg-[#0d1424] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 text-sm transition-colors"
                >
                  <option value="" disabled>Choose a service…</option>
                  {PROJECT_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="What are you trying to build, and by when?"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <><i className="fas fa-spinner fa-spin mr-2" />Sending…</>
                ) : (
                  <><i className="fas fa-paper-plane mr-2" />Send Project Brief</>
                )}
              </button>

              {status === 'success' && (
                <p className="text-center text-green-400 text-sm flex items-center justify-center gap-2">
                  <i className="fas fa-check-circle" /> Got it — we'll reply within 4 business hours.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-red-400 text-sm flex items-center justify-center gap-2">
                  <i className="fas fa-triangle-exclamation" /> Couldn't send — please email us directly.
                </p>
              )}

              <p className="text-center text-gray-500 text-xs">
                No spam. No sales sequences. One human reply.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
