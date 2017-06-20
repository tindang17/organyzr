import React, {Component} from 'react';
  
  class About extends Component {
    constructor(props){
      super(props);
    }
    // sending request to the server
    
    componentDidMount() {
      fetch(`/about/data`)
      console.log('data', data)
      .then(res => {
        console.log(res.data)
      })
    }

    render () {
      return (
        <div>
          <span>hello</span>
        </div>
      )
    }
  } 

export default About;