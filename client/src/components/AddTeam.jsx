import React, {Component} from 'react';
import { Icon, Form, Accordion, Segment, Button, Checkbox, Message, Grid, Header } from 'semantic-ui-react';

import { Route, Redirect} from 'react-router-dom'

class NewTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {uuid: '',
                  message: 'no message',
                  redirect: false,
                  clearForm: false};

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
    fetch('/add_team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          uuid: this.state.uuid
        })
      })
      .then(function(response) {
        if (response.status === 200) {
          console.log();
          self.props.updateTeam();
          self.state.uuid = '';
          // self.setState({clearForm: true});
        }
        
      })
  }

  resetField () {
    // window.location.reload()
    this.refs.input.value = '';
  }


  render () {
    if (this.state.clearForm) {
      this.refs.input.value = '';
    }

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
          <span style={{fontSize: '18px'}}>Add Team</span>
        </Accordion.Title>
        <Accordion.Content>
          <Segment padded size='tiny'>




          <Form onSubmit={this.handleSubmit} style={styles.form}>
            <Form.Field width='12'>
              <label>Team Code</label>
              <input ref='input' name="uuid" placeholder='Unique Code' value={this.state.uuid} onChange={this.handleInputChange}/>
            </Form.Field>
            <Button onClick={this.resetField} type='submit'>Add</Button>
          </Form>





          </Segment>
        </Accordion.Content>
      </Accordion>
    )
  }
  // TODO

}

export default NewTeam;