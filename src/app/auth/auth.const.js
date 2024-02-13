import { ofetch } from 'ofetch'

export const authData = {
  SECRET: 'arDU0AQrcRK3KrQjFezMgvSe1WGAatNeHpF4nGM90MySpzy55UjOKp41BCZTGooZ',
  ID: 'dd6ab882-d5d2-4ce1-a82c-6d84e7428ffc',
  STATE: 'dd6ab882',
  CODE: import.meta.env.VITE_CODE
}
export const baseURL = '/proxy'

export const apiFetch = ofetch.create({
  baseURL,
  parseResponse: JSON.parse
})

/**
 * @param { string } token
 * @type { function(string): apiFetch }
 */
export const apiV4Fetch = (token) => {
  return ofetch.create({
    baseURL: `${baseURL}/api/v4`,
    parseResponse: JSON.parse,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const tokenRequestBody = {
  client_id: authData.ID,
  client_secret: authData.SECRET,
  redirect_uri: 'http://localhost'
}