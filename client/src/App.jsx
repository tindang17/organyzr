import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import axios from 'axios';
// Components for pages
import Faq from './components/Faq.jsx';
import About from './components/About.jsx';
import Signup from './components/Signup.jsx';
import Nav from './components/Nav.jsx';

// import Teams from './components/teams/Teams.jsx';


import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';

import Landing from './components/Landing.jsx';
import Games from './components/Games.jsx';
import Manage from './components/Manage.jsx';
import ManageTeam from './components/ManageTeam.jsx';
import { Menu, Loader, Segment } from 'semantic-ui-react'
import Settings from './components/Settings.jsx';




class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userid: false
    }

  }

  componentDidMount() {
    // console.log('component did mount');
    var self = this;
    axios.get(`/landing/check`)
    .then(res => {
      self.setState({userid: res.data})
    })
  }

  render () {
    const routes = [
      { path: '/',
        exact: true,
        sidebar: () => <Landing/>,
        main: () => <Landing/>
      },
      { path: '/about',
        sidebar: () => <About/>,
        main: () => <About/>
      },
      { path: '/faq',
        sidebar: () => <Faq/>,
        main: () => <Faq/>
      },
      { path: '/signup',
        sidebar: () => <Signup/>,
        main: () => <Signup/>
      },
      { path: '/games',
        sidebar: () => <Games/>,
        main: () => <Games/>
      },
      // { path: '/login',
      //   sidebar: () => <Login user={this.state.userid}/>,
      //   main: () => <Login user={this.state.userid}/>
      // },
      {
        path: '/manage',
        sidebar: () => <Manage/>,
        main: () => <Manage/>
      },
      {
        path: '/manageteam/:teamid',
        sidebar: () => <ManageTeam/>,
        main: ManageTeam
      },
      {
        path: '/settings',
        sidebar: () => <Settings/>,
        main: () => <Settings/>
      }
    ]

    const styles = {
      ulitem: {
        fontSize: 24,
        listStyleType: 'none',
        padding: 0,
        position: 'fixed'
      },
      liitem: {
        padding: 10
      }
    };

    let checkLogin;
    if (this.state.userid === 'not logged in') {
      checkLogin = 'not logged in'
    } else {
      checkLogin = 'logged in'
    }


    let gamesLink; 
    if (this.state.userid === 'not logged in') {
      gamesLink = '/login';
    } else {
      gamesLink = '/games';
    }

    let manageGames = []; 
     if (this.state.userid === false) {
      manageGames = [];
    } else if (this.state.userid === 'not logged in') {
      manageGames = [];
    } else {
      manageGames.push(<div><br/><li style={styles.liitem}><Link to={gamesLink}>Games</Link></li>
          <li style={styles.liitem}><Link to="/manage">Manage</Link></li>
          <li style={styles.liitem}><Link to="/settings">Settings</Link></li>
          <br/> <li style={styles.liitem}><Link to="/logout">Logout</Link></li></div>)
    } 
  return (

<Router>
  <div>
  <div style={{ display: 'flex' }}>
    <div style={{
      padding: '10px',
      width: '20%',
      background: '#AAD097',
      height: '100vh'
      }}>
        <ul style={styles.ulitem}>
          <li style={styles.liitem}><Link to="/">Home</Link></li>
          <li style={styles.liitem}><Link to="/about">About</Link></li>
          <li style={styles.liitem}><Link to="/faq">FAQ</Link></li>
          <br/>
          {manageGames}
          <br/>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        {routes.map((route, index) => (
        // Render more <Route>s with the same paths as
        // above, but different components this time.
          <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
          />
        ))}

      <Route path='/login' render = { () => 
      (checkLogin === 'not logged in') ? 
      (<Login/>) : (<Redirect to='/'/>)}/>

      <Route path='/logout' render = { () => 
      (checkLogin === 'not logged in') ? 
      (<Redirect to='/'/>) : (<Logout/>)}/>
    </div>
  </div>
  </div>
</Router>

    )
  }
}



export default App;