// ============================================
// CENTRALIZOVANI PODACI O PROJEKTIMA
// ============================================
// Dodajte novi projekat ovde i automatski će se
// prikazati na svim stranicama (početna, /projekti, itd.)
// ============================================

export const projects = [
  {
    id: 'crvena-zvezda-esports',
    title: 'Crvena zvezda Esports',
    title_en: 'Red Star Esports',
    category: 'Web',
    description: 'Kompletan digitalni ekosistem za esports diviziju Crvene zvezde - sajt, sistem za plaćanje i backoffice.',
    description_en: 'Complete digital ecosystem for Red Star esports division - website, payment system, and backoffice.',
    fullDescription: `Za Crvenu zvezdu Esports, razvili smo sveobuhvatno digitalno rešenje koje obuhvata 
    moderan web sajt sa svim informacijama o timu i takmičenjima, integrisani sistem za online plaćanje donacija i merchandise-a, kao i kompletan backoffice sistem za upravljanje igračima, rezultatima  i finansijama. Platforma je dizajnirana da podrži rast esports scene u Srbiji i povezivanje sa  globalnom gejming zajednicom.`,
    fullDescription_en: `For Red Star Esports, we developed a comprehensive digital solution that includes 
    a modern website with all team and competition information, an integrated online payment system for donations and merchandise, and a complete backoffice system for managing players, results, and finances. The platform is designed to support the growth of the esports scene in Serbia and connect with the global gaming community.`,
    image: '/projects/czvsajt.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Unicredit Payment Gateway'],
    client: 'Crvena zvezda Esports',
    client_en: 'Red Star Esports',
    year: 2025,
    featured: true,
    color: '#d52b1e',
  },
  {
    id: 'iskon-lab',
    title: 'Iskon Lab',
    title_en: 'Iskon Lab',
    category: 'Branding',
    description: 'Kompletna izrada vizuelnog identiteta i web sajta za naš studio - od logotipa do produkcije.',
    description_en: 'Complete visual identity and website creation for our studio - from logo to production.',
    fullDescription: `Iskon Lab je projekat koji smo radili sami za sebe - što ga čini posebnim. 
    
Krenuli smo od nule: definisali smo vrednosti brenda, ton komunikacije i vizuelni jezik koji nas predstavlja. Logo kombinuje minimalizam sa toplinom - narandžasta boja simbolizuje kreativnost i energiju, dok tamno plava predstavlja tehničku ozbiljnost i poverenje.

Web sajt je izgrađen sa najmodernijim tehnologijama - React za frontend, Framer Motion za fluidne animacije, i Tailwind CSS za dizajn sistem. Svaki detalj je pažljivo osmišljen da pruži premium korisničko iskustvo.

Rezultat je koherentan brend identitet koji komunicira našu misiju: spoj tehnologije i razumevanja ljudi.`,
    fullDescription_en: `Iskon Lab is a project we did for ourselves - which makes it special.

We started from scratch: we defined brand values, communication tone, and the visual language that represents us. The logo combines minimalism with warmth - orange symbolizes creativity and energy, while dark blue represents technical seriousness and trust.

The website is built with the latest technologies - React for frontend, Framer Motion for fluid animations, and Tailwind CSS for the design system. Every detail is carefully crafted to provide a premium user experience.

The result is a coherent brand identity that communicates our mission: the fusion of technology and understanding people.`,
    image: '/logo-transparent.png',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Figma', 'Adobe Illustrator'],
    client: 'Iskon Lab',
    client_en: 'Iskon Lab',
    year: 2025,
    featured: true,
    color: '#e86f3a',
  },
]

export const categories = ['Sve', 'Web', 'Mobile', 'Branding']

// Helper funkcije
export const getFeaturedProjects = () => projects.filter(p => p.featured)
export const getProjectsByCategory = (category) => 
  category === 'Sve' ? projects : projects.filter(p => p.category === category)
export const getProjectById = (id) => projects.find(p => p.id === id)

// Get localized project data
export const getLocalizedProject = (project, language) => {
  if (!project) return null
  
  if (language === 'en') {
    return {
      ...project,
      title: project.title_en || project.title,
      description: project.description_en || project.description,
      fullDescription: project.fullDescription_en || project.fullDescription,
      client: project.client_en || project.client,
    }
  }
  return project
}

