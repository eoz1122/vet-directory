import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const cspReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://maps.googleapis.com https://maps.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://maps.gstatic.com https://maps.googleapis.com https://*.googleapis.com https://*.googleusercontent.com https://www.google.com https://www.google-analytics.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' ws://localhost:* http://localhost:5000 https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://maps.googleapis.com https://*.googleapis.com",
  "frame-src 'self' https://www.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "report-uri /api/csp-report",
].join('; ')

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy-Report-Only': cspReportOnly,
    },
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:5000',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'maps-vendor': ['@vis.gl/react-google-maps']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: true,
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true
    //   }
    // }
  },
  plugins: [react()],
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'fast-deep-equal'],
    exclude: ['@vis.gl/react-google-maps'] // Load maps only when needed
  },
  test: {
    environment: 'jsdom',
    globals: true,
  }
})
