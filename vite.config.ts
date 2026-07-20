import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Enterprise-Compliance-Assistant/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
}))
