import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import MagneticButton from '../ui/MagneticButton'
import { useLanguage } from '../../context/LanguageContext'

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const { t, getRoute } = useLanguage()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative group"
      data-cursor="Explore"
    >
      <motion.div
        className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-cream-dark overflow-hidden"
        animate={{
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(26, 39, 68, 0.15)' 
            : '0 10px 40px -10px rgba(26, 39, 68, 0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32"
          initial={{ x: 50, y: -50 }}
          animate={{ 
            x: isHovered ? 0 : 50, 
            y: isHovered ? 0 : -50,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full h-full bg-orange/10 rounded-bl-[80px]" />
        </motion.div>

        {/* Icon */}
        <motion.div
          className="relative w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center mb-6"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
        >
          <span className="text-2xl">{service.icon}</span>
        </motion.div>

        {/* Content */}
        <div style={{ transform: 'translateZ(30px)' }}>
          <motion.h3
            className="font-display text-2xl font-bold text-navy mb-4"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {service.title}
          </motion.h3>

          <p className="text-navy/60 font-body mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features list */}
          <ul className="space-y-2 mb-8">
            {service.features.map((feature, i) => (
              <motion.li
                key={feature}
                className="flex items-center gap-3 text-navy/70 font-body text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-orange"
                  animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
                  transition={{ delay: i * 0.1 }}
                />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link to={`${getRoute('/usluge')}#${service.id}`}>
            <MagneticButton
              className="flex items-center gap-2 text-orange font-display font-semibold group/btn"
              data-cursor="Go"
            >
              <span>{t('services.learnMore')}</span>
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg"
              >
                →
              </motion.span>
            </MagneticButton>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ServiceCard

