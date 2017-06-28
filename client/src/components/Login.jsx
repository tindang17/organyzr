import React, {Component} from 'react';
import { Route, Redirect} from 'react-router-dom'

import { Button, Checkbox, Form, Message, Header, Grid, Image } from 'semantic-ui-react'



class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {formInputs: {
                    email: '',
                    password: ''
                  },
                  message: 'no message',
                  errorMessage: '',
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
      allGood = allGood && (inputValue.length > 0);
    }
    this.setState({isEnabled:allGood});

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
        if (body && !(body==='unauth')) {
          self.setState({redirect: true})
        } else {
          self.setState({errorMessage: 'Incorrect Credentials'})
        }
      })
  }
  render() {
    const styles = {
      div: {
        paddingLeft: 200,
        paddingRight: 200
      },
      font: {
        fontSize: 22,
        color: 'black'
      },
      textfont: {
        fontSize: 18,
        color: 'black'
      }
    }
    const {redirect} = this.state;

    const items = [
      'Manage multiple team',
      'Automate your reminders - choose from text or email',
      'Participate in other teams you play for',
      'Edit your contact information'
    ]


    if (redirect) {

      window.location.reload()
    }
    return (

      <div style={styles.div}>
        <Header as='h2' textAlign='center' style={styles.font}> Login! </Header>
        <Grid divided padded >
          <Grid.Row columns={2}>
            <Grid.Column width={5}>
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
                <a style={{fontSize: '20px', color: 'white'}} href="/auth/facebook"><Button color='blue'>Login with Facebook</Button></a>
            </Grid.Column>
            <Grid.Column width={10}>
                <Message color= 'blue' >
                  <Message.Header style={styles.font}>Once you login, you can... </Message.Header>
                  <Message.List items={items} style={styles.textfont}/>
                </Message>
              <Image src={require('../images/vball.jpg')} size='big' centered/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Login;