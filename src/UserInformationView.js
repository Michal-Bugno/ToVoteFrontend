import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import API_ADDRESS from './constants'

import EditableField from './EditableField';
import Container from 'react-bootstrap/esm/Container'
import InformationModal from './InformationModal'

class UserInformationView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
                username : "",
                email : "",
                firstName : "",
                lastName : "",
                userInfo : "",
                showSaveModal : false
        }

        this.onFirstChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onUserInfoChange = this.onUserInfoChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    async componentDidMount(){
        
        try{
            const userDataResponse = await axios.get(API_ADDRESS+"/users/"+this.props.username, {
                headers : {
                    Authorization : window.sessionStorage.authToken
                }
            });

            this.setState({
                email : userDataResponse.data.email,
                firstName : userDataResponse.data.firstName,
                lastName : userDataResponse.data.lastName,
                userInfo : userDataResponse.data.userInfo
            });
        }

        catch(error){
            console.error(error);
        }
    }

    onFirstNameChange(event){
        this.setState({
            email : this.state.email,
            firstName : event.target.value,
            lastName : this.state.lastName,
            userInfo : this.state.userInfo
        })
    }

    onLastNameChange(event){
        this.setState({
            email : this.state.email,
            firstName : this.state.firstName,
            lastName : event.target.value,
            userInfo : this.state.userInfo
        })
    }

    onUserInfoChange(event){
        this.setState({
            email : this.state.email,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            userInfo : event.target.value
        })
    }

    async onSubmit(){
        try{
            const response = await axios.put(API_ADDRESS+"/users", {
                username : this.props.username,
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                userInfo : this.state.userInfo
            } , {headers : {Authorization : window.sessionStorage.authToken}});

            this.handleShow();
            console.log(response);
        }
        catch(error){
            if(error.response)
                alert(error.response.data.message)
            else
                alert("An error has occured!");
                console.error(error);
        }
    }

    handleClose(){
        this.setState({
            email : this.state.email,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            userInfo : this.state.userInfo,
            showSaveModal : false
        })
    }


    handleShow(){
        this.setState({
            email : this.state.email,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            userInfo : this.state.userInfo,
            showSaveModal : true
        })
    }



    render(){
        return(
            <div>
                <Jumbotron className="light-jumbotron h-100">
                    <h1>User {this.props.username}</h1>
                            E-mail: {this.state.email}
                    <Container>
                        <EditableField propertyName = "First name" value={this.state.firstName} type="text" onChange={this.onFirstChange} onSubmit={this.onSubmit}/>
                        <EditableField propertyName = "Last name" value={this.state.lastName} type="text" onChange={this.onLastNameChange} onSubmit={this.onSubmit}/>
                        <EditableField propertyName = "Short info" value={this.state.userInfo} type="text" onChange={this.onUserInfoChange} onSubmit={this.onSubmit}/>
                    </Container>
                    
                </Jumbotron>

                <InformationModal header="Data saved!" body="Your profile has been updated!" show={this.state.showSaveModal} handleClose={this.handleClose}/>
            </div>
        )
    }
}

export default UserInformationView;