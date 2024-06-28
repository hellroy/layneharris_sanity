<template>
    <div>
      <DesktopNavbar v-if="!isMobile" />
      <MobileNavbar v-else />
    </div>
  </template>
  
  <script>
  import { useViewport } from '../composables/useViewport'
  import DesktopNavbar from './DesktopNavbar.vue'
  import MobileNavbar from './MobileNavbar.vue'
  
  export default {
    components: {
      DesktopNavbar,
      MobileNavbar
    },
    setup() {
      const { isMobile } = useViewport()
  
      return { isMobile }
    }
  }
  </script>
  