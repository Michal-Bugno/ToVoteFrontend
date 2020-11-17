import React from 'react'
import Container from 'react-bootstrap/esm/Container';
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'

import API_ADDRESS from '../constants';

class Summary extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            votings : [],
            groups : []
        }
    }

    componentDidMount(){
        try{
        const votings = axios.get(API_ADDRESS+"/votings", {headers: { Authorization : window.sessionStorage.authToken}});
        }
        catch{

        }
    }

    render(){
        return(
            <div>
                <Jumbotron className="dark-jumbotron  small-field-div light-scrollbar">
                    <h1>This is your profile</h1>
                    You can edit it using <em>Edit</em> buttons
                </Jumbotron>
            </div>
        )
    }
} 

export default Summary;