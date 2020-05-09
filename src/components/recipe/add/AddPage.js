import React, {useState, useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import EditRecipeFragment from "../edit/EditRecipeFragment";
import {makeStyles} from '@material-ui/core/styles';
import {getCurrentUser} from "../../../services/AuthenticationService";
import ContentLoadingError from "../../util/ContentLoadingErrror";
import {getCategories} from "../../../services/CategoryService";


const useStyles = makeStyles((theme) => ({
    headline: {
        marginBottom: theme.spacing(2)
    }
}))

const AddPage = () => {
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

    return (
        <>
            <Typography component="h1" variant="h3" className={classes.headline}>Přidat nový recept</Typography>
            <ContentLoadingError isLoading={isLoading} tryAgain={() => getAllCategories(setAllCategories, setError)} error={error}>
                <EditRecipeFragment
                    recipe={recipe}
                    setRecipe={setRecipe}
                    submitRecipe={addNewRecipe}
                    image={image}
                    allCategories={allCategories}
                    setImage={setImage}/>
            </ContentLoadingError>
        </>
    )
}

export default AddPage

async function addNewRecipe() {
    // TODO!
    console.log("SAVE!")
}

async function getAllCategories(setAllCategories, setError) {
    try {
        const categories = await getCategories()
        setAllCategories(categories)
    } catch (e) {
        setError("Při načítání seznamu kategorií se něco se pokazilo.\nZkuste to prosím znovu.")
    }
}