// monorepo/apps/web/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias buffer to the installed buffer package
      buffer: "buffer",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
        "process.env": JSON.stringify({}),
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
    // Make sure to add your ngrok domain here:
    allowedHosts: [
      "4d0f-91-187-66-221.ngrok-free.app",
      // Add any other subdomains if needed
    ],
  },
});
