/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        hub: {
          bg: '#0b0613',
          panel: '#120a22',
          panel2: '#170c2d',
          text: '#eae6ff',
          muted: '#b9b2d6',
          border: 'rgba(255,255,255,0.08)',
          brand: '#7C3AED',
          brand2: '#A855F7',
          neon: '#22d3ee',
          danger: '#fb7185',
          success: '#34d399',
          warning: '#fbbf24',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(168,85,247,0.22), 0 20px 60px rgba(124,58,237,0.20)',
        soft: '0 10px 30px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        'hub-hero':
          'radial-gradient(1200px circle at 10% 10%, rgba(124,58,237,0.32), transparent 45%), radial-gradient(900px circle at 90% 20%, rgba(34,211,238,0.20), transparent 50%), linear-gradient(135deg, rgba(124,58,237,0.22), rgba(168,85,247,0.12), rgba(34,211,238,0.10))',
        'hub-card':
          'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(168,85,247,0.10), rgba(34,211,238,0.08))',
      },
    },
  },
  plugins: [],
}

