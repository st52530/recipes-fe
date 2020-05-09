import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import EditRecipeFragment from "../edit/EditRecipeFragment";
import {makeStyles} from '@material-ui/core/styles';
import {getCurrentUser} from "../../../services/AuthenticationService";
import ContentLoadingError from "../../util/ContentLoadingErrror";
import {getCategories} from "../../../services/CategoryService";
import {getSlug} from "../../../util/TextUtil";
import {addRecipe} from "../../../services/RecipeService";


const useStyles = makeStyles((theme) => ({
    headline: {
        marginBottom: theme.spacing(2)
    }
}))

const AddPage = ({history}) => {
    const classes = useStyles()
    const currentUser = getCurrentUser()
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        instructions: [],
        categories: [],
        ingredients: [],
        author: currentUser
    })
    const [image, setImage] = useState(null)
    const [allCategories, setAllCategories] = useState(null)
    const [error, setError] = useState(null)
    const isLoading = allCategories === null && error === null

    useEffect(() => {
        setError(null)
        getAllCategories(setAllCategories, setError)
    }, [])

    const onSuccess = (recipe) => {
        history.push(`/recipe/${recipe.id}/${getSlug(recipe.name)}`)
    }

    const tryAgain = () => {
        if (allCategories == null) {
            getAllCategories(setAllCategories, setError)
        } else {
            addNewRecipe(recipe, image, setError, onSuccess)
        }
    }

    return (
        <>
            <Typography component="h1" variant="h3" className={classes.headline}>Přidat nový recept</Typography>
            <ContentLoadingError isLoading={isLoading} tryAgain={tryAgain} error={error}>
                <EditRecipeFragment
                    recipe={recipe}
                    setRecipe={setRecipe}
                    submitRecipe={() => addNewRecipe(recipe, image, setError, onSuccess)}
                    image={image}
                    allCategories={allCategories}
                    setImage={setImage}/>
            </ContentLoadingError>
        </>
    )
}

export default withRouter(AddPage)

async function addNewRecipe(recipe, image, setError, onSuccess) {
    try {
        const data = await addRecipe(recipe, image)
        onSuccess(data)
    } catch (e) {
        setError("Nepodařilo se nahrát nový recept.\nZkuste to prosím znovu.")
    }
}

async function getAllCategories(setAllCategories, setError) {
    try {
        const categories = await getCategories()
        setAllCategories(categories)
    } catch (e) {
        setError("Při načítání seznamu kategorií se něco se pokazilo.\nZkuste to prosím znovu.")
    }
}