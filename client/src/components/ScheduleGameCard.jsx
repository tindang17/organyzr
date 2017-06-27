import React, { Component } from 'react'

import { Card, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import axios from 'axios';
import Moment from 'react-moment';
class LinkButton extends Component {

  constructor (props) {
    super(props);
    this.state = {
      game_id: this.props.game.game_id,
      active: this.props.game.going
    }
    this.handleClickGoing = this.handleClickGoing.bind(this);
    this.handleClickNotGoing = this.handleClickNotGoing.bind(this);
  }

  handleClickGoing() {

  axios.post(`/schedule/`+this.state.game_id.toString())
    .then(res => {
    console.log('update avail')
    })
  this.setState({ active: !this.state.active })}
  handleClickNotGoing() {  axios.post(`/schedule/`+this.state.game_id.toString())
    .then(res => {
    console.log('update avail')
    })
  this.setState({ active: !this.state.active })}


  render() {

  const { active } = this.state

  const game =  this.props.game
            return (

        <Grid.Column>
              <Card fluid color='violet'>
                <Card.Content>
                  <Card.Header>
                  <Moment format='LL' date={game.date}/>
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
                  <div className='ui two buttons'>
                    <span style={{textOverflow: 'ellipsis'}}>
                    <Button size='medium' toggle  active={active} onClick={this.handleClickGoing}>Going</Button>
                    <Button size='medium'   active={!active}
                      color={!active ? 'red' : null}onClick={this.handleClickNotGoing}>Fuck This</Button>
                    </span>
                  </div>
                </Card.Content>
              </Card>
              <br/>
        </Grid.Column>

        )
}


}

export default LinkButton