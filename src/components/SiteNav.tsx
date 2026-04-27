import { Activity, Blocks, BriefcaseBusiness, FileText, Gauge, Home, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LeadRescueLogo } from './LeadRescueLogo'
import { Button } from './ui/Button'

type NavLink = {
  href: string
  label: string
  icon: LucideIcon
}

const links: NavLink[] = [
  { href: '/leadrescue-ai', label: 'Home', icon: Home },
  { href: '/leadrescue-ai/how-it-works', label: 'Flow', icon: Activity },
  { href: '/leadrescue-ai/industries', label: 'Markets', icon: BriefcaseBusiness },
  { href: '/leadrescue-ai/examples', label: 'Examples', icon: FileText },
  { href: '/leadrescue-ai#audit-studio', label: 'Audit', icon: Gauge },
  { href: '/leadrescue-ai#platform', label: 'Platform', icon: Blocks },
]

type Props = {
  inverted?: boolean
}

export function SiteNav({ inverted = false }: Props) {
  const shell = inverted
    ? 'border-white/10 bg-[#05070b]/90 text-white'
    : 'border-slate-200 bg-white/95 text-slate-950'
  const navItem = inverted
    ? 'border-white/10 bg-white/[0.045] text-slate-300 hover:border-cyan-300/40 hover:text-cyan-200'
    : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-slate-950'

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur ${shell}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 xl:grid-cols-[auto_1fr_auto]">
        <Link to="/leadrescue-ai" className="min-w-0">
          <LeadRescueLogo inverted={inverted} />
        </Link>

        <nav className="order-3 col-span-2 flex gap-2 overflow-x-auto pb-1 xl:order-none xl:col-span-1 xl:justify-center xl:overflow-visible xl:pb-0">
          {links.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-black uppercase tracking-[0.14em] transition ${navItem}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link to="/leadrescue-ai#audit" className="justify-self-end">
          <Button className="bg-cyan-300 px-4 py-2 text-slate-950 hover:bg-cyan-200">Free Audit</Button>
        </Link>
      </div>
    </header>
  )
}
