import React from 'react';
import '../style/FinalResult.scss'

function FinalResult(props) {
    const {score, total} = props.score
    return(
        <div className="final-result">
            <div className="container">
                <h2 className="title">Congratulations!</h2>
                <p className="score">
                    Your score final score is: <span>{score}/{total}</span>
                </p>
                <button onClick={() => window.location.reload()}>Play again!</button>
            </div>
        </div>
    )
}

export default FinalResult