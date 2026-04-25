import { motion } from 'framer-motion'

export function StatsCard({ title, value, subtitle, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="glass rounded-3xl p-4 shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
            {title}
          </div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
          {subtitle ? <div className="mt-1 text-xs text-slate-500 dark:text-hub-muted">{subtitle}</div> : null}
        </div>
        {Icon ? (
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-hub-card text-white shadow-soft">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}

