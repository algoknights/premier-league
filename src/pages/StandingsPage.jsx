import { useMemo } from 'react'
import { Trophy } from 'lucide-react'
import { useData } from '../hooks/useData.js'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx'
import { StandingsTable } from '../components/sections/StandingsTable.jsx'

export default function StandingsPage() {
  const { standings, clubs, loading } = useData()
  const clubsById = useMemo(() => Object.fromEntries(clubs.map((c) => [c.id, c])), [clubs])

  const rows = useMemo(() => {
    return [...standings].sort((a, b) => b.points - a.points)
  }, [standings])

  return (
    <div className="space-y-6">
      <SectionHeader title="Standings" subtitle="Modern table UI with animated progress bars." right={<Trophy className="h-5 w-5 text-hub-neon" />} />

      {loading ? (
        <LoadingSkeleton className="h-[520px]" />
      ) : (
        <StandingsTable rows={rows} clubsById={clubsById} />
      )}
    </div>
  )
}

