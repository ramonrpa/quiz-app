import React, { Component } from 'react'

import {
    CATEGORIES,
    AMOUNT_OF_QUESTIONS,
    DIFFICULTY,
    QUESTIONS_TYPE
} from '../../core/constants'

import {  Row, Col, Button } from 'react-bootstrap'

import Icon from '../Icon'
import Select from '../Select'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category: 0,
            amountOfQuestions: 5,
            difficulty: 0,
            questionsType: 0
        }
    }

    render = () => {
        return (
            <div className="ml-4 mr-4 mt-4">
                <Row>
                    <Col className="col-12 col-sm-6">
                        <Select onChange={(event) => {
                            this.setState({ category: event.target.value })
                        }} label="Select Quiz Category" itens={CATEGORIES} />
                    </Col>
                    <Col className="col-12 col-sm-6">
                        <Select onChange={(event) => {
                            this.setState({ amountOfQuestions: event.target.value })
                        }} label="Select Amount of Questions" itens={AMOUNT_OF_QUESTIONS} />
                    </Col>
                </Row>
                <Row>
                    <Col className="col-12 col-sm-6">
                        <Select onChange={(event) => {
                            this.setState({ difficulty: event.target.value })
                        }} label="Select Difficulty Level" itens={DIFFICULTY} />
                    </Col>
                    <Col className="col-12 col-sm-6">
                        <Select onChange={(event) => {
                            this.setState({ questionsType: event.target.value })
                        }} label="Select Questions Type" itens={QUESTIONS_TYPE} />
                    </Col>
                </Row>
                <div className="w-100 text-center">
                    <Button onClick={() => this.props.onStart(this.state.amountOfQuestions, this.state.category, this.state.difficulty, this.state.questionsType)} variant="primary"><Icon icon="fas fa-play" /> Start Quiz</Button>
                </div>
            </div>
        )
    }
}

export default App