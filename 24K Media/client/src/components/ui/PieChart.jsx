import { motion } from 'framer-motion'

// Animated SVG donut chart with a legend. data: [{ label, value, color }].
export default function PieChart({ data, size = 180, thickness = 24, centerLabel, centerSub }) {
  const total = data.reduce((a, d) => a + d.value, 0) || 1
  const cx = size / 2
  const cy = size / 2
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="piechart">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="piechart__svg">
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--line)" strokeWidth={thickness} />
          {data.map((d, i) => {
            const len = (d.value / total) * c
            const gap = Math.min(3, len * 0.4)
            const seg = (
              <motion.circle
                key={d.label}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={`${Math.max(len - gap, 0.5)} ${c - Math.max(len - gap, 0.5)}`}
                strokeDashoffset={-offset}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'center' }}
              />
            )
            offset += len
            return seg
          })}
        </g>
        {centerLabel && (
          <>
            <text x={cx} y={cy - 1} textAnchor="middle" className="piechart__center">{centerLabel}</text>
            {centerSub && <text x={cx} y={cy + 16} textAnchor="middle" className="piechart__centersub">{centerSub}</text>}
          </>
        )}
      </svg>

      <ul className="piechart__legend">
        {data.map((d) => (
          <li key={d.label}>
            <span className="piechart__dot" style={{ background: d.color }} />
            <span className="piechart__lbl">{d.label}</span>
            <b>{Math.round((d.value / total) * 100)}%</b>
          </li>
        ))}
      </ul>
    </div>
  )
}
