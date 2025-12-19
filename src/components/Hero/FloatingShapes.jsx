import { motion } from 'framer-motion'
import { useMousePosition } from '../../hooks/useMousePosition'

const shapes = [
  // Large shapes
  { type: 'circle', size: 120, x: '10%', y: '20%', delay: 0, duration: 8 },
  { type: 'circle', size: 80, x: '85%', y: '15%', delay: 0.5, duration: 7 },
  { type: 'rectangle', size: 100, x: '75%', y: '70%', delay: 1, duration: 9 },
  { type: 'circle', size: 60, x: '20%', y: '75%', delay: 1.5, duration: 6 },
  
  // Medium shapes
  { type: 'circle', size: 40, x: '50%', y: '10%', delay: 0.3, duration: 7 },
  { type: 'rectangle', size: 50, x: '30%', y: '50%', delay: 0.8, duration: 8 },
  { type: 'circle', size: 35, x: '90%', y: '45%', delay: 1.2, duration: 6 },
  { type: 'circle', size: 45, x: '5%', y: '55%', delay: 0.6, duration: 7 },
  
  // Small shapes
  { type: 'circle', size: 20, x: '40%', y: '30%', delay: 0.4, duration: 5 },
  { type: 'circle', size: 25, x: '60%', y: '60%', delay: 0.9, duration: 6 },
  { type: 'circle', size: 15, x: '15%', y: '40%', delay: 1.1, duration: 4 },
  { type: 'rectangle', size: 30, x: '70%', y: '25%', delay: 0.7, duration: 7 },
]

function FloatingShapes() {
  const { x: mouseX, y: mouseY } = useMousePosition()

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.type === 'rectangle' ? shape.size * 1.5 : shape.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: 1,
            y: [0, -30, 0],
            rotate: shape.type === 'rectangle' ? [0, 5, -5, 0] : [0, 10, -10, 0],
            x: mouseX ? (mouseX - window.innerWidth / 2) * 0.01 * (index % 3 + 1) : 0,
          }}
          transition={{
            opacity: {
              duration: shape.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            y: {
              duration: shape.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            },
            rotate: {
              duration: shape.duration * 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            },
            scale: {
              duration: 0.8,
              delay: shape.delay,
              ease: [0.22, 1, 0.36, 1],
            },
            x: {
              duration: 0.5,
              ease: 'easeOut',
            }
          }}
        >
          <div
            className={`w-full h-full bg-orange ${
              shape.type === 'circle' ? 'rounded-full' : 'rounded-3xl'
            }`}
            style={{
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      ))}

      {/* Gradient blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(232, 111, 58, 0.08) 0%, transparent 70%)',
          left: '60%',
          top: '20%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(26, 39, 68, 0.05) 0%, transparent 70%)',
          left: '20%',
          top: '60%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export default FloatingShapes

