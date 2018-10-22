import React, { Component } from 'react';
import '../../semantic/dist/semantic.min.css';
import { Button, Segment, Card } from 'semantic-ui-react';
import YupikNounHowMany from './YupikNounHowMany.js';
import YupikNounPossessor from './YupikNounPossessor.js';
import YupikNounEndingMoods from './YupikNounEndingMoods.js';

class YupikNounCombine extends Component {
  render() {
    return (
      <Card.Group centered>
        {this.props.verbEnding== false ? <YupikNounHowMany {...this.props} /> : ''}
        <YupikNounPossessor {...this.props} />
        <YupikNounEndingMoods {...this.props} />
      </Card.Group>
    );
  }
}
export default YupikNounCombine;
