import { useState } from 'react'
import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import Features         from './components/Features'
import AgentTypes       from './components/AgentTypes'
import AudioDemos       from './components/AudioDemos'
import AnalyticsPreview from './components/AnalyticsPreview'
import Testimonials     from './components/Testimonials'
import About            from './components/About'
import Community        from './components/Community'
import FAQ              from './components/FAQ'
import Footer           from './components/Footer'
import ContactModal     from './components/ContactModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal  = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar     onGetStarted={openModal} />
      <Hero       onGetStarted={openModal} />
      <Features />
      <About />
      <AudioDemos />
      <AgentTypes />
      <AnalyticsPreview />
      <Testimonials />
      <Community />
      <FAQ />
      <Footer     onGetStarted={openModal} />
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  )
}
