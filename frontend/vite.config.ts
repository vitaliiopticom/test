import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const ALLOWED_PORT = 3000;

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: ALLOWED_PORT,
  },
  preview: {
    port: ALLOWED_PORT,
  },
  build: {
    chunkSizeWarningLimit: 2000,
    manifest: true,
  },
});
