import {
  Activity,
  CalendarDays,
  Home,
  Newspaper,
  Shield,
  Star,
  Users,
  UserRound,
} from 'lucide-react'

export const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/fixtures', label: 'Fixtures', icon: CalendarDays },
  { to: '/standings', label: 'Standings', icon: Shield },
  { to: '/clubs', label: 'Clubs', icon: Users },
  { to: '/players', label: 'Players', icon: UserRound },
  { to: '/news', label: 'News', icon: Newspaper },
  { to: '/stats', label: 'Stats', icon: Activity },
  { to: '/highlights', label: 'Highlights', icon: Star },
]

