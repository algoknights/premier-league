import { motion } from 'framer-motion'
import { Clock, Dot } from 'lucide-react'
import { formatDateShort } from '../../utils/format.js'

function TeamPill({ name, logoUrl, align = 'left' }) {
  return (
    <div className={`flex items-center gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
      {align === 'right' ? <span className="text-sm font-semibold">{name}</span> : null}
      <img src={logoUrl} alt="" className="h-8 w-8 rounded-xl object-contain bg-white/80 p-1" />
      {align === 'left' ? <span className="text-sm font-semibold">{name}</span> : null}
    </div>
  )
}

export function MatchCard({ match, home, away, onClick }) {
  const isLive = match.status === 'LIVE'
  const isFT = match.status === 'FT'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className="glass w-full rounded-3xl p-4 text-left shadow-soft transition hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
          Matchweek {match.matchweek}
        </div>
        <div
          className={[
            'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold',
            isLive
              ? 'bg-rose-500/15 text-rose-500 dark:text-rose-300'
              : isFT
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300'
                : 'bg-slate-500/10 text-slate-600 dark:text-hub-muted',
          ].join(' ')}
        >
          {isLive ? <Dot className="h-4 w-4 animate-pulse" /> : <Clock className="h-3.5 w-3.5" />}
          {match.status}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <TeamPill name={home?.name} logoUrl={home?.logoUrl} align="left" />

        <div className="grid place-items-center">
          <div className="rounded-2xl bg-black/5 px-3 py-2 text-center dark:bg-white/5">
            <div className="text-lg font-extrabold tracking-tight">
              {isLive || isFT ? (
                <>
                  {match.homeScore} - {match.awayScore}
                </>
              ) : (
                'VS'
              )}
            </div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-hub-muted">
              {formatDateShort(match.kickoff)}
            </div>
          </div>
        </div>

        <TeamPill name={away?.name} logoUrl={away?.logoUrl} align="right" />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-hub-muted">
        <div className="rounded-full bg-black/5 px-3 py-1 dark:bg-white/5">
          Stadium: <span className="font-medium">{match.stadium}</span>
        </div>
        <div className="rounded-full bg-black/5 px-3 py-1 dark:bg-white/5">
          Ref: <span className="font-medium">{match.referee}</span>
        </div>
      </div>
    </motion.button>
  )
}

