import { motion } from 'framer-motion'

export function StandingsTable({ rows, clubsById }) {
  return (
    <div className="glass overflow-hidden rounded-3xl shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className="bg-black/5 text-xs uppercase tracking-wider text-slate-500 dark:bg-white/5 dark:text-hub-muted">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Club</th>
              <th className="px-4 py-3">P</th>
              <th className="px-4 py-3">W</th>
              <th className="px-4 py-3">D</th>
              <th className="px-4 py-3">L</th>
              <th className="px-4 py-3">GD</th>
              <th className="px-4 py-3">Pts</th>
              <th className="px-4 py-3">Form</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const club = clubsById[r.clubId]
              const pct = Math.min(100, Math.round((r.points / 90) * 100))
              return (
                <tr key={r.clubId} className="border-t border-black/5 dark:border-hub-border">
                  <td className="px-4 py-3 font-semibold">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white/80 p-1.5">
                        <img src={club?.logoUrl} alt="" className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{club?.name || r.clubName}</div>
                        <div className="text-xs text-slate-500 dark:text-hub-muted">{club?.shortName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{r.played}</td>
                  <td className="px-4 py-3">{r.wins}</td>
                  <td className="px-4 py-3">{r.draws}</td>
                  <td className="px-4 py-3">{r.losses}</td>
                  <td className="px-4 py-3">{r.goalDiff}</td>
                  <td className="px-4 py-3 font-extrabold">{r.points}</td>
                  <td className="px-4 py-3">
                    <div className="w-40">
                      <div className="h-2 rounded-full bg-black/5 dark:bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-2 rounded-full bg-gradient-to-r from-hub-brand to-hub-neon"
                        />
                      </div>
                      <div className="mt-2 text-xs text-slate-500 dark:text-hub-muted">{pct}% title push</div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

