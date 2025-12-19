import { useLanguage } from '../context/LanguageContext'

// Convenience hook that re-exports useLanguage
// This provides a more familiar API for those used to i18n libraries
export function useTranslation() {
  const { t, language, toggleLanguage, setLanguage, languages, getRoute, getProjectRoute, isEnglish, isSerbian } = useLanguage()
  
  return {
    t,
    language,
    toggleLanguage,
    setLanguage,
    languages,
    getRoute,
    getProjectRoute,
    isEnglish,
    isSerbian,
  }
}

export default useTranslation

