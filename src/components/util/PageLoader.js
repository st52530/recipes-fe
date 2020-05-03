import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    progress: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

const PageLoader = () => {
    const classes = useStyles();
    return (
        <CircularProgress
            color="primary"
            className={classes.progress}
            thickness={4}
            size={80}/>
    )
}

export default PageLoader