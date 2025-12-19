import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import MagneticButton from '../components/ui/MagneticButton'
import { useLanguage } from '../context/LanguageContext'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Services and process steps are now defined inside ServicesPage component with translations

function ServiceSection({ service, index, isActive, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`border-b border-navy/10 last:border-b-0 ${isActive ? 'bg-navy/[0.02]' : ''}`}
    >
      {/* Accordion Header */}
      <motion.button
        onClick={onClick}
        className="w-full py-8 px-6 lg:px-12 flex items-center justify-between gap-8 text-left group"
        data-cursor="Expand"
      >
        <div className="flex items-center gap-6 lg:gap-12">
          <motion.span
            className="text-4xl lg:text-5xl"
            animate={{ rotate: isActive ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {service.icon}
          </motion.span>
          <div>
            <h3 className="font-display text-2xl lg:text-4xl font-bold text-navy group-hover:text-orange transition-colors">
              {service.title}
            </h3>
            <p className="text-navy/60 font-body mt-1">{service.subtitle}</p>
          </div>
        </div>
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-navy/20 flex items-center justify-center flex-shrink-0"
          animate={{ 
            rotate: isActive ? 180 : 0,
            borderColor: isActive ? '#e86f3a' : 'rgba(26, 39, 68, 0.2)',
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-2xl text-navy">↓</span>
        </motion.div>
      </motion.button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 lg:px-12 pb-12">
              {/* Description */}
              <div className="max-w-3xl mb-12">
                <p className="text-navy/70 font-body text-lg leading-relaxed">
                  {service.longDescription}
                </p>
              </div>

              {/* Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {service.capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <h4 className="font-display font-semibold text-navy mb-4">
                      {cap.title}
                    </h4>
                    <ul className="space-y-2">
                      {cap.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-navy/70 font-body text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Process */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-navy/40 font-display text-sm uppercase tracking-wider">
                  {t('servicesPage.process')}
                </span>
                {service.process.map((step, i) => (
                  <motion.span
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="px-4 py-2 bg-navy/5 rounded-full font-display text-sm font-medium text-navy">
                      {step}
                    </span>
                    {i < service.process.length - 1 && (
                      <span className="text-orange">→</span>
                    )}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ServicesPage() {
  const [activeService, setActiveService] = useState(null)
  const processRef = useRef(null)
  const accordionRef = useRef(null)
  const isProcessInView = useInView(processRef, { once: true, margin: '-100px' })
  const location = useLocation()
  const navigate = useNavigate()
  const { t, getRoute } = useLanguage()

  // Translated services data
  const services = [
    {
      id: 'web-development',
      title: t('servicesPage.services.webDevelopment.title'),
      subtitle: t('servicesPage.services.webDevelopment.subtitle'),
      icon: '{ }',
      color: '#1a2744',
      description: t('servicesPage.services.webDevelopment.description'),
      longDescription: t('servicesPage.services.webDevelopment.longDescription'),
      capabilities: [
        {
          title: t('servicesPage.services.webDevelopment.capabilities.frontend.title'),
          items: t('servicesPage.services.webDevelopment.capabilities.frontend.items'),
        },
        {
          title: t('servicesPage.services.webDevelopment.capabilities.backend.title'),
          items: t('servicesPage.services.webDevelopment.capabilities.backend.items'),
        },
        {
          title: t('servicesPage.services.webDevelopment.capabilities.specializations.title'),
          items: t('servicesPage.services.webDevelopment.capabilities.specializations.items'),
        },
      ],
      process: t('servicesPage.services.webDevelopment.process'),
    },
    {
      id: 'mobile-apps',
      title: t('servicesPage.services.mobileApps.title'),
      subtitle: t('servicesPage.services.mobileApps.subtitle'),
      icon: '📱',
      color: '#e86f3a',
      description: t('servicesPage.services.mobileApps.description'),
      longDescription: t('servicesPage.services.mobileApps.longDescription'),
      capabilities: [
        {
          title: t('servicesPage.services.mobileApps.capabilities.platforms.title'),
          items: t('servicesPage.services.mobileApps.capabilities.platforms.items'),
        },
        {
          title: t('servicesPage.services.mobileApps.capabilities.features.title'),
          items: t('servicesPage.services.mobileApps.capabilities.features.items'),
        },
        {
          title: t('servicesPage.services.mobileApps.capabilities.integrations.title'),
          items: t('servicesPage.services.mobileApps.capabilities.integrations.items'),
        },
      ],
      process: t('servicesPage.services.mobileApps.process'),
    },
    {
      id: 'digital-marketing',
      title: t('servicesPage.services.digitalMarketing.title'),
      subtitle: t('servicesPage.services.digitalMarketing.subtitle'),
      icon: '📈',
      color: '#2d5a45',
      description: t('servicesPage.services.digitalMarketing.description'),
      longDescription: t('servicesPage.services.digitalMarketing.longDescription'),
      capabilities: [
        {
          title: t('servicesPage.services.digitalMarketing.capabilities.seo.title'),
          items: t('servicesPage.services.digitalMarketing.capabilities.seo.items'),
        },
        {
          title: t('servicesPage.services.digitalMarketing.capabilities.paid.title'),
          items: t('servicesPage.services.digitalMarketing.capabilities.paid.items'),
        },
        {
          title: t('servicesPage.services.digitalMarketing.capabilities.analytics.title'),
          items: t('servicesPage.services.digitalMarketing.capabilities.analytics.items'),
        },
      ],
      process: t('servicesPage.services.digitalMarketing.process'),
    },
    {
      id: 'branding',
      title: t('servicesPage.services.branding.title'),
      subtitle: t('servicesPage.services.branding.subtitle'),
      icon: '✨',
      color: '#9c4d97',
      description: t('servicesPage.services.branding.description'),
      longDescription: t('servicesPage.services.branding.longDescription'),
      capabilities: [
        {
          title: t('servicesPage.services.branding.capabilities.visual.title'),
          items: t('servicesPage.services.branding.capabilities.visual.items'),
        },
        {
          title: t('servicesPage.services.branding.capabilities.materials.title'),
          items: t('servicesPage.services.branding.capabilities.materials.items'),
        },
        {
          title: t('servicesPage.services.branding.capabilities.strategy.title'),
          items: t('servicesPage.services.branding.capabilities.strategy.items'),
        },
      ],
      process: t('servicesPage.services.branding.process'),
    },
  ]

  const processSteps = [
    {
      number: '01',
      title: t('servicesPage.ourProcess.steps.step1.title'),
      description: t('servicesPage.ourProcess.steps.step1.description'),
    },
    {
      number: '02',
      title: t('servicesPage.ourProcess.steps.step2.title'),
      description: t('servicesPage.ourProcess.steps.step2.description'),
    },
    {
      number: '03',
      title: t('servicesPage.ourProcess.steps.step3.title'),
      description: t('servicesPage.ourProcess.steps.step3.description'),
    },
    {
      number: '04',
      title: t('servicesPage.ourProcess.steps.step4.title'),
      description: t('servicesPage.ourProcess.steps.step4.description'),
    },
    {
      number: '05',
      title: t('servicesPage.ourProcess.steps.step5.title'),
      description: t('servicesPage.ourProcess.steps.step5.description'),
    },
  ]

  const whyUsItems = [
    {
      title: t('servicesPage.whyUs.items.understand.title'),
      description: t('servicesPage.whyUs.items.understand.description'),
      icon: '🎯',
    },
    {
      title: t('servicesPage.whyUs.items.excellence.title'),
      description: t('servicesPage.whyUs.items.excellence.description'),
      icon: '⚡',
    },
    {
      title: t('servicesPage.whyUs.items.transparency.title'),
      description: t('servicesPage.whyUs.items.transparency.description'),
      icon: '🔍',
    },
    {
      title: t('servicesPage.whyUs.items.dedication.title'),
      description: t('servicesPage.whyUs.items.dedication.description'),
      icon: '💪',
    },
  ]

  const handleContactClick = () => {
    navigate(getRoute('/'))
    setTimeout(() => {
      const element = document.querySelector('#contact')
      if (element && window.lenis) {
        window.lenis.scrollTo(element, { offset: -100 })
      }
    }, 100)
  }

  useEffect(() => {
    // Check if there's a hash in the URL (e.g., #web-development)
    const hash = location.hash.replace('#', '')
    
    if (hash && services.some(s => s.id === hash)) {
      // Open the corresponding accordion
      setActiveService(hash)
      
      // Scroll to accordion section after a short delay
      setTimeout(() => {
        if (accordionRef.current) {
          const yOffset = -120 // Account for fixed nav
          const element = accordionRef.current
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          
          if (window.lenis) {
            window.lenis.scrollTo(y, { duration: 1.2 })
          } else {
            window.scrollTo({ top: y, behavior: 'smooth' })
          }
        }
      }, 300)
    } else {
      // No hash, scroll to top
      window.scrollTo(0, 0)
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      }
    }
  }, [location])

  const toggleService = (id) => {
    setActiveService(activeService === id ? null : id)
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-32 bg-navy overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 right-10 text-[20rem] font-display font-bold text-white/[0.02] select-none"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          >
            ★
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-10 text-[15rem] font-display font-bold text-orange/[0.05] select-none"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >
            &lt;/&gt;
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-2 bg-orange/20 text-orange font-display text-sm font-semibold rounded-full mb-8">
              {t('servicesPage.badge')}
            </span>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-8">
              {t('servicesPage.heroTitle')}
              <br />
              <span className="text-orange">{t('servicesPage.heroTitleHighlight')}</span>
            </h1>

            <p className="text-cream/60 font-body text-xl max-w-2xl mx-auto">
              {t('servicesPage.heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Accordion */}
      <section ref={accordionRef} className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-16 px-6"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              {t('servicesPage.clickToLearn')}
            </h2>
            <p className="text-navy/60 font-body">
              {t('servicesPage.eachService')}
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {services.map((service, index) => (
              <ServiceSection
                key={service.id}
                service={service}
                index={index}
                isActive={activeService === service.id}
                onClick={() => toggleService(service.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-32 bg-navy relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            {t('servicesPage.ourProcess.title')} <span className="text-orange">{t('servicesPage.ourProcess.titleHighlight')}</span>
          </h2>
          <p className="text-cream/60 font-body text-lg max-w-2xl mx-auto">
            {t('servicesPage.ourProcess.description')}
          </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-orange to-transparent z-0" />
                )}

                <motion.div
                  className="relative z-10 text-center"
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="inline-block w-16 h-16 rounded-full bg-orange text-cream font-display text-xl font-bold flex items-center justify-center mb-4 mx-auto">
                    {step.number}
                  </span>
                  <h3 className="font-display text-xl font-bold text-cream mb-2">
                    {step.title}
                  </h3>
                  <p className="text-cream/60 font-body text-sm">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="text-[20rem] font-display font-bold text-navy/[0.02] whitespace-nowrap">
            WHY?
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
            {t('servicesPage.whyUs.title')} <span className="text-orange">{t('servicesPage.whyUs.titleHighlight')}</span>
          </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyUsItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-display text-xl font-bold text-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-navy/70 font-body">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="font-display text-3xl md:text-5xl font-bold text-cream mb-6">
              {t('servicesPage.cta.title')}
            </h2>
            <p className="text-cream/60 font-body text-lg mb-8">
              {t('servicesPage.cta.description')}
            </p>
            <button
              onClick={handleContactClick}
              className="inline-block px-8 py-4 bg-orange text-cream font-display font-semibold rounded-full hover:bg-cream hover:text-navy transition-all duration-300"
              data-cursor="Go"
            >
              {t('servicesPage.cta.button')}
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default ServicesPage

