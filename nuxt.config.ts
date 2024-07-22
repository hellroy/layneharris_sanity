import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sanity',
    '@nuxt/image',
    'nuxt-nodemailer'
  ],

  image: {
    provider: 'netlify',
    format: ['webp'], 
    domains: ['cdn.sanity.io'],
  },

  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nodemailer: {
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    },
  },

  app: {
    head: {
      title: "Layne Harris's Personal Website",
      meta: [
        { name: 'description', content: 'Layne Harris, a creative technologist in Portland, Maine.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Layne Harris\'s Personal Website' },
        { property: 'og:description', content: 'Layne Harris, a creative technologist in Portland, Maine.' },
        { property: 'og:image', content: '/images/snapshot.jpg' },
        { property: 'og:url', content: 'https://layneharris.com' },
        { name: 'twitter:card', content: '/images/snapshot.jpg' },
        { name: 'twitter:title', content: 'Layne Harris\'s Personal Website' },
        { name: 'twitter:description', content: 'Layne Harris, a creative technologist in Portland, Maine.' },
        { name: 'twitter:image', content: '/images/snapshot.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID,
      dataset: process.env.NUXT_SANITY_DATASET,
      useCdn: true,
      apiVersion: process.env.NUXT_SANITY_API_VERSION || '2024-03-15',
      visualEditing: {
        studioUrl: process.env.NUXT_SANITY_STUDIO_URL || 'http://localhost:3333',
        token: process.env.NUXT_SANITY_API_READ_TOKEN,
        stega: true,
      },
    },
    public: {
      sanity: {
        projectId: process.env.NUXT_SANITY_PROJECT_ID,
        dataset: process.env.NUXT_SANITY_DATASET,
        token: process.env.CONTACT_FORM_TOKEN,
        useCdn: true,
        apiVersion: process.env.NUXT_SANITY_API_VERSION || '2024-03-15',
      },
      apiUrl: process.env.NODE_ENV === 'production' ? 'https://layneharris.com/.netlify/functions/submitContactForm' : 'http://localhost:3000/api/submitContactForm'
    },
    nodemailer: {
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      },
    },
  },

  plugins: [
    '~/plugins/sanity.js',
    { src: '~/plugins/google-analytics.js', mode: 'client' }
  ],

  compatibilityDate: '2024-07-02',
})
