import React from 'react'

import Jumbotron from 'react-bootstrap/Jumbotron'

class RegisterConfirmation extends React.Component{

constructor(props){
    super(props);
}

render(){
    return(
    <Jumbotron className="light-jumbotron">
           <h1>Nice to meet You, {this.props.name}</h1>
            <p>Your account has been created. Now You can log in and start using ToVote!</p>
    </Jumbotron>
    )
}

}

export default RegisterConfirmation;