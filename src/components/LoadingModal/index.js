import React, { Component } from 'react'
import { Modal, Spinner } from 'react-bootstrap'

class LoadingModal extends Component {
    render = () => {
        return (
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.show}>
                <Modal.Body className="text-center">
                    <h2>Just one second</h2>
                    <p>{this.props.text || 'We are generating the content for you.'}</p>
                    <Spinner
                        as="span"
                        animation="grow"
                        role="status"
                        aria-hidden="true"
                    />
                </Modal.Body>
            </Modal>
        )
    }
}

export default LoadingModal
