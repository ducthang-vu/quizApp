import React, { useState } from 'react';
import QuestionBox from './QuestionBoxInterface';
import FinalResult from '../components/FinalResult';
import '../style/MainContent.scss';
import { MobileStepper } from '@material-ui/core';


interface MainContentInterface {
    questions: {
        question: string,
        correct_answer: string,
        incorrect_answers: string
    }[]
}


function MainContent({ questions }: MainContentInterface) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const counter = () => `${currentQuestion + 1}/${questions.length}`;
    const [score, setScore] = useState(0);
    const answerQuestion = (newScore: number): void => {
        setScore(score + newScore);
        setCurrentQuestion(currentQuestion + 1);
    };

    return (
        <div className="main-content">
            <div className="container">
                {currentQuestion < questions.length ?
                    <React.Fragment>
                        <MobileStepper
                            variant="progress"
                            steps={10}
                            position="static"
                            activeStep={currentQuestion}
                            className="stepper"
                            backButton=""
                            nextButton=""
                        />
                        <h2>Question {counter()} </h2>
                        <QuestionBox
                            question={questions[currentQuestion]}
                            answerQuestion={answerQuestion}>
                        </QuestionBox>
                    </React.Fragment> :
                    <FinalResult score={{ score, total: questions.length }}/>
                }
            </div>
        </div>
    );
}

export default MainContent;
