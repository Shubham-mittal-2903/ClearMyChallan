import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import FloatingSupport from '../components/FloatingSupport.jsx'
import BackgroundOrbs from '../components/ui/BackgroundOrbs.jsx'
import { blogPosts } from '../data/blog.js'
import useSEO from '../hooks/useSEO.js'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export default function Blog() {
  useSEO({
    title: 'Blog — Traffic Challan Guides & Resolution Tips',
    description:
      'Guides on checking challan status, resolving e-Challans, city-wise pricing and traffic fine rules in India — from the ClearMyChallan team.',
    path: '/blog'
  })

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navbar />
      <main className="relative z-10 pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="section-pad">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="eyebrow">ClearMyChallan Blog</span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy">
              Traffic Challan Guides &amp; Resolution Tips
            </h1>
            <p className="mt-3 text-ink-500">
              Practical, city-specific guidance on checking your challan status,
              understanding traffic fine rules, and resolving pending e-Challans.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="card p-6 h-full flex flex-col hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex items-center gap-3 text-xs text-ink-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold text-navy leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-police-600">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingSupport />
    </div>
  )
}
