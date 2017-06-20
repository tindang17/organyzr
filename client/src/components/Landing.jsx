import React, {Component} from 'react';
import { Segment, Button, Divider, Image } from 'semantic-ui-react'


const Landing = () => (

  <div>
    <Image src={require('../images/organyzr.png')} size='large' centered/>
    <Segment padded>
      <Button primary fluid>Login</Button>
      <Divider horizontal>Or</Divider>
      <Button secondary fluid>Sign Up Now</Button>
    </Segment>
  </div>

)

export default Landing;