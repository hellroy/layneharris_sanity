<script setup>
import { useRoute } from 'vue-router'
import { PortableText } from '@portabletext/vue'

const route = useRoute()

const query = groq`*[ _type == "project" && slug.current == $slug][0]`
const { data: project } = await useSanityQuery(query, {
  slug: route.params.slug,
})
</script>

<template>
  <section v-if="project" class="project w-full my-4 mt-24 md:mt-0 md:my-16">
    <div class="m-auto w-[75%]">
    <img
      v-if="project.coverImage"
      class="project__cover w-full h-52 object-cover md:w-[750px] h-full m-auto rounded-lg drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]"
      :src="urlFor(project.coverImage).width(1920).url()"
      alt="Cover image"
    />
    <div v-else class="project__cover--none w-full h-5 after:md:w-[750px] md:h-[380px]" />
    <div class="project__container px-6 md:px-12">

      <h1 class="project__title text-3xl md:text-5xl font-headings text-layneYellow text-center leading-tight mt-4 md:mt-8 mb-4 md:mb-6">{{ project.title }}</h1>
      <p class="project__excerpt font-serif text-xl md:text-2xl leading-snug mt-0">{{ project.excerpt }}</p>
      <p class="project__date font-sans font-semibold text-center text-xs md:text-lg mt-4 text-layneBlue">Launched: {{ formatDate(project.date) }}</p>
      <div v-if="project.body" class="project__content font-sans text-white text-lg md:text-xl leading-relaxed mt-6 md:mt-12">
        <PortableText :value="project.body" />
      </div>
    </div>
  </div>
  </section>
</template>

<style scoped>
.project__content blockquote {
  @apply border-l-4 border-black pl-6 ml-8;
}

h3 {
  @apply text-4xl text-layneYellow !important;
}

.project__content a {
  @apply text-blue-600 no-underline;
}
</style>
