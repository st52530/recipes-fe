import {getData} from "../networking/ResponseCachingUtil";

export async function getRecipes() {
    return await getData(`recipes`)
}

export async function getRecipe(id) {
    return await getData(`recipes/${id}`)
}

