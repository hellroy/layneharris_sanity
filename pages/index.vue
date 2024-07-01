<template>
  <section>
    <Hero/>
  </section>
  <div class="starburst starburst--both">
  <section class="md:w-[60%] m-auto relative p-4 md:p-0 md:py-8">
    <div class="font-silkscreen text-layneYellow text-3xl md:text-[1.5em] text-center md:text-left uppercase py-2 drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]">Blog</div>
    <Card />
  </section>
  <section class="md:w-[60%] m-auto  p-4 md:p-0 md:py-8">
    <div class="font-silkscreen text-3xl md:text-[1.5em] uppercase text-center md:text-left text-layneYellow drop-shadow-[0_5px_5px_rgba(230,245,39,.8)]">Projects</div>
    <div class="projects-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
      <Project v-for="project in projects || []" :key="project._id" :project="project" />
    </div>
  </section>
  </div>
</template>

<script setup>
import groq from 'groq'; // Import the 'groq' function
//import { useSanityQuery } from '~/composables/useSanity';

// Define separate queries for posts and projects
//const postsQuery = groq`*[ _type == "post" && defined(slug.current) ] | order(_createdAt desc)`;
const projectsQuery = groq`*[ _type == "project" && defined(slug.current) ] | order(_createdAt desc)`;

// Fetch posts
//const { data: posts } = await useSanityQuery(postsQuery);

// Fetch projects
const { data: projects } = await useSanityQuery(projectsQuery);

</script>
