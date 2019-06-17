import React, { Component } from 'react';
import '../../semantic/dist/semantic.min.css';
import { Button, Card } from 'semantic-ui-react';

class YupikNounPossessor extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
          It is owned by someone?
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Button as='h4' toggle onClick={this.props.setPossessiveButton.bind(this,1)} active={this.props.possessiveButton===1}>possessive</Button>
        </Card.Content>
      </Card>
    );
  }
}
export default YupikNounPossessor;
