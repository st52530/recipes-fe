import Cookies from 'js-cookie'
import axios from "../networking/AxiosConfig";

const TOKEN_KEY = "token"

const CURRENT_USER_KEY = "currentUser"

function storeAuthData({token, user}) {
    // Token is valid for 7 days.
    const config = {
        expires: 7,
        sameSite: 'strict'
    }
    Cookies.set(TOKEN_KEY, token, config)
    Cookies.set(CURRENT_USER_KEY, JSON.stringify(user), config)
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

export function getCurrentUser() {
    const jsonData = Cookies.get(CURRENT_USER_KEY)
    if (jsonData) {
        return JSON.parse(jsonData)
    }
    return null
}

export function isLoggedIn() {
    return getToken() !== undefined
}

export async function login(username, password) {
    const response = await axios.post('authenticate', {
        username: username,
        password: password
    })
    storeAuthData(response.data)
    return response.data
}

export function logout() {
    localStorage.clear()
    sessionStorage.clear()
    Cookies.remove(TOKEN_KEY)
    Cookies.remove(CURRENT_USER_KEY)
}

export async function register(username, password, displayName) {
    const dto = {
        username,
        password,
        displayName
    }

    const response = await axios.post('register', dto)
    storeAuthData(response.data)
    return response.data
}