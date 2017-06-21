import React, {Component} from 'react';
import { Segment, Button, Divider, Image } from 'semantic-ui-react'
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

    let landing = [];
    if (this.state.userid === false) {
      landing.push(<Loader active inline='centered' />) 
    } else if (this.state.userid === 'not logged in') {
      landing.push(<Segment padded size='tiny'> 
          <Button primary fluid>Login</Button> 
          <Divider horizontal>Or</Divider> 
          <Button secondary fluid>Sign Up Now</Button> 
        </Segment>)
    } else {
      landing.push(<Segment>
        <div> Hello </div>
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