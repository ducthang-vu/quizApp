import React, { useState } from 'react';
import QuestionBox from './QuestionBox'
import FinalResult from '../components/FinalResult';
import '../style/MainContent.scss'
import { MobileStepper } from '@material-ui/core';

function MainContent(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const counter = () => `${currentQuestion + 1}/${props.questions.length}`
    const [score, setScore] = useState(0)
    const answerQuestion = (newScore) => {
        setScore(score + newScore)
        setCurrentQuestion(currentQuestion + 1)
    }

    return(
        <div className="main-content">
            <div className="container">
                {currentQuestion < props.questions.length ?
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
                            question={props.questions[currentQuestion]}
                            answerQuestion={answerQuestion}
                        >
                        </QuestionBox> 
                    </React.Fragment> :
                    <FinalResult score={{score, total: props.questions.length}} />
                }
            </div>
        </div>
    )
}

export default MainContent
