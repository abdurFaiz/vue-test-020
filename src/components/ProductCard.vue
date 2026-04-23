<template>
  <div class="bg-white rounded-lg overflow-hidden duration-300 hover:cursor-pointer"
    :class="{ 'opacity-75': !inStock }">
    <div class="relative ">
      <img :src="product.thumbnail" loading="lazy" fetchpriority="high" :alt="product.title" class="w-full h-72 object-cover hover:scale-110 transition-all duration-300" @error="handleImageError"
        width="200" height="200" />
      <div v-if="showDiscount && product.discountPercentage > 0"
        class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
        -{{ product.discountPercentage.toFixed(0) }}%
      </div>
      <div v-if="!inStock" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <span class="text-white font-bold text-lg">Out of Stock</span>
      </div>
    </div>

    <div class="p-4">
      <h2 class="text-lg font-medium text-orange-700 mb-2 truncate">
        {{ product.title }}
      </h2>

      <p v-if="showDescription" class="text-gray-600 text-sm mb-3 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <svg v-for="star in 5" :key="star" class="w-4 h-4"
            :class="star <= Math.round(product.rating) ? 'text-primary-400' : 'text-gray-300'" fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="ml-2 text-sm text-gray-600">{{ product.rating }}</span>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <span class="text-2xl font-bold text-secondary-800">
            ${{ finalPrice.toFixed(2) }}
          </span>
          <span v-if="product.discountPercentage > 0" class="ml-2 text-sm text-gray-500 line-through">
            ${{ product.price.toFixed(2) }}
          </span>
        </div>

        <button v-if="showAddToCart && inStock" @click="handleAddToCart"
          class="bg-primary-600 hover:bg-primary-700 text-white px-2 py-1 text-sm rounded-md transition-colors duration-200"
          :disabled="!inStock">
          Add Cart
        </button>
      </div>

      <div v-if="showStock" class="mt-2 text-sm text-gray-600">
        Stock: {{ product.stock }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types'

interface Props {
  product: Product
  showDescription?: boolean
  showDiscount?: boolean
  showAddToCart?: boolean
  showStock?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: true,
  showDiscount: true,
  showAddToCart: true,
  showStock: false,
})

const emit = defineEmits<{
  addToCart: [product: Product]
}>()

const inStock = computed(() => props.product.stock > 0)

const finalPrice = computed(() => {
  const discount = props.product.price * (props.product.discountPercentage / 100)
  return props.product.price - discount
})

function handleAddToCart() {
  emit('addToCart', props.product)
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/300x200?text=No+Image'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
