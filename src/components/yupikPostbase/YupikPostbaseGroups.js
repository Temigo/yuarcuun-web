import React, { Component } from 'react';
import '../../semantic/dist/semantic.min.css';
import { postbaseButtons } from '../modifyWord/modifyVerbOptions.js';
import { List, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class YupikPostbaseGroups extends Component {
  render() {
    return (
      <Segment>
      <List divided selection size='huge'>
        {postbaseButtons.map((group) => {
          return (
            <List.Item as={Link} to={`${this.props.match.url}/${group.activeIndex}`}>
              <List.Content floated='right'>
                <Icon color='teal' name='chevron right' />
              </List.Content>
              <Icon circular name={group.icon} />
              <List.Content verticalAlign='middle'>
                {group.text}
              </List.Content>
            </List.Item>
          );
        })}
      </List>
      </Segment>
    );
  }
}
export default YupikPostbaseGroups;
