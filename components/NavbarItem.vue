<template>
  <ul class="list-none p-0">
    <li v-for="item in items" :key="item._id" class="my-2">
      <a :href="item.url" class="text-blue-600 hover:underline">{{ item.name }}</a>
      <p class="text-gray-700">{{ item.description }}</p>
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
