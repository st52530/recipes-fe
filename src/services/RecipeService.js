import {getData} from "../networking/ResponseCachingUtil";
import axios, {setupAuthentication} from "../networking/axiosConfig";

export async function getRecipes(page = 0, sort = 'createdAt') {
    const queryParams = {
        page,
        sort,
        size: 20
    }

    setupAuthentication()
    const response = await axios.get(`recipes`, {params: queryParams})
    return response.data
}

export async function getRecipe(id) {
    return await getData(`recipes/${id}`)
}

