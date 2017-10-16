import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Segment, Button, Divider, Image, Advertisement } from 'semantic-ui-react'
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import axios from 'axios';
import { Message, Loader, Grid } from 'semantic-ui-react'


class Landing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userid: false
    }
  }

  componentDidMount() { 
    
  let self = this;
   axios.get(`/landing/check`)
    .then(res => {
      self.setState({userid: res.data})
    })
  }

  render() {
    const styles = {
      div: {
        paddingLeft: 200, 
        paddingRight: 200
      }, 
      font: {
        fontSize: 24,
        color: 'black'
      }, 
      textfont: {
        fontSize: 20,
        color: 'black'
      }
    }

    let landing = [];

    if (this.state.userid === false) {
      landing.push(
      <Loader key='1' active inline='centered' />
      ) 
    } else if (this.state.userid === 'not logged in') {
        landing.push(
          <Router key='2'>
            <div>
              <Segment padded size='tiny'>
                <Link to='/login'>
                  <Button color='blue' fluid>Login</Button>
                </Link>
                <Divider horizontal>Or</Divider>
                <Link to='/signup'>
                  <Button color='green' fluid>Sign Up Now</Button>
                </Link>
              </Segment>
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={Signup}/>
            </div>
          </Router>)
    } else {
        landing.push(
          <Message key='3' color='green'>
            <Message.Header style={styles.font}> Hello {this.state.userid[0].first_name}</Message.Header>
            <Message.List style={styles.textfont}> 
              You can now manage your teams or check-in with teams you play on. 
            </Message.List>
          </Message>)
    } 

    return (
    <div style={styles.div}>
      <Image src={require('../images/banner5.png')}  size='massive' centered/>
      <br/>
      <Grid divided centered style={styles.text}>
        <Grid.Row>
          <Grid.Column width={7}>
            {landing}
          </Grid.Column>
          <Grid.Column width={8}>
            <Message color='green'>
              <Message.Header style={styles.font}>
                Welcome to Organyzr
              </Message.Header>
              <Message.List style={styles.textfont}>
                A manager-based dashboard system to manage sport teams.
              </Message.List>
              <Message.List style={styles.textfont}>
                With Organyzr you can manage your schedule, view attending players, and send email/text notification to your players!
              </Message.List>
              <Message.List style={styles.textfont}>
                Want to try out Organyzr? Login using our trial account!
                <br/>
                <br/>
                Email: organyzr01@gmail.com <br/>
                Password: sports123
              </Message.List>  
                <br/>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    )
  }
}


  
export default Landing;