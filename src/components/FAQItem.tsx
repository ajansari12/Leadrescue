import { useState } from 'react'

type Props = {
  q: string
  a: string
}

export function FAQItem({ q, a }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen((v) => !v)}>
        <span className="font-semibold text-slate-900">{q}</span>
        <span className="text-slate-500">{open ? '−' : '+'}</span>
      </button>
      {open ? <p className="mt-2 text-sm text-slate-600">{a}</p> : null}
    </div>
  )
}
