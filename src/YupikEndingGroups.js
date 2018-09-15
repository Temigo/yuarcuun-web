import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { List, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class YupikEndingGroups extends Component {
  render() {
    return (
      <Segment>
        <List divided selection size='huge'>
          <List.Item as={Link} to={`${this.props.match.url}/0`}>
            <List.Content floated='right'>
              <Icon color='teal' name='chevron right' />
            </List.Content>
            <Icon circular name='help' />
            <List.Content verticalAlign='middle'>
              Question form

            </List.Content>

          </List.Item>
          <List.Item as={Link} to={`${this.props.match.url}/1`}>
            <List.Content floated='right'>
              <Icon color='teal' name='chevron right' />
            </List.Content>
            <Icon circular name='talk' />
            <List.Content verticalAlign='middle'>
              Make a command
            </List.Content>
          </List.Item>
          <List.Item as={Link} to={`${this.props.match.url}/2`}>
            <List.Content floated='right'>
              <Icon color='teal' name='chevron right' />
            </List.Content>
            <Icon circular name='time' />
            <List.Content verticalAlign='middle'>
              Dependent clause
            </List.Content>
          </List.Item>
          <List.Item as={Link} to={`${this.props.match.url}/3`}>
            <List.Content floated='right'>
              <Icon color='teal' name='chevron right' />
            </List.Content>
            <Icon circular name='clone' />
            <List.Content verticalAlign='middle'>
              Verb to noun
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    );
  }
}
export default YupikEndingGroups;
