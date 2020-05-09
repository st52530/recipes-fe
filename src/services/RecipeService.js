import {getData} from "../networking/ResponseCachingUtil";
import axios, {setupAuthentication} from "../networking/AxiosConfig";

export async function getRecipes(page = 0, orderBy, order) {
    const queryParams = {
        page,
        sort: `${orderBy},${order}`,
        size: 8 // TODO: Increase later.
    }

    setupAuthentication()
    const response = await axios.get(`recipes`, {params: queryParams})
    return response.data
}

export async function getRecipe(id) {
    return await getData(`recipes/${id}`)
}

export function getRecipeImageUrl(id) {
    return `${process.env.REACT_APP_API_URL}recipes/${id}/image`
}

export async function addRecipe(recipe, image) {
    const categories = recipe.categories.map((category) => category.id)
    const instructions = recipe.instructions.filter((instruction) => instruction.text || instruction.text !== "")
    const ingredients = recipe.ingredients.filter((ingredient) => ingredient.amount || ingredient.amount !== "")
        .map((ingredient) => {
            return {
                ingredientId: ingredient.ingredient.id,
                amount: ingredient.amount
            }
        })
    const dto = {
        name: recipe.name,
        description: recipe.description,
        preparationTime: recipe.preparationTime,
        categories: categories,
        instructions,
        ingredients
    }
    console.log(dto)
    setupAuthentication()
    const response = await axios.post(`recipes`, dto)
    sessionStorage.setItem(`recipes/${response.data.id}`, JSON.stringify(response.data))
    return response.data
}