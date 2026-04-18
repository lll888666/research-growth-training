import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
const repoName = 'research-growth-training'

export default defineConfig({
  plugins: [vue()],
  base: isGitHubPages ? `/${repoName}/` : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
  },
})