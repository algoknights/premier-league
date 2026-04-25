import { X } from 'lucide-react'
import { motion } from 'framer-motion'

export function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-0 grid place-items-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="glass w-full max-w-2xl rounded-[28px] p-4 shadow-glow"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-semibold">{title}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-hub-muted">Match details (mock)</div>
            </div>
            <button type="button" className="hub-btn-ghost" onClick={onClose} aria-label="Close modal">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </motion.div>
      </div>
    </div>
  )
}

