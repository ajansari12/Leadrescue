type Props = { label: string }

export function IndustryCard({ label }: Props) {
  return <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium shadow-sm">{label}</div>
}
