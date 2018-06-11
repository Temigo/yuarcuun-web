import React, { Component } from 'react';
import { Container, Header, Image, Divider, Grid, Icon, Input, List, Button } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';

class YupikDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      currentWord: props.word
    };
  }

  render() {
    return (
      <Container>
        <p>{this.state.currentWord}</p>
      </Container>
    );
  }
}

export default YupikDetails;
