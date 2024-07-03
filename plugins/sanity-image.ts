import imageUrlBuilder from '@sanity/image-url'
import type { Image } from '@sanity/types'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createClient } from '@sanity/client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.sanity

  const client = createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    useCdn: config.useCdn,
    apiVersion: config.apiVersion,
  })
  const builder = imageUrlBuilder(client)

  function urlFor(source: Image) {
    return builder.image(source)
  }

  return {
    provide: { urlFor },
  }
})
