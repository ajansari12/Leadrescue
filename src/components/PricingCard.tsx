import { CheckCircle2 } from 'lucide-react'

type Props = {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export function PricingCard({ name, price, description, features, highlighted = false }: Props) {
  return (
    <div className={`border-2 border-slate-950 p-6 ${highlighted ? 'bg-lime-300 shadow-[8px_8px_0_#0f172a]' : 'bg-white shadow-[6px_6px_0_#e2e8f0]'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-600">{name}</p>
          <p className="mt-3 text-4xl font-black leading-none">{price}</p>
        </div>
        {highlighted ? <span className="rotate-2 border-2 border-slate-950 bg-white px-3 py-1 text-xs font-black uppercase">Best route</span> : null}
      </div>
      <p className="mt-4 text-base font-bold text-slate-700">{description}</p>
      <ul className="mt-5 grid gap-3 text-sm font-bold text-slate-800">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" /> {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
