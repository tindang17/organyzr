import React, { Component } from 'react'

import { Card, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import axios from 'axios';
import Moment from 'react-moment';
class LinkButton extends Component {

  constructor (props) {
    super(props);
    this.state = {
      game_id: this.props.game.game_id,
      active: this.props.game.going, 
      hover: false
    }
    this.handleClickGoing = this.handleClickGoing.bind(this);
    this.handleClickNotGoing = this.handleClickNotGoing.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
  }
  componentDidMount() {
    let teams;
    let self = this;
    console.log('self.props.', self.props);
    self.setState({location: self.props.game.location,
      description: self.props.game.description})
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

  toggleHover() {
    console.log('here')
    this.setState({hover: !this.state.hover})
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  

  render() {
  let self = this


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
    fontSize: 18
  }
  }

  const flexStyle = {
    display: {display: 'flex'},
    column: {display: 'flex',flexDirection: 'column'}
  }

  const { active } = this.state

  const game =  this.props.game

  let cardStyle;
  if (this.state.hover) {
  console.log('do it')
  cardStyle = {transform: 'scale(1.1)'};
  } else {
  console.log('dont grow')
  cardStyle = {transform: 'scale(1)'}
  }
    
    return (

        <Grid.Column>
              <Card fluid color='green' style={cardStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <Card.Content>
                  <Card.Header style={styles.header}>
                  <Moment format='LL' date={game.date}/>
                  </Card.Header>
                  <Card.Meta style={styles.time}>
                    <span className="time">
                      {game.time} -
                    </span>
                    <span className="rink"> 
                      {game.location}
                    </span>
                  </Card.Meta>
                  <Card.Description style={styles.desc}>
                      {game.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra style={flexStyle.column}>
                  <div className='ui two buttons' style={flexStyle.column}>
                    <span style={{textOverflow: 'ellipsis', display: 'flex', width: '100%'}}>
                    <Button style={{flex: 1, fontSize: '18'}} size='medium' toggle  active={active} onClick={this.handleClickGoing}>Attending!</Button>
                    <Button style={{flex: 1, fontSize: '18'}} size='medium'   active={!active}
                      color={!active ? 'red' : null}onClick={this.handleClickNotGoing}>Absent</Button>
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