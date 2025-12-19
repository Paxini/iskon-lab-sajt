import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { LanguageProvider } from './context/LanguageContext'
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
        {/* Serbian routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/o-nama" element={<AboutPage />} />
        <Route path="/usluge" element={<ServicesPage />} />
        <Route path="/projekti" element={<ProjectsPage />} />
        <Route path="/projekti/:id" element={<ProjectDetailPage />} />
        
        {/* English routes */}
        <Route path="/en" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppContent() {
  return (
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
  )
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </Router>
  )
}

export default App
