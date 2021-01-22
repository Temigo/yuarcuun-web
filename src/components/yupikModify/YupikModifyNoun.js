import React, { Component } from 'react';
import { List, Icon } from 'semantic-ui-react';
import '../../semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';

class YupikModifyNoun extends Component {
  render() {
    return (
      <List divided selection size='huge'>
        <List.Item as={Link} to={`${this.props.match.url}/descriptors`}>
          <List.Content floated='right'>
            <Icon style={{paddingTop:'10px'}} color='teal' name='chevron right' />
          </List.Content>
          <List.Content verticalAlign='middle'>
          <Icon circular name='book' />
            Add adjectives or descriptors
          </List.Content>
        </List.Item>

        <List.Item as={Link} to={`${this.props.match.url}/phrase`}>
          <List.Content floated='right'>
            <Icon style={{paddingTop:'10px'}} color='teal' name='chevron right' />
          </List.Content>
          <List.Content verticalAlign='middle'>
          <Icon circular name='talk' />
            Use it in a verb phrase
          </List.Content>
        </List.Item>
        
        <List.Item as={Link} to={`${this.props.match.url}/combine`}>
          <List.Content floated='right'>
            <Icon style={{paddingTop:'10px'}} color='teal' name='chevron right' />
          </List.Content>
          <List.Content verticalAlign='middle'>
          <Icon circular name='cogs' />
            Change noun ending to combine with other words
          </List.Content>
        </List.Item>
      </List>
    );
  }
};

export default YupikModifyNoun;
