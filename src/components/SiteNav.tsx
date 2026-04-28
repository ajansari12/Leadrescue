import { Activity, BriefcaseBusiness, CreditCard, FileText, Home, LayoutDashboard, type LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { LeadRescueLogo } from './LeadRescueLogo'

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
  { href: '/leadrescue-ai#packages', label: 'Pricing', icon: CreditCard },
  { href: '/leadrescue-ai/app', label: 'App', icon: LayoutDashboard },
]

export function SiteNav() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b-2 border-slate-950 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 xl:grid-cols-[auto_1fr_auto]">
        <Link to="/leadrescue-ai" className="min-w-0">
          <LeadRescueLogo />
        </Link>

        <nav className="order-3 col-span-2 flex gap-2 overflow-x-auto pb-1 xl:order-none xl:col-span-1 xl:justify-center xl:overflow-visible xl:pb-0">
          {links.map((item) => {
            const Icon = item.icon
            const isHashLink = item.href.includes('#')
            const isActive =
              item.href === '/leadrescue-ai'
                ? location.pathname === '/leadrescue-ai' && !location.hash
                : isHashLink
                  ? location.pathname === '/leadrescue-ai' && location.hash === item.href.slice(item.href.indexOf('#'))
                  : location.pathname === item.href

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${
                  isActive
                    ? 'border-slate-950 bg-lime-300 text-slate-950'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-950 hover:bg-sky-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link
          to="/leadrescue-ai#audit"
          className="justify-self-end rounded-full border-2 border-slate-950 bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#bef264] transition hover:-translate-y-0.5"
        >
          Free Audit
        </Link>
      </div>
    </header>
  )
}
