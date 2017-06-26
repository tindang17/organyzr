import React, {Component} from 'react'; 
import { Message, Grid, Header, Image } from 'semantic-ui-react'

class Faq extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    const items = [
      'Team Managers',
      'Players'
    ]

    const items2 = [
      'Automated Texts, Emails, and Facebook Messenger', 
      'UI to display all game scheduled', 
      'Automated reminders'
    ]

    const styles = {
      message: {
        fontSize: 16
      },
      messagesColor: {
          color: 'black'
        }, 
      grid: {
        paddingLeft: 75, 
        paddingRight: 75
      }
    }
    return (
    <div>
    <Header as='h2' textAlign='center'> FAQ </Header> 
    <br/>
      <Grid divided centered style={styles.grid}>
        <Grid.Column width={4}>
          <Image src={require('../images/outside_rink_net.png')}/>
        </Grid.Column>
        <Grid.Column width={9}>
          <Message style={styles.message} color='blue'>
            <Message.Header style={styles.messagesColor}>Who is Organyzr for?</Message.Header>
            <Message.List style={styles.messagesColor} items={items} />
          </Message>
        </Grid.Column>

        <Grid.Column width={9}>
          <Message style={styles.message} color='blue'>
            <Message.Header style={styles.messagesColor}>What are the features of Organyzr?</Message.Header>
            <Message.List style={styles.messagesColor} items={items2} />
          </Message>
        </Grid.Column>
        <Grid.Column width={4}>
          <Image src={require('../images/tennis.jpg')}/>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
  

}


export default Faq;