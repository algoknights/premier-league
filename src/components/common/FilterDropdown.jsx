import { ChevronDown } from 'lucide-react'

export function FilterDropdown({ label, value, onChange, options }) {
  return (
    <label className="glass flex items-center gap-2 rounded-2xl px-3 py-2 text-sm">
      <span className="text-xs opacity-70">{label}</span>
      <select
        className="min-w-40 bg-transparent outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-black">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="h-4 w-4 opacity-60" />
    </label>
  )
}

