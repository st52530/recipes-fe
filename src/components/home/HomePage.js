import React, {useEffect, useState} from "react";
import RecipeList from "../recipe/list/RecipeList";
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import ContentLoadingError from "../util/ContentLoadingErrror";
import {getRecipes} from "../../services/RecipeService";

const useStyles = makeStyles((theme) => ({
    paging: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    formControl: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginLeft: 0,
        minWidth: '10em',
        [theme.breakpoints.up('md')]: {
            display: 'inline-block',
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(1)
        }
    },
    headline: {
        display: 'block',
        [theme.breakpoints.up('md')]: {
            display: 'inline-block'
        }
    },
    selectBox: {
        float: 'none',
        [theme.breakpoints.up('md')]: {
            float: 'right'
        }
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
        <>
            <Box overflow="auto">
                <Typography component="h1" variant="h3" className={classes.headline}>Seznam receptů</Typography>
                <Box className={classes.selectBox}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="order-by-label">Seřadit podle</InputLabel>
                        <Select
                            labelId="order-by-label"
                            value={orderBy}
                            fullWidth
                            onChange={(e) => setOrderBy(e.target.value)}
                            label="Seřadit podle">
                            <MenuItem value="createdAt">Data vytvoření</MenuItem>
                            <MenuItem value="name">Název</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="order-label">Směr řazení</InputLabel>
                        <Select
                            labelId="order-label"
                            value={order}
                            fullWidth
                            onChange={(e) => setOrder(e.target.value)}
                            label="Směr řazení">
                            <MenuItem value="asc">Vzestupně</MenuItem>
                            <MenuItem value="desc">Sestupně</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
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
        </>
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