import React, { Component } from 'react'

import { ButtonGroup, Button } from 'react-bootstrap'

import Icon from '../Icon'
import Stats from './Stats'
import Questions from './Questions'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: 'Stats'
        }
    }


    render = () => {
        const {
            totalQuestions,
            correctAnswers,
            retakeQuiz,
            backToHome,
            questionsResult,
            totalTime
        } = this.props

        const {
            activeTab
        } = this.state

        return (
            <div>
                <ButtonGroup className="w-100">
                    <Button onClick={() => {
                        this.setState({ activeTab: 'Stats' })
                    }} className="w-50" variant="outline-primary">Stats</Button>
                    <Button onClick={() => {
                        this.setState({ activeTab: 'Questions' })
                    }} className="w-50" variant="outline-primary">Questions</Button>
                </ButtonGroup>
                {activeTab === 'Stats' &&
                    <Stats
                        totalQuestions={totalQuestions}
                        correctAnswers={correctAnswers}
                        totalTime={totalTime}
                    />}
                {activeTab === 'Questions' &&
                    <Questions
                        questionsResult={questionsResult}
                    />}
                <div className="w-100 text-center mt-4">
                    <Button onClick={retakeQuiz} className="mr-2" variant="primary"><Icon icon="fas fa-home"></Icon> Retake Quiz</Button>
                    <Button onClick={backToHome} className="ml-2" variant="primary"><Icon icon="fas fa-undo"></Icon> Back To Home</Button>
                </div>
            </div>
        )
    }
}

export default App