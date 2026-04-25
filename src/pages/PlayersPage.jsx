import { useMemo, useState } from 'react'
import { UserRound } from 'lucide-react'
import { useData } from '../hooks/useData.js'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { SearchBar } from '../components/common/SearchBar.jsx'
import { FilterDropdown } from '../components/common/FilterDropdown.jsx'
import { PlayerCard } from '../components/cards/PlayerCard.jsx'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx'

export default function PlayersPage() {
  const { players, clubs, loading } = useData()
  const [q, setQ] = useState('')
  const [pos, setPos] = useState('all')
  const [sort, setSort] = useState('goals')

  const clubsById = useMemo(() => Object.fromEntries(clubs.map((c) => [c.id, c])), [clubs])

  const positions = useMemo(() => {
    const p = Array.from(new Set(players.map((x) => x.position))).sort()
    return [{ value: 'all', label: 'All positions' }, ...p.map((x) => ({ value: x, label: x }))]
  }, [players])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    let out = players
    if (s) out = out.filter((p) => p.name.toLowerCase().includes(s))
    if (pos !== 'all') out = out.filter((p) => p.position === pos)
    out = [...out].sort((a, b) => (sort === 'assists' ? b.assists - a.assists : b.goals - a.goals))
    return out
  }, [players, q, pos, sort])

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Players"
        subtitle="Search and filters + reusable player cards."
        right={<UserRound className="h-5 w-5 text-hub-neon" />}
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="w-full max-w-xl">
          <SearchBar value={q} onChange={setQ} placeholder="Search players (e.g., Haaland, Salah)..." />
        </div>
        <FilterDropdown label="Position" value={pos} onChange={setPos} options={positions} />
        <FilterDropdown
          label="Sort"
          value={sort}
          onChange={setSort}
          options={[
            { value: 'goals', label: 'Goals' },
            { value: 'assists', label: 'Assists' },
          ]}
        />
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <LoadingSkeleton className="h-80" />
          <LoadingSkeleton className="h-80" />
          <LoadingSkeleton className="h-80" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PlayerCard key={p.id} player={p} club={clubsById[p.clubId]} />
          ))}
        </div>
      )}
    </div>
  )
}

