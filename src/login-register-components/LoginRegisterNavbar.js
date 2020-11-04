import React from 'react'
import Nav from 'react-bootstrap/Nav'
import RegisterForm from './RegisterForm'
import LoginForm from "./LoginForm"

class LoginRegisterNavbar extends React.Component{

  constructor(props){
    super(props);

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }

      onRegisterClick(){
        this.props.onClick({
          form : 'register'
        });
    }

    onLoginClick(){
        this.props.onClick({
          form : 'login'
        });
    }

    render(){
        return(
            <Nav className="ml-auto">
                <Nav.Link className="nav-button" onClick={this.onLoginClick}>Log in</Nav.Link>
                <Nav.Link onClick={this.onRegisterClick} className="nav-button">Register</Nav.Link>
            </Nav>
        )
    }

}

export default LoginRegisterNavbar