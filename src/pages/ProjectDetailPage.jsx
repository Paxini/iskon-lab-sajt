import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectById, projects, getLocalizedProject } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, language, getRoute, getProjectRoute } = useLanguage()
  
  const project = getProjectById(id)
  const localizedProject = getLocalizedProject(project, language)

  // Find next and previous projects
  const currentIndex = projects.findIndex((p) => p.id === id)
  const nextProject = projects[currentIndex + 1] || projects[0]
  const prevProject = projects[currentIndex - 1] || projects[projects.length - 1]
  
  const localizedNextProject = getLocalizedProject(nextProject, language)
  const localizedPrevProject = getLocalizedProject(prevProject, language)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    }
  }, [id])

  if (!project) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen pt-24 flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-navy mb-4">
            {t('projectDetail.notFound.title')}
          </h1>
          <p className="text-navy/60 font-body mb-8">
            {t('projectDetail.notFound.description')}
          </p>
          <Link
            to={getRoute('/projekti')}
            className="inline-block px-6 py-3 bg-navy text-cream font-display font-medium rounded-full hover:bg-orange transition-colors"
          >
            {t('projectDetail.notFound.backButton')}
          </Link>
        </div>
      </motion.div>
    )
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
      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.img
          src={project.image}
          alt={localizedProject.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-8 left-6 lg:left-12"
        >
          <Link
            to={getRoute('/projekti')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-cream font-display font-medium rounded-full hover:bg-white/20 transition-colors"
            data-cursor="Back"
          >
            <span>←</span>
            <span>{t('projectDetail.allProjects')}</span>
          </Link>
        </motion.div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-orange text-cream font-display text-sm font-semibold rounded-full mb-4"
            >
              {project.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream"
            >
              {localizedProject.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-2xl font-bold text-navy mb-6">
                {t('projectDetail.aboutProject')}
              </h2>
              <p className="text-navy/70 font-body text-lg leading-relaxed whitespace-pre-line">
                {localizedProject.fullDescription}
              </p>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              {/* Client */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-display font-semibold text-navy mb-2">
                  {t('projectDetail.client')}
                </h3>
                <p className="text-navy/70 font-body">{localizedProject.client}</p>
              </div>

              {/* Year */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-display font-semibold text-navy mb-2">
                  {t('projectDetail.year')}
                </h3>
                <p className="text-navy/70 font-body">{project.year}</p>
              </div>

              {/* Technologies */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-display font-semibold text-navy mb-4">
                  {t('projectDetail.technologies')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-navy/5 text-navy font-body text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation between projects */}
      <section className="py-12 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <Link
              to={getProjectRoute(prevProject.id)}
              className="group flex items-center gap-4"
              data-cursor="Prev"
            >
              <motion.span
                className="text-cream/60 group-hover:text-orange transition-colors"
                whileHover={{ x: -5 }}
              >
                ←
              </motion.span>
              <div className="hidden sm:block">
                <span className="block text-cream/40 font-body text-sm">
                  {t('projectDetail.prevProject')}
                </span>
                <span className="block text-cream font-display font-medium group-hover:text-orange transition-colors">
                  {localizedPrevProject.title}
                </span>
              </div>
            </Link>

            <Link
              to={getRoute('/projekti')}
              className="px-6 py-3 border border-cream/30 text-cream font-display font-medium rounded-full hover:bg-cream hover:text-navy transition-all"
              data-cursor="All"
            >
              {t('projectDetail.allProjects')}
            </Link>

            <Link
              to={getProjectRoute(nextProject.id)}
              className="group flex items-center gap-4"
              data-cursor="Next"
            >
              <div className="hidden sm:block text-right">
                <span className="block text-cream/40 font-body text-sm">
                  {t('projectDetail.nextProject')}
                </span>
                <span className="block text-cream font-display font-medium group-hover:text-orange transition-colors">
                  {localizedNextProject.title}
                </span>
              </div>
              <motion.span
                className="text-cream/60 group-hover:text-orange transition-colors"
                whileHover={{ x: 5 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default ProjectDetailPage

