import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import API_ADDRESS from '../constants'
import Button from 'react-bootstrap/Button'
import InformationModal from '../InformationModal'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

class GroupsView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            ownedGroups : [],
            otherGroups : [],
            showCreateModal : false,
            showInformationModal : false
        }

        this.onCreateClick = this.onCreateClick.bind(this);
        this.onConfirmClick = this.onConfirmClick.bind(this);
        this.onGroupNameChange = this.onGroupNameChange.bind(this);
        this.onGroupDescriptionChange = this.onGroupDescriptionChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    async componentDidMount(){
        try{
            const ownedResponse = await axios.get(API_ADDRESS+"/groups/owned", {headers : { Authorization : window.sessionStorage.authToken}});
            const otherResponse = await axios.get(API_ADDRESS+"/groups", {headers : { Authorization : window.sessionStorage.authToken}});

            this.setState({
                ownedGroups : ownedResponse.data,
                otherGroups : otherResponse.data,
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
            ownedGroups : this.state.ownedGroups,
            otherGroups : this.state.otherGroups,
            showCreateModal : true,
            newGroupName : "",
            newGroupDescription : ""
        });
    }

    onSelect(event){
        var group = this.state.ownedGroups.find(g => g.groupId == event.target.value);
        if(!group){
            group = this.state.otherGroups.find(g => g.groupId == event.target.value);
        }
        this.props.changeState(group);
    }

    async onConfirmClick(event){

        event.preventDefault();

        try{
        const response = await axios.post(API_ADDRESS+"/groups", {
            name : this.state.newGroupName,
            description : this.state.newGroupDescription
        }, {headers : {Authorization : window.sessionStorage.authToken}});

        this.state.ownedGroups.push(response.data);

        this.setState({
            ownedGroups : this.state.ownedGroups,
            otherGroups : this.state.otherGroups,
            showCreateModal : false,
            showInformationModal : true,
            informationHeader : "Group has been created!",
            informationBody : `Group "${response.data.name}" has been created!"`
        });
        }
        catch(error){
            console.error(error);
        }
    }

    onGroupNameChange(event){
        this.setState({
            ownedGroups : this.state.ownedGroups,
            otherGroups : this.state.otherGroups,
            showCreateModal : true,
            newGroupName : event.target.value,
            newGroupDescription : this.state.newGroupDescription
        });
    }

    onGroupDescriptionChange(event){
        this.setState({
            ownedGroups : this.state.ownedGroups,
            otherGroups : this.state.otherGroups,
            showCreateModal : true,
            newGroupName : this.state.newGroupName,
            newGroupDescription : event.target.value
        });
    }

    handleClose(){
        this.setState({
                ownedGroups : this.state.ownedGroups,
                otherGroups : this.state.otherGroups,
                showCreateModal : false,
                showInformationModal : false
        });
    }

    render(){

        const ownedElements = [];
        const otherElements = [];

        for(let i = 0; i < this.state.ownedGroups.length; i++)
            ownedElements.push(<ListGroup.Item action className="light-item" value={this.state.ownedGroups[i].groupId} key={this.state.ownedGroups[i].groupId} onClick={this.onSelect}>{this.state.ownedGroups[i].name}</ListGroup.Item>);
        for(let i = 0; i < this.state.otherGroups.length; i++)
            otherElements.push(<ListGroup.Item action className="light-item" value={this.state.otherGroups[i].groupId} key={this.state.otherGroups[i].groupId} onClick={this.onSelect}>{this.state.otherGroups[i].name}</ListGroup.Item>);

        return(
                <div>
                    <div>
                <Jumbotron className="light-jumbotron big-field-div light-scrollbar">
                    <h1>Your owned groups:</h1>
                        <ListGroup className="top-margin scrollable-150 light-scrollbar">
                            {ownedElements}
                        </ListGroup>
                        <Row>
                            <Col className = "right-shift">
                                <Button className="dark-submit-button top-margin" onClick={this.onCreateClick}><strong>Create group</strong></Button>
                            </Col>
                            <Col className="left-shift">
                                <Button className="dark-submit-button top-margin"><strong>Edit selected group</strong></Button>
                            </Col>
                        </Row>
                        <h1 className="big-top-margin">Groups you belong to:</h1>
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
                >
                <Modal.Header>
                <Modal.Title>Create group:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Group name:</Form.Label>
                        <Form.Control type="text" placeholder="Group name" onChange={this.onGroupNameChange}/>
                    </Form.Group>

                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Group description:</Form.Label>
                        <Form.Control type="text" placeholder="Group description" onChange={this.onGroupDescriptionChange}/>
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

export default GroupsView