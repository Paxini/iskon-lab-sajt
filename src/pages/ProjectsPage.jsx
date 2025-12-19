import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { projects, categories, getProjectsByCategory } from '../data/projects'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        layout: { duration: 0.4 },
      }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/projekti/${project.id}`} data-cursor="View">
        <motion.div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-dark"
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* Category badge */}
          <span className="absolute top-4 left-4 px-3 py-1 bg-orange text-cream text-xs font-display font-semibold rounded-full">
            {project.category}
          </span>

          {/* Year badge */}
          <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-cream text-xs font-display font-medium rounded-full">
            {project.year}
          </span>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h3
              className="font-display text-xl font-bold text-cream mb-2"
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="text-cream/70 font-body text-sm line-clamp-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              {project.description}
            </motion.p>

            {/* Technologies */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-white/10 text-cream/80 text-xs font-body rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-cream/60 text-xs font-body">
                  +{project.technologies.length - 3}
                </span>
              )}
            </motion.div>
          </div>

          {/* Border on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-orange pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('Sve')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const navigate = useNavigate()

  const filteredProjects = getProjectsByCategory(activeFilter)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    }
  }, [])

  const handleContactClick = () => {
    navigate('/')
    setTimeout(() => {
      const element = document.querySelector('#contact')
      if (element && window.lenis) {
        window.lenis.scrollTo(element, { offset: -100 })
      }
    }, 100)
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-navy overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <motion.div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-orange/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <motion.span
              className="inline-block px-4 py-2 bg-orange/20 text-orange font-display text-sm font-semibold rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Portfolio
            </motion.span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Naši <span className="text-orange">projekti</span>
            </h1>

            <p className="text-cream/60 font-body text-lg max-w-2xl mx-auto mb-8">
              Istražite našu kolekciju projekata. Svaki predstavlja jedinstvenu priču
              o saradnji, kreativnosti i tehničkoj izvrsnosti.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-12 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <span className="block font-display text-4xl font-bold text-orange">
                  {projects.length}+
                </span>
                <span className="text-cream/60 font-body text-sm">Projekata</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <span className="block font-display text-4xl font-bold text-orange">
                  {new Set(projects.map((p) => p.client)).size}+
                </span>
                <span className="text-cream/60 font-body text-sm">Klijenata</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <span className="block font-display text-4xl font-bold text-orange">
                  100%
                </span>
                <span className="text-cream/60 font-body text-sm">Zadovoljstvo</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section ref={ref} className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-display font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-navy text-cream'
                    : 'bg-navy/5 text-navy hover:bg-navy/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="Filter"
              >
                {category}
                {category !== 'Sve' && (
                  <span className="ml-2 text-xs opacity-60">
                    ({projects.filter((p) => p.category === category).length})
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-navy/60 font-body text-lg">
                Nema projekata u ovoj kategoriji.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
              Imate projekat na umu?
            </h2>
            <p className="text-cream/60 font-body text-lg mb-8">
              Hajde da razgovaramo o vašoj ideji i pretvorimo je u stvarnost.
            </p>
            <button
              onClick={handleContactClick}
              className="inline-block px-8 py-4 bg-orange text-cream font-display font-semibold rounded-full hover:bg-cream hover:text-navy transition-all duration-300"
              data-cursor="Go"
            >
              Kontaktirajte nas
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default ProjectsPage

