import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { DataProvider } from './context/DataContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

const page = {
  initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10, filter: 'blur(6px)' },
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <motion.div variants={page} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
              <AppRoutes />
            </motion.div>
          </AnimatePresence>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  )
}
