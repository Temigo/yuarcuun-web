import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Segment, Button } from 'semantic-ui-react';

class YupikNounHowMany extends Component {
  render() {
    return (
      <Button.Group inverted color='pink' vertical>
        <Segment>
        How many?
        <Button as='h4' toggle onClick={this.props.setValue4.bind(this,1)} active={this.props.value4==1}>1</Button>
        <Button as='h4' toggle onClick={this.props.setValue4.bind(this,2)} active={this.props.value4==2}>2</Button>
        <Button as='h4' toggle onClick={this.props.setValue4.bind(this,3)} active={this.props.value4==3}>3</Button>
        </Segment>
      </Button.Group>
    );
  }
}
export default YupikNounHowMany;
