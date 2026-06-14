/* ──────────────────────────────────────────────────
   SERVICES GRID (Consideration)
   9 services across 3 groups. Each card has:
   icon, name, 1-line value prop, stack tag(s).
   Edit copy via the SERVICES constant below.
────────────────────────────────────────────────── */

const SERVICES = {
  Build: {
    blurb: 'Whatever the form factor — we ship it production-ready.',
    items: [
      {
        icon: 'fas fa-code',
        name: 'Software Application Development',
        prop: 'Custom internal tools, SaaS platforms, and dashboards your team will actually use daily.',
        tags: ['TypeScript', 'Node', 'Python'],
      },
      {
        icon: 'fas fa-globe',
        name: 'Web Development',
        prop: 'Marketing sites, web apps and storefronts — fast, accessible, and SEO-ready from day one.',
        tags: ['React', 'Next.js'],
      },
      {
        icon: 'fas fa-mobile-screen',
        name: 'Mobile Applications (Android & iOS)',
        prop: 'Native-feel cross-platform apps from a single codebase. App Store-ready in weeks.',
        tags: ['React Native', 'Flutter'],
      },
    ],
  },
  Stacks: {
    blurb: 'Battle-tested stacks we choose by problem, not by trend.',
    items: [
      {
        icon: 'fab fa-react',
        name: 'MERN Stack',
        prop: 'MongoDB + Express + React + Node — for content-heavy products and real-time apps.',
        tags: ['MongoDB', 'Express', 'React', 'Node'],
      },
      {
        icon: 'fab fa-angular',
        name: 'MEAN Stack',
        prop: 'MongoDB + Express + Angular + Node — for enterprise teams already on Angular.',
        tags: ['MongoDB', 'Express', 'Angular', 'Node'],
      },
      {
        icon: 'fas fa-bolt',
        name: 'Next.js',
        prop: 'Server-rendered, edge-deployed React. Perfect for marketing sites that need to convert.',
        tags: ['Next.js', 'Vercel'],
      },
      {
        icon: 'fas fa-server',
        name: 'FastAPI',
        prop: 'Python APIs that scale — typed, fast, and friendly to data-science and AI workloads.',
        tags: ['Python', 'FastAPI', 'Pydantic'],
      },
    ],
  },
  AI: {
    blurb: 'Pragmatic AI — wired into your product, not a science project.',
    items: [
      {
        icon: 'fas fa-plug',
        name: 'AI Integration',
        prop: 'Drop GPT-class models into your existing product: chat, search, summarization, voice.',
        tags: ['OpenAI', 'Claude', 'RAG'],
      },
      {
        icon: 'fas fa-brain',
        name: 'AI-Powered Applications',
        prop: 'Greenfield products built around an AI core — agents, copilots, voice flows, automation.',
        tags: ['Agents', 'LangGraph', 'Vector DBs'],
      },
    ],
  },
}

function ServiceCard({ item }) {
  return (
    <div className="glass-card gradient-border rounded-2xl p-6 flex flex-col h-full hover:-translate-y-0.5 transition-transform">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
        <i className={`${item.icon} text-white text-base`} />
      </div>
      <h4 className="text-white font-semibold text-base mb-2 leading-snug">{item.name}</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{item.prop}</p>
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map(t => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 border border-white/10 text-purple-200/90"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Services({ onGetStarted }) {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <i className="fas fa-layer-group" />
            <span>What we build</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            One team. The full stack of modern product delivery.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From an idea on a Notion page to a shipped product your customers pay for.
          </p>
        </div>

        {/* Groups */}
        <div className="space-y-14">
          {Object.entries(SERVICES).map(([group, { blurb, items }]) => (
            <div key={group}>
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {group}
                  <span className="ml-3 text-xs uppercase tracking-[0.2em] text-purple-300/70 font-semibold">
                    {items.length} service{items.length > 1 ? 's' : ''}
                  </span>
                </h3>
                <p className="text-gray-500 text-sm">{blurb}</p>
              </div>
              <div className={`grid gap-5 ${items.length === 2 ? 'md:grid-cols-2' : items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
                {items.map(item => <ServiceCard key={item.name} item={item} />)}
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/20"
          >
            <i className="fas fa-paper-plane" />
            Get a Quote for Your Project
          </button>
          <p className="text-xs text-gray-500 mt-3">Typical reply within 4 business hours.</p>
        </div>
      </div>
    </section>
  )
}
