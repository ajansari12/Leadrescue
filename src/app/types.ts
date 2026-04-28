import { type LucideIcon } from 'lucide-react'

export type Stage = 'Captured' | 'Qualified' | 'Booked' | 'Follow-up' | 'Won'
export type Urgency = 'Low' | 'Medium' | 'High'
export type Plan = 'Starter' | 'Growth' | 'Premium'

export type Lead = {
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
  notes: string[]
}

export type AutomationRule = {
  id: string
  name: string
  trigger: string
  action: string
  status: 'Active' | 'Paused'
  plan: Plan
}

export type Sequence = {
  id: string
  name: string
  audience: string
  touches: string[]
  status: 'Live' | 'Draft'
}

export type Template = {
  id: string
  industry: string
  goal: string
  questions: string[]
  reply: string
  plan: Plan
}

export type Integration = {
  id: string
  name: string
  category: 'AI' | 'Messaging' | 'CRM' | 'Calendar' | 'Data' | 'Security'
  status: 'Ready' | 'Needs credentials' | 'Planned'
  purpose: string
  nextStep: string
  plan: Plan
}

export type WorkspaceSettings = {
  company: string
  plan: Plan
  responseTargetMinutes: number
  serviceAreas: string[]
  owners: string[]
  defaultBookingType: string
}

export type AppState = {
  leads: Lead[]
  automations: AutomationRule[]
  sequences: Sequence[]
  templates: Template[]
  integrations: Integration[]
  workspace: WorkspaceSettings
}

export type AppView = {
  key: string
  label: string
  path: string
  icon: LucideIcon
}

export const stages: Stage[] = ['Captured', 'Qualified', 'Booked', 'Follow-up', 'Won']
export const urgencyOptions: Urgency[] = ['High', 'Medium', 'Low']
