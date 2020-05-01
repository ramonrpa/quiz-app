import React, { Component, Fragment } from 'react'

import Main from './Main'
import Quiz from './Quiz'

import { Container, Card } from 'react-bootstrap'

import Icon from '../components/Icon'

import { getTrivia } from '../core/api'
import LoadingModal from './LoadingModal'
import ErrorModal from './ErrorModal'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isQuizStarted: false,
            questions: null,
            isLoading: false,
            isError: false,
            errorMessage: ''
        }
    }

    handleStart = async (amountOfQuestions, category, difficulty, questionsType) => {
        this.setState({ isLoading: true })
        let result = await getTrivia(amountOfQuestions, category, difficulty, questionsType)
        if (result.response_code === 0) {
            let questions = result.results
            return this.setState({ isLoading: false, questions, isQuizStarted: true })
        } else if (result.response_code === 1) {
            return this.setState({ isError: true, isLoading: false, isQuizStarted: false, questions: null, errorMessage: 'The Database doesn\'t have enough questions for your query. Please change number of questions, difficulty level or type of questions.' })
        } else {
            return this.setState({ isError: true, isLoading: false, isQuizStarted: false, questions: null, errorMessage: 'Could not connect to Database.' })
        }
    }

    handleClose = () => {
        this.setState({ isError: false })
    }

    backToHome = () => {
        this.setState({ isLoading: true })

        setTimeout(() => {
            this.setState({
                isQuizStarted: false,
                questions: null,
                isLoading: false,
                isError: false,
                errorMessage: ''
            })
        }, 1000)
    }

    render = () => {
        const { isError, isLoading, isQuizStarted, questions } = this.state
        return (
            <Fragment>
                <Container className="main d-flex align-items-center justify-content-center">
                    <Card className="card w-100 quiz-card">
                        <Card.Header className="text-center">
                            <Card.Title className="card-logo"><Icon icon="fas fa-brain" /></Card.Title>
                            <Card.Title>Open Trivia Questions</Card.Title>
                        </Card.Header>
                        <Card.Body className="result-body">
                            {!isQuizStarted && <Main onStart={this.handleStart} />}
                            <LoadingModal show={isLoading} />
                            <ErrorModal close={this.handleClose} show={isError} text={this.state.errorMessage} />
                            {isQuizStarted && <Quiz backToHome={this.backToHome} questions={questions} />}
                        </Card.Body>
                        <Card.Footer><a className="text-muted" href="https://github.com/ramonrpa"><Icon icon="fab fa-github" /> Ramon Rodrigues</a></Card.Footer>
                    </Card>
                </Container>
            </Fragment>
        )
    }
}

export default App