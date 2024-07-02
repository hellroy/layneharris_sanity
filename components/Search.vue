<template>
  <div class="relative w-[15vw] py-2">
    <div class="relative font-silkscreen">
      <input
        v-model="searchTerm"
        @input="onSearch"
        @keyup.enter="onSearch"
        type="text"
        placeholder="Search..."
        class="w-full px-2 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none"
      />
      <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <ul v-if="results.length" class="absolute w-full bg-white shadow-lg max-h-72 overflow-y-auto z-10">
      <li v-for="result in results" :key="result._id" class="py-2 border-b border-gray-200 last:border-none">
        <NuxtLink
          :to="getLink(result)"
          class="block px-4 text-gray-800 hover:bg-gray-100"
          @click="clearSearch"
        >
          {{ result.title || result.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'

// Define the GROQ query
const searchQuery = `
  *[_type in ["post", "project", "page"] && (
    title match $searchTerm ||
    description match $searchTerm ||
    pt::text(body) match $searchTerm ||
    name match $searchTerm
  )] {
    _id,
    _type,
    title,
    description,
    name,
    slug,
    url
  }
`

const searchTerm = ref('')
const results = ref([])

const { $sanityClient } = useNuxtApp()

const onSearch = async () => {
  if (searchTerm.value.trim().length > 2) {
    const params = { searchTerm: `*${searchTerm.value}*` }
    results.value = await $sanityClient.fetch(searchQuery, params)
  } else {
    results.value = []
  }
}

const clearSearch = () => {
  searchTerm.value = ''
  results.value = []
}

const getLink = (result) => {
  if (result.url) return result.url
  if (result.slug && result.slug.current) {
    if (result._type === 'page') {
      return `/${result.slug.current}`
    }
    return `/${result._type}/${result.slug.current}`
  }
  return '#'
}
</script>
