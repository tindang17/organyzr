import React, {Component} from 'react';
import Password from './Password.jsx';
import { Button, Checkbox, Form, Message, Grid, Header } from 'semantic-ui-react'
import { Route, Redirect} from 'react-router-dom'



class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {first_name: '',
                  last_name: '',
                  team_name: '',
                  email: '',
                  password: '',
                  confirm_password: '',
                  phone: '',
                  message: 'no message', 
                  redirect: false};

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
    fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          team_name: this.state.team_name,
          email: this.state.email,
          password: this.state.password,
          confirmation: this.state.confirm_password,
          phone: this.state.phone
        })
      })
      .then(function(response) {
        if (response.status === 200) {
        }
        return response.json()
      })
      .then(function(body) {
        self.setState({message: body.message, redirect: true});
      });
  }
  render() {

    const {redirect} = this.state;

    if (redirect) {
      return <Redirect to='/'/>;
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
        fontSize: 16
      }
    }
    return (

     <div>
             <Header as='h2' textAlign='center'> Hi Signup With Us!! Hi </Header> 
    <Grid divided padded >
      <Grid.Row columns={2}>
        <Grid.Column width={5}>
          <Form onSubmit={this.handleSubmit} style={styles.form}>
            <Form.Field width='12'>
              <label>First Name</label>
              <input name="first_name" placeholder='First Name' value={this.state.first_name} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='12'>
              <label>Last Name</label>
              <input name= "last_name" placeholder='Last Name' value={this.state.last_name} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='12'>
              <label>Team Name</label>
              <input name="team_name" placeholder='Team Name' value={this.state.team_name} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='12'>
              <label>Email</label>
              <input name="email" placeholder='Email Name' value={this.state.email} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='12'>
              <label>Password</label>
              <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='12'>
              <label>Password Confirmation</label>
              <input name="confirm_password" type="password" value={this.state.confirm_password} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='12'>
              <label>Phone Number</label>
              <input name="phone" placeholder='10 digits' value={this.state.phone} onChange={this.handleInputChange}/>
            </Form.Field >
            <Button type='submit'>Submit</Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={8}>
            <Message style={styles.message}>
              <Message.Header>What can you do with Organyzr?</Message.Header>
              <Message.List items={items} />
            </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Message content={this.state.message} header='error msg'>
            </Message>
    </div>
    )}
}

export default Signup;