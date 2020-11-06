import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron'

class LoginFailed extends React.Component{

constructor(props){
    super(props);
}

render(){
    return(
    <Jumbotron className="light-jumbotron">
           <h1>Authentication failed!</h1>
            <p>{this.props.message}</p>
    </Jumbotron>
    )
}

}

export default LoginFailed;


