import { MessageSquareText } from 'lucide-react'
import { MarketingShell } from '../components/MarketingShell'
import { exampleMetrics, industryExamples } from '../data/leadRescue'

export function ExamplesPage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 rescue-grid opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(103,232,249,0.22),transparent_28%),linear-gradient(135deg,#020617_0%,#111827_55%,#05070b_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Examples</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl">Rescue cards, not case-study walls.</h1>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {exampleMetrics.map((metric) => (
              <div key={metric.label} className="dossier-cut border border-white/10 bg-white/[0.05] p-4">
                <p className="text-3xl font-black text-white">{metric.value}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {industryExamples.map((example) => {
            const Icon = example.icon
            return (
              <article key={example.slug} className="dossier-cut border border-white/10 bg-white/[0.045] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center bg-cyan-300 text-slate-950">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h2 className="text-2xl font-black">{example.industry}</h2>
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">Recoverable</span>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Path</p>
                    <div className="mt-4 grid gap-2">
                      {example.workflow.map((step, index) => (
                        <div key={step} className="grid grid-cols-[32px_1fr] items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-black text-cyan-200">{index + 1}</span>
                          <span className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-200">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                    <div className="flex items-center gap-2 text-cyan-200">
                      <MessageSquareText className="h-5 w-5" />
                      <p className="text-xs font-black uppercase tracking-[0.18em]">Reply</p>
                    </div>
                    <p className="mt-4 text-lg font-black leading-7 text-white">&quot;{example.exampleMessage}&quot;</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </MarketingShell>
  )
}
