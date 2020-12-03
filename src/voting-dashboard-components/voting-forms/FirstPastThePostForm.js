import React from 'react'
import Form from 'react-bootstrap/Form'

class FirstPastThePostForm extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        var formElements = [];
        for(let i = 0; i<this.props.options.length; i++)
            formElements.push(
                <Form.Check
                            type="radio"
                            label={this.props.options[i].name}
                            value={this.props.options[i].optionNumber}
                            name="votingOptions"
                            id={`votingOption${this.props.options[i]}`}
                            onChange={this.props.onChange}
                            />
            );
        return(
            <Form>
                        <Form.Group>
                        <Form.Label>
                            Select one option:
                        </Form.Label>
                        {formElements}
                </Form.Group>
            </Form>
        )
    }
}

export default FirstPastThePostForm;