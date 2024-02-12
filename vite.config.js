/** @type {import('vite').UserConfig} */
import UnoCSS from 'unocss/vite'
export default {
    server: {
        cors: false,
    },
    plugins: [
        UnoCSS()
    ]
}