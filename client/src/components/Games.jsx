import React, {Component} from 'react';
import { Button, Card, Image, Grid } from 'semantic-ui-react';
import axios from 'axios';

class Games extends Component {
  constructor (props) {
    super(props);
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    console.log('before axios request');
    axios.get(`/games/data`)
    .then(res => {
      this.setState({games: res.data})
      console.log(this.state.games);
    })
  
  console.log('last thing in comp did mount');
  }

  render () {

    let gameCards = [];
    for (let i = 0; i < 10; i++) {
      gameCards.push(<Grid.Column>
            <Card fluid color='violet'>
              <Card.Content>
                <Card.Header>
                  Date
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

    return (

      <Grid columns={3}>
      <Grid.Row>
      {gameCards}    
      </Grid.Row>
      </Grid>
      
    )
  }
}

export default Games; 