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
    <div className={`rounded-2xl border p-6 shadow-glass ${highlighted ? 'border-sky-300 bg-sky-50/70' : 'border-slate-200 bg-white'}`}>
      <p className="text-sm font-semibold text-slate-600">{name}</p>
      <p className="mt-2 text-2xl font-bold">{price}</p>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {feature}
          </li>
        ))}
      </ul>
      {highlighted ? <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-sky-700">Recommended</p> : null}
    </div>
  )
}
