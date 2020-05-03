import axios from 'axios';

// Create custom instance.
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Setup authentication headers.
export function setupAuthentication() {
    const token = sessionStorage.getItem("token")
    if (token !== null) {
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
}

export default instance;