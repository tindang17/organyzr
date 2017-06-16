import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Faq from './components/Faq.jsx';


const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/faq" component={Faq}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)


const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

export default App