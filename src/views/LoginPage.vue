<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <main class="max-w-md mx-auto px-4 py-16">
      <div class="bg-white rounded-lg  p-8">
        <h1 class="text-3xl font-medium text-gray-900 mb-6 text-center">Login</h1>

        <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ authStore.error }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 font-medium mb-2">Username</label>
            <input id="username" v-model="username" type="text" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your username" />
          </div>

          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
            <input id="password" v-model="password" type="password" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your password" />
          </div>

          <button type="submit" :disabled="authStore.isLoading"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="mt-6 p-4 bg-primary-50 rounded-lg">
          <p class="text-sm text-gray-700 mb-2 font-semibold">Demo Credentials:</p>
          <p class="text-sm text-gray-600">Username: <code class="bg-white px-2 py-1 rounded">emilys</code></p>
          <p class="text-sm text-gray-600">Password: <code class="bg-white px-2 py-1 rounded">emilyspass</code></p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

async function handleLogin() {
  const success = await authStore.login(username.value, password.value)
  if (success) {
    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  }
}
</script>
