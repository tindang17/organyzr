import React, {Component} from 'react';
import { Icon, Form, Accordion, Segment, Button, Checkbox, Message, Grid, Header } from 'semantic-ui-react';

import { Route, Redirect} from 'react-router-dom'

class NewTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  logo: '',
                  message: 'no message',
                  redirect: false,
                  clearFOrm: false};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetField = this.resetField.bind(this);
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
    fetch('/new_team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: this.state.name,
          logo: this.state.logo
        })
      })
      .then(function(response) {
        if (response.status === 200) {
          self.props.updateTeam();
          self.state.name = '';
          self.state.logo = '';
        }
        return response.json()
      })
      .then(function(body) {
        self.setState({message: body.message, redirect: true});
      });
  }

  resetField () {
    // window.location.reload()
    this.refs.input.value = '';
  }

  render () {

      const styles = {
      form: {
        paddingLeft: 100
      },
      message: {
        fontSize: 16
      }
    }

    return (
      // React Components in JSX look like HTML tags
      <Accordion name="ui accordion">
        <Accordion.Title>
          <Icon name='dropdown' />
          <span style={{fontSize: '18px'}}>New Team</span>
        </Accordion.Title>
        <Accordion.Content>
          <Segment padded size='tiny'>




          <Form onSubmit={this.handleSubmit} style={styles.form}>
            <Form.Field width='12'>
              <label>Name</label>
              <input ref='input' name="name" placeholder='Name' value={this.state.name} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='12'>
              <label>Logo</label>
              <input ref='input' name= "logo" placeholder='URL to desired Image' value={this.state.logo} onChange={this.handleInputChange}/>
            </Form.Field>
            <Button onClick={this.resetField} type='submit'>Submit</Button>
          </Form>





          </Segment>
        </Accordion.Content>
      </Accordion>
    )
  }
  // TODO

}

export default NewTeam;