import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '../components/navigation/Navbar.jsx'
import { Sidebar } from '../components/navigation/Sidebar.jsx'
import { Footer } from '../components/navigation/Footer.jsx'

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

      <div className="hub-container grid grid-cols-1 gap-6 lg:grid-cols-[288px_1fr] lg:gap-8">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="pb-10 pt-6">
          <Outlet />
        </main>
      </div>

      <Footer />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: 'rgba(20, 10, 40, 0.95)', color: '#fff', borderRadius: 16 },
        }}
      />
    </div>
  )
}

