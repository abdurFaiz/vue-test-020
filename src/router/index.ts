import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { authMiddleware, guestMiddleware } from './middleware'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomePage.vue'),
        meta: { title: 'Home' }
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('@/views/ProductsPage.vue'),
        meta: { title: 'Products' }
    },
    {
        path: '/products/:id',
        name: 'product-detail',
        component: () => import('@/views/ProductDetailPage.vue'),
        meta: { title: 'Product Detail' },
        props: true
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/CartPage.vue'),
        meta: { title: 'Shopping Cart' }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginPage.vue'),
        meta: {
            title: 'Login',
            middleware: [guestMiddleware]
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/ProfilePage.vue'),
        meta: {
            title: 'Profile',
            middleware: [authMiddleware]
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundPage.vue'),
        meta: { title: '404 Not Found' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title || 'Vue App'} | Vue Test`

    const middlewares = to.meta.middleware as any[]

    if (!middlewares || middlewares.length === 0) {
        return next()
    }

    const middleware = middlewares[0]

    return middleware(to, from, (nextArg?: any) => {
        if (nextArg !== undefined) {
            return next(nextArg)
        }

        const nextMiddlewares = middlewares.slice(1)
        if (nextMiddlewares.length === 0) {
            return next()
        }

        const nextMiddleware = nextMiddlewares[0]
        return nextMiddleware(to, from, next)
    })
})

export default router
