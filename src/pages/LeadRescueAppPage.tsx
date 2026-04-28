import {
  ArrowLeft,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Filter,
  Inbox,
  LayoutDashboard,
  MessageSquareText,
  MoveRight,
  PlayCircle,
  RadioTower,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Stage = 'Captured' | 'Qualified' | 'Booked' | 'Follow-up' | 'Won'
type Urgency = 'Low' | 'Medium' | 'High'
type ViewKey = 'command' | 'pipeline' | 'rules' | 'sequences' | 'templates' | 'reports'

type Lead = {
  id: string
  name: string
  business: string
  industry: string
  source: string
  channel: string
  arrived: string
  service: string
  area: string
  stage: Stage
  value: number
  urgency: Urgency
  owner: string
  temperature: number
  nextAction: string
  reply: string
  tags: string[]
  conversation: string[]
}

const stages: Stage[] = ['Captured', 'Qualified', 'Booked', 'Follow-up', 'Won']

const initialLeads: Lead[] = [
  {
    id: 'LR-1042',
    name: 'Maya Chen',
    business: 'Homeowner',
    industry: 'Roofing',
    source: 'Missed call',
    channel: 'Phone',
    arrived: '2 min ago',
    service: 'Emergency leak inspection',
    area: 'Mississauga',
    stage: 'Captured',
    value: 1800,
    urgency: 'High',
    owner: 'Dispatch',
    temperature: 94,
    nextAction: 'Request address and leak status',
    reply: 'Thanks for reaching out. Can you share the property address and whether there is active leaking right now?',
    tags: ['Storm lead', 'Needs address', 'Fast reply'],
    conversation: ['Missed call detected', 'Caller asked for same-day help', 'No address captured yet'],
  },
  {
    id: 'LR-1043',
    name: 'Dr. Singh',
    business: 'Clinic inquiry',
    industry: 'Clinics',
    source: 'Website form',
    channel: 'Form',
    arrived: '8 min ago',
    service: 'Appointment request',
    area: 'Toronto',
    stage: 'Qualified',
    value: 450,
    urgency: 'Medium',
    owner: 'Front desk',
    temperature: 78,
    nextAction: 'Offer callback windows',
    reply: 'We can help. Which service are you looking for, and do mornings or afternoons work better?',
    tags: ['New patient', 'Callback', 'Service unknown'],
    conversation: ['Form submitted', 'Asked for earliest available appointment', 'Phone number validated'],
  },
  {
    id: 'LR-1044',
    name: 'Rafael Ortiz',
    business: 'Renovation prospect',
    industry: 'Renovation',
    source: 'Instagram DM',
    channel: 'DM',
    arrived: '21 min ago',
    service: 'Kitchen remodel',
    area: 'Oakville',
    stage: 'Booked',
    value: 5200,
    urgency: 'Medium',
    owner: 'Sales',
    temperature: 84,
    nextAction: 'Confirm discovery call',
    reply: 'What space are you renovating, and what timeline are you hoping for?',
    tags: ['High value', 'Discovery booked', 'Design scope'],
    conversation: ['DM received', 'Budget range shared', 'Discovery slot held for tomorrow'],
  },
  {
    id: 'LR-1045',
    name: 'Amelia Brooks',
    business: 'Cleaning quote',
    industry: 'Cleaning',
    source: 'Quote form',
    channel: 'Form',
    arrived: '44 min ago',
    service: 'Recurring cleaning',
    area: 'Brampton',
    stage: 'Follow-up',
    value: 320,
    urgency: 'Low',
    owner: 'Ops',
    temperature: 61,
    nextAction: 'Send reminder 2',
    reply: 'Is this a one-time clean or recurring service, and how many rooms should we include?',
    tags: ['Price shopper', 'Reminder due', 'Recurring'],
    conversation: ['Quote form submitted', 'Touch 1 sent', 'No reply after 18 hours'],
  },
  {
    id: 'LR-1046',
    name: 'Nadia Patel',
    business: 'HVAC homeowner',
    industry: 'HVAC',
    source: 'Google Ads form',
    channel: 'Ad',
    arrived: '1 hr ago',
    service: 'No heat call',
    area: 'Etobicoke',
    stage: 'Captured',
    value: 950,
    urgency: 'High',
    owner: 'Dispatch',
    temperature: 89,
    nextAction: 'Route to emergency queue',
    reply: 'Is this no heat right now, and is anyone vulnerable in the home? We can route this as priority if needed.',
    tags: ['Emergency', 'No heat', 'Priority'],
    conversation: ['Ad form captured', 'Selected no heat', 'Postal code inside service area'],
  },
]

const views: { key: ViewKey; label: string; icon: LucideIcon }[] = [
  { key: 'command', label: 'Command', icon: RadioTower },
  { key: 'pipeline', label: 'Pipeline', icon: LayoutDashboard },
  { key: 'rules', label: 'Rules', icon: Settings2 },
  { key: 'sequences', label: 'Sequences', icon: BellRing },
  { key: 'templates', label: 'Templates', icon: ClipboardList },
  { key: 'reports', label: 'Reports', icon: Target },
]

const stageColor: Record<Stage, string> = {
  Captured: 'bg-sky-200',
  Qualified: 'bg-lime-300',
  Booked: 'bg-orange-200',
  'Follow-up': 'bg-white',
  Won: 'bg-slate-950 text-white',
}

const urgencyColor: Record<Urgency, string> = {
  High: 'bg-orange-300',
  Medium: 'bg-sky-200',
  Low: 'bg-slate-100',
}

export function LeadRescueAppPage() {
  const [leads, setLeads] = useState(initialLeads)
  const [activeView, setActiveView] = useState<ViewKey>('command')
  const [selectedLeadId, setSelectedLeadId] = useState(initialLeads[0].id)
  const [sourceFilter, setSourceFilter] = useState('All')
  const [urgencyFilter, setUrgencyFilter] = useState('All')

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) ?? leads[0]
  const sources = useMemo(() => ['All', ...Array.from(new Set(leads.map((lead) => lead.source)))], [leads])
  const urgencyOptions = ['All', 'High', 'Medium', 'Low']

  const filteredLeads = leads
    .filter((lead) => sourceFilter === 'All' || lead.source === sourceFilter)
    .filter((lead) => urgencyFilter === 'All' || lead.urgency === urgencyFilter)
    .sort((a, b) => b.temperature - a.temperature)

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0)
  const shortValue = totalValue >= 1000 ? `CAD $${(totalValue / 1000).toFixed(1)}k` : `CAD $${totalValue.toLocaleString()}`
  const hotLeadCount = leads.filter((lead) => lead.urgency === 'High').length
  const bookedCount = leads.filter((lead) => lead.stage === 'Booked' || lead.stage === 'Won').length
  const avgTemperature = Math.round(leads.reduce((sum, lead) => sum + lead.temperature, 0) / leads.length)

  const stageLead = (leadId: string, stage: Stage) => {
    setLeads((current) => current.map((lead) => (lead.id === leadId ? { ...lead, stage } : lead)))
  }

  const moveForward = () => {
    const index = stages.indexOf(selectedLead.stage)
    const next = stages[Math.min(index + 1, stages.length - 1)]
    stageLead(selectedLead.id, next)
  }

  const markReplySent = () => {
    setLeads((current) =>
      current.map((lead) =>
        lead.id === selectedLead.id
          ? { ...lead, stage: lead.stage === 'Captured' ? 'Qualified' : lead.stage, conversation: ['Reply sent from LeadRescue', ...lead.conversation] }
          : lead,
      ),
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <AppHeader />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 md:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr]">
        <aside className="h-fit border-2 border-slate-950 bg-white p-3 shadow-[6px_6px_0_#0f172a] md:sticky md:top-20">
          <div className="border-2 border-slate-950 bg-lime-300 p-4">
            <div className="flex items-center gap-2">
              <RadioTower className="h-5 w-5" />
              <p className="text-xs font-black uppercase tracking-[0.16em]">LeadRescue OS</p>
            </div>
            <h1 className="mt-2 text-2xl font-black leading-none xl:text-3xl">Response control</h1>
          </div>
          <nav className="mt-3 grid gap-2">
            {views.map((view) => {
              const Icon = view.icon
              return (
                <button
                  key={view.key}
                  onClick={() => setActiveView(view.key)}
                  className={`group flex items-center justify-between gap-3 border-2 px-3 py-3 text-left text-sm font-black transition ${
                    activeView === view.key ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white hover:border-slate-950'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {view.label}
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-50 transition group-hover:translate-x-0.5" />
                </button>
              )
            })}
          </nav>
          <div className="mt-3 border-2 border-slate-950 bg-sky-100 p-3">
            <p className="text-xs font-black uppercase tracking-[0.14em]">Next build layer</p>
            <p className="mt-2 text-sm font-bold text-slate-700">Connectors, auth, real CRM sync, and AI-generated replies will sit behind this interface.</p>
          </div>
        </aside>

        <section className="min-w-0 grid gap-4">
          <AppTopBar selectedLead={selectedLead} avgTemperature={avgTemperature} />

          <div className="grid gap-3 md:grid-cols-4">
            <Metric icon={Inbox} label="Open" value={`${leads.length}`} detail={`${hotLeadCount} high priority`} />
            <Metric icon={TrendingUp} label="Pipeline" value={shortValue} detail="Sample workspace" />
            <Metric icon={CalendarCheck2} label="Booked" value={`${bookedCount}`} detail="Ready for handoff" />
            <Metric icon={RadioTower} label="Heat" value={`${avgTemperature}`} detail="Lead index" />
          </div>

          <AnimatePresence mode="wait">
            {activeView === 'command' ? (
              <motion.div key="command" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid gap-4">
                <CommandCenter
                  leads={filteredLeads}
                  selectedLead={selectedLead}
                  sources={sources}
                  urgencyOptions={urgencyOptions}
                  sourceFilter={sourceFilter}
                  urgencyFilter={urgencyFilter}
                  onSourceFilter={setSourceFilter}
                  onUrgencyFilter={setUrgencyFilter}
                  onSelect={setSelectedLeadId}
                  onMoveForward={moveForward}
                  onStage={stageLead}
                  onReplySent={markReplySent}
                />
              </motion.div>
            ) : null}

            {activeView === 'pipeline' ? (
              <motion.div key="pipeline" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <Pipeline leads={leads} onSelect={setSelectedLeadId} />
              </motion.div>
            ) : null}
            {activeView === 'rules' ? <motion.div key="rules" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><RulesView /></motion.div> : null}
            {activeView === 'sequences' ? <motion.div key="sequences" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><SequencesView /></motion.div> : null}
            {activeView === 'templates' ? <motion.div key="templates" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><TemplatesView /></motion.div> : null}
            {activeView === 'reports' ? <motion.div key="reports" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><ReportsView leads={leads} /></motion.div> : null}
          </AnimatePresence>
        </section>
      </div>
    </main>
  )
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-slate-950 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border-2 border-white bg-lime-300 text-slate-950 shadow-[4px_4px_0_#38bdf8]">
            <RadioTower className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-300">LeadRescue</p>
            <h1 className="text-xl font-black leading-none">Response Workspace</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="border border-white/20 bg-white/10 px-3 py-2">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">Mode</p>
            <p className="text-sm font-black">Demo command center</p>
          </div>
          <Link to="/leadrescue-ai" className="inline-flex items-center gap-2 border-2 border-white bg-white px-3 py-2 text-sm font-black text-slate-950 transition hover:bg-lime-300">
            <ArrowLeft className="h-4 w-4" />
            Public site
          </Link>
        </div>
      </div>
    </header>
  )
}

function AppTopBar({ selectedLead, avgTemperature }: { selectedLead: Lead; avgTemperature: number }) {
  return (
    <div className="grid gap-3 border-2 border-slate-950 bg-white p-3 shadow-[6px_6px_0_#e2e8f0] lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">Live workspace</p>
        <h2 className="mt-1 text-3xl font-black leading-none md:text-4xl">Every lead has a next move.</h2>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:w-[340px]">
        <StatusPill icon={ShieldCheck} label="System" value="Routing on" />
        <StatusPill icon={Target} label="Focus" value={`${selectedLead.name} / ${avgTemperature}`} />
      </div>
    </div>
  )
}

function CommandCenter({
  leads,
  selectedLead,
  sources,
  urgencyOptions,
  sourceFilter,
  urgencyFilter,
  onSourceFilter,
  onUrgencyFilter,
  onSelect,
  onMoveForward,
  onStage,
  onReplySent,
}: {
  leads: Lead[]
  selectedLead: Lead
  sources: string[]
  urgencyOptions: string[]
  sourceFilter: string
  urgencyFilter: string
  onSourceFilter: (value: string) => void
  onUrgencyFilter: (value: string) => void
  onSelect: (id: string) => void
  onMoveForward: () => void
  onStage: (leadId: string, stage: Stage) => void
  onReplySent: () => void
}) {
  return (
    <div className="grid gap-4 2xl:grid-cols-[0.95fr_1.05fr]">
      <div className="grid gap-4">
        <RescueMap selectedLead={selectedLead} />
        <LeadQueue
          leads={leads}
          selectedLead={selectedLead}
          sources={sources}
          urgencyOptions={urgencyOptions}
          sourceFilter={sourceFilter}
          urgencyFilter={urgencyFilter}
          onSourceFilter={onSourceFilter}
          onUrgencyFilter={onUrgencyFilter}
          onSelect={onSelect}
        />
      </div>
      <LeadActionDock lead={selectedLead} onMoveForward={onMoveForward} onStage={onStage} onReplySent={onReplySent} />
    </div>
  )
}

function RescueMap({ selectedLead }: { selectedLead: Lead }) {
  const route = [
    { label: 'Capture', detail: selectedLead.source, icon: Inbox },
    { label: 'Triage', detail: selectedLead.urgency, icon: Target },
    { label: 'Reply', detail: '< 5 min', icon: MessageSquareText },
    { label: 'Book', detail: selectedLead.nextAction, icon: CalendarCheck2 },
  ]

  return (
    <div className="relative min-h-[280px] overflow-hidden border-2 border-slate-950 bg-slate-950 p-4 text-white shadow-[6px_6px_0_#38bdf8]">
      <div className="absolute inset-0 rescue-grid opacity-70" />
      <motion.div className="absolute left-8 right-8 top-1/2 h-1 bg-lime-300" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9 }} style={{ transformOrigin: 'left' }} />
      <motion.div className="absolute top-[calc(50%-10px)] h-5 w-5 rounded-full border-2 border-white bg-lime-300" animate={{ left: ['8%', '36%', '63%', '87%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="relative grid min-h-[245px] items-center gap-3 md:grid-cols-4">
        {route.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.label}
              className="border-2 border-white bg-white p-4 text-slate-950 shadow-[5px_5px_0_rgba(255,255,255,0.25)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="flex items-center justify-between gap-3">
                <Icon className="h-6 w-6 text-sky-500" />
                <span className="text-xs font-black">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl font-black">{step.label}</h3>
              <p className="mt-2 line-clamp-2 text-sm font-bold text-slate-600">{step.detail}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function LeadQueue({
  leads,
  selectedLead,
  sources,
  urgencyOptions,
  sourceFilter,
  urgencyFilter,
  onSourceFilter,
  onUrgencyFilter,
  onSelect,
}: {
  leads: Lead[]
  selectedLead: Lead
  sources: string[]
  urgencyOptions: string[]
  sourceFilter: string
  urgencyFilter: string
  onSourceFilter: (value: string) => void
  onUrgencyFilter: (value: string) => void
  onSelect: (id: string) => void
}) {
  return (
    <section className="border-2 border-slate-950 bg-white p-4 shadow-[6px_6px_0_#e2e8f0]">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Priority queue</p>
          <h2 className="text-3xl font-black">Leads sorted by heat</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <SelectControl icon={Filter} label="Source" value={sourceFilter} options={sources} onChange={onSourceFilter} />
          <SelectControl icon={RadioTower} label="Urgency" value={urgencyFilter} options={urgencyOptions} onChange={onUrgencyFilter} />
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {leads.map((lead) => (
          <LeadRow key={lead.id} lead={lead} active={lead.id === selectedLead.id} onClick={() => onSelect(lead.id)} />
        ))}
      </div>
    </section>
  )
}

function LeadRow({ lead, active, onClick }: { lead: Lead; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`grid gap-3 border-2 p-4 text-left transition md:grid-cols-[86px_1fr_auto] md:items-center ${
        active ? 'border-slate-950 bg-lime-100 shadow-[4px_4px_0_#0f172a]' : 'border-slate-200 bg-white hover:border-slate-950'
      }`}
    >
      <div className="h-16 w-16 border-2 border-slate-950 bg-slate-950 p-2 text-center text-white">
        <p className="text-2xl font-black">{lead.temperature}</p>
        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-lime-300">Heat</p>
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
          {lead.id} / {lead.arrived} / {lead.channel}
        </p>
        <h3 className="mt-1 text-xl font-black">{lead.name}</h3>
        <p className="font-semibold text-slate-600">
          {lead.industry} / {lead.service} / {lead.area}
        </p>
      </div>
      <div className="grid gap-2 md:justify-items-end">
        <p className="font-black">CAD ${lead.value.toLocaleString()}</p>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <StageBadge stage={lead.stage} />
          <span className={`border-2 border-slate-950 px-2 py-1 text-xs font-black ${urgencyColor[lead.urgency]}`}>{lead.urgency}</span>
        </div>
      </div>
    </button>
  )
}

function LeadActionDock({
  lead,
  onMoveForward,
  onStage,
  onReplySent,
}: {
  lead: Lead
  onMoveForward: () => void
  onStage: (leadId: string, stage: Stage) => void
  onReplySent: () => void
}) {
  return (
    <aside className="h-fit border-2 border-slate-950 bg-white p-4 shadow-[6px_6px_0_#0f172a] 2xl:sticky 2xl:top-20">
      <div className="grid gap-3 border-2 border-slate-950 bg-sky-100 p-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Selected lead</p>
          <h2 className="mt-1 text-4xl font-black leading-none">{lead.name}</h2>
          <p className="mt-2 font-semibold text-slate-600">
            {lead.business} / {lead.industry}
          </p>
        </div>
        <div className="border-2 border-slate-950 bg-white p-3 text-center">
          <p className="text-3xl font-black">{lead.temperature}</p>
          <p className="text-[10px] font-black uppercase tracking-[0.14em]">Heat</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Info label="Urgency" value={lead.urgency} />
        <Info label="Value" value={`CAD $${lead.value.toLocaleString()}`} />
        <Info label="Owner" value={lead.owner} />
        <Info label="Stage" value={lead.stage} />
      </div>

      <div className="mt-4 border-2 border-slate-950 bg-lime-300 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <p className="text-xs font-black uppercase tracking-[0.16em]">Suggested reply</p>
        </div>
        <p className="mt-3 font-bold leading-7">{lead.reply}</p>
        <button onClick={onReplySent} className="mt-4 inline-flex w-full items-center justify-center gap-2 border-2 border-slate-950 bg-slate-950 px-4 py-3 font-black text-white shadow-[4px_4px_0_#38bdf8]">
          Send reply <Send className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 border-2 border-slate-950 bg-white p-4">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Handoff brief</p>
        <div className="mt-3 grid gap-2">
          {lead.conversation.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
              <p className="text-sm font-bold text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <button onClick={onMoveForward} className="inline-flex items-center justify-center gap-2 border-2 border-slate-950 bg-slate-950 px-4 py-3 font-black text-white shadow-[4px_4px_0_#bef264]">
          Move forward <MoveRight className="h-4 w-4" />
        </button>
        <div className="grid grid-cols-2 gap-2">
          {stages.map((stage) => (
            <button key={stage} onClick={() => onStage(lead.id, stage)} className={`border-2 border-slate-950 px-3 py-2 text-xs font-black hover:bg-lime-200 ${stage === lead.stage ? 'bg-slate-950 text-white' : 'bg-white'}`}>
              {stage}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

function Metric({ icon: Icon, label, value, detail }: { icon: LucideIcon; label: string; value: string; detail: string }) {
  return (
    <div className="border-2 border-slate-950 bg-white p-3 shadow-[4px_4px_0_#e2e8f0]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <Icon className="h-5 w-5 text-sky-500" />
      </div>
      <p className="mt-2 whitespace-nowrap text-xl font-black xl:text-2xl">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-500">{detail}</p>
    </div>
  )
}

function StatusPill({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border-2 border-slate-950 bg-slate-950 p-2.5 text-white">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-lime-300" />
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">{label}</p>
      </div>
      <p className="mt-1 font-black">{value}</p>
    </div>
  )
}

function SelectControl({ icon: Icon, label, value, options, onChange }: { icon: LucideIcon; label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center gap-2 border-2 border-slate-950 bg-white px-3 py-2 text-sm font-black">
      <Icon className="h-4 w-4" />
      <span className="sr-only">{label}</span>
      <select className="bg-white font-black outline-none" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-slate-200 p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  )
}

function StageBadge({ stage }: { stage: Stage }) {
  return <span className={`inline-flex border-2 border-slate-950 px-2 py-1 text-xs font-black ${stageColor[stage]}`}>{stage}</span>
}

function Pipeline({ leads, onSelect }: { leads: Lead[]; onSelect: (id: string) => void }) {
  return (
    <div className="grid gap-3 xl:grid-cols-5">
      {stages.map((stage) => {
        const stageLeads = leads.filter((lead) => lead.stage === stage)
        return (
          <div key={stage} className="min-h-[360px] border-2 border-slate-950 bg-white p-3 shadow-[4px_4px_0_#e2e8f0]">
            <div className={`border-2 border-slate-950 p-3 ${stageColor[stage]}`}>
              <h2 className="text-lg font-black">{stage}</h2>
              <p className="text-xs font-black uppercase tracking-[0.12em]">{stageLeads.length} leads</p>
            </div>
            <div className="mt-3 grid gap-2">
              {stageLeads.map((lead) => (
                <button key={lead.id} onClick={() => onSelect(lead.id)} className="border-2 border-slate-200 bg-slate-50 p-3 text-left hover:border-slate-950">
                  <p className="font-black">{lead.name}</p>
                  <p className="text-sm font-semibold text-slate-600">{lead.industry}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-sm font-black">CAD ${lead.value.toLocaleString()}</span>
                    <span className="border-2 border-slate-950 bg-white px-2 py-1 text-xs font-black">{lead.temperature}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function RulesView() {
  return (
    <SimpleGrid
      title="Response rules"
      icon={Settings2}
      items={[
        ['Missed call rescue', 'Trigger owner alert, send SMS draft, create callback task.'],
        ['Urgency triage', 'High urgency leads jump the queue and show in the action dock.'],
        ['Service-area match', 'Ask postal code before routing to booking.'],
        ['Quote intent', 'Collect scope, timeline, and booking preference.'],
      ]}
    />
  )
}

function SequencesView() {
  return (
    <SimpleGrid
      title="Follow-up sequences"
      icon={PlayCircle}
      items={[
        ['Instant confirmation', 'Set expectation and ask the missing intake question.'],
        ['Next-step reminder', 'Nudge the buyer toward booking or callback.'],
        ['Proof touch', 'Send a relevant proof point or service note.'],
        ['Booking nudge', 'Offer two simple appointment windows.'],
        ['Close loop', 'Mark quiet leads cleanly and keep the history.'],
      ]}
    />
  )
}

function TemplatesView() {
  return (
    <SimpleGrid
      title="Industry templates"
      icon={Sparkles}
      items={[
        ['Roofing', 'Storm damage, leak status, address, photo request.'],
        ['Clinics', 'Service type, appointment window, callback preference.'],
        ['Renovation', 'Scope, budget range, timing, discovery call.'],
        ['Cleaning', 'Rooms, recurring need, property type, quote follow-up.'],
        ['HVAC', 'No heat/no cooling, equipment, postal code, dispatcher alert.'],
        ['Legal', 'Matter type, deadline, document checklist, consult handoff.'],
      ]}
    />
  )
}

function ReportsView({ leads }: { leads: Lead[] }) {
  const rescuedValue = leads.filter((lead) => lead.stage === 'Booked' || lead.stage === 'Won').reduce((sum, lead) => sum + lead.value, 0)
  const highPriority = leads.filter((lead) => lead.urgency === 'High')

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
      <SimpleGrid
        title="Audit report"
        icon={Target}
        items={[
          ['Leak sources mapped', 'Calls, forms, DMs, ads, and quote requests are visible.'],
          ['Response risk scored', `${highPriority.length} high-priority leads need fast handling.`],
          ['Recommended route', 'Capture, qualify, reply, book, follow up.'],
          ['Team handoff', 'Each lead has owner, next action, value, and conversation notes.'],
        ]}
      />
      <div className="border-2 border-slate-950 bg-lime-300 p-5 shadow-[6px_6px_0_#0f172a]">
        <p className="text-sm font-black uppercase tracking-[0.16em]">Recovery snapshot</p>
        <p className="mt-3 text-5xl font-black">CAD ${rescuedValue.toLocaleString()}</p>
        <p className="mt-2 font-bold">booked or won value represented in the sample workspace.</p>
        <div className="mt-5 grid gap-2">
          {['Lead source map', 'Priority queue', 'Reply scripts', 'Pipeline report'].map((item) => (
            <div key={item} className="flex items-center gap-2 border-2 border-slate-950 bg-white px-3 py-2">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-black">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SimpleGrid({ title, icon: Icon, items }: { title: string; icon: LucideIcon; items: [string, string][] }) {
  return (
    <div className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
      <div className="flex flex-wrap items-center gap-3">
        <Icon className="h-7 w-7 text-sky-500" />
        <h2 className="text-3xl font-black">{title}</h2>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map(([titleText, body]) => (
          <div key={titleText} className="border-2 border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-sky-500" />
              <p className="font-black">{titleText}</p>
            </div>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
