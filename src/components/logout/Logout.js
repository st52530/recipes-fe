import React from "react";
import {Redirect} from 'react-router-dom';
import {logout} from "../../services/AuthenticationService";

const Logout = () => {
    logout()
    return <Redirect to="/"/>
}

export default Logout