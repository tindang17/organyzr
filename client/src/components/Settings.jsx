import React, {Component} from 'react';

import { Button, Checkbox, Form, Message, Grid, Header } from 'semantic-ui-react'

import axios from 'axios';


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  first_name: '',
                  last_name: '',
                  phone: '',
                  text_notification: false,
                  email_notification: false,

                  message: 'no message',
                  errorMessage: ''};
                  

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var self = this;
    console.log('before axios request');
    axios.get(`/settings/data`)
    .then(res => {
      self.setState(res.data[0])
      console.log(res.data[0]);
    })
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let {errorMessage} = this.state;
    var self = this;
    // On submit of the form, send a POST request with the data to the server.
    fetch('/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone: this.state.phone,
          text_notification: this.state.text_notification,
          email_notification: this.state.email_notification
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
        if(self.state.message === 'users_phone_unique') {
          self.setState({errorMessage: 'Phone already exists'})
        }
        console.log('self msg', self.state.message)
      });
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

    return (
        <div style={styles.div}>
          <h2> Settings </h2>
          <h4> Change your contact information here </h4>
          <Grid>
            <Grid.Row>
              <Grid.Column width={7}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field >
              <label>First Name</label>
              <input name="first_name" placeholder='First Name' value={this.state.first_name} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field >
              <label>Last Name</label>
              <input name= "last_name" placeholder='Last Name' value={this.state.last_name} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field >
                    <label>
          Text Notifications:
          <input
            name="text_notification"
            type="checkbox"
            checked={this.state.text_notification}
            onChange={this.handleInputChange} />
        </label>
        </Form.Field>
        <Form.Field width='5'>
          <label>Phone Number</label>
          <input name="phone" placeholder='10 digits' value={this.state.phone} onChange={this.handleInputChange}/>
            <div className='error'>
              <font color="red">{this.state.errorMessage}</font>
            </div>
        </Form.Field >
        
            <Button type='submit'>Save</Button>
          </Form>
            <Message content={this.state.message} header='Change Something!'>
            </Message>
          </Grid.Column>
          <Grid.Column width={8}>
            <Message color='blue'>
                  <Message.Header style={styles.font}>
                    Change your information and contact information here. 
                  </Message.Header>
                  <Message.List style={styles.textfont}>
                    Please make sure your phone number and email are correct!
            </Message.List>
            </Message>
          </Grid.Column>
         </Grid.Row>
        </Grid>  
        </div>
    );
  }
}

export default Settings;