import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

export function NewsCard({ item }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="glass overflow-hidden rounded-3xl shadow-soft hover:shadow-glow">
      <div className="relative h-44 bg-hub-card">
        <img src={item.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-white">
            {item.category}
          </div>
          <div className="mt-2 text-sm font-semibold text-white">{item.title}</div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-slate-600 dark:text-hub-muted">{item.summary}</p>
        <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500 dark:text-hub-muted">
          <Calendar className="h-4 w-4" />
          {item.date}
        </div>
      </div>
    </motion.article>
  )
}

