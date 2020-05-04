import React, {useEffect, useState} from "react";
import RecipeList from "../recipe/RecipeList";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import ContentLoadingError from "../util/ContentLoadingErrror";
import {getRecipes} from "../../services/RecipeService";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2)
    },
    paging: {
        marginTop: theme.spacing(2)
    }
}));

const HomePage = () => {
    const classes = useStyles()
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecipes, setTotalRecipes] = useState(0)
    const isLoading = recipes === null && error === null

    useEffect(() => {
        fetchRecipes(currentPage, setRecipes, setError, setTotalPages, setTotalRecipes)
    }, [currentPage])

    return (
        <Container component="main" maxWidth="lg" className={classes.container}>
            <Typography component="h1" variant="h3">Seznam receptů</Typography>
            <ContentLoadingError
                isLoading={isLoading}
                error={error}
                tryAgain={() => fetchRecipes(currentPage, setRecipes, setError, setTotalPages, setTotalRecipes)}>
                <RecipeList recipes={recipes} totalCount={totalRecipes}/>
                {
                    totalPages > 1 && (
                        <Box display="flex" justifyContent="center" className={classes.paging}>
                            <Pagination
                                current={currentPage}
                                count={totalPages}
                                onChange={(e, value) => setCurrentPage(value)}
                                color="primary"/>
                        </Box>
                    )
                }
            </ContentLoadingError>
        </Container>
    )
}

const fetchRecipes = async (selectedPage, setRecipes, setError, setTotalPages, setTotalRecipes) => {
    setError(null)
    try {
        const {content, totalPages, totalElements} = await getRecipes(selectedPage - 1, 'createdAt')
        setRecipes(content)
        setTotalRecipes(totalElements)
        setTotalPages(totalPages)
    } catch (exception) {
        setError("Při načítání seznamu receptů se něco se pokazilo.\nZkuste to prosím znovu.")
    }
}

export default HomePage