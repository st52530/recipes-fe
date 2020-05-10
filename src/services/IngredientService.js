import {getData} from "../networking/ResponseCachingUtil";

export async function getIngredients() {
    return await getData(`ingredients`)
}