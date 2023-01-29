import { defineConfig } from 'vite'
import { join } from 'path'

/**
 * * Configuration for Electron
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    build: {
      outDir: join(__dirname, '..', 'dist', 'electron'),
      minify: mode !== 'development',
      lib: {
        entry: ['main.js', 'preload.js'],
        formats: ['cjs'],
        fileName: () => '[name].cjs'
      },
      rollupOptions: {
        external: ['electron']
      },
      emptyOutDir: true
    }
  }
})
