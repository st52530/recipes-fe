import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';

const createStyles = makeStyles((theme) => ({
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
    const styles = createStyles();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState(false);

    const doOnSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
    }

    return (
        <Container component="main" maxWidth="xs"
                   className={styles.loginForm}>

            <Typography component="h1" variant="h5" className={styles.loginTitle}>
                Přihlášení
            </Typography>

            <form noValidate onSubmit={doOnSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="username"
                    id="username"
                    label="Přihlašovací jméno"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus/>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Heslo"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"/>

                <Box display="flex" justifyContent="center" className={styles.loginSpacingTopHalf}>
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
                className={styles.loginSpacingTop}
                alignItems="center">
                <Grid item>
                    <Link href="#" variant="body2">
                        {"Registrovat"}
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoginPage