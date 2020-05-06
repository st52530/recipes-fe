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

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
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
    },
    mainFeaturedPostContent: {
        padding: theme.spacing(3),
        textAlign: 'center',
        backgroundColor: theme.palette.background.default,
        color: 'black',
        fontWeight: 'bold'
    },
    headerBox: {
        position: 'relative',
        top: -50,
        padding: 0,
        margin: '0 auto'
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

const RecipeDetailHeader = ({name, imageUrl, showEditIcons = false}) => {
    const classes = useStyles()

    return (
        <>
            <Paper className={classes.mainFeaturedPost}
                   style={{backgroundImage: `url(${imageUrl}), url(${placeholder}`}}>
                <div className={classes.overlay}/>
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
                <Typography className={classes.mainFeaturedPostContent} component="h1" variant="h2">
                    {name}
                </Typography>
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