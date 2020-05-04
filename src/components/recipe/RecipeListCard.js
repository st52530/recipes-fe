import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: '0 1 100%',
        boxSizing: 'border-box',
        marginBottom: '1em',
        marginLeft: '0.5em',
        marginRight: '0.5em',
        '@media screen and (min-width: 45em)': {
            maxWidth: 'calc(50% -  1em)',
            flex: '0 1 calc(50% - 1em)'
        },
        '@media screen and (min-width: 55em)': {
            maxWidth: 'calc(33% -  1em)',
            flex: '0 1 calc(33% - 1em)'
        },
        '@media screen and (min-width: 65em)': {
            maxWidth: 'calc(25% -  1em)',
            flex: '0 1 calc(25% - 1em)'
        }
    },
    actionArea: {
        height: '100%'
    },
    media: {
        height: 160
    },
    headline: {
        textOverflow: 'ellipsis',
        wordWrap: 'break-word',
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': 2,
        marginBottom: 0
    },
    description: {
        textOverflow: 'ellipsis',
        wordWrap: 'break-word',
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': 3,
        marginTop: theme.spacing(1)
    }
}));

const RecipeListCard = ({recipe}) => {
    const classes = useStyles()
    const author = recipe.author.displayName || recipe.author.username
    const category = recipe.categories[0].name
    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.actionArea}>
                <CardMedia
                    className={classes.media}
                    style={{backgroundColor:'red'}}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title={recipe.name}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.headline}>
                        {recipe.name}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                        By {author} | {recipe.preparationTime} | {category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                        {recipe.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const getInitialLetters = (name) => {
    return name.split(' ').map((item) => item[0])
}

export default RecipeListCard

RecipeListCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.object
    })
};