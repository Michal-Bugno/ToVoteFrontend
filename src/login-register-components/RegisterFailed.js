import React from 'react'

import Jumbotron from 'react-bootstrap/Jumbotron'

class RegisterFailed extends React.Component{

constructor(props){
    super(props);
}

render(){
    return(
    <Jumbotron className="light-jumbotron">
           <h1>Account has not been created!</h1>
            <p>{this.props.message}</p>
    </Jumbotron>
    )
}

}

export default RegisterFailed;