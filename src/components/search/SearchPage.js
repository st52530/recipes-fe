import React, {useState} from "react";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ContentLoadingError from "../util/ContentLoadingErrror";
import RecipeList from "../recipe/list/RecipeList";
import {searchRecipes} from "../../services/SearchService";

const useStyles = makeStyles((theme) => ({
    headline: {
        marginBottom: theme.spacing(2)
    },
    searchButton: {
        minWidth: '12em'
    }
}))

const SearchPage = () => {
    const classes = useStyles()
    const [searchName, setSearchName] = useState("")
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const doSearch = (e) => {
        e.preventDefault()
        setLoading(true)
        setRecipes(null)
        doSearchInternal(searchName, setRecipes, setError)
        setLoading(false)
    }

    return (
        <>
            <Typography component="h1" variant="h3" className={classes.headline}>Vyhledávání</Typography>
            <form onSubmit={doSearch}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Název receptu"
                    fullWidth
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}/>
                <Button
                    className={classes.searchButton}
                    disabled={!searchName}
                    type="submit"
                    variant="contained"
                    color="primary">
                    Vyhledat
                </Button>
            </form>
            <ContentLoadingError isLoading={isLoading} tryAgain={doSearch} error={error}>
                {recipes && (
                    <RecipeList recipes={recipes} totalCount={recipes.length}/>
                )}
            </ContentLoadingError>
        </>
    )
}

export default SearchPage

async function doSearchInternal(searchName, setRecipes, setError) {
    try {
        const recipes = await searchRecipes(searchName)
        setRecipes(recipes)
    } catch (e) {
        setError("Při načítání receptů se něco se pokazilo.\nZkuste to prosím znovu.")
    }
}