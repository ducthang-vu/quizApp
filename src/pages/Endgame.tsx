import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { GamePhase } from '../core-data/GamePhase';
import { useHistory } from 'react-router';
import styles from '../style/Endgame.module.scss';


export default function Endgame() {
    const score = useAppSelector(state => state.game.score);
    const total = useAppSelector(state => state.questions.entities).length;
    const phase = useAppSelector(state => state.game.phase);
    const history = useHistory();

    if (phase !== GamePhase.ENDGAME) {
        history.push('/')
    }

    return (
        <div className="container text-center">
            <div className={styles.box}>
                <h2>Congratulations!</h2>
                <p className={styles.score}>
                    Your score final score is: <span>{score}/{total}</span>
                </p>
                <Link to="/" className={styles.btn}>
                    <Button variant="contained" color="primary">
                        Play again!
                    </Button>
                </Link>
            </div>
        </div>
    );
}
