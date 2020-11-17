import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import API_ADDRESS from'../constants'
import InformationModal from '../InformationModal'

class RegisterForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username : "",
            email : "",
            password : "",
            repeatedPassword : "",
            firstName : "",
            lastName : ""
        }

        this.submitForm = this.submitForm.bind(this);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRepeatedPasswordChange = this.handleRepeatedPasswordChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async submitForm(event){

        event.preventDefault();
        event.target.reset();

        if(!this.state.password || !this.state.username || !this.state.email){
            this.showError("You have to provide username, password and e-mail!");
            return;
        }

        if(this.state.password !== this.state.repeatedPassword){
            this.showError("Repeated password does not match the first one!");
            return;
        }

        

        try{
            const response = await axios.post(API_ADDRESS+"/users", {
                username : this.state.username,
                email : this.state.email,
                password : this.state.password,
                firstName : this.state.firstName,
                lastName : this.state.lastName
            });

            if(response.data.firstName)
                this.showConfirmation(response.data.firstName);
            else
                this.showConfirmation(response.data.username);
        }
        catch(error){
            if(error.response){
                this.showError(error.response.data.message);
            }
            else{
                this.showError("An error has occured!");
                console.error(error);
            }
        }

    }

    showConfirmation(name){
        this.setState({
            showModal : true,
            modalHeader : `Nice to meet you, '${name}' !`,
            modalBody : "Your account has been created!"
        });
    }

    showError(message){
        this.setState({
            showModal : true,
            modalHeader : "Something went wrong!",
            modalBody : message
        });
    }

    handleClose(){
        this.setState({
            showModal : false,
            modalHeader : "",
            modalBody : ""
        });
    }

    handleUsernameChange(event){
        this.setState({
                username : event.target.value,
                email : this.state.email,
                password : this.state.password,
                repeatedPassword : this.state.repeatedPassword,
                firstName : this.state.firstName,
                lastName : this.state.lastName
        });
    }

    handleEmailChange(event){
        this.setState({
                username : this.state.username,
                email : event.target.value,
                password : this.state.password,
                repeatedPassword : this.state.repeatedPassword,
                firstName : this.state.firstName,
                lastName : this.state.lastName
        });
    }

    handlePasswordChange(event){
        this.setState({
                username : this.state.username,
                email : this.state.email,
                password : event.target.value,
                repeatedPassword : this.state.repeatedPassword,
                firstName : this.state.firstName,
                lastName : this.state.lastName
        });
    }

    handleRepeatedPasswordChange(event){
        this.setState({
            username : this.state.username,
                email : this.state.email,
                password : this.state.password,
                repeatedPassword : event.target.value,
                firstName : this.state.firstName,
                lastName : this.state.lastName
        });
    }

    handleFirstNameChange(event){
        this.setState({
                username : this.state.username,
                email : this.state.email,
                password : this.state.password,
                repeatedPassword : this.state.repeatedPassword,
                firstName : event.target.value,
                lastName : this.state.lastName
        });
    }

    handleLastNameChange(event){
        this.setState({
            username : this.state.username,
                email : this.state.email,
                password : this.state.password,
                repeatedPassword : this.state.repeatedPassword,
                firstName : this.state.firstName,
                lastName : event.target.value
        });
    }

    render(){
       return(
        <Jumbotron className="dark-jumbotron">
            <Container>
                <Form onSubmit={this.submitForm}>
                    <Row>
                            <Col>
                                <Form.Group controlId = "username-form">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" placeholder="Username" onChange={this.handleUsernameChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId = "email-form">
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control type="email" placeholder="E-mail" onChange={this.handleEmailChange}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId = "password-form">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId = "repeat-password-form">
                                    <Form.Label>Repeat password:</Form.Label>
                                    <Form.Control type="password" placeholder="Repeat password" onChange={this.handleRepeatedPasswordChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId = "first-name-form">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" onChange={this.handleFirstNameChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId = "last-name-form">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" onChange={this.handleLastNameChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button type="submit" variant="outline-primary" className="submit-button" block>
                            Register!
                        </Button>
                
                    </Form>
                    <InformationModal header={this.state.modalHeader} body={this.state.modalBody} show={this.state.showModal} handleClose={this.handleClose}/>
            </Container>
        </Jumbotron>
       ) 
    }
}

export default RegisterForm