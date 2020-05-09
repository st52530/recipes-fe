import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IngredientAutocomplete from "../edit/IngredientsAutocomplete";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0.5)
    }
}));

const RecipeIngredientsList = ({ingredients, editMode = false, onIngredientsChanged}) => {
    const classes = useStyles()
    const [selectedIngredient, setSelectedIngredient] = useState()

    const handleDelete = (ingredient) => () => {
        // TODO.
    };

    const alreadyUsedIds = ingredients.map((ingredient) => ingredient.id)

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
            {editMode && (
                <>
                    <IngredientAutocomplete alreadyUsedIds={alreadyUsedIds} setSelected={setSelectedIngredient}/>
                    <Button
                        variant="contained"
                        onClick={() => onIngredientsChanged([...ingredients, {
                                ingredient: selectedIngredient
                            }]
                        )}
                        color="primary">
                        Přidat ingredienci
                    </Button>
                </>
            )}
        </>
    )
}

export default RecipeIngredientsList

RecipeIngredientsList.propTypes = {
    ingredients: PropTypes.array,
    editMode: PropTypes.bool,
    onIngredientsChanged: PropTypes.func
}