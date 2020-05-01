import React, { Component } from 'react'

import { Container, Badge } from 'react-bootstrap'

import { secondsToTime } from '../../core/utils'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render = () => {
        const {
            totalQuestions,
            correctAnswers,
            totalTime
        } = this.props

        const score = Number((correctAnswers * 100) / totalQuestions).toFixed(2)
        const time = secondsToTime(totalTime)
        let timeText = `${time.hours}:${time.minutes}:${time.seconds}`

        return (
            <Container className="text-center mt-4 stats-container">
                <h2><Badge variant="primary"></Badge>{score >= 60 ? 'YOU PASSED' : 'YOU FAILED'}</h2>
                <p><b>Correct Answers:</b> {correctAnswers} of {totalQuestions}</p>
                <p><b>You percentage:</b> {score}% of 100%</p>
                <p><b>Approval percentage:</b> 60%</p>
                <p><b>Time Spent:</b> {timeText}</p>
            </Container>
        )
    }
}

export default App