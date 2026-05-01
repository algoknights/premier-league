# Premier League Hub

Modern, beginner-friendly React + Tailwind football website inspired by the official Premier League design language (dark purple, neon gradients, premium cards).

## Tech stack

- React + Vite
- Tailwind CSS
- React Router DOM
- Context API
- JSON Server (mock APIs)
- Lucide React Icons
- Framer Motion (animations)
- Recharts (stats dashboard charts)

## Quick start

Install dependencies:

```bash
cd premier-league-hub
npm install
```

Run the mock API (JSON Server) in one terminal:

```bash
npm run server
```

Run the React app in a second terminal:

```bash
npm run dev
```

The app expects JSON Server on `http://localhost:5174`.

## Mock API data

All mock data is in:

- `server/db.json`

Endpoints:

- `/clubs`
- `/players`
- `/fixtures`
- `/standings`
- `/news`
- `/statistics`

## Folder structure (core)

```
src/
  components/
    cards/
    common/
    navigation/
    sections/
  context/
  hooks/
  layouts/
  pages/
  routes/
  services/
  utils/
server/
  db.json
```

## Team collaboration split (recommended)

- Member 1: `Navbar`, `Sidebar`, routing, `HomePage`
- Member 2: `FixturesPage`, `StandingsPage`, match cards + club pages
- Member 3: `PlayersPage`, `NewsPage`, `StatsDashboardPage`, dark mode + JSON server data

## Deployment (Vercel)

1. Push this project to GitHub
2. In Vercel, click **New Project** → import the repo
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

### Notes for routing (important)

This is a client-side routed app (React Router). If you refresh on a deep route like `/clubs/1`, your host must rewrite to `index.html`.

- On Vercel, add a rewrite:
  - Source: `/(.*)`
  - Destination: `/index.html`

## Scripts

- `npm run dev`: start Vite dev server
- `npm run server`: start JSON Server on port 5174
- `npm run build`: build for production
- `npm run preview`: preview production build locally

## Disclaimer

This project is a UI/UX inspired clone for educational purposes (no official branding, no backend, and uses static mock data).

