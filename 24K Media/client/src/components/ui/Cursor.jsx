import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Custom gold cursor with magnetic-style ring that grows over interactive elements.
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.5 })
  const dotX = useSpring(x, { stiffness: 800, damping: 35 })
  const dotY = useSpring(y, { stiffness: 800, damping: 35 })
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only enable on devices with a fine pointer.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const interactive = e.target.closest('a, button, [data-cursor="hover"], input, textarea, select')
      setHovering(Boolean(interactive))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }} />
      <motion.div
        className={`cursor-ring ${hovering ? 'is-hovering' : ''}`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
