import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class InformationModal extends React.Component{

    constructor(props){
        super(props);
    }



    render(){
        return(
            <Modal
                show={this.props.show}
                backdrop="static"
                keyboard={false}
                className="information-modal"
                >
                <Modal.Header>
                <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-primary" className="modal-button" onClick={this.props.handleClose}>
                    Ok
                </Button>
                </Modal.Footer>
                </Modal>
        )
    }

}

export default InformationModal