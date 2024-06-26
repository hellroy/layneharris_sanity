import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sanity',
  ],
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
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
        visualEditing: {
          studioUrl: process.env.NUXT_SANITY_STUDIO_URL || 'http://localhost:3333',
          token: process.env.NUXT_SANITY_API_READ_TOKEN,
          stega: true,
        },
      },
    },
  },
  plugins: [
    '~/plugins/sanity.js',
  ],
})
