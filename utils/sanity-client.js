import { createClient } from '@sanity/client';

// Configure Sanity client
export const client = createClient({
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    token: process.env.CONTACT_FORM_TOKEN, // Ensure you have a token that has write access
    useCdn: false,
    apiVersion: '2023-01-01', // Specify the API version
  })
