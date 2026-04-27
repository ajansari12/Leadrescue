import { ArrowRight } from 'lucide-react'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SiteNav } from './SiteNav'

type Props = {
  children: ReactNode
}

export function MarketingShell({ children }: Props) {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteNav />
      {children}
      <section className="border-t-2 border-slate-950 bg-lime-300 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <h2 className="max-w-3xl text-5xl font-black leading-none">Build the route before the next lead goes cold.</h2>
          <Link to="/leadrescue-ai#audit" className="inline-flex items-center justify-center rounded-full border-2 border-slate-950 bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-[5px_5px_0_#38bdf8]">
            Run Free Audit <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
