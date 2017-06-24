import React, {Component} from 'react';
import { Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router';


import axios from 'axios';
import Calendar from './teams/Calendar.jsx';
import NewGame from './NewGame.jsx';
import LinkButton from './LinkButton.jsx';
class ManageTeam extends Component {
  constructor (props) {
    super(props);
    console.log('super props', this.props.location.pathname.split('/')[1])
    this.state = {
      team: this.props.location.pathname.split('/')[2],
      games: []
    }

  }


  componentDidMount() {
    let teams;
    var self = this;
    console.log('before axios request');
    axios.get(`/games/data/`+self.state.team)
    .then(res => {
      self.setState({games: self.state.games.concat(res.data)})
      console.log(self.state.games);
    })
    console.log('props in comp did mout ', self.props)
  }




  render () {


let self = this

    console.log('first in render', this.state.games);
let team = self.state.team
    let gameCards = this.state.games;
  let htmlGames = [];
    if (gameCards.length !=  null) {
      for (let i = 0; i < gameCards.length; i++) {
        htmlGames.push(


            <Table.Row>

              <Table.Cell>

<div >{gameCards[i].description}</div>



</Table.Cell>


              <Table.Cell><Button >Manage</Button><LinkButton uuid={teamCards[i].uuid}></LinkButton></Table.Cell>
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
              <Table.HeaderCell>Options</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

          {htmlGames}

          </Table.Body>
        </Table>
        <div>
          <NewGame className='new-team' uuid={team}/>
        </div>
        <div>
          <Calendar className='team-calendar'/>
        </div>
      </div>
    );
  }

}

export default ManageTeam;