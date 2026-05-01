import { motion } from 'framer-motion'
import { Goal, Shirt, Sparkles } from 'lucide-react'

export function PlayerCard({ player, club }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass overflow-hidden rounded-3xl shadow-soft hover:shadow-glow">
      <div className="relative h-40 bg-hub-card">
        <img
          src={player.photoUrl}
          alt={player.name}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-sm font-semibold text-white">{player.name}</div>
          <div className="text-xs text-white/80">{club?.name || player.clubName}</div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 rounded-2xl bg-black/5 px-3 py-2 text-xs dark:bg-white/5">
            <Shirt className="h-4 w-4 opacity-70" />
            Position: <span className="font-semibold">{player.position}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-black/5 px-3 py-2 text-xs dark:bg-white/5">
            <Goal className="h-4 w-4 opacity-70" />
            Goals: <span className="font-semibold">{player.goals}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-black/5 px-3 py-2 text-xs dark:bg-white/5">
            <Sparkles className="h-4 w-4 opacity-70" />
            Assists: <span className="font-semibold">{player.assists}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

