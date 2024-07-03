<template>
    <div class="grid grid-cols-4 gap-0 mt-12 w-full overflow-visible">
      <div 
        v-for="(sticker, index) in stickers" 
        :key="sticker._id" 
        class="sticker-item brightness-75 hover:scale-110 hover:brightness-100 transition-transform duration-300 ease-in-out hover:rotate-3"
      >
        <img 
          :src="sticker.sticker || 'https://via.placeholder.com/150'" 
          :alt="sticker.name" 
          class="max-w-[450px] h-auto "
          :style="`transform: rotate(${randomRotations[index]}deg)`"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import groq from 'groq'; // Import the 'groq' function
  import { ref, onMounted } from 'vue';
  
  // Function to generate a random rotation between -15 and 15 degrees
  const generateRandomRotations = (length) => {
    return Array.from({ length }, () => (Math.random() - 0.5) * 30);
  };
  
  // Define the GROQ query to fetch stickers
  const stickersQuery = groq`*[_type == "sticker"] | order(name desc){_id, name, description, "sticker": sticker.asset->url}`;
  
  const stickers = ref([]);
  const randomRotations = ref([]);
  const error = ref(null);
  
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
  </script>
  
  <style scoped>
  .sticker-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  