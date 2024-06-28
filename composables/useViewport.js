import { ref, onMounted, onUnmounted } from 'vue'

export function useViewport() {
  const isMobile = ref(false)

  const checkViewport = () => {
    if (typeof window !== 'undefined') {
      isMobile.value = window.innerWidth < 768
    }
  }

  onMounted(() => {
    checkViewport()
    window.addEventListener('resize', checkViewport)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkViewport)
  })

  return { isMobile }
}
