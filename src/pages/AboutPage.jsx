import { useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const stats = [
  { number: '2', label: 'Osnivača' },
  { number: 'ETF', label: 'Beograd' },
  { number: '∞', label: 'Ideja' },
]

const values = [
  {
    title: 'Tehnička izvrsnost',
    description: 'Softversko inženjerstvo nije samo posao — to je način razmišljanja. Svaki problem ima elegantno rešenje.',
    icon: '⚡',
  },
  {
    title: 'Razumevanje tržišta',
    description: 'Kod bez konteksta je samo tekst. Mi razumemo ljude, trendove i šta pokreće odluke.',
    icon: '🎯',
  },
  {
    title: 'Kreativna hrabrost',
    description: 'Studenti smo — nemamo šta da izgubimo. To nam daje slobodu da budemo drugačiji.',
    icon: '🚀',
  },
]

function AboutPage() {
  const heroRef = useRef(null)
  const storyRef = useRef(null)
  const valuesRef = useRef(null)
  
  const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' })
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    }
  }, [])

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      {/* Hero Section - Big Typography */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 text-[20rem] font-display font-bold text-white/[0.02] select-none"
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >
            &lt;/&gt;
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-[15rem] font-display font-bold text-orange/[0.05] select-none"
            animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ?
          </motion.div>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-orange/20 text-orange font-display text-sm font-semibold rounded-full mb-8">
              O nama
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-tight mb-8"
          >
            Studenti koji
            <br />
            <span className="text-orange">grade budućnost</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-cream/60 font-body text-xl max-w-2xl mx-auto"
          >
            Između predavanja na ETF-u i ponoćnog kodiranja, pronašli smo nešto 
            što nas pokreće — spoj tehnologije i razumevanja ljudi.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-12 md:gap-20 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <span className="block font-display text-5xl md:text-6xl font-bold text-orange">
                  {stat.number}
                </span>
                <span className="text-cream/60 font-body text-sm uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-cream/40 text-xs font-body uppercase tracking-widest">
              Naša priča
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-orange to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section - The Origin */}
      <section ref={storyRef} className="py-32 bg-cream relative overflow-hidden">
        {/* Big background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="text-[25rem] font-display font-bold text-navy/[0.02] whitespace-nowrap">
            ISKON
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6">
              Kako je sve <span className="text-orange">počelo</span>
            </h2>
          </motion.div>

          <div className="space-y-24">
            {/* Chapter 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <span className="text-orange font-display font-bold text-8xl md:text-9xl opacity-20">
                  01
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-navy -mt-8 mb-4">
                  ETF Beograd
                </h3>
                <p className="text-navy/70 font-body text-lg leading-relaxed">
                  Elektrotehnički fakultet nas je naučio da razmišljamo sistemski. 
                  Algoritmi, strukture podataka, softversko inženjerstvo — temelji 
                  na kojima gradimo sve što radimo. Ali fakultet nas je naučio i 
                  nečem drugom: da najbolja rešenja nastaju kada se teorija susretne 
                  sa stvarnim svetom.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  className="text-center p-12 bg-navy rounded-3xl"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="font-display text-6xl md:text-7xl font-bold text-cream block mb-2">
                    {'{ }'}
                  </span>
                  <span className="text-cream/60 font-body text-sm uppercase tracking-wider">
                    Softversko inženjerstvo
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Chapter 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1 flex items-center justify-center">
                <motion.div
                  className="text-center p-12 bg-orange rounded-3xl"
                  whileHover={{ scale: 1.02, rotate: -1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="font-display text-6xl md:text-7xl font-bold text-cream block mb-2">
                    ?!
                  </span>
                  <span className="text-cream/80 font-body text-sm uppercase tracking-wider">
                    Istraživanje tržišta
                  </span>
                </motion.div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-orange font-display font-bold text-8xl md:text-9xl opacity-20">
                  02
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-navy -mt-8 mb-4">
                  Razumevanje ljudi
                </h3>
                <p className="text-navy/70 font-body text-lg leading-relaxed">
                  Paralelno sa studijama, zaronili smo u svet istraživanja javnog 
                  mnjenja i fokus grupa. Naučili smo da slušamo, da postavljamo prava 
                  pitanja, da razumemo šta ljudi zaista žele — ne šta kažu da žele. 
                  Ova veština se pokazala neprocenjivom u dizajnu proizvoda i 
                  marketingu.
                </p>
              </div>
            </motion.div>

            {/* Chapter 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-orange font-display font-bold text-8xl md:text-9xl opacity-20">
                03
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-navy -mt-8 mb-4">
                Iskon Lab
              </h3>
              <p className="text-navy/70 font-body text-lg leading-relaxed mb-8">
                Tako je nastao Iskon Lab — laboratorija gde se spajaju kod i 
                empatija, algoritmi i intuicija, tehnologija i razumevanje 
                ljudi. Ime "Iskon" znači početak, izvor — i to je upravo ono 
                što želimo da budemo za vaše projekte.
              </p>
              <motion.div
                className="inline-flex items-center gap-4 px-8 py-4 bg-navy/5 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-4xl">💡</span>
                <span className="font-display font-semibold text-navy">
                  Kod + Empatija = Rezultati
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-32 bg-navy relative overflow-hidden">
        {/* Background decoration */}
        <motion.div
          className="absolute -right-40 top-1/2 -translate-y-1/2 text-[30rem] font-display font-bold text-white/[0.02] select-none"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        >
          ★
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Šta nas <span className="text-orange">definiše</span>
            </h2>
            <p className="text-cream/60 font-body text-lg max-w-2xl mx-auto">
              Tri principa koja nas vode u svakom projektu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/10 hover:border-orange/50 transition-colors"
                  whileHover={{ y: -10 }}
                >
                  <span className="text-5xl mb-6 block">{value.icon}</span>
                  <h3 className="font-display text-xl font-bold text-cream mb-4">
                    {value.title}
                  </h3>
                  <p className="text-cream/60 font-body leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Statement Section */}
      <section className="py-32 bg-cream relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-navy leading-none block mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              MI NE SAMO
              <br />
              <span className="text-orange">KODIRAMO</span>
            </motion.span>
            <motion.p
              className="text-navy/60 font-body text-xl md:text-2xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Mi slušamo, istražujemo, razumemo — i tek onda stvaramo rešenja 
              koja zaista funkcionišu.
            </motion.p>
          </motion.div>
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
              Spremni da započnemo?
            </h2>
            <p className="text-cream/60 font-body text-lg mb-8">
              Vaša ideja zaslužuje tim koji će je razumeti i realizovati.
            </p>
            <Link
              to="/#contact"
              className="inline-block px-8 py-4 bg-orange text-cream font-display font-semibold rounded-full hover:bg-cream hover:text-navy transition-all duration-300"
              data-cursor="Go"
            >
              Kontaktirajte nas
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default AboutPage

