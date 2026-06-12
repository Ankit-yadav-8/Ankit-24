// Tiny deterministic helpers so every service/solution gets a unique but
// stable "growth" curve — no data bloat, no external charting library.

function hashStr(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// A mostly-upward series with its OWN growth rate, volatility and the odd
// pullback — so two seeds produce visibly different shapes, not clones.
export function seededTrend(seed, n = 10) {
  const rnd = mulberry32(hashStr(String(seed)))
  const volatility = 0.06 + rnd() * 0.16
  const baseGrowth = 0.05 + rnd() * 0.24
  let v = 45 + rnd() * 55
  const out = [v]
  for (let i = 1; i < n; i++) {
    const dip = rnd() < 0.22 ? 1 - volatility * (1 + rnd()) : 1
    const growth = 1 + baseGrowth * (0.55 + rnd() * 0.95)
    v = Math.max(8, v * growth * dip * (1 - volatility / 2 + rnd() * volatility))
    out.push(v)
  }
  return out.map((x) => Math.round(x))
}

// N deterministic integers in [min, max] from a seed (for KPIs, splits, bars).
export function seededValues(seed, n, min = 0, max = 100) {
  const rnd = mulberry32(hashStr(String(seed)))
  return Array.from({ length: n }, () => Math.round(min + rnd() * (max - min)))
}

// Catmull-Rom → cubic-bezier smoothing for a clean, organic line.
export function smoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x},${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`
  }
  return d
}

// Map a data array into viewBox points.
export function toPoints(data, w, h, pad = 10) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const stepX = (w - pad * 2) / (data.length - 1)
  return data.map((d, i) => ({
    x: pad + i * stepX,
    y: pad + (h - pad * 2) * (1 - (d - min) / span),
  }))
}
