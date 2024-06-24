import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import sanityClient from '@sanity/client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.sanity

  const client = sanityClient({
    projectId: config.projectId,
    dataset: config.dataset,
    useCdn: config.useCdn,
    apiVersion: config.apiVersion,
  })

  return {
    provide: {
      sanityClient: client,
    },
  }
})
