import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import placeholder from '../../images/placeholder.svg';
import RecipeListCard from "./RecipeListCard";

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
    }
}));

const RecipeDetailHeader = ({name, imageUrl}) => {
    const classes = useStyles()

    return (
        <>
            <Paper className={classes.mainFeaturedPost}
                   style={{backgroundImage: `url(${imageUrl}), url(${placeholder}`}}>
                <div className={classes.overlay}/>
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
    imageUrl: PropTypes.string
};