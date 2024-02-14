import { getExpiration, getLocalStorage, isTokenExpired, setLocalStorage } from '#root/app/util.js'
import { apiFetch, authData, tokenRequestBody } from '#root/app/auth/auth.const.js'

/**
 * @typedef {{ token_type: String, expires_in: Number, access_token: String, refresh_token: String, expires: Number }} TAmoToken
 */

/**
 * TODO: Refresh on 401
 * @param { Boolean } expired
 * @param { null | String } refresh_token
 * @returns {Promise<any, TAmoToken>}
 */
export const apiGetToken = async (
  expired = false,
  refresh_token = null
) => apiFetch('/oauth2/access_token', {
  method: 'POST',
  body: expired
    ? { ...tokenRequestBody, grant_type: 'refresh_token', refresh_token }
    : { ...tokenRequestBody, grant_type: 'authorization_code', code: authData.CODE }
})

export const setTokenToLocalStorage = async (expired, refresh_token) => {
  const response = await apiGetToken(expired, refresh_token)
  const expires = getExpiration(response.expires_in)

  setLocalStorage('token', { ...response, expires })
}

export const setToken = async () => {
  /**
   * @type TAmoToken
   */
  const tokenData = getToken()
  const expired = tokenData ? isTokenExpired(tokenData.expires, tokenData.expires_in) : false

  if (!tokenData || expired) {
    await setTokenToLocalStorage(expired, tokenData?.refresh_token ?? '')
  }
}

/**
 *
 * @returns {TAmoToken|null}
 */
export const getToken = () => {
  return getLocalStorage('token')
}