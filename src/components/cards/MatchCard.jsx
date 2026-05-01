import { motion } from 'framer-motion'
import { Clock, Dot } from 'lucide-react'
import { formatDateShort } from '../../utils/format.js'

function TeamPill({ name, logoUrl, align = 'left' }) {
  return (
    <div className={`flex items-center gap-2.5 min-w-0 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <div className="flex-shrink-0 grid h-10 w-10 place-items-center rounded-xl bg-white/10 dark:bg-white/5 p-1.5 shadow-sm">
        <img src={logoUrl} alt="" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
      </div>
      <span className="truncate text-sm font-bold tracking-tight leading-tight">{name}</span>
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
      whileHover={{ y: -4, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
      whileTap={{ scale: 0.98 }}
      className="glass group relative w-full overflow-hidden rounded-[2rem] p-5 text-left shadow-soft transition-all duration-300 hover:shadow-glow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-hub-neon shadow-[0_0_8px_rgba(167,243,208,0.5)]" />
          <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-hub-muted/60">
            MW {match.matchweek}
          </div>
        </div>
        <div
          className={[
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider',
            isLive
              ? 'bg-rose-500/15 text-rose-500'
              : isFT
                ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                : 'bg-white/5 text-slate-400 dark:text-hub-muted/70',
          ].join(' ')}
        >
          {isLive ? (
            <span className="flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
            </span>
          ) : null}
          {match.status}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_70px_1fr] items-center gap-2">
        <TeamPill name={home?.name} logoUrl={home?.logoUrl} align="left" />

        <div className="flex flex-col items-center justify-center">
          <div className="w-full rounded-2xl bg-black/10 py-2.5 text-center dark:bg-white/5 border border-white/5">
            <div className="text-xl font-black tracking-tighter">
              {isLive || isFT ? (
                <div className="flex justify-center gap-1">
                  <span>{match.homeScore}</span>
                  <span className="opacity-30">-</span>
                  <span>{match.awayScore}</span>
                </div>
              ) : (
                <span className="text-xs text-hub-muted/50">VS</span>
              )}
            </div>
          </div>
        </div>

        <TeamPill name={away?.name} logoUrl={away?.logoUrl} align="right" />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex items-center gap-3">
          <div className="text-[10px] text-slate-400 dark:text-hub-muted/50">
            <span className="font-medium text-slate-500 dark:text-hub-muted/80">{match.stadium}</span>
          </div>
        </div>
        <div className="text-[10px] font-medium text-slate-500 dark:text-hub-muted/80">
          {formatDateShort(match.kickoff)}
        </div>
      </div>
    </motion.button>
  )
}

