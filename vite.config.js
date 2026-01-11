import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'], // এটি ডুপ্লিকেট রিয়্যাক্ট লোড হওয়া বন্ধ করবে
  },
})