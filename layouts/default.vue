<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar and Search components -->
    <Navbar />
    <!-- Main content -->
    <main class="flex-grow mt-24">
      <NuxtPage />
    </main>
    <!-- Footer -->
    <Footer />
  </div>
</template>



<style scoped>
.flex-grow {
  flex-grow: 1;
}

</style>
