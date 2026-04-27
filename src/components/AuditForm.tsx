import { FormEvent, useState } from 'react'
import { Button } from './ui/Button'

export type AuditSubmission = {
  name: string
  businessName: string
  website: string
  email: string
  phone: string
  industry: string
  city: string
  monthlyLeadEstimate: string
  mainChallenge: string
}

const defaultForm: AuditSubmission = {
  name: '',
  businessName: '',
  website: '',
  email: '',
  phone: '',
  industry: '',
  city: '',
  monthlyLeadEstimate: '',
  mainChallenge: '',
}

type Props = {
  onSubmit: (data: AuditSubmission) => void
}

export function AuditForm({ onSubmit }: Props) {
  const [form, setForm] = useState<AuditSubmission>(defaultForm)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
    setSubmitted(true)
    setForm(defaultForm)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900 shadow-glass">
        <p className="text-base font-semibold">Thank you — your Lead Leakage Audit request is in.</p>
        <p className="mt-2">We will review your current inquiry flow and follow up with next steps shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-glass md:grid-cols-2">
      {[
        ['name', 'Name'],
        ['businessName', 'Business name'],
        ['website', 'Website'],
        ['email', 'Email'],
        ['phone', 'Phone'],
        ['industry', 'Industry'],
        ['city', 'City / service area'],
        ['monthlyLeadEstimate', 'Monthly lead estimate'],
      ].map(([key, label]) => (
        <label className="text-sm" key={key}>
          {label}
          <input
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={form[key as keyof AuditSubmission]}
            onChange={(e) => setForm((s) => ({ ...s, [key]: e.target.value }))}
          />
        </label>
      ))}
      <label className="text-sm md:col-span-2">
        Biggest challenge
        <textarea
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          value={form.mainChallenge}
          onChange={(e) => setForm((s) => ({ ...s, mainChallenge: e.target.value }))}
        />
      </label>
      <div className="md:col-span-2">
        <Button type="submit">Book My Free Audit</Button>
      </div>
    </form>
  )
}
