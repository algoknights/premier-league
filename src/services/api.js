const isProd = import.meta.env.PROD
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5174')

async function request(path) {
  const res = await fetch(`${API_BASE_URL}${path}`)
  if (!res.ok) {
    const message = `Request failed (${res.status}) for ${path}`
    throw new Error(message)
  }
  return res.json()
}

export const api = {
  clubs: () => request('/clubs'),
  players: () => request('/players'),
  fixtures: () => request('/fixtures'),
  standings: () => request('/standings'),
  news: () => request('/news'),
  statistics: () => request('/statistics'),
}

