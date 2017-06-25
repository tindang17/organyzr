import React, {Component} from 'react';
import { Grid, Image, Message, Header } from 'semantic-ui-react'
  
  class About extends Component {
    constructor(props){
      super(props);
    }
    // sending request to the server
    
    componentDidMount() {
    }

    render () {

      const styles = {
        text: {
          fontSize: 16
        }
      }
      return (
        <div>
        <Header as='h2' textAlign='center'> About Us! HELLO </Header>
        <br/>
          <Grid divided centered style={styles.text}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Image src={require('../images/gtran.jpg')}/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Message>
                  <Message.Header>
                    Grant Tran
                  </Message.Header>
                  <p>
                    This is a bio about myself. 
                  </p>  
                </Message>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={10}>
                <Message>
                  <Message.Header>
                    Tin Dang
                  </Message.Header>
                  <p>
                    Fucken G 
                  </p>  
                </Message>
              </Grid.Column>
              <Grid.Column width={3}>
                <Image src={require('../images/tdang.jpg')}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={3}>
                <Image src={require('../images/sang.png')}/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Message>
                  <Message.Header>
                    Spencer Ang
                  </Message.Header>
                  <p>
                    Upload a picture you fucken feeder  
                  </p>  
                </Message>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    }
  } 


export default About;