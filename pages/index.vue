<template>
  <section>
    <Hero/>
  </section>
  <div class="starburst starburst--both">
    <section class="xl:w-[60%] m-auto relative p-4 md:p-0 md:py-8">
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

const projectsQuery = groq`*[ _type == "project" && defined(slug.current) ] | order(date desc)`;

// Fetch projects
const { data: projects } = await useSanityQuery(projectsQuery);
</script>
