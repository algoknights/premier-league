import { NavLink } from 'react-router-dom'
import { ArrowLeft, Ghost } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="glass rounded-[32px] p-10 text-center shadow-soft">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-[28px] bg-hub-card text-white shadow-soft">
        <Ghost className="h-7 w-7" />
      </div>
      <div className="mt-4 text-2xl font-extrabold tracking-tight">Page not found</div>
      <p className="mt-2 text-sm text-slate-600 dark:text-hub-muted">
        This route doesn’t exist. Use the sidebar to navigate.
      </p>
      <div className="mt-6 flex justify-center">
        <NavLink to="/" className="hub-btn-primary">
          <ArrowLeft className="h-4 w-4" /> Go home
        </NavLink>
      </div>
    </div>
  )
}

