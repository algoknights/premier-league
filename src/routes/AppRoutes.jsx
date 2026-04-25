import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout.jsx'
import HomePage from '../pages/HomePage.jsx'
import FixturesPage from '../pages/FixturesPage.jsx'
import StandingsPage from '../pages/StandingsPage.jsx'
import ClubsPage from '../pages/ClubsPage.jsx'
import ClubDetailsPage from '../pages/ClubDetailsPage.jsx'
import PlayersPage from '../pages/PlayersPage.jsx'
import NewsPage from '../pages/NewsPage.jsx'
import StatsDashboardPage from '../pages/StatsDashboardPage.jsx'
import HighlightsPage from '../pages/HighlightsPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/fixtures" element={<FixturesPage />} />
        <Route path="/standings" element={<StandingsPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/clubs/:clubId" element={<ClubDetailsPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/stats" element={<StatsDashboardPage />} />
        <Route path="/highlights" element={<HighlightsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}

