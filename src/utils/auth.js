import Cookies from 'js-cookie'

const AccessToken = 'ACCESS_TOKEN'

export function getToken() {
    return Cookies.get(AccessToken)
}

export function setToken(token) {
    return Cookies.set(AccessToken, token)
}

export function removeToken() {
    return Cookies.remove(AccessToken)
}
