// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    // Make sure nodePolyfills is here and correctly configured
    nodePolyfills({
      // include: ['buffer', 'process'], // You can uncomment this if you want to be explicit
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      // If you are still having issues with 'buffer' specifically,
      // you could try uncommenting this, but ideally nodePolyfills handles it.
      // buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        // Make sure NodeGlobalsPolyfillPlugin is *NOT* here if you're using nodePolyfills
      ]
    }
  }
});