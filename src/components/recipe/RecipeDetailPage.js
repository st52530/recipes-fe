import React from 'react';
import {
    useParams
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import RecipeDetailHeader from "./RecipeDetailHeader";
import Container from '@material-ui/core/Container';
import {getRecipeImageUrl} from "../../services/RecipeService";

const RecipeDetailPage = () => {
    const {id} = useParams()

    return (
        <>
            <RecipeDetailHeader name={"TODO!"} imageUrl={getRecipeImageUrl(id)}/>
            <Container maxWidth="md" margin="auto">
                <Typography component="p">Description</Typography>
            </Container>
        </>
    )
}

export default RecipeDetailPage