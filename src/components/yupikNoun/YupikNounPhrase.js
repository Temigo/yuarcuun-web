import React, { Component } from 'react';
import '../../semantic/dist/semantic.min.css';
import YupikNounVerbPostbases from './YupikNounVerbPostbases.js';

class YupikNounPhrase extends Component {
  render() {
    return (
      <YupikNounVerbPostbases {...this.props} />
    );
  }
}
export default YupikNounPhrase;
