import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0.5)
    }
}));

const RecipeIngredientsList = ({ingredients, editMode = false, onIngredientsChanged}) => {
    const classes = useStyles()

    const handleDelete = (ingredient) => () => {
        // TODO.
    };

    // TODO: Add!

    return (
        <>
            <Typography component="h2" variant="h4" gutterBottom>Ingredience</Typography>
            <ul className={classes.root}>
                {ingredients.map((data) => {
                    return (
                        <li key={data.ingredient.id}>
                            <Typography component="p" gutterBottom>
                                <b>{data.ingredient.name} -</b> {data.amount}
                            </Typography>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}

export default RecipeIngredientsList

RecipeIngredientsList.propTypes = {
    ingredients: PropTypes.array,
    editMode: PropTypes.bool,
    onIngredientsChanged: PropTypes.func
}