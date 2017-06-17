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
          <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' />
          <Card.Header>
            Steve Sanders
          </Card.Header>
          <Card.Meta>
            Friends of Elliot
          </Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>Approve</Button>
            <Button basic color='red'>Decline</Button>
          </div>
        </Card.Content>
      </Card>
      </div>
    )
  }
}

export default Games; 