import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Segment, Button, Divider, Image } from 'semantic-ui-react'

import Signup from './Signup.jsx';
import Login from './Login.jsx';
import axios from 'axios';
import { Message, Loader } from 'semantic-ui-react'


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
      console.log(res);
      self.setState({userid: res.data})
    })
  }

  render() {

    const styles = {
      div: {
        paddingLeft: 100, 
        paddingRight: 100
      }, 
      font: {
        fontSize: 20
      }, 
      textfont: {
        fontSize: 16
      }
    }

    let landing = [];
    if (this.state.userid === false) {
      landing.push(<Loader active inline='centered' />) 
    } else if (this.state.userid === 'not logged in') {
      landing.push(<Router>
        <div>
      <Segment padded size='tiny'>
        <Link to='/login'>
          <Button primary fluid>Login</Button>
        </Link>
        
        <Divider horizontal>Or</Divider>
        
        <Link to='/signup'>
          <Button secondary fluid>Sign Up Now</Button>
        </Link>
      </Segment>
    
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
      </div>
       </Router>)
    } else {
      landing.push(<Segment>
        <div style={styles.textfont}> Hello {this.state.userid[0].first_name}</div>
        </Segment>)
    }
    

    return(
    
    <div>
    <Image src={require('../images/organyzr.png')} size='large' centered/>
        <Message>
          <p style={styles.font}>
            Welcome to Organyzr. A manager-based dashboard system to manage sport teams.
          </p>
        </Message>
     {landing}
    </div>

    )}
}


  
export default Landing;