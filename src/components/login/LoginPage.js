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
import {login, isLoggedIn} from "../../services/AuthenticationService";

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
    }
}));

const LoginPage = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        document.title = "Přihlášení | Rodinné recepty"
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
            await login(username, password)
        } catch (exception) {
            console.error(exception)
            setError("Špatné jméno nebo heslo.")
        }
        setLoading(false);
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.loginForm}>

            <Typography component="h1" variant="h5" className={classes.loginTitle}>
                Přihlášení
            </Typography>

            <form noValidate onSubmit={doOnSubmit}>
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
                    }}
                    autoFocus/>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={error !== null}
                    helperText={error}
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
                            Přihlásit
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
                    <LinkUi component={Link} to="/register" variant="body2">
                        Registrovat
                    </LinkUi>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoginPage