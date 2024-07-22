<script setup>

defineProps({
  project: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <NuxtLink
    class="card flex flex-col p-3 no-underline m-auto text-center "
    :to="`/project/${project.slug.current}`"
  >
  <div class="group">
    <NuxtImg
      v-if="project.coverImage"
      class=" aspect-square border-t border-t-slate-400 rounded-lg group-hover:rotate-[3deg] transition-transform duration-300 drop-shadow-[0_5px_5px_rgba(230,245,39,.8)] group-hover:drop-shadow-[0_200px_200px_rgba(255,255,0,255)] hover:"
      :src="urlFor(project.coverImage).width(500).height(500).url()"
      alt="Cover image"
    />
    <div v-else class="w-full h-56"></div>

    <div>
      <h3 class="group-hover:scale-125 transition-transform duration-300 text-4xl mb-1 text-layneYellow py-3 font-headings ">
        {{ project.title }}
      </h3>
    </div>
  </div>
  </NuxtLink>
</template>

<style scoped>

.gradient {
  background: linear-gradient(-45deg, #f72585, #7209b7, #3a0ca3, #000000);
}

.my-element {
  /*===== Configurable Variables =====*/
  /*======= Only these change! =======*/
  --color: #000;
  --elevation: 0px;
  --bevel: 5px;
  --opacity: 3%;
  --blurriness: 0px;
  --angle: 314deg;
  --intensity: 82;
  --diffusion: 90;

  /*======= Computed Variables =======*/
  --sin: calc(sin(var(--angle)));
  --cos: calc(cos(var(--angle)));
  --x-displacement: calc(-1 * var(--cos) * (var(--elevation) + 1px));
  --y-displacement: calc(-1 * var(--sin) * (var(--elevation) + 1px));
  --edge-opacity: calc(var(--intensity) * 0.006 - var(--diffusion) * 0.002);
  --edge-blur: calc(var(--bevel) * 1.5);
  --surface-contrast: calc(var(--intensity) * 0.01 - var(--diffusion) * 0.005);

  /*======= Computed Properties =======*/
  border-radius: var(--radius);
  box-shadow: var(--x-displacement) var(--y-displacement) calc(var(--diffusion) * 0.3px + (var(--elevation))) calc(var(--elevation) / 2) rgba(0, 0, 0, calc(var(--intensity) * 0.006)),
    0px 0px calc(var(--diffusion) * 1.4px) rgba(255, 255, 255, calc(var(--intensity) * 0.004)),
    inset calc(var(--bevel) * -1) 0 var(--edge-blur) hsla(100, 0%, calc((var(--cos) + 1) * 50%), var(--edge-opacity)),
    inset 0 var(--bevel) var(--edge-blur) hsla(100, 0%, calc((-1 * var(--sin) + 1) * 50%), var(--edge-opacity)),
    inset var(--bevel) 0 var(--edge-blur) hsla(100, 0%, calc((-1 * var(--cos) + 1) * 50%), var(--edge-opacity)),
    inset 0 calc(var(--bevel) * -1) var(--edge-blur) hsla(100, 0%, calc((var(--sin) + 1) * 50%), var(--edge-opacity));
  background-color: color-mix(in srgb, var(--color) var(--opacity), transparent calc(100% - var(--opacity)));
  backdrop-filter: blur(var(--blurriness));
      
  /*======== Static Properties ========*/
  background-blend-mode: soft-light;
  position: relative;
}

.my-element::before {
  content: "";
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  border-radius: var(--radius);
  background: linear-gradient(calc(var(--angle) + 90deg), hsla(0, 0%, 100%, 0) 40%, hsla(0, 0%, 100%, var(--surface-contrast)));
}
</style>
