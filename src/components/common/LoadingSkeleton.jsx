export function LoadingSkeleton({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-black/5 dark:bg-white/5 ${className}`}>
      <div className="h-full w-full rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/10" />
    </div>
  )
}

