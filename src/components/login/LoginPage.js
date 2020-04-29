import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import "./LoginPage.css";

const LoginPage = () => {
    return (
        <Container component="main" maxWidth="xs">

            <Typography component="h1" variant="h5">
                Přihlášení
            </Typography>

            <form noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Přihlašovací jméno"
                    name="username"
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
                    autoComplete="current-password"/>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary">
                    Přihlásit
                </Button>
            </form>

            <Grid
                container
                direction="row"
                justify="center"
                className="register-link"
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