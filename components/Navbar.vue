<template>
  <nav class="w-full bg-layneDarkBlue z-10 opacity-[.8] fixed ">
    <ul class="flex justify-around items-center list-none p-0 m-0 h-16">

      <li v-for="item in sortedNavItems" :key="item._id" class="relative group hover:text-laynePink ">
        <NuxtLink :to="getLink(item)" class="no-underline text-layneYellow p-2.5 block uppercase font-silkscreen drop-shadow-[0_5px_5px_rgba(230,245,39,.8)] hover:text-laynePink ">{{ item.name }}</NuxtLink>
        <ul v-if="item.children && item.children.length" class="absolute top-full left-0 bg-layneBlue list-none p-0 m-0 hidden group-hover:block hover:text-laynePink z-20">
          <li v-for="subItem in item.children" :key="subItem._id" class="relative">
            <NuxtLink :to="getLink(subItem)" class="no-underline p-2.5 block  text-layneYellow font-silkscreen">{{ subItem.name }}</NuxtLink>
          </li>
        </ul>
      </li>
      <Search />
    </ul>
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
