import { motion } from 'framer-motion'

function AnimatedLogo() {
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const logoTitle = 'ISKON LAB'
  const letters = logoTitle.split('')

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Animated Icon */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left dots */}
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`dot-${i}`}
              className="w-4 h-4 rounded-full bg-orange"
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{
                delay: 0.1 + i * 0.1,
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
              }}
            />
          ))}
        </div>
        
        {/* Main rectangle - zaobljen gore-levo i dole-desno, blago zaobljen gore-desno i dole-levo */}
        <motion.div
          className="w-8 h-20 bg-orange"
          style={{
            borderRadius: '12px 3px 12px 3px', // tl, tr, br, bl
          }}
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            type: 'spring',
            stiffness: 150,
          }}
        />
      </motion.div>

      {/* Animated Title */}
      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-navy tracking-tight flex overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{ 
              transformOrigin: 'bottom center',
              marginRight: letter === ' ' ? '0.3em' : '0',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.h1>

      {/* Animated underline */}
      <motion.div
        className="h-1 bg-orange rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{
          delay: 1,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  )
}

export default AnimatedLogo

