import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useData } from '../hooks/useData.js'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { FilterDropdown } from '../components/common/FilterDropdown.jsx'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx'
import { MatchCard } from '../components/cards/MatchCard.jsx'
import { Modal } from '../components/common/Modal.jsx'
import { LiveScoreWidget } from '../components/sections/LiveScoreWidget.jsx'

const STORAGE_KEY = 'plh_fixtures_filters'

export default function FixturesPage() {
  const { fixtures, clubs, loading } = useData()
  const [matchweek, setMatchweek] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'all'
    try {
      const parsed = JSON.parse(raw)
      return parsed.matchweek || 'all'
    } catch {
      return 'all'
    }
  })

  const [clubId, setClubId] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'all'
    try {
      const parsed = JSON.parse(raw)
      return parsed.clubId || 'all'
    } catch {
      return 'all'
    }
  })
  const [selected, setSelected] = useState(null)

  const clubsById = useMemo(() => Object.fromEntries(clubs.map((c) => [c.id, c])), [clubs])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ matchweek, clubId }))
  }, [matchweek, clubId])

  const matchweeks = useMemo(() => {
    const weeks = Array.from(new Set(fixtures.map((m) => m.matchweek))).sort((a, b) => a - b)
    return [{ value: 'all', label: 'All matchweeks' }, ...weeks.map((w) => ({ value: String(w), label: `Matchweek ${w}` }))]
  }, [fixtures])

  const clubOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All clubs' },
      ...clubs.map((c) => ({ value: String(c.id), label: c.name })),
    ]
  }, [clubs])

  const filtered = useMemo(() => {
    return fixtures
      .filter((m) => (matchweek === 'all' ? true : String(m.matchweek) === matchweek))
      .filter((m) =>
        clubId === 'all' ? true : String(m.homeClubId) === clubId || String(m.awayClubId) === clubId,
      )
      .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
  }, [fixtures, matchweek, clubId])

  const liveCount = useMemo(() => fixtures.filter((m) => m.status === 'LIVE').length, [fixtures])

  const selectedHome = selected ? clubsById[selected.homeClubId] : null
  const selectedAway = selected ? clubsById[selected.awayClubId] : null

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Fixtures"
        subtitle="Filter by matchweek and club. Click a match for details modal."
        right={
          <div className="flex flex-wrap gap-2">
            <FilterDropdown label="Matchweek" value={matchweek} onChange={setMatchweek} options={matchweeks} />
            <FilterDropdown label="Club" value={clubId} onChange={setClubId} options={clubOptions} />
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div>
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              <LoadingSkeleton className="h-44" />
              <LoadingSkeleton className="h-44" />
              <LoadingSkeleton className="h-44" />
              <LoadingSkeleton className="h-44" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((m) => (
                <MatchCard
                  key={m.id}
                  match={m}
                  home={clubsById[m.homeClubId]}
                  away={clubsById[m.awayClubId]}
                  onClick={() => setSelected(m)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <LiveScoreWidget liveMatches={liveCount} />
          <div className="glass rounded-3xl p-4 shadow-soft">
            <div className="text-sm font-semibold">Tip for demo</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-hub-muted">
              Start JSON Server with <span className="font-semibold">npm run server</span>. The UI uses fetch + Context.
            </p>
            <button
              type="button"
              className="hub-btn-primary mt-4 w-full"
              onClick={() => toast.success('Filters saved to localStorage')}
            >
              Save filters
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={Boolean(selected)}
        title={
          selected
            ? `${selectedHome?.shortName || 'HOME'} vs ${selectedAway?.shortName || 'AWAY'}`
            : 'Match'
        }
        onClose={() => setSelected(null)}
      >
        {selected ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-3xl p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
                Details
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <div>
                  <span className="opacity-70">Kickoff:</span> <span className="font-semibold">{selected.kickoff}</span>
                </div>
                <div>
                  <span className="opacity-70">Stadium:</span> <span className="font-semibold">{selected.stadium}</span>
                </div>
                <div>
                  <span className="opacity-70">Referee:</span> <span className="font-semibold">{selected.referee}</span>
                </div>
                <div>
                  <span className="opacity-70">Status:</span> <span className="font-semibold">{selected.status}</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
                Live score UI
              </div>
              <div className="mt-3 rounded-3xl bg-hub-card p-4 text-white shadow-soft">
                <div className="text-sm font-semibold">
                  {selectedHome?.name} vs {selectedAway?.name}
                </div>
                <div className="mt-3 text-4xl font-extrabold">
                  {selected.homeScore} - {selected.awayScore}
                </div>
                <div className="mt-1 text-xs text-white/80">
                  This is static mock data—perfect for demos without a backend.
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

