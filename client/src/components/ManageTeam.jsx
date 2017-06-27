import React, {Component} from 'react';
import { Message, Dropdown, Card, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router';
import Moment from 'react-moment';

import axios from 'axios';
import Calendar from './teams/Calendar.jsx';
import NewGame from './NewGame.jsx';
import ManageGameCard from './ManageGameCard.jsx';

class ManageTeam extends Component {
  constructor (props) {
    super(props);
    console.log('super props', this.props.location.pathname.split('/')[1])
    this.state = {
      team: this.props.location.pathname.split('/')[2],
      games: [],
    }
this.deleteGame = this.deleteGame.bind(this);

  }

  componentDidMount() {
    let teams;
    let self = this;
    axios.get(`/games/data/`+self.state.team)
    .then(res => {
      self.setState({games: self.state.games.concat(res.data)})
      console.log('self.state.games', self.state.games);
    })
  }

  editGame(game_id, location, description) {
    let self = this
    axios.post('/updategame/' + game_id.toString(), {
    location: location,
    description: description
    })
    .then(res => {
    console.log('updated game!')
    console.log(res.body)
    self.setState({notification: res.body})
    })

  }
  deleteGame (gameid) {
    let self = this
    axios.post('/deletegame/' + gameid.toString())
    .then(res => {
    console.log('res.body', res.body)
    self.setState({games: self.state.games.filter(function(game){

    return !(game.id === gameid)})})
    })
  }

  render () {
  let self = this

  console.log('first in render', this.state.games);
  let team = self.state.team
  let gameCards = this.state.games;
  let htmlGames = [];
  console.log('games', gameCards)
    if (gameCards.length !=  null) {
      for (let i = 0; i < gameCards.length; i++) {

        htmlGames.push(

        <ManageGameCard game={gameCards[i]} edit={self.editGame} delete={self.deleteGame}/>


        )
      }
    }

    const styles = {
      grid: {
        paddingLeft: 50,
        paddingRight: 50
      },
      div: {
        paddingLeft: 200,
        paddingRight: 200
      }
    }

    return (
      <div style={styles.div}>
        <h3> Hello Manager </h3>
        <Message content="Current Schedule for players on "
          color='blue'>
          </Message>
        <Grid columns={3} style={styles.grid}>
          <Grid.Row>
          {htmlGames}
          </Grid.Row>
        </Grid>

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