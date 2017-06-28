import React, {Component} from 'react';
import { Modal, Message, Dropdown, Card, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router';
import Moment from 'react-moment';

import axios from 'axios';

class ManageGameCard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      viewRoster: [],
      active: false,
      notification: 'Send Reminder to Attending Players',
      delete: 'Delete'
    }
    this.getRoster = this.getRoster.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentDidMount() {
    let teams;
    let self = this;
    console.log('self.props.', self.props);
    self.setState({location: self.props.game.location,
      description: self.props.game.description})
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

    let self = this
    if (this.state.delete === 'Delete') {
      this.setState({delete: 'Are you sure?'})
    } else if (this.state.delete === 'Are you sure?') {

      this.props.delete(gameid)
    }



  }

  handleClick () {

  }
render() {
let self = this
let game = self.props.game
let gameID = self.props.game.id
let active = this.state.active
let editorsave = active ?  'Save' : 'Edit'
let description = function(){if (active) {
  return (<input name="description" type="text"
    value={self.state.description} onChange={self.handleInputChange}/>);
  } else {
    return (
      <span>
        {self.state.description}
      </span>
    )
}}


let location= function(){
  if (active) {
    return (<input name="location" type="text" value={self.state.location} onChange={self.handleInputChange}/>);
  } else {
    return (
      <span>
        {self.state.location}
      </span>
    )
}}

const styles = {
  header: {
    fontSize: 20
  },
  time: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },
  desc: {
    fontSize: 16
  }
}

  return (
      <Grid.Column>
              <Card fluid color='red' >
                <Card.Content>
                  <Card.Header style={styles.header}>
                  <Moment format='LL' date={game.date}/>
                  </Card.Header>
                  <Card.Meta style={styles.time}>
                    <span className="time">
                      {game.time} -
                    </span>
                    <span className="rink">
                      {location()}
                    </span>
                  </Card.Meta>
                  <Card.Description style={styles.desc}>
                  {description()}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui buttons'>
                    <span style={{textOverflow: 'ellipsis'}}>
                    <Button onClick= {() => this.editGame(gameID)} basic floated='right' color='green' fluid active>{editorsave}</Button>
                    <Button onClick= {() => this.sendNotification(gameID)} floated='right' fluid basic color='purple'>{self.state.notification}</Button>
                    <br/>
                    <Button onClick= {() => this.deleteGame(gameID)} floated='right' size='small' fluid basic color='red'>{self.state.delete}</Button>
                    </span>
                    <br/>
                  </div>
                    <Modal trigger={<Button>See Roster</Button>} onOpen= {() => this.getRoster(gameID)}
                    small>
                      <Modal.Header>Player's Attending</Modal.Header>
                      <Modal.Content >
                        <Modal.Description>
                          <p>
                        {this.state.viewRoster.map((item)=> <Dropdown.Item text={item} />)}</p>
                          
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  <Dropdown button basic text='See Roster' onClick= {() => this.getRoster(gameID)}>
                      <Dropdown.Menu>
                         <Dropdown.Header content='Players Attending' />
                        {this.state.viewRoster.map((item)=> <Dropdown.Item text={item} />)}
                      </Dropdown.Menu>
                    </Dropdown>
                    <br/>

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




