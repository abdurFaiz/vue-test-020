import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productsApi } from '@/utils/api'
import type { Product, ProductCategory } from '@/types'

export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([])
    const currentProduct = ref<Product | null>(null)
    const categories = ref<ProductCategory[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const total = ref(0)
    const currentPage = ref(1)
    const itemsPerPage = ref(12)

    const totalPages = computed(() => Math.ceil(total.value / itemsPerPage.value))
    const hasProducts = computed(() => products.value.length > 0)

    async function fetchProducts(limit = 12, skip = 0) {
        isLoading.value = true
        error.value = null

        try {
            const response = await productsApi.getAll(limit, skip)
            products.value = response.products
            total.value = response.total
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch products'
        } finally {
            isLoading.value = false
        }
    }

    async function fetchProductById(id: number) {
        isLoading.value = true
        error.value = null

        try {
            const product = await productsApi.getById(id)
            currentProduct.value = product
            return product
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch product'
            return null
        } finally {
            isLoading.value = false
        }
    }

    async function searchProducts(query: string) {
        isLoading.value = true
        error.value = null

        try {
            const response = await productsApi.search(query)
            products.value = response.products
            total.value = response.total
        } catch (err: any) {
            error.value = err.message || 'Search failed'
        } finally {
            isLoading.value = false
        }
    }

    async function fetchCategories() {
        try {
            const cats = await productsApi.getCategories()
            categories.value = cats
        } catch (err: any) {
            error.value = err.message
        }
    }

    async function fetchByCategory(category: string) {
        isLoading.value = true
        error.value = null

        try {
            const response = await productsApi.getByCategory(category)
            products.value = response.products
            total.value = response.products.length
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch category products'
        } finally {
            isLoading.value = false
        }
    }

    function setPage(page: number) {
        currentPage.value = page
        const skip = (page - 1) * itemsPerPage.value
        fetchProducts(itemsPerPage.value, skip)
    }

    function clearError() {
        error.value = null
    }

    return {
        products,
        currentProduct,
        categories,
        isLoading,
        error,
        total,
        currentPage,
        itemsPerPage,

        totalPages,
        hasProducts,

        fetchProducts,
        fetchProductById,
        searchProducts,
        fetchCategories,
        fetchByCategory,
        setPage,
        clearError,
    }
})
