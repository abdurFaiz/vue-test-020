<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="animate-spin rounded-full border-t-2 border-b-2" :class="[sizeClass, colorClass]"
      :style="{ width: customSize, height: customSize }"></div>
    <span v-if="text" class="ml-3" :class="textClass">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  customSize?: string
  color?: 'primary' | 'secondary' | 'white' | 'gray'
  text?: string
  fullScreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  fullScreen: false,
})

const sizeClass = computed(() => {
  if (props.customSize) return ''
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }
  return sizes[props.size]
})

const colorClass = computed(() => {
  const colors = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-700',
    white: 'border-white',
    gray: 'border-gray-500',
  }
  return colors[props.color]
})

const textClass = computed(() => {
  const colors = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-700',
    white: 'text-white',
    gray: 'text-gray-500',
  }
  return colors[props.color]
})

const containerClass = computed(() => {
  return props.fullScreen ? 'min-h-screen' : 'py-8'
})
</script>
