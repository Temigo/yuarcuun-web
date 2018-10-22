import React, { Component } from 'react';
import '../../semantic/dist/semantic.min.css';
import { Label, Icon } from 'semantic-ui-react';

//       <Label style={{backgroundColor:this.props.color, color:'white'}} horizontal as='a'>{this.props.text}<Icon name='delete' /></Label>

class Chip extends Component {
  render() {
    return (
      <Label horizontal as='a'>{this.props.text}<Icon name='delete' /></Label>
    );
  }
}
export default Chip;
