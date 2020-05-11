import React, {useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LinkUi from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {register, isLoggedIn} from "../../services/AuthenticationService";

const useStyles = makeStyles((theme) => ({
    loginTitle: {
        textAlign: 'center'
    },
    loginSpacingTop: {
        marginTop: theme.spacing(2)
    },
    loginSpacingTopHalf: {
        marginTop: theme.spacing(1)
    },
    loginForm: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    errorState: {
        marginTop: theme.spacing(2)
    }
}));

const RegistrationPage = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        document.title = "Registrace | Rodinné recepty"
    })

    if (isLoggedIn()) {
        // When logged in - show home.
        return <Redirect to="/"/>
    }

    const doOnSubmit = async (event) => {
        // Render state correctly.
        event.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await register(username, password, displayName)
        } catch (exception) {
            setError("Něco se nepovedlo. Zkuste to znovu a lépe.")
        }
        setLoading(false);
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.loginForm}>

            <Typography component="h1" variant="h5" className={classes.loginTitle}>
                Registrace
            </Typography>

            <form noValidate onSubmit={doOnSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={error !== null}
                    id="displayName"
                    label="Celé jméno"
                    name="displayName"
                    value={displayName}
                    onChange={(e) => {
                        setError(null)
                        setDisplayName(e.target.value)
                    }}
                    autoFocus/>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={error !== null}
                    autoComplete="username"
                    id="username"
                    label="Přihlašovací jméno"
                    name="username"
                    value={username}
                    onChange={(e) => {
                        setError(null)
                        setUsername(e.target.value)
                    }}/>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={error !== null}
                    helperText="Heslo musí obsahovat alespoň jeden znak."
                    name="password"
                    label="Heslo"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setError(null)
                        setPassword(e.target.value)
                    }}
                    autoComplete="current-password"/>

                <Box display="flex" justifyContent="center" className={classes.loginSpacingTopHalf}>
                    {!isLoading && (
                        <Button
                            type="submit"
                            fullWidth
                            disabled={username === "" || password === ""}
                            variant="contained"
                            color="primary">
                            Registrovat
                        </Button>
                    )}
                    {isLoading && <CircularProgress color="primary"/>}
                </Box>
            </form>

            <Grid
                container
                direction="row"
                justify="center"
                className={classes.loginSpacingTop}
                alignItems="center">
                <Grid item>
                    <LinkUi component={Link} to="/login" variant="body2">
                        Nebo se chcete přihlásit?
                    </LinkUi>
                </Grid>
            </Grid>
            {error && <Alert className={classes.errorState} severity="error">{error}</Alert>}
        </Container>
    )
}

export default RegistrationPage