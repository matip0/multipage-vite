import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import fg from 'fast-glob'

const __dirname = dirname(fileURLToPath(import.meta.url))

const entries = await fg('src/**/*.html', { absolute: true })

export default defineConfig({

  root: resolve(__dirname, 'src'),
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: entries,
    },
    outDir: resolve(__dirname, 'dist'),
  },
})
