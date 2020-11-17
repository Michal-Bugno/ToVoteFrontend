import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import InformationModal from '../InformationModal'
import API_ADDRESS from '../constants'
import Button from 'react-bootstrap/esm/Button'

class GroupDetailsView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            users : [],
            showAddModal : false,
            showInfoModal : false
        }
    }

    async componentDidUpdate(previousProps){
        if(this.props.group.groupId === previousProps.group.groupId)
            return;
        try{
            const usersResponse = await axios.get(API_ADDRESS+`/users/group/${this.props.group.groupId}`, {
                headers : {Authorization : window.sessionStorage.authToken}
            });
            this.setState({users : usersResponse.data, showAddModal : false});
        }
        catch(error){
            console.error(error);
        }
    }

    onAddUserClicked(event){
        this.setState({
            users : this.state.users,
            showAddModal : true,
            addedUsername : "",
            showInfoModal : false
        });
    }

    onAddedUsernameChange(event){
        this.setState({
            users : this.state.users,
            showAddModal : true,
            addedUsername : event.target.value,
            showInfoModal : false
        });
    }

    handleClose(event){
        this.setState({
            users : this.state.users,
            showAddModal : false,
            showInfoModal : false
        })
    }

   async onAddConfirmClicked(event){
       try{
            await axios({
                method : "POST",
                url : API_ADDRESS+`/groups/${this.props.group.groupId}/${this.state.addedUsername}`,
                headers : {Authorization : window.sessionStorage.authToken}
            });
            this.setState({
                users : this.state.users,
                showAddModal : false,
                showInfoModal : true,
                infoHeader : "User added to group!",
                infoBody : "You have added a new member!"
            })
       }
       catch(error){
           console.log(error.response);
           if(error.response.data){
            this.setState({
                users : this.state.users,
                showAddModal : false,
                showInfoModal : true,
                infoHeader : "User has not been added!",
                infoBody : error.response.data.message
            })
           }
           else{
            this.setState({
                users : this.state.users,
                showAddModal : false,
                showInfoModal : true,
                infoHeader : "User has not been added!",
                infoBody : "An error has occured!"
            })
           }
       }
    }



    render(){

            const table = [];

            for(let i = 0; i<this.state.users.length; i++)
            table.push(<tr><td>{this.state.users[i].username}</td><td>{this.state.users[i].email}</td></tr>)

        return(
            <div>
                <Jumbotron className="dark-jumbotron big-field-div light-scrollbar">
                    <h1><strong>{this.props.group.name} (ID: {this.props.group.groupId})</strong></h1>
                    <h3>Owner: {this.props.group.owner? this.props.group.owner.username : ""}</h3>
                    <p>{this.props.group.description}</p>
        <h1>Members: {this.props.group.owner && this.props.username === this.props.group.owner.username ?
         <Button variant="outline-primary" className="submit-button" onClick={this.onAddUserClicked.bind(this)}><strong>Add user</strong></Button> : null}</h1>
                    <Table className="white-text">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                            {table}
                        </thead>
                    </Table>
                </Jumbotron>
                <Modal
                show={this.state.showAddModal}
                backdrop="static"
                keyboard={false}
                className="information-modal"
                >
                <Modal.Header>
                <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formGroupUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={this.onAddedUsernameChange.bind(this)}/>
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
            </div>
        )
    }
}

export default GroupDetailsView;