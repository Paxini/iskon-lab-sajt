import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { translations, languages, getLanguageFromPath, getEquivalentRoute } from '../i18n'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Determine initial language from URL or localStorage
  const getInitialLanguage = () => {
    const pathLang = getLanguageFromPath(location.pathname)
    const storedLang = localStorage.getItem('language')
    
    // URL takes precedence
    if (pathLang) return pathLang
    if (storedLang && (storedLang === 'sr' || storedLang === 'en')) return storedLang
    return 'sr'
  }

  const [language, setLanguage] = useState(getInitialLanguage)

  // Update language when URL changes
  useEffect(() => {
    const pathLang = getLanguageFromPath(location.pathname)
    if (pathLang !== language) {
      setLanguage(pathLang)
    }
  }, [location.pathname])

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    const newLang = language === 'sr' ? 'en' : 'sr'
    const newRoute = getEquivalentRoute(location.pathname, newLang)
    
    setLanguage(newLang)
    navigate(newRoute)
  }

  const setLang = (newLang) => {
    if (newLang === language) return
    
    const newRoute = getEquivalentRoute(location.pathname, newLang)
    setLanguage(newLang)
    navigate(newRoute)
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation missing for key: ${key} in language: ${language}`)
        return key
      }
    }
    
    return value
  }

  // Get localized route
  const getRoute = (baseRoute) => {
    if (language === 'en') {
      const routeMapping = {
        '/': '/en',
        '/o-nama': '/about-us',
        '/usluge': '/services',
        '/projekti': '/projects',
      }
      return routeMapping[baseRoute] || baseRoute
    }
    return baseRoute
  }

  // Get localized project route
  const getProjectRoute = (projectId) => {
    return language === 'en' ? `/projects/${projectId}` : `/projekti/${projectId}`
  }

  const value = {
    language,
    languages,
    setLanguage: setLang,
    toggleLanguage,
    t,
    getRoute,
    getProjectRoute,
    isEnglish: language === 'en',
    isSerbian: language === 'sr',
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext

