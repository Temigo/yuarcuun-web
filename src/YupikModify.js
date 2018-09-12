import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import YupikModifyNoun from './YupikModifyNoun.js';
import YupikModifyVerb from './YupikModifyVerb.js';

class YupikModify extends Component {
  render() {
    if (this.props.location.state.entry.descriptor[0].includes('verb')) {
      return <YupikModifyVerb {...this.props} />;
    }
    else {
      return <YupikModifyNoun {...this.props} />;
    }
  }
}
export default YupikModify;