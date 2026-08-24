import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageCircle } from 'lucide-react'
import { SITE } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-white">
      <div className="section-pad py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <img src="/brand/logo-icon.png" alt="ClearMyChallan" className="w-9 h-9 object-contain" />
              <span className="font-display text-lg font-bold tracking-tight text-navy">
                ClearMy<span className="text-police-600">Challan</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-ink-500 max-w-md leading-relaxed">
              Legal professional-assisted vehicle challan resolution at transparent,
              city-based prices starting as low as 60% of the original fine.
              Secure, encrypted and refund-backed.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href={SITE.telHref} className="badge-trust">
                <Phone className="w-4 h-4 text-police-600" /> {SITE.phoneDisplay}
              </a>
              <a href={SITE.whatsappHref()} target="_blank" rel="noreferrer" className="badge-trust">
                <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterCol
              title="Product"
              links={[
                ['Submit Case', '/#submit'],
                ['Track Case', '/track'],
                ['Pricing', '#pricing'],
                ['How it Works', '#how'],
                ['Data Safety', '#safety']
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                ['Blog', '/blog'],
                ['FAQ', '#faq'],
                ['Contact', '#contact']
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                ['Privacy Policy', '#privacy'],
                ['Terms of Service', '#terms'],
                ['Refund Policy', '#refund'],
                ['Disclaimer', '#disclaimer']
              ]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-line">
          <div className="text-xs text-ink-400">
            © {new Date().getFullYear()} ClearMyChallan Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="text-xs text-ink-400">
            Disposal in {SITE.disposalTime} · Full refund if unresolved in 25 days
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-ink-400 font-semibold">{title}</div>
      <ul className="mt-4 grid gap-2.5 text-sm text-ink-500">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="hover:text-police-700 transition-colors">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
