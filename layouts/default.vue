<template>
  <NuxtLoadingIndicator />
  <div class="flex flex-col min-h-screen">
    <!-- Navbar and Search components -->
    <Navbar />
    <!-- Main content -->
    <main class="flex-grow-1 md:mt-24">
      <NuxtPage />
    </main>
    <!-- Footer -->
    <Footer />
  </div>
</template>
