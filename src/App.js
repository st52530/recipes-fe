import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import NoMatch from "./routing/NoMatch";
import PrivateRoute from "./routing/PrivateRoute";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <PrivateRoute path="/">
                    <HomePage/>
                </PrivateRoute>
                <Route path="*">
                    <NoMatch/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
