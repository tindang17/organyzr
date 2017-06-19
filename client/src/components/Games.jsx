import React, {Component} from 'react';
import { Button, Card, Image } from 'semantic-ui-react'

class Games extends Component {
  constructor (props) {
    super(props);

  }

  render () {
    return (
      <div>
      <Card>
        <Card.Content>
          <Card.Header>
            June 17th 2017
          </Card.Header>
          <Card.Meta>
            <span className="time">
              10PM
            </span>
            <span className="rink">
              Rink 1
            </span>
          </Card.Meta>
          <Card.Description>
              Wearing dark. 
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green' active>Available</Button>
            <Button basic color='red'>Unavailable</Button>
          </div>
        </Card.Content>
      </Card>
      </div>
    )
  }
}

export default Games; 