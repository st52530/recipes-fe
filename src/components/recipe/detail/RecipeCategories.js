import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        marginBottom: theme.spacing(2)
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const RecipeCategories = ({categories, editMode = false, onCategoriesChanged}) => {
    const classes = useStyles()

    const handleDelete = (e) => () => {
        // TODO.
    };

    const handleAdd = () => () => {
        // TODO dialog.
    };

    // TODO: Add!
    const addCategory = (
        <li key={-1}>
            <Chip
                variant="outlined"
                color="primary"
                label="Přidat kategorii"
                onDelete={handleAdd}
                deleteIcon={<AddIcon />}
                className={classes.chip}/>
        </li>
    )

    return (
        <ul className={classes.root}>
            {categories.map((category) => {
                return (
                    <li key={category.id}>
                        <Chip
                            variant="outlined"
                            color="primary"
                            label={category.name}
                            onDelete={editMode ? handleDelete : undefined }
                            className={classes.chip}/>
                    </li>
                );
            })}
            {editMode && addCategory}
        </ul>
    )
}

export default RecipeCategories

RecipeCategories.propTypes = {
    categories: PropTypes.array,
    editMode: PropTypes.bool,
    onCategoriesChanged: PropTypes.func
}