import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class EditableField extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            disabled : true
        }

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick(event){
        this.setState({
            disabled : !this.state.disabled
        });

        if(!this.state.disabled)
            this.props.onSubmit();
    }

    render(){
        return(
            <InputGroup className="input-group">
                <InputGroup.Prepend>
                    <InputGroup.Text className="editable-field-text">{this.props.propertyName}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl className="editable-field" type={this.props.type} onChange={this.props.onChange} defaultValue={this.props.value} disabled={this.state.disabled}/>
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={this.onButtonClick} className="edit-button">{this.state.disabled ? "Edit" : "Save"}</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

}

export default EditableField;