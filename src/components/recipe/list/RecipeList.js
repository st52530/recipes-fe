import React from "react";
import PropTypes from "prop-types";
import Box from '@material-ui/core/Box';
import RecipeListCard from "./RecipeListCard";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    aligner: {
        flex: 'auto'
    }
}));

const RecipeList = ({recipes = [], totalCount}) => {
    const classes = useStyles();
    const recipesUi = recipes.map((recipe, index) => {
        return (
            <RecipeListCard key={recipe.id} recipe={recipe}/>
        )
    })

    return (
        <>
            <p>Celkem nalezeno {totalCount} receptů.</p>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" className={classes.root}>
                {recipesUi}
                <div className={classes.aligner}/>
            </Box>
        </>
    )
}

export default RecipeList

RecipeList.propTypes = {
    recipes: PropTypes.array,
    totalCount: PropTypes.number
};