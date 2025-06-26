import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: '/my-ecommerce-store/',
  plugins: [
    tailwindcss(),
    react()
  ],
   server: {
    // questa opzione fa partire il dev server con la base /my-ecommerce-store/
    // così localhost:5173/my-ecommerce-store/ funziona
    open: '/my-ecommerce-store/',
  },
})
