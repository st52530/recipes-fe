import React from "react";
import PropTypes from "prop-types";

const PageError = ({error, tryAgain}) => {
    // TODO!
    return <p><b>{error}</b></p>
}

export default PageError

PageError.propTypes = PropTypes.shape({
    error: PropTypes.string.isRequired,
    tryAgain: PropTypes.func.isRequired
});