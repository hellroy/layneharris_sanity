<script setup>
import groq from 'groq'; // Import the 'groq' function
//import { useSanityQuery } from '~/composables/useSanity';

// Define separate queries for posts and projects
const postsQuery = groq`*[ _type == "post" && defined(slug.current) ] | order(_createdAt desc)`;
const projectsQuery = groq`*[ _type == "project" && defined(slug.current) ] | order(_createdAt desc)`;

// Fetch posts
const { data: posts } = await useSanityQuery(postsQuery);

// Fetch projects
const { data: projects } = await useSanityQuery(projectsQuery);

</script>

<template>
  <section class="w-[50%] m-auto py-8" >
    <div>Blog</div>
    <Card/>
  </section>
  <section class="w-[50%] m-auto py-8" >
    <div>Projects</div>
    <Project v-for="project in projects || []" :key="project._id" :project="project" />
  </section>
</template>
