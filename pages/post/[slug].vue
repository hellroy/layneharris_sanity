<script setup>
import { useRoute } from 'vue-router'
import { PortableText  } from '@portabletext/vue'

const route = useRoute()

const query = groq`*[ _type == "post" && slug.current == $slug][0]`
const { data: post } = await useSanityQuery(query, {
  slug: route.params.slug,
})

const components = {
  blocks: {
    normal: (_, { slots }) => h('p', { class: 'sheep mb-2 text-8xl text-slate-500 bg-black' }, slots.default?.()),
    h1: (_, { slots }) => h('h1', { class: 'text-laynePink' }, slots.default?.()),
        // Ex. 2: rendering custom styles
        customHeading: (_, { slots }) =>
      h('h3', { class: 'text-lg text-primary text-purple-700' }, slots.default?.()),
  },
};
</script>

<template>
  <section v-if="post" class="post w-full my-4 md:my-16 px-4 md:py-4">
    <div class="m-auto text-center px-4">
    <NuxtImg
      v-if="post.coverImage"
      format="webp"
      class="post__cover w-full object-cover md:w-[750px] md:h-[750px] rounded-lg m-auto drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]"
      :src="urlFor(post.coverImage).width(1920).url()"
      alt="Cover image"
    />
    <div v-else class="post__cover--none w-full h-52 md:w-[750px] md:h-[380px]" />
    <div class="m-auto md:w-[75%] py-8">
    <div class="post__container px-6 md:px-12 text-left">
      <h1 class="post__title text-3xl md:text-5xl  font-headings text-layneYellow leading-tight mt-4 md:mt-8 mb-4 md:mb-6">{{ post.title }}</h1>
      <p class="post__excerpt font-sans text-white text-xl md:text-2xl leading-snug mt-0">{{ post.excerpt }}</p>
      <p class="post__date font-sans text-layneBlue font-semibold text-xs md:text-lg mt-4">{{ formatDate(post._createdAt) }}</p>
      <div v-if="post.body" class="font-sans text-white text-lg md:text-xl leading-relaxed mt-6 md:mt-12">
        <PortableText :value="post.body" :components={components} />
      </div>
    </div>
  </div>
  </div>
  </section>
</template>

<style scoped>
  p {
    @apply mb-[2em];
  }

</style>
