import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class LinkButton extends Component {

  constructor (props) {
    super(props);
    this.state = {
      state: 'unclicked',
      url: 'abc',
      showlink: false
    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick()  {this.setState({ showlink: true })}

  render() {
    const active = this.state.showlink

    if(active) {
            return (<input type="text" value={this.props.uuid} readonly />);
  } else {
    return (
      <Button onClick={this.handleClick}>
        Generate Team Code
        {active}
      </Button>
        )
}

  }
}

export default LinkButton
