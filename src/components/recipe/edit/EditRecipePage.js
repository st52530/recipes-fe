import React, {useState, useEffect} from "react";
import {useParams, withRouter} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import EditRecipeFragment from "../edit/EditRecipeFragment";
import {makeStyles} from '@material-ui/core/styles';
import {getCurrentUser} from "../../../services/AuthenticationService";
import ContentLoadingError from "../../util/ContentLoadingErrror";
import {getCategories} from "../../../services/CategoryService";
import {getSlug} from "../../../util/TextUtil";
import {saveRecipe, getRecipe} from "../../../services/RecipeService";

const useStyles = makeStyles((theme) => ({
    headline: {
        marginBottom: theme.spacing(2)
    }
}))

const EditRecipePage = ({history}) => {
    const classes = useStyles()
    const {id} = useParams()
    const [recipe, setRecipe] = useState(null)
    const [image, setImage] = useState(null)
    const [allCategories, setAllCategories] = useState(null)
    const [error, setError] = useState(null)
    const [previewImageUrl, setPreviewImageUrl] = useState(null)
    const [recipeUploadInProgress, setRecipeUploadInProgress] = useState(false)
    const isLoading = (allCategories === null && error === null) || (recipe === null && error === null) || recipeUploadInProgress

    useEffect(() => {
        setError(null)
        getAllCategories(setAllCategories, setError)
        fetchRecipe(id, setRecipe, setError)
    }, [id])

    // Generate preview URL when image changes.
    useEffect(() => {
        const imageUrl = image ? URL.createObjectURL(image) : null
        setPreviewImageUrl(imageUrl)
    }, [image])

    const onSuccess = (recipe) => {
        history.push(`/recipe/${recipe.id}/${getSlug(recipe.name)}`)
    }

    const tryAgain = () => {
        if (allCategories === null) {
            getAllCategories(setAllCategories, setError)
        } else if (recipe === null) {
            fetchRecipe(id, setRecipe, setError)
        } else {
            saveRecipeInternal(recipe, image, setError, onSuccess, setRecipeUploadInProgress)
        }
    }
    return (
        <>
            <Typography component="h1" variant="h3" className={classes.headline}>Upravit recept</Typography>
            <ContentLoadingError isLoading={isLoading} tryAgain={tryAgain} error={error}>
                <EditRecipeFragment
                    recipe={recipe}
                    setRecipe={setRecipe}
                    submitRecipe={() => saveRecipeInternal(recipe, image, setError, onSuccess, setRecipeUploadInProgress)}
                    imageUrl={previewImageUrl}
                    allCategories={allCategories}
                    setImage={setImage}/>
            </ContentLoadingError>
        </>
    )
}

export default withRouter(EditRecipePage)

const fetchRecipe = async (id, setRecipe, setError) => {
    try {
        const data = await getRecipe(id)
        const currentUser = getCurrentUser()
        if (data.author.id !== currentUser.id) {
            setError("Nemůžete upravit tento recept!")
            return
        }
        setRecipe(data)
    } catch (exception) {
        setError("Při načítání tohoto receptu se něco se pokazilo.\nZkuste to prosím znovu.")
    }
}

async function saveRecipeInternal(recipe, image, setError, onSuccess, setRecipeUploadInProgress) {
    try {
        setRecipeUploadInProgress(true)
        const data = await saveRecipe(recipe, image)
        onSuccess(data)
    } catch (e) {
        setError("Nepodařilo se nahrát změny receptu.\nZkuste to prosím znovu.")
        setRecipeUploadInProgress(false)
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