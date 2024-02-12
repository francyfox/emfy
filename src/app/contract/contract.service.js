import { ofetch } from 'ofetch'

/**
 * @typedef {{ token_type: String, expires_in: Number, access_token: String, refresh_token: String }} TAmoToken
 */
export const authData = {
    SECRET: 'arDU0AQrcRK3KrQjFezMgvSe1WGAatNeHpF4nGM90MySpzy55UjOKp41BCZTGooZ',
    ID: 'dd6ab882-d5d2-4ce1-a82c-6d84e7428ffc',
    STATE: 'dd6ab882',
    CODE: import.meta.env.VITE_CODE,
}

export const baseURL = 'https://francyfox.amocrm.ru'

export const apiFetch = ofetch.create({
    baseURL,
    parseResponse: JSON.parse,
    headers: {
        'Accepts': 'application/json',
        'Access-Control-Allow-Origin': 'https://francyfox.amocrm.ru',
    }
})

const tokenRequestBody = {
    client_id: authData.ID,
    client_secret: authData.SECRET,
}

/**
 *
 * @param { Boolean } expired
 * @param { null | String } refresh_token
 * @returns {Promise<any, { data: TAmoToken }>}
 */
export const apiGetToken = async (
    expired = false,
    refresh_token = null
) => apiFetch('/oauth/access_token', {
    method: 'POST',
    body: expired
        ? {...tokenRequestBody, grant_type: 'refresh_token', refresh_token }
        : {...tokenRequestBody, grant_type: 'authorization_code', code: authData.CODE },
})

export const setTokenToLocalStorage = async () => {
    const response = await apiGetToken()
    try {
        window.localStorage.setItem('token', JSON.stringify(response.data))
        // по идее храним тока access_token и expires_in.
        console.log(response.data)
    } catch (error) {
        throw new Error('Invalid data. Cannot serialize token')
    }
}

export const setToken = async () => {
    /**
     * @type TAmoToken
     */
    const tokenData = getToken()

    if (tokenData) {
        const expired = tokenData.expires_in < Date.now() / 1000
        await setTokenToLocalStorage(expired, tokenData.refresh_token)
    } else {
        await setTokenToLocalStorage()
    }
}

/**
 *
 * @returns {TAmoToken|null}
 */
export const getToken = () => {
    const tokenSerialized = window.localStorage.getItem('token')
    if (!tokenSerialized) return null

    try {
        return JSON.parse(tokenSerialized)
    } catch (error) {
        throw new Error('Invalid token data. Cannot deserialize token')
    }
}

