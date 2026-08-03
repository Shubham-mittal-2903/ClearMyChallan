import React, { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Upload, Phone } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import FloatingSupport from '../components/FloatingSupport.jsx'
import BackgroundOrbs from '../components/ui/BackgroundOrbs.jsx'
import { getPostBySlug, blogPosts } from '../data/blog.js'
import { SITE } from '../data/site.js'
import useSEO from '../hooks/useSEO.js'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function ArticleSchema({ post }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'article-schema'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: 'ClearMyChallan' },
      publisher: {
        '@type': 'Organization',
        name: 'ClearMyChallan',
        logo: { '@type': 'ImageObject', url: 'https://www.clearmychallan.co.in/favicon.svg' }
      },
      mainEntityOfPage: `https://www.clearmychallan.co.in/blog/${post.slug}`
    })
    document.head.appendChild(script)
    return () => document.getElementById('article-schema')?.remove()
  }, [post])
  return null
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useSEO({
    title: post ? post.title : 'Blog',
    description: post ? post.excerpt : undefined,
    path: post ? `/blog/${post.slug}` : '/blog'
  })

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navbar />
      <ArticleSchema post={post} />
      <main className="relative z-10 pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="section-pad max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-police-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <div className="flex items-center gap-3 text-xs text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-ink-500 leading-relaxed">{post.excerpt}</p>

            <div className="mt-8 grid gap-7">
              {post.content.map((block) => (
                <div key={block.h}>
                  <h2 className="font-display text-xl font-bold text-navy">{block.h}</h2>
                  <div className="mt-2.5 grid gap-3">
                    {block.p.map((para, i) => (
                      <p key={i} className="text-ink-700 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 card p-6 sm:p-7 bg-surface-soft">
              <h3 className="font-display text-lg font-bold text-navy">
                Have a pending challan on your vehicle?
              </h3>
              <p className="mt-2 text-sm text-ink-500">
                Check your challan status and get a transparent, city-based quote from
                a licensed legal professional — disposal in 20–25 days or full refund.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/#submit" className="btn-primary">
                  <Upload className="w-4 h-4" /> Submit Documents
                </Link>
                <a href={SITE.telHref} className="btn-secondary">
                  <Phone className="w-4 h-4" /> Call {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.article>

          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="font-display text-lg font-bold text-navy mb-4">
                Related articles
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="card p-5 hover:shadow-card-hover transition-shadow">
                    <h4 className="font-display font-bold text-navy text-sm">{p.title}</h4>
                    <p className="mt-1.5 text-xs text-ink-500 leading-relaxed">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingSupport />
    </div>
  )
}
