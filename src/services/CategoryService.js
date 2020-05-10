import {getData} from "../networking/ResponseCachingUtil";

export async function getCategories() {
    return await getData(`categories`)
}