import React from 'react';
import '../style/MainWaiting.scss'
import { LinearProgress } from '@material-ui/core';

function Spinner() {
    return (
        <div className="main-waiting">
            <h2>Fetching questions...</h2>
            <div id="canvas-wrapper">
                <LinearProgress color="secondary" />
            </div>
        </div>
    )
}

export default Spinner
