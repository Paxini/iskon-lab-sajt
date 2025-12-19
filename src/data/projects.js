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
    category: 'Web',
    description: 'Kompletan digitalni ekosistem za esports diviziju Crvene zvezde - sajt, sistem za plaćanje i backoffice.',
    fullDescription: `Za Crvenu zvezdu Esports, razvili smo sveobuhvatno digitalno rešenje koje obuhvata 
    moderan web sajt sa svim informacijama o timu i takmičenjima, integrisani sistem za online plaćanje donacija i merchandise-a, kao i kompletan backoffice sistem za upravljanje igračima, rezultatima  i finansijama. Platforma je dizajnirana da podrži rast esports scene u Srbiji i povezivanje sa  globalnom gejming zajednicom.`,
    image: '/projects/czvsajt.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Unicredit Payment Gateway'],
    client: 'Crvena zvezda Esports',
    year: 2025,
    featured: true,
    color: '#d52b1e',
  },
]

export const categories = ['Sve', 'Web', 'Mobile', 'Branding']

// Helper funkcije
export const getFeaturedProjects = () => projects.filter(p => p.featured)
export const getProjectsByCategory = (category) => 
  category === 'Sve' ? projects : projects.filter(p => p.category === category)
export const getProjectById = (id) => projects.find(p => p.id === id)

