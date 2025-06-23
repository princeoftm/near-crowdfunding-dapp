// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    nodePolyfills({
      // It's good practice to explicitly state which globals you need
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // If you're importing node: modules explicitly (e.g., import 'node:buffer')
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      // The 'buffer: "buffer"' alias is usually not needed when nodePolyfills is active
      // as it handles the resolution. You can remove it.
      // buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // This is often redundant if nodePolyfills handles 'global', but harmless
      define: {
        global: 'globalThis'
      },
      // You don't need NodeGlobalsPolyfillPlugin here if nodePolyfills is active
      // plugins: [
      //   NodeGlobalsPolyfillPlugin({
      //     buffer: true
      //   })
      // ]
    }
  }
});