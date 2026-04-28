import {
  ArrowLeft,
  BellRing,
  CalendarCheck2,
  Cable,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Database,
  FileText,
  Filter,
  Inbox,
  KeyRound,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  MoveRight,
  Plus,
  RadioTower,
  Save,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { initialAppState } from '../app/sampleData'
import { stages, type AppState, type AutomationRule, type Integration, type Lead, type Plan, type Sequence, type Stage, type Template, type Urgency } from '../app/types'
import { usePersistentState } from '../hooks/usePersistentState'

type AppRouteKey = 'command' | 'leads' | 'pipeline' | 'automations' | 'templates' | 'integrations' | 'reports' | 'settings'

const appViews: { key: AppRouteKey; label: string; path: string; icon: LucideIcon }[] = [
  { key: 'command', label: 'Command', path: '/app', icon: RadioTower },
  { key: 'leads', label: 'Leads', path: '/app/leads', icon: Inbox },
  { key: 'pipeline', label: 'Pipeline', path: '/app/pipeline', icon: LayoutDashboard },
  { key: 'automations', label: 'Automations', path: '/app/automations', icon: BellRing },
  { key: 'templates', label: 'Templates', path: '/app/templates', icon: ClipboardList },
  { key: 'integrations', label: 'Integrations', path: '/app/integrations', icon: Cable },
  { key: 'reports', label: 'Reports', path: '/app/reports', icon: Target },
  { key: 'settings', label: 'Settings', path: '/app/settings', icon: Settings2 },
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

const planColor: Record<Plan, string> = {
  Starter: 'bg-sky-100',
  Growth: 'bg-lime-300',
  Premium: 'bg-orange-200',
}

const integrationStatusColor: Record<Integration['status'], string> = {
  Ready: 'bg-lime-300',
  'Needs credentials': 'bg-orange-200',
  Planned: 'bg-sky-100',
}

type DraftLead = {
  name: string
  business: string
  industry: string
  source: string
  channel: string
  service: string
  area: string
  value: string
  urgency: Urgency
}

const emptyDraftLead: DraftLead = {
  name: '',
  business: '',
  industry: 'Roofing',
  source: 'Website form',
  channel: 'Form',
  service: '',
  area: '',
  value: '',
  urgency: 'Medium',
}

export function LeadRescueAppPage() {
  const [appState, setAppState] = usePersistentState<AppState>('leadrescue-app-state-v3', initialAppState)
  const [selectedLeadId, setSelectedLeadId] = useState(appState.leads[0]?.id ?? '')
  const location = useLocation()

  const selectedLead = appState.leads.find((lead) => lead.id === selectedLeadId) ?? appState.leads[0]
  const activeKey = getActiveKey(location.pathname)
  const metrics = useMemo(() => getMetrics(appState), [appState])

  const updateLead = (leadId: string, updater: (lead: Lead) => Lead) => {
    setAppState((current) => ({
      ...current,
      leads: current.leads.map((lead) => (lead.id === leadId ? updater(lead) : lead)),
    }))
  }

  const stageLead = (leadId: string, stage: Stage) => {
    updateLead(leadId, (lead) => ({
      ...lead,
      stage,
      conversation: [`Stage changed to ${stage}`, ...lead.conversation],
    }))
  }

  const moveForward = () => {
    if (!selectedLead) return
    const index = stages.indexOf(selectedLead.stage)
    const next = stages[Math.min(index + 1, stages.length - 1)]
    stageLead(selectedLead.id, next)
  }

  const markReplySent = () => {
    if (!selectedLead) return
    updateLead(selectedLead.id, (lead) => ({
      ...lead,
      stage: lead.stage === 'Captured' ? 'Qualified' : lead.stage,
      conversation: ['Reply marked as sent in workspace', ...lead.conversation],
    }))
  }

  const addLead = (draft: DraftLead) => {
    const newLead: Lead = {
      id: `LR-${Math.floor(2000 + Math.random() * 7999)}`,
      name: draft.name.trim(),
      business: draft.business.trim() || 'New inquiry',
      industry: draft.industry,
      source: draft.source,
      channel: draft.channel,
      arrived: 'Just now',
      service: draft.service.trim(),
      area: draft.area.trim(),
      stage: 'Captured',
      value: Number(draft.value) || 0,
      urgency: draft.urgency,
      owner: draft.urgency === 'High' ? 'Dispatch' : 'Sales',
      temperature: draft.urgency === 'High' ? 91 : draft.urgency === 'Medium' ? 74 : 55,
      nextAction: 'Review intake and send first reply',
      reply: createSuggestedReply(draft),
      tags: [draft.industry, draft.source, draft.urgency],
      conversation: ['Lead manually created in workspace'],
      notes: ['New lead added during demo session.'],
    }

    setAppState((current) => ({ ...current, leads: [newLead, ...current.leads] }))
    setSelectedLeadId(newLead.id)
  }

  const toggleAutomation = (ruleId: string) => {
    setAppState((current) => ({
      ...current,
      automations: current.automations.map((rule) => (rule.id === ruleId ? { ...rule, status: rule.status === 'Active' ? 'Paused' : 'Active' } : rule)),
    }))
  }

  const saveWorkspace = (workspace: AppState['workspace']) => {
    setAppState((current) => ({ ...current, workspace }))
  }

  const resetDemo = () => {
    setAppState(initialAppState)
    setSelectedLeadId(initialAppState.leads[0].id)
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <AppHeader workspaceName={appState.workspace.company} plan={appState.workspace.plan} />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 md:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr]">
        <AppSidebar activeKey={activeKey} workspace={appState.workspace} />

        <section className="min-w-0 grid gap-4">
          <WorkspaceBanner selectedLead={selectedLead} metrics={metrics} workspace={appState.workspace} />
          <MetricStrip metrics={metrics} />

          <AnimatePresence mode="wait">
            <motion.div key={activeKey} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <Routes>
                <Route
                  index
                  element={
                    <CommandScreen
                      appState={appState}
                      selectedLead={selectedLead}
                      selectedLeadId={selectedLeadId}
                      onSelectLead={setSelectedLeadId}
                      onMoveForward={moveForward}
                      onStageLead={stageLead}
                      onReplySent={markReplySent}
                    />
                  }
                />
                <Route
                  path="leads"
                  element={
                    <LeadsScreen
                      leads={appState.leads}
                      selectedLead={selectedLead}
                      selectedLeadId={selectedLeadId}
                      onSelectLead={setSelectedLeadId}
                      onAddLead={addLead}
                      onMoveForward={moveForward}
                      onStageLead={stageLead}
                      onReplySent={markReplySent}
                    />
                  }
                />
                <Route path="pipeline" element={<PipelineScreen leads={appState.leads} onSelectLead={setSelectedLeadId} onStageLead={stageLead} />} />
                <Route path="automations" element={<AutomationsScreen rules={appState.automations} sequences={appState.sequences} onToggle={toggleAutomation} />} />
                <Route path="templates" element={<TemplatesScreen templates={appState.templates} />} />
                <Route path="integrations" element={<IntegrationsScreen integrations={appState.integrations} />} />
                <Route path="reports" element={<ReportsScreen appState={appState} metrics={metrics} />} />
                <Route path="settings" element={<SettingsScreen workspace={appState.workspace} onSave={saveWorkspace} onReset={resetDemo} />} />
                <Route path="*" element={<Navigate to="/app" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  )
}

function AppHeader({ workspaceName, plan }: { workspaceName: string; plan: Plan }) {
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
          <div className="hidden border border-white/20 bg-white/10 px-3 py-2 sm:block">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">{plan} workspace</p>
            <p className="text-sm font-black">{workspaceName}</p>
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

function AppSidebar({ activeKey, workspace }: { activeKey: AppRouteKey; workspace: AppState['workspace'] }) {
  return (
    <aside className="h-fit border-2 border-slate-950 bg-white p-3 shadow-[6px_6px_0_#0f172a] md:sticky md:top-20">
      <div className="border-2 border-slate-950 bg-lime-300 p-4">
        <div className="flex items-center gap-2">
          <RadioTower className="h-5 w-5" />
          <p className="text-xs font-black uppercase tracking-[0.16em]">LeadRescue OS</p>
        </div>
        <h1 className="mt-2 text-2xl font-black leading-none xl:text-3xl">Response control</h1>
      </div>

      <nav className="mt-3 grid gap-2">
        {appViews.map((view) => {
          const Icon = view.icon
          const active = activeKey === view.key
          return (
            <Link
              key={view.key}
              to={view.path}
              className={`group flex items-center justify-between gap-3 border-2 px-3 py-3 text-left text-sm font-black transition ${
                active ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white hover:border-slate-950'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {view.label}
              </span>
              <ChevronRight className="h-4 w-4 opacity-50 transition group-hover:translate-x-0.5" />
            </Link>
          )
        })}
      </nav>

      <div className="mt-3 border-2 border-slate-950 bg-sky-100 p-3">
        <p className="text-xs font-black uppercase tracking-[0.14em]">SLA target</p>
        <p className="mt-1 text-3xl font-black">{workspace.responseTargetMinutes} min</p>
        <p className="mt-2 text-sm font-bold text-slate-700">{workspace.defaultBookingType}</p>
      </div>
    </aside>
  )
}

function WorkspaceBanner({ selectedLead, metrics, workspace }: { selectedLead?: Lead; metrics: ReturnType<typeof getMetrics>; workspace: AppState['workspace'] }) {
  return (
    <div className="grid gap-3 border-2 border-slate-950 bg-white p-3 shadow-[6px_6px_0_#e2e8f0] lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">Live workspace</p>
        <h2 className="mt-1 text-3xl font-black leading-none md:text-4xl">Every lead has a next move.</h2>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:w-[360px]">
        <StatusPill icon={ShieldCheck} label="System" value={`${workspace.plan} / routing on`} />
        <StatusPill icon={Target} label="Focus" value={`${selectedLead?.name ?? 'No lead'} / ${metrics.avgTemperature}`} />
      </div>
    </div>
  )
}

function MetricStrip({ metrics }: { metrics: ReturnType<typeof getMetrics> }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <Metric icon={Inbox} label="Open" value={`${metrics.openLeads}`} detail={`${metrics.hotLeads} high priority`} />
      <Metric icon={TrendingUp} label="Pipeline" value={metrics.shortValue} detail="Active opportunity" />
      <Metric icon={CalendarCheck2} label="Booked" value={`${metrics.bookedCount}`} detail="Ready for handoff" />
      <Metric icon={RadioTower} label="Heat" value={`${metrics.avgTemperature}`} detail="Lead index" />
    </div>
  )
}

function CommandScreen({
  appState,
  selectedLead,
  selectedLeadId,
  onSelectLead,
  onMoveForward,
  onStageLead,
  onReplySent,
}: {
  appState: AppState
  selectedLead?: Lead
  selectedLeadId: string
  onSelectLead: (id: string) => void
  onMoveForward: () => void
  onStageLead: (leadId: string, stage: Stage) => void
  onReplySent: () => void
}) {
  const hotLeads = appState.leads.filter((lead) => lead.urgency === 'High' || lead.temperature >= 85).sort((a, b) => b.temperature - a.temperature)

  return (
    <div className="grid gap-4 2xl:grid-cols-[0.95fr_1.05fr]">
      <div className="grid gap-4">
        {selectedLead ? <RescueMap selectedLead={selectedLead} /> : <EmptyPanel title="No selected lead" body="Create or select a lead to activate the command route." />}
        <LeadQueue leads={hotLeads} selectedLeadId={selectedLeadId} onSelect={onSelectLead} title="Priority queue" subtitle="Hot leads and urgent routes" />
      </div>
      {selectedLead ? (
        <LeadActionDock lead={selectedLead} onMoveForward={onMoveForward} onStage={onStageLead} onReplySent={onReplySent} />
      ) : (
        <EmptyPanel title="No lead selected" body="The action dock appears once a lead is selected." />
      )}
    </div>
  )
}

function LeadsScreen({
  leads,
  selectedLead,
  selectedLeadId,
  onSelectLead,
  onAddLead,
  onMoveForward,
  onStageLead,
  onReplySent,
}: {
  leads: Lead[]
  selectedLead?: Lead
  selectedLeadId: string
  onSelectLead: (id: string) => void
  onAddLead: (draft: DraftLead) => void
  onMoveForward: () => void
  onStageLead: (leadId: string, stage: Stage) => void
  onReplySent: () => void
}) {
  const [query, setQuery] = useState('')
  const [sourceFilter, setSourceFilter] = useState('All')
  const [urgencyFilter, setUrgencyFilter] = useState('All')
  const sources = useMemo(() => ['All', ...Array.from(new Set(leads.map((lead) => lead.source)))], [leads])
  const filteredLeads = leads
    .filter((lead) => sourceFilter === 'All' || lead.source === sourceFilter)
    .filter((lead) => urgencyFilter === 'All' || lead.urgency === urgencyFilter)
    .filter((lead) => [lead.name, lead.business, lead.industry, lead.service, lead.area].join(' ').toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b.temperature - a.temperature)

  return (
    <div className="grid gap-4 2xl:grid-cols-[1fr_410px]">
      <div className="grid gap-4">
        <AddLeadForm onAddLead={onAddLead} />
        <section className="border-2 border-slate-950 bg-white p-4 shadow-[6px_6px_0_#e2e8f0]">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Lead inbox</p>
              <h2 className="text-3xl font-black">Captured opportunities</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <SearchControl value={query} onChange={setQuery} />
              <SelectControl icon={Filter} label="Source" value={sourceFilter} options={sources} onChange={setSourceFilter} />
              <SelectControl icon={RadioTower} label="Urgency" value={urgencyFilter} options={['All', 'High', 'Medium', 'Low']} onChange={setUrgencyFilter} />
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {filteredLeads.map((lead) => (
              <LeadRow key={lead.id} lead={lead} active={lead.id === selectedLeadId} onClick={() => onSelectLead(lead.id)} />
            ))}
            {filteredLeads.length === 0 ? <EmptyPanel title="No matching leads" body="Change filters or add a new lead to this workspace." /> : null}
          </div>
        </section>
      </div>
      {selectedLead ? (
        <LeadActionDock lead={selectedLead} onMoveForward={onMoveForward} onStage={onStageLead} onReplySent={onReplySent} />
      ) : (
        <EmptyPanel title="No lead selected" body="Select a lead to review reply, notes, timeline, and stage controls." />
      )}
    </div>
  )
}

function AddLeadForm({ onAddLead }: { onAddLead: (draft: DraftLead) => void }) {
  const [draft, setDraft] = useState(emptyDraftLead)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const update = (key: keyof DraftLead, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }))
    setError('')
    setSuccess('')
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!draft.name.trim() || !draft.service.trim() || !draft.area.trim()) {
      setError('Name, service, and area are required.')
      return
    }

    onAddLead(draft)
    setSuccess(`${draft.name.trim()} was added to the lead inbox.`)
    setDraft(emptyDraftLead)
    setError('')
  }

  return (
    <form onSubmit={submit} className="border-2 border-slate-950 bg-lime-300 p-4 shadow-[6px_6px_0_#0f172a]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em]">Create lead</p>
          <h2 className="text-3xl font-black">Manual intake</h2>
        </div>
        <button type="submit" className="inline-flex items-center gap-2 border-2 border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-[4px_4px_0_#38bdf8]">
          <Plus className="h-4 w-4" />
          Add lead
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <TextInput label="Name" value={draft.name} onChange={(value) => update('name', value)} />
        <TextInput label="Business" value={draft.business} onChange={(value) => update('business', value)} />
        <TextInput label="Service" value={draft.service} onChange={(value) => update('service', value)} />
        <TextInput label="Area" value={draft.area} onChange={(value) => update('area', value)} />
        <TextInput label="Value" value={draft.value} onChange={(value) => update('value', value.replace(/[^0-9]/g, ''))} />
        <label className="grid gap-1 text-sm font-black">
          Urgency
          <select className="border-2 border-slate-950 bg-white px-3 py-2" value={draft.urgency} onChange={(event) => update('urgency', event.target.value)}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>
      </div>
      {error ? <p className="mt-3 border-2 border-slate-950 bg-white px-3 py-2 text-sm font-black text-slate-950">{error}</p> : null}
      {success ? <p className="mt-3 border-2 border-slate-950 bg-white px-3 py-2 text-sm font-black text-slate-950">{success}</p> : null}
    </form>
  )
}

function PipelineScreen({ leads, onSelectLead, onStageLead }: { leads: Lead[]; onSelectLead: (id: string) => void; onStageLead: (leadId: string, stage: Stage) => void }) {
  const navigate = useNavigate()

  return (
    <div className="grid gap-3 xl:grid-cols-5">
      {stages.map((stage) => {
        const stageLeads = leads.filter((lead) => lead.stage === stage)
        const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0)
        return (
          <div key={stage} className="min-h-[420px] border-2 border-slate-950 bg-white p-3 shadow-[4px_4px_0_#e2e8f0]">
            <div className={`border-2 border-slate-950 p-3 ${stageColor[stage]}`}>
              <h2 className="text-lg font-black">{stage}</h2>
              <p className="text-xs font-black uppercase tracking-[0.12em]">{stageLeads.length} leads / CAD ${stageValue.toLocaleString()}</p>
            </div>
            <div className="mt-3 grid gap-2">
              {stageLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => {
                    onSelectLead(lead.id)
                    navigate('/app/leads')
                  }}
                  className="border-2 border-slate-200 bg-slate-50 p-3 text-left transition hover:border-slate-950"
                >
                  <p className="font-black">{lead.name}</p>
                  <p className="text-sm font-semibold text-slate-600">{lead.industry}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-sm font-black">CAD ${lead.value.toLocaleString()}</span>
                    <span className="border-2 border-slate-950 bg-white px-2 py-1 text-xs font-black">{lead.temperature}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-1">
                    {stages.filter((nextStage) => nextStage !== stage).slice(0, 2).map((nextStage) => (
                      <span
                        key={nextStage}
                        onClick={(event) => {
                          event.stopPropagation()
                          onStageLead(lead.id, nextStage)
                        }}
                        className="border-2 border-slate-950 bg-white px-2 py-1 text-center text-[10px] font-black hover:bg-lime-200"
                      >
                        {nextStage}
                      </span>
                    ))}
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

function AutomationsScreen({ rules, sequences, onToggle }: { rules: AutomationRule[]; sequences: Sequence[]; onToggle: (id: string) => void }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.78fr]">
      <section className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
        <SectionHeading eyebrow="Rules" title="Response automations" />
        <div className="mt-5 grid gap-3">
          {rules.map((rule) => (
            <div key={rule.id} className="grid gap-3 border-2 border-slate-200 bg-slate-50 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-black">{rule.name}</h3>
                  <PlanBadge plan={rule.plan} />
                </div>
                <p className="mt-2 text-sm font-bold text-slate-600">When: {rule.trigger}</p>
                <p className="mt-1 text-sm font-bold text-slate-600">Then: {rule.action}</p>
              </div>
              <button onClick={() => onToggle(rule.id)} className={`border-2 border-slate-950 px-4 py-3 text-sm font-black ${rule.status === 'Active' ? 'bg-lime-300' : 'bg-white'}`}>
                {rule.status}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-2 border-slate-950 bg-slate-950 p-5 text-white shadow-[6px_6px_0_#38bdf8]">
        <SectionHeading eyebrow="Sequences" title="Follow-up paths" inverted />
        <div className="mt-5 grid gap-3">
          {sequences.map((sequence) => (
            <div key={sequence.id} className="border-2 border-white/20 bg-white/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-black">{sequence.name}</h3>
                <span className="border border-lime-300 px-2 py-1 text-xs font-black text-lime-300">{sequence.status}</span>
              </div>
              <p className="mt-1 text-sm font-bold text-slate-300">{sequence.audience}</p>
              <div className="mt-4 grid gap-2">
                {sequence.touches.map((touch, index) => (
                  <div key={touch} className="grid grid-cols-[34px_1fr] items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center border border-white/20 text-xs font-black">{index + 1}</span>
                    <span className="font-bold">{touch}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function TemplatesScreen({ templates }: { templates: Template[] }) {
  return (
    <section className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
      <SectionHeading eyebrow="Templates" title="Industry workflows" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <div key={template.id} className="border-2 border-slate-950 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-2xl font-black">{template.industry}</h3>
              <PlanBadge plan={template.plan} />
            </div>
            <p className="mt-3 font-bold text-slate-600">{template.goal}</p>
            <div className="mt-4 grid gap-2">
              {template.questions.map((question) => (
                <div key={question} className="flex items-center gap-2 border-2 border-slate-200 bg-white px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-500" />
                  <span className="text-sm font-black">{question}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-2 border-slate-950 bg-lime-300 p-3">
              <p className="text-xs font-black uppercase tracking-[0.14em]">First reply</p>
              <p className="mt-2 font-bold">{template.reply}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function IntegrationsScreen({ integrations }: { integrations: Integration[] }) {
  const readyCount = integrations.filter((integration) => integration.status === 'Ready').length
  const credentialCount = integrations.filter((integration) => integration.status === 'Needs credentials').length
  const plannedCount = integrations.filter((integration) => integration.status === 'Planned').length

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.78fr]">
      <section className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
        <SectionHeading eyebrow="Integrations" title="Production connection map" />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <ReportCard label="Ready" value={`${readyCount}`} />
          <ReportCard label="Needs credentials" value={`${credentialCount}`} />
          <ReportCard label="Planned" value={`${plannedCount}`} />
        </div>

        <div className="mt-5 grid gap-3">
          {integrations.map((integration) => (
            <div key={integration.id} className="grid gap-3 border-2 border-slate-200 bg-slate-50 p-4 lg:grid-cols-[42px_1fr_auto] lg:items-start">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-slate-950 bg-white">
                <IntegrationIcon category={integration.category} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-black">{integration.name}</h3>
                  <PlanBadge plan={integration.plan} />
                  <span className={`border-2 border-slate-950 px-2 py-1 text-xs font-black ${integrationStatusColor[integration.status]}`}>{integration.status}</span>
                </div>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{integration.purpose}</p>
                <p className="mt-2 text-sm font-black text-slate-950">Next: {integration.nextStep}</p>
              </div>
              <span className="border-2 border-slate-950 bg-white px-4 py-3 text-center text-sm font-black">
                {integration.status === 'Ready' ? 'Ready to enable' : 'Connect later'}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-2 border-slate-950 bg-slate-950 p-5 text-white shadow-[6px_6px_0_#38bdf8]">
        <SectionHeading eyebrow="Backend handoff" title="What connects next" inverted />
        <div className="mt-5 grid gap-3">
          {[
            ['Auth first', 'Protect /app before any customer data enters the system.'],
            ['Database second', 'Persist leads, events, rules, messages, and workspace settings.'],
            ['Messaging third', 'Wire SMS/email only after consent, opt-out, and approval rules are clear.'],
            ['AI last-mile', 'Use OpenAI for drafts and summaries with human approval before send.'],
          ].map(([title, body]) => (
            <div key={title} className="border-2 border-white/20 bg-white/10 p-4">
              <p className="font-black text-lime-300">{title}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ReportsScreen({ appState, metrics }: { appState: AppState; metrics: ReturnType<typeof getMetrics> }) {
  const sourceRows = Array.from(new Set(appState.leads.map((lead) => lead.source))).map((source) => {
    const leads = appState.leads.filter((lead) => lead.source === source)
    return {
      source,
      count: leads.length,
      value: leads.reduce((sum, lead) => sum + lead.value, 0),
      heat: Math.round(leads.reduce((sum, lead) => sum + lead.temperature, 0) / leads.length),
    }
  })

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.78fr]">
      <section className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
        <SectionHeading eyebrow="Reports" title="Revenue recovery snapshot" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <ReportCard label="Total opportunity" value={`CAD $${metrics.totalValue.toLocaleString()}`} />
          <ReportCard label="Booked or won" value={`CAD $${metrics.rescuedValue.toLocaleString()}`} />
          <ReportCard label="High priority" value={`${metrics.hotLeads} leads`} />
          <ReportCard label="Response target" value={`${appState.workspace.responseTargetMinutes} min`} />
        </div>
        <div className="mt-5 border-2 border-slate-950 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Source performance</p>
          <div className="mt-3 grid gap-2">
            {sourceRows.map((row) => (
              <div key={row.source} className="grid gap-2 border-2 border-slate-200 bg-white p-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
                <p className="font-black">{row.source}</p>
                <p className="text-sm font-bold text-slate-600">{row.count} leads</p>
                <p className="text-sm font-bold text-slate-600">CAD ${row.value.toLocaleString()}</p>
                <p className="border-2 border-slate-950 bg-lime-300 px-2 py-1 text-center text-xs font-black">{row.heat} heat</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-2 border-slate-950 bg-lime-300 p-5 shadow-[6px_6px_0_#0f172a]">
        <SectionHeading eyebrow="Executive brief" title="What to fix first" />
        <div className="mt-5 grid gap-3">
          {[
            'Keep missed-call and high-urgency rules active.',
            'Route emergency services to Dispatch before Sales.',
            'Use the quote nudge sequence for quiet qualified leads.',
            'Convert the highest-value template into the first live workflow.',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 border-2 border-slate-950 bg-white p-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
              <p className="font-black">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function SettingsScreen({ workspace, onSave, onReset }: { workspace: AppState['workspace']; onSave: (workspace: AppState['workspace']) => void; onReset: () => void }) {
  const [draft, setDraft] = useState({
    ...workspace,
    serviceAreasText: workspace.serviceAreas.join(', '),
    ownersText: workspace.owners.join(', '),
  })
  const [saved, setSaved] = useState(false)

  const save = () => {
    onSave({
      company: draft.company,
      plan: draft.plan,
      responseTargetMinutes: Number(draft.responseTargetMinutes) || 5,
      serviceAreas: splitCsv(draft.serviceAreasText),
      owners: splitCsv(draft.ownersText),
      defaultBookingType: draft.defaultBookingType,
    })
    setSaved(true)
  }

  return (
    <section className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
      <SectionHeading eyebrow="Settings" title="Workspace setup" />
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <TextInput label="Company" value={draft.company} onChange={(value) => setDraft((current) => ({ ...current, company: value }))} />
        <label className="grid gap-1 text-sm font-black">
          Plan
          <select className="border-2 border-slate-950 bg-white px-3 py-2" value={draft.plan} onChange={(event) => setDraft((current) => ({ ...current, plan: event.target.value as Plan }))}>
            <option>Starter</option>
            <option>Growth</option>
            <option>Premium</option>
          </select>
        </label>
        <TextInput label="Response target minutes" value={`${draft.responseTargetMinutes}`} onChange={(value) => setDraft((current) => ({ ...current, responseTargetMinutes: Number(value.replace(/[^0-9]/g, '')) }))} />
        <TextInput label="Default booking type" value={draft.defaultBookingType} onChange={(value) => setDraft((current) => ({ ...current, defaultBookingType: value }))} />
        <TextArea label="Service areas" value={draft.serviceAreasText} onChange={(value) => setDraft((current) => ({ ...current, serviceAreasText: value }))} />
        <TextArea label="Owners" value={draft.ownersText} onChange={(value) => setDraft((current) => ({ ...current, ownersText: value }))} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={save} className="inline-flex items-center gap-2 border-2 border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-[4px_4px_0_#bef264]">
          <Save className="h-4 w-4" />
          Save workspace
        </button>
        <button onClick={onReset} className="border-2 border-slate-950 bg-white px-4 py-3 text-sm font-black hover:bg-orange-200">
          Reset demo data
        </button>
        {saved ? <p className="border-2 border-slate-950 bg-lime-300 px-4 py-3 text-sm font-black">Workspace saved locally.</p> : null}
      </div>
    </section>
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

function LeadQueue({ leads, selectedLeadId, onSelect, title, subtitle }: { leads: Lead[]; selectedLeadId: string; onSelect: (id: string) => void; title: string; subtitle: string }) {
  return (
    <section className="border-2 border-slate-950 bg-white p-4 shadow-[6px_6px_0_#e2e8f0]">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{subtitle}</p>
        <h2 className="text-3xl font-black">{title}</h2>
      </div>
      <div className="mt-4 grid gap-3">
        {leads.map((lead) => (
          <LeadRow key={lead.id} lead={lead} active={lead.id === selectedLeadId} onClick={() => onSelect(lead.id)} />
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
          Mark reply sent <Send className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        <DetailList title="Handoff brief" items={lead.conversation} icon={CheckCircle2} />
        <DetailList title="Notes" items={lead.notes} icon={FileText} />
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

function DetailList({ title, items, icon: Icon }: { title: string; items: string[]; icon: LucideIcon }) {
  return (
    <div className="border-2 border-slate-950 bg-white p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
            <p className="text-sm font-bold text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
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

function SectionHeading({ eyebrow, title, inverted = false }: { eyebrow: string; title: string; inverted?: boolean }) {
  return (
    <div>
      <p className={`text-xs font-black uppercase tracking-[0.16em] ${inverted ? 'text-lime-300' : 'text-sky-600'}`}>{eyebrow}</p>
      <h2 className={`mt-1 text-3xl font-black leading-none ${inverted ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
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

function SearchControl({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center gap-2 border-2 border-slate-950 bg-white px-3 py-2 text-sm font-black">
      <Search className="h-4 w-4" />
      <span className="sr-only">Search leads</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search" className="w-32 bg-white font-black outline-none" />
    </label>
  )
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1 text-sm font-black">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="border-2 border-slate-950 bg-white px-3 py-2 font-bold outline-none focus:bg-sky-100" />
    </label>
  )
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1 text-sm font-black">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="border-2 border-slate-950 bg-white px-3 py-2 font-bold outline-none focus:bg-sky-100" />
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

function EmptyPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#e2e8f0]">
      <p className="text-xl font-black">{title}</p>
      <p className="mt-2 font-bold text-slate-600">{body}</p>
    </div>
  )
}

function StageBadge({ stage }: { stage: Stage }) {
  return <span className={`inline-flex border-2 border-slate-950 px-2 py-1 text-xs font-black ${stageColor[stage]}`}>{stage}</span>
}

function PlanBadge({ plan }: { plan: Plan }) {
  return <span className={`border-2 border-slate-950 px-2 py-1 text-xs font-black ${planColor[plan]}`}>{plan}</span>
}

function IntegrationIcon({ category }: { category: Integration['category'] }) {
  const iconMap: Record<Integration['category'], LucideIcon> = {
    AI: Sparkles,
    Messaging: Mail,
    CRM: Users,
    Calendar: CalendarCheck2,
    Data: Database,
    Security: KeyRound,
  }
  const Icon = iconMap[category]

  return <Icon className="h-5 w-5 text-sky-500" />
}

function ReportCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-slate-950 bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  )
}

function getMetrics(appState: AppState) {
  const totalValue = appState.leads.reduce((sum, lead) => sum + lead.value, 0)
  const rescuedValue = appState.leads.filter((lead) => lead.stage === 'Booked' || lead.stage === 'Won').reduce((sum, lead) => sum + lead.value, 0)
  const hotLeads = appState.leads.filter((lead) => lead.urgency === 'High').length
  const bookedCount = appState.leads.filter((lead) => lead.stage === 'Booked' || lead.stage === 'Won').length
  const avgTemperature = appState.leads.length ? Math.round(appState.leads.reduce((sum, lead) => sum + lead.temperature, 0) / appState.leads.length) : 0
  const shortValue = totalValue >= 1000 ? `CAD $${(totalValue / 1000).toFixed(1)}k` : `CAD $${totalValue.toLocaleString()}`

  return {
    openLeads: appState.leads.length,
    totalValue,
    rescuedValue,
    shortValue,
    hotLeads,
    bookedCount,
    avgTemperature,
  }
}

function getActiveKey(pathname: string): AppRouteKey {
  if (pathname.startsWith('/app/leads')) return 'leads'
  if (pathname.startsWith('/app/pipeline')) return 'pipeline'
  if (pathname.startsWith('/app/automations')) return 'automations'
  if (pathname.startsWith('/app/templates')) return 'templates'
  if (pathname.startsWith('/app/integrations')) return 'integrations'
  if (pathname.startsWith('/app/reports')) return 'reports'
  if (pathname.startsWith('/app/settings')) return 'settings'
  return 'command'
}

function createSuggestedReply(draft: DraftLead) {
  if (draft.urgency === 'High') {
    return `Thanks for reaching out. Can you share the address in ${draft.area} and confirm whether this needs immediate help?`
  }

  return `Thanks for reaching out about ${draft.service}. What timeline are you hoping for, and what is the best callback window?`
}

function splitCsv(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}
