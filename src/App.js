import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './semantic/dist/semantic.min.css';
import './style.css';

import SearchPage from './components/SearchPage.js';
import YupikDetails from './components/YupikDetails.js';
import About from './components/About.js';
import YupikModifyLayout from './components/yupikModify/YupikModifyLayout.js';

//export const API_URL = "https://yugtun-api.herokuapp.com";
export const API_URL = "http://localhost:5000";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={SearchPage} />
        <Route exact path='/about' component={About} />
        <Route path='/:word/:entry_id/:usage_id/modify' component={YupikModifyLayout} />
        <Route exact path='/:word' component={YupikDetails} />
      </Switch>
    );
  }

}

export default App;
