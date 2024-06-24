<template>
    <div class="search-container">
      <div class="search-input-wrapper">
        <input
          v-model="searchTerm"
          @input="onSearch"
          @keyup.enter="onSearch"
          type="text"
          placeholder="Search..."
          class="search-input"
        />
        <span class="search-icon">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <ul v-if="results.length" class="search-results">
        <li v-for="result in results" :key="result._id" class="search-result">
          <NuxtLink
            :to="getLink(result)"
            class="search-result-link"
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
      body match $searchTerm ||
      name match $searchTerm
    )] {
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
  
  <style scoped>
  @import '@fortawesome/fontawesome-free/css/all.css';
  
  .search-container {
    position: relative;
    width: 100%;
  }
  
  .search-input-wrapper {
    position: relative;
  }
  
  .search-input {
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .search-icon {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
  }
  
  .search-results {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
  }
  
  .search-result {
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .search-result:last-child {
    border-bottom: none;
  }
  
  .search-result-link {
    text-decoration: none;
    color: #333;
  }
  </style>
  