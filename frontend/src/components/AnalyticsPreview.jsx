import { useRef, useState } from 'react'

const ANALYTICS_FEATURES = [
  {
    icon: 'fas fa-phone',
    title: 'Complete Call History',
    desc: 'Access detailed logs of every conversation with full transcripts and recordings',
  },
  {
    icon: 'fas fa-tachometer-alt',
    title: 'Live Performance Metrics',
    desc: 'Monitor conversion rates, response times, and customer satisfaction in real-time',
  },
  {
    icon: 'fas fa-users-cog',
    title: 'Multi-Agent Management',
    desc: 'Monitor and manage all your AI agents from one dashboard across any time range',
  },
  {
    icon: 'fas fa-download',
    title: 'Export & Reporting',
    desc: 'Generate detailed reports and export data for deeper business analysis',
  },
]

export default function AnalyticsPreview() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <section id="analytics" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <i className="fas fa-chart-line" />
              <span>Real-Time Analytics</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See Every Detail of Your AI Performance
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Get unprecedented insights into your AI voice agents with our comprehensive analytics
              dashboard. Track performance, analyze conversations, and optimize results in real-time.
            </p>

            <div className="space-y-5">
              {ANALYTICS_FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <i className={`${f.icon} text-purple-400 text-sm`} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-0.5">{f.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: video */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden glass-card">
              <video
                ref={videoRef}
                controls={playing}
                poster="/SixFlow Voice Analytics Commercial Thumbnail.png"
                preload="metadata"
                className="w-full aspect-video object-cover"
                onPlay={() => setPlaying(true)}
              >
                <source src="/SixFlow Voice Analytics Commercial.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!playing && (
                <div className="video-play-overlay" onClick={handlePlay}>
                  <div className="play-icon">
                    <i className="fas fa-play ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Included badge */}
            <div className="inline-flex items-center gap-2 self-start bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-4 py-2 text-sm font-medium">
              <i className="fas fa-check-circle" />
              <span>Included with every SixFlow voice agent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
