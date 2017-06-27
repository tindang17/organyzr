import React, {Component} from 'react';
import { Message, Card, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router';
import Moment from 'react-moment';

import axios from 'axios';
import Calendar from './teams/Calendar.jsx';
import ScheduleGameCard from './ScheduleGameCard.jsx';
class Schedule extends Component {
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
    axios.get(`/mygames/data/`+self.state.team)
    .then(res => {
      self.setState({games: self.state.games.concat(res.data)})
      console.log(self.state.games);
    })
    console.log('props in comp did mout ', self.props)
  }




  render () {


let self = this
let noGamesMessage;
    console.log('first in render', this.state.games);
let team = self.state.team
    let gameCards = this.state.games;
  let htmlGames = [];
  console.log('games', gameCards)
if (gameCards.length !=  null) {
  for (let i = 0; i < gameCards.length; i++) {
    htmlGames.push(
    <ScheduleGameCard game={gameCards[i]} />)
  }
} 

if (gameCards.length === 0) {
  noGamesMessage = <Message color='blue'>No games are currently scheduled. Please contact your manager.</Message>
}
  console.log('no games', noGamesMessage);
    const styles = {
      div: {
        paddingLeft: 250,
        paddingRight: 250
      }
    }

    return (
      <div style={styles.div}>
        <h3> Hello Player </h3>
        <div>
        
        {noGamesMessage}
        
        </div>


      <Grid columns={3} style={styles.grid}>
      <Grid.Row>
      {htmlGames}
      </Grid.Row>
      </Grid>


        <div>
          <Calendar games={gameCards}className='team-calendar'/>
        </div>
      </div>
    );
  }

}

export default Schedule;