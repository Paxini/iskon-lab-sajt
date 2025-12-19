import { motion } from 'framer-motion'
import Hero from '../components/Hero/Hero'
import Services from '../components/Services/Services'
import Portfolio from '../components/Portfolio/Portfolio'
import Contact from '../components/Contact/Contact'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

function HomePage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </motion.div>
  )
}

export default HomePage

