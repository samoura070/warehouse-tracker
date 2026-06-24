import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config. The proxy forwards /api calls to the Express server during dev,
// so the frontend can call "/api/items" without worrying about the port.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
