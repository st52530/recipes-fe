import React, {useState} from "react";
import Typography from '@material-ui/core/Typography';
import EditRecipeFragment from "../edit/EditRecipeFragment";
import {makeStyles} from '@material-ui/core/styles';
import {getCurrentUser} from "../../../services/AuthenticationService";


const useStyles = makeStyles((theme) => ({
    headline: {
        marginBottom: theme.spacing(2)
    }
}))

const AddPage = () => {
    const classes = useStyles()
    const currentUser = getCurrentUser()
    const [recipe, setRecipe] = useState({
        instructions: [],
        categories: [],
        ingredients: [],
        author: currentUser
    })

    return (
        <>
            <Typography component="h1" variant="h3" className={classes.headline}>Přidat nový recept</Typography>
            <EditRecipeFragment recipe={recipe} setRecipe={setRecipe} submitRecipe={addNewRecipe}/>
        </>
    )
}

export default AddPage

async function addNewRecipe() {
    // TODO!
    console.log("SAVE!")
}