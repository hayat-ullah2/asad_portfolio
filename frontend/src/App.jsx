import { useState } from 'react'

/* ──────────────────────────────────────────────────
   FUNNEL ARCHITECTURE (top → bottom)
   1. Hero ............... Awareness
   2. PainPoints (Features) ... Interest
   3. Services ............... Consideration
   4. Results (AnalyticsPreview) Proof
   5. Testimonials ....... Social proof
   6. Process ............ Risk reversal
   7. Pricing ............ Engagement models
   8. FAQ ................ Objection handling
   9. FinalCTA ........... Action (form + book CTA)
────────────────────────────────────────────────── */

import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import PainPoints       from './components/Features'           // repurposed
import Services         from './components/Services'
import Results          from './components/AnalyticsPreview'   // repurposed
import Testimonials     from './components/Testimonials'
import Process          from './components/Process'
import Pricing          from './components/Pricing'
import FAQ              from './components/FAQ'
import FinalCTA         from './components/FinalCTA'
import Footer           from './components/Footer'
import BookingModal     from './components/BookingModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [prefill,   setPrefill]   = useState(null)

  // openModal accepts an optional prefill object (e.g. { plan: 'monthly' })
  // — every existing caller that passes no args still works.
  const openModal  = (data) => { setPrefill(data || null); setModalOpen(true) }
  const closeModal = () => setModalOpen(false)

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar       onGetStarted={openModal} />
      <Hero         onGetStarted={openModal} />
      <PainPoints   onGetStarted={openModal} />
      <Services     onGetStarted={openModal} />
      <Results      onGetStarted={openModal} />
      <Testimonials onGetStarted={openModal} />
      <Process      onGetStarted={openModal} />
      <Pricing      onGetStarted={openModal} />
      <FAQ          onGetStarted={openModal} />
      <FinalCTA     onGetStarted={openModal} />
      <Footer       onGetStarted={openModal} />
      <BookingModal isOpen={modalOpen} onClose={closeModal} prefill={prefill} />
    </div>
  )
}
