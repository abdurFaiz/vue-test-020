<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-medium text-gray-900 mb-8">Shopping Cart</h1>

      <div v-if="!cartStore.isEmpty" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="bg-white rounded-lg shadow p-6 flex gap-6">
            <img loading="lazy" :src="item.thumbnail" :alt="item.title" class="w-32 h-32 object-cover rounded" height="132"
              width="132" />

            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ item.brand }}</p>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <span class="text-gray-600">Quantity:</span>
                  <div class="flex items-center border border-gray-300 rounded">
                    <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                      class="px-3 py-1 hover:bg-gray-100">-</button>
                    <span class="px-4 py-1 border-x border-gray-300">{{ item.quantity }}</span>
                    <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                      class="px-3 py-1 hover:bg-gray-100">+</button>
                  </div>
                </div>

                <div class="text-right">
                  <div class="text-xl font-bold text-secondary-800">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </div>
                  <div class="text-sm text-gray-600">
                    ${{ item.price.toFixed(2) }} each
                  </div>
                </div>
              </div>

              <button @click="cartStore.removeFromCart(item.id)"
                class="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Items ({{ cartStore.itemCount }})</span>
                <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div class="border-t pt-3 flex justify-between text-lg font-bold text-secondary-800">
                <span>Total</span>
                <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
            </div>

            <button @click="handleCheckout"
              class="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Proceed to Checkout
            </button>

            <router-link to="/products" class="block text-center text-primary-600 hover:underline mt-4">
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-16">
        <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p class="text-gray-600 mb-8">Add some products to get started</p>
        <router-link to="/products"
          class="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Shop Now
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import NavBar from '@/components/NavBar.vue'

const cartStore = useCartStore()

function handleCheckout() {
  alert('Soon Available')
}
</script>
