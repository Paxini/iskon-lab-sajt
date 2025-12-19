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
  {
    id: 'iskon-lab',
    title: 'Iskon Lab',
    category: 'Branding',
    description: 'Kompletna izrada vizuelnog identiteta i web sajta za naš studio - od logotipa do produkcije.',
    fullDescription: `Iskon Lab je projekat koji smo radili sami za sebe - što ga čini posebnim. 
    
Krenuli smo od nule: definisali smo vrednosti brenda, ton komunikacije i vizuelni jezik koji nas predstavlja. Logo kombinuje minimalizam sa toplinom - narandžasta boja simbolizuje kreativnost i energiju, dok tamno plava predstavlja tehničku ozbiljnost i poverenje.

Web sajt je izgrađen sa najmodernijim tehnologijama - React za frontend, Framer Motion za fluidne animacije, i Tailwind CSS za dizajn sistem. Svaki detalj je pažljivo osmišljen da pruži premium korisničko iskustvo.

Rezultat je koherentan brend identitet koji komunicira našu misiju: spoj tehnologije i razumevanja ljudi.`,
    image: '/logo-transparent.png',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Figma', 'Adobe Illustrator'],
    client: 'Iskon Lab',
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

