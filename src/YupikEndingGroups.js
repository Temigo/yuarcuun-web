import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import YupikModifyNoun from './YupikModifyNoun.js';
import YupikModifyVerb from './YupikModifyVerb.js';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class YupikEndingGroups extends Component {
  render() {
    return (
      <div>
        <List celled selection size='huge'>
          <List.Item><Link to={`${this.props.match.url}/0`}>Question form</Link></List.Item>
          <List.Item><Link to={`${this.props.match.url}/1`}>Make a command</Link></List.Item>
          <List.Item><Link to={`${this.props.match.url}/2`}>Dependent clause</Link></List.Item>
          <List.Item><Link to={`${this.props.match.url}/3`}>Verb to noun</Link></List.Item>
        </List>
      </div>
    );
  }
}
export default YupikEndingGroups;
