import React, { Component } from 'react';
import { Segment, List, Icon } from 'semantic-ui-react';
import '../../semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from '../../App.js';
import { Link } from 'react-router-dom';

class YupikModifyNoun extends Component {

      render() {
        return (
          <List divided selection size='huge'>
            <List.Item as={Link} to={`${this.props.match.url}/descriptors`}>
              <List.Content floated='right'>
                <Icon color='teal' name='chevron right' />
              </List.Content>
              <Icon circular name='book' />
              <List.Content verticalAlign='middle'>
                Add adjectives or descriptors
              </List.Content>
            </List.Item>
            <List.Item as={Link} to={`${this.props.match.url}/phrase`}>
              <List.Content floated='right'>
                <Icon color='teal' name='chevron right' />
              </List.Content>
              <Icon circular name='talk' />
              <List.Content verticalAlign='middle'>
                Use it in a verb phrase
              </List.Content>
            </List.Item>
            <List.Item as={Link} to={`${this.props.match.url}/combine`}>
              <List.Content floated='right'>
                <Icon color='teal' name='chevron right' />
              </List.Content>
              <Icon circular name='cogs' />
              <List.Content verticalAlign='middle'>
                Change noun ending to combine with other words
              </List.Content>
            </List.Item>
          </List>
        );
      }
    };

export default YupikModifyNoun;
