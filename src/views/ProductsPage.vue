<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-medium text-gray-900 mb-4">Products</h1>

        <!-- Search and Filter -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label for="search-products" class="sr-only">Search products</label>
            <input id="search-products" v-model="searchQuery" @input="handleSearch" type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
          </div>

          <label for="category-filter" class="sr-only">Filter by category</label>
          <select id="category-filter" v-model="selectedCategory" @change="handleCategoryChange"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="">All Categories</option>
            <option v-for="category in productsStore.categories" :key="category.slug" :value="category.slug">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="productsStore.isLoading" />

      <!-- Error State -->
      <div v-else-if="productsStore.error" class="text-center text-red-600 py-8">
        {{ productsStore.error }}
      </div>

      <!-- Products Grid -->
      <div v-else-if="productsStore.hasProducts">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <router-link v-for="product in productsStore.products" :key="product.id" :to="`/products/${product.id}`"
            class="block">
            <ProductCard :product="product" :show-description="false" @add-to-cart.prevent="handleAddToCart" />
          </router-link>
        </div>

        <!-- Pagination -->
        <Pagination v-if="!searchQuery && !selectedCategory" :current-page="productsStore.currentPage"
          :total-pages="productsStore.totalPages" @page-change="handlePageChange" />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">No products found</h2>
        <p class="text-gray-600">Try adjusting your search or filter</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import NavBar from '@/components/NavBar.vue'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Pagination from '@/components/Pagination.vue'
import type { Product } from '@/types'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const searchQuery = ref('')
const selectedCategory = ref('')
let searchTimeout: number | null = null

onMounted(async () => {
  await productsStore.fetchProducts()
  await productsStore.fetchCategories()
})

function handleSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = window.setTimeout(() => {
    if (searchQuery.value.trim()) {
      productsStore.searchProducts(searchQuery.value)
    } else {
      productsStore.fetchProducts()
    }
  }, 500)
}

function handleCategoryChange() {
  if (selectedCategory.value) {
    productsStore.fetchByCategory(selectedCategory.value)
  } else {
    productsStore.fetchProducts()
  }
  searchQuery.value = ''
}

function handlePageChange(page: number) {
  productsStore.setPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleAddToCart(product: Product) {
  cartStore.addToCart(product)
}
</script>
