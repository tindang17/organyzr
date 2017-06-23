import React, {Component} from 'react';
import { Route, Redirect} from 'react-router-dom'

import { Button, Checkbox, Form, Message } from 'semantic-ui-react'



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {formInputs: {
                    email: '',
                    password: ''
                  },
                  message: 'no message',
                  isEnabled: false,
                  redirect: false};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newFormInputs = this.state.formInputs;
    newFormInputs[name]= value;
    this.setState({
      formInputs: newFormInputs
    });
    let allGood = true;
    // looping through the all the field to check 
    // for the form input.
    for (let input in this.state.formInputs) {
      var inputValue = this.state.formInputs[input];
      console.log('where is the input',inputValue);
      allGood = allGood && (inputValue.length > 0);
    }
    this.setState({isEnabled:allGood});
   
    console.log('true or false', this.state.isEnabled)
  }

  handleSubmit(e) {
    console.log(e)
    console.log('fetch call')
    e.preventDefault();
    var self = this;
    // let formData = new FormData();
    // formData.append('username', self.state.email)
    // On submit of the form, send a POST request with the data to the server.
    fetch('/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password
        })
      })
      .then(response => response.text())
      .then(function(body) {
        
        self.setState({message: body.message, redirect: true});
        
      });
  }
  render() {
    const {redirect} = this.state;

    if (redirect) {
      return <Redirect to='/'/>;
    }
    return (

        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Email</label>
              <input name="email"  type="email" placeholder='Email Name' value={this.state.formInputs.email} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name="password" type="password" value={this.state.formInputs.password} onChange={this.handleInputChange}/>
            </Form.Field>
            <Button type='submit' disabled={!this.state.isEnabled}>Submit</Button>
          </Form>
            <Message content={this.state.message} header='error msg'>
            </Message>
            <a href="/auth/facebook">Login with Facebook</a>
        </div>
    );
  }
}

export default Login;