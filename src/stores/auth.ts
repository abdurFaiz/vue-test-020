import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usersApi } from '@/utils/api'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(localStorage.getItem('token'))
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)
    const currentUser = computed(() => user.value)

    async function login(username: string, password: string) {
        isLoading.value = true
        error.value = null

        try {
            const response = await usersApi.login(username, password)
            token.value = response.token
            localStorage.setItem('token', response.token)

            await fetchUser(response.id)

            return true
        } catch (err: any) {
            error.value = err.message || 'Login failed'
            return false
        } finally {
            isLoading.value = false
        }
    }

    async function fetchUser(userId: number) {
        try {
            const userData = await usersApi.getById(userId)
            user.value = userData
        } catch (err: any) {
            error.value = err.message
        }
    }

    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
    }

    function clearError() {
        error.value = null
    }

    return {
        user,
        token,
        isLoading,
        error,
        isAuthenticated,
        currentUser,
        login,
        logout,
        fetchUser,
        clearError,
    }
})
