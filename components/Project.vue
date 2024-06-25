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
    class="card flex flex-col p-3 border-b border-gray-300 text-black no-underline"
    :to="`/project/${project.slug.current}`"
  >
    <img
      v-if="project.coverImage"
      class="w-full h-56 object-cover"
      :src="urlFor(project.coverImage).width(500).height(300).url()"
      alt="Cover image"
    />
    <div v-else class="w-full h-56 bg-black"></div>

    <div class="mt-2">
      <h3 class="font-bold text-lg mb-1">
        {{ project.title }}
      </h3>
      <p class="text-gray-700 mb-2">
        {{ project.excerpt }}
      </p>
      <p class="text-sm text-gray-500">
        {{ formatDate(project._createdAt) }}
      </p>
    </div>
  </NuxtLink>
</template>
