import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function format(n, decimals) {
  const fixed = Number(n).toFixed(decimals)
  const [int, dec] = fixed.split('.')
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return dec ? `${withCommas}.${dec}` : withCommas
}

// Animated count-up that fires once when scrolled into view.
export default function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 1800 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {format(display, decimals)}
      <span className="suffix">{suffix}</span>
    </span>
  )
}
