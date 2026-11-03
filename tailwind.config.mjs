/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#000000',
          1: 'rgba(28, 28, 30, 0.75)',
          2: 'rgba(44, 44, 46, 0.85)',
          3: 'rgba(58, 58, 60, 0.90)',
        },
        accent: {
          blue: '#0a84ff',
          'blue-subtle': 'rgba(10, 132, 255, 0.12)',
          green: '#30d158',
          'green-subtle': 'rgba(48, 209, 88, 0.12)',
        },
        content: {
          primary: 'rgba(255, 255, 255, 0.95)',
          secondary: 'rgba(235, 235, 245, 0.60)',
          tertiary: 'rgba(235, 235, 245, 0.35)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          active: 'rgba(255, 255, 255, 0.16)',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          'ui-monospace',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'glass-inner': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'glass-depth': '0 12px 32px -8px rgba(0, 0, 0, 0.65), 0 4px 12px -2px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        squircle: '18px',
        pill: '9999px',
      },
      transitionTimingFunction: {
        'spring-micro': 'cubic-bezier(0.2, 0, 0, 1)',
        'spring-standard': 'cubic-bezier(0.16, 1.0, 0.3, 1.0)',
        'spring-expressive': 'cubic-bezier(0.16, 1.0, 0.3, 1.028)',
      },
    },
  },
  plugins: [],
};
