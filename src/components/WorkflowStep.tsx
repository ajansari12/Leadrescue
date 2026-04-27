type Props = { step: number; title: string; body: string }

export function WorkflowStep({ step, title, body }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Step {step}</p>
      <p className="mt-1 font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </div>
  )
}
