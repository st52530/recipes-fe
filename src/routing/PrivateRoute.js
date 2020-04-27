import React from "react";
import {Route, Redirect} from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({children, ...rest}) => {
    return (
        // Todo: handle auth!
        <Route
            {...rest}
            render={({location}) =>
                true ? (
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