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
        },
        messagesColor: {
          color: 'black'
        },
        div: {
        paddingLeft: 200,
        paddingRight: 200
      }
      }
      return (
        <div style={styles.div}>
        <Image src={require('../images/organyzr_aboutus_banner_resized.jpg')}  fluid centered/>
        <Header as='h1' textAlign='center'> About Us! </Header>
        <br/>
          <Grid divided centered style={styles.text}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Image src={require('../images/gtran.jpg')}/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Message color='blue'>
                  <Message.Header style={styles.messagesColor}>
                    Grant Tran
                  </Message.Header>
                  <p style={styles.messagesColor}>
                    This is a bio about myself.
                  </p>
                </Message>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={10}>
                <Message color='blue'>
                  <Message.Header style={styles.messagesColor}>
                    Tin Dang
                  </Message.Header>
                  <p style={styles.messagesColor}>
                    A SFU grad who has an interest in coding. Tin decided to pursue a career as a web developer because it is new thing to him. When he's not coding, Tin usually hits the gym.
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
                <Message color='blue'>
                  <Message.Header style={styles.messagesColor}>
                    Spencer Ang
                  </Message.Header>
                  <p style={styles.messagesColor}>
                    A UBC commerce student who loves food, Spencer chose to pursue the dev life because when he was younger his parent told him he shouldn't stare at a computer all day. However, he told them he would do it for the rest of his life at his <b>job</b>.
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