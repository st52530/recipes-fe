import axios from 'axios';
import {getBearerToken} from "../services/AuthenticationService";

// Create custom instance.
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Setup authentication headers.
export function setupAuthentication() {
    instance.defaults.headers.common['Authorization'] = getBearerToken();
}

export default instance;