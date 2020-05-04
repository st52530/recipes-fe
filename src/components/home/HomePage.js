import React, {useEffect, useState} from "react";
import RecipeList from "../recipe/RecipeList";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    const [orderBy, setOrderBy] = useState('createdAt')
    const [order, setOrder] = useState('desc')
    const isLoading = recipes === null && error === null

    useEffect(() => {
        setCurrentPage(1)
    }, [orderBy])

    useEffect(() => {
        fetchRecipes(currentPage, order, orderBy, setRecipes, setError, setTotalPages, setTotalRecipes)
    }, [currentPage, order, orderBy])

    return (
        <Container component="main" maxWidth="lg" className={classes.container}>
            <Box overflow="auto"> // TODO: Styles
                <Typography component="h1" variant="h3" style={{ display: 'inline-block'}}>Seznam receptů</Typography>
                // TODO: FormControl?
                <Select
                    label="Seřadit podle" // TODO: label
                    value={orderBy}
                    variant="outlined"
                    style={{float:'right'}} // TODO: Styles
                    onChange={(e) => setOrderBy(e.target.value)}>
                    <MenuItem value="createdAt">Datum vytvoření</MenuItem>
                    <MenuItem value="name">Název</MenuItem>
                </Select>
                <Select
                    label="Směr řazení" // TODO: label
                    value={order}
                    variant="outlined"
                    style={{float:'right'}} // TODO: Styles
                    color="primary"
                    onChange={(e) => setOrder(e.target.value)}>
                    <MenuItem value="asc">Vzestupně</MenuItem>
                    <MenuItem value="desc">Sestupně</MenuItem>
                </Select>
            </Box>
            <ContentLoadingError
                isLoading={isLoading}
                error={error}
                tryAgain={() => fetchRecipes(currentPage, order, orderBy, setRecipes, setError, setTotalPages, setTotalRecipes)}>
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

const fetchRecipes = async (selectedPage, order, orderBy, setRecipes, setError, setTotalPages, setTotalRecipes) => {
    setError(null)
    try {
        const {content, totalPages, totalElements} = await getRecipes(selectedPage - 1, orderBy, order)
        setRecipes(content)
        setTotalRecipes(totalElements)
        setTotalPages(totalPages)
    } catch (exception) {
        setError("Při načítání seznamu receptů se něco se pokazilo.\nZkuste to prosím znovu.")
    }
}

export default HomePage