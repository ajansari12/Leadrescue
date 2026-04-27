import { motion } from 'framer-motion'
import { ArrowRight, Bot, CalendarCheck2, Clock3, MessageSquareMore, PhoneMissed, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AuditForm, type AuditSubmission } from '../components/AuditForm'
import { FAQItem } from '../components/FAQItem'
import { IndustryCard } from '../components/IndustryCard'
import { MetricCard } from '../components/MetricCard'
import { PricingCard } from '../components/PricingCard'
import { WorkflowStep } from '../components/WorkflowStep'
import { Button } from '../components/ui/Button'

export function LeadRescuePage() {
  const [submissions, setSubmissions] = useState<AuditSubmission[]>([])

  const handleAuditSubmit = (data: AuditSubmission) => {
    setSubmissions((prev) => [...prev, data])
  }

  const leakageEstimate = useMemo(() => {
    const leads = 40
    const avgValue = 1200
    const missedRate = 0.15
    return Math.round(leads * avgValue * missedRate)
  }, [])

  return (
    <main className="pb-20">
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-sky-50 p-8 shadow-glass">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">LeadRescue AI • Powered by Axrategy</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">Stop Losing Leads Because You Replied Too Late</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            LeadRescue AI installs a practical lead response and follow-up system for local service businesses, so every inquiry gets captured,
            answered, organized, and moved toward booking.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#audit"><Button>Get a Free Lead Leakage Audit</Button></a>
            <a href="#how"><Button variant="secondary">See How It Works</Button></a>
          </div>
          <div className="mt-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm md:grid-cols-5">
            {['New Inquiry', 'Instant Response', 'Booked Appointment', 'Follow-Up', 'Review Request'].map((step, idx) => (
              <div key={step} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <span className="font-semibold text-slate-500">{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-4 px-4 md:grid-cols-5">
        {[{ icon: PhoneMissed, t: 'Missed calls' }, { icon: Clock3, t: 'Slow replies' }, { icon: MessageSquareMore, t: 'No follow-up' }, { icon: Bot, t: 'Scattered inquiries' }, { icon: Star, t: 'Lost reviews' }].map(({ icon: Icon, t }) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <Icon className="h-5 w-5 text-sky-600" />
            <p className="mt-2 font-semibold">{t}</p>
            <p className="text-sm text-slate-600">These leaks reduce conversion even when leads are already coming in.</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Cost of Lead Leakage</h2>
        <p className="mt-2 text-slate-600">Example: 40 inquiries/month × CAD $1,200 average job × 15% missed conversion risk.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <MetricCard label="Potential monthly leakage" value={`CAD $${leakageEstimate.toLocaleString()}`} detail="Revenue often lost due to delayed or inconsistent follow-up." />
          <MetricCard label="Response expectation" value="&lt; 5 min" detail="Most buyers contact multiple providers and choose the fastest reply." />
          <MetricCard label="Current audit requests" value={`${submissions.length}`} detail="Form submissions currently kept in local state for backend-ready handoff." />
        </div>
      </section>

      <section id="how" className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="text-2xl font-bold">How LeadRescue AI Works</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <WorkflowStep step={1} title="Capture" body="Collect website, social, and quote inquiries in one place." />
          <WorkflowStep step={2} title="Respond" body="Send an immediate confirmation with clear next steps." />
          <WorkflowStep step={3} title="Qualify" body="Ask service-specific questions to reduce back-and-forth." />
          <WorkflowStep step={4} title="Book" body="Provide scheduling options or estimate-call links." />
          <WorkflowStep step={5} title="Follow Up" body="Run polite multi-touch reminders when prospects go quiet." />
          <WorkflowStep step={6} title="Review" body="Trigger post-service review requests to grow trust." />
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Packages</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <PricingCard name="Starter" price="CAD $1,500" description="Lead capture fix" features={['Improved lead form', 'Instant reply', 'Owner alerts', 'Booking link']} />
          <PricingCard name="Growth" price="CAD $2,500" description="Complete lead response system" highlighted features={['Landing section', 'CRM pipeline', '5-touch follow-up', 'Review workflow', 'Team handoff']} />
          <PricingCard name="Premium" price="CAD $5,000 + monthly" description="Revenue recovery engine" features={['Advanced routing', 'Landing optimization', 'Monthly reporting', '30-day optimization support']} />
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Industries We Support</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {['Roofing', 'Renovation', 'Landscaping', 'Cleaning', 'HVAC', 'Plumbing', 'Clinics', 'Mortgage', 'Immigration', 'Auto Repair'].map((item) => (
            <IndustryCard key={item} label={item} />
          ))}
        </div>
      </section>

      <section id="audit" className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Free Lead Leakage Audit</h2>
        <p className="mt-2 text-slate-600">We review your inquiry flow and identify leaks in capture, response, booking, and follow-up.</p>
        <div className="mt-4">
          <AuditForm onSubmit={handleAuditSubmit} />
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-glass">
          <h2 className="text-2xl font-bold">Simple installation guarantee</h2>
          <p className="mt-2 text-slate-600">Installed within the agreed implementation window or we continue working at no additional cost until it is live.</p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-4 grid gap-3">
          <FAQItem q="Is this a chatbot?" a="No. It is a lead response and follow-up system. AI can assist messaging, but your process remains in control." />
          <FAQItem q="Do I need a new website?" a="Not always. We can improve your current inquiry flow and integrate with existing pages." />
          <FAQItem q="Can I approve responses?" a="Yes. Workflows can be approval-based or fully automated based on your preference." />
          <FAQItem q="Does this guarantee revenue?" a="No revenue guarantees. We guarantee implementation and faster, more consistent response handling." />
          <FAQItem q="How fast can this go live?" a="Most builds go live in about 7 business days after intake completion." />
          <FAQItem q="What happens after setup?" a="You can add monthly optimization support for updates, reporting, and refinement." />
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-glass">
          <h2 className="text-3xl font-bold">Find out where your leads are leaking.</h2>
          <p className="mt-3 text-slate-200">Book a free 15-minute audit and get a practical fix plan.</p>
          <a href="#audit" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900">
            Book My Free Audit <ArrowRight className="h-4 w-4" />
          </a>
          <div className="mt-5 flex items-center gap-2 text-xs text-slate-300">
            <CalendarCheck2 className="h-4 w-4" /> Practical, plain-English implementation for local service teams.
          </div>
        </div>
      </section>
    </main>
  )
}
