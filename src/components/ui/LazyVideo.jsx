import React, { useEffect, useRef, useState } from 'react'

// Loads the video file only when it nears the viewport, plays while visible,
// pauses when off-screen. Honors prefers-reduced-motion (no autoplay).
export default function LazyVideo({ src, className = '', ...props }) {
  const ref = useRef(null)
  const [armed, setArmed] = useState(false)
  const [reduce] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true)
          if (!reduce && el.getAttribute('src')) el.play?.().catch(() => {})
        } else {
          el.pause?.()
        }
      },
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  return (
    <video
      ref={ref}
      src={armed ? src : undefined}
      autoPlay={armed && !reduce}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      {...props}
    />
  )
}
