import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Correct way for Vite to handle /manage-users and all other React Router routes
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    // This ensures your frontend app handles routes like /manage-users
    // No need to manually add history fallback
  },
  build: {
    outDir: 'dist',
  }
});
