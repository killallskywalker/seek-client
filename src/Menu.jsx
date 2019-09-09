import React, { Component } from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import App from './App.jsx';
import Welcome from './Welcome.jsx';

class Menu extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/'  component={Welcome}/>
        <Route path="/:id" component={App}/>
      </Router>
    )
  }
}

export default Menu;