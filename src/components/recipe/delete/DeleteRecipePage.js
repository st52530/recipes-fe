import React, {useState, useEffect} from 'react';
import {
    useParams,
    withRouter
} from "react-router-dom";
import ContentLoadingError from "../../util/ContentLoadingErrror";
import {deleteRecipe} from "../../../services/RecipeService";

const DeleteRecipePage = ({history}) => {
    const {id} = useParams()
    const [error, setError] = useState(null)
    const isInProgress = error == null

    useEffect(() => {
        deleteRecipeInternal(id, setError, history)
    }, [id, history])

    return (
        <ContentLoadingError
            isLoading={isInProgress}
            error={error}
            tryAgain={() => deleteRecipeInternal(id, setError, history)} />
    )
}

export default withRouter(DeleteRecipePage)

async function deleteRecipeInternal(id, setError, history) {
    setError(null)
    try {
        await deleteRecipe(id)
        history.push('/')
    } catch (e) {
        setError("Nepodařilo se smazat recept.\nZkuste to prosím znovu.")
    }
}