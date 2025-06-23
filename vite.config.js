import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // Make sure this is imported

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    // Add vite-plugin-node-polyfills here
    nodePolyfills({
      // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
      // include: ['buffer', 'process'],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // polyfill Buffer
        global: true, // polyfill global
        process: true, // polyfill process
      },
      // Whether to polyfill `node:` module imports.
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      // No need to explicitly alias 'buffer' to 'buffer' if nodePolyfills handles it.
      // The plugin should take care of resolving 'buffer' to its polyfilled version.
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // esbuild-level define for global. This might be redundant with nodePolyfills.globals.global = true,
      // but it's often harmless to keep for broader compatibility.
      define: {
        global: 'globalThis',
      },
      // nodePolyfills now handles what NodeGlobalsPolyfillPlugin used to for buffer and process.
      // You can remove NodeGlobalsPolyfillPlugin.
      plugins: [
        // No longer need NodeGlobalsPolyfillPlugin if nodePolyfills is used for Buffer
        // NodeGlobalsPolyfillPlugin({
        //   buffer: true
        // })
      ],
    },
  },
});