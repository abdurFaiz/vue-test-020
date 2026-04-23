<template>
  <div class="flex items-center justify-center space-x-2 my-8">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
      class="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
      Previous
    </button>

    <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
      'px-4 py-2 rounded-md transition-colors',
      page === currentPage
        ? 'bg-primary-600 text-white'
        : 'bg-white border border-gray-300 text-gray-700 hover:bg-primary-50'
    ]">
      {{ page }}
    </button>

    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  maxVisible?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxVisible: 5,
})

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const visiblePages = computed(() => {
  const pages: number[] = []
  const half = Math.floor(props.maxVisible / 2)

  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + props.maxVisible - 1)

  if (end - start + 1 < props.maxVisible) {
    start = Math.max(1, end - props.maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('pageChange', page)
  }
}
</script>
