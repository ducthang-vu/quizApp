import React from 'react';
import '../style/FinalResult.scss';
import { Button } from '@material-ui/core';

interface FinalResultProps {
    score: {
        score: number,
        total: number
    }
}

function FinalResult(props: FinalResultProps) {
    const { score, total } = props.score;
    return (
        <div className="final-result">
            <div className="container">
                <h2 className="title">Congratulations!</h2>
                <p className="score">
                    Your score final score is: <span>{score}/{total}</span>
                </p>
                <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
                    Play again!
                </Button>
            </div>
        </div>
    );
}

export default FinalResult;
