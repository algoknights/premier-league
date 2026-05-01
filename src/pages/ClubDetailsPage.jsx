import { useMemo } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { CalendarDays, MapPin, Users, ArrowLeft } from 'lucide-react'
import { useData } from '../hooks/useData.js'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx'
import { MatchCard } from '../components/cards/MatchCard.jsx'

export default function ClubDetailsPage() {
  const { clubId } = useParams()
  const { clubs, players, fixtures, loading } = useData()

  const club = useMemo(() => clubs.find((c) => String(c.id) === String(clubId)), [clubs, clubId])
  const clubsById = useMemo(() => Object.fromEntries(clubs.map((c) => [c.id, c])), [clubs])

  const squad = useMemo(() => players.filter((p) => String(p.clubId) === String(clubId)), [players, clubId])

  const clubFixtures = useMemo(() => {
    return fixtures
      .filter((m) => String(m.homeClubId) === String(clubId) || String(m.awayClubId) === String(clubId))
      .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
      .slice(0, 4)
  }, [fixtures, clubId])

  if (loading) return <LoadingSkeleton className="h-[620px]" />
  if (!club) {
    return (
      <div className="glass rounded-3xl p-6">
        <div className="text-lg font-semibold">Club not found</div>
        <NavLink to="/clubs" className="hub-btn-primary mt-4 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to clubs
        </NavLink>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[32px] bg-hub-hero p-6 shadow-soft sm:p-10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-hub-brand/35 blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-hub-neon/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-[28px] bg-white/85 p-2 shadow-soft">
              <img src={club.logoUrl} alt="" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="text-3xl font-extrabold tracking-tight text-white">{club.name}</div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/80">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                  <MapPin className="h-4 w-4" /> {club.stadium}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                  Founded <span className="font-semibold">{club.founded}</span>
                </span>
              </div>
            </div>
          </div>

          <NavLink to="/clubs" className="hub-btn-ghost text-white">
            <ArrowLeft className="h-4 w-4" /> Back to clubs
          </NavLink>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeader
            title="Squad"
            subtitle="Simple dynamic rendering with map() and clean card rows."
            right={<Users className="h-5 w-5 text-hub-neon" />}
          />
          <div className="glass overflow-hidden rounded-3xl shadow-soft">
            <div className="divide-y divide-black/5 dark:divide-hub-border">
              {squad.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-white/80">
                      <img src={p.photoUrl} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{p.name}</div>
                      <div className="text-xs text-slate-500 dark:text-hub-muted">
                        {p.position} • #{p.number}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="rounded-2xl bg-black/5 px-3 py-2 dark:bg-white/5">
                      <span className="opacity-70">G</span> <span className="font-semibold">{p.goals}</span>
                    </div>
                    <div className="rounded-2xl bg-black/5 px-3 py-2 dark:bg-white/5">
                      <span className="opacity-70">A</span> <span className="font-semibold">{p.assists}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-3xl p-4 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
              Stadium info
            </div>
            <div className="mt-3 text-sm">
              <div className="font-semibold">{club.stadium}</div>
              <div className="mt-1 text-slate-600 dark:text-hub-muted">{club.stadiumInfo}</div>
            </div>
          </div>

          <div className="glass rounded-3xl p-4 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
              Club stats (mock)
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-3xl bg-black/5 p-3 dark:bg-white/5">
                <div className="text-xs opacity-70">Attack</div>
                <div className="mt-1 text-xl font-extrabold">{club.attack}</div>
              </div>
              <div className="rounded-3xl bg-black/5 p-3 dark:bg-white/5">
                <div className="text-xs opacity-70">Defense</div>
                <div className="mt-1 text-xl font-extrabold">{club.defense}</div>
              </div>
              <div className="rounded-3xl bg-black/5 p-3 dark:bg-white/5">
                <div className="text-xs opacity-70">Form</div>
                <div className="mt-1 text-xl font-extrabold">{club.form}</div>
              </div>
              <div className="rounded-3xl bg-black/5 p-3 dark:bg-white/5">
                <div className="text-xs opacity-70">Rating</div>
                <div className="mt-1 text-xl font-extrabold">{club.rating}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Upcoming & recent fixtures" subtitle="Club-focused fixtures section." right={<CalendarDays className="h-5 w-5 text-hub-neon" />} />
        <div className="grid gap-4 md:grid-cols-2">
          {clubFixtures.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              home={clubsById[m.homeClubId]}
              away={clubsById[m.awayClubId]}
              onClick={() => {}}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

