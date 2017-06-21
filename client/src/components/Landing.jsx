import React, {Component} from 'react';
import { Segment, Button, Divider, Image } from 'semantic-ui-react'
import axios from 'axios';
import { Message } from 'semantic-ui-react'


class Landing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      login: false
    }
  }



  componentDidMount() {
    
  }

  render() {
    let landing = []; 
    if (!this.state.login) {
      landing.push(<Segment padded size='tiny'> 
          <Button primary fluid>Login</Button> 
          <Divider horizontal>Or</Divider> 
          <Button secondary fluid>Sign Up Now</Button> 
        </Segment>)
    } 

    const styles = {
      div: {
        paddingLeft: 100, 
        paddingRight: 100
      }
    }

    return(
      <div style={styles.div}>
        <Image src={require('../images/organyzr.png')} size='large' centered/>
        <Message>
          <p>
            Welcome to Organyzr. A manager-based dashboard system to manage sport teams.
          </p>
        </Message>
        {landing}
      </div>
    )}
}

export default Landing;