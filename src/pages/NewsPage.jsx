import { useMemo, useState } from 'react'
import { Newspaper, TrendingUp } from 'lucide-react'
import { useData } from '../hooks/useData.js'
import { SectionHeader } from '../components/common/SectionHeader.jsx'
import { FilterDropdown } from '../components/common/FilterDropdown.jsx'
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx'
import { NewsCard } from '../components/cards/NewsCard.jsx'

export default function NewsPage() {
  const { news, loading } = useData()
  const [cat, setCat] = useState('all')

  const categories = useMemo(() => {
    const c = Array.from(new Set(news.map((n) => n.category))).sort()
    return [{ value: 'all', label: 'All categories' }, ...c.map((x) => ({ value: x, label: x }))]
  }, [news])

  const filtered = useMemo(() => {
    if (cat === 'all') return news
    return news.filter((n) => n.category === cat)
  }, [news, cat])

  const trending = useMemo(() => news.slice(0, 4), [news])

  return (
    <div className="space-y-6">
      <SectionHeader
        title="News"
        subtitle="Categories + trending section, inspired by premium sports sites."
        right={<Newspaper className="h-5 w-5 text-hub-neon" />}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterDropdown label="Category" value={cat} onChange={setCat} options={categories} />
        <div className="inline-flex items-center gap-2 rounded-2xl bg-black/5 px-3 py-2 text-xs dark:bg-white/5">
          <TrendingUp className="h-4 w-4 opacity-70" /> Trending: {trending.length}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          <LoadingSkeleton className="h-72" />
          <LoadingSkeleton className="h-72" />
          <LoadingSkeleton className="h-72" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      )}

      <section>
        <SectionHeader title="Trending" subtitle="Quick trending strip for UI richness." />
        {loading ? (
          <div className="grid gap-4 md:grid-cols-4">
            <LoadingSkeleton className="h-40" />
            <LoadingSkeleton className="h-40" />
            <LoadingSkeleton className="h-40" />
            <LoadingSkeleton className="h-40" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-4">
            {trending.map((n) => (
              <div key={n.id} className="glass rounded-3xl p-4 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-hub-muted">
                  {n.category}
                </div>
                <div className="mt-2 text-sm font-semibold">{n.title}</div>
                <div className="mt-2 text-xs text-slate-500 dark:text-hub-muted">{n.date}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

