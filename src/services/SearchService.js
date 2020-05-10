import axios, {setupAuthentication} from "../networking/AxiosConfig";

export async function searchRecipes(name) {
    const dto = {
        name
    }
    setupAuthentication()
    const response = await axios.post(`search`, dto)
    return response.data
}