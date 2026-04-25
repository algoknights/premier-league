import { useMemo } from 'react'
import { Star } from 'lucide-react'
import toast from 'react-hot-toast'
import { useData } from '../hooks/useData.js'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { MatchCard } from '../components/cards/MatchCard.jsx'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx'

export default function HighlightsPage() {
  const { fixtures, clubs, loading } = useData()
  const clubsById = useMemo(() => Object.fromEntries(clubs.map((c) => [c.id, c])), [clubs])

  const highlightMatches = useMemo(() => {
    return fixtures
      .filter((m) => m.status === 'FT')
      .sort((a, b) => (b.homeScore + b.awayScore) - (a.homeScore + a.awayScore))
      .slice(0, 8)
  }, [fixtures])

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Matchweek highlights"
        subtitle="A clean highlight gallery for demos (static mock data)."
        right={<Star className="h-5 w-5 text-hub-neon" />}
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          <LoadingSkeleton className="h-44" />
          <LoadingSkeleton className="h-44" />
          <LoadingSkeleton className="h-44" />
          <LoadingSkeleton className="h-44" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {highlightMatches.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              home={clubsById[m.homeClubId]}
              away={clubsById[m.awayClubId]}
              onClick={() => toast('Highlights are mock cards (extend later with video embeds)')}
            />
          ))}
        </div>
      )}
    </div>
  )
}

