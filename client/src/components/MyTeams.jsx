import React, {Component} from 'react';
import { Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'

import axios from 'axios';
import Calendar from './teams/Calendar.jsx';
import AddTeam from './AddTeam.jsx';
import LinkButton from './LinkButton.jsx';
import Games from './Games.jsx';
import Schedule from './Schedule.jsx';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Manage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teams: [],
      edit: null,
      user: ''
    }
    this.updateTeam = this.updateTeam.bind(this);

      }


  componentDidMount() {
    let teams;
    var self = this;
    axios.get(`/myteams/data`)
    .then(res => {
      console.log('this is thor', res.data);
      self.setState({teams: self.state.teams.concat(res.data)})
    })
  }

  updateTeam() {
    var self = this;
    axios.get(`/myteams/data`)
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
  // console.log(self.state.user === '', 'test');
  // if (self.state.user === '') {
  //   axios.get(`/landing/check`)
  //   .then(res => {
  //     console.log('in render of myteams', res);
  //     self.setState({userid: res})
  //   })
  // }

  let htmlTeams = [];
  let defaultImage = <Image src={require('../images/default_image.png')}  size='tiny' centered/> 
  let teamLogo = '';
  let logoURL = '';
    if (teamCards.length !=  null) {
      for (let i = 0; i < teamCards.length; i++) {
        let teamPath = '/schedule/' + teamCards[i].uuid;

        if (teamCards[i].logo === null || teamCards[i].logo === '') {
          teamLogo = defaultImage;
        } else {
          logoURL = teamCards[i].logo
          teamLogo = <Image src={logoURL} size='small' centered/>
        }
        
        htmlTeams.push(
            <Table.Row key={i}>
              <Table.Cell positive>
                <div >{teamCards[i].name}</div>
              </Table.Cell>
              <Table.Cell positive>
                <Router>
                <div>
                  <Link to={teamPath}><Button >View Schedule</Button></Link>
                  <Route path={teamPath}/>
                </div>
                </Router>
              </Table.Cell>
              <Table.Cell>
                {teamLogo}
              </Table.Cell>
            </Table.Row>
        )
      }
    }

    return (
      <div style={styles.div}>
        <h2> Hello </h2>
        <h3> These are the teams you are playing for. </h3>

        <Table celled color='green' style={{fontSize: '20px'}}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Team Name</Table.HeaderCell>
              <Table.HeaderCell>Options</Table.HeaderCell>
              <Table.HeaderCell>Logo</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {htmlTeams}
          </Table.Body>
        </Table>
        <div>
          <AddTeam className='add-team' updateTeam={this.updateTeam}/>
        </div>
      </div>
    );
  }

}

export default Manage;