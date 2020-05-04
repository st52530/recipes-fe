import React from "react";
import {Route, Redirect} from "react-router-dom";
import {isLoggedIn} from "../services/AuthenticationService";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({children, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({location}) =>
                isLoggedIn() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute