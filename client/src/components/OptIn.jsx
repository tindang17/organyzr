import React, {Component} from 'react';

import { Button, Checkbox, Form, Message, Grid, Header } from 'semantic-ui-react'

import axios from 'axios';


class OptIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading...'
    }
  }

  componentDidMount() {
    var self = this;
    console.log('before axios request');
    console.log(self.props.location.pathname)
    axios.post(self.props.location.pathname)
    .then(res => {
      self.setState({message: res.data})
    })
  }


  render() {

  let self = this
    const styles = {
      div: {
        paddingLeft: 200,
        paddingRight: 200
      },
      font: {
        fontSize: 22,
        color: 'black'
      },
      textfont: {
        fontSize: 18,
        color: 'black'
      }
    }

    return (
        <div style={styles.div}>
                  <h2> {self.state.message}</h2>
        </div>
    );
  }
}

export default OptIn;