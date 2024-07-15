import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sanity'
  ],

  build: {
    // Ensure compatibility with CommonJS modules
    transpile: ['hookable'],
  },

  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
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
        // Add more link tags here
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
        useCdn: true,
        apiVersion: process.env.NUXT_SANITY_API_VERSION || '2024-03-15',
      },
    },
  },

  plugins: [
    '~/plugins/sanity.js',
    '~/plugins/loading.client.ts',
    { src: '~/plugins/google-analytics.js', mode: 'client' }
  ],

  compatibilityDate: '2024-07-02',
})