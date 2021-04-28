import Spinner from '../components/Spinner';
import React, { useEffect, useReducer } from 'react';
import { MobileStepper } from '@material-ui/core';
import QuestionBox from '../components/QuestionBox';
import styles from '../style/Game.module.scss';
import { fromGameActions } from '../store/game/game.slice';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/store';
import { GamePhase } from '../core-data/GamePhase';


export default function Game() {
    const dispatch = useAppDispatch();
    const history = useHistory()

    const loading = useAppSelector(state => state.questions.loading);
    const questions = useAppSelector(state => state.questions.entities);
    const error = useAppSelector(state => state.questions.error);

    const [currentQuestion, setCurrentQuestion] = useReducer(prev => ++prev, 0);

    useEffect(() => {
        if (error) history.push('/')
    }, [history, error])

    const counter = (): string => `${currentQuestion + 1}/${questions.length}`;

    const answerQuestion = (correct=false): void => {
        if (correct) {
            dispatch(fromGameActions.addScore());
        }
        if (currentQuestion + 1 >= questions.length) {
            dispatch(fromGameActions.setPhase(GamePhase.ENDGAME))
            history.push('/endgame')
        } else {
            setCurrentQuestion();
        }
    };

    if (loading) return (
        <Spinner/>
    );

    return (
        <div className="container">
            <MobileStepper
                variant="progress"
                steps={questions.length}
                position="static"
                activeStep={currentQuestion}
                className={styles.stepper}
                backButton=""
                nextButton=""
            />
            <h2>Question {counter()} </h2>
            <QuestionBox
                question={questions[currentQuestion]}
                answerQuestion={answerQuestion}>
            </QuestionBox>
        </div>
    );
}
