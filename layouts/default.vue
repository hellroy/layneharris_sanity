<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar and Search components -->
    <Navbar />
    <!-- Main content -->
    <main class="flex-grow md:mt-24">
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
.min-h-screen {
  min-height: 100vh;
}
</style>
