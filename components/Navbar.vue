<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li v-for="item in sortedNavItems" :key="item._id" class="nav-item">
        <NuxtLink :to="getLink(item)" class="nav-link">{{ item.name }}</NuxtLink>
        <ul v-if="item.children && item.children.length" class="sub-nav-list">
          <li v-for="subItem in item.children" :key="subItem._id" class="sub-nav-item">
            <NuxtLink :to="getLink(subItem)" class="sub-nav-link">{{ subItem.name }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
    <div class="nav-description" v-if="description">{{ description }}</div>
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
        console.log('Fetched Nav Items:', navItems.value) // Debug log
      } catch (error) {
        console.error('Error fetching nav items:', error)
      }
    }

    const sortedNavItems = computed(() => {
      return navItems.value.sort((a, b) => a.order - b.order)
    })

    const getLink = (item) => {
      console.log('Processing item:', item) // Debug log
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
.navbar {
  width: 100vw;
  background-color: #f0f0f0;
  padding: 1rem 0;
  position: relative;
  z-index: 10; /* Ensure navbar is on top */
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

.nav-item:hover .nav-description {
  display: block;
}

/* Ensure sub-navigation is displayed correctly */
.nav-item:hover .sub-nav-list {
  display: block;
}

.sub-nav-list {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f0f0f0;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 20; /* Ensure sub-nav is on top */
}

.sub-nav-item {
  position: relative;
}

.sub-nav-link {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  display: block;
}

.sub-nav-link:hover {
  background-color: #ddd;
}
</style>
