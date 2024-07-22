<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-0 w-full overflow-hidden md:h-screen">
    <div 
      v-for="(sticker, index) in stickers" 
      :key="sticker._id" 
      class="sticker-item brightness-75 hover:scale-110 hover:brightness-100 transition-transform duration-300 ease-in-out hover:rotate-3 md:hover:z-50 relative cursor-pointer"
      @mouseenter="showInfoBox(sticker.description, $event)"
      @mouseleave="hideInfoBox"
      @mousemove="updateInfoBoxPosition"
    >
      <NuxtImg 
        :src="sticker.sticker || 'https://via.placeholder.com/150'" 
        :alt="sticker.name" 
        sizes="40vw sm:50vw md:450px"
        format="webp"
        class="max-w-[200px] md:max-w-[450px] h-auto"
        :style="`transform: rotate(${randomRotations[index]}deg)`"
      />
    </div>
  </div>
  <div v-if="infoBoxVisible && !isMobile" 
       :style="{ top: `${mouseY}px`, left: `${mouseX}px` }" 
       class="info-box fixed bg-white p-2 border rounded shadow-lg z-50">
    {{ infoBoxContent }}
  </div>
</template>


<script setup>
import groq from 'groq'; 
import { ref, onMounted, computed } from 'vue';

// Function to generate a random rotation between -15 and 15 degrees
const generateRandomRotations = (length) => {
  return Array.from({ length }, () => (Math.random() - 0.5) * 30);
};

// Define the GROQ query to fetch stickers
const stickersQuery = groq`*[_type == "sticker"] | order(name desc){_id, name, description, "sticker": sticker.asset->url}`;

const stickers = ref([]);
const randomRotations = ref([]);
const error = ref(null);

const infoBoxVisible = ref(false);
const infoBoxContent = ref('');
const mouseX = ref(0);
const mouseY = ref(0);

onMounted(async () => {
  try {
    const { data } = await useSanityQuery(stickersQuery);
    if (data && data._value) {
      stickers.value = data._value;
      randomRotations.value = generateRandomRotations(stickers.value.length);
    } else {
      error.value = 'No stickers found';
    }
  } catch (err) {
    error.value = 'Failed to fetch stickers';
  }
});

const showInfoBox = (content, event) => {
  infoBoxContent.value = content;
  infoBoxVisible.value = true;
  updateInfoBoxPosition(event);
};

const hideInfoBox = () => {
  infoBoxVisible.value = false;
};

const updateInfoBoxPosition = (event) => {
  mouseX.value = event.clientX + 10; // Offset to position the box correctly
  mouseY.value = event.clientY + 10; // Offset to position the box correctly
};

// Detect mobile viewport
const isMobile = computed(() => {
  return window.innerWidth <= 768;
});

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768;
});
</script>



<style scoped>
.sticker-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-box {
  pointer-events: none; /* To ensure it doesn't block other elements */
  transition: opacity 0.2s;
}
</style>

  