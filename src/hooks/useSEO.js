import { useEffect } from 'react'

const DEFAULT_TITLE = 'ClearMyChallan — Check Challan Status & Resolve from 60% of Fine'
const DEFAULT_DESC =
  'Check your vehicle challan status instantly. Resolve pending e-Challans via licensed legal professionals at city-based prices from 60% of the fine. Disposed in 20–25 days or full refund. Pan-India.'
const SITE_URL = 'https://www.clearmychallan.co.in'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets document title + meta description/OG/Twitter tags per route.
 * Restores site defaults on unmount so navigating away doesn't leak
 * a blog post's title into the homepage tab.
 */
export function useSEO({ title, description, path = '/' } = {}) {
  useEffect(() => {
    const finalTitle = title ? `${title} | ClearMyChallan` : DEFAULT_TITLE
    const finalDesc = description || DEFAULT_DESC
    const url = `${SITE_URL}${path}`

    document.title = finalTitle
    setMeta('description', finalDesc)
    setMeta('og:title', finalTitle, 'property')
    setMeta('og:description', finalDesc, 'property')
    setMeta('og:url', url, 'property')
    setMeta('twitter:title', finalDesc)
    setMeta('twitter:description', finalDesc)
    setCanonical(url)

    return () => {
      document.title = DEFAULT_TITLE
      setMeta('description', DEFAULT_DESC)
      setMeta('og:title', DEFAULT_TITLE, 'property')
      setMeta('og:description', DEFAULT_DESC, 'property')
      setMeta('og:url', SITE_URL, 'property')
      setCanonical(`${SITE_URL}/`)
    }
  }, [title, description, path])
}

export default useSEO
