// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/image',
  ],

  // Sitemap config
  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://surgutsvai.ru',
    strictNuxtContentPaths: false,
  },

  // Robots config
  robots: {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/orders', '/auth', '/cart', '/order'],
      },
    ],
    sitemap: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://surgutsvai.ru'}/sitemap.xml`,
  },

  // Nuxt Image config
  image: {
    quality: 88,
    formats: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: process.env.SMTP_PORT || '465',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    senderEmail: process.env.SENDER_EMAIL || '',
    recipientEmail: process.env.RECIPIENT_EMAIL || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://surgutsvai.ru',
      yandexMetrikaId: process.env.YANDEX_METRIKA_ID || '',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Завод винтовых свай СтройМонтаж-86 — производство и монтаж в Сургуте и ХМАО',
      meta: [
        {
          name: 'description',
          content: 'Производство и монтаж винтовых свай в Сургуте и ХМАО. Диаметры Ø57–325 мм, монтаж за 1 день, гарантия по договору. Бесплатный выезд замерщика. Калькулятор онлайн.',
        },
        { name: 'keywords', content: 'винтовые сваи Сургут, монтаж свай Сургут, фундамент на винтовых сваях, купить сваи Сургут, свайный фундамент ХМАО, установка свай под ключ' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'СтройМонтаж-86 — Завод винтовых свай' },
        { property: 'og:locale', content: 'ru_RU' },
        { name: 'geo.region', content: 'RU-KHM' },
        { name: 'geo.placename', content: 'Сургут' },
        { name: 'geo.position', content: '61.254;73.396' },
        { name: 'ICBM', content: '61.254, 73.396' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  nitro: {
    experimental: {
      wasm: false,
    },
  },

  compatibilityDate: '2025-01-01',
})
