import React, {Component} from 'react';
import { Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'

import axios from 'axios';
import Calendar from './teams/Calendar.jsx';
import AddTeam from './AddTeam.jsx';
import LinkButton from './LinkButton.jsx';
class Manage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teams: [],
      edit: null
    }
      }


  componentDidMount() {
    let teams;
    var self = this;
    console.log('before axios request');
    axios.get(`/myteams/data`)
    .then(res => {
      self.setState({teams: self.state.teams.concat(res.data)})
      console.log(self.state.teams);
    })

  // console.log('last thing in comp did mount');
  }


  render () {


let self = this

    console.log('first in render', this.state.teams);
    let teamCards = this.state.teams;

  let htmlTeams = [];
    if (teamCards.length !=  null) {
      for (let i = 0; i < teamCards.length; i++) {
        htmlTeams.push(


            <Table.Row>

              <Table.Cell>

<div >{teamCards[i].name}</div>



</Table.Cell>


              <Table.Cell><Button>View Schedule</Button><Button>Leave Team</Button></Table.Cell>
            </Table.Row>
)
      }
    }




    return (
      <div>
        <h3> Hello Player </h3>

        <Table celled>
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
          <AddTeam className='add-team'/>
        </div>
        <div>
          <Calendar className='team-calendar'/>
        </div>
      </div>
    );
  }

}

export default Manage;