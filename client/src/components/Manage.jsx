import React, {Component} from 'react';
import { Message, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'

import axios from 'axios';
import Calendar from './teams/Calendar.jsx';
import NewTeam from './teams/NewTeam.jsx';
import LinkButton from './LinkButton.jsx';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ManageTeam from './ManageTeam.jsx';

class Manage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teams: [],
      edit: null
    }
    this.updateTeam = this.updateTeam.bind(this);
  }



  componentDidMount() {
    let teams;
    var self = this;
    axios.get(`/teams/data`)
    .then(res => {
      console.log('managedata', res.data);
      self.setState({teams: self.state.teams.concat(res.data)})
    })
    // testing for twilio
    // axios.post(`/manage/message`)
    // .then(res => {
    //   self.setState({redirect: true})
    // })
  // console.log('last thing in comp did mount');
  }

  updateTeam() {
    var self = this;
    axios.get(`/teams/data`)
    .then(res => {
      self.setState({teams: res.data})
    })

  }

  render () {

  const styles = {
      div: {
        paddingLeft: 250,
        paddingRight: 250
      }
  }


  let self = this
  let teamCards = this.state.teams;
  let htmlTeams = [];

  if (teamCards.length !=  null) {
    console.log(teamCards,'teamcards');
    for (let i = 0; i < teamCards.length; i++) {
      let teamPath = '/manageteam/' + teamCards[i].uuid;
      htmlTeams.push(
          <Table.Row key={i}>
            <Table.Cell>
            <div key={i}>{teamCards[i].name}</div>
          </Table.Cell>
            <Table.Cell>
              <Router>
                <div>
              <Link to={teamPath}><Button color='blue'>Manage</Button></Link>
              <LinkButton uuid={teamCards[i].uuid}></LinkButton>
              <Route path={teamPath} component={<ManageTeam key={i} user={teamCards[i].name} uuid={teamCards[i].uuid}/>} />
                </div>
              </Router>
            </Table.Cell>
            </Table.Row>
        )
      }
    }

    return (
      <div style={styles.div}>
        <h3> Hello Manager. These are the teams you're managing. </h3>
        <Table celled color='blue' style={{fontSize: '20px'}}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Team Name</Table.HeaderCell>
              <Table.HeaderCell>Options</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {htmlTeams}
          </Table.Body>
        </Table>
        <div>
          <NewTeam className='new-team' updateTeam={this.updateTeam}/>
        </div>
      </div>
    );
  }
}

export default Manage;