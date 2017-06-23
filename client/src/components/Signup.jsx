import React, {Component} from 'react';
// import Password from './Password.jsx';
import { Button, Checkbox, Form, Message, Grid, Header } from 'semantic-ui-react'


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
                errorMessages: {password: []},
                isEnabled: false};

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
    console.log('give me your valueeeee', this.state);
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

  handleFormValidation(event) {
    let valid = true;
    let {password, password_confirmation} = this.state;
    let errorMessages = {password: []};
    if(this.state.formInputs.password !== this.state.formInputs.password_confirmation) {
      errorMessages['password'].push('Passwords do not match');
    }
    console.log(this.state);
    console.log(errorMessages);
  
    this.setState({
      errorMessages: errorMessages
    })
  }



  handleSubmit(e) {
    console.log("Submit clicked");
    e.preventDefault();
    this.handleFormValidation()
    
    var self = this;
    // On submit of the form, send a POST request with the data to the server.
    fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
      <Header as='h2' textAlign='centered'> Hi Signup With Us!! Hi </Header> 
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
                <input name="phone" placeholder='10 digits' value={this.state.formInputs.phone} onChange={this.handleInputChange}/>
              </Form.Field >
              <Button type='submit' disabled={!this.state.isEnabled}>Submit</Button>
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