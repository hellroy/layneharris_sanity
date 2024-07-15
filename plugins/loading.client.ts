import { defineNuxtPlugin } from 'nuxt/app'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
  const isLoading = ref(false)
  const router = useRouter()

  router.beforeEach((to, from, next) => {
    console.log('Navigation started')
    isLoading.value = true
    next()
  })

  router.afterEach(() => {
    console.log('Navigation finished')
    isLoading.value = false
  })

  nuxtApp.hook('app:beforeMount', () => {
    console.log('App is about to mount')
    isLoading.value = true
  })

  nuxtApp.hook('app:mounted', () => {
    console.log('App mounted')
    isLoading.value = false
  })

  return {
    provide: {
      isLoading
    }
  }
})
