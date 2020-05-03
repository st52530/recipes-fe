import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    box: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    }
}));

const PageError = ({error, tryAgain}) => {
    const classes = useStyles()

    const errors = error.split("\n").map((line, key) => {
        return <p key={key}>{line}</p>;
    })

    return (
        <Container component="main" maxWidth="xs" className={classes.box}>
            <Typography variant="h5">
                Chyba načítání dat
            </Typography>
            <>{errors}</>
            <Button
                fullWidth
                onClick={tryAgain}
                variant="contained"
                color="primary">
                Zkusit znovu
            </Button>
        </Container>
    )
}

export default PageError

PageError.propTypes = {
    error: PropTypes.string.isRequired,
    tryAgain: PropTypes.func.isRequired
};