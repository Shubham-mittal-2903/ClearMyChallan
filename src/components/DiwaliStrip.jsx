import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Phone } from 'lucide-react'
import { SITE } from '../data/site.js'

// Seasonal strip shown under the hero until Diwali week is over.
// No discount is advertised — only the real guarantee and a useful reminder.
const SHOW_UNTIL = new Date('2026-11-16T00:00:00+05:30')

function Diya({ delay = 0 }) {
  return (
    <motion.span
      aria-hidden
      className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400"
      style={{ boxShadow: '0 0 14px 4px rgba(251,191,36,0.55)' }}
      animate={{ opacity: [0.55, 1, 0.55], scale: [0.9, 1.15, 0.9] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

export default function DiwaliStrip() {
  if (new Date() > SHOW_UNTIL) return null
  return (
    <section aria-label="Diwali travel reminder" className="relative z-10 section-pad -mt-6 md:-mt-8 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto rounded-3xl border border-amber-300/60 dark:border-amber-400/20 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-[#2a1d0b] dark:via-[#2f2010] dark:to-[#2a1d0b] px-5 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
      >
        <div className="flex items-center gap-1.5 shrink-0">
          <Diya />
          <Diya delay={0.5} />
          <Diya delay={1} />
        </div>
        <div className="flex-1">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            <Sparkles className="w-3.5 h-3.5" /> Happy Diwali
          </p>
          <h3 className="mt-1 font-display text-lg md:text-xl font-bold text-ink-900 dark:text-white">
            Heading home for Diwali? Clear your challans before you travel.
          </h3>
          <p className="mt-1 text-sm text-ink-500">
            Festive-season highway and city enforcement is at its peak. Check your vehicle
            first — disposal in 20–25 days or a full refund, always.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link to="/track" className="btn-primary">
            Check status <ArrowRight className="w-4 h-4" />
          </Link>
          <a href={SITE.telHref} className="btn-secondary">
            <Phone className="w-4 h-4" /> Call
          </a>
        </div>
      </motion.div>
    </section>
  )
}
