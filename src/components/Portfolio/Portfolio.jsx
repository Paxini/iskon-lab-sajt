import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import { getFeaturedProjects, categories, getProjectsByCategory } from '../../data/projects'

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Sve')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Koristi samo featured projekte na početnoj strani
  const featuredProjects = getFeaturedProjects()
  const filteredProjects = activeFilter === 'Sve'
    ? featuredProjects
    : featuredProjects.filter(project => project.category === activeFilter)

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
            Portfolio
          </motion.span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Izabrani <span className="text-orange">projekti</span>
          </h2>
          
          <p className="text-cream/60 font-body text-lg max-w-2xl mx-auto">
            Pogledajte neke od projekata na koje smo posebno ponosni. 
            Svaki je priča za sebe.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-display font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-orange text-cream'
                  : 'bg-cream/10 text-cream/70 hover:bg-cream/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="Filter"
            >
              {category}
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

        {/* View All CTA - sada Link ka /projekti */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link to="/projekti">
            <motion.button
              className="px-8 py-4 border-2 border-cream/30 text-cream font-display font-semibold rounded-full hover:bg-cream hover:text-navy transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="View All"
            >
              Pogledaj sve projekte
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
