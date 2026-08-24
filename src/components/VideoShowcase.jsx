import React from 'react'
import { motion } from 'framer-motion'
import { Search, Smartphone } from 'lucide-react'

const clips = [
  {
    src: '/videos/demo-2.mp4',
    icon: Search,
    title: 'Real-Time Record Checking',
    desc: 'We check your challan records against authorised sources the moment you submit.'
  },
  {
    src: '/videos/demo-3.mp4',
    icon: Smartphone,
    title: 'Track It From Your Phone',
    desc: 'Follow your case status end-to-end — Legal Review, Processing, Resolved — right from your phone.'
  }
]

export default function VideoShowcase() {
  return (
    <section className="relative py-16 md:py-24 bg-surface-soft border-y border-line">
      <div className="section-pad">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="eyebrow">See It In Action</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy">
            How your challan gets resolved
          </h2>
          <p className="mt-3 text-ink-500">
            From verification to real-time record checks — here&apos;s what happens
            behind the scenes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {clips.map((clip, i) => {
            const Icon = clip.icon
            return (
              <motion.div
                key={clip.src}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card card-hover overflow-hidden p-0"
              >
                <div className="relative aspect-video bg-navy overflow-hidden">
                  <video
                    src={clip.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-police-50 border border-police-100 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-police-600" />
                    </span>
                    <h3 className="font-display font-bold text-navy text-sm">{clip.title}</h3>
                  </div>
                  <p className="mt-2.5 text-sm text-ink-500 leading-relaxed">{clip.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
