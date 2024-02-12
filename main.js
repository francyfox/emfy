import 'virtual:uno.css'
import '@fontsource-variable/jetbrains-mono';
import './src/css/style.css'
import { setToken } from "./src/app/contract/contract.service.js";

(async () => {
    await setToken()
})()

