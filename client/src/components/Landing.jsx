import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Segment, Button, Divider, Image } from 'semantic-ui-react'
import Signup from './Signup.jsx';
import Login from './Login.jsx';
const Landing = () => (
 
  <Router>
    <div>
      <Image src={require('../images/organyzr.png')} size='large' centered/>
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
  </Router>

)


  
export default Landing;