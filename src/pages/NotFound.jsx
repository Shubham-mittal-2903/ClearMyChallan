import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import BackgroundOrbs from '../components/ui/BackgroundOrbs.jsx'
import useSEO from '../hooks/useSEO.js'

export default function NotFound() {
  useSEO({ title: 'Page not found', path: '/404' })
  useEffect(() => {
    const m = document.createElement('meta')
    m.name = 'robots'
    m.content = 'noindex'
    document.head.appendChild(m)
    return () => m.remove()
  }, [])
  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navbar />
      <main className="relative z-10 pt-36 pb-24">
        <div className="section-pad max-w-xl mx-auto text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-navy">
            This page took a wrong turn
          </h1>
          <p className="mt-3 text-ink-500">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/" className="btn-primary">
              Back to home
            </Link>
            <Link to="/track" className="btn-secondary">
              Track a case
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
