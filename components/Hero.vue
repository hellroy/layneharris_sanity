<template>
  <div class="m-auto md:w-full text-center h-screen -mt-20 md:-mt-24 -z-20 border-b-layneYellow border-b-2"
    v-if="hero">
    <div class="h-screen stripe-4 relative flex flex-col md:flex-row justify-center items-center">
      <div class="relative flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 py-24 md:max-h-[106vh] overflow-visible">
        <StickerGrid />
      </div>
      <div class="absolute flex md:justify-center md:items-center z-1 pointer-events-none">
        <div
          class="font-synthemesc text-layneYellow  drop-shadow-hard text-left -min-mt-20 md:-mt-0  ">
          <div class="flex flex-col gap-0 h-[80%] text-[30vw] lg:text-[1700%] leading-snug ">
            <div class="m-auto -my-5" >LAYNE</div>
            <div class="m-auto  -my-5" >HARRIS</div>
            <div class="m-auto -my-5">.COM</div>
          </div>
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
</style>
