import React from "react";
import PropTypes from 'prop-types';
import RecipeDetailHeader from "../detail/RecipeDetailHeader";
import RecipeCategories from "../detail/RecipeCategories";
import RecipeIngredientsList from "../detail/RecipeIngredientsList";
import RecipeInstructions from "../detail/RecipeInstructions";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import TimerIcon from '@material-ui/icons/Timer';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        top: -50
    },
    icon: {
        marginRight: theme.spacing(0.5)
    },
    authorBox: {
        marginLeft: theme.spacing(3)
    }
}));

const EditRecipeFragment = ({recipe, setRecipe, submitRecipe, imageUrl, setImage, allCategories}) => {
    const classes = useStyles()

    const author = recipe.author.displayName || recipe.author.username
    const recipeUrl = imageUrl ? imageUrl : recipe.imageUrl
    return (
        <>
            <RecipeDetailHeader
                name={recipe.name}
                imageUrl={recipeUrl}
                editMode
                setName={(name) => {
                    setRecipe({...recipe, name})
                }}
                onFileSelected={setImage}
            />
            <Container maxWidth="md" className={classes.root}>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                    <Tooltip arrow TransitionComponent={Zoom} title="Doba přípravy" placement="left">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <TimerIcon color="primary" className={classes.icon}/>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                label="Doba přípravy"
                                value={recipe.preparationTime}
                                onChange={(e) => {
                                    setRecipe({
                                        ...recipe,
                                        preparationTime: e.target.value
                                    })
                                }}/>
                        </Box>
                    </Tooltip>

                    <Tooltip arrow TransitionComponent={Zoom} title="Autor receptu" placement="right">
                        <Box display="flex" justifyContent="center" alignItems="center"
                             className={classes.authorBox}>
                            <FaceIcon color="primary" className={classes.icon}/>
                            <Typography component="p">{author}</Typography>
                        </Box>
                    </Tooltip>
                </Box>
                <RecipeCategories
                    editMode
                    categories={recipe.categories}
                    allCategories={allCategories}
                    onCategoriesChanged={(categories) => setRecipe({...recipe, categories})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    multiline
                    label="Popis receptu"
                    fullWidth
                    value={recipe.description}
                    onChange={(e) => {
                        setRecipe({
                            ...recipe,
                            description: e.target.value
                        })
                    }}/>
                <RecipeIngredientsList
                    editMode
                    ingredients={recipe.ingredients}
                    onIngredientsChanged={(ingredients) => setRecipe({...recipe, ingredients})}/>
                <RecipeInstructions
                    editMode
                    instructions={recipe.instructions}
                    onInstructionsChanged={(instructions) => setRecipe({...recipe, instructions})}/>


                <Button
                    fullWidth
                    disabled={!isRecipeValid(recipe)}
                    onClick={submitRecipe}
                    variant="contained"
                    color="primary">
                    Uložit
                </Button>
            </Container>
        </>
    )
}

export default EditRecipeFragment

EditRecipeFragment.propTypes = {
    recipe: PropTypes.object,
    setRecipe: PropTypes.func,
    submitRecipe: PropTypes.func,
    imageUrl: PropTypes.string,
    setImage: PropTypes.func,
    allCategories: PropTypes.array
}

function isRecipeValid(recipe) {
    if (!recipe.name || recipe.name === "") {
        return false
    }
    if (!recipe.description || recipe.description === "") {
        return false
    }
    if (!recipe.preparationTime || recipe.preparationTime === "") {
        return false
    }
    if (recipe.categories.length < 1) {
        return false
    }
    const filledInstructions = recipe.instructions.filter((item) => item.text && item.text !== "")
    if (filledInstructions.length < 1) {
        return false
    }
    const filledIngredients = recipe.ingredients.filter((item) => item.amount && item.amount !== "")
    if (filledIngredients.length < 1) {
        return false
    }

    return true
}