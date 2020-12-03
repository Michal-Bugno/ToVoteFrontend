import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ToVoteLogo from './resources/images/ToVoteLogo.png'
import LoginForm from './login-register-components/LoginForm'
import LoginRegisterNavbar from './login-register-components/LoginRegisterNavbar'
import Footer from './Footer'
import Greeting from './login-register-components/Greeting'
import Summary from './user-dashboard-components/Summary'

import appStates from './AppStateEnum'
import UserInformationView from './user-dashboard-components/UserInformationView'
import RegisterForm from './login-register-components/RegisterForm'
import AppNavbar from './AppNavbar'
import GroupsView from './groups-dashboard-components/GroupsView'
import GroupDetailsView from './groups-dashboard-components/GroupDetailsView'
import VotingsView from './voting-dashboard-components/VotingsView'
import VotingDetailsView from './voting-dashboard-components/VotingDetailsView'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      appState : appStates.LOGIN_REGISTER,
      stateData : {
        form : 'login'
      }
    }
  }

  changeAppState(state, data){
    var username = this.state.stateData.username; //To make sure, that username is defined
    if(!data.username)
      data.username = username;
    this.setState({
      appState : state,
      stateData : data
    });
  }

  switchState(state){
    if(state === appStates.LOGIN_REGISTER)
      this.changeAppState(state, {form : 'login'});
    else
      this.changeAppState(state, this.state.stateData);
  }

  render() {
    return (
      <Container fluid>
      <Navbar id = "main-navbar">
        <Navbar.Brand>
          <img className="small-logo" src={ToVoteLogo} alt="ToVote"/>
        </Navbar.Brand>

        {
          (() => {
          if(this.state.appState === appStates.LOGIN_REGISTER)
            return <LoginRegisterNavbar onClick={this.changeAppState.bind(this, appStates.LOGIN_REGISTER)} />
          return <AppNavbar onClick={this.switchState.bind(this)}/>
          })()
        }
        
      </Navbar>
        <Container className="main-container" fluid>
          <Row>
            <Col id="field1">
              {
                (() => {
                  switch(this.state.appState){
                    case appStates.LOGIN_REGISTER:
                      return <Greeting/>;
                    case appStates.USER_DASHBOARD:
                      return <UserInformationView username = {this.state.stateData.username} />
                    case appStates.VOTINGS:
                      return <VotingsView changeState={this.changeAppState.bind(this, appStates.VOTINGS)}/>
                    case appStates.GROUPS:
                      return <GroupsView changeState={this.changeAppState.bind(this, appStates.GROUPS)}/>
                    case appStates.HELP:
                        return null; //TODO
                  }
                })()
              }
            </Col>
            <Col id="field2">
            {
                (() => {
                  switch(this.state.appState){
                    case appStates.LOGIN_REGISTER:
                      if(this.state.stateData.form === "login")
                        return <LoginForm onAuthenticationSuccess = {this.changeAppState.bind(this, appStates.USER_DASHBOARD)}/>;
                      return <RegisterForm />
                    case appStates.USER_DASHBOARD:
                      return <Summary username = {this.state.stateData.username} />
                    case appStates.VOTINGS:
                      return <VotingDetailsView voting = {this.state.stateData} username = {this.state.stateData.username}/>;
                    case appStates.GROUPS:
                      return <GroupDetailsView group = {this.state.stateData} username={this.state.stateData.username}/>
                    case appStates.HELP:
                        return null; //TODO
                  }
                })()
              }
            </Col>
          </Row>
          <Row>
            <Col id="footer">
              <Footer className="footer"/>
            </Col>
          </Row>
        </Container>

      </Container>
    )
  }
}

export default App