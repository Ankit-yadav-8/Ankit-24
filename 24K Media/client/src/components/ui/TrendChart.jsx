import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { smoothPath, toPoints } from '../../lib/charts.js'

const ease = [0.22, 1, 0.36, 1]
const W = 640

// Dependency-free animated line/area chart. Scales fluidly (width:100%),
// draws itself in on scroll, and shows a tooltip on hover when interactive.
export default function TrendChart({
  data,
  color = 'var(--gold)',
  height = 150,
  labels,
  format = (v) => v.toLocaleString(),
  showDots = true,
  showGrid = true,
  area = true,
  interactive = true,
  className = '',
}) {
  const uid = useId().replace(/[:]/g, '')
  const H = height
  const pts = toPoints(data, W, H, 16)
  const line = smoothPath(pts)
  const last = pts[pts.length - 1]
  const areaPath = `${line} L ${last.x},${H} L ${pts[0].x},${H} Z`
  const stepX = pts.length > 1 ? pts[1].x - pts[0].x : W
  const [hover, setHover] = useState(null)

  return (
    <div className={`trendchart ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="trendchart__svg" role="img" aria-label="Growth trend">
        <defs>
          <linearGradient id={`a-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`l-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>

        {showGrid &&
          [0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="trendchart__grid" />
          ))}

        {area && (
          <motion.path
            d={areaPath}
            fill={`url(#a-${uid})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          />
        )}

        <motion.path
          d={line}
          fill="none"
          stroke={`url(#l-${uid})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease }}
        />

        {showDots &&
          pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hover === i ? 6.5 : 3.4}
              className="trendchart__dot"
              style={{ fill: color }}
            />
          ))}

        {interactive && (
          <>
            {hover != null && (
              <line
                x1={pts[hover].x}
                x2={pts[hover].x}
                y1="0"
                y2={H}
                className="trendchart__cursor"
                style={{ stroke: color }}
              />
            )}
            {pts.map((p, i) => (
              <rect
                key={`h${i}`}
                x={p.x - stepX / 2}
                y="0"
                width={stepX}
                height={H}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </>
        )}
      </svg>

      {interactive && hover != null && (
        <div
          className="trendchart__tip"
          style={{
            left: `${(pts[hover].x / W) * 100}%`,
            top: `${(pts[hover].y / H) * 100}%`,
            '--tip-accent': color,
          }}
        >
          {labels && <b>{labels[hover]}</b>}
          <span>{format(data[hover])}</span>
        </div>
      )}
    </div>
  )
}
