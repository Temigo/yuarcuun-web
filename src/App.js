import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './semantic/dist/semantic.min.css';
import './style.css';

import SearchPage from './SearchPage.js';
import YupikDetails from './YupikDetails.js';
import YupikModify from './YupikModify.js';
import About from './About.js';
import YupikModifyLayout from './YupikModifyLayout.js';
import YupikEnding from './YupikEnding.js';
import YupikModifyNoun from './YupikModifyNoun.js';
import YupikModifyVerb from './YupikModifyVerb.js';
import YupikEndingGroups from './YupikEndingGroups.js';
import YupikPostbaseGroups from './YupikPostbaseGroups.js';
import YupikPostbase from './YupikPostbase.js';

export const API_URL = "https://yugtun-api.herokuapp.com";
// export const API_URL = "http://localhost:5000";

class Verification extends Component {
  componentDidMount() {
    this.link.click();
  }
  render() {
    return (
      <a ref={input => this.link = input} href={API_URL + '/loaderio-a0a6b59c23ca05a56ff044a189dd143a'}>here</a>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={SearchPage} />
        <Route exact path='/loaderio-a0a6b59c23ca05a56ff044a189dd143a.html' component={Verification} />
        <Route exact path='/about' component={About} />
        <Route path='/:word/:entry_id/:usage_id/modify' component={YupikModifyLayout} />
        <Route exact path='/:word' component={YupikDetails} />
      </Switch>
    );
  }

}

export default App;
