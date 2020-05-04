import axios, {setupAuthentication} from "../networking/axiosConfig";

// Get data from cache or from GET endpoint.
// Returned data will be cached.
export async function getData(path) {
    const cachedData = sessionStorage.getItem(path)
    if (cachedData) {
        // Return data from cache if possible.
        return JSON.parse(cachedData)
    }

    setupAuthentication()
    const response = await axios.get(path)
    // Cache results.
    sessionStorage.setItem(path, JSON.stringify(response.data))
    return response.data
}