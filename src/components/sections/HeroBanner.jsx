import { motion } from 'framer-motion'
import { CalendarDays, Flame, Trophy } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-hub-hero p-6 shadow-soft sm:p-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-hub-brand/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-hub-neon/20 blur-3xl" />

      <div className="relative">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
            <Flame className="h-4 w-4" />
            Premier League Hub • 2025/26 UI Clone
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Modern football UI.
            <span className="block text-white/80">Built to impress your viva.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            Explore fixtures, standings, clubs, players, news, and a stats dashboard. Built with React fundamentals,
            reusable components, and realistic mock APIs using JSON Server.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <NavLink to="/fixtures" className="hub-btn-primary">
              <CalendarDays className="h-4 w-4" />
              View fixtures
            </NavLink>
            <NavLink to="/standings" className="hub-btn-ghost text-white">
              <Trophy className="h-4 w-4" />
              League table
            </NavLink>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

