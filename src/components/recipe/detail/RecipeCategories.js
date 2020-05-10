import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Zoom from '@material-ui/core/Zoom';

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

const RecipeCategories = ({categories, editMode = false, onCategoriesChanged, allCategories = []}) => {
    const classes = useStyles()
    const [anchorElement, setAnchorElement] = React.useState(null);

    const handleDelete = (index) => {
        const newCategories = [...categories]
        newCategories.splice(index, 1)
        onCategoriesChanged(newCategories)
    };

    const handleAdd = (category) => {
        setAnchorElement(null)
        const newCategories = [...categories]
        newCategories.push(category)
        onCategoriesChanged(newCategories)
    };

    const menuItems = allCategories.map((category, index) => {
        return <MenuItem key={category.id} onClick={() => handleAdd(category)}>{category.name}</MenuItem>
    })

    const addCategory = (
        <li key={-1}>
            <Chip
                variant="outlined"
                color="primary"
                label="Přidat kategorii"
                onClick={(e) => setAnchorElement(e.currentTarget)}
                onDelete={(e) => setAnchorElement(e.currentTarget)}
                deleteIcon={<AddIcon/>}
                className={classes.chip}/>
            <Menu
                id="categoryMenu"
                anchorEl={anchorElement}
                keepMounted
                TransitionComponent={Zoom}
                open={Boolean(anchorElement)}
                onClose={(e) => setAnchorElement(null)}>
                {menuItems}
            </Menu>
        </li>
    )

    return (
        <ul className={classes.root}>
            {categories.map((category, index) => {
                return (
                    <li key={category.id}>
                        <Chip
                            variant="outlined"
                            color="primary"
                            label={category.name}
                            onDelete={editMode ? () => handleDelete(index) : undefined}
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
    onCategoriesChanged: PropTypes.func,
    allCategories: PropTypes.array
}