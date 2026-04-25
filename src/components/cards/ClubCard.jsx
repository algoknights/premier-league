import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function ClubCard({ club }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass rounded-3xl p-4 shadow-soft hover:shadow-glow">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/80 p-2">
          <img src={club.logoUrl} alt="" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{club.name}</div>
          <div className="truncate text-xs text-slate-500 dark:text-hub-muted">
            {club.stadium} • Founded {club.founded}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="rounded-2xl bg-hub-card px-3 py-2 text-xs text-white">
          Badge: <span className="font-semibold">{club.shortName}</span>
        </div>
        <NavLink to={`/clubs/${club.id}`} className="hub-btn-primary">
          View <ArrowRight className="h-4 w-4" />
        </NavLink>
      </div>
    </motion.div>
  )
}

