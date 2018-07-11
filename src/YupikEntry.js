import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';

class YupikEntry extends Component {
  constructor(props) {
    super(props);
    console.log(props.entry);

    this.state = {
      entry: props.entry,
    };

  }

  render() {
    console.log('hi');
    return (
      <Segment>
      {this.state.entry.definition}
      </Segment>
    );
  }
}

export default YupikEntry;
