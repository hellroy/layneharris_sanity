<template>
  <div class="carousel-container">
    <swiper :slides-per-view="1" :space-between="10" :pagination="true" :navigation="true">
      <swiper-slide v-for="post in posts" :key="post._id">
        <NuxtLink
          class="card flex flex-col p-2.5 py-4 relative border-b border-gray-300 text-black no-underline md:border md:border-t-0 md:border-b-0 first:rounded-t last:rounded-b"
          :to="`/post/${post.slug.current}`"
        >
          <img
            v-if="post.coverImage"
            class="card__cover w-full h-[250px] object-cover md:min-w-[400px] md:max-w-[400px] md:max-h-[250px]"
            :src="urlFor(post.coverImage).width(500).height(300).url()"
            alt="Cover image"
          />
          <div v-else class="card__cover--none w-full h-[250px] bg-black md:min-w-[400px] md:max-w-[400px] md:max-h-[250px]" />
          <div class="card__container my-0 mx-2 md:mx-4 flex-grow">
            <h3 class="card__title font-sans font-extrabold text-2xl leading-8 tracking-tight mt-2 mb-1 md:mt-4 hover:opacity-80 transition-opacity duration-200">{{ post.title }}</h3>
            <p class="card__excerpt font-serif font-normal text-lg leading-7 mt-0">{{ post.excerpt }}</p>
            <p class="card__date font-sans font-semibold text-xs mt-4">{{ formatDate(post._createdAt) }}</p>
          </div>
        </NuxtLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { urlFor, formatDate } from '~/utils'
import { useNuxtApp } from '#app'

const posts = ref([])

const { $sanityClient } = useNuxtApp()

const fetchPosts = async () => {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    excerpt,
    slug,
    coverImage,
    _createdAt
  }`
  posts.value = await $sanityClient.fetch(query)
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.carousel-container {
  width: 100%;
}

.swiper-pagination-bullet {
  background: #333;
}

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
    min-width: 400px;
    max-width: 400px;
    max-height: 250px;
  }
}
</style>
