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
      <div className="border-2 border-slate-950 bg-lime-300 p-6 shadow-[7px_7px_0_#0f172a]">
        <p className="text-2xl font-black">Audit request received.</p>
        <p className="mt-2 font-semibold">We will map your lead route and follow up with the next step.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 border-2 border-slate-950 bg-white p-6 shadow-[7px_7px_0_#0f172a] md:grid-cols-2">
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
        <label className="text-sm font-black uppercase tracking-[0.12em] text-slate-600" key={key}>
          {label}
          <input
            required
            className="mt-2 w-full border-2 border-slate-950 bg-white px-3 py-3 text-base font-bold normal-case tracking-normal text-slate-950 outline-none focus:bg-sky-50"
            value={form[key as keyof AuditSubmission]}
            onChange={(e) => setForm((s) => ({ ...s, [key]: e.target.value }))}
          />
        </label>
      ))}
      <label className="text-sm font-black uppercase tracking-[0.12em] text-slate-600 md:col-span-2">
        Biggest challenge
        <textarea
          required
          className="mt-2 min-h-28 w-full border-2 border-slate-950 bg-white px-3 py-3 text-base font-bold normal-case tracking-normal text-slate-950 outline-none focus:bg-sky-50"
          value={form.mainChallenge}
          onChange={(e) => setForm((s) => ({ ...s, mainChallenge: e.target.value }))}
        />
      </label>
      <div className="md:col-span-2">
        <Button type="submit" className="border-2 border-slate-950 bg-slate-950 text-white shadow-[5px_5px_0_#38bdf8]">
          Book My Free Audit
        </Button>
      </div>
    </form>
  )
}
