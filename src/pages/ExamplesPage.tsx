import { MessageSquareText } from 'lucide-react'
import { MarketingShell } from '../components/MarketingShell'
import { exampleMetrics, industryExamples } from '../data/leadRescue'

export function ExamplesPage() {
  return (
    <MarketingShell>
      <section className="paper-field border-b-2 border-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="inline-flex rotate-[-1deg] rounded-full border-2 border-slate-950 bg-lime-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">Examples</p>
          <h1 className="mt-6 max-w-4xl text-6xl font-black leading-[0.88] md:text-7xl">Rescue cards people can understand fast.</h1>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {exampleMetrics.map((metric) => (
              <div key={metric.label} className="border-2 border-slate-950 bg-white p-4 shadow-[5px_5px_0_#0f172a]">
                <p className="text-4xl font-black">{metric.value}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2">
          {industryExamples.map((example) => {
            const Icon = example.icon
            return (
              <article key={example.slug} className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-sky-500" />
                  <h2 className="text-3xl font-black">{example.industry}</h2>
                </div>
                <div className="mt-5 grid gap-2">
                  {example.workflow.map((step, index) => (
                    <div key={step} className="grid grid-cols-[40px_1fr] items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-300 text-sm font-black">{index + 1}</span>
                      <span className="border-2 border-slate-950 px-3 py-2 font-bold">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-2 border-slate-950 bg-sky-100 p-4">
                  <div className="flex items-center gap-2">
                    <MessageSquareText className="h-5 w-5" />
                    <p className="text-xs font-black uppercase tracking-[0.14em]">First reply</p>
                  </div>
                  <p className="mt-3 text-lg font-black">&quot;{example.exampleMessage}&quot;</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </MarketingShell>
  )
}
