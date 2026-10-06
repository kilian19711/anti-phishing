/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Inhalte (60 Szenarien, 19 Artikel) sind bewusst im Bundle, damit alles offline ohne API funktioniert.
  build: { chunkSizeWarningLimit: 800 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'netlify/**/*.test.ts'],
  },
});
