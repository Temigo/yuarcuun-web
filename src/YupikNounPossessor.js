import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Segment, Button } from 'semantic-ui-react';

class YupikNounPossessor extends Component {
  render() {
    return (
      <Button.Group inverted color='pink' vertical>
        <Segment>
        It is owned by someone?
        <Button as='h4' toggle onClick={this.props.setPossessiveButton.bind(this,1)} active={this.props.possessiveButton==1}>possessive</Button>
        </Segment>
      </Button.Group>
    );
  }
}
export default YupikNounPossessor;
