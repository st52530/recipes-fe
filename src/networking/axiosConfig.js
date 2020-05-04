import axios from 'axios';
import {getBearerToken, logout} from "../services/AuthenticationService";

// Create custom instance.
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Add a 401 response interceptor.
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        // When BE rejects the token logout the user locally.
        logout()
    }
    return Promise.reject(error);
});

// Setup authentication headers.
export function setupAuthentication() {
    instance.defaults.headers.common['Authorization'] = getBearerToken();
}

export default instance;