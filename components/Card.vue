<template>
  <div class="carousel-container overflow-visible gradient-border p-1 drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]">
    <swiper :modules="[Autoplay, Pagination, Navigation]" :slides-per-view="1" :space-between="10" controller-control=".swiper-2" :autoplay="{
      delay: 10000,
      disableOnInteraction: false,
    }" pagination navigation>
      <swiper-slide v-for="post in posts" :key="post._id">
        <NuxtLink
          class="flex flex-col p-4 py-8 md:p-12 relative text-layneYellow no-underline first:rounded-t last:rounded-b "
          :to="`/post/${post.slug.current}`">
          <img v-if="post.coverImage"
            class="card__cover w-full md:h-[250px] xl:h-full object-cover md:min-w-[400px] md:max-w-[400px] md:max-h-[250px] xl:max-w-full xl:max-h-full m-auto rounded-lg drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]"
            :src="urlFor(post.coverImage).width(500).height(300).url()" alt="Cover image" />
          <div v-else
            class="card__cover--none w-full md:h-[350px] bg-layneYellow md:min-w-[400px] md:max-w-[400px] md:max-h-[250px] " />
          <div class="card__container my-0 mx-2 md:mx-4 flex-grow">
            <h3
              class="card__title font-headings text-4xl leading-8 tracking-tight mt-2 mb-1 md:mt-4 hover:opacity-80 transition-opacity duration-200 text-center drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]">
              {{ post.title }}</h3>
            <p class="card__excerpt font-serif font-normal text-lg leading-7 mt-0 text-center">{{ post.excerpt }}</p>
            <p class="card__date font-sans font-semibold text-xs mt-4 text-center drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]">{{ formatDate(post._createdAt) }}</p>
          </div>
        </NuxtLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
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
.gradient-border {
  --borderWidth: 3px;
  background: #7209b7;
  position: relative;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}

@keyframes animatedgradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

.carousel-container {
  width: 100%;
  height: 100%;
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
    border: 1px dotted #ffff3f;
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

.swiper-2{
  --swiper-pagination-color: #f72585;
  --swiper-navigation-color: #f72585;
}


</style>
