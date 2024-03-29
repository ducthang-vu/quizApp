import React, { useState, useEffect } from 'react';
import '../style/QuestionBox.scss';
import { Question } from '../core-data/questions/question';
import { shuffle } from '../util/shuffle';

interface IQuestionBox {
    question: Question;
    answerQuestion: (newScore: boolean) => void;
    children?: any[];
}


export default function QuestionBox(props: IQuestionBox) {
    const getAllAnswers = (props: IQuestionBox) => {
        const { correct_answer, incorrect_answers } = props.question;
        return shuffle(incorrect_answers.concat(correct_answer));
    };

    const [answers, setAnswers] = useState(getAllAnswers(props));

    const handleConfirm = () => {
        if (answers.length !== 1) throw new Error('More than one answer');
        props.answerQuestion(answers[0] === props.question.correct_answer);
    };

    useEffect(() => {
        setAnswers(getAllAnswers(props));
        }, [props]
    );

    return (
        <div className="question-box">
            <h3
                className="question-box__title"
                dangerouslySetInnerHTML={{ __html: props.question.question }}>
            </h3>

            {answers.map((answer: string, index: number) =>
                <button
                    key={index}
                    className="question-box__btn answer-btn"
                    onClick={() => setAnswers([answer])}
                    dangerouslySetInnerHTML={{ __html: answer }}
                >
                </button>
            )}

            {answers.length === 1 && <React.Fragment>
                <button
                    className="question-box__btn confirm-btn"
                    onClick={handleConfirm}
                >CONFIRM
                </button>
                <button
                    className="question-box__btn cancel-btn"
                    onClick={() => setAnswers(getAllAnswers(props))}
                >Cancel
                </button>
            </React.Fragment>
            }
        </div>
    );
}
