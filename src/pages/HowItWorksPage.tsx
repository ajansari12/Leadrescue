import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MarketingShell } from '../components/MarketingShell'
import { appModules, workflowModules } from '../data/leadRescue'

export function HowItWorksPage() {
  return (
    <MarketingShell>
      <section className="paper-field soft-noise relative overflow-hidden border-b-2 border-slate-950">
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="inline-flex rotate-[-1deg] rounded-full border-2 border-slate-950 bg-lime-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">How it works</p>
            <h1 className="mt-6 text-6xl font-black leading-[0.88] md:text-7xl">From loose lead to booked job.</h1>
            <Link to="/leadrescue-ai#audit-studio" className="mt-7 inline-flex items-center rounded-full border-2 border-slate-950 bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-[5px_5px_0_#38bdf8]">
              Open Audit Studio <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="border-2 border-slate-950 bg-white p-5 shadow-[10px_10px_0_#0f172a]">
            <div className="grid gap-3">
              {workflowModules.map((module, index) => {
                const Icon = module.icon
                return (
                  <div key={module.title} className="grid grid-cols-[48px_1fr_auto] items-center gap-3 border-2 border-slate-950 bg-white p-3">
                    <span className="flex h-12 w-12 items-center justify-center bg-sky-200">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xl font-black">{module.title}</p>
                      <p className="text-sm font-semibold text-slate-600">{module.body}</p>
                    </div>
                    <span className="font-black">0{index + 1}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-slate-950 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 md:grid-cols-3">
            {['Reply fast', 'Route cleanly', 'Follow up automatically'].map((item) => (
              <div key={item} className="lift-card flex items-center gap-3 border-2 border-slate-950 bg-white p-5">
                <CheckCircle2 className="h-6 w-6 text-sky-500" />
                <p className="text-2xl font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-300">App modules</p>
          <h2 className="mt-2 max-w-3xl text-5xl font-black leading-none">The workflow becomes software.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appModules.map((module) => (
              <div key={module.title} className="border-2 border-white bg-white/10 p-5">
                <h3 className="text-2xl font-black">{module.title}</h3>
                <p className="mt-2 font-semibold text-slate-300">{module.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}
