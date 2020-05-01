import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

class ErrorModal extends Component {
    render = () => {
        return (
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.show}>
                <Modal.Body className="text-center">
                    <h2>Error</h2>
                    <p style={{ color: '#d40000' }}>{this.props.text || ''}</p>
                    <Button onClick={this.props.close}>Close</Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ErrorModal