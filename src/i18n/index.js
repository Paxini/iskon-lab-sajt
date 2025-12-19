import sr from './sr.json'
import en from './en.json'

export const translations = {
  sr,
  en,
}

export const languages = {
  sr: {
    code: 'sr',
    name: 'Srpski',
    flag: '🇷🇸',
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
}

// Route mappings between languages
export const routeMap = {
  sr: {
    '/': '/',
    '/o-nama': '/o-nama',
    '/usluge': '/usluge',
    '/projekti': '/projekti',
  },
  en: {
    '/': '/en',
    '/o-nama': '/about-us',
    '/usluge': '/services',
    '/projekti': '/projects',
  },
}

// Reverse route mapping (to determine current page from URL)
export const reverseRouteMap = {
  '/': { sr: '/', en: '/en' },
  '/en': { sr: '/', en: '/en' },
  '/o-nama': { sr: '/o-nama', en: '/about-us' },
  '/about-us': { sr: '/o-nama', en: '/about-us' },
  '/usluge': { sr: '/usluge', en: '/services' },
  '/services': { sr: '/usluge', en: '/services' },
  '/projekti': { sr: '/projekti', en: '/projects' },
  '/projects': { sr: '/projekti', en: '/projects' },
}

// Get language from pathname
export const getLanguageFromPath = (pathname) => {
  if (pathname.startsWith('/en') || 
      pathname.startsWith('/about-us') || 
      pathname.startsWith('/services') || 
      pathname.startsWith('/projects')) {
    return 'en'
  }
  return 'sr'
}

// Get equivalent route in target language
export const getEquivalentRoute = (currentPath, targetLang) => {
  // Handle project detail pages
  if (currentPath.startsWith('/projekti/')) {
    const projectId = currentPath.replace('/projekti/', '')
    return targetLang === 'en' ? `/projects/${projectId}` : `/projekti/${projectId}`
  }
  if (currentPath.startsWith('/projects/')) {
    const projectId = currentPath.replace('/projects/', '')
    return targetLang === 'en' ? `/projects/${projectId}` : `/projekti/${projectId}`
  }

  // Handle hash in URL
  const [path, hash] = currentPath.split('#')
  const hashPart = hash ? `#${hash}` : ''

  const routeInfo = reverseRouteMap[path]
  if (routeInfo) {
    return routeInfo[targetLang] + hashPart
  }
  
  // Default fallback
  return targetLang === 'en' ? '/en' : '/'
}

export default translations

