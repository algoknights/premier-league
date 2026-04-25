import { useMemo, useState } from 'react'
import { Users } from 'lucide-react'
import { useData } from '../hooks/useData.js'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { SearchBar } from '../components/common/SearchBar.jsx'
import { ClubCard } from '../components/cards/ClubCard.jsx'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx'

export default function ClubsPage() {
  const { clubs, loading } = useData()
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return clubs
    return clubs.filter((c) => c.name.toLowerCase().includes(s) || c.shortName.toLowerCase().includes(s))
  }, [clubs, q])

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Clubs"
        subtitle="Search clubs, hover glow cards, and open club details."
        right={<Users className="h-5 w-5 text-hub-neon" />}
      />

      <div className="max-w-xl">
        <SearchBar value={q} onChange={setQ} placeholder="Search clubs (e.g., Arsenal, City, Liverpool)..." />
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <LoadingSkeleton className="h-40" />
          <LoadingSkeleton className="h-40" />
          <LoadingSkeleton className="h-40" />
          <LoadingSkeleton className="h-40" />
          <LoadingSkeleton className="h-40" />
          <LoadingSkeleton className="h-40" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <ClubCard key={c.id} club={c} />
          ))}
        </div>
      )}
    </div>
  )
}

