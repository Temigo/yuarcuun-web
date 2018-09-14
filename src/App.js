import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './semantic/dist/semantic.min.css';
import './style.css';

import SearchPage from './SearchPage.js';
import YupikDetails from './YupikDetails.js';
import YupikModify from './YupikModify.js';
import About from './About.js';

//export const API_URL = "http://yuarcuun.herokuapp.com";
export const API_URL = "http://localhost:5000";

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={SearchPage} />
        <Route exact path='/about' component={About} />
        <Route exact path='/:word' component={YupikDetails} />
        <Route exact path='/:word/:usage_id/modify' component={YupikModify} />
      </Switch>
    );
  }

}

export default App;
