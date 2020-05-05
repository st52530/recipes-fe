import React from 'react';
import {
    useParams
} from "react-router-dom";
import RecipeDetailHeader from "./RecipeDetailHeader";
import {getRecipeImageUrl} from "../../services/RecipeService";

const RecipeDetailPage = () => {
    const {id} = useParams()

    return (
        <>
            <RecipeDetailHeader name={"TODO!"} imageUrl={getRecipeImageUrl(id)}/>
        </>
    )
}

export default RecipeDetailPage