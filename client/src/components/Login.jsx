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
                  erroMessage: '',
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
    fetch('/test/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: this.state.formInputs.email,
          password: this.state.formInputs.password
        })
      })
      .then(function(response) {
        if (response.statusText === 'Unauthorized') {
          console.log('unauth'); 
        } else {
          return response.text();
        }})
      .then(function(body) {
        // console.log("body message", JSON.parse(body));
        if (body) {
          console.log('body');
          self.setState({redirect: true});
        } else {
          self.setState({errorMessage: 'Incorrect Credentials'})
        }
          
        
        // 
      })
  }
  render() {
    const styles = {
      div: {
        paddingLeft: 200, 
        paddingRight: 200
      }
    }
    const {redirect} = this.state;

    if (redirect) {

      window.location.reload()
    }
    return (

        <div style={styles.div}>
          <h2> Login </h2> 
          <Message content="Login to manage your teams and access schedules for team's you're a part of." 
          color='blue'>
          </Message>
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
          <span><font color="red">{this.state.errorMessage}</font></span>
            <br/>
            <Button color='blue'>
            <a style={{fontSize: '20px', color: 'white'}} href="/auth/facebook">Login with Facebook</a>
            </Button>
        </div>
    );
  }
}

export default Login;