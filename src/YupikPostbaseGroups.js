import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import YupikModifyNoun from './YupikModifyNoun.js';
import YupikModifyVerb from './YupikModifyVerb.js';
import { postbaseButtons, enclitics } from './modifyVerbOptions.js';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class YupikPostbaseGroups extends Component {
  render() {
    return (
      <List celled selection size='huge'>
        {postbaseButtons.map((group) => {
          return (
            <List.Item><Link to={`${this.props.match.url}/${group.activeIndex}`}>{group.text}</Link></List.Item>
          );
        })}
      </List>
    );
  }
}
export default YupikPostbaseGroups;
