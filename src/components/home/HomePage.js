import React, {useEffect, useState} from "react";
import RecipeList from "../recipe/RecipeList";
import Box from '@material-ui/core/Box';
import ContentLoadingError from "../util/ContentLoadingErrror";
import {getRecipes} from "../../services/RecipeService";

const HomePage = () => {
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(null)
    const isLoading = recipes === null && error === null

    useEffect(() => {
        fetchRecipes(setRecipes, setError)
    }, [])

    return (
        <Box>
            <h1>Seznam receptů</h1>
            <ContentLoadingError
                isLoading={isLoading}
                error={error}
                tryAgain={() => fetchRecipes(setRecipes, setError)}>
                <RecipeList recipes={recipes}/>
            </ContentLoadingError>
        </Box>
    )
}

const fetchRecipes = async (setRecipes, setError) => {
    setError(null)
    try {
        setRecipes(await getRecipes())
    } catch (exception) {
        setError("Při načítání seznamu receptů se něco se pokazilo.\nZkuste to prosím znovu.")
    }
}

export default HomePage