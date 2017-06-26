import React, {Component} from 'react';
import { Message, Dropdown, Card, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router';
import Moment from 'react-moment';

import axios from 'axios';

class ManageGameCard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      viewRoster: [],
      active: false,
      location: this.props.game.location,
      description: this.props.game.description,
      notification: 'Send Reminder to Attending Players'
    }
    this.getRoster = this.getRoster.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

  editGame (gameid) {
    this.setState({active: !this.state.active})
    if (this.state.active) {this.props.edit(gameid, this.state.location, this.state.description)}
  }

  sendNotification (gameid) {
  let self = this
    if (this.state.notification === 'Send Reminder to Attending Players') {
      this.setState({notification: 'Are you sure?'})
    } else if (this.state.notification === 'Are you sure?') {
    self.setState({notification: 'Sending...'})
      axios.post('/notification/' + gameid.toString())
      .then(res => {
      console.log(res)
      self.setState({notification: 'Sent to ' + res.data + ' players!'})
    })
    }
  }

  deleteGame (gameid) {
    this.props.delete(gameid)
  }

  handleClick () {

  }
  render() {
let self = this
let game = self.props.game
let gameID = self.props.game.id
let active = this.state.active
let editorsave = active ?  'Save' : 'Edit'

    let description               = function(){      if (active) {
            return (<input name="description" type="text" value={self.state.description} onChange={self.handleInputChange}/>);
  } else {
    return (
<span>
        {self.state.description}
</span>
        )
}}


    let location               = function(){      if (active) {
            return (<input name="location" type="text" value={self.state.location} onChange={self.handleInputChange}/>);
  } else {
    return (
<span>
        {self.state.location}
</span>
        )
}}




    return (


<Grid.Column>
              <Card fluid color='violet' >
                <Card.Content>
                  <Card.Header>
                  <Moment date={game.date}/>
                  </Card.Header>
                  <Card.Meta>
                    <span className="time">
                      {game.time}
                    </span>
                    <span className="rink">
                      {location()}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                  {description()}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui buttons'>
                    <span style={{textOverflow: 'ellipsis'}}>
                    <Button onClick= {() => this.editGame(gameID)} basic color='green' active>{editorsave}</Button>
                    <Button onClick= {() => this.deleteGame(gameID)} basic color='red'>Delete</Button>
                    <Button onClick= {() => this.sendNotification(gameID)} basic color='red'>{self.state.notification}</Button>
                    </span>
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




