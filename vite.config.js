import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://timetrackerapi.grapecode.de',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/timeout-api': {  // Add this new proxy entry
        target: 'https://timeout.madco-lab.de',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/timeout-api/, '')
      }
    }
  }
})
