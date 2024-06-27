<template>
  <li
    @mouseenter="showSubNav = true"
    @mouseleave="showSubNav = false"
    :class="['nav-item', getItemClass(item.type)]"
  >
    <span v-if="!item.slug" class="no-underline text-layneYellow p-2.5 block uppercase font-silkscreen drop-shadow-[0_5px_5px_rgba(230,245,39,.8)] hover:text-laynePink cursor-pointer">{{ item.name }}</span>
    <NuxtLink v-else :to="getLink(item)" class="no-underline text-layneYellow p-2.5 block uppercase font-silkscreen drop-shadow-[0_5px_5px_rgba(230,245,39,.8)] hover:text-laynePink">{{ item.name }}</NuxtLink>
    <ul v-if="item.children && item.children.length" :class="['sub-nav-list', getListClass(item.type), { 'hidden': !showSubNav }]">
      <NavbarItem
        v-for="subItem in item.children"
        :key="subItem._id"
        :item="subItem"
        :get-link="getLink"
        :class="[getItemClass(subItem.type)]"
      />
    </ul>
  </li>
</template>


<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    },
    getLink: {
      type: Function,
      required: true
    }
  },
  setup() {
    const showSubNav = ref(false)

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

    const getListClass = (type) => {
      switch (type) {
        case 'main':
          return 'main'
        case 'sub':
          return 'sub'
        case 'sub-sub':
          return 'sub-sub'
        default:
          return ''
      }
    }

    return {
      showSubNav,
      getItemClass,
      getListClass
    }
  }
})
</script>

<style scoped>
.nav-item {
  position: relative;
  /* Add any common styles for nav items here */
}

.main-nav-item {
  /* Styles specific to main nav items */
  padding-bottom: 4px;
}

.sub-nav-item {
  /* Styles specific to sub nav items */
  left: 20%;
  background-color: var(--layneBlue);
}

.sub-sub-nav-item {
  /* Styles specific to sub-sub nav items */
  left: 103%; 
  margin-top: -40px;
  margin-bottom: 40px;
  background-color: var(--layneMedBlue);
}

.sub-nav-list {
  display: none;
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 0; /* Initial state for transition */
  transition: opacity 0.3s ease-in-out; /* Add transition for opacity */
}

.nav-item:hover > .sub-nav-list,
.sub-nav-item:hover > .sub-nav-list {
  display: block;
  opacity: 1; /* Final state for transition */
}

.main {
  left: 0;
  top: 100%;
}

.sub {
  left: 0;
  top: 100%;
}

.sub-sub {
  left: 100%; /* Move sub-sub nav items to the right of their parent */
  top: 0;
  margin-left: 1rem; /* Ensure sufficient spacing */
}

.nav-item a,
.sub-nav-item a,
.sub-sub-nav-item a {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--layneYellow);
}

.nav-item a:hover,
.sub-nav-item a:hover,
.sub-sub-nav-item a:hover {
  background-color: var(--laynePink);
  color: var(--layneDarkBlue);
}
</style>
