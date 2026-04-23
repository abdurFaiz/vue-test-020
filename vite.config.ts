import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression';
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    viteCompression({
      algorithm: "gzip",
      threshold: 1024
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: "esbuild",
    cssMinify: true,
  }
})
