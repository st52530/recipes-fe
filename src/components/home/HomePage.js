import React, {useEffect, useState} from "react";
import RecipeList from "../recipe/RecipeList";
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import ContentLoadingError from "../util/ContentLoadingErrror";
import {getRecipes} from "../../services/RecipeService";

const HomePage = () => {
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const isLoading = recipes === null && error === null

    useEffect(() => {
        fetchRecipes(currentPage, setRecipes, setError, setTotalPages)
    }, [currentPage])

    return (
        <Box>
            <h1>Seznam receptů</h1>
            <ContentLoadingError
                isLoading={isLoading}
                error={error}
                tryAgain={() => fetchRecipes(currentPage, setRecipes, setError, setTotalPages)}>
                <RecipeList recipes={recipes}/>
                {
                    totalPages > 1 && (
                        <Pagination
                            current={currentPage}
                            count={totalPages}
                            onChange={(e, value) => setCurrentPage(value)}
                            color="primary"/>
                    )
                }
            </ContentLoadingError>
        </Box>
    )
}

const fetchRecipes = async (selectedPage, setRecipes, setError, setTotalPages) => {
    setError(null)
    try {
        console.log(selectedPage)
        const {content, totalPages} = await getRecipes(selectedPage - 1, 'createdAt')
        setRecipes(content)
        setTotalPages(totalPages)
    } catch (exception) {
        setError("Při načítání seznamu receptů se něco se pokazilo.\nZkuste to prosím znovu.")
    }
}

export default HomePage