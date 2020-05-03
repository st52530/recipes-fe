import React from "react";
import {
    useParams
} from "react-router-dom";

const RecipeDetail = () => {
    const {id} = useParams()
    return (
        <>
            <h1>Detail receptu</h1>
            <p>Recept číslo: {id}</p>
        </>
    )
}

export default RecipeDetail