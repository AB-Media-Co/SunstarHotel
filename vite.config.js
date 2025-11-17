import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// TEMP SAFE CONFIG: no custom manualChunks, no custom minifier.
// Once things work, we can reintroduce optimizations step by step.
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // use default esbuild minifier (no 'terser', no custom options)
    sourcemap: false,
    target: 'es2015',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
  },
});