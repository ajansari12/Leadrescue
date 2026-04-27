import { ArrowRight, BellRing, CalendarCheck2, CheckCircle2, ClipboardCheck, LayoutDashboard, MessageSquareText, PhoneIncoming, Send, Target, TrendingUp, Users, Zap, type LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AuditForm, type AuditSubmission } from '../components/AuditForm'
import { PricingCard } from '../components/PricingCard'
import { SiteNav } from '../components/SiteNav'
import { Button } from '../components/ui/Button'
import { appModules, industryExamples } from '../data/leadRescue'

type ScenarioKey = 'home' | 'health' | 'professional'

const scenarios = {
  home: { label: 'Home services', averageJob: 1200, missedRate: 15, closeRate: 24, source: 'Missed call + quote form' },
  health: { label: 'Clinics', averageJob: 450, missedRate: 18, closeRate: 31, source: 'Appointment request' },
  professional: { label: 'Professional', averageJob: 2200, missedRate: 12, closeRate: 18, source: 'Consult request' },
}

const journey = [
  { icon: PhoneIncoming, label: 'Lead arrives', note: 'Call, form, DM' },
  { icon: MessageSquareText, label: 'Reply fires', note: 'Fast + specific' },
  { icon: Target, label: 'Intent sorted', note: 'Fit, urgency, value' },
  { icon: CalendarCheck2, label: 'Next step booked', note: 'Estimate or call' },
  { icon: BellRing, label: 'Follow-up runs', note: 'No silent drop-off' },
]

const proofPoints = [
  { label: 'Fastest first response', value: '< 5 min' },
  { label: 'Recommended follow-up', value: '5 touches' },
  { label: 'Typical launch sprint', value: '7 days' },
  { label: 'Primary team view', value: '1 route map' },
]

export function LeadRescuePage() {
  const [submissions, setSubmissions] = useState<AuditSubmission[]>([])
  const [scenario, setScenario] = useState<ScenarioKey>('home')
  const [monthlyLeads, setMonthlyLeads] = useState(44)
  const [averageJob, setAverageJob] = useState(scenarios.home.averageJob)
  const [missedRate, setMissedRate] = useState(scenarios.home.missedRate)

  const activeScenario = scenarios[scenario]
  const audit = useMemo(() => {
    const monthlyLeakage = Math.round(monthlyLeads * averageJob * (missedRate / 100))
    const rescuedLeads = Math.max(1, Math.round(monthlyLeads * (missedRate / 100) * 0.55))
    const projectedRecovered = Math.round(rescuedLeads * averageJob * (activeScenario.closeRate / 100))
    return { monthlyLeakage, annualLeakage: monthlyLeakage * 12, rescuedLeads, projectedRecovered }
  }, [activeScenario.closeRate, averageJob, missedRate, monthlyLeads])
  const recommendedPackage = audit.monthlyLeakage > 9000 || averageJob > 1800 ? 'Premium' : audit.monthlyLeakage > 3500 ? 'Growth' : 'Starter'

  const selectScenario = (key: ScenarioKey) => {
    setScenario(key)
    setAverageJob(scenarios[key].averageJob)
    setMissedRate(scenarios[key].missedRate)
  }

  return (
    <main className="bg-white text-slate-950">
      <SiteNav />

      <section className="paper-field soft-noise relative overflow-hidden border-b-2 border-slate-950">
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <div>
            <div className="inline-flex rotate-[-1deg] items-center gap-2 rounded-full border-2 border-slate-950 bg-lime-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">
              <Zap className="h-4 w-4" /> Revenue Response OS
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.9] tracking-tight md:text-6xl xl:text-8xl">
              Stop letting hot leads cool off.
            </h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-slate-700">
              LeadRescue turns every call, form, and DM into a visible route: reply, qualify, book, follow up.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#audit-studio">
                <Button className="border-2 border-slate-950 bg-slate-950 text-white shadow-[5px_5px_0_#38bdf8] hover:bg-slate-800">
                  Run the Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#journey">
                <Button variant="secondary" className="border-2 border-slate-950 bg-white shadow-[5px_5px_0_#bef264]">
                  See the Map
                </Button>
              </a>
            </div>
          </div>

          <LeadMap />
        </div>
      </section>

      <section id="journey" className="border-b-2 border-slate-950 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="The route" title="Five moves. One visible lead journey." />
          <div className="mt-8 grid gap-3 lg:grid-cols-5">
            {journey.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="lift-card border-2 border-slate-950 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-sky-500" />
                    <span className="text-sm font-black">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-2xl font-black">{step.label}</h3>
                  <p className="mt-2 font-semibold text-slate-600">{step.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-slate-950 bg-slate-950 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-300">Before / after</p>
            <h2 className="mt-2 text-5xl font-black leading-none">Same lead. Different route.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <JourneyPanel title="Before LeadRescue" tone="bad" items={['Lead arrives', 'No owner sees it', 'Reply comes late', 'Buyer moves on']} />
            <JourneyPanel title="After LeadRescue" tone="good" items={['Lead captured', 'Reply fires', 'Intent sorted', 'Next step booked']} />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-slate-950 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point.label} className="border-2 border-slate-950 bg-white p-5 shadow-[5px_5px_0_#e2e8f0]">
              <p className="text-4xl font-black">{point.value}</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-slate-500">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="audit-studio" className="paper-field border-b-2 border-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="Interactive" title="Estimate the leak in 30 seconds." />
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lift-card border-2 border-slate-950 bg-white p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Pick a model</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => selectScenario(key)}
                    className={`rounded-2xl border-2 px-3 py-3 text-left text-sm font-black ${
                      scenario === key ? 'border-slate-950 bg-lime-300' : 'border-slate-300 bg-white'
                    }`}
                  >
                    {scenarios[key].label}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid gap-3">
                <RangeInput label="Monthly inquiries" value={monthlyLeads} min={10} max={180} step={5} suffix="leads" onChange={setMonthlyLeads} />
                <RangeInput label="Average job value" value={averageJob} min={250} max={8000} step={50} prefix="CAD $" onChange={setAverageJob} />
                <RangeInput label="Stalled lead risk" value={missedRate} min={5} max={40} step={1} suffix="%" onChange={setMissedRate} />
              </div>
            </div>

            <div className="lift-card border-2 border-slate-950 bg-slate-950 p-5 text-white">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-lime-300">{activeScenario.source}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Result icon={TrendingUp} label="Monthly leak" value={`CAD $${audit.monthlyLeakage.toLocaleString()}`} />
                <Result icon={Target} label="Annual leak" value={`CAD $${audit.annualLeakage.toLocaleString()}`} />
                <Result icon={Users} label="Rescue first" value={`${audit.rescuedLeads} leads`} />
                <Result icon={ClipboardCheck} label="Recovery signal" value={`CAD $${audit.projectedRecovered.toLocaleString()}`} />
              </div>
              <div className="mt-5 border-2 border-lime-300 bg-lime-300 p-4 text-slate-950">
                <p className="text-xs font-black uppercase tracking-[0.16em]">Recommended route</p>
                <p className="mt-2 text-3xl font-black">{recommendedPackage} package</p>
                <p className="mt-2 font-bold">First workflow: capture source, reply instantly, route booking, then run 5-touch follow-up.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-slate-950 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="App foundation" title="What we will build next." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appModules.map((module) => (
              <div key={module.title} className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
                <LayoutDashboard className="h-7 w-7 text-sky-500" />
                <h3 className="mt-5 text-2xl font-black">{module.title}</h3>
                <p className="mt-2 font-semibold text-slate-600">{module.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-slate-950 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="Markets" title="Show the visitor their exact lead path." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industryExamples.slice(0, 6).map((example) => {
              const Icon = example.icon
              return (
                <div key={example.slug} className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
                  <Icon className="h-8 w-8 text-sky-500" />
                  <h3 className="mt-5 text-3xl font-black">{example.industry}</h3>
                  <p className="mt-3 font-semibold text-slate-600">{example.workflow.slice(0, 3).join(' -> ')}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="packages" className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="Offer" title="Install the response layer." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <PricingCard name="Starter" price="CAD $1,500" description="Lead capture fix" features={['Improved lead form', 'Instant reply', 'Owner alerts', 'Booking link']} />
            <PricingCard name="Growth" price="CAD $2,500" description="Complete response system" highlighted features={['Landing section', 'CRM pipeline', '5-touch follow-up', 'Review workflow', 'Team handoff']} />
            <PricingCard name="Premium" price="CAD $5,000 + monthly" description="Revenue recovery engine" features={['Advanced routing', 'Landing optimization', 'Monthly reporting', '30-day optimization support']} />
          </div>
        </div>
      </section>

      <section id="audit" className="border-t-2 border-slate-950 bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <SectionTitle eyebrow="Free audit" title="Map your first rescue path." />
            <div className="mt-6">
              <AuditForm onSubmit={(data) => setSubmissions((prev) => [...prev, data])} />
            </div>
          </div>
          <div className="lift-card border-2 border-slate-950 bg-lime-300 p-6">
            <h3 className="text-3xl font-black">Audit output</h3>
            {['Lead source map', 'Response delay risks', 'Booking path', 'Follow-up script'].map((item) => (
              <div key={item} className="mt-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-black">{item}</span>
              </div>
            ))}
            <p className="mt-8 text-sm font-black uppercase tracking-[0.16em]">Session requests</p>
            <p className="mt-2 text-6xl font-black">{submissions.length}</p>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-slate-950 bg-sky-100 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="After the audit" title="The handoff is simple." />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ['1', 'Leak map', 'We identify where leads stall or vanish.'],
              ['2', 'First route', 'We pick the highest-impact workflow to install first.'],
              ['3', 'Build sprint', 'We configure capture, replies, routing, and follow-up.'],
              ['4', 'Go live', 'Your team gets a working response path and clear next actions.'],
            ].map(([number, title, body]) => (
              <div key={title} className="border-2 border-slate-950 bg-white p-5 shadow-[5px_5px_0_#0f172a]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300 text-lg font-black">{number}</span>
                <h3 className="mt-5 text-2xl font-black">{title}</h3>
                <p className="mt-2 font-semibold text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <h2 className="max-w-3xl text-5xl font-black leading-none">No more invisible lead leakage.</h2>
            <a href="#audit" className="inline-flex items-center justify-center rounded-full bg-lime-300 px-5 py-3 text-sm font-black text-slate-950">
              Book Free Audit <Send className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function LeadMap() {
  return (
    <div className="relative min-h-[500px] overflow-hidden border-2 border-slate-950 bg-white p-5 shadow-[10px_10px_0_#0f172a]">
      <div className="absolute inset-0 opacity-35 soft-noise" />
      <div className="absolute left-10 right-10 top-[42%] h-1 route-dash" />
      <MapNode className="left-[7%] top-[28%]" color="bg-sky-300" title="Call" note="missed" />
      <MapNode className="left-[35%] top-[18%]" color="bg-lime-300" title="Reply" note="12 sec" />
      <MapNode className="right-[31%] top-[45%]" color="bg-orange-300" title="Qualify" note="intent" />
      <MapNode className="right-[5%] top-[25%]" color="bg-slate-950 text-white" title="Estimate" note="booked" />
      <div className="absolute bottom-5 left-5 right-5 border-2 border-slate-950 bg-slate-950 p-4 text-white">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-300">Live preview</p>
        <div className="mt-4 grid gap-2">
          {['Inquiry captured', 'Reply sent', 'Owner alerted', 'Follow-up scheduled'].map((item, index) => (
            <div key={item} className="grid grid-cols-[40px_1fr] gap-3 rounded-xl bg-white/10 px-3 py-2">
              <span className="font-black text-sky-300">0{index + 1}</span>
              <span className="font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MapNode({ className, color, title, note }: { className: string; color: string; title: string; note: string }) {
  return (
    <div className={`absolute ${className} lead-drift min-w-32 border-2 border-slate-950 ${color} px-4 py-4 shadow-[5px_5px_0_#0f172a]`}>
      <p className="text-xs font-black uppercase leading-none tracking-[0.16em]">{title}</p>
      <p className="mt-2 text-base font-black leading-none">{note}</p>
    </div>
  )
}

function JourneyPanel({ title, items, tone }: { title: string; items: string[]; tone: 'bad' | 'good' }) {
  const accent = tone === 'good' ? 'bg-lime-300 text-slate-950' : 'bg-orange-300 text-slate-950'

  return (
    <div className="border-2 border-white bg-white/10 p-5">
      <h3 className={`inline-flex px-3 py-2 text-sm font-black uppercase tracking-[0.14em] ${accent}`}>{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <div key={item} className="grid grid-cols-[36px_1fr] items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-sm font-black">{index + 1}</span>
            <span className="font-bold text-slate-100">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">{eyebrow}</p>
      <h2 className="mt-2 text-5xl font-black leading-none text-slate-950">{title}</h2>
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
    <label className="block border-2 border-slate-950 bg-white p-4">
      <span className="flex items-center justify-between gap-3 text-sm font-black text-slate-700">
        {label}
        <span>
          {prefix}
          {value.toLocaleString()}
          {suffix ? ` ${suffix}` : ''}
        </span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-4 w-full accent-slate-950" />
    </label>
  )
}

function Result({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border border-white/15 bg-white/10 p-4">
      <Icon className="h-5 w-5 text-lime-300" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  )
}
