/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF7A00",
          "orange-bright": "#FF8A00",
          yellow: "#FFC928",
          "yellow-bright": "#FFD84D",
          pink: "#F00078",
          "pink-hot": "#FF1681",
          magenta: "#E9008C",
          "magenta-dark": "#C9009D",
          purple: "#8E168F",
          "purple-dark": "#54145F",
          cream: "#FFF5DC",
          "cream-light": "#FFFDF8",
          dark: "#24152F",
          "dark-subtle": "#1A0F22",
          muted: "#6B6170",
          success: "#20B86B",
          warning: "#F4A62A",
          error: "#E83B5C",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },
      boxShadow: {
        'glow-orange': '0 8px 32px -4px rgba(255, 122, 0, 0.35), 0 0 0 1px rgba(255, 122, 0, 0.2)',
        'glow-pink': '0 8px 32px -4px rgba(240, 0, 120, 0.35), 0 0 0 1px rgba(240, 0, 120, 0.2)',
        'glow-yellow': '0 8px 32px -4px rgba(255, 201, 40, 0.35), 0 0 0 1px rgba(255, 201, 40, 0.2)',
        'glow-magenta': '0 8px 32px -4px rgba(233, 0, 140, 0.35), 0 0 0 1px rgba(233, 0, 140, 0.2)',
        'glow-purple': '0 8px 32px -4px rgba(142, 22, 143, 0.35), 0 0 0 1px rgba(142, 22, 143, 0.2)',
        'glass': '0 12px 40px 0 rgba(36, 21, 47, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
        'glass-hover': '0 20px 50px 0 rgba(240, 0, 120, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
        'glass-dark': '0 12px 40px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'card-soft': '0 10px 30px -5px rgba(36, 21, 47, 0.06), 0 0 0 1px rgba(36, 21, 47, 0.04)',
      },
      backgroundImage: {
        'grad-orange-yellow': 'linear-gradient(135deg, #FF7A00 0%, #FFD21F 100%)',
        'grad-pink-orange': 'linear-gradient(135deg, #EC087F 0%, #FF8A00 100%)',
        'grad-magenta-pink': 'linear-gradient(135deg, #C9009D 0%, #FF1681 100%)',
        'grad-purple-dark': 'linear-gradient(135deg, #8E168F 0%, #54145F 100%)',
        'grad-sunburst': 'linear-gradient(135deg, #FF1681 0%, #FF7A00 50%, #FFD84D 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
