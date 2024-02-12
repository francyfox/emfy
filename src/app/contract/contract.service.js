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

export const baseURL = 'https://francyfox.amocrm.ru/api/v4'

export const apiFetch = ofetch.create({
    baseURL,
    parseResponse: JSON.parse,
    headers: {
        Accept: 'application/json',
    }
})

export const apiGetToken = async () => apiFetch('/oauth/access_token', {
    method: 'POST',
    body: {
        client_id: authData.ID,
        client_secret: authData.SECRET,
        grant_type: 'authorization_code',
        code: authData.CODE
    }
})

export const setTokenToLocalStorage = async () => {
    const response = await apiGetToken()
    try {
        window.localStorage.setItem('token', JSON.stringify(response.data))
    } catch (error) {
        throw new Error('Invalid data. Cannot serialize token \n' + error)
    }
}

export const setToken = async () => {
    if (!window.localStorage.getItem('token')) {
        await setTokenToLocalStorage()
    } else {
        /**
         * @type TAmoToken
         */
        try {
            const tokenData = JSON.parse(window.localStorage.getItem('token'))
            const expired = tokenData.expires_in < Date.now() / 1000

            if (expired) {
                await setTokenToLocalStorage()
            }
        } catch (error) {
            throw new Error('Invalid token data. Cannot deserialize token \n' + error)
        }
    }
}

