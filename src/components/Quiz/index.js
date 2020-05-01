import React, { Component } from 'react'

import { Badge, Row, Col, Button } from 'react-bootstrap'

import he from 'he'
import Icon from '../Icon'

import LoadingModal from '../LoadingModal'
import Result from '../Result'

import { secondsToTime } from '../../core/utils'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentQuestionIndex: null,
            questions: props.questions,
            selectedOption: null,
            options: null,
            isLoading: true,
            questionsResult: [],
            correctAnswers: 0,
            quizIsCompleted: false,
            resultComponent: null,
            totalTime: 0
        }
    }

    componentDidMount = () => {
        const options = [...this.state.questions[0].incorrect_answers]
        options.splice(Math.floor(Math.random() * 4), 0, this.state.questions[0].correct_answer)
        this.setState({ currentQuestionIndex: 0, options, isLoading: false })
        this.timer = setInterval(() => {
            this.setState({ totalTime: this.state.totalTime + 1000 })
        }, 1000)
    }

    handleNext = () => {
        const { currentQuestionIndex, questions, selectedOption, questionsResult, correctAnswers } = this.state
        let correct = 0
        if (selectedOption === questions[currentQuestionIndex].correct_answer) {
            correct = 1
        }

        questionsResult.push({
            question: he.decode(questions[currentQuestionIndex].question),
            user_answer: selectedOption,
            correct_answer: he.decode(questions[currentQuestionIndex].correct_answer),
            correct
        })

        if (currentQuestionIndex === questions.length - 1) {
            clearInterval(this.timer)
            return this.setState({
                quizIsCompleted: true,
                currentQuestionIndex: 0,
                correctAnswers: correctAnswers + correct,
                options: null,
                questionsResult,
                selectedOption: null,
                isLoading: true
            })
        }

        const options = [...this.state.questions[currentQuestionIndex + 1].incorrect_answers]
        options.splice(Math.floor(Math.random() * 4), 0, this.state.questions[currentQuestionIndex + 1].correct_answer)
        this.setState({
            currentQuestionIndex: currentQuestionIndex + 1,
            correctAnswers: correctAnswers + correct,
            options,
            questionsResult,
            selectedOption: null
        })
    }

    retakeQuiz = () => {
        this.setState({
            currentQuestionIndex: null,
            questions: this.state.questions,
            selectedOption: null,
            options: null,
            isLoading: true,
            questionsResult: [],
            correctAnswers: 0,
            quizIsCompleted: false,
            resultComponent: null,
            totalTime: 0
        })

        const options = [...this.state.questions[0].incorrect_answers]
        options.splice(Math.floor(Math.random() * 4), 0, this.state.questions[0].correct_answer)
        this.setState({ currentQuestionIndex: 0, options, isLoading: false })
    }

    getResult = () => {
        setTimeout(() => {
            const { questions, totalTime, correctAnswers, questionsResult } = this.state
            const { backToHome } = this.props

            const resultComponent = (
                <Result
                    totalQuestions={questions.length}
                    correctAnswers={correctAnswers}
                    questionsResult={questionsResult}
                    retakeQuiz={this.retakeQuiz}
                    backToHome={backToHome}
                    totalTime={totalTime}
                />
            )

            this.setState({ resultComponent, isLoading: false })
        }, 1000)
    }

    render = () => {
        const { totalTime, isLoading, currentQuestionIndex, questions, selectedOption, options, quizIsCompleted, resultComponent } = this.state

        if (quizIsCompleted && !resultComponent) {
            this.getResult()
        }
        const time = secondsToTime(totalTime)
        let timeText = `${time.hours}:${time.minutes}:${time.seconds}`

        return (
            <div>
                <LoadingModal text={quizIsCompleted ? 'Getting your result.' : ''} show={isLoading} />
                {
                    !isLoading && !quizIsCompleted &&
                    <div className="ml-4 mr-4 mt-4">
                        <Row>
                            <Col>
                                <h2><Badge variant="primary">Question N. {currentQuestionIndex + 1} of {questions.length}</Badge></h2>
                            </Col>
                            <Col>
                                <h2 className="float-sm-left float-md-right"><Badge variant="primary">{timeText}</Badge></h2>
                            </Col>
                        </Row>
                        <p className="questionText"><b>Question:</b> {he.decode(questions[currentQuestionIndex].question)}</p>
                        <p className="chooseText">Please choose one of the following answers:</p>
                        <div className="divider"></div>
                        <Row>
                            {options.map((item, index) => {
                                const letter = index + 65
                                const selected = selectedOption === item
                                return (
                                    <Col key={index} className="col-12 col-sm-6 btn-option">
                                        <p className={selected ? 'selected' : null} onClick={() => {
                                            this.setState({ selectedOption: item })
                                        }}><Badge variant="primary">{he.decode(`&#${letter}`)}</Badge> {he.decode(item)}</p>
                                    </Col>
                                )
                            })}
                        </Row>
                        <Button onClick={this.handleNext} size="lg" className="float-right" variant="primary" disabled={selectedOption != null ? false : true} ><Icon icon="fas fa-forward" /> Next</Button>
                    </div>
                }
                {quizIsCompleted && resultComponent}
            </div>
        )
    }
}

export default App