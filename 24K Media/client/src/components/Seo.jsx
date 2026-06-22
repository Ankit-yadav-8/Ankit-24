import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

// Single source of truth for the production domain.
export const SITE_URL = 'https://24kmedia.in'
// Swap to a dedicated 1200×630 share image (e.g. /og-image.jpg) when ready.
const DEFAULT_OG = `${SITE_URL}/logo.png`
const SUFFIX = '24K Media'

/**
 * Per-route SEO. Renders <title>, description, canonical, Open Graph,
 * Twitter card and (optionally) JSON-LD structured data.
 *
 * @param {string}  title        Page title (a " — 24K Media" suffix is added unless `bare`).
 * @param {string}  description  Meta description.
 * @param {string}  [path]       Canonical path (defaults to the current route).
 * @param {string}  [image]      Absolute OG/Twitter image URL.
 * @param {boolean} [noindex]    Hide the page from search engines.
 * @param {object}  [jsonLd]     Schema.org object injected as <script type="application/ld+json">.
 * @param {boolean} [bare]       Use `title` verbatim (no brand suffix).
 */
export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_OG,
  noindex = false,
  jsonLd,
  bare = false,
}) {
  const location = useLocation()
  const cleanPath = (path ?? location.pathname).replace(/\/+$/, '') || '/'
  const url = cleanPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${cleanPath}`
  const fullTitle = !title ? SUFFIX : bare ? title : `${title} — ${SUFFIX}`

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="24K Media" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
