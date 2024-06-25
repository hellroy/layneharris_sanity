<script setup>

defineProps({
  project: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <NuxtLink
    class="card flex flex-col p-3 text-black no-underline m-auto text-center"
    :to="`/project/${project.slug.current}`"
  >
  <div class="group">
    <img
      v-if="project.coverImage"
      class="aspect-square object-cover rounded-lg border-laynePink border-2 border-spacing-2 border-dotted group-hover:rotate-[3deg] transition-transform duration-300 drop-shadow-[0_5px_5px_rgba(230,245,39,.8)] group-hover:drop-shadow-[0_200px_200px_rgba(255,255,0,255)] hover:"
      :src="urlFor(project.coverImage).width(500).height(300).url()"
      alt="Cover image"
    />
    <div v-else class="w-full h-56 bg-black"></div>

    <div class="mt-2 drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]">
      <h3 class="group-hover:rotate-[-1deg] transition-transform duration-300 font-headings text-4xl mb-1 text-layneYellow gradient rotate-3 py-3 -mt-4  ">
        {{ project.title }}
      </h3>
    </div>
  </div>
  </NuxtLink>
</template>

<style scoped>

.gradient {
  background: linear-gradient(-45deg, #f72585, #7209b7, #3a0ca3, #000000);
}
</style>