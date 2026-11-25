// City landing pages + the price estimator. Rates mirror `pricingTable`
// in content.js — keep the two in sync if pricing changes.

const FEE = 500

// Returns { pay, note } or { pay: null, note } when the band is quoted manually.
const rules = {
  delhi: (f) => ({ pay: Math.round(f * 0.6), note: 'Flat 60% of the fine' }),
  noida: (f) => ({ pay: Math.round(f * 0.5), note: 'Flat 50% of the fine' }),
  ghaziabad: (f) => ({ pay: Math.round(f * 0.5), note: 'Flat 50% of the fine' }),
  ncrSouth: (f) => {
    if (f < 2000) return { pay: f + FEE, note: 'Fine amount + ₹500 service fee' }
    if (f > 5000) return { pay: Math.round(f * 0.8), note: 'Flat 80% of the fine' }
    return { pay: null, note: 'Fines between ₹2,000 and ₹5,000 are quoted by our team' }
  },
  braj: (f) =>
    f < 2000
      ? { pay: f + FEE, note: 'Fine amount + ₹500 service fee' }
      : { pay: Math.round(f * 0.7), note: 'Flat 70% of the fine' },
  west: (f) =>
    f < 2000
      ? { pay: f + FEE, note: 'Fine amount + ₹500 service fee' }
      : { pay: Math.round(f * 0.65), note: 'Flat 65% of the fine' }
}

export const cities = [
  { slug: 'delhi', name: 'Delhi', state: 'Delhi', rule: 'delhi', region: 'Delhi' },
  { slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', rule: 'noida', region: 'Noida' },
  { slug: 'ghaziabad', name: 'Ghaziabad', state: 'Uttar Pradesh', rule: 'ghaziabad', region: 'Ghaziabad' },
  { slug: 'gurugram', name: 'Gurugram', state: 'Haryana', rule: 'ncrSouth', region: 'Faridabad / Palwal / Gurugram' },
  { slug: 'faridabad', name: 'Faridabad', state: 'Haryana', rule: 'ncrSouth', region: 'Faridabad / Palwal / Gurugram' },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', rule: 'west', region: 'Lucknow / Kanpur' },
  { slug: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', rule: 'west', region: 'Lucknow / Kanpur' },
  { slug: 'agra', name: 'Agra', state: 'Uttar Pradesh', rule: 'braj', region: 'Mathura / Agra / Aligarh' },
  { slug: 'meerut', name: 'Meerut', state: 'Uttar Pradesh', rule: 'west', region: 'Bulandshahr / Shamli / Meerut' }
]

export const getCity = (slug) => cities.find((c) => c.slug === slug)
export const estimate = (cityRule, fine) => rules[cityRule](fine)
export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN')
