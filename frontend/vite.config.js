import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/',
    define: {
      __APP_URL__: JSON.stringify(env.VITE_APP_URL),
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist',
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  };
});

