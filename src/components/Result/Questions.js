import React, { Component } from 'react'

import { Container, Table } from 'react-bootstrap'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render = () => {
        const {
            questionsResult
        } = this.props

        return (
            <Container className="text-center mt-4 questions-container">
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>N.</th>
                            <th>Question</th>
                            <th>Your Answers</th>
                            <th>Correct Answers</th>
                            <th>Point</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            questionsResult.map((item, index) => {
                                return (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{item.question}</td>
                                        <td>{item.user_answer}</td>
                                        <td>{item.correct_answer}</td>
                                        <td>{item.correct}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default App