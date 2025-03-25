import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias buffer to the installed buffer package
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
        // Define process and process.env so libraries that use them work in the browser
        'process.env': JSON.stringify({}),
        process: JSON.stringify({ env: {} }),
      },
      plugins: [NodeModulesPolyfillPlugin()],
    },
  },
  build: {
    rollupOptions: {
      plugins: [NodeModulesPolyfillPlugin()],
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
