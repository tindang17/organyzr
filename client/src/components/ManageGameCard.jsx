import React, {Component} from 'react';
import { Message, Dropdown, Card, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router';
import Moment from 'react-moment';

import axios from 'axios';

class ManageGameCard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      viewRoster: []
    }
    this.getRoster = this.getRoster.bind(this);
  }


    getRoster (gameid) {
    let self = this;
    console.log('getroster');
    axios.get(`/player/data/` + self.state.team + '/' + gameid.toString())
    .then(res => {
      let gameRoster = []
      console.log('resssss',res);
      res.data.forEach((item) => {
        gameRoster.push(item.first_name);
      })
      self.setState({viewRoster: gameRoster})

    })
  }


  deleteGame (gameid) {
  this.props.delete(gameid)
  }

  render() {
let self = this
let game = self.props.game
let gameID = self.props.game.id
    return (


<Grid.Column>
              <Card fluid color='violet'>
                <Card.Content>
                  <Card.Header>
                  <Moment date={game.date}/>
                  </Card.Header>
                  <Card.Meta>
                    <span className="time">
                      {game.time}
                    </span>
                    <span className="rink">
                      {game.location}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                      {game.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui buttons'>
                    <Button basic color='green' active>Edit</Button>
                    <Button onClick= {() => this.deleteGame(gameID)} basic color='red'>Delete</Button>
                    <Button basic color='red'>Send Notification</Button>
                  </div>
                  <Dropdown text='See Roster' onClick= {() => this.getRoster(gameID)}>
                      <Dropdown.Menu>
                         <Dropdown.Header content='Players Attending' />
                        {this.state.viewRoster.map((item)=> <Dropdown.Item text={item} />)}
                      </Dropdown.Menu>
                    </Dropdown>
                  <div>
                   </div>
                </Card.Content>
              </Card>
              <br/>
        </Grid.Column>

        )
}

  }


export default ManageGameCard




