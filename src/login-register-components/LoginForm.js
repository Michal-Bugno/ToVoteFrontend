import React from 'react'
import ReactDom from 'react-dom'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import LoginFailed from './LoginFailed'
import API_ADDRESS from '../constants'
import Container from 'react-bootstrap/Container'

class LoginForm extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            username : "",
            password : ""
        }

        this.submitForm = this.submitForm.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    async submitForm(event){

        event.preventDefault();
        event.target.reset();

        if(!this.state.password || !this.state.username){
            this.showError("You have to provide username and password!");
        }

        try{
            const authResponse = await axios.post(API_ADDRESS+"/login", {
                username : this.state.username,
                password : this.state.password
            });
            window.sessionStorage.authToken = authResponse.headers.authorization;

            this.showDashboard(this.state.username);

        }
        catch(error){
            
            if(!error.response){
                this.showError("An error has occured!")
                console.error(error);
                return;
            }

            if(error.response.status === 403){
                this.showError("Please provide valid username and password!");
                return;
            }
           
        }
    }

    handleUsernameChange(event){
        this.setState({
            username : event.target.value,
            password : this.state.password
        });
    }

    handlePasswordChange(event){
        this.setState({
            username : this.state.username,
            password : event.target.value
        });
    }

    showError(message){
        ReactDom.render(
            <React.StrictMode>
              <LoginFailed message={message}/>
            </React.StrictMode>,
            document.getElementById('field1')
        )
    }

    showDashboard(_username){
        this.props.onAuthenticationSuccess({
            username : _username
        });
    }


    render(){
       return(
        <Jumbotron className="dark-jumbotron">
            <Container>
           <Form onSubmit = {this.submitForm}>
                <Form.Group controlId = "username-form">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={this.handleUsernameChange}/>
                </Form.Group>

                <Form.Group controlId = "password-form">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                </Form.Group>

                <Button type="submit" variant="outline-primary" className="submit-button" block>
                    Log in!
                </Button>
        
            </Form>
            </Container>
        </Jumbotron>
       ) 
    }
}

export default LoginForm