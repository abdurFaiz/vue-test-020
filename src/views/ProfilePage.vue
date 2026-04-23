<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

      <div v-if="authStore.user" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-linear-to-r from-primary-600 to-secondary-800 h-32"></div>

        <div class="px-8 pb-8">
          <div class="flex items-end -mt-16 mb-6">
            <img loading="lazy" :src="authStore.user.image" :alt="fullName"
              class="w-32 h-32 rounded-full border-4 border-white shadow-lg" width="140" height="140" />
            <div class="ml-6 mb-2">
              <h2 class="text-2xl font-bold text-gray-900">{{ fullName }}</h2>
              <p class="text-gray-600">@{{ authStore.user.username }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div class="space-y-3">
                <div>
                  <span class="text-gray-600">First Name:</span>
                  <span class="ml-2 font-medium">{{ authStore.user.firstName }}</span>
                </div>
                <div>
                  <span class="text-gray-600">Last Name:</span>
                  <span class="ml-2 font-medium">{{ authStore.user.lastName }}</span>
                </div>
                <div>
                  <span class="text-gray-600">Email:</span>
                  <span class="ml-2 font-medium">{{ authStore.user.email }}</span>
                </div>
                <div>
                  <span class="text-gray-600">Phone:</span>
                  <span class="ml-2 font-medium">{{ authStore.user.phone }}</span>
                </div>
              </div>
            </div>

            <div v-if="authStore.user.address">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Address</h3>
              <div class="space-y-3">
                <div>
                  <span class="text-gray-600">Street:</span>
                  <span class="ml-2 font-medium">{{ authStore.user.address.address }}</span>
                </div>
                <div>
                  <span class="text-gray-600">City:</span>
                  <span class="ml-2 font-medium">{{ authStore.user.address.city }}</span>
                </div>
                <div>
                  <span class="text-gray-600">State:</span>
                  <span class="ml-2 font-medium">{{ authStore.user.address.state }}</span>
                </div>
                <div>
                  <span class="text-gray-600">Postal Code:</span>
                  <span class="ml-2 font-medium">{{ authStore.user.address.postalCode }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t">
            <button @click="handleLogout"
              class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()
const authStore = useAuthStore()

const fullName = computed(() => {
  if (!authStore.user) return ''
  return `${authStore.user.firstName} ${authStore.user.lastName}`
})

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>
