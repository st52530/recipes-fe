import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import "./LoginPage.css";

const LoginPage = () => {
    return (
        <Container component="main" maxWidth="xs"
                   className="login-form">

            <Typography component="h1" variant="h5" className="login-title">
                Přihlášení
            </Typography>

            <form noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="username"
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

                <Box className="login-spacing-top">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">
                        Přihlásit
                    </Button>
                </Box>
            </form>

            <Grid
                container
                direction="row"
                justify="center"
                className="login-spacing-top"
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