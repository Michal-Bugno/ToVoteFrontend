import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

class Greeting extends React.Component{
    render(){
        return(
            <Jumbotron className="light-jumbotron h-100">
                    <h1>Welcome to ToVote!</h1>
                    <p>Please log in or create free account.</p>
            </Jumbotron>
        )
    }
}

export default Greeting