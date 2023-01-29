import { defineConfig } from 'vite'
import { join } from 'path'

const nodeVersion = process.versions.node
const targetNode = 'node' + nodeVersion.split('.')[0]

/**
 * * Configuration for Electron
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    build: {
      ssr: true, // transform ESM code to CommonJS
      targetNode: targetNode,
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
