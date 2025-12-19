import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import useMousePosition from '../../hooks/useMousePosition'
import useMediaQuery from '../../hooks/useMediaQuery'

function CustomCursor() {
  const { x, y } = useMousePosition()
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState('')
  const [isClicking, setIsClicking] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })
  
  const cursorXDelayed = useSpring(0, { stiffness: 150, damping: 20 })
  const cursorYDelayed = useSpring(0, { stiffness: 150, damping: 20 })

  useEffect(() => {
    cursorX.set(x)
    cursorY.set(y)
    cursorXDelayed.set(x)
    cursorYDelayed.set(y)
  }, [x, y, cursorX, cursorY, cursorXDelayed, cursorYDelayed])

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setIsHovering(true)
        setHoverText(target.dataset.cursor || '')
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setIsHovering(false)
        setHoverText('')
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-orange rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXDelayed,
          y: cursorYDelayed,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border-2 border-navy"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            backgroundColor: isHovering ? 'rgba(232, 111, 58, 0.1)' : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-xs font-medium text-navy uppercase tracking-wider"
            >
              {hoverText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

export default CustomCursor

