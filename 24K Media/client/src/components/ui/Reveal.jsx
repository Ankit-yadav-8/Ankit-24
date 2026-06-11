import { motion } from 'framer-motion'

// Scroll-triggered reveal — staggered, spring-eased, respects reduced motion.
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  className = '',
  once = true,
  amount = 0.25,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
