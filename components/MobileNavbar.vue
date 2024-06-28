<template>
    <nav class="w-full bg-layneDarkBlue z-10 fixed">
      <div class="flex justify-between items-center p-4">
        <button @click="toggleMenu" class="hamburger text-layneYellow">
          ☰
        </button>
      </div>
      <div v-if="menuOpen" class="bg-layneDarkBlue z-20 opacity-90 h-screen w-screen">
        <ul class="flex flex-col items-start list-none p-4 m-0 w-full">
          <li v-for="item in sortedNavItems" :key="item._id" class="nav-item w-full">
            <div 
              @click="handleClick(item)" 
              :class="['menu-item', getItemClass(item.type), { 'active': isActive(item), 'has-children': item.children && item.children.length }]"
            >
              <span v-if="!item.slug">{{ item.name }}</span>
              <NuxtLink v-else :to="getLink(item)" :class="{ 'active': isActive(item) }">{{ item.name }}</NuxtLink>
            </div>
            <ul v-if="item.children && item.children.length" class="submenu w-full">
              <li v-for="subItem in item.children" :key="subItem._id" class="submenu-item w-full">
                <div 
                  @click="handleClick(subItem)" 
                  :class="['menu-item', getItemClass(subItem.type), { 'active': isActive(subItem), 'has-children': subItem.children && subItem.children.length }]"
                >
                  <span v-if="!subItem.slug">{{ subItem.name }}</span>
                  <NuxtLink v-else :to="getLink(subItem)" :class="{ 'active': isActive(subItem) }">{{ subItem.name }}</NuxtLink>
                </div>
                <ul v-if="subItem.children && subItem.children.length" :class="['sub-submenu', { 'open': subItem.showChildren }]">
                  <li v-for="subSubItem in subItem.children" :key="subSubItem._id" class="sub-submenu-item w-full">
                    <NuxtLink 
                      :to="getLink(subSubItem)" 
                      :class="{ 'active': isActive(subSubItem) }"
                      @click="handleClick(subSubItem)"
                    >{{ subSubItem.name }}</NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <div class="w-full mt-auto">
            <Search class="w-full" />
          </div>
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
          showChildren: false,
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
  
      const toggleSubMenu = (item) => {
        item.showChildren = !item.showChildren
        if (item.showChildren) {
          console.log(`Sub-subnav items for ${item.name} are now visible.`)
        } else {
          console.log(`Sub-subnav items for ${item.name} are now hidden.`)
        }
      }
  
      const isActive = (item) => {
        return route.path === `/${item.slug?.current}`
      }
  
      const goToLink = (item) => {
        router.push(getLink(item))
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
          toggleSubMenu(item)
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
        toggleSubMenu,
        isActive,
        goToLink,
        getItemClass,
        handleClick
      }
    }
  })
  </script>
  
  <style scoped>
  .hamburger {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .menu-item {
    padding: 10px;
    cursor: pointer;
    color: var(--layneYellow);
  }
  
  .main-nav-item {
    background-color: lightblue;
  }
  
  .sub-nav-item {
    background-color: lightgreen;
  }
  
  .sub-sub-nav-item {
    background-color: lightcoral;
  }
  
  .menu-item.has-children {
    background-color: lightgray;
  }
  
  .menu-item.active {
    color: var(--laynePink);
  }
  
  .submenu, .sub-submenu {
    list-style: none;
    padding-left: 20px;
  }
  
  .submenu-item {
    font-size: 14px;
    padding: 5px;
  }
  
  .sub-submenu-item {
    font-size: 12px;
    padding: 3px;
  }
  
  .submenu {
    display: block; /* Submenus are always visible */
  }
  
  .sub-submenu {
    display: none;
  }
  
  .sub-submenu.open {
    display: block;
  }
  </style>
  