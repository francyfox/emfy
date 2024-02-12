import 'virtual:uno.css'
import '@fontsource-variable/jetbrains-mono';
import './src/css/style.css'
import {apiAuth} from "./src/app/contract/contract.service.js";


await apiAuth()

if(window.opener){
    window.opener.postMessage({'error': undefined, 'status': 'ok'}, "*");
}