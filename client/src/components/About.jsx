import React, {Component} from 'react';
import { Grid, Image, Message, Header } from 'semantic-ui-react'

  class About extends Component {
    constructor(props){
      super(props);
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
        }, 
        pic: {
          borderRadius: '50%'
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
                <Image style={styles.pic} src={require('../images/gtran.jpg')}/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Message color='blue'>
                  <Message.Header style={styles.messagesColor}>
                    Grant Tran
                  </Message.Header>
                  <p style={styles.messagesColor}>
                    A life science researcher gone developer, I'm a huge sports fan and love organizing teams.
                    The idea of Organyzer originated from wanting a systematic application that helps me organize my hockey team,
                    yet at the same time require my (lazy) teammates to do very little. 
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
                    A SFU grad who has an interest in coding. Tin decided to pursue a career as a web developer because he wants to build web applications. When he's not coding, Tin usually hits the gym.
                  </p>
                </Message>
              </Grid.Column>
              <Grid.Column width={3}>
                <Image style={styles.pic} src={require('../images/tdang.jpg')}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={3}>
                <Image style={styles.pic} src={require('../images/sang.png')}/>
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