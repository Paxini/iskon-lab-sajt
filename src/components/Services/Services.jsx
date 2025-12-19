import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ServiceCard from './ServiceCard'

const services = [
  {
    id: 'web-development',
    title: 'Razvoj sajtova',
    description: 'Moderni i brzi web-sajtovi. Od prezentacija do kompleksnih platformi.',
    icon: '{ }',
    features: ['Prodavnice', 'Prezentacije', 'Backoffice', 'API razvoj'],
  },
  {
    id: 'mobile-apps',
    title: 'Aplikacije za telefone',
    description: 'Aplikacije za iOS i Android. Od igle do lokomotive.',
    icon: '📱',
    features: ['iOS & Android', 'Dizajn sajta', 'UI/UX dizajn', 'App Store optimizacija'],
  },
  {
    id: 'digital-marketing',
    title: 'Digitalni marketing i analitika',
    description: 'Nije nam cilj da svi vide vaš sajt, već da svi kupe vaš proizvod.',
    icon: '📈',
    features: ['Istraživanje tržišta', 'Google Ads', 'Društvene mreže', 'Analitika i praćenje rezultata'],
  },
  {
    id: 'branding',
    title: 'Brendiranje',
    description: 'Vizuelni identitet koji ostavlja utisak i gradi poverenje.',
    icon: '✨',
    features: ['Logo dizajn', 'Brand strategija', 'UI/UX dizajn', 'Print materijali'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 bg-cream overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream to-transparent" />
      
      <motion.div
        className="absolute -right-32 top-1/2 w-64 h-64 rounded-full bg-orange/5"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-orange/10 text-orange font-display text-sm font-semibold rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Naše usluge
          </motion.span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6">
            Šta mi <span className="text-orange">radimo</span>
          </h2>
          
          <p className="text-navy/60 font-body text-lg max-w-2xl mx-auto">
            Kombinujemo kreativnost i tehničku ekspertizu da bismo kreirali 
            digitalna rešenja koja pokreću vaš biznis napred.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services

