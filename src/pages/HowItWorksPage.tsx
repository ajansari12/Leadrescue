import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MarketingShell } from '../components/MarketingShell'
import { workflowModules } from '../data/leadRescue'

const lanes = ['Source', 'Signal', 'Action', 'Outcome']

export function HowItWorksPage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 rescue-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(34,211,238,0.24),transparent_28%),linear-gradient(135deg,#05070b_0%,#111827_52%,#020617_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">How it works</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.95] md:text-7xl">One grid. Four moves.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Capture. Qualify. Book. Follow up. No maze.</p>
            <Link to="/leadrescue-ai#audit-studio" className="mt-7 inline-flex items-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950">
              Open Audit Studio <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[28px] border border-cyan-300/20 bg-white/[0.05] p-4 shadow-[0_24px_100px_rgba(34,211,238,0.16)]">
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
              {lanes.map((lane) => (
                <div key={lane} className="rounded-full border border-white/10 bg-black/20 px-2 py-2">
                  {lane}
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3">
              {workflowModules.map((module, index) => {
                const Icon = module.icon
                return (
                  <div key={module.title} className="grid grid-cols-4 items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-cyan-300" />
                      <span className="hidden text-sm font-bold text-white sm:inline">{module.title}</span>
                    </div>
                    <SignalBar active={index >= 0} />
                    <SignalBar active={index >= 1} />
                    <div className="flex justify-end">
                      <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">0{index + 1}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-4">
          {workflowModules.map((module) => {
            const Icon = module.icon
            return (
              <div key={module.title} className="dossier-cut border border-white/10 bg-white/[0.04] p-5">
                <Icon className="h-7 w-7 text-cyan-300" />
                <h2 className="mt-5 text-2xl font-black">{module.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{module.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 md:grid-cols-3">
          {['Reply fast', 'Route cleanly', 'Follow up automatically'].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-black/20 p-4">
              <CheckCircle2 className="h-5 w-5 text-cyan-300" />
              <p className="font-black">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  )
}

function SignalBar({ active }: { active: boolean }) {
  return <div className={`h-2 rounded-full ${active ? 'bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.7)]' : 'bg-white/10'}`} />
}
