import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import placeholder from '../../../images/placeholder.svg';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import RecipeListCard from "../list/RecipeListCard";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    hero: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: 470
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    editImage: {
        cursor: 'pointer',
        fontSize: 100
    },
    recipeTitle: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    },
    recipeTitleEdit: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    },
    headerBox: {
        position: 'relative',
        top: -50,
        margin: '0 auto',
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default
    },
    editIconsBox: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(1),
        right: 0
    },
    editIcons: {
        backgroundColor: theme.palette.primary.main,
        width: 48,
        height: 48,
        padding: theme.spacing(1)
    },
    buttonBase: {
        borderRadius: '50%',
        marginLeft: theme.spacing(1)
    }
}));

const RecipeDetailHeader = ({name, imageUrl, showEditIcons = false, editMode = false, setName, onFileSelected}) => {
    const classes = useStyles()

    let uploadInput = null

    const selectImage = () => {
        uploadInput.click()
    }

    const onFileChanged = (e) => {
        const file = e.target.files[0]
        onFileSelected(file)
    }

    return (
        <>
            <Paper className={classes.hero}
                   style={{backgroundImage: `url(${imageUrl}), url(${placeholder}`}}>
                <div className={classes.overlay}>
                    {editMode && (
                        <>
                            <EditIcon color="white" className={classes.editImage} onClick={selectImage}/>
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={onFileChanged}
                                ref={(ref) => uploadInput = ref}
                                style={{display: 'none'}}/>
                        </>
                    )}
                </div>
                {
                    showEditIcons && (
                        <Box className={classes.editIconsBox}>
                            <Tooltip arrow TransitionComponent={Zoom} title="Upravit">
                                <ButtonBase className={classes.buttonBase}>
                                    <Avatar className={classes.editIcons}>
                                        <EditIcon color="white" fontSize="large"/>
                                    </Avatar>
                                </ButtonBase>
                            </Tooltip>
                            <Tooltip arrow TransitionComponent={Zoom} title="Smazat">
                                <ButtonBase className={classes.buttonBase}>
                                    <Avatar className={classes.editIcons}>
                                        <DeleteIcon color="white" fontSize="large"/>
                                    </Avatar>
                                </ButtonBase>
                            </Tooltip>
                        </Box>
                    )
                }
            </Paper>

            <Container maxWidth="md" className={classes.headerBox}>
                {editMode ? (
                    <TextField
                        className={classes.recipeTitleEdit}
                        variant="outlined"
                        margin="normal"
                        required
                        label="Název receptu"
                        fullWidth
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                ) : (
                    <Typography className={classes.recipeTitle} component="h1" variant="h2">
                        {name}
                    </Typography>
                )}
            </Container>
        </>
    )
}

export default RecipeDetailHeader

RecipeListCard.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    showEditIcons: PropTypes.bool
};