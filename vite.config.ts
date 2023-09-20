import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postcssGlobalData from '@csstools/postcss-global-data'
import postCssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, './lib/main.ts'),
      name: 'VVeb3',
      fileName: 'vveb3',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      vveb3: resolve(__dirname, './lib'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssGlobalData({
          files: [
            resolve(__dirname, './lib/styles/custom-media.css'),
            resolve(__dirname, './lib/styles/custom-selectors.css'),
          ],
        }),
        postCssPresetEnv({
          stage: 1,
          features: {
            'nesting-rules': {
              noIsPseudoSelector: false,
            }
          }
        }),
      ],
    },
  },
})
