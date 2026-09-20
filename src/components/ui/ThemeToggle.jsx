import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'

// Sliding pill switch. Colors are inline (driven by theme state) so the global
// `.dark .bg-white` overrides never touch the thumb.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="relative h-8 w-[58px] shrink-0 rounded-full p-1 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-police-400"
      style={{
        background: dark
          ? 'linear-gradient(135deg, #16213A 0%, #22365F 100%)'
          : 'linear-gradient(135deg, #DCE7FF 0%, #F3F7FF 100%)',
        boxShadow: dark
          ? 'inset 0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px #2A3F63'
          : 'inset 0 1px 2px rgba(42,77,143,0.18), 0 0 0 1px #C2D0E8'
      }}
    >
      {/* Ambient track glyphs */}
      <Sun
        className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-opacity duration-300"
        style={{ color: '#2A4D8F', opacity: dark ? 0.45 : 0 }}
      />
      <Moon
        className="absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-opacity duration-300"
        style={{ color: '#9CB4E0', opacity: dark ? 0 : 0.5 }}
      />

      {/* Thumb */}
      <motion.span
        className="relative flex h-6 w-6 items-center justify-center rounded-full"
        animate={{ x: dark ? 26 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        style={{
          background: dark ? '#0B1220' : '#FFFFFF',
          boxShadow: dark
            ? '0 2px 6px rgba(0,0,0,0.6), 0 0 0 1px #3D5A8C'
            : '0 2px 6px rgba(42,77,143,0.28)'
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={dark ? 'moon' : 'sun'}
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            {dark ? (
              <Moon className="h-3.5 w-3.5" style={{ color: '#9CB4E0' }} />
            ) : (
              <Sun className="h-3.5 w-3.5" style={{ color: '#D97706' }} />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  )
}
