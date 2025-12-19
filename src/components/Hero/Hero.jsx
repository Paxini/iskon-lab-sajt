import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FloatingShapes from './FloatingShapes'
import AnimatedLogo from './AnimatedLogo'
import MagneticButton from '../ui/MagneticButton'
import { useLanguage } from '../../context/LanguageContext'

function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element && window.lenis) {
      window.lenis.scrollTo(element, { offset: -100 })
    }
  }

  const scrollToServices = () => {
    const element = document.querySelector('#services')
    if (element && window.lenis) {
      window.lenis.scrollTo(element, { offset: -100 })
    }
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* Floating Shapes Background */}
      <FloatingShapes />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/50 to-cream pointer-events-none" />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center"
      >
        {/* Animated Logo */}
        <AnimatedLogo />

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 mb-12"
        >
          <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-navy/80 font-medium">
            {t('hero.tagline')}
          </h2>
          <p className="mt-4 text-navy/60 font-body text-lg max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={scrollToContact}
            className="px-8 py-4 bg-navy text-cream font-display font-semibold rounded-full hover:bg-orange transition-all duration-300 shadow-lg hover:shadow-xl"
            data-cursor="Start"
          >
            {t('hero.cta')}
          </MagneticButton>

          <MagneticButton
            onClick={scrollToServices}
            className="px-8 py-4 border-2 border-navy text-navy font-display font-semibold rounded-full hover:bg-navy hover:text-cream transition-all duration-300"
            data-cursor="View"
          >
            {t('hero.ourServices')}
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-navy/50 text-xs font-body uppercase tracking-widest">
            {t('hero.scroll')}
          </span>
          <div className="w-6 h-10 border-2 border-navy/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-orange rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

