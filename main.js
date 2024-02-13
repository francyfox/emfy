import 'virtual:uno.css'
import '@fontsource-variable/jetbrains-mono'
import '#root/css/style.css'
import { getToken, setToken } from '#root/app/auth/auth.service.js'
import { setupLeads } from '#root/app/contract/contract.service.js'
import { apiV4Fetch } from '#root/app/auth/auth.const.js'

(async () => {
  try {
    await setToken()
  } catch (e) {
    alert(`Приложению не удалось авторизоваться: \n ${error.message}`)
  }

  const api = apiV4Fetch(getToken().access_token)
  await setupLeads(api)
})()

