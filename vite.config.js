import path from 'node:path'

/** @type {import('vite').UserConfig} */
import UnoCSS from 'unocss/vite'

export default {
  server: {
    hmr: false, // опасно чокидар роботает быстро, можно получить бан на amocrm
    port: 3000,
    proxy: {
      '/proxy': {
        target: 'https://francyfox.amocrm.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, '')
      }
    }
  },
  resolve: {
    alias: {
      '#root': path.resolve('./src/')
    }
  },
  plugins: [
    UnoCSS()
  ]
}