import React from 'react';

const App = () => {
    return (
        <div className="App">
            Recepty
            <p>
                Api URL: {process.env.REACT_APP_API_URL}
            </p>
        </div>
    );
}

export default App;
