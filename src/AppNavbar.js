import React from 'react'
import Nav from 'react-bootstrap/Nav'

import appStates from './AppStateEnum'

class AppNavbar extends React.Component{

    constructor(props){
        super(props);
        

        this.onProfileClick = this.onProfileClick.bind(this);
        this.onVotingsClick = this.onVotingsClick.bind(this);
        this.onGroupsClick = this.onGroupsClick.bind(this);
        this.onHelpClick = this.onHelpClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
      }

      onProfileClick(){
        this.props.onClick(appStates.USER_DASHBOARD);
      }
    
      onVotingsClick(){
        this.props.onClick(appStates.VOTINGS);
      }

      onGroupsClick(){
        this.props.onClick(appStates.GROUPS);
      }

      onHelpClick(){
        this.props.onClick(appStates.HELP);
      }

      onLogoutClick(){
          window.sessionStorage.authToken = null;
          this.props.onClick(appStates.LOGIN_REGISTER);
      }
       
    
        render(){
            return(
                <Nav className="ml-auto">
                    <Nav.Link className="nav-button" onClick={this.onProfileClick}>Profile</Nav.Link>
                    <Nav.Link onClick={this.onVotingsClick} className="nav-button">Votings</Nav.Link>
                    <Nav.Link onClick={this.onGroupsClick} className="nav-button">Groups</Nav.Link>
                    <Nav.Link onClick={this.onHelpClick} className="nav-button">Help</Nav.Link>
                    <Nav.Link onClick={this.onLogoutClick} className="nav-button"><strong>Log out</strong></Nav.Link>
                </Nav>
            )
        }

}

export default AppNavbar