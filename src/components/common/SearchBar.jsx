import { Search } from 'lucide-react'

export function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  return (
    <label className="glass flex items-center gap-2 rounded-2xl px-3 py-2 dark:text-hub-text">
      <Search className="h-4 w-4 opacity-70" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:opacity-60"
      />
    </label>
  )
}

