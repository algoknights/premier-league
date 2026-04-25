export function Footer() {
  return (
    <footer className="border-t border-black/5 py-10 dark:border-hub-border">
      <div className="hub-container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="text-sm font-semibold">Premier League Hub</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-hub-muted">
            Beginner-friendly React project inspired by the Premier League site.
          </div>
        </div>
        <div className="text-xs text-slate-500 dark:text-hub-muted">
          Built with React, Tailwind, Router, JSON Server, Framer Motion, and Recharts.
        </div>
      </div>
    </footer>
  )
}

