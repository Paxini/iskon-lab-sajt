import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { getLocalizedProject } from '../../data/projects'

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const { t, getProjectRoute, language } = useLanguage()
  
  // Get localized project data
  const localizedProject = getLocalizedProject(project, language)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        layout: { duration: 0.4 },
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={getProjectRoute(project.id)} data-cursor="View">
        <motion.div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-dark"
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image */}
          <motion.img
            src={project.image}
            alt={localizedProject.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* Category badge */}
          <motion.span
            className="absolute top-4 left-4 px-3 py-1 bg-orange text-cream text-xs font-display font-semibold rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {project.category}
          </motion.span>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h3
              className="font-display text-xl font-bold text-cream mb-2"
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {localizedProject.title}
            </motion.h3>

            <motion.p
              className="text-cream/70 font-body text-sm line-clamp-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.3 }}
            >
              {localizedProject.description}
            </motion.p>

            {/* View project button */}
            <motion.div
              className="flex items-center gap-2 mt-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -20,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="text-orange font-display font-semibold text-sm">
                {t('portfolio.viewProject')}
              </span>
              <motion.span
                className="text-orange"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Corner accent on hover */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-20"
            initial={{ x: 50, y: -50 }}
            animate={{ 
              x: isHovered ? 0 : 50, 
              y: isHovered ? 0 : -50,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div 
              className="w-full h-full rounded-bl-[40px]"
              style={{ backgroundColor: `${project.color}40` }}
            />
          </motion.div>

          {/* Animated border */}
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

export default ProjectCard
