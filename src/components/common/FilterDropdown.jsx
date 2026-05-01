import { ChevronDown } from 'lucide-react'

export function FilterDropdown({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 px-1 text-hub-neon">
        <span className="h-1 w-1 rounded-full bg-current" />
        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{label}</span>
      </div>
      <div className="relative group">
        <select
          className="appearance-none glass min-w-[160px] rounded-xl px-4 py-2.5 text-xs font-bold outline-none transition-all focus:ring-2 focus:ring-hub-neon/20 cursor-pointer w-full pr-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-hub-card text-white">
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-hub-muted/50 group-hover:text-hub-neon transition-colors">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

