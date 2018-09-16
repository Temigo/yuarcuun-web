import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Segment, Button, Card } from 'semantic-ui-react';

class YupikNounHowMany extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
          How many?
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Button.Group>
            <Button toggle onClick={this.props.setValue4.bind(this,1)} active={this.props.value4==1}>1</Button>
            <Button.Or />
            <Button toggle onClick={this.props.setValue4.bind(this,2)} active={this.props.value4==2}>2</Button>
            <Button.Or />
            <Button toggle onClick={this.props.setValue4.bind(this,3)} active={this.props.value4==3}>3</Button>
          </Button.Group>
        </Card.Content>
      </Card>
    );
  }
}
export default YupikNounHowMany;
