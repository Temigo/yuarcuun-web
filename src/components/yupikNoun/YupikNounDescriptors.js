import React, { Component } from 'react';
import '../../semantic/dist/semantic.min.css';
import { Button, Segment, Card } from 'semantic-ui-react';
import { nounPostbases } from '../constants/constants.js';
import YupikNounHowMany from './YupikNounHowMany.js';
import YupikNounPossessor from './YupikNounPossessor.js';
import YupikNounNounPostbases from './YupikNounNounPostbases.js';

class YupikNounDescriptors extends Component {
  render() {
    return (
      <Card.Group centered>
        {this.props.verbEnding== false ? <YupikNounHowMany {...this.props} /> : ''}
        <YupikNounPossessor {...this.props} />
        <YupikNounNounPostbases {...this.props} />
      </Card.Group>
    );
  }
}
export default YupikNounDescriptors;
