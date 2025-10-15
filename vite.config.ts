import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /*server: {
    proxy: {
      '/banxico': {
        target: 'https://www.banxico.org.mx',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/banxico/, ''),
      },
    },
  },*/
})
