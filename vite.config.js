import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Aru/' : '/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    open: '/index.html',
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        simple: resolve(import.meta.dirname, 'simple.html'),
        voz: resolve(import.meta.dirname, 'voz.html'),
      },
    },
  },
}));
