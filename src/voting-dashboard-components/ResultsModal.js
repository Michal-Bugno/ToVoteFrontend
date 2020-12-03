import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class ResultsModal extends React.Component{

render(){
    return(
        <Modal
                show={this.props.show}
                backdrop="static"
                keyboard={false}
                className="information-modal"
                onHide={this.props.handleClose}
                >
                <Modal.Header closeButton>
                <Modal.Title>{this.props.voting.name} - results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <h2>Results:</h2>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-primary" className="modal-button" onClick={this.submitVote}>
                    Submit vote
                </Button>
                </Modal.Footer>
                </Modal>
    )
}

}

export default ResultsModal;