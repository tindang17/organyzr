import React, {Component} from 'react';

import { Button, Checkbox, Form } from 'semantic-ui-react'

class PlayerSignup extends React.Component {
  constructor (props) {
    super (props);
      this.state = {first_name: '',
                    last_name:'',
                    email:'',
                    password:'',
                    password_confirmation:'',
                    phone:''};
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    // triggered when users input their info
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    self = this;
    // sending POST request to the server
    fetch('/uuid/player', { 
      method : 'POST',
      headers : {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        confirmation: this.state.confirm_password,
        phone: this.state.phone
      })
    }).then(response => {
      console.log('sending', response);
      if(response.status === 200) {
        console.log('data sent');
        console.log(response.json);
        console.log(response.body);
      }
    }).then(body => {
        console.log('body', body);
    })
  }


  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>First Name</label>
            <input name="first_name" placeholder='First Name' value={this.state.first_name} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input name= "last_name" placeholder='Last Name' value={this.state.last_name} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Team Name</label>
            <input name="team_name" placeholder='Team Name' value={this.state.team_name} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input name="email" placeholder='Email Name' value={this.state.email} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Password Confirmation</label>
            <input name="confirm_password" type="password" value={this.state.confirm_password} onChange={this.handleInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Phone Number</label>
            <input name="phone" placeholder='10 digits' value={this.state.phone} onChange={this.handleInputChange}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  };
}

export default PlayerSignup;