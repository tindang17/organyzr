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
    e.preventDefault();
    var self = this;
    // On submit of the form, send a POST request with the data to the server.
    fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .then(function(response) {
        console.log('response', response)
        if (response.status === 200) {
          console.log('success')
          console.log('json', response.json)
          console.log('body', response.body)
        }
        return response.json()
      })
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
        </div>
    );
  }
}

export default Login;