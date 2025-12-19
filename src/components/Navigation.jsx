import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MagneticButton from './ui/MagneticButton'
import { useLanguage } from '../context/LanguageContext'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { t, language, toggleLanguage, getRoute, languages } = useLanguage()

  const navItems = [
    { name: t('nav.home'), href: getRoute('/'), type: 'route' },
    { name: t('nav.about'), href: getRoute('/o-nama'), type: 'route' },
    { name: t('nav.services'), href: getRoute('/usluge'), type: 'route' },
    { name: t('nav.portfolio'), href: getRoute('/projekti'), type: 'route' },
    { name: t('nav.contact'), href: '#contact', type: 'scroll' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const homeRoute = getRoute('/')

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false)
    
    if (item.type === 'route') {
      navigate(item.href)
    } else {
      // If we're not on homepage, go there first then scroll
      const isHomePage = location.pathname === '/' || location.pathname === '/en'
      if (!isHomePage) {
        navigate(homeRoute)
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.querySelector(item.href)
          if (element && window.lenis) {
            window.lenis.scrollTo(element, { offset: -100 })
          }
        }, 100)
      } else {
        const element = document.querySelector(item.href)
        if (element && window.lenis) {
          window.lenis.scrollTo(element, { offset: -100 })
        }
      }
    }
  }

  const handleLogoClick = () => {
    const isHomePage = location.pathname === '/' || location.pathname === '/en'
    if (isHomePage) {
      window.lenis?.scrollTo(0)
    } else {
      navigate(homeRoute)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-cream/90 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={handleLogoClick}
              className="flex items-center gap-3"
              data-cursor="Home"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/logo-transparent.png" 
                alt="Iskon Lab" 
                className="h-10 w-auto"
              />
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="relative font-display text-sm font-medium text-navy hover:text-orange transition-colors"
                  data-cursor="View"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
              
              <MagneticButton
                onClick={() => handleNavClick({ href: '#contact', type: 'scroll' })}
                className="px-6 py-2.5 bg-navy text-cream font-display text-sm font-medium rounded-full hover:bg-orange transition-colors duration-300"
                data-cursor="Go"
              >
                {t('nav.startProject')}
              </MagneticButton>

              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-navy/5 hover:bg-navy/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="Language"
              >
                {language === 'sr' ? (
                  <svg className="w-5 h-5 rounded-sm overflow-hidden" viewBox="0 0 60 30">
                    <rect width="60" height="30" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
                  </svg>
                ) : (
                  <div className="w-5 h-4 rounded-sm overflow-hidden relative">
                    {/* Serbian flag with coat of arms */}
                    <div className="absolute inset-0 flex flex-col">
                      <div className="flex-1 bg-[#C6363C]" />
                      <div className="flex-1 bg-[#0C4076]" />
                      <div className="flex-1 bg-white" />
                    </div>
                    <img 
                      src="/serbian-coat-of-arms.png" 
                      alt="" 
                      className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-auto"
                    />
                  </div>
                )}
                <span className="text-xs font-display font-medium text-navy">
                  {language === 'sr' ? 'EN' : 'SR'}
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-cursor="Menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-navy rounded-full"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 4 : 0,
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-navy rounded-full"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-navy rounded-full"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -4 : 0,
                }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-cream z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="font-display text-3xl font-semibold text-navy hover:text-orange transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {item.name}
                </motion.button>
              ))}
              
              {/* Mobile Language Toggle */}
              <motion.button
                onClick={() => {
                  toggleLanguage()
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-navy/5 hover:bg-navy/10 transition-colors mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navItems.length }}
              >
                {language === 'sr' ? (
                  <svg className="w-8 h-6 rounded-sm overflow-hidden" viewBox="0 0 60 30">
                    <rect width="60" height="30" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
                  </svg>
                ) : (
                  <div className="w-8 h-6 rounded-sm overflow-hidden relative">
                    {/* Serbian flag with coat of arms */}
                    <div className="absolute inset-0 flex flex-col">
                      <div className="flex-1 bg-[#C6363C]" />
                      <div className="flex-1 bg-[#0C4076]" />
                      <div className="flex-1 bg-white" />
                    </div>
                    <img 
                      src="/serbian-coat-of-arms.png" 
                      alt="" 
                      className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-auto"
                    />
                  </div>
                )}
                <span className="font-display font-medium text-navy">
                  {language === 'sr' ? 'English' : 'Srpski'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
