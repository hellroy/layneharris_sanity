<template>
    <ul>
      <li v-for="item in items" :key="item._id">
        <a :href="item.url">{{ item.name }}</a>
        <p>{{ item.description }}</p>
        <NavbarItem v-if="item.children" :items="item.children" />
      </li>
    </ul>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'NavbarItem',
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  })
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 0.5rem 0;
  }
  </style>
  