type Props = {
  compact?: boolean
}

export function LeadRescueLogo({ compact = false }: Props) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg className="h-12 w-12 shrink-0" viewBox="0 0 56 56" role="img" aria-label="LeadRescue logo">
        <path d="M8 8h30l10 10v30H8V8Z" fill="#f8fafc" stroke="#020617" strokeWidth="3" />
        <path d="M38 8v10h10" fill="none" stroke="#020617" strokeWidth="3" />
        <path d="M14 36h24" stroke="#020617" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 6" />
        <circle cx="16" cy="22" r="6" fill="#7dd3fc" stroke="#020617" strokeWidth="3" />
        <circle cx="40" cy="36" r="6" fill="#bef264" stroke="#020617" strokeWidth="3" />
        <path d="M20 22c8 0 13 4 16 10" fill="none" stroke="#020617" strokeWidth="3" strokeLinecap="round" />
        <path d="m36 20 5 5 8-10" fill="none" stroke="#020617" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!compact ? (
        <span className="leading-none">
          <span className="block text-lg font-black tracking-tight text-slate-950">LeadRescue</span>
          <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.24em] text-slate-600">Response routes</span>
        </span>
      ) : null}
    </span>
  )
}
