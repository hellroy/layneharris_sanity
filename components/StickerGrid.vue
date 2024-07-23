<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-0 w-full overflow-hidden top-20 md:top-0 relative md:h-screen">
    <div
      v-for="(sticker, index) in stickers"
      :key="sticker._id"
      class="sticker-item brightness-75 hover:scale-110 hover:brightness-100 transition-transform duration-300 ease-in-out hover:rotate-3 md:hover:z-50 relative cursor-pointer"
      @mouseenter="showInfoBox(sticker.description, $event)"
      @mouseleave="hideInfoBox"
      @mousemove="updateInfoBoxPosition"
    >
      <img
        :src="sticker.sticker || 'https://via.placeholder.com/150'"
        :alt="sticker.name"
        sizes="40vw sm:50vw md:450px"
        class="max-w-[200px] md:max-w-[350px] lg:max-w-[450px]"
        :style="`transform: rotate(${randomRotations[index]}deg)`"
      />
    </div>
  </div>
  <div
    v-if="infoBoxVisible && !isMobile"
    :style="{ top: `${mouseY}px`, left: `${mouseX}px` }"
    class="info-box fixed bg-white p-2 border rounded shadow-lg z-50"
  >
    {{ infoBoxContent }}
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAsyncData } from '#app';

// Function to generate a random rotation between -15 and 15 degrees
const generateRandomRotations = (length) => {
  return Array.from({ length }, () => (Math.random() - 0.5) * 30);
};

// Fetch the stickers data
const { data: stickers, pending, error } = await useAsyncData('stickers', async () => {
  const response = await fetch('https://layneharris.com/.netlify/functions/stickers');
  const data = await response.json();
  //console.log(data); // Log the data to verify its structure
  return data;
});


// Generate random rotations based on the length of the stickers array
const randomRotations = computed(() => generateRandomRotations(stickers.value.length));

const infoBoxVisible = ref(false);
const infoBoxContent = ref('');
const mouseX = ref(0);
const mouseY = ref(0);

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
const isMobile = ref(window.innerWidth <= 768);

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
