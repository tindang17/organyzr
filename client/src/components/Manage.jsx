import React, {Component} from 'react';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'

class Manage extends Component {
  constructor (props) {
    super(props);
  }

  componenetDIdMount() {
    //Database for team's managed by this admin
 

    //Generate link for users for each team 


  }

  render () {
    return (
      <div>
        <h3> Hello Manager </h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Team Name</Table.HeaderCell>
              <Table.HeaderCell>Link To Games</Table.HeaderCell>
              <Table.HeaderCell>Generate Link</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Name1</Table.Cell>
              <Table.Cell>Link1</Table.Cell>
              <Table.Cell><Button>Generate1</Button></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Name2</Table.Cell>
              <Table.Cell>Link2</Table.Cell>
              <Table.Cell><Button>Generate2</Button></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Name3</Table.Cell>
              <Table.Cell>Link3</Table.Cell>
              <Table.Cell><Button>Generate3</Button></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }

}

export default Manage; 