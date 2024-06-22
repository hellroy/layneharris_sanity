<script setup lang="ts">
import { type Project } from '~/types/Project'
import { PortableText } from '@portabletext/vue'

const route = useRoute()

const query = groq`*[ _type == "project" && slug.current == $slug][0]`
const { data: project } = await useSanityQuery<Project>(query, {
  slug: route.params.slug,
})
</script>

<template>
  <section v-if="project" class="project">
    <img
      v-if="project.coverImage"
      class="project__cover"
      :src="($urlFor(project.coverImage).width(1920).url())"
      alt="Cover image"
    />
    <div v-else class="project__cover--none" />
    <div class="project__container">
      <h1 class="project__title">{{ project.title }}</h1>
      <p class="project__excerpt">{{ project.excerpt }}</p>
      <p class="project__date">{{ formatDate(project._createdAt) }}</p>
      <div v-if="project.body" class="project__content">
        <PortableText :value="project.body" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.project {
  width: 100%;
  margin: var(--space-1) 0 var(--space-4);

  & .project__cover,
  & .project__cover--none {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  & .project__cover--none {
    background: var(--black);
  }

  & .project__container {
    padding: 0 var(--space-3);
  }

  & .project__content {
    font-family: var(--font-family-serif);
    font-weight: 400;
    font-size: var(--font-size-4);
    line-height: var(--line-height-5);
    letter-spacing: -0.02em;
    margin-top: var(--space-6);

    /* Targeting tags in PortableText */
    & blockquote {
      border-left: 5px solid var(--black);
      padding-left: var(--space-3);
      margin-left: var(--space-4);
    }

    & a {
      color: var(--blue-600);
      text-decoration: none;
    }
  }

  & .project__title {
    font-family: var(--font-family-sans);
    font-size: var(--font-size-7);
    line-height: var(--line-height-6);
    margin: var(--space-4) 0;
    font-weight: 800;
  }

  & .project__excerpt {
    font-family: var(--font-family-serif);
    font-size: var(--font-size-5);
    line-height: var(--line-height-4);
    margin-top: 0;
    font-weight: 400;
  }

  & .project__date {
    font-family: var(--font-family-sans);
    font-weight: 600;
    font-family: var(--font-family-sans);
    font-size: var(--font-size-1);
    line-height: var(--line-height-1);
    margin-top: var(--space-4);
  }
}

@media (min-width: 800px) {
  .project {
    & .project__cover,
    & .project__cover--none {
      width: 750px;
      height: 380px;
    }

    & .project__title {
      font-size: var(--font-size-10);
      line-height: var(--line-height-10);
      margin: var(--space-6) 0 0;
      letter-spacing: -0.025em;
    }

    & .project__excerpt {
      font-size: var(--font-size-5);
      line-height: var(--line-height-5);
      margin-top: var(--space-3);
      margin-bottom: var(--space-3);
    }

    & .project__date {
      font-size: var(--font-size-3);
      line-height: var(--line-height-2);
      margin-top: var(--space-0);
    }

    & .project__content {
      margin-top: var(--space-7);
    }
  }
}
</style>
