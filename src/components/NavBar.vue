<template>
  <nav class="bg-white shadow-sm top-0 sticky z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-serif font-medium text-primary-600">VueShop</span>
          </router-link>
        </div>
        <div class="hidden md:flex items-center ml-10 space-x-8">
          <router-link v-for="link in navLinks" :key="link.path" :to="link.path"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 font-semibold">
            {{ link.name }}
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Cart -->
          <router-link to="/cart" class="relative text-gray-700 hover:text-primary-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartStore.itemCount > 0"
              class="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </router-link>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button @click="toggleUserMenu"
              class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <img v-if="authStore.user?.image" loading="lazy" :src="authStore.user.image" alt="User" class="w-8 h-8 rounded-full"
                width="20" height="20" />
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50"
                @click="showUserMenu = false">
                Profile
              </router-link>
              <button @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50">
                Logout
              </button>
            </div>
          </div>

          <router-link v-else to="/login"
            class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Login
          </router-link>

          <!-- Mobile menu button -->
          <button @click="toggleMobileMenu" class="md:hidden text-gray-700 hover:text-primary-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="showMobileMenu" class="md:hidden pb-4">
        <router-link v-for="link in navLinks" :key="link.path" :to="link.path"
          class="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
          active-class="text-primary-600 font-semibold" @click="showMobileMenu = false">
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
]

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
}

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}

function handleLogout() {
  authStore.logout()
  showUserMenu.value = false
  router.push('/')
}
</script>
