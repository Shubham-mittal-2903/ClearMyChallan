/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif']
      },
      colors: {
        police: {
          50: '#F0F4FA',
          100: '#DFE6F2',
          200: '#C2D0E8',
          300: '#96AEDA',
          400: '#6B8ACB',
          500: '#3D65B0',
          600: '#2A4D8F',
          700: '#233F75',
          800: '#1D345E',
          900: '#182B4E'
        },
        ink: {
          900: '#111827',
          700: '#1F2937',
          500: '#4B5563',
          400: '#6B7280'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F8F9FB',
          muted: '#F1F3F7'
        },
        line: '#E5E7EB',
        accent: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          600: '#2563EB'
        }
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        card: '0 4px 16px -4px rgba(0,0,0,0.08), 0 1px 3px -1px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 32px -8px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.04)',
        ring: '0 0 0 3px rgba(42, 77, 143, 0.15)'
      },
      backgroundImage: {
        'blue-fade':
          'linear-gradient(180deg, #F8F9FB 0%, #FFFFFF 100%)'
      },
      animation: {
        'float-slow': 'float 9s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out both'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
}
