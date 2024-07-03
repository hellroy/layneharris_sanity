<template>
  <nav class="w-full bg-layneDarkBlue z-10 opacity-[.8] fixed border-b-layneMedBlue border-b-2">
    <ul class="flex justify-around items-center list-none p-0 m-0 h-16">
      <NavbarItem
        v-for="item in sortedNavItems"
        :key="item._id"
        :item="item"
        :get-link="getLink"
      />
      <Search />
    </ul>
  </nav>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useNuxtApp } from '#app'
import NavbarItem from '~/components/NavbarItem.vue'

export default defineComponent({
  components: {
    NavbarItem
  },
  setup() {
    const navItems = ref([])
    const { $sanityClient } = useNuxtApp()

    const fetchNavItems = async () => {
      const query = `*[_type == "navType"] | order(order asc) {
        _id,
        name,
        description,
        slug,
        url,
        order,
        parent,
        type,
        "children": *[_type == "navType" && references(^._id)] | order(order asc) {
          _id,
          name,
          description,
          slug,
          url,
          order,
          parent,
          type,
          "children": *[_type == "navType" && references(^._id)] | order(order asc) {
            _id,
            name,
            description,
            slug,
            url,
            order,
            parent,
            type
          }
        }
      }`
      try {
        navItems.value = await $sanityClient.fetch(query)
      } catch (error) {
        console.error('Error fetching nav items:', error)
      }
    }

    const sortedNavItems = computed(() => {
      const rootItems = navItems.value.filter(item => !item.parent)
      const sortItems = items => items.sort((a, b) => a.order - b.order).map(item => ({
        ...item,
        children: sortItems(item.children || [])
      }))
      return sortItems(rootItems)
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
      getLink
    }
  }
})
</script>
