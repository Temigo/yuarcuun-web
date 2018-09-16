import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Label, Icon } from 'semantic-ui-react';

class Chip extends Component {
  render() {
    return (
      <Label horizontal as='a'>{this.props.text}<Icon name='delete' /></Label>
    );
  }
}
export default Chip;
