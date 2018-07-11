import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import './semantic/dist/semantic.min.css';

import SearchPage from './SearchPage.js';
import YupikDetails from './YupikDetails.js';

//export const API_URL = "http://yuarcuun.herokuapp.com";
export const API_URL = "http://localhost:5000";

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={SearchPage} />
        <Route exact path='/:word' component={YupikDetails} />
      </Switch>
    );
  }

}

export default App;
