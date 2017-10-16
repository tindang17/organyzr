import React, {Component} from 'react';
import { Route, Redirect} from 'react-router-dom';
import axios from 'axios';

import { Button, Checkbox, Form, Message } from 'semantic-ui-react'



class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  componentDidMount () {
    var self = this;
    axios.post(`/logout`)
    .then(res => {
      self.setState({redirect: true})
    })
  }

  render() {
    const {redirect} = this.state;

    if (redirect) {
      window.location.reload()
    }
    return (
      <div>
        <h3> Logging you out....</h3>
      </div>
    );
  }
}

export default Logout;