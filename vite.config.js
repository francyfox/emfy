/** @type {import('vite').UserConfig} */
import UnoCSS from 'unocss/vite'
export default {
    server: {
        port: 3000,
    },
    plugins: [
        UnoCSS()
    ]
}