<script lang="ts" setup>
import type { Post } from '~/types/Post'
import { formatDate, urlFor } from '~/utils'

defineProps<{ post: Post }>()
</script>

<template>
  <NuxtLink 
    class="card flex flex-col p-2.5 relative border-b border-gray-300 text-black no-underline"
    :to="`/post/${post.slug.current}`"
  >
    <img
      v-if="post.coverImage"
      class="card__cover w-full h-[231px] object-cover"
      :src="urlFor(post.coverImage).width(500).height(300).url()"
      alt="Cover image"
    />

    <div v-else class="card__cover--none w-full h-[231px] bg-black" />

    <div class="card__container my-0 mx-2.5 md:mx-4 flex-grow">
      <h3 class="card__title font-sans font-extrabold text-2xl leading-8 tracking-tight mt-2.5 mb-0.5 md:mt-4 hover:opacity-80 transition-opacity duration-200">{{ post.title }}</h3>
      <p class="card__excerpt font-serif font-normal text-lg leading-7 mt-0">{{ post.excerpt }}</p>
      <p class="card__date font-sans font-semibold text-xs mt-4">{{ formatDate(post._createdAt) }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.card:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

@media (min-width: 575px) {
  .card {
    border: 1px solid #ced2d9;
    border-bottom: none;
  }

  .card:last-child {
    border-bottom: 1px solid #ced2d9;
  }
}

@media (min-width: 800px) {
  .card {
    flex-direction: row;
  }

  .card__cover,
  .card__cover--none {
    min-width: 366.5px;
    max-width: 366.5px;
    max-height: 231px;
  }
}
</style>
