import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IngredientAutocomplete from "../edit/IngredientsAutocomplete";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0.5)
    },
    editText: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    addButton: {
        marginBottom: theme.spacing(2)
    }
}));

const RecipeIngredientsList = ({ingredients, editMode = false, onIngredientsChanged}) => {
    const classes = useStyles()
    const [selectedIngredient, setSelectedIngredient] = useState(null)

    const handleDelete = (index) => {
        const newIngredients = [...ingredients]
        newIngredients.splice(index, 1)
        onIngredientsChanged(newIngredients)
    };

    const onSingleIngredientChanged = (index, amount) => {
        const newIngredients = [...ingredients]
        newIngredients[index].amount = amount
        onIngredientsChanged(newIngredients)
    }

    const alreadyUsedIds = ingredients.map((ingredient) => ingredient.ingredient.id)

    return (
        <>
            <Typography component="h2" variant="h4" gutterBottom>Ingredience</Typography>
            <ul className={classes.root}>
                {ingredients.map((data, index) => {
                    return (
                        <li key={data.ingredient.id}>
                            {editMode ? (
                                <>
                                    <Typography component="p" gutterBottom>
                                        <b>{data.ingredient.name}</b>
                                    </Typography>
                                    <Box display="flex" alignItems="center">
                                        <TextField
                                            className={classes.editText}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            label="Množství"
                                            value={data.amount}
                                            onChange={(e) => {
                                                onSingleIngredientChanged(index, e.target.value)
                                            }}/>

                                        <Button
                                            variant="contained"
                                            onClick={() => handleDelete(index)}
                                            color="primary">
                                            Odebrat ingredienci
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <Typography component="p" gutterBottom>
                                    <b>{data.ingredient.name} -</b> {data.amount}
                                </Typography>
                            )}
                        </li>
                    );
                })}
            </ul>
            {editMode && (
                <>
                    <Typography variant="h5" gutterBottom>
                        Přidat ingredienci
                    </Typography>
                    <IngredientAutocomplete
                        selected={selectedIngredient}
                        alreadyUsedIds={alreadyUsedIds}
                        setSelected={setSelectedIngredient}/>
                    <br/>
                    <Button
                        variant="contained"
                        onClick={() => {
                            onIngredientsChanged([...ingredients, {
                                    ingredient: selectedIngredient
                                }]
                            )
                            setSelectedIngredient(null)
                        }}
                        disabled={selectedIngredient === null || alreadyUsedIds.includes(selectedIngredient.id)}
                        color="primary"
                        className={classes.addButton}>
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