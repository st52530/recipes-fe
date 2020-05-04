import Cookies from 'js-cookie'
import axios from "../networking/axiosConfig";

const TOKEN_KEY = "token"

function storeToken(token) {
    // Token is valid for 7 days.
    const config = {
        expires: 7,
        sameSite: 'strict'
    }
    Cookies.set(TOKEN_KEY, token, config)
}

function getToken() {
    return Cookies.get(TOKEN_KEY)
}

export function getBearerToken() {
    const token = getToken()
    if (token === undefined) {
        return undefined
    }

    return "Bearer " + token;
}

export function isLoggedIn() {
    return getToken() !== undefined
}

export async function login(username, password) {
    const response = await axios.post('authenticate', {
        username: username,
        password: password
    })
    storeToken(response.data.token)
    return response.data
}

export function logout() {
    localStorage.clear()
    sessionStorage.clear()
    Cookies.remove(TOKEN_KEY)
}