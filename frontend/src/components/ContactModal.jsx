import { useEffect } from 'react'

export default function ContactModal({ isOpen, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative glass-card rounded-2xl w-full max-w-lg p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          <i className="fas fa-times" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <i className="fas fa-calendar-alt" />
            <span>Book Your Free Consultation</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Let's Talk AI Voice Agents</h2>
          <p className="text-gray-400 text-sm">
            Fill out the form below and we'll be in touch within 24 hours to schedule your free strategy call.
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={e => {
            e.preventDefault()
            // Replace with your actual form submission / Calendly logic
            window.open('https://calendly.com/sixflowautomations', '_blank')
            onClose()
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
              <input
                type="text"
                required
                placeholder="John"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
              <input
                type="text"
                required
                placeholder="Smith"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Business Email</label>
            <input
              type="email"
              required
              placeholder="john@company.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Business Type</label>
            <select
              className="w-full bg-[#0d1424] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 text-sm transition-colors"
            >
              <option value="">Select your industry…</option>
              <option>Real Estate</option>
              <option>Healthcare / Medical</option>
              <option>Home Services</option>
              <option>Legal</option>
              <option>Retail / eCommerce</option>
              <option>Fitness / Wellness</option>
              <option>Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20 mt-2"
          >
            <i className="fas fa-calendar-alt mr-2" />
            Schedule My Free Consultation
          </button>

          <p className="text-center text-gray-500 text-xs">
            No commitment required. 100% free strategy call.
          </p>
        </form>
      </div>
    </div>
  )
}
