# Vue Test 020 - E-Commerce Application

A modern, full-featured e-commerce application built with Vue.js 3, TypeScript, Tailwind CSS, Vue Router, Pinia, and integrated with DummyJSON API.

## 🚀 Features

### Core Features

- ✅ **Product Browsing** - Browse products with pagination
- ✅ **Search & Filter** - Search products and filter by categories
- ✅ **Product Details** - Detailed product pages with image galleries
- ✅ **Shopping Cart** - Add, remove, and manage cart items
- ✅ **User Authentication** - Login system with protected routes
- ✅ **User Profile** - View user information
- ✅ **Responsive Design** - Mobile-first responsive layout

### Technical Features

- ✅ **Vue 3 Composition API** - Modern Vue.js approach
- ✅ **TypeScript** - Full type safety
- ✅ **Pinia State Management** - Centralized state management
- ✅ **Vue Router** - Client-side routing with middleware
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **Axios** - HTTP client with interceptors
- ✅ **API Integration** - DummyJSON API integration
- ✅ **Route Guards** - Authentication middleware
- ✅ **LocalStorage** - Persistent cart and auth

## 📦 Tech Stack

- **Vue 3.5.32** - Progressive JavaScript framework
- **TypeScript 6.0.2** - Static type checking
- **Vite 8.0.10** - Next generation frontend tooling
- **Vue Router 4** - Official router for Vue.js
- **Pinia 3.0.4** - State management library
- **Tailwind CSS 4.2.4** - Utility-first CSS framework
- **Axios 1.15.2** - Promise-based HTTP client

## 🛠️ Installation

```bash
# Install dependencies
npm install
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── LoadingSpinner.vue
│   ├── NavBar.vue
│   ├── Pagination.vue
│   └── ProductCard.vue
├── router/             # Vue Router configuration
│   ├── index.ts        # Routes definition
│   └── middleware.ts   # Route guards
├── stores/             # Pinia stores
│   ├── auth.ts         # Authentication state
│   ├── cart.ts         # Shopping cart state
│   └── products.ts     # Products state
├── types/              # TypeScript types
│   └── index.ts
├── utils/              # Utility functions
│   └── api.ts          # API client
├── views/              # Page components
│   ├── AboutPage.vue
│   ├── CartPage.vue
│   ├── HomePage.vue
│   ├── LoginPage.vue
│   ├── NotFoundPage.vue
│   ├── ProductDetailPage.vue
│   ├── ProductsPage.vue
│   └── ProfilePage.vue
├── App.vue             # Root component
├── main.ts             # Application entry
└── style.css           # Global styles
```

## 🔐 Demo Credentials

For testing the login functionality:

- **Username**: `emilys`
- **Password**: `emilyspass`

## 📄 Pages

| Route           | Component         | Description                         | Protected     |
| --------------- | ----------------- | ----------------------------------- | ------------- |
| `/`             | HomePage          | Landing page with featured products | No            |
| `/products`     | ProductsPage      | Product listing with search/filter  | No            |
| `/products/:id` | ProductDetailPage | Product details                     | No            |
| `/cart`         | CartPage          | Shopping cart                       | No            |
| `/login`        | LoginPage         | User login                          | Guest only    |
| `/profile`      | ProfilePage       | User profile                        | Auth required |
| `/about`        | AboutPage         | About page                          | No            |
| `*`             | NotFoundPage      | 404 page                            | No            |

## 🎨 Components

### ProductCard

Reusable product card component with customizable props.

**Props:**

- `product` (required) - Product object
- `showDescription` (default: true) - Show/hide description
- `showDiscount` (default: true) - Show/hide discount badge
- `showAddToCart` (default: true) - Show/hide add to cart button
- `showStock` (default: false) - Show/hide stock info

**Events:**

- `addToCart` - Emitted when add to cart is clicked

### LoadingSpinner

Customizable loading spinner component.

**Props:**

- `size` - 'sm' | 'md' | 'lg' | 'xl'
- `customSize` - Custom size string
- `color` - 'primary' | 'secondary' | 'white' | 'gray'
- `text` - Loading text
- `fullScreen` - Full screen mode

### Pagination

Pagination component for product listing.

**Props:**

- `currentPage` (required) - Current page number
- `totalPages` (required) - Total pages
- `maxVisible` (default: 5) - Max visible page buttons

**Events:**

- `pageChange` - Emitted when page changes

## 🗄️ State Management

### Auth Store

Manages user authentication state.

**State:**

- `user` - Current user object
- `token` - Auth token
- `isLoading` - Loading state
- `error` - Error message

**Actions:**

- `login(username, password)` - Login user
- `logout()` - Logout user
- `fetchUser(userId)` - Fetch user data

### Products Store

Manages products state.

**State:**

- `products` - Products array
- `currentProduct` - Selected product
- `categories` - Product categories
- `isLoading` - Loading state
- `error` - Error message

**Actions:**

- `fetchProducts(limit, skip)` - Fetch products
- `fetchProductById(id)` - Fetch single product
- `searchProducts(query)` - Search products
- `fetchCategories()` - Fetch categories
- `fetchByCategory(category)` - Filter by category

### Cart Store

Manages shopping cart state.

**State:**

- `items` - Cart items array

**Getters:**

- `itemCount` - Total items count
- `totalPrice` - Total cart price
- `isEmpty` - Check if cart is empty

**Actions:**

- `addToCart(product, quantity)` - Add item to cart
- `removeFromCart(productId)` - Remove item
- `updateQuantity(productId, quantity)` - Update quantity
- `clearCart()` - Clear all items

## 🔌 API Integration

The application uses DummyJSON API (https://dummyjson.com/) for data.

### API Utility Functions

```typescript
// Generic methods
api.get<T>(url, config?)
api.post<T>(url, data?, config?)
api.put<T>(url, data?, config?)
api.patch<T>(url, data?, config?)
api.delete<T>(url, config?)

// Products API
productsApi.getAll(limit, skip)
productsApi.getById(id)
productsApi.search(query)
productsApi.getCategories()
productsApi.getByCategory(category)

// Users API
usersApi.getAll(limit, skip)
usersApi.getById(id)
usersApi.login(username, password)

// Carts API
cartsApi.getAll()
cartsApi.getById(id)
cartsApi.getUserCarts(userId)
```

### Features

- Axios interceptors for request/response
- Automatic token injection
- Error handling
- 401 redirect to login
- TypeScript generics for type safety

## 🛡️ Route Middleware

### Auth Middleware

Protects routes that require authentication. Redirects to login if not authenticated.

```typescript
meta: {
  middleware: [authMiddleware];
}
```

### Guest Middleware

Protects routes that should only be accessible to guests. Redirects to home if authenticated.

```typescript
meta: {
  middleware: [guestMiddleware];
}
```

## 🎨 Styling

The application uses Tailwind CSS 4 with custom configuration:

- Responsive design (mobile-first)
- Custom color palette
- Utility classes
- Component-scoped styles
- Hover and transition effects

## 📝 TypeScript Types

All data structures are fully typed:

```typescript
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  address?: Address;
}
```

## 🔧 Configuration

### Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```typescript
import { useAuthStore } from "@/stores/auth";
import ProductCard from "@/components/ProductCard.vue";
```

### Vite Configuration

- Vue plugin
- Tailwind CSS plugin
- Path aliases
- Build optimization

## 📚 Documentation

For detailed project structure and implementation details, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DummyJSON](https://dummyjson.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
