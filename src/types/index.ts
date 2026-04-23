export interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

export interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    username: string
    image: string
    address?: {
        address: string
        city: string
        state: string
        postalCode: string
    }
}

export interface CartItem {
    id: number
    title: string
    price: number
    quantity: number
    total: number
    discountPercentage: number
    discountedPrice: number
}

export interface Cart {
    id: number
    products: CartItem[]
    total: number
    discountedTotal: number
    userId: number
    totalProducts: number
    totalQuantity: number
}

export interface LoginCredentials {
    username: string
    password: string
}

export interface AuthResponse {
    token: string
    id: number
}

export interface ProductCategory {
    slug: string
    name: string
    url: string
}
