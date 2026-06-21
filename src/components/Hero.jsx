import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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
  Headphones
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
                <Phone className="w-4 h-4" /> Call {SITE.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const [vehicle, setVehicle] = useState('')
  const [rcFile, setRcFile] = useState(null)
  const [showModal, setShowModal] = useState(false)
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
      <section id="home" className="relative pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="section-pad">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="chip mb-5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Legal professional-assisted traffic challan resolution
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] font-extrabold tracking-tight text-navy"
              >
                Check your challan status{' '}
                <span className="text-police-600">instantly.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-5 text-base sm:text-lg text-ink-500 max-w-2xl leading-relaxed"
              >
                Enter your vehicle number, upload your RC or Challan print — our
                team connects with you in minutes with complete challan details
                and resolution options. Disposal in{' '}
                <span className="font-semibold text-ink-700">{SITE.disposalTime}</span>,
                or full refund.
              </motion.p>

              {/* --- Quick Challan Lookup Form --- */}
              <motion.form
                onSubmit={onCheckStatus}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-7 card p-5 sm:p-6 max-w-xl"
              >
                <div className="grid gap-4">
                  {/* Vehicle Number */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                      Vehicle Number
                    </label>
                    <div className="mt-2 relative rounded-xl bg-white border border-line focus-within:border-police-400 focus-within:shadow-ring transition-all">
                      <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                      <input
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                        placeholder="e.g. DL10CA1234"
                        maxLength={15}
                        className="w-full pl-11 pr-4 py-3 bg-transparent font-mono tracking-[0.14em] text-base outline-none text-navy placeholder:text-ink-400/60"
                      />
                    </div>
                  </div>

                  {/* RC / Challan Upload */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                      RC / Challan Print
                      <span className="ml-1.5 normal-case font-normal text-ink-400/80 tracking-normal">
                        (optional)
                      </span>
                    </label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className={`mt-2 cursor-pointer rounded-xl border-2 border-dashed p-4 transition-all ${
                        rcFile
                          ? 'border-police-300 bg-police-50/40'
                          : 'border-line bg-surface-soft hover:border-police-300 hover:bg-police-50/40'
                      }`}
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
                          <FileText className="w-5 h-5 text-police-600 shrink-0" />
                          <span className="text-sm font-medium text-navy truncate flex-1">
                            {rcFile.name}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setRcFile(null) }}
                            className="w-7 h-7 rounded-full hover:bg-white border border-transparent hover:border-line flex items-center justify-center text-ink-400"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 text-sm text-ink-400">
                          <Upload className="w-5 h-5 text-police-400" />
                          <span>
                            Drop or click to upload RC / Challan print{' '}
                            <span className="text-xs">(JPG, PNG, PDF)</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full !py-3.5 mt-5 group">
                  <Search className="w-4 h-4" />
                  Check Challan Status
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <div className="mt-3 flex items-center gap-2 text-xs text-ink-400">
                  <Lock className="w-3.5 h-3.5 text-green-600" />
                  Encrypted & secure — your data is never stored.
                </div>
              </motion.form>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-7 flex flex-wrap gap-2.5"
              >
                {trustBadges.map((b) => (
                  <span key={b} className="badge-trust">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {b}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — assurance card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card p-6 sm:p-7 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Service Guarantee</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                    <Lock className="w-3 h-3" /> Secure
                  </span>
                </div>

                <div className="mt-5 rounded-xl bg-police-600 p-5 text-white">
                  <div className="flex items-center gap-2.5 text-police-100 text-xs uppercase tracking-wider font-semibold">
                    <Clock className="w-4 h-4" /> Legal professional response
                  </div>
                  <div className="mt-2 font-display text-2xl sm:text-3xl font-extrabold">
                    Within 24 hours
                  </div>
                  <p className="text-sm text-police-100 mt-1">
                    Real human review of every uploaded case.
                  </p>
                </div>

                <div className="mt-4 grid gap-3">
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
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 rounded-xl border border-line bg-surface-soft p-3.5"
                      >
                        <span className="shrink-0 w-9 h-9 rounded-lg bg-police-600/10 border border-police-200 flex items-center justify-center">
                          <Icon className="w-4.5 h-4.5 text-police-600" />
                        </span>
                        <div>
                          <div className="font-semibold text-navy text-sm">{item.title}</div>
                          <div className="text-xs text-ink-500 mt-0.5">{item.sub}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Quick action buttons */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button onClick={() => go('submit')} className="btn-primary text-sm">
                    <Upload className="w-4 h-4" /> Submit Docs
                  </button>
                  <Link to="/track" className="btn-secondary text-sm text-center">
                    <Clock className="w-4 h-4" /> Track Case
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
