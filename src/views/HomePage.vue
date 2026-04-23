<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <main>
      <!-- Featured Products -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 class="text-3xl font-medium font-sans text-gray-900 mb-8">New Arrival</h1>

        <LoadingSpinner v-if="productsStore.isLoading" />

        <div v-else-if="productsStore.hasProducts" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product"
            @add-to-cart="handleAddToCart" />
        </div>

        <div v-else class="text-center text-gray-600">
          No products available
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import NavBar from '@/components/NavBar.vue'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { Product } from '@/types'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const featuredProducts = computed(() => productsStore.products.slice(0, 9))

onMounted(() => {
  productsStore.fetchProducts(9, 0)
})

function handleAddToCart(product: Product) {
  cartStore.addToCart(product)
}
</script>
