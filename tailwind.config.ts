import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './app/**/*.{vue,js,ts}',
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.{vue,js,ts}',
        './pages/**/*.{vue,js,ts}',
        './plugins/**/*.{js,ts}',
        './composables/**/*.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                ivory: '#FFFFF0',
                cream: '#FAF7F2',
                champagne: '#C9A96E',
                'gold-light': '#D4B87A',
                'gold-dark': '#A88B4A',
                charcoal: '#1A1A1A',
                graphite: '#2D2D2D',
                taupe: '#8B7D6B',
                'taupe-light': '#B8ADA0',
                rose: '#C4A882',
                sage: '#A8B5A0',
            },
            fontFamily: {
                heading: ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
                body: ['"Inter"', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                'display': ['clamp(2.5rem, 5vw, 5rem)', { lineHeight: '1.1', letterSpacing: '0.02em' }],
                'hero': ['clamp(1.8rem, 3.5vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '0.03em' }],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '112': '28rem',
                '128': '32rem',
            },
            maxWidth: {
                'luxury': '1440px',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            transitionTimingFunction: {
                'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
}
