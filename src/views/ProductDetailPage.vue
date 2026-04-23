<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LoadingSpinner v-if="productsStore.isLoading" full-screen />

      <div v-else-if="product" class="bg-white rounded-lg overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <!-- Images -->
          <div>
            <img :src="selectedImage" :alt="product.title" loading="lazy" class="w-full h-96 object-cover rounded-lg mb-4" height="300"
              width="300" />
            <div class="grid grid-cols-4 gap-2">
              <img v-for="(image, index) in product.images" :key="index" :src="image"
              loading="lazy"
                :alt="`${product.title} ${index + 1}`" @click="selectedImage = image"
                class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                :class="{ 'ring-2 ring-primary-500': selectedImage === image }" height="80" width="80" />
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <div class="flex flex-row justify-between items-center">
              <h1 class="text-3xl font-medium text-gray-900 mb-2">{{ product.title }}</h1>

              <div class="flex flex-col items-end ">
                <div class="flex items-center">
                  <svg v-for="star in 5" :key="star" class="w-5 h-5"
                    :class="star <= Math.round(product.rating) ? 'text-primary-400' : 'text-gray-300'"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="ml-2 text-gray-600">{{ product.rating }} / 5</span>
              </div>
            </div>

            <div class="mb-6">
              <div class="flex items-baseline gap-4">
                <span class="text-4xl font-bold text-secondary-800">
                  ${{ finalPrice.toFixed(2) }}
                </span>
                <span v-if="product.discountPercentage > 0" class="text-xl text-gray-500 line-through">
                  ${{ product.price.toFixed(2) }}
                </span>
                <span v-if="product.discountPercentage > 0"
                  class="bg-primary-600 text-white px-3 py-1 rounded-md text-sm font-bold">
                  -{{ product.discountPercentage.toFixed(0) }}% OFF
                </span>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-normal font-semibold mb-2">Description</h3>
              <p class="text-gray-600">{{ product.description }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span class="text-gray-600">Brand:</span>
                <span class="ml-2 font-semibold">{{ product.brand }}</span>
              </div>
              <div>
                <span class="text-gray-600">Category:</span>
                <span class="ml-2 font-semibold">{{ product.category }}</span>
              </div>
              <div>
                <span class="text-gray-600">Stock:</span>
                <span class="ml-2 font-semibold" :class="product.stock > 0 ? 'text-secondary-600' : 'text-primary-600'">
                  {{ product.stock > 0 ? `${product.stock} available` : 'Out of stock' }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-4 mb-6">
              <label for="quantity" class="text-gray-600">Quantity:</label>
              <div id="quantity" class="flex items-center border border-gray-300 rounded-lg">
                <button @click="decreaseQuantity" class="px-4 py-2 hover:bg-gray-100 transition-colors"
                  :disabled="quantity <= 1">
                  -
                </button>
                <span class="px-6 py-2 border-x border-gray-300">{{ quantity }}</span>
                <button @click="increaseQuantity" class="px-4 py-2 hover:bg-gray-100 transition-colors"
                  :disabled="quantity >= product.stock">
                  +
                </button>
              </div>
            </div>

            <div class="flex gap-4">
              <button @click="handleBuyNow" :disabled="product.stock === 0"
                class="flex-1 bg-secondary-700 hover:bg-secondary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <router-link to="/products" class="text-primary-600 hover:underline">
          Back to products
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import NavBar from '@/components/NavBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const quantity = ref(1)
const selectedImage = ref('')

const product = computed(() => productsStore.currentProduct)

const finalPrice = computed(() => {
  if (!product.value) return 0
  const discount = product.value.price * (product.value.discountPercentage / 100)
  return product.value.price - discount
})

onMounted(async () => {
  const id = Number(route.params.id)
  const fetchedProduct = await productsStore.fetchProductById(id)
  if (fetchedProduct) {
    selectedImage.value = fetchedProduct.thumbnail
  }
})

function increaseQuantity() {
  if (product.value && quantity.value < product.value.stock) quantity.value++
}

function decreaseQuantity() {
  if (quantity.value > 1) quantity.value--
}

function handleBuyNow() {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    router.push('/cart')
  }
}
</script>
