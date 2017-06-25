import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const Nav = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/faq">FAQ</Link></li>
      <li><Link to="/signup">Sign-Up</Link></li>
    </ul>
    
    <hr/>
    
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/faq" component={Faq}/>
    <Route path="/signup" component={Signup}/>
  </div>
)

export default Nav;