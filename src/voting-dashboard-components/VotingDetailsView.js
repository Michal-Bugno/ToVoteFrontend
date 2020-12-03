import axios from 'axios'
import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import API_ADDRESS from '../constants'
import InformationModal from '../InformationModal'
import ResultsModal from './ResultsModal'
import VoteModal from './VoteModal'

class VotingDetailsView extends React.Component{

constructor(props){
    super(props);
    this.state = {
        groups : [],
        showAddModal : false,
        showInfoModal : false
    }
}

async componentDidUpdate(previousProps){
    if(this.props.voting.votingId === previousProps.voting.votingId)
        return;
    try{
        const groupsResponse = await axios.get(API_ADDRESS+`/groups/voting/${this.props.voting.votingId}`, {
            headers : {Authorization : window.sessionStorage.authToken}
        });
        this.setState({groups : groupsResponse.data, showAddModal : false})
    }
    catch(error){
        console.error(error);
    }
}

onAddedGroupIdChange(event){
    this.setState({
        groups : this.state.groups,
        showAddModal : true,
        addedGroupId : event.target.value,
        showInfoModal : false
    })
}

onAddGroupClicked(event){
    this.setState({
        groups : this.state.groups,
        showAddModal : true,
        addedGroupId : "",
        showInfoModal : false
    });
}

handleClose(event){
    this.setState({
        groups : this.state.groups,
        showAddModal : false,
        showInfoModal : false,
        showVoteModal : false,
        showResultsModal : false
    })
}

async onAddConfirmClicked(event){
    try{
        await axios({
            method : "POST",
            url : API_ADDRESS+`/votings/${this.props.voting.votingId}/${this.state.addedGroupId}`,
            headers : {Authorization : window.sessionStorage.authToken}
        })

        this.setState({
            groups : this.state.groups,
            showAddModal : false,
            showInfoModal : true,
            infoHeader : "Group added to voting!",
            infoBody : "You have added a new group authorized to vote!"
        })

    }
    catch(error){
        this.setState({
            groups : this.state.groups,
            showAddModal : false,
            showInfoModal : true,
            infoHeader : "Group has not been added!",
            infoBody : error.response.data ? error.response.data.message : "An error has occured!"
        })
    }
}

onVoteButtonClicked(event){
    this.setState({
        groups : this.state.groups,
        showVoteModal : true
    });
}

onResultsButtonClicked(event){
    this.setState({
        groups : this.state.groups,
        showResultsModal : true
    })
}

onVoteSubmitted(event){
    this.setState({
        groups : this.state.groups,
        showVoteModal : false,
        showInfoModal : true,
        infoHeader : "Vote submitted!",
        infoBody : "Your vote has been successfully submitted."
    })
}

render(){

    const table = [];

            for(let i = 0; i<this.state.groups.length; i++)
            table.push(<tr><td>{this.state.groups[i].groupId}</td><td>{this.state.groups[i].name}</td></tr>)

    return(
        <div>
            <Jumbotron className="dark-jumbotron big-field-div light-scrollbar">
                <h1><strong>{this.props.voting.name} (ID: {this.props.voting.votingId})</strong></h1>
                <h3>Owner: {this.props.voting.user? this.props.voting.user.username : ""}</h3>
                <p>{this.props.voting.description}</p>
                <Button block variant="outline-primary" className="submit-button" onClick={this.onVoteButtonClicked.bind(this)}>Vote</Button>
                <Button block variant="outline-primary" className="submit-button" onClick={this.onResultsButtonClicked.bind(this)}>Results</Button>
                <h1>Groups: {this.props.voting.user && this.props.username === this.props.voting.user.username ?
                <Button variant="outline-primary" className="submit-button" onClick={this.onAddGroupClicked.bind(this)}><strong>Add group</strong></Button> : null}</h1>
                <Table className="white-text">
                <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                            </tr>
                             
                            {table}
                            </thead>
                </Table>
            </Jumbotron>

            <Modal
                show={this.state.showAddModal}
                backdrop="static"
                keyboard={false}
                onHide={this.handleClose.bind(this)}
                className="information-modal"
                >
                <Modal.Header closeButton>
                <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formGroupId">
                        <Form.Label>Group Id:</Form.Label>
                        <Form.Control type="number" placeholder="Group Id" onChange={this.onAddedGroupIdChange.bind(this)}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-primary" className="modal-button" onClick={this.onAddConfirmClicked.bind(this)}>
                    Confirm
                </Button>
                </Modal.Footer>
                </Modal>
                <InformationModal header={this.state.infoHeader} body={this.state.infoBody} show={this.state.showInfoModal} handleClose={this.handleClose.bind(this)}/>
                <VoteModal voting={this.props.voting} show={this.state.showVoteModal} handleClose={this.handleClose.bind(this)} onSubmit={this.onVoteSubmitted.bind(this)}/>
                <ResultsModal voting={this.props.voting} show={this.state.showResultsModal} handleClose={this.handleClose.bind(this)}/>
        </div>
    );
}

}

export default VotingDetailsView;