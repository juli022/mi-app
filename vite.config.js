import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.NODE_ENV === 'production' ? '/mi-app/' : '/'

export default defineConfig({
  base,
  plugins: [react()]
})
