import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    box: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

const PageLoader = () => {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <CircularProgress
                color="primary"
                thickness={4}
                size={80}/>
        </Box>
    )
}

export default PageLoader