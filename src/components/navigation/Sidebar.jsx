import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { navItems } from './navItems.js'

function LinkItem({ to, label, Icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'group flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold transition',
          isActive
            ? 'bg-gradient-to-r from-hub-brand/30 to-hub-brand2/10 text-white'
            : 'text-slate-700 hover:bg-black/5 dark:text-hub-muted dark:hover:bg-white/10',
        ].join(' ')
      }
    >
      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-black/5 dark:bg-white/5">
        <Icon className="h-4 w-4 opacity-90" />
      </span>
      <span>{label}</span>
    </NavLink>
  )
}

export function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={[
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={[
          'fixed left-0 top-0 z-50 h-full w-[320px] max-w-[85vw] transform border-r border-black/5 bg-white/90 backdrop-blur-xl transition dark:border-hub-border dark:bg-hub-bg/85 lg:static lg:z-auto lg:block lg:h-auto lg:w-72 lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:backdrop-blur-0',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="flex h-16 items-center justify-between px-4 lg:hidden">
          <div className="text-sm font-semibold">Menu</div>
          <button type="button" className="hub-btn-ghost" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 pb-4 lg:pt-6">
          <div className="glass rounded-3xl p-3">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
              Explore
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <LinkItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  Icon={item.icon}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-3xl bg-hub-hero p-4 shadow-soft">
            <div className="text-sm font-semibold text-white">Matchweek ready?</div>
            <p className="mt-1 text-xs text-white/80">
              Filter fixtures, explore clubs, and build a clean dashboard UI with React.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

