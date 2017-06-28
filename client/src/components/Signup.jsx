import React, {Component} from 'react';
// import Password from './Password.jsx';
import { Image, Button, Checkbox, Form, Message, Grid, Header } from 'semantic-ui-react'
import { Route, Redirect} from 'react-router-dom'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {formInputs: {
                              first_name: '',
                              last_name: '',
                              team_name: '',
                              email: '',
                              password: '',
                              password_confirmation: '',
                              phone: ''
                  },
                  message: 'no message',
                  errorMessages: {email: [],
                                  password: [],
                                  phone: []},
                  isEnabled: false,
                  redirect: false};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormValidation= this.handleFormValidation.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // this will make sure that the each field will be validate individually
    let newFormInputs = this.state.formInputs;
    newFormInputs[name] = value;
    this.setState({
      formInputs: newFormInputs
    });
    let allGood = true;
    // looping through the all the field to check
    // for the form input.
    let {phone} = this.state.formInputs;
    for (let input in this.state.formInputs) {
      var inputValue = this.state.formInputs[input];
      allGood = allGood && (inputValue.length > 0 && phone.length === 10);
    }
    this.setState({isEnabled:allGood});
  }

  handleFormValidation() {
    let {password, password_confirmation, phone} = this.state.formInputs;
    let errorMessages = {password: [], phone: []};
    if(this.state.formInputs.password !== this.state.formInputs.password_confirmation) {
      errorMessages['password'].push('Passwords do not match');
    }
    this.setState({
      errorMessages: errorMessages
    });
  }



  handleSubmit(e) {
    console.log("Submit clicked");
    e.preventDefault();
    this.handleFormValidation();
    let errorMessages = {email: [], phone: []};
    var self = this;
    // On submit of the form, send a POST request with the data to the server.
    fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          first_name: this.state.formInputs.first_name,
          last_name: this.state.formInputs.last_name,
          team_name: this.state.formInputs.team_name,
          email: this.state.formInputs.email,
          password: this.state.formInputs.password,
          confirmation: this.state.formInputs.password_confirmation,
          phone: this.state.formInputs.phone
        })
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(body) {
        console.log('what is in the body', body)
        // self.setState({message: body.message});
        self.setState({message: body.message})
        if(self.state.message === 'Success!') {





    fetch('/test/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: self.state.formInputs.email,
          password: self.state.formInputs.password
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
      })


        } else if(self.state.message === 'users_email_unique') {
          errorMessages['email'].push('Email already exists');
        } else if(self.state.message === 'users_phone_unique') {
          errorMessages['phone'].push('Phone already exists');
        }
        self.setState({errorMessages: errorMessages});
      });
  }
  render() {
    const {redirect} = this.state;

    if (redirect) {
      //return <Redirect to='/'/>;
      window.location.reload()
    }

    const items = [
      'Manage your team',
      'Automate your reminders - choose from text, email, or Facebook messenger',
      'Your players never have to visit our page!'
    ]

    const styles = {
      form: {
        paddingLeft: 100
      },
      message: {
        fontSize: 16,
        color: 'black'
      }
    }
    return (
      <div>
        <Header as='h2' textAlign='centered'> Signup With Us! </Header>
        <Grid divided padded >
          <Grid.Row columns={2}>
            <Grid.Column width={5}>
              <Form onSubmit={this.handleSubmit} style={styles.form}>
                <Form.Field width='12'>
                  <label>First Name</label>
                  <input name="first_name" placeholder='First Name' value={this.state.formInputs.first_name} onChange={this.handleInputChange}/>
                </Form.Field>
                <Form.Field width='12'>
                  <label>Last Name</label>
                  <input name= "last_name" placeholder='Last Name' value={this.state.formInputs.last_name} onChange={this.handleInputChange}/>
                </Form.Field>
                <Form.Field width='12'>
                  <label>Team Name</label>
                  <input name="team_name" placeholder='Team Name' value={this.state.formInputs.team_name} onChange={this.handleInputChange}/>
                </Form.Field>
                <Form.Field width='12'>
                  <label>Email</label>
                  <input name="email" type="email"placeholder='Email Name' value={this.state.formInputs.email} onChange={this.handleInputChange}/>
                  <div className='error'>
                    <font color="red">{this.state.errorMessages.email}</font>
                  </div>
                </Form.Field>
                <Form.Field width='12'>
                  <label>Password</label>
                  <input name="password" type="password" value={this.state.formInputs.password} onChange={this.handleInputChange}/>
                  <div className='error'>
                    <font color="red">{this.state.errorMessages.password}</font>
                  </div>
                </Form.Field>
                <Form.Field width='12'>
                  <label>Password Confirmation</label>
                  <input name="password_confirmation" type="password" value={this.state.formInputs.password_confirmation} onChange={this.handleInputChange}/>
                  <div className='error'>
                    <font color="red">{this.state.errorMessages.password}</font>
                  </div>
                </Form.Field>
                <Form.Field width='12'>
                  <label>Phone Number</label>
                  <input type="number" name="phone" placeholder='10 digits' value={this.state.formInputs.phone} onChange={this.handleInputChange}/>
                  <div className='error'>
                    <font color="red">{this.state.errorMessages.phone}</font>
                  </div>
                </Form.Field >
                <Button type='submit' disabled={!this.state.isEnabled}>Submit</Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={8}>
                <Message color= 'blue' style={styles.message}>
                  <Message.Header style={styles.message}>What can you do with Organyzr?</Message.Header>
                  <Message.List items={items} />
                </Message>
              <Image src={require('../images/vball.jpg')} size='big' centered/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Signup;