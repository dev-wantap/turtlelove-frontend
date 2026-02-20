/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        'warm-white': '#FFFEFB',
        'soft-gray': '#F5F3F0',
        'warm-gray': '#E8E4DF',
        'text-primary': '#3D3A36',
        'text-secondary': '#6B6560',
        'text-muted': '#7A7570',
        rose: {
          light: '#F7E8E7',
          DEFAULT: '#E5B8B7',
          deep: '#D4A3A2',
          dark: '#B88A89',
        },
        sage: {
          light: '#EDF2ED',
          DEFAULT: '#A8C5A8',
          deep: '#8FB38F',
          dark: '#6B9A6B',
        },
        lavender: '#C5B8D9',
        peach: '#F5D0C5',
        sky: '#B8D4E3',
        honey: '#E8D5A8',
      },
      fontFamily: {
        heading: ['Pretendard', 'Inter', 'sans-serif'],
        body: ['Lora', 'Noto Serif KR', 'Georgia', 'serif'],
        ui: ['Pretendard', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(61, 58, 54, 0.08)',
        'soft-md': '0 4px 16px -4px rgba(61, 58, 54, 0.10)',
        'soft-lg': '0 8px 32px -8px rgba(61, 58, 54, 0.12)',
        'soft-xl': '0 16px 48px -12px rgba(61, 58, 54, 0.15)',
        rose: '0 8px 24px -8px rgba(229, 184, 183, 0.4)',
        sage: '0 8px 24px -8px rgba(168, 197, 168, 0.4)',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.35s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
