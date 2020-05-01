import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

class Select extends Component {
    render = () => {
        return (
            <Form.Group>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control onChange={this.props.onChange} as="select" id="categories">
                    {this.props.itens.map(item => {
                        return (<option key={item.key} value={item.value}>{item.text}</option>)
                    })}
                </Form.Control>
            </Form.Group>
        )
    }
}

export default Select