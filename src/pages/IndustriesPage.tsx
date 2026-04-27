import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MarketingShell } from '../components/MarketingShell'
import { industryExamples } from '../data/leadRescue'

export function IndustriesPage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 rescue-grid opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(34,211,238,0.22),transparent_30%),linear-gradient(135deg,#05070b_0%,#111827_55%,#083344_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Markets</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl">Different leads. Same leak.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Pick a market. Show the leak. Launch the rescue path.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industryExamples.map((example, index) => {
            const Icon = example.icon
            return (
              <article key={example.slug} className="group dossier-cut border border-white/10 bg-white/[0.045] p-5 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.08]">
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center bg-cyan-300 text-slate-950">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="text-xs font-black text-white/30">0{index + 1}</span>
                </div>
                <h2 className="mt-7 text-3xl font-black">{example.industry}</h2>
                <div className="mt-5 grid gap-2">
                  <InfoChip label="Source" value={example.leadSource} />
                  <InfoChip label="Leak" value={example.leakage} />
                </div>
                <Link to="/leadrescue-ai/examples" className="mt-6 inline-flex items-center text-sm font-black text-cyan-300">
                  View rescue card <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </MarketingShell>
  )
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">{label}</p>
      <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-300">{value}</p>
    </div>
  )
}
