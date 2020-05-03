import React, {useEffect, useState} from "react";
import RecipeList from "../recipe/RecipeList";
import axios, {setupAuthentication} from "../../networking/axiosConfig";
import Box from '@material-ui/core/Box';
import ContentLoadingError from "../util/ContentLoadingErrror";

const HomePage = () => {
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(null)
    const isLoading = recipes === null && error === null

    useEffect(() => {
        setupAuthentication()
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
    try {
        await sleep(3000)
        const response = await axios.get('recipes/sdads')
        setRecipes(response.data)
    } catch (exception) {
        setError("Něco se pokazilo\nZkuste to znovu.")
    }
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default HomePage