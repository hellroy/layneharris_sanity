import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createClient } from '@sanity/client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.sanity

  const client = createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    useCdn: config.useCdn,
    apiVersion: config.apiVersion,
    token: config.contactFormToken,
  })

  return {
    provide: {
      sanityClient: client,
    },
  }
})
