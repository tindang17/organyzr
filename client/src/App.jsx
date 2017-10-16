import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import axios from 'axios';
import { Button, Menu, Loader, Segment } from 'semantic-ui-react'

// Components for pages
import Faq from './components/Faq.jsx';
import About from './components/About.jsx';
import Signup from './components/Signup.jsx';
import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Landing from './components/Landing.jsx';
import Games from './components/Games.jsx';
import MyTeams from './components/MyTeams.jsx';
import Manage from './components/Manage.jsx';
import Schedule from './components/Schedule.jsx';
import ManageTeam from './components/ManageTeam.jsx';
import Settings from './components/Settings.jsx';

import OptIn from './components/OptIn.jsx';
import OptOut from './components/OptOut.jsx';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userid: false
    }

  }

  componentDidMount() {
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
        main: () => <Landing/>
      },
      { path: '/about',
        main: () => <About/>
      },
      { path: '/faq',
        main: () => <Faq/>
      },
      { path: '/myteams',
        main: MyTeams
      },
      {
        path: '/manage',
        main: () => <Manage/>
      },
      {
        path: '/manageteam/:teamid',
        main: ManageTeam
      },
      {
        path: '/schedule/:teamid',
        main: Schedule
      },
      {
        path: '/settings',
        main: () => <Settings/>
      },
      {
        path: '/optout',
        main: OptOut
      },
      {
        path: '/optin',
        main: OptIn
      }
    ]

    const styles = {
      ulitem: {
        fontSize: 24,
        fontFamily: 'helvetica',
        listStyleType: 'none',
        padding: 0
      },
      liitem: {
        padding: 10
      },
      linkItems: {
        color: 'white',
        font: 'helvetica',
        fontSize: 24
      }
    };

    let checkLogin;

    if (this.state.userid === 'not logged in') {
      checkLogin = 'not logged in'
    } else {
      checkLogin = 'logged in'

    }

    let signupLogin = [];

    if (this.state.userid === false) {
      signupLogin = [];
    } else if (this.state.userid === 'not logged in') {
      signupLogin.push(
        <ul>
          <li style={styles.liitem}><Link style={styles.linkItems} to="/signup">Signup</Link></li>
          <li style={styles.liitem}><Link style={styles.linkItems} to="{checkLogin}">Login</Link></li>
          </ul>)
    } else {
      signupLogin = [];

    }

    let gamesLink;
    if (this.state.userid === 'not logged in') {
      gamesLink = '/login';
    } else {
      gamesLink = '/myteams';
    }

    let manageGames = [];
    if (this.state.userid === false) {
      manageGames = [];
    } else if (this.state.userid === 'not logged in') {
      manageGames = [];
    } else {
      manageGames.push(
        <div key='1'><br/>
          <li style={styles.liitem}><Link style={styles.linkItems} to={gamesLink}><Button color='blue' fluid >My Teams</Button></Link></li>
          <li style={styles.liitem}><Link style={styles.linkItems} to="/manage"><Button color='blue' fluid >Manage</Button></Link></li>
          <li style={styles.liitem}><Link style={styles.linkItems} to="/settings"><Button color='blue' fluid >Settings</Button></Link></li>
          <br/> <li  style={styles.liitem}><Link style={styles.linkItems} to="/logout"><Button color='blue' basic fluid>Logout</Button></Link></li>
        </div>)
    }
  return (
    <Router>
      <div>
        <div style={{ display: 'flex'}}>
          <div style={{
            padding: '10px',
            width: '190px',
            background: '#143153',
            minHeight: '100vh',
            position: 'fixed'
            }}>
              <ul style={styles.ulitem}>
                <li style={styles.liitem}><Link style={styles.linkItems} to="/"><Button color='blue' fluid>Home</Button></Link></li>
                <li style={styles.liitem}><Link style={styles.linkItems} to="/about"><Button color='blue' fluid>About</Button></Link></li>
                <li style={styles.liitem}><Link style={styles.linkItems} to="/faq"><Button color='blue' fluid>FAQ</Button></Link></li>
                <br/>
                {manageGames}
                <br/>
              </ul>
            </div>
            <div style={{ flex: 1, padding: 20, marginLeft: 190 }}>
              {routes.map((route, index) => (
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

            <Route path='/signup' render = { () =>
            (checkLogin === 'not logged in') ?
            (<Signup/>) : (<Redirect to='/'/>)}/>

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