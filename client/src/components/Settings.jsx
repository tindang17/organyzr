import React, {Component} from 'react';

import { Button, Checkbox, Form, Message } from 'semantic-ui-react'

import axios from 'axios';


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {first_name: '',
                  last_name: '',
                  phone: '',
                  text_notification: false,
                  email_notification: false,
                  message: 'no message'};

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
        console.log('self msg', self.state.message)
        window.location.reload()
      });
  }
  render() {
    return (
        <div>
          <h2> Signup for an account with Organyzr!!! </h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field width='5'>
              <label>First Name</label>
              <input name="first_name" placeholder='First Name' value={this.state.first_name} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='5'>
              <label>Last Name</label>
              <input name= "last_name" placeholder='Last Name' value={this.state.last_name} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='5'>
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
            </Form.Field >
                        <Form.Field width='5'>
                    <label>
          Email Notifications:
          <input
            name="email_notification"
            type="checkbox"
            checked={this.state.email_notification}
            onChange={this.handleInputChange} />
        </label>
        </Form.Field>
            <Button type='submit'>Save</Button>
          </Form>
            <Message content={this.state.message} header='error msg'>
            </Message>
        </div>
    );
  }
}

export default Settings;