import React from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FirstPastThePostForm from './voting-forms/FirstPastThePostForm'
import API_ADDRESS from '../constants'

class VoteModal extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            vote : ""
        }

        this.submitVote = this.submitVote.bind(this);
        this.onVoteChange = this.onVoteChange.bind(this);
    }


    async submitVote(event){

        try{
            await axios({
                method : "POST",
                url : API_ADDRESS+`/votings/${this.props.voting.votingId}/votes`,
                data : {voteRepresentation : this.state.vote},
                headers : {Authorization : window.sessionStorage.authToken}
            })

            this.props.onSubmit(event);

        }
        catch(error){

        }
        this.props.handleClose();
    }

    onVoteChange(event){
        this.setState({
            vote : event.target.value
        })
    }

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
                <Modal.Title>{this.props.voting.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <h2>Please vote:</h2>
                   {(()=>{
                       switch(this.props.voting.votingType){
                           case "FIRST_PAST_THE_POST":
                               return <FirstPastThePostForm onChange={this.onVoteChange} options={this.props.voting.options}/>;
                            case "PREFERENTIAL":
                                
                                break;
                            case "PROPORTIONAL":
                                return <FirstPastThePostForm onChange={this.onVoteChange} options={this.props.voting.options}/>;
                       }
                   })()}
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

export default VoteModal;