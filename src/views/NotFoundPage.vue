<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p class="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div class="flex justify-center gap-4">
        <router-link to="/"
          class="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Go Home
        </router-link>
        <router-link to="/products"
          class="bg-white hover:bg-primary-50 text-primary-600 border border-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors">
          Browse Products
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
