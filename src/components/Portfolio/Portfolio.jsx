import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import { getFeaturedProjects, categories } from '../../data/projects'
import { useLanguage } from '../../context/LanguageContext'

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Sve')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t, getRoute, language } = useLanguage()

  // Koristi samo featured projekte na početnoj strani
  const featuredProjects = getFeaturedProjects()
  const filteredProjects = activeFilter === 'Sve'
    ? featuredProjects
    : featuredProjects.filter(project => project.category === activeFilter)

  // Translated categories
  const translatedCategories = categories.map(cat => {
    if (cat === 'Sve') return { original: cat, display: t('portfolio.filters.all') }
    if (cat === 'Web') return { original: cat, display: t('portfolio.filters.web') }
    if (cat === 'Mobile') return { original: cat, display: t('portfolio.filters.mobile') }
    if (cat === 'Branding') return { original: cat, display: t('portfolio.filters.branding') }
    return { original: cat, display: cat }
  })

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-32 bg-navy overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Floating accent */}
      <motion.div
        className="absolute -left-20 top-1/3 w-40 h-40 rounded-full bg-orange/20 blur-3xl"
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-orange/20 text-orange font-display text-sm font-semibold rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t('portfolio.badge')}
          </motion.span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            {t('portfolio.title')} <span className="text-orange">{t('portfolio.titleHighlight')}</span>
          </h2>
          
          <p className="text-cream/60 font-body text-lg max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {translatedCategories.map((category) => (
            <motion.button
              key={category.original}
              onClick={() => setActiveFilter(category.original)}
              className={`px-6 py-3 rounded-full font-display font-medium transition-all duration-300 ${
                activeFilter === category.original
                  ? 'bg-orange text-cream'
                  : 'bg-cream/10 text-cream/70 hover:bg-cream/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="Filter"
            >
              {category.display}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link to={getRoute('/projekti')}>
            <motion.button
              className="px-8 py-4 border-2 border-cream/30 text-cream font-display font-semibold rounded-full hover:bg-cream hover:text-navy transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="View All"
            >
              {t('portfolio.viewAll')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
