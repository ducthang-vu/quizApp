import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { GamePhase } from '../core-data/GamePhase';
import { useHistory } from 'react-router';


export default function Endgame() {
    const score = useAppSelector(state => state.game.score);
    const total = useAppSelector(state => state.questions.entities).length;
    const phase = useAppSelector(state => state.game.phase);
    const history = useHistory();

    if (phase !== GamePhase.ENDGAME) {
        history.push('/')
    }

    return (
        <div className="container">
            <h2 className="title">Congratulations!</h2>
            <p className="score">
                Your score final score is: <span>{score}/{total}</span>
            </p>
            <Link to="/">
                <Button variant="contained" color="primary">
                    Play again!
                </Button>
            </Link>
        </div>
    );
}
