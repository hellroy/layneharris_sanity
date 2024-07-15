<template>
  <div class="m-auto md:w-full text-center md:h-[100vh] -mt-24 -z-20 border-b-layneYellow border-b-2" v-if="hero">
    <div class="h-full stripe-4 relative flex flex-col md:flex-row justify-center items-center" >
      <div class="relative flex flex-col md:mt-[12vh] md:flex-row space-y-4 md:space-y-0 md:space-x-4 py-24">
        <StickerGrid/>
      </div>
      <div class="absolute md:inset-0 flex md:justify-center md:items-center z-1 pointer-events-none">
        <div class="gravity font-synthemesc text-layneYellow text-[12vh] md:text-[20vh] lg:text-[30vh]  drop-shadow-hard text-left -mt-[80vw] md:-mt-0 "  >
          <div class="mt-[5vw] -mb-[10vw]">LAYNE</div>
          <div class="-mb-[10vw]">HARRIS</div>
          <div class="text-white">.COM</div>
        </div>
      </div>
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

const hero = ref(null)
const { $sanityClient } = useNuxtApp()

const fetchHero = async () => {
  try {
    const query = groq`*[_type == "hero"][0]{
        heroImage,
        "heroImageUrl": heroImage.asset->url,
        heroImage2,
        "heroImageUrl": heroImage2.asset->url,
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
.stripe-4 {
  background: repeating-linear-gradient(-55deg,
      #f72585,
      #f72585 100px,
      #4cc9f0 0px,
      #4cc9f0 200px,
      #f72585 20px);
  background-size: 48.9px 1080px;
  animation: moveStripes 60s linear infinite;
}

@keyframes moveStripes {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100vw 0vw;
  }
}

.gravity {
  animation: gravityAnimation 3s infinite alternate;
}

@keyframes gravityAnimation {
  from {
    font-variation-settings: 'YEST' 0, 'GRVT' -100;
  }

  to {
    font-variation-settings: 'YEST' 0, 'GRVT' 1000;
  }
}
</style>
