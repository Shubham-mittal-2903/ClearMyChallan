import React, { useState } from 'react'
import { Calculator, ArrowRight } from 'lucide-react'
import { cities, estimate, inr } from '../data/cities.js'

export default function SavingsCalculator({ defaultCity = 'delhi', compact = false }) {
  const [slug, setSlug] = useState(defaultCity)
  const [fine, setFine] = useState('')
  const city = cities.find((c) => c.slug === slug)
  const amount = parseInt(String(fine).replace(/\D/g, ''), 10)
  const result = amount > 0 ? estimate(city.rule, amount) : null
  const saving = result && result.pay != null ? amount - result.pay : null

  return (
    <div className={`card ${compact ? 'p-5' : 'p-6 sm:p-7'} max-w-3xl mx-auto`}>
      <div className="flex items-center gap-2 text-police-600">
        <Calculator className="w-4 h-4" />
        <h3 className="font-display text-lg font-bold text-navy">Estimate your resolution price</h3>
      </div>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <label className="grid gap-1.5 text-sm font-medium text-ink-700">
          City
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className="input">
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-ink-700">
          Total fine amount (₹)
          <input
            inputMode="numeric"
            value={fine}
            onChange={(e) => setFine(e.target.value.replace(/\D/g, ''))}
            placeholder="e.g. 5000"
            className="input"
          />
        </label>
      </div>

      {result && (
        <div className="mt-5 rounded-2xl border border-line bg-surface-soft p-4" aria-live="polite">
          {result.pay != null ? (
            <>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-400">You pay (estimate)</div>
                  <div className="font-display text-3xl font-bold text-navy">{inr(result.pay)}</div>
                </div>
                {saving > 0 && (
                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-400">Compared to the fine</div>
                    <div className="font-display text-xl font-bold text-green-600">Save {inr(saving)}</div>
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-ink-500">
                {result.note}. A licensed legal professional handles disposal — no court visit
                for you.
              </p>
            </>
          ) : (
            <p className="text-sm text-ink-700">{result.note}. Call us for an exact quote.</p>
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-ink-400">
        Estimate only, based on our published city pricing. The final amount is confirmed before
        you pay. Disposal in 20–25 days or full refund.
      </p>
      <a href="/#submit" className="mt-4 btn-primary inline-flex">
        Check my challan <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  )
}
