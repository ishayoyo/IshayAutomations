import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Expose env variables to the client
    'process.env.VITE_GA_ID': JSON.stringify(process.env.VITE_GA_ID),
    'process.env.VITE_CLARITY_ID': JSON.stringify(process.env.VITE_CLARITY_ID),
  },
  build: {
    // Generate source maps for better debugging
    sourcemap: true,
  },
  // Handle environment variable replacement in HTML
  template: {
    transformIndexHtml: (html) => {
      return html
        .replace('%VITE_GA_ID%', process.env.VITE_GA_ID || '')
        .replace('%VITE_CLARITY_ID%', process.env.VITE_CLARITY_ID || '')
    }
  }
})
