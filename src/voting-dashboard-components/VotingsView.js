import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InformationModal from '../InformationModal'


import API_ADDRESS from '../constants';

class VotingsView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            ownedVotings : [],
            otherVotings : [],
            showCreateModal : false,
            showInformationModal : false
        }

        this.onCreateClick = this.onCreateClick.bind(this);
        this.onConfirmClick = this.onConfirmClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onVotingNameChange = this.onVotingNameChange.bind(this);
        this.onVotingDescriptionChange = this.onVotingDescriptionChange.bind(this);
        this.onVotingOptionsChange = this.onVotingOptionsChange.bind(this);
        this.onVotingTypeChange = this.onVotingTypeChange.bind(this);
        this.onWinningOptionsChange = this.onWinningOptionsChange.bind(this);
        this.onStartTimeChange = this.onStartTimeChange.bind(this);
        this.onEndTimeChange = this.onEndTimeChange.bind(this);
        this.onExplicitChange = this.onExplicitChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async componentDidMount(){
        try{
            const ownedResponse = await axios.get(API_ADDRESS+"/votings", {headers : {Authorization : window.sessionStorage.authToken}});
            const otherResponse = await axios.get(API_ADDRESS+"/votings/authorized", {headers : {Authorization : window.sessionStorage.authToken}});

            this.setState({
                ownedVotings : ownedResponse.data,
                otherVotings : otherResponse.data,
                showCreateModal : false,
                showInformationModal : false
            });
        }
        catch(error){
            console.error(error);
        }
    }

    onCreateClick(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : true,
            showInformationModal : false,
            votingName : "",
            votingDescription : "",
            votingType : "FIRST_PAST_THE_POST",
            winningOptions : 1,
            explicit : false,
            votingOptions : "",
            startTime : "",
            endTime : ""
        });
    }

    onSelect(event){
        var voting = this.state.ownedVotings.find(v => v.votingId == event.target.value);
        if(!voting){
            voting = this.state.otherVotings.find(v => v.votingId == event.target.value);
        }
        this.props.changeState(voting);
    }

    async onConfirmClick(event){

        event.preventDefault();
        const voting = this.getVotingFromState();
        try{
            console.log(voting);
            const response = await axios.post(API_ADDRESS+"/votings", voting, {headers : {Authorization : window.sessionStorage.authToken}});
            this.state.ownedVotings.push(response.data);

            this.setState({
                ownedVotings : this.state.ownedVotings,
                otherVotings : this.state.otherVotings,
                showCreateModal : false,
                showInformationModal : true,
                informationHeader : "Voting has been created!",
                informationBody : `Voting "${response.data.name}" has been created!"`
            });
        }
        catch(error){
            console.error(error);
        }

    }

    handleClose(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : false,
            showInformationModal : false,
        })
    }

    onVotingNameChange(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : true,
            showInformationModal : false,
            votingName : event.target.value,
            votingDescription : this.state.votingDescription,
            votingType : this.state.votingType,
            winningOptions : this.state.winningOptions,
            explicit : this.state.explicit,
            votingOptions : this.state.votingOptions,
            startTime : this.state.startTime,
            endTime : this.state.endTime
        });
    }

    onVotingDescriptionChange(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : true,
            showInformationModal : false,
            votingName : this.state.votingName,
            votingDescription : event.target.value,
            votingType : this.state.votingType,
            winningOptions : this.state.winningOptions,
            explicit : this.state.explicit,
            votingOptions : this.state.votingOptions,
            startTime : this.state.startTime,
            endTime : this.state.endTime
        });
    }

    onVotingTypeChange(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : true,
            showInformationModal : false,
            votingName : this.state.votingName,
            votingDescription : this.state.votingDescription,
            votingType : event.target.value,
            winningOptions : this.state.winningOptions,
            explicit : this.state.explicit,
            votingOptions : this.state.votingOptions,
            startTime : this.state.startTime,
            endTime : this.state.endTime
        });
    }

    onWinningOptionsChange(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : true,
            showInformationModal : false,
            votingName : this.state.votingName,
            votingDescription : this.state.votingDescription,
            votingType : this.state.votingType,
            winningOptions : event.target.value,
            explicit : this.state.explicit,
            votingOptions : this.state.votingOptions,
            startTime : this.state.startTime,
            endTime : this.state.endTime
        });
    }

    onExplicitChange(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : true,
            showInformationModal : false,
            votingName : this.state.votingName,
            votingDescription : this.state.votingDescription,
            votingType : this.state.votingType,
            winningOptions : this.state.winningOptions,
            explicit : !this.state.explicit,
            votingOptions : this.state.votingOptions,
            startTime : this.state.startTime,
            endTime : this.state.endTime
        });
    }

    onVotingOptionsChange(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : true,
            showInformationModal : false,
            votingName : this.state.votingName,
            votingDescription : this.state.votingDescription,
            votingType : this.state.votingType,
            winningOptions : this.state.winningOptions,
            explicit : this.state.explicit,
            votingOptions : event.target.value,
            startTime : this.state.startTime,
            endTime : this.state.endTime
        });
    }

    onStartTimeChange(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : true,
            showInformationModal : false,
            votingName : this.state.votingName,
            votingDescription : this.state.votingDescription,
            votingType : this.state.votingType,
            winningOptions : this.state.winningOptions,
            explicit : this.state.explicit,
            votingOptions : this.state.votingOptions,
            startTime : event.target.value,
            endTime : this.state.endTime
        });
    }

    onEndTimeChange(event){
        this.setState({
            ownedVotings : this.state.ownedVotings,
            otherVotings : this.state.otherVotings,
            showCreateModal : true,
            showInformationModal : false,
            votingName : this.state.votingName,
            votingDescription : this.state.votingDescription,
            votingType : this.state.votingType,
            winningOptions : this.state.winningOptions,
            explicit : this.state.explicit,
            votingOptions : this.state.votingOptions,
            startTime : this.state.startTime,
            endTime : event.target.value
        });
    }

    getVotingFromState(){
        var voting = {};
        var optionStrings = this.state.votingOptions.split(/\r?\n/);
        voting.options = [];
        for(let i = 0; i < optionStrings.length; i++)
            voting.options.push({optionNumber : i+1, name : optionStrings[i]})
        voting.name = this.state.votingName;
        voting.description = this.state.votingDescription;
        voting.votingType = this.state.votingType;
        voting.explicit = this.state.explicit;
        voting.winningOptionsNumber = this.state.winningOptions;
        voting.startTimeStamp = (new Date(this.state.startTime)).getTime();
        voting.endTimeStamp = (new Date(this.state.endTime)).getTime();
        return voting;
    }


    render(){

        const ownedElements = [];
        const otherElements = [];

        for(let i = 0; i < this.state.ownedVotings.length; i++)
            ownedElements.push(<ListGroup.Item action className="light-item" value={this.state.ownedVotings[i].votingId} key={this.state.ownedVotings[i].votingId} onClick={this.onSelect}>{this.state.ownedVotings[i].name}</ListGroup.Item>);
        for(let i = 0; i < this.state.otherVotings.length; i++)
            otherElements.push(<ListGroup.Item action className="light-item" value={this.state.otherVotings[i].votingId} key={this.state.otherVotings[i].votingId} onClick={this.onSelect}>{this.state.otherVotings[i].name}</ListGroup.Item>);

        return(
            <div>
                <div>
                    <Jumbotron className="light-jumbotron big-field-div light-scrollbar">
                        <h1>Your votings:</h1>
                        <ListGroup className="top-margin scrollable-150 light-scrollbar">
                            {ownedElements}
                        </ListGroup>
                        <Row>
                            <Col className = "right-shift">
                                <Button className="dark-submit-button top-margin" onClick={this.onCreateClick}><strong>Create voting</strong></Button>
                            </Col>
                            <Col className="left-shift">
                                <Button className="dark-submit-button top-margin"><strong>Edit selected voting</strong></Button>
                            </Col>
                        </Row>
                        <h1 className="big-top-margin">Other votings:</h1>
                        <ListGroup className="top-margin scrollable-150 light-scrollbar">
                            {otherElements}
                        </ListGroup>
                    </Jumbotron>
                </div>

                <Modal
                show={this.state.showCreateModal}
                backdrop="static"
                keyboard={false}
                className="information-modal"
                onHide={this.handleClose}
                >
                <Modal.Header closeButton>
                <Modal.Title>Create voting:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formVotingName">
                        <Form.Label>Voting name:</Form.Label>
                        <Form.Control type="text" placeholder="Voting name" onChange={this.onVotingNameChange}/>
                    </Form.Group>

                    <Form.Group controlId="formVotingDescription">
                        <Form.Label>Voting description:</Form.Label>
                        <Form.Control type="text" placeholder="Voting description" onChange={this.onVotingDescriptionChange}/>
                    </Form.Group>

                    <Form.Group controlId="formVotingType">
                        <Form.Label>Voting type:</Form.Label>
                        <Form.Control as="select" onChange={this.onVotingTypeChange}>
                            <option>FIRST_PAST_THE_POST</option>
                            <option>PREFERENTIAL</option>
                            <option>PROPORTIONAL</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controld="formWinningOptions">
                        <Form.Label>Number of winning options:</Form.Label>
                        <Form.Control type="number" placeholder="Number of winning options" onChange={this.onWinningOptionsChange}/>
                    </Form.Group>

                    <Form.Group controlId="formVotingType">
                        <Form.Check label="explicit" type="checkbox" onChange={this.onExplicitChange}/>
                    </Form.Group>

                    <Form.Group controlId="formVotingOptions">
                        <Form.Label>Voting options:</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={this.onVotingOptionsChange}/>
                    </Form.Group>

                    <Form.Group controlId="formStartTime">
                        <Form.Label>Start time:</Form.Label>
                        <Form.Control type="datetime-local" onChange={this.onStartTimeChange}/>
                    </Form.Group>

                    <Form.Group controlId="formEndTime">
                        <Form.Label>End time:</Form.Label>
                        <Form.Control type="datetime-local" onChange={this.onEndTimeChange}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-primary" className="modal-button" onClick={this.onConfirmClick}>
                    Confirm
                </Button>
                </Modal.Footer>
                </Modal>
                <InformationModal header={this.state.informationHeader} body={this.state.informationBody} show={this.state.showInformationModal} handleClose={this.handleClose}/>
            </div>
        )
    }
}

export default VotingsView;