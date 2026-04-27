import { motion } from 'framer-motion'
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Gauge,
  Inbox,
  Layers3,
  MessageSquareMore,
  PhoneMissed,
  PlayCircle,
  Radar,
  Send,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AuditForm, type AuditSubmission } from '../components/AuditForm'
import { FAQItem } from '../components/FAQItem'
import { IndustryCard } from '../components/IndustryCard'
import { PricingCard } from '../components/PricingCard'
import { SiteNav } from '../components/SiteNav'
import { Button } from '../components/ui/Button'

type ScenarioKey = 'home' | 'health' | 'professional'
type WorkflowKey = 'capture' | 'qualify' | 'book' | 'followup'

type LeakSource = {
  icon: LucideIcon
  title: string
  detail: string
}

type Scenario = {
  label: string
  averageJob: number
  missedRate: number
  closeRate: number
}

const leakSources: LeakSource[] = [
  { icon: PhoneMissed, title: 'Missed first contact', detail: 'Calls, forms, and DMs sit unanswered while the buyer keeps shopping.' },
  { icon: Clock3, title: 'Slow response', detail: 'Prospects lose confidence when the reply arrives hours later.' },
  { icon: MessageSquareMore, title: 'No second touch', detail: 'Interested leads go quiet because nobody follows up with useful prompts.' },
  { icon: Layers3, title: 'Scattered handoff', detail: 'Owners, admins, and techs work from different inboxes with no shared view.' },
  { icon: Star, title: 'Review leakage', detail: 'Completed jobs do not turn into proof for the next buyer.' },
]

const scenarios: Record<ScenarioKey, Scenario> = {
  home: { label: 'Home services', averageJob: 1200, missedRate: 15, closeRate: 24 },
  health: { label: 'Clinics and wellness', averageJob: 450, missedRate: 18, closeRate: 31 },
  professional: { label: 'Professional services', averageJob: 2200, missedRate: 12, closeRate: 18 },
}

const workflowTabs: Record<WorkflowKey, { title: string; icon: LucideIcon; outcome: string; items: string[] }> = {
  capture: {
    title: 'Capture',
    icon: Inbox,
    outcome: 'Every inquiry becomes a trackable lead record.',
    items: ['Website forms', 'Missed-call capture', 'Social DM intake', 'Owner notifications'],
  },
  qualify: {
    title: 'Qualify',
    icon: Target,
    outcome: 'The system asks the right questions before your team gets involved.',
    items: ['Service type', 'Location fit', 'Urgency', 'Budget or project size'],
  },
  book: {
    title: 'Book',
    icon: CalendarCheck2,
    outcome: 'Qualified leads are moved toward a call, estimate, or appointment.',
    items: ['Calendar links', 'Estimate requests', 'Confirmation messages', 'Team handoff'],
  },
  followup: {
    title: 'Follow up',
    icon: BellRing,
    outcome: 'Quiet prospects receive polite, useful reminders.',
    items: ['5-touch sequence', 'Quote reminders', 'Review requests', 'Monthly leakage reporting'],
  },
}

const timeline = [
  { day: 'Day 1', title: 'Intake and leak map', body: 'We review your current forms, calls, inboxes, CRM, and booking flow.' },
  { day: 'Days 2-3', title: 'Message and pipeline build', body: 'We write the response scripts and configure capture, alerts, and stages.' },
  { day: 'Days 4-5', title: 'Automation setup', body: 'We connect booking links, reminders, owner alerts, and handoff rules.' },
  { day: 'Days 6-7', title: 'Go-live and tune-up', body: 'We test the complete journey and adjust the workflow with your team.' },
]

const proofStats = [
  { value: '< 5 min', label: 'target first response' },
  { value: '5', label: 'follow-up touches' },
  { value: '7 days', label: 'typical launch window' },
  { value: '1 view', label: 'shared pipeline' },
]

export function LeadRescuePage() {
  const [submissions, setSubmissions] = useState<AuditSubmission[]>([])
  const [scenario, setScenario] = useState<ScenarioKey>('home')
  const [monthlyLeads, setMonthlyLeads] = useState(40)
  const [averageJob, setAverageJob] = useState(scenarios.home.averageJob)
  const [missedRate, setMissedRate] = useState(scenarios.home.missedRate)
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowKey>('capture')

  const activeScenario = scenarios[scenario]
  const workflow = workflowTabs[activeWorkflow]
  const WorkflowIcon = workflow.icon

  const audit = useMemo(() => {
    const monthlyLeakage = Math.round(monthlyLeads * averageJob * (missedRate / 100))
    const annualLeakage = monthlyLeakage * 12
    const rescuedLeads = Math.max(1, Math.round(monthlyLeads * (missedRate / 100) * 0.55))
    const projectedRecovered = Math.round(rescuedLeads * averageJob * (activeScenario.closeRate / 100))
    return { monthlyLeakage, annualLeakage, rescuedLeads, projectedRecovered }
  }, [activeScenario.closeRate, averageJob, missedRate, monthlyLeads])

  const selectScenario = (key: ScenarioKey) => {
    setScenario(key)
    setAverageJob(scenarios[key].averageJob)
    setMissedRate(scenarios[key].missedRate)
  }

  const handleAuditSubmit = (data: AuditSubmission) => {
    setSubmissions((prev) => [...prev, data])
  }

  return (
    <main className="bg-slate-50 pb-20 text-slate-950">
      <SiteNav />

      <section className="relative overflow-hidden border-b border-white/10 bg-[#05070b]">
        <div className="absolute inset-0 rescue-grid opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_20%_88%,rgba(14,165,233,0.16),transparent_32%),linear-gradient(135deg,rgba(5,7,11,0.94)_0%,rgba(15,23,42,0.88)_52%,rgba(5,7,11,0.96)_100%)]" />
        <div className="absolute left-0 right-0 top-20 h-px bg-cyan-300/20 rescue-scan shadow-[0_0_40px_rgba(103,232,249,0.75)]" />
        <div className="pointer-events-none absolute right-[-80px] top-20 hidden h-[560px] w-[560px] rounded-full border border-cyan-300/10 md:block" />
        <div className="pointer-events-none absolute right-[80px] top-[250px] hidden h-5 w-5 rounded-full bg-cyan-300 shadow-[0_0_45px_rgba(103,232,249,0.9)] signal-pulse md:block" />
        <div className="pointer-events-none absolute right-[44px] top-[148px] hidden rounded-2xl border border-cyan-300/25 bg-slate-950/85 px-4 py-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.32)] lead-drift md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Missed call</p>
          <p className="mt-1 text-sm font-semibold">Owner pinged in 12s</p>
        </div>
        <div className="pointer-events-none absolute right-[280px] top-[205px] hidden rounded-2xl border border-cyan-300/25 bg-slate-950/85 px-4 py-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.32)] lead-drift md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Web form</p>
          <p className="mt-1 text-sm font-semibold">Captured + qualified</p>
        </div>
        <div className="pointer-events-none absolute right-[128px] top-[365px] hidden rounded-2xl border border-emerald-300/25 bg-slate-950/85 px-4 py-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.32)] lead-drift md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">Quote request</p>
          <p className="mt-1 text-sm font-semibold">Estimate booked</p>
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 md:min-h-[620px] md:grid-cols-[0.92fr_1.08fr] md:items-center lg:min-h-[720px]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              <Zap className="h-3.5 w-3.5" /> Lead response system for local service teams
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.96] text-white md:text-6xl xl:text-7xl">
              Rescue the lead while it is still alive.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A live response grid for service businesses: detect every inquiry, fire the first reply, qualify intent, route the next step,
              and keep the follow-up sequence moving until the buyer books or opts out.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#audit-studio">
                <Button className="bg-cyan-300 text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.24)] hover:bg-cyan-200">
                  Run the Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#workflow">
                <Button variant="secondary" className="border-white/15 bg-white/10 text-white hover:bg-white/15">
                  See the Workflow <PlayCircle className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {proofStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative min-h-[460px] overflow-hidden rounded-[28px] border border-cyan-300/25 bg-black/40 p-5 shadow-[0_24px_100px_rgba(34,211,238,0.2)] md:min-h-[520px]"
          >
            <div className="absolute inset-0 rescue-grid opacity-20" />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
            <div className="signal-pulse absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(103,232,249,0.9)]" />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Live rescue console</p>
                  <p className="mt-1 text-lg font-bold text-white">Signal response desk</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  <Radar className="h-3.5 w-3.5" /> Monitoring
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  ['New roofing quote', 'Instant SMS sent', 'Booked estimate'],
                  ['Clinic consultation', 'Qualification in progress', 'Needs callback'],
                  ['HVAC emergency', 'Owner alerted', 'High priority'],
                  ['Renovation request', 'Reminder 2 scheduled', 'Quote follow-up'],
                ].map(([title, status, tag]) => (
                  <div key={title} className="console-rise rounded-xl border border-white/10 bg-black/25 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{title}</p>
                        <p className="mt-1 text-sm text-slate-400">{status}</p>
                      </div>
                      <span className="whitespace-nowrap rounded-full bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-200">{tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-slate-200 bg-white py-3">
        <div className="ticker-left flex w-[200%] gap-3 whitespace-nowrap text-xs font-black uppercase tracking-[0.22em] text-slate-500">
          {[...leakSources, ...leakSources].map((source, index) => (
            <span key={`${source.title}-${index}`} className="inline-flex items-center gap-3 px-4">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {source.title}
            </span>
          ))}
        </div>
      </section>

      <section id="platform" className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 rescue-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.8)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Leak autopsy</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">Most lead loss is not dramatic. It is invisible.</h2>
            <p className="mt-5 leading-8 text-slate-300">
              LeadRescue treats each inquiry like a live incident: source, delay, owner, next action, recovery status.
              The brand should feel like that: sharp, active, and operational.
            </p>
          </div>

          <div className="grid gap-4">
            {leakSources.map(({ icon: Icon, title, detail }, index) => (
              <div
                key={title}
                className="dossier-cut group grid gap-4 border border-white/10 bg-white/[0.045] p-5 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.08] md:grid-cols-[72px_1fr_180px]"
              >
                <div className="flex h-14 w-14 items-center justify-center border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Incident 0{index + 1}</p>
                  <h3 className="mt-2 text-2xl font-black">{title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{detail}</p>
                </div>
                <div className="self-end border-l border-white/10 pl-4 text-sm text-slate-400">
                  <p className="font-black text-white">{index % 2 === 0 ? 'Recoverable' : 'Needs routing'}</p>
                  <p className="mt-1">Response grid action</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audit-studio" className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeader
          eyebrow="Interactive app"
          title="Audit Studio: estimate what slow response is costing and see the rescue plan."
          body="Use this with a prospect during discovery. It turns messy lead handling into a clear business case and an implementation path."
        />
        <div className="mt-6 grid gap-5 rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_26px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="dossier-cut border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-cyan-600" />
                <h3 className="text-lg font-black">Lead Leakage Instrument</h3>
              </div>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Live model</span>
            </div>

            <div className="mt-5 grid gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">Business type</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => selectScenario(key)}
                      className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${
                        scenario === key ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {scenarios[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <RangeInput label="Monthly inquiries" value={monthlyLeads} min={10} max={180} step={5} suffix="leads" onChange={setMonthlyLeads} />
              <RangeInput label="Average job value" value={averageJob} min={250} max={8000} step={50} prefix="CAD $" onChange={setAverageJob} />
              <RangeInput label="Missed or stalled lead risk" value={missedRate} min={5} max={40} step={1} suffix="%" onChange={setMissedRate} />
            </div>
          </div>

          <div className="dossier-cut bg-slate-950 p-5 text-white">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Recovery readout</p>
                <h3 className="mt-1 text-2xl font-black">Business case output</h3>
              </div>
              <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(110,231,183,0.8)]" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <ResultCard icon={TrendingUp} label="Potential monthly leakage" value={`CAD $${audit.monthlyLeakage.toLocaleString()}`} />
              <ResultCard icon={Target} label="Potential annual leakage" value={`CAD $${audit.annualLeakage.toLocaleString()}`} />
              <ResultCard icon={Users} label="Leads to rescue first" value={`${audit.rescuedLeads} / month`} />
              <ResultCard icon={ClipboardCheck} label="Projected monthly recovery" value={`CAD $${audit.projectedRecovered.toLocaleString()}`} />
            </div>
            <div className="mt-5 border border-cyan-300/20 bg-cyan-300/10 p-4">
              <p className="font-black text-cyan-200">Recommended first workflow</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Start with instant inquiry capture, owner alerts, and a 5-touch follow-up sequence. For {activeScenario.label.toLowerCase()},
                the fastest win is usually reducing the time between first contact and a confirmed next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeader
          eyebrow="The product"
          title="A complete client-facing workflow, not a loose chatbot."
          body="The app mirrors the actual service: capture the lead, qualify intent, book the next step, and keep following up until the lead converts or opts out."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-3">
            {(Object.keys(workflowTabs) as WorkflowKey[]).map((key) => {
              const item = workflowTabs[key]
              const Icon = item.icon
              return (
                <button
                  key={key}
                  onClick={() => setActiveWorkflow(key)}
                  className={`rounded-xl border p-4 text-left transition ${
                    activeWorkflow === key ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <p className={`mt-2 text-sm ${activeWorkflow === key ? 'text-slate-300' : 'text-slate-600'}`}>{item.outcome}</p>
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-glass">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Workflow module</p>
                <h3 className="mt-1 text-2xl font-bold">{workflow.title}</h3>
              </div>
              <WorkflowIcon className="h-7 w-7 text-sky-600" />
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {workflow.items.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-slate-950 p-4 text-white">
              <p className="text-sm font-semibold">Client outcome</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{workflow.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeader eyebrow="Launch plan" title="Built for a 7-day implementation sprint." />
        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.day} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-sky-700">{item.day}</p>
              <h3 className="mt-2 font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="packages" className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeader
          eyebrow="Offer"
          title="Simple packages that match the maturity of the client."
          body="Growth is the core offer: enough automation to change response behavior without creating a heavy software project."
        />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <PricingCard name="Starter" price="CAD $1,500" description="Lead capture fix" features={['Improved lead form', 'Instant reply', 'Owner alerts', 'Booking link']} />
          <PricingCard name="Growth" price="CAD $2,500" description="Complete lead response system" highlighted features={['Landing section', 'CRM pipeline', '5-touch follow-up', 'Review workflow', 'Team handoff']} />
          <PricingCard name="Premium" price="CAD $5,000 + monthly" description="Revenue recovery engine" features={['Advanced routing', 'Landing optimization', 'Monthly reporting', '30-day optimization support']} />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeader eyebrow="Markets" title="Designed for businesses where response speed affects revenue." />
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {['Roofing', 'Renovation', 'Landscaping', 'Cleaning', 'HVAC', 'Plumbing', 'Clinics', 'Mortgage', 'Immigration', 'Auto Repair'].map((item) => (
            <IndustryCard key={item} label={item} />
          ))}
        </div>
      </section>

      <section id="audit" className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeader
          eyebrow="Free audit"
          title="Turn a prospect into a clear implementation conversation."
          body="The form is ready for backend wiring. For now, submissions are kept locally so the route stays self-contained."
        />
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <AuditForm onSubmit={handleAuditSubmit} />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-glass">
            <h3 className="text-lg font-bold">Audit deliverable</h3>
            <div className="mt-4 grid gap-3">
              {['Leak map across forms, calls, and inboxes', 'Speed-to-lead diagnosis', 'Follow-up sequence recommendation', 'Package fit and launch plan'].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Local submissions this session</p>
              <p className="mt-1 text-3xl font-bold">{submissions.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4">
        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-glass md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">LeadRescue AI</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">Install the response system before the next lead goes cold.</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Start with the free audit, then move directly into a 7-day implementation sprint.
              </p>
            </div>
            <a href="#audit" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">
              Book My Free Audit <Send className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {body ? <p className="mt-3 text-base leading-7 text-slate-600">{body}</p> : null}
    </div>
  )
}

function MiniStat({ value, label, tone }: { value: string; label: string; tone: 'dark' | 'sky' | 'emerald' }) {
  const styles = {
    dark: 'bg-slate-950 text-white',
    sky: 'bg-sky-50 text-sky-950',
    emerald: 'bg-emerald-50 text-emerald-950',
  }

  return (
    <div className={`rounded-xl p-3 ${styles[tone]}`}>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs opacity-70">{label}</p>
    </div>
  )
}

function RangeInput({
  label,
  value,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  onChange: (value: number) => void
}) {
  return (
    <label className="block rounded-xl border border-slate-200 bg-slate-50 p-4">
      <span className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
        {label}
        <span className="rounded-lg bg-white px-2.5 py-1 text-slate-950 shadow-sm">
          {prefix}
          {value.toLocaleString()}
          {suffix ? ` ${suffix}` : ''}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 w-full accent-slate-950"
      />
    </label>
  )
}

function ResultCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.045] p-4">
      <Icon className="h-5 w-5 text-cyan-300" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  )
}
