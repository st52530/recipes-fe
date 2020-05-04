import React from "react";
import PropTypes from "prop-types";

const RecipeList = ({recipes = [], totalCount}) => {
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
    recipes: PropTypes.array,
    totalCount: PropTypes.number
};