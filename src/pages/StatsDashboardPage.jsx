import { useMemo } from 'react'
import { Activity, ShieldCheck, Sparkles, Target } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts'
import { useData } from '../hooks/useData.js'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { StatsCard } from '../components/sections/StatsCard.jsx'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx'

function CardWrap({ title, children }) {
  return (
    <div className="glass rounded-3xl p-4 shadow-soft">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
        {title}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export default function StatsDashboardPage() {
  const { statistics, loading } = useData()

  const summary = useMemo(() => {
    return {
      goals: statistics?.summary?.totalGoals ?? '—',
      cleanSheets: statistics?.summary?.cleanSheets ?? '—',
      avgGoals: statistics?.summary?.avgGoalsPerMatch ?? '—',
      shotsOnTarget: statistics?.summary?.shotsOnTarget ?? '—',
    }
  }, [statistics])

  if (loading) return <LoadingSkeleton className="h-[640px]" />

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Stats Dashboard"
        subtitle="Interactive charts with Recharts + leaderboard UI."
        right={<Activity className="h-5 w-5 text-hub-neon" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total goals" value={summary.goals} subtitle="League season (mock)" icon={Target} />
        <StatsCard title="Clean sheets" value={summary.cleanSheets} subtitle="Defensive dominance" icon={ShieldCheck} />
        <StatsCard title="Avg goals/match" value={summary.avgGoals} subtitle="Entertainment index" icon={Sparkles} />
        <StatsCard title="Shots on target" value={summary.shotsOnTarget} subtitle="Attacking intent" icon={Activity} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CardWrap title="Goals by matchweek">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statistics?.charts?.goalsByWeek || []}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.55)" />
                <YAxis stroke="rgba(255,255,255,0.55)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 6, 30, 0.95)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 16,
                  }}
                />
                <Line type="monotone" dataKey="goals" stroke="#22d3ee" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardWrap>

        <CardWrap title="Clean sheets by club (top 8)">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statistics?.charts?.cleanSheetsByClub || []}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="club" stroke="rgba(255,255,255,0.55)" />
                <YAxis stroke="rgba(255,255,255,0.55)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 6, 30, 0.95)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 16,
                  }}
                />
                <Bar dataKey="cleanSheets" fill="#a855f7" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardWrap>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <CardWrap title="Top scorers">
          <div className="space-y-2">
            {(statistics?.leaderboards?.topScorers || []).map((p, idx) => (
              <div
                key={p.name}
                className="flex items-center justify-between rounded-2xl bg-black/5 px-3 py-3 dark:bg-white/5"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {idx + 1}. {p.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-hub-muted">{p.club}</div>
                </div>
                <div className="rounded-2xl bg-hub-card px-3 py-2 text-xs font-extrabold text-white">{p.goals}</div>
              </div>
            ))}
          </div>
        </CardWrap>

        <CardWrap title="Assists leaderboard">
          <div className="space-y-2">
            {(statistics?.leaderboards?.topAssists || []).map((p, idx) => (
              <div
                key={p.name}
                className="flex items-center justify-between rounded-2xl bg-black/5 px-3 py-3 dark:bg-white/5"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {idx + 1}. {p.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-hub-muted">{p.club}</div>
                </div>
                <div className="rounded-2xl bg-hub-card px-3 py-2 text-xs font-extrabold text-white">{p.assists}</div>
              </div>
            ))}
          </div>
        </CardWrap>

        <CardWrap title="Clean sheets">
          <div className="space-y-2">
            {(statistics?.leaderboards?.cleanSheets || []).map((p, idx) => (
              <div
                key={p.name}
                className="flex items-center justify-between rounded-2xl bg-black/5 px-3 py-3 dark:bg-white/5"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {idx + 1}. {p.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-hub-muted">{p.club}</div>
                </div>
                <div className="rounded-2xl bg-hub-card px-3 py-2 text-xs font-extrabold text-white">
                  {p.cleanSheets}
                </div>
              </div>
            ))}
          </div>
        </CardWrap>
      </div>
    </div>
  )
}

