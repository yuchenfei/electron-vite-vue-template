import vue from '@vitejs/plugin-vue'
import { join } from 'path'

/**
 * * Configuration for Vue
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default {
  base: './', // default: '/'. after build, electron fail to load resources
  plugins: [vue()],
  build: {
    outDir: join(__dirname, 'dist', 'renderer')
  }
}
