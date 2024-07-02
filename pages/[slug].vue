<template>
    <div class="m-auto text-center text-white font-sans w-[75%]" v-if="page">
      <div class="font-headings text-layneYellow text-4xl py-4">{{ page.title }}</div>
      <div class="text-left">
      <PortableText :value="page.content"/>
    </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import { useNuxtApp } from '#app'
  import { PortableText } from '@portabletext/vue'
  
  const route = useRoute()
  const router = useRouter()
  const page = ref(null)
  const { $sanityClient } = useNuxtApp()
  
  const fetchPage = async () => {
    const slug = route.params.slug
  
    if (slug === 'home') {
      router.push('/')
      return
    }
  
    const query = `*[ _type == "page" && slug.current == $slug ][0] {
      title,
      content
    }`
    page.value = await $sanityClient.fetch(query, { slug })
  
    if (!page.value) {
      router.push('/404')
    }
  }
  
  onMounted(() => {
    fetchPage()
  })
  </script>
  