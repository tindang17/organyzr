import React, {Component} from 'react';
import { Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'

import axios from 'axios';
import Calendar from './teams/Calendar.jsx';
import NewTeam from './teams/NewTeam.jsx';
class Manage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teams: [],
      edit: null
    }
    this.editRow = this.editRow.bind(this);
  }


  componentDidMount() {
    let teams;
    var self = this;
    console.log('before axios request');
    axios.get(`/teams/data`)
    .then(res => {
      self.setState({teams: self.state.teams.concat(res.data)})
      console.log(self.state.teams);
    })

  // console.log('last thing in comp did mount');
  }

  editRow(row) {
  let state = 'edit'+row
  //this.setState({edit: editStyle})
  }


  render () {


let self = this
const editStyle = {
  display: 'none'
}
    console.log('first in render', this.state.teams);
    let teamCards = this.state.teams;
  let htmlTeams = [];
    if (teamCards.length !=  null) {
      for (let i = 0; i < teamCards.length; i++) {
        htmlTeams.push(


            <Table.Row>

              <Table.Cell>

<div className={'formteam' + i} >{teamCards[i].name}</div>
<Form.Input className={'editteam' + i} style={self.state.edit} defaultValue={teamCards[i].name}/>


</Table.Cell>
              <Table.Cell><div className={'formteam' + i} >{teamCards[i].logo}</div>
<Form.Input className={'editteam' + i} style={editStyle} defaultValue={teamCards[i].logo}/></Table.Cell>
              <Table.Cell><Button >Manage</Button><Button onClick={this.editRow(i)}>Edit</Button><Button>Generate Link</Button></Table.Cell>
            </Table.Row>
)
      }
    }




    return (
      <div>
        <h3> Hello Manager </h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Team Name</Table.HeaderCell>
              <Table.HeaderCell>Logo</Table.HeaderCell>
              <Table.HeaderCell>Generate Link</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

          {htmlTeams}

          </Table.Body>
        </Table>
        <div>
          <NewTeam className='new-team'/>
        </div>
        <div>
          <Calendar className='team-calendar'/>
        </div>
      </div>
    );
  }

}

export default Manage;