import {
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Hammer,
  HeartPulse,
  Home,
  Inbox,
  MessageSquareMore,
  Scale,
  Target,
  Wrench,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

export type IndustryExample = {
  slug: string
  industry: string
  icon: LucideIcon
  leadSource: string
  leakage: string
  workflow: string[]
  exampleMessage: string
  result: string
  packageFit: string
  metric: string
}

export const marketingNav = [
  { href: '/leadrescue-ai/how-it-works', label: 'How it works' },
  { href: '/leadrescue-ai/industries', label: 'Industries' },
  { href: '/leadrescue-ai/examples', label: 'Examples' },
  { href: '/leadrescue-ai#packages', label: 'Pricing' },
]

export const workflowModules = [
  {
    title: 'Capture',
    icon: Inbox,
    body: 'Unify website forms, missed calls, social DMs, and quote requests into one lead intake lane.',
  },
  {
    title: 'Qualify',
    icon: Target,
    body: 'Ask the right intake questions automatically so the team knows urgency, fit, and next action.',
  },
  {
    title: 'Book',
    icon: CalendarCheck2,
    body: 'Move qualified leads to an estimate, consultation, callback, or appointment with fewer manual steps.',
  },
  {
    title: 'Follow up',
    icon: BellRing,
    body: 'Run a polite sequence for quiet prospects, quote reminders, and post-service review requests.',
  },
]

export const industryExamples: IndustryExample[] = [
  {
    slug: 'roofing',
    industry: 'Roofing',
    icon: Home,
    leadSource: 'Storm-damage form, missed calls, Facebook messages',
    leakage: 'Urgent buyers keep calling competitors when no one answers quickly.',
    workflow: ['Instant damage intake', 'Photo request', 'Service-area check', 'Estimate booking'],
    exampleMessage: 'Thanks for reaching out. Can you share the property address and whether there is active leaking right now?',
    result: 'More estimate calls booked before the homeowner moves on.',
    packageFit: 'Growth',
    metric: 'Estimate speed',
  },
  {
    slug: 'renovation',
    industry: 'Renovation',
    icon: Hammer,
    leadSource: 'Project inquiry forms, Instagram DMs, referral emails',
    leakage: 'Large projects go cold because budget, scope, and timing are not clarified early.',
    workflow: ['Project scope capture', 'Budget range prompt', 'Timeline fit', 'Discovery call booking'],
    exampleMessage: 'To point you in the right direction, what space are you renovating and what timeline are you hoping for?',
    result: 'Better-qualified consultations and fewer low-fit calls.',
    packageFit: 'Premium',
    metric: 'Consult quality',
  },
  {
    slug: 'clinics',
    industry: 'Clinics',
    icon: HeartPulse,
    leadSource: 'Appointment requests, phone inquiries, website chat',
    leakage: 'Patients abandon the request when appointment next steps are unclear.',
    workflow: ['Service selection', 'Location preference', 'Availability capture', 'Callback or booking'],
    exampleMessage: 'We can help. Which service are you looking for, and do mornings or afternoons work better?',
    result: 'Faster patient callbacks with clearer triage.',
    packageFit: 'Growth',
    metric: 'Callback completion',
  },
  {
    slug: 'legal-immigration',
    industry: 'Legal and immigration',
    icon: Scale,
    leadSource: 'Consultation forms, referral inquiries, WhatsApp messages',
    leakage: 'Prospects need reassurance and intake structure before booking a paid consult.',
    workflow: ['Matter type', 'Urgency', 'Document checklist', 'Consultation handoff'],
    exampleMessage: 'Thanks for contacting us. What type of matter is this, and is there any deadline we should know about?',
    result: 'Cleaner intake and more confident consultation bookings.',
    packageFit: 'Premium',
    metric: 'Consult readiness',
  },
  {
    slug: 'hvac',
    industry: 'HVAC',
    icon: Wrench,
    leadSource: 'Emergency calls, seasonal tune-up forms, quote requests',
    leakage: 'Emergency and quote leads are mixed together, delaying the highest-value response.',
    workflow: ['Urgency routing', 'Equipment question', 'Postal-code check', 'Dispatcher alert'],
    exampleMessage: 'Is this no heat/no cooling right now, or are you looking for a quote or maintenance appointment?',
    result: 'Priority leads get routed before they are lost.',
    packageFit: 'Growth',
    metric: 'Priority routing',
  },
  {
    slug: 'cleaning',
    industry: 'Cleaning',
    icon: CheckCircle2,
    leadSource: 'Quote forms, recurring service requests, marketplace leads',
    leakage: 'Quote shoppers compare providers quickly and choose the first clear reply.',
    workflow: ['Property type', 'Room count', 'Recurring or one-time', 'Quote follow-up'],
    exampleMessage: 'Happy to help. Is this a one-time clean or recurring service, and how many rooms should we include?',
    result: 'More quote replies converted into scheduled cleanings.',
    packageFit: 'Starter',
    metric: 'Quote response',
  },
]

export const appModules = [
  { title: 'Lead Inbox', body: 'One queue for calls, forms, DMs, quote requests, and manual imports.' },
  { title: 'Response Rules', body: 'Instant replies and owner alerts based on source, urgency, and service type.' },
  { title: 'Follow-up Sequences', body: '5-touch reminders for quiet leads, quotes, and post-service reviews.' },
  { title: 'Booking Pipeline', body: 'Track captured, qualified, booked, won, and review-requested stages.' },
  { title: 'Industry Templates', body: 'Prebuilt workflows for roofing, clinics, HVAC, cleaning, renovation, and legal.' },
  { title: 'Audit Reports', body: 'Shareable leak map, recovery estimate, recommended package, and first workflow.' },
]

export const exampleMetrics = [
  { label: 'First response target', value: '< 5 min' },
  { label: 'Follow-up touches', value: '5' },
  { label: 'Typical setup', value: '7 days' },
  { label: 'Primary owner view', value: '1 pipeline' },
]

export const checklist = [
  { icon: ClipboardCheck, text: 'Leak map across forms, calls, DMs, and inboxes' },
  { icon: MessageSquareMore, text: 'Response scripts for each key lead type' },
  { icon: CalendarCheck2, text: 'Booking, callback, estimate, or consultation routing' },
  { icon: BellRing, text: 'Follow-up and review request sequence' },
]
