import React, {Component} from 'react';

import { Button, Checkbox, Form, Message } from 'semantic-ui-react'



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
                  password: '',
                  message: 'no message'};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    console.log(e)
    console.log('fetch call')
    e.preventDefault();
    var self = this;
    // let formData = new FormData();
    // formData.append('username', self.state.email)
    // On submit of the form, send a POST request with the data to the server.
    fetch('/test/login', {
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
        console.log('body', body);
        console.log(body.message);
        self.setState({message: body.message});
        console.log('self msg', self.state.message)
      });
  }
  render() {
    return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Email</label>
              <input name="email" placeholder='Email Name' value={this.state.email} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
            <Message content={this.state.message} header='error msg'>
            </Message>
            <a href="/auth/facebook">Login with Facebook</a>
        </div>
    );
  }
}

export default Login;