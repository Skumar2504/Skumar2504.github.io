import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use relative base so CSS/JS asset links work on GitHub Pages
export default defineConfig({
  base: './',
  plugins: [react()],
})

