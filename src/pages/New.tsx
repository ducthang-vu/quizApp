import React, { FormEvent, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { NumberQuestions } from '../core-data/questions/number-questions';
import RadioFormGroup, { RadioOption } from '../components/RadioFormGroup';
import styles from '../style/New.module.scss';
import { GameDifficulty } from '../core-data/game-difficulty';
import { GameType } from '../core-data/game-type';
import SendIcon from '@material-ui/icons/Send';
import { fromQuestionsActions } from '../store/questions/questions.slice';
import { useNavigate } from 'react-router';
import { IGetQuestionsParams } from '../core-data/questions/i-get-questions-params';
import { useAppDispatch } from '../store/store';
import { fromGameActions } from '../store/game/game.slice';
import { GamePhase } from '../core-data/GamePhase';


export default function New() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fromGameActions.setPhase(GamePhase.MAIN))
    }, [dispatch])
    const numberOptions: RadioOption<NumberQuestions>[] = Object.values(NumberQuestions).map(v => ({
        value: v,
        label: v as string
    }));

    const difficultyOptions: RadioOption<GameDifficulty>[] = Object.values(GameDifficulty).map(v => ({
        value: v,
        label: v.charAt(0).toUpperCase() + v.slice(1)
    }));

    const typeOptions: RadioOption<GameType>[] = [
        {
            value: GameType.BOOLEAN,
            label: 'True/False'
        },
        {
            value: GameType.MULTIPLE,
            label: 'Multiple'
        },
        {
            value: GameType.BOTH,
            label: 'Both'
        }
    ];

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const payload: IGetQuestionsParams = {
            amount: numberOption,
            difficulty: difficultyOption,
            type: typeOption
        }
        navigate('/game')
        dispatch(fromQuestionsActions.loadQuestions(payload));
    };

    const [numberOption, setNumberOption] = useState(numberOptions[0].value);
    const [difficultyOption, setDifficultyOption] = useState(difficultyOptions[0].value);
    const [typeOption, setTypeOptions] = useState(typeOptions[0].value);

    return (
        <div className="container">
            <form className={styles.form} onSubmit={onSubmit}>
                <h2>Start a new game!</h2>
                <RadioFormGroup legend="Number of questions" options={numberOptions} value={numberOption} onChange={setNumberOption}/>
                <RadioFormGroup legend="Difficulty" options={difficultyOptions} value={difficultyOption} onChange={setDifficultyOption}/>
                <RadioFormGroup legend="Type" options={typeOptions} value={typeOption} onChange={setTypeOptions}/>
                <Button
                    type="submit"
                    className={styles.btn}
                    variant="contained"
                    size="large"
                    color="primary"
                >
                    <SendIcon/>
                    <span>Start!</span>
                </Button>
            </form>
        </div>
    );
}
