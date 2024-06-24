<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li v-for="item in navItems" :key="item._id" class="nav-item">
        <NuxtLink :to="item.url || `/${item.slug.current}`" class="nav-link">{{ item.name }}</NuxtLink>
        <p class="nav-description">{{ item.description }}</p>
        <NavbarItem v-if="item.children" :items="item.children" />
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import NavbarItem from './NavbarItem.vue'

export default defineComponent({
  components: {
    NavbarItem,
  },
  setup() {
    const navItems = ref([])

    const { $sanityClient } = useNuxtApp()

    const fetchNavItems = async () => {
      const query = `*[_type == "navType" && !defined(parent)] {
        _id,
        name,
        description,
        slug,
        url,
        "children": *[_type == "navType" && references(^._id)] {
          _id,
          name,
          description,
          slug,
          url
        }
      }`
      navItems.value = await $sanityClient.fetch(query)
    }

    onMounted(() => {
      fetchNavItems()
    })

    return {
      navItems
    }
  }
})
</script>

<style scoped>
.navbar {
  width: 100vw;
  background-color: #f0f0f0;
  padding: 1rem 0;
}

.nav-list {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  display: block;
}

.nav-link:hover + .nav-description,
.nav-description:hover {
  display: block;
}

.nav-description {
  display: none;
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 0.5rem;
  width: max-content;
  max-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  white-space: nowrap;
  color: #333;
}
</style>
