import { createContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api.js'

const DataContext = createContext(null)

async function fetchAll() {
  const [clubs, players, fixtures, standings, news, statistics] = await Promise.all([
    api.clubs(),
    api.players(),
    api.fixtures(),
    api.standings(),
    api.news(),
    api.statistics(),
  ])
  return { clubs, players, fixtures, standings, news, statistics: statistics?.[0] || null }
}

export function DataProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState({
    clubs: [],
    players: [],
    fixtures: [],
    standings: [],
    news: [],
    statistics: null,
  })

  async function refresh() {
    try {
      setError(null)
      setLoading(true)
      setData(await fetchAll())
    } catch (e) {
      setError(e?.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let ignore = false
    fetchAll()
      .then((all) => {
        if (ignore) return
        setData(all)
        setLoading(false)
      })
      .catch((e) => {
        if (ignore) return
        setError(e?.message || 'Failed to load data')
        setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const value = useMemo(() => ({ ...data, loading, error, refresh }), [data, loading, error])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataContext

