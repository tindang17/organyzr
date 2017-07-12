import React, {Component} from 'react';
import { Message, Dropdown, Card, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router';
import Moment from 'react-moment';
const uuidv4 = require('uuid/v4');

import axios from 'axios';
import Calendar from './teams/Calendar.jsx';
import NewGame from './NewGame.jsx';
import ManageGameCard from './ManageGameCard.jsx';

class ManageTeam extends Component {
  constructor (props) {
    super(props);
    this.state = {
      team: this.props.location.pathname.split('/')[2],
      games: [],
    }
    this.deleteGame = this.deleteGame.bind(this);
    this.updateGame = this.updateGame.bind(this);

  }

  componentDidMount() {
    let teams;
    let self = this;
    axios.get(`/games/data/`+self.state.team)
    .then(res => {
      self.setState({games: self.state.games.concat(res.data)})

    })
  }

  editGame(game_id, location, description) {
    let self = this
    axios.post('/updategame/' + game_id.toString(), {
    location: location,
    description: description
    })
    .then(res => {
    self.setState({notification: res.body})
    })
  }
  deleteGame (gameid) {
    let self = this
    axios.post('/deletegame/' + gameid.toString())
    .then(res => {
    self.setState({games: self.state.games.filter(function(game){
    return !(game.id === gameid)})})
    })
  }
  updateGame() {
    var self = this;
    axios.get(`/games/data/` + self.state.team)
    .then(res => {
      self.setState({games: res.data})
    })
  }

  render () {
    let self = this
    let team = self.state.team
    let gameCards = this.state.games;
    let htmlGames = [];
    if (gameCards.length !=  null) {
      for (let i = 0; i < gameCards.length; i++) {
        htmlGames.push(
        <ManageGameCard key={uuidv4()} game={gameCards[i]}
          edit={self.editGame}
          delete={self.deleteGame}/>
        )
      }
    }

    const styles = {
      grid: {
        
      },
      div: {
        paddingLeft: 200,
        paddingRight: 200
      }
    }

    return (
      <div style={styles.div}>
        <h3> Hello Manager </h3>
        <Message color='blue'>
          <Message.List color='black' style={{fontSize: 18}}>
            These are games currently scheduled for your players. </Message.List>
          </Message>
        <Grid columns={3} style={styles.grid}>
          <Grid.Row>
          {htmlGames}
          </Grid.Row>
        </Grid>
        <div>
          <NewGame className='new-team' updateGame={this.updateGame} uuid={team}/>
        </div>
        <div>
          <Calendar games={gameCards} className='team-calendar'/>
        </div>
      </div>
    );
  }
}

export default ManageTeam;