<template>
  <div class="flex flex-col min-h-screen">
    <LoadingSpinner v-if="isLoading" />
    <!-- Navbar and Search components -->
    <Navbar />
    <!-- Main content -->
    <main class="flex-grow md:mt-24">
      <NuxtPage />
    </main>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { useNuxtApp } from 'nuxt/app'
import { computed, watch } from 'vue'
import LoadingSpinner from '~/components/LoadingSpinner.vue'

const nuxtApp = useNuxtApp()
const isLoading = computed(() => nuxtApp.$isLoading?.value ?? false)

watch(isLoading, (newVal) => {
  console.log('Loading state changed:', newVal)
})

console.log('isLoading (initial):', isLoading.value)
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.min-h-screen {
  min-height: 100vh;
}
</style>
