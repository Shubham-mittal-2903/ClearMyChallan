import React, { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, RotateCcw, Phone, Check } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import FloatingSupport from '../components/FloatingSupport.jsx'
import BackgroundOrbs from '../components/ui/BackgroundOrbs.jsx'
import SavingsCalculator from '../components/SavingsCalculator.jsx'
import { getCity, cities } from '../data/cities.js'
import { pricingTable } from '../data/content.js'
import { blogPosts } from '../data/blog.js'
import { SITE } from '../data/site.js'
import useSEO from '../hooks/useSEO.js'

function CitySchema({ city }) {
  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'city-schema'
    el.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Traffic challan resolution in ${city.name}`,
        provider: { '@type': 'Organization', name: 'ClearMyChallan', url: 'https://www.clearmychallan.co.in' },
        areaServed: { '@type': 'City', name: city.name },
        serviceType: 'Traffic challan disposal through licensed legal professionals'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.clearmychallan.co.in/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: `Challan resolution in ${city.name}`,
            item: `https://www.clearmychallan.co.in/challan-resolution/${city.slug}`
          }
        ]
      }
    ])
    document.head.appendChild(el)
    return () => document.getElementById('city-schema')?.remove()
  }, [city])
  return null
}

export default function CityPage() {
  const { city: slug } = useParams()
  const city = getCity(slug)

  useSEO({
    title: city ? `Challan Resolution in ${city.name} — Transparent City Pricing` : 'Challan Resolution',
    description: city
      ? `Resolve pending traffic challans in ${city.name} through a licensed legal professional. Transparent city pricing, disposal in 20–25 days or full refund.`
      : undefined,
    path: city ? `/challan-resolution/${city.slug}` : '/'
  })

  if (!city) return <Navigate to="/" replace />

  const region = pricingTable.find((r) => r.region === city.region)
  const faqs = [
    {
      q: `How long does challan disposal take in ${city.name}?`,
      a: `Most cases are disposed within ${SITE.disposalTime}. If your challan is not disposed within 25 days, the amount is fully refunded.`
    },
    {
      q: `Do I have to go to court in ${city.name}?`,
      a: 'No. A licensed legal professional is assigned to your case and handles the disposal on your behalf.'
    },
    {
      q: `What does it cost to resolve a challan in ${city.name}?`,
      a: `${region.rules.map((r) => `${r.label}: ${r.detail}`).join('. ')}. The final amount is confirmed before you pay.`
    },
    {
      q: 'What documents do I need?',
      a: 'Your vehicle RC and a copy of the challan (JPG, PNG or PDF). You can upload both online.'
    }
  ]
  const relatedPosts = blogPosts
    .filter((p) => p.title.toLowerCase().includes(city.name.toLowerCase()))
    .slice(0, 2)
  const others = cities.filter((c) => c.slug !== city.slug)

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navbar />
      <CitySchema city={city} />
      <main className="relative z-10 pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="section-pad max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-police-700"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>

          <span className="eyebrow mt-6 block">
            {city.name}, {city.state}
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy leading-tight">
            Traffic challan resolution in {city.name}
          </h1>
          <p className="mt-4 text-lg text-ink-500 leading-relaxed">
            Pending e-challan on a {city.name} vehicle? A licensed legal professional can handle the
            disposal for you — at a transparent {city.name} price, with no court visit.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="card p-5 flex items-center gap-3">
              <Clock className="w-5 h-5 text-police-600" />
              <span className="text-sm font-semibold text-navy">Disposal in {SITE.disposalTime}</span>
            </div>
            <div className="card p-5 flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-navy">
                Full refund if not disposed in 25 days
              </span>
            </div>
          </div>

          <h2 className="mt-12 font-display text-2xl font-bold text-navy">{city.name} pricing</h2>
          <ul className="mt-4 grid gap-3">
            {region.rules.map((r) => (
              <li key={r.label} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                <span className="text-ink-700">
                  <strong className="text-navy">{r.label}:</strong> {r.detail}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <SavingsCalculator defaultCity={city.slug} compact />
          </div>

          <h2 className="mt-12 font-display text-2xl font-bold text-navy">How it works</h2>
          <ol className="mt-4 grid gap-3 text-ink-700 list-decimal pl-5">
            <li>Upload your RC and challan copy online.</li>
            <li>Get a confirmed quote for {city.name} before paying anything.</li>
            <li>A legal professional is assigned and handles the disposal.</li>
            <li>Track progress; most cases close in {SITE.disposalTime}.</li>
          </ol>

          <h2 className="mt-12 font-display text-2xl font-bold text-navy">
            Frequently asked questions
          </h2>
          <div className="mt-4 grid gap-4">
            {faqs.map((f) => (
              <div key={f.q} className="card p-5">
                <h3 className="font-display font-bold text-navy">{f.q}</h3>
                <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-bold text-navy">Read more</h2>
              <div className="mt-3 grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="card p-5 hover:shadow-card-hover transition-shadow"
                  >
                    <h3 className="font-display font-bold text-navy text-sm">{p.title}</h3>
                    <p className="mt-1.5 text-xs text-ink-500">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 card p-6 bg-surface-soft">
            <h3 className="font-display text-lg font-bold text-navy">
              Ready to clear your {city.name} challan?
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/#submit" className="btn-primary">
                Submit documents
              </a>
              <a href={SITE.telHref} className="btn-secondary">
                <Phone className="w-4 h-4" /> Call us
              </a>
            </div>
          </div>

          <p className="mt-8 text-sm text-ink-500">
            Also serving:{' '}
            {others.map((c, i) => (
              <React.Fragment key={c.slug}>
                <Link
                  to={`/challan-resolution/${c.slug}`}
                  className="hover:text-police-700 underline-offset-2 hover:underline"
                >
                  {c.name}
                </Link>
                {i < others.length - 1 ? ' · ' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>
      </main>
      <Footer />
      <FloatingSupport />
    </div>
  )
}
