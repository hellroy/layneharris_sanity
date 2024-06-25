<template>
  <nav class="w-full bg-gray-200 py-4 relative z-10">
    <ul class="flex justify-around list-none p-0 m-0">
      <li v-for="item in sortedNavItems" :key="item._id" class="relative group">
        <NuxtLink :to="getLink(item)" class="no-underline text-gray-800 p-2.5 block">{{ item.name }}</NuxtLink>
        <ul v-if="item.children && item.children.length" class="absolute top-full left-0 bg-gray-200 list-none p-0 m-0 hidden group-hover:block z-20">
          <li v-for="subItem in item.children" :key="subItem._id" class="relative">
            <NuxtLink :to="getLink(subItem)" class="no-underline text-gray-800 p-2.5 block hover:bg-gray-300">{{ subItem.name }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed bottom-0 w-full bg-white border border-gray-300 p-2.5 shadow-md text-center text-gray-800" v-if="description">{{ description }}</div>
  </nav>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useNuxtApp } from '#app'

export default defineComponent({
  setup() {
    const navItems = ref([])
    const description = ref('')

    const { $sanityClient } = useNuxtApp()

    const fetchNavItems = async () => {
      const query = `*[_type == "navType" && !defined(parent)] | order(order asc) {
        _id,
        name,
        description,
        slug,
        url,
        order,
        "children": *[_type == "navType" && references(^._id)] | order(order asc) {
          _id,
          name,
          description,
          slug,
          url,
          order
        }
      }`
      try {
        navItems.value = await $sanityClient.fetch(query)
      } catch (error) {
        console.error('Error fetching nav items:', error)
      }
    }

    const sortedNavItems = computed(() => {
      return navItems.value.sort((a, b) => a.order - b.order)
    })

    const getLink = (item) => {
      if (item.url) return item.url
      if (item.slug && item.slug.current) {
        return `/${item.slug.current}`
      }
      return '#'
    }

    onMounted(() => {
      fetchNavItems()
    })

    return {
      navItems,
      sortedNavItems,
      description,
      getLink
    }
  }
})
</script>

<style scoped>
.nav-item:hover .sub-nav-list {
  display: block;
}
</style>
