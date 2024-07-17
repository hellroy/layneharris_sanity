<template>

  <nav class="w-full z-10 fixed font-silkscreen text-[1.5em] backdrop-blur-xl backdrop-saturate-150 backdrop">
    <div class="flex justify-between items-center p-4">
      <button @click="toggleMenu" class="hamburger text-layneYellow">
        ☰
      </button>
    </div>

    <div v-if="menuOpen" class="backdrop-blur-xl z-20 opacity-90 h-screen w-screen text-center  text-layneYellow">
      <div class="w-full mt-auto">
          <Search class="w-full px-2" />
        </div>
      <ul class="flex flex-col items-start list-none m-0 w-full">
        <li v-for="item in sortedNavItems" :key="item._id" class="nav-item w-full">
          <div
            @click="handleClick(item)"
            :class="['menu-item', getItemClass(item.type), { 'active': isActive(item), 'has-children': item.children && item.children.length }]"
          >
            <span v-if="!item.slug">{{ item.name }}</span>
            <NuxtLink v-else :to="getLink(item)" @click="closeMenu" :class="{ 'active': isActive(item) }">{{ item.name }}</NuxtLink>
          </div>
          <ul v-if="item.children && item.children.length" class="submenu w-full">
            <li v-for="subItem in item.children" :key="subItem._id" class="submenu-item w-full">
              <div
                @click="handleClick(subItem)"
                :class="['menu-item', getItemClass(subItem.type), { 'active': isActive(subItem), 'has-children': subItem.children && subItem.children.length }]"
              >
                <span v-if="!subItem.slug">{{ subItem.name }}</span>
                <NuxtLink v-else :to="getLink(subItem)" @click="closeMenu" :class="{ 'active': isActive(subItem) }">{{ subItem.name }}</NuxtLink>
              </div>
              <ul v-if="subItem.children && subItem.children.length" class="sub-submenu w-full">
                <li v-for="subSubItem in subItem.children" :key="subSubItem._id" class="sub-submenu-item w-full text-layneYellow">
                  <NuxtLink :to="getLink(subSubItem)" @click="closeMenu" :class="{ 'active': isActive(subSubItem) }">{{ subSubItem.name }}</NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>

  </nav>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
import Search from '~/components/Search.vue'

export default defineComponent({
  components: {
    Search
  },
  setup() {
    const navItems = ref([])
    const menuOpen = ref(false)
    const { $sanityClient } = useNuxtApp()
    const route = useRoute()
    const router = useRouter()

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

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    const isActive = (item) => {
      return route.path === `/${item.slug?.current}`
    }

    const goToLink = (item) => {
      router.push(getLink(item))
      closeMenu()
    }

    const getItemClass = (type) => {
      switch (type) {
        case 'main':
          return 'main-nav-item'
        case 'sub':
          return 'sub-nav-item'
        case 'sub-sub':
          return 'sub-sub-nav-item'
        default:
          return ''
      }
    }

    const handleClick = (item) => {
      console.log(`Clicked item: ${item.name}, Type: ${item.type}, Has children: ${item.children && item.children.length > 0}`)
      if (!item.slug && item.children && item.children.length > 0) {
        console.log(`Sub-subnav items for ${item.name} are now visible.`)
      } else if (item.slug) {
        goToLink(item)
      }
    }

    onMounted(() => {
      fetchNavItems()
    })

    return {
      navItems,
      sortedNavItems,
      getLink,
      menuOpen,
      toggleMenu,
      closeMenu,
      isActive,
      goToLink,
      getItemClass,
      handleClick
    }
  }
})
</script>

<style scoped>
a {
  color: var(--layneYellow);
}
.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-item {
  padding: 10px;
  cursor: pointer;
  font-size: 1.75em;
}

.menu-item.active {
  color: var(--laynePink);
}

.submenu,
.sub-submenu {
  list-style: none;
}

.submenu-item {
  font-size: 14px;
}

.sub-submenu-item {
  font-size: 1rem;
}
</style>
