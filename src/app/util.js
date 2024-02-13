/**
 * @param { string | number } expires_in
 * @returns { number }
 */
export const getExpiration = (expires_in) => {
  const expiration = new Date()
  return expiration.setSeconds(new Date().getSeconds() + Number(expires_in))
}

/**
 * @param { number } created
 * @param { number } expire_in
 * @returns { boolean }
 */
export const isTokenExpired = (created, expire_in) => {
  const now = Date.now() / 1000
  const expiry = created / 1000 + expire_in
  return now > expiry
}