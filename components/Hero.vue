<template>
    <div class="m-auto w-full text-center h-[100vh] -mt-24" v-if="hero">
      <div class="bg-image h-full" :style="{ backgroundImage: 'url(' + urlFor(hero.bgImage).url() + ')' }">
        <img :src="urlFor(hero.heroImage).url()" alt="Hero Image" class="font-bold text-3xl py-4 h-full m-auto pt-24 -rotate-3" />
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import groq from 'groq'
  import { useNuxtApp } from '#app'
  import { urlFor } from '~/utils'
  
  const hero = ref(null)
  const { $sanityClient } = useNuxtApp()
  
  const fetchHero = async () => {
    try {
      const query = groq`*[_type == "hero"][0]{
        heroImage,
        "heroImageUrl": heroImage.asset->url,
        bgImage,
        "bgImageUrl": bgImage.asset->url,
        content
      }`
      hero.value = await $sanityClient.fetch(query)
    } catch (error) {
      console.error('Error fetching hero:', error)
    }
  }
  
  onMounted(() => {
    fetchHero()
  })
  </script>
  
  <style scoped>
  .bg-image {
    width: 100%;
    background-size: cover;
    background-position: center;
  }
  </style>
  