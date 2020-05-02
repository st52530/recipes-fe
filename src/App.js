import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import NoMatch from "./routing/NoMatch";
import PrivateRoute from "./routing/PrivateRoute";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
import Logout from "./components/logout/Logout";
import NavBar from "./components/navbar/NavBar";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toolbarArea: theme.mixins.toolbar
}));

const App = () => {
    const classes = useStyles();
    const theme = createMuiTheme({
        palette: {
            primary: {
                // light: will be calculated from palette.primary.main,
                main: '#d32f2f',
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                main: '#00bcd4'
            }
        },
        overrides: {
            MuiButton: {
                root: {
                    padding: '0.5rem'
                }
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline/>

                <Box>
                    <NavBar/>
                    {/* Take up toolbar space not to render content under it.*/}
                    <div className={classes.toolbarArea}/>

                    <Switch>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <PrivateRoute path="/logout">
                            <Logout/>
                        </PrivateRoute>
                        <PrivateRoute path="/">
                            <HomePage/>
                        </PrivateRoute>
                        <Route path="*">
                            <NoMatch/>
                        </Route>
                    </Switch>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
