import { NavLink, useLocation } from 'react-router-dom'
import { Menu, Trophy } from 'lucide-react'
import { ThemeToggle } from '../common/ThemeToggle.jsx'
import { navItems } from './navItems.js'

export function Navbar({ onOpenSidebar }) {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl dark:border-hub-border dark:bg-hub-bg/70">
      <div className="hub-container flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="hub-btn-ghost lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <NavLink to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-hub-card shadow-soft">
              <Trophy className="h-5 w-5 text-hub-neon" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight dark:text-hub-text">
                Premier League Hub
              </div>
              <div className="text-xs text-slate-500 dark:text-hub-muted">UI-first React clone</div>
            </div>
          </NavLink>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.slice(0, 6).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-xl px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white'
                    : 'text-slate-600 hover:bg-black/5 hover:text-black dark:text-hub-muted dark:hover:bg-white/10 dark:hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden rounded-2xl border border-black/5 px-3 py-2 text-xs text-slate-600 dark:border-hub-border dark:text-hub-muted sm:block">
            Route: <span className="font-medium">{location.pathname}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

