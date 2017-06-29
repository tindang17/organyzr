import React, {Component} from 'react'; 
import { Message, Grid, Header, Image } from 'semantic-ui-react'

class Faq extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    const items = [
      'Register for an account',
      'Create a New Team in "Manage" - don\'t your logo!',
      'Give your unique team code to your players',
      'Add Games for your players - Date, Time, and Location'
    ]

    const items2 = [
      'Register for an account', 
      'Contact your Manager for a unique team code', 
      'Add your team unique\'s code under "My Team"',
      'View your team\'s schedule and confirm your attendance',
      'Don\'t forget to include up to date email and phone number for friendly reminders and notifications'
    ]

    const styles = {
      message: {
        fontSize: 16,
        flex: 1
        
      },
      messagesColor: {
          color: 'black'
        }, 
      grid: {
        paddingLeft: 75, 
        paddingRight: 75
      },
      circle: {
        borderRadius: '50%',
        overflow: 'hidden'
      },
      alignCenter: {
        display: 'flex',
        alignItems: 'center'
      }
    }
    return (
    <div>
    <Header as='h2' textAlign='center'> FAQ - How to use Organyzer </Header> 
    <br/>
      <Grid divided centered style={styles.grid}>
        <Grid.Column width={4}>
          <Image style={styles.circle} src={require('../images/outside_rink_net.png')}/>
        </Grid.Column>
        <Grid.Column width={9} style={styles.alignCenter}>
          <Message style={styles.message} color='blue'>
            <Message.Header style={styles.messagesColor}>I'm a Manager, how do I use Organyzr?</Message.Header>
            <Message.List style={styles.messagesColor} items={items} />
          </Message>
        </Grid.Column>

        <Grid.Column width={9} style={styles.alignCenter}>
          <Message style={styles.message} color='green'>
            <Message.Header style={styles.messagesColor}>I'm a Player, how do I use Organyzer?</Message.Header>
            <Message.List style={styles.messagesColor} items={items2} />
          </Message>
        </Grid.Column>
        <Grid.Column width={4}>
          <div style={styles.circle}>
             <Image  src={require('../images/tennis.jpg')}/>
          </div>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}


export default Faq;