import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types'

interface CartProduct extends Product {
    quantity: number
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartProduct[]>([])

    const itemCount = computed(() =>
        items.value.reduce((total, item) => total + item.quantity, 0)
    )

    const totalPrice = computed(() =>
        items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    )

    const isEmpty = computed(() => items.value.length === 0)

    function addToCart(product: Product, quantity = 1) {
        const existingItem = items.value.find(item => item.id === product.id)

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            items.value.push({ ...product, quantity })
        }

        saveToLocalStorage()
    }

    function removeFromCart(productId: number) {
        const index = items.value.findIndex(item => item.id === productId)
        if (index > -1) {
            items.value.splice(index, 1)
            saveToLocalStorage()
        }
    }

    function updateQuantity(productId: number, quantity: number) {
        const item = items.value.find(item => item.id === productId)
        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId)
            } else {
                item.quantity = quantity
                saveToLocalStorage()
            }
        }
    }

    function clearCart() {
        items.value = []
        saveToLocalStorage()
    }

    function saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(items.value))
    }

    function loadFromLocalStorage() {
        const saved = localStorage.getItem('cart')
        if (saved) {
            try {
                items.value = JSON.parse(saved)
            } catch (e) {
                console.error('Failed to load cart from localStorage', e)
            }
        }
    }

    loadFromLocalStorage()

    return {
        items,

        itemCount,
        totalPrice,
        isEmpty,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    }
})
