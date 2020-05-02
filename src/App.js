import React, {useState, useEffect} from 'react';
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
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const App = () => {
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

    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        setLoggedIn(sessionStorage.getItem("token") !== null)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline/>

                <Box display="flex">
                    <NavBar loggedIn={loggedIn}/>

                    <Switch>
                        <Route path="/login">
                            <LoginPage onSuccess={setLoggedIn}/>
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
