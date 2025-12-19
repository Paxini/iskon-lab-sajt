import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import CustomCursor from './components/ui/CustomCursor'
import SmoothScroll from './components/ui/SmoothScroll'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/o-nama" element={<AboutPage />} />
        <Route path="/usluge" element={<ServicesPage />} />
        <Route path="/projekti" element={<ProjectsPage />} />
        <Route path="/projekti/:id" element={<ProjectDetailPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <SmoothScroll>
        <div className="relative min-h-screen bg-cream">
          <CustomCursor />
          <Navigation />
          
          <main>
            <AnimatedRoutes />
          </main>
          
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  )
}

export default App
