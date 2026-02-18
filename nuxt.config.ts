// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
  ],

  // Supabase configuration
  supabase: {
    url: process.env.SUPABASE_URL || 'http://127.0.0.1:55321',
    key: process.env.SUPABASE_KEY || 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH',
    redirect: false,
  },

  // Google Fonts for premium typography
  googleFonts: {
    families: {
      'Cormorant+Garamond': [300, 400, 500, 600, 700],
      'Inter': [300, 400, 500, 600, 700],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },

  // TailwindCSS
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  // App head
  app: {
    head: {
      title: 'MAISON — Premium Fashion',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover curated luxury fashion. Handcrafted elegance meets modern design.' },
        { name: 'theme-color', content: '#1A1A1A' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // Runtime config
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || 'http://127.0.0.1:55321',
      supabaseKey: process.env.SUPABASE_KEY || 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH',
    },
  },

  // Directories
  dir: {
    pages: 'pages',
    layouts: 'layouts',
    middleware: 'middleware',
    plugins: 'plugins',
  },
})
