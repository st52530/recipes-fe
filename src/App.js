import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import NoMatch from "./routing/NoMatch";
import LoginPage from "./components/login/LoginPage";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="*">
                    <NoMatch/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
