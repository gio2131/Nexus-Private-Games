import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/Nexus-Private-Games/',
  build: {
    rollupOptions: {
      input: resolve(process.cwd(), 'index.source.html'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
