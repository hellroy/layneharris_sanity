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
    <img
      v-if="project.coverImage"
      class="project-card aspect-square object-cover rounded-lg group hover:rotate-[-3deg] transition-transform duration-300"
      :src="urlFor(project.coverImage).width(500).height(300).url()"
      alt="Cover image"
    />
    <div v-else class="w-full h-56 bg-black"></div>

    <div class="mt-2">
      <h3 class="project-card-title font-headings text-4xl mb-1 text-layneYellow bg-layneDarkBlue rotate-3 py-3 -mt-4 group-hover:rotate-[-3deg] transition-transform duration-300">
        {{ project.title }}
      </h3>
    </div>
  </NuxtLink>
</template>