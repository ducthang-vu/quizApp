import React from 'react';
import { LinearProgress } from '@material-ui/core';


function Spinner() {
    return (
        <div>
            <h2>Fetching questions...</h2>
            <div>
                <LinearProgress color="secondary" />
            </div>
        </div>
    )
}

export default Spinner
