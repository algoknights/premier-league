import { Dot } from 'lucide-react'

export function LiveScoreWidget({ liveMatches = 0 }) {
  return (
    <div className="glass flex items-center justify-between gap-3 rounded-3xl p-4 shadow-soft">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
          Live now
        </div>
        <div className="mt-1 text-2xl font-extrabold">{liveMatches}</div>
        <div className="mt-1 text-xs text-slate-500 dark:text-hub-muted">Matches with live score UI</div>
      </div>
      <div className="grid h-14 w-14 place-items-center rounded-3xl bg-rose-500/15 text-rose-500 dark:text-rose-300">
        <Dot className="h-8 w-8 animate-pulse" />
      </div>
    </div>
  )
}

