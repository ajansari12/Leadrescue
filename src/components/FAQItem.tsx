import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type Props = {
  q: string
  a: string
}

export function FAQItem({ q, a }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpen((v) => !v)}>
        <span className="font-semibold text-slate-900">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? <p className="mt-2 text-sm text-slate-600">{a}</p> : null}
    </div>
  )
}
