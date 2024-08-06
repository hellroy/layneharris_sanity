<!-- components/LoadingWrapper.vue -->
<template>
    <div v-if="loading" class="loading-container">
      <Loading />
    </div>
    <div v-else>
      <slot />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Loading from '~/components/Loading.vue';
  
  const props = defineProps({
    loading: Boolean
  });
  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  }
  </style>
  