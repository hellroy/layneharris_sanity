<script setup>
import { useRoute } from 'vue-router'
import { PortableText } from '@portabletext/vue'

const route = useRoute()

const query = groq`*[ _type == "post" && slug.current == $slug][0]`
const { data: post } = await useSanityQuery(query, {
  slug: route.params.slug,
})
</script>

<template>
  <section v-if="post" class="post w-full my-4 md:my-16 px-4 md:py-4">
    <div class="m-auto text-center">
    <img
      v-if="post.coverImage"
      class="post__cover w-full h-52 object-cover md:w-[750px] md:h-[380px] rounded-lg m-auto drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]"
      :src="urlFor(post.coverImage).width(1920).url()"
      alt="Cover image"
    />
    <div v-else class="post__cover--none w-full h-52 md:w-[750px] md:h-[380px]" />
    <div class="post__container px-6 md:px-12 w-[75%] m-auto">
      <h1 class="post__title text-3xl md:text-5xl  font-headings text-layneYellow leading-tight mt-4 md:mt-8 mb-4 md:mb-6">{{ post.title }}</h1>
      <p class="post__excerpt font-sans text-white text-xl md:text-2xl leading-snug mt-0">{{ post.excerpt }}</p>
      <p class="post__date font-sans text-layneBlue font-semibold text-xs md:text-lg mt-4">{{ formatDate(post._createdAt) }}</p>
      <div v-if="post.body" class="post__content font-sans text-white text-lg md:text-xl leading-relaxed mt-6 md:mt-12">
        <PortableText :value="post.body" />
      </div>
    </div>
  </div>
  </section>
</template>

<style scoped>
.post__content blockquote {
  @apply border-l-4 border-black pl-6 ml-8;
}

.post__content a {
  @apply text-blue-600 no-underline;
}
</style>
