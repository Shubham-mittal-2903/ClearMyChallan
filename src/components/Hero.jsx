import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock,
  RotateCcw,
  CheckCircle2,
  Lock,
  Upload,
  Car,
  Search,
  FileText,
  X,
  Loader2,
  Headphones,
  Sparkles
} from 'lucide-react'
import { SITE } from '../data/site.js'
import { trustBadges } from '../data/content.js'

function AgentConnectModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative bg-white rounded-2xl shadow-card border border-line p-7 sm:p-9 max-w-md w-full text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-surface-soft flex items-center justify-center text-ink-400"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex w-16 h-16 rounded-full bg-police-50 border-2 border-police-200 items-center justify-center mb-5">
              <Headphones className="w-8 h-8 text-police-600" />
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-navy">
              Connecting You to Our Team
            </h3>
            <p className="mt-3 text-ink-500 leading-relaxed">
              A real-time agent will connect with you in{' '}
              <span className="font-semibold text-police-600">3–5 minutes</span>{' '}
              with your challan details. Kindly stay online.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-400">
              <Loader2 className="w-4 h-4 animate-spin text-police-600" />
              Looking up your challan records…
            </div>

            <div className="mt-6 grid gap-2">
              <a
                href={SITE.whatsappHref('Hi, I just checked my challan status on your website. Please share details.')}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp w-full"
              >
                <Phone className="w-4 h-4" /> WhatsApp Us for Faster Response
              </a>
              <a href={SITE.telHref} className="btn-secondary w-full">
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Hero() {
  const [vehicle, setVehicle] = useState('')
  const [rcFile, setRcFile] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const fileRef = useRef(null)

  const handleFile = (f) => {
    if (!f) return
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowed.includes(f.type)) return
    if (f.size > 20 * 1024 * 1024) return
    setRcFile(f)
  }

  const onCheckStatus = (e) => {
    e.preventDefault()
    if (!vehicle.trim()) return
    setShowModal(true)
  }

  return (
    <>
      <AgentConnectModal open={showModal} onClose={() => setShowModal(false)} />
      <section id="home" className="relative min-h-[92vh] flex items-end overflow-hidden bg-navy">
        {/* Cinematic video background */}
        <video
          src="/videos/demo-1.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />

        <div className="relative z-10 section-pad w-full pt-40 pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/90 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Legal professional-assisted traffic challan resolution
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-[42px] sm:text-6xl lg:text-[72px] leading-[1.02] font-extrabold tracking-tight text-white max-w-4xl"
          >
            Check your challan status{' '}
            <span className="bg-gradient-to-r from-police-300 to-white bg-clip-text text-transparent">
              instantly.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed"
          >
            One vehicle number. Full clarity. Resolution in{' '}
            <span className="font-semibold text-white">{SITE.disposalTime}</span>, or a full refund.
          </motion.p>

          {/* --- Floating search-style lookup card --- */}
          <motion.form
            onSubmit={onCheckStatus}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 max-w-2xl"
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-2xl sm:rounded-full p-2 shadow-card">
              <div className="relative flex-1 flex items-center">
                <Car className="absolute left-4 w-4 h-4 text-ink-400" />
                <input
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                  placeholder="Enter vehicle number — e.g. DL10CA1234"
                  maxLength={15}
                  className="w-full pl-11 pr-4 py-3.5 sm:py-3 bg-transparent font-mono tracking-[0.1em] text-sm sm:text-base outline-none text-navy placeholder:text-ink-400/70 placeholder:font-sans placeholder:tracking-normal"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowUpload((s) => !s)}
                className={`shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-full text-sm font-medium transition-colors ${
                  rcFile
                    ? 'bg-police-50 text-police-700 border border-police-200'
                    : 'text-ink-500 hover:bg-surface-soft border border-transparent'
                }`}
              >
                <FileText className="w-4 h-4" />
                {rcFile ? 'RC attached' : 'Attach RC'}
              </button>
              <button type="submit" className="btn-primary !py-3.5 sm:!py-3 !rounded-full !px-6 group">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Check Status</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <AnimatePresence>
              {showUpload && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="mt-2.5 cursor-pointer rounded-2xl border-2 border-dashed border-white/30 bg-white/10 backdrop-blur-md p-4 hover:bg-white/15 transition-colors"
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                    {rcFile ? (
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-white shrink-0" />
                        <span className="text-sm font-medium text-white truncate flex-1">
                          {rcFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setRcFile(null) }}
                          className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center text-white/80"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-sm text-white/70">
                        <Upload className="w-5 h-5" />
                        <span>Drop or click to upload RC / Challan print (JPG, PNG, PDF)</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-green-400" />
                Encrypted — your data is never stored
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-green-400" />
                100% free to check
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Agents online now
              </span>
            </div>
          </motion.form>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {trustBadges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/10 border border-white/15 backdrop-blur-md px-3 py-1.5 rounded-full"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guarantee strip */}
      <section className="relative bg-white border-b border-line">
        <div className="section-pad py-8 grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Clock,
              title: `Disposed in ${SITE.disposalTime}`,
              sub: 'Most cases closed within 20–25 days.'
            },
            {
              icon: RotateCcw,
              title: '100% Refund Guarantee',
              sub: SITE.refundPolicy
            },
            {
              icon: ShieldCheck,
              title: 'Encrypted & Deleted',
              sub: 'Data encrypted, then deleted after disposal.'
            }
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-3.5"
              >
                <span className="shrink-0 w-11 h-11 rounded-xl bg-police-50 border border-police-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-police-600" />
                </span>
                <div>
                  <div className="font-semibold text-navy text-sm">{item.title}</div>
                  <div className="text-xs text-ink-500 mt-0.5">{item.sub}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </>
  )
}
