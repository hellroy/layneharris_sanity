<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar and Search components -->
    <Navbar />
    <Search />
    
    <!-- Main content -->
    <main class="flex-grow">
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
