import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'

const API_BASE_URL = 'https://dummyjson.com'
const TIMEOUT = 10000

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            globalThis.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export async function apiRequest<T>(
    config: AxiosRequestConfig
): Promise<T> {
    try {
        const response: AxiosResponse<T> = await apiClient(config)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message)
        }
        throw error
    }
}

export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        return apiRequest<T>({ ...config, method: 'GET', url })
    },

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return apiRequest<T>({ ...config, method: 'POST', url, data })
    },

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return apiRequest<T>({ ...config, method: 'PUT', url, data })
    },

    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return apiRequest<T>({ ...config, method: 'PATCH', url, data })
    },

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        return apiRequest<T>({ ...config, method: 'DELETE', url })
    },
}

export const productsApi = {
    getAll: (limit = 30, skip = 0) =>
        api.get<{ products: any[]; total: number; skip: number; limit: number }>(
            `/products?limit=${limit}&skip=${skip}`
        ),

    getById: (id: number) =>
        api.get<any>(`/products/${id}`),

    search: (query: string) =>
        api.get<{ products: any[]; total: number }>(
            `/products/search?q=${query}`
        ),

    getCategories: () =>
        api.get<{ slug: string; name: string; url: string }[]>('/products/categories'),

    getByCategory: (category: string) =>
        api.get<{ products: any[] }>(`/products/category/${category}`),
}

export const usersApi = {
    getAll: (limit = 30, skip = 0) =>
        api.get<{ users: any[]; total: number }>(
            `/users?limit=${limit}&skip=${skip}`
        ),

    getById: (id: number) =>
        api.get<any>(`/users/${id}`),

    login: (username: string, password: string) =>
        api.post<{ token: string; id: number }>('/auth/login', { username, password }),
}

export const cartsApi = {
    getAll: () =>
        api.get<{ carts: any[] }>('/carts'),

    getById: (id: number) =>
        api.get<any>(`/carts/${id}`),

    getUserCarts: (userId: number) =>
        api.get<{ carts: any[] }>(`/carts/user/${userId}`),
}

export default api
