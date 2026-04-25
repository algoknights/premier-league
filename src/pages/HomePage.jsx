import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { TrendingUp, Users, Newspaper, Goal } from 'lucide-react'
import { useMemo } from 'react'
import { useData } from '../hooks/useData.js'
import { HeroBanner } from '../components/sections/HeroBanner.jsx'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { MatchCard } from '../components/cards/MatchCard.jsx'
import { NewsCard } from '../components/cards/NewsCard.jsx'
import { ClubCard } from '../components/cards/ClubCard.jsx'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx'

export default function HomePage() {
  const { clubs, fixtures, players, news, loading, error } = useData()

  const clubsById = useMemo(() => Object.fromEntries(clubs.map((c) => [c.id, c])), [clubs])

  const featured = useMemo(() => {
    const upcoming = fixtures
      .filter((m) => m.status === 'UPCOMING')
      .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
    return upcoming.slice(0, 4)
  }, [fixtures])

  const latestNews = useMemo(() => news.slice(0, 3), [news])

  const topScorers = useMemo(() => {
    return [...players].sort((a, b) => b.goals - a.goals).slice(0, 5)
  }, [players])

  const trendingClubs = useMemo(() => clubs.slice(0, 6), [clubs])

  const highlights = useMemo(() => {
    const finished = fixtures.filter((m) => m.status === 'FT')
    return finished
      .sort((a, b) => (b.homeScore + b.awayScore) - (a.homeScore + a.awayScore))
      .slice(0, 3)
  }, [fixtures])

  return (
    <div className="space-y-10">
      <HeroBanner />

      {error ? (
        <div className="glass rounded-3xl p-4">
          <div className="text-sm font-semibold">Couldn’t load mock API data.</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-hub-muted">{error}</div>
          <div className="mt-4 text-sm text-slate-600 dark:text-hub-muted">
            Make sure JSON Server is running on <span className="font-semibold">port 5174</span>.
          </div>
        </div>
      ) : null}

      <section>
        <SectionHeader
          title="Featured matches"
          subtitle="Upcoming games with a premium matchcard UI."
          right={
            <button type="button" className="hub-btn-ghost" onClick={() => toast.success('Added to favorites (demo)')}>
              <TrendingUp className="h-4 w-4" /> Quick action
            </button>
          }
        />

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            <LoadingSkeleton className="h-40" />
            <LoadingSkeleton className="h-40" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                home={clubsById[m.homeClubId]}
                away={clubsById[m.awayClubId]}
                onClick={() => toast('Open Fixtures for match modal')}
              />
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeader title="Latest news" subtitle="Cards, categories, and a clean sports feed layout." />
          {loading ? (
            <div className="grid gap-4 md:grid-cols-3">
              <LoadingSkeleton className="h-72" />
              <LoadingSkeleton className="h-72" />
              <LoadingSkeleton className="h-72" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {latestNews.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          )}
        </div>

        <div className="glass rounded-3xl p-4 shadow-soft">
          <SectionHeader
            title="Top scorers"
            subtitle="Animated list + clean stats."
            right={<Goal className="h-5 w-5 text-hub-neon" />}
          />
          {loading ? (
            <div className="space-y-3">
              <LoadingSkeleton className="h-14" />
              <LoadingSkeleton className="h-14" />
              <LoadingSkeleton className="h-14" />
            </div>
          ) : (
            <div className="space-y-2">
              {topScorers.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex items-center justify-between rounded-2xl bg-black/5 px-3 py-3 dark:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-white/80">
                      <img src={p.photoUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{p.name}</div>
                      <div className="text-xs text-slate-500 dark:text-hub-muted">
                        {p.position} • {clubsById[p.clubId]?.shortName}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-hub-card px-3 py-2 text-xs font-extrabold text-white">
                    {p.goals} G
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <SectionHeader title="Trending clubs" subtitle="Hover glow + responsive grid." right={<Users className="h-5 w-5 text-hub-neon" />} />
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LoadingSkeleton className="h-36" />
            <LoadingSkeleton className="h-36" />
            <LoadingSkeleton className="h-36" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trendingClubs.map((c) => (
              <ClubCard key={c.id} club={c} />
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeader
          title="Matchweek highlights"
          subtitle="Highest-scoring finished games (demo highlight logic)."
          right={<Newspaper className="h-5 w-5 text-hub-neon" />}
        />
        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            <LoadingSkeleton className="h-40" />
            <LoadingSkeleton className="h-40" />
            <LoadingSkeleton className="h-40" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                home={clubsById[m.homeClubId]}
                away={clubsById[m.awayClubId]}
                onClick={() => toast('Highlights are static (demo)')}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

