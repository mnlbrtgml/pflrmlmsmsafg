import autoprefixer from 'autoprefixer'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
