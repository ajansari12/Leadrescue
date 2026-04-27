type Props = {
  compact?: boolean
  inverted?: boolean
}

export function LeadRescueLogo({ compact = false, inverted = false }: Props) {
  const textColor = inverted ? 'text-white' : 'text-slate-950'
  const subColor = inverted ? 'text-cyan-200' : 'text-cyan-700'

  return (
    <span className="inline-flex items-center gap-3">
      <svg className="h-10 w-10 shrink-0" viewBox="0 0 48 48" role="img" aria-label="LeadRescue logo">
        <defs>
          <linearGradient id="leadrescue-mark" x1="8" x2="40" y1="8" y2="40">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="56%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <path d="M24 4 40 10v13c0 10.2-6.4 17.1-16 21-9.6-3.9-16-10.8-16-21V10L24 4Z" fill="url(#leadrescue-mark)" />
        <path d="M15 30V16h9.5c4.9 0 8 2.8 8 7 0 3.5-2.2 6-5.9 6.8L34 38h-7.4l-6.7-8H15Zm6-5h3.3c1.5 0 2.4-.8 2.4-2.1 0-1.4-.9-2.1-2.4-2.1H21V25Z" fill="#f8fafc" />
        <path d="M33.5 12.5 39 10v8.5h-5.5v-6Z" fill="#22d3ee" />
      </svg>
      {!compact ? (
        <span className="leading-none">
          <span className={`block text-base font-black tracking-tight ${textColor}`}>LeadRescue</span>
          <span className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] ${subColor}`}>AI response grid</span>
        </span>
      ) : null}
    </span>
  )
}
