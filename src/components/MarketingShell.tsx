import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { type ReactNode } from 'react'
import { SiteNav } from './SiteNav'

type Props = {
  children: ReactNode
}

export function MarketingShell({ children }: Props) {
  return (
    <main className="min-h-screen bg-[#05070b] text-white">
      <SiteNav inverted />
      {children}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300 p-8 text-slate-950 shadow-[0_24px_80px_rgba(34,211,238,0.18)] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em]">LeadRescue AI</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight md:text-4xl">Give every lead a clear next step before the conversation goes cold.</h2>
            </div>
            <Link to="/leadrescue-ai#audit" className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
              Run the Free Audit <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
