import 'virtual:uno.css'
import '@fontsource-variable/jetbrains-mono'
import '#root/css/style.css'
import { setToken } from '#root/app/auth/auth.service.js'
import { setupLeads } from '#root/app/contract/contract.service.js'
import { useContactStore } from '#root/app/contract/contract.store.js'

(async () => {
  useContactStore()
  await setToken()
  await setupLeads()
})()

