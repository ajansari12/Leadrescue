import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MarketingShell } from '../components/MarketingShell'
import { industryExamples } from '../data/leadRescue'

export function IndustriesPage() {
  return (
    <MarketingShell>
      <section className="paper-field border-b-2 border-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="inline-flex rotate-[-1deg] rounded-full border-2 border-slate-950 bg-lime-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">Markets</p>
          <h1 className="mt-6 max-w-4xl text-6xl font-black leading-[0.88] md:text-7xl">Every industry gets its own route.</h1>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
          {industryExamples.map((example) => {
            const Icon = example.icon
            return (
              <article key={example.slug} className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
                <Icon className="h-9 w-9 text-sky-500" />
                <h2 className="mt-5 text-3xl font-black">{example.industry}</h2>
                <p className="mt-4 text-sm font-black uppercase tracking-[0.14em] text-slate-500">Route</p>
                <p className="mt-2 font-semibold text-slate-700">{example.workflow.slice(0, 3).join(' -> ')}</p>
                <Link to="/leadrescue-ai/examples" className="mt-5 inline-flex items-center text-sm font-black text-slate-950">
                  See card <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </MarketingShell>
  )
}
