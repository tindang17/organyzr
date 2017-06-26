import React, {Component} from 'react';
import { Button, Card, Image, Grid } from 'semantic-ui-react';
import axios from 'axios';
import Moment from 'react-moment';

class Games extends Component {
  constructor (props) {
    super(props);
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    let games; 
    var self = this; 
    console.log('before axios request');
    axios.get(`/games/data`)
    .then(res => {
      self.setState({games: self.state.games.concat(res.data)})
      console.log(self.state.games);
    })
  
  // console.log('last thing in comp did mount');
  }

  render () {
    // console.log('first in render', this.state.games);
    // console.log(this.state.games.length); 
    // console.log(this.state.games[0]);
    console.log('first in render', this.state.games);
    let gameCards = this.state.games;
    console.log('gamecards', gameCards);
    let htmlGames = [];
    if (gameCards.length !=  null) {
      for (let i = 0; i < gameCards.length; i++) {
        htmlGames.push(<Grid.Column>
              <Card fluid color='violet'>
                <Card.Content>
                  <Card.Header>
                  <Moment date={gameCards[i].date}/>
                  </Card.Header>
                  <Card.Meta>
                    <span className="time">
                      Time
                    </span>
                    <span className="rink">
                      Rink 
                    </span>
                  </Card.Meta>
                  <Card.Description>
                      General game info 
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green' active>Available</Button>
                    <Button basic color='red'>Unavailable</Button>
                  </div>
                </Card.Content>
              </Card>
              <br/>
        </Grid.Column>)
      }
    }

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
      <Grid columns={3} style={styles.div}>
      <Grid.Row>
      {htmlGames}
      </Grid.Row>
      </Grid>
      </div>
      
    )
  }
}

export default Games; 