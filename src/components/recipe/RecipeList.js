import React from "react";
import PropTypes from "prop-types";

const RecipeList = ({recipes = []}) => {
    const recipesUi = recipes.map((recipe, index) => {
        // TODO: Another component.
        return (
            <p key={recipe.id}>{recipe.name}</p>
        )
    })
    return recipesUi
}

export default RecipeList

RecipeList.propTypes = {
    recipes: PropTypes.array
};