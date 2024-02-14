import { stringify } from 'qs'

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

/**
 * @param {string | number } price
 * @returns {string}
 */
export const localePrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    style: 'currency',
    currency: 'RUB',
  }).format(Number(price))
}

/**
 * @param {number} date
 * @returns {string}
 */
export const localeDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU').format(date * 1000)
}

export const querySerializer = (params) => {
  return '?' + stringify(params)
}

const omit = (key, { [key]: _, ...obj }) => obj

/**
 * @description Нужно для правильной сериализации параметров запроса
 * @param fetch
 * @returns {function(*, *): *}
 */
export function wrapFetch (fetch) {
  return (request, options) => {

    let modifiedRequest, modifiedOptions
    if (options && options.params) {
      modifiedRequest = request + querySerializer(options.params)
      modifiedOptions = omit(options, ['params'])
    } else {
      // use as is
      modifiedRequest = request
      modifiedOptions = options
    }

    return fetch(modifiedRequest, modifiedOptions)
  }
}