import React from "react";
import PropTypes from "prop-types";
import PageLoader from "./PageLoader";
import PageError from "./PageError";

const ContentLoadingError = ({isLoading, error, tryAgain, children}) => {
    if (isLoading) {
        return <PageLoader/>
    }

    if (error) {
        return <PageError tryAgain={tryAgain} error={error}/>
    }

    return children
}

export default ContentLoadingError

ContentLoadingError.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    tryAgain: PropTypes.func.isRequired
}