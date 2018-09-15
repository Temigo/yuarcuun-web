import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Button, Segment } from 'semantic-ui-react';
import { nounPostbases } from './constants.js';

class YupikNounPhrase extends Component {
  render() {
    return (
      <Button.Group inverted color='violet' vertical>
        <Segment>
          Noun -> Verb Postbases (Endings)
          <Button as='h4' toggle key={11} onClick={this.props.setPostbase.bind(this, 11)} disabled={(this.props.allowable_next_ids.indexOf(11) < 11)} active={this.props.currentPostbases.indexOf(11) >= 0}>{nounPostbases[11].description}</Button>
          <Button as='h4' toggle key={12} onClick={this.props.setPostbase.bind(this, 12)} disabled={(this.props.allowable_next_ids.indexOf(12) < 12)} active={this.props.currentPostbases.indexOf(12) >= 0}>{nounPostbases[12].description}</Button>
          <Button as='h4' toggle key={13} onClick={this.props.setPostbase.bind(this, 13)} disabled={(this.props.allowable_next_ids.indexOf(13) < 13)} active={this.props.currentPostbases.indexOf(13) >= 0}>{nounPostbases[13].description}</Button>
          <Button as='h4' toggle key={14} onClick={this.props.setPostbase.bind(this, 14)} disabled={(this.props.allowable_next_ids.indexOf(14) < 14)} active={this.props.currentPostbases.indexOf(14) >= 0}>{nounPostbases[14].description}</Button>
          <Button as='h4' toggle key={15} onClick={this.props.setPostbase.bind(this, 15)} disabled={(this.props.allowable_next_ids.indexOf(15) < 15)} active={this.props.currentPostbases.indexOf(15) >= 0}>{nounPostbases[15].description}</Button>
          <Button as='h4' toggle key={16} onClick={this.props.setPostbase.bind(this, 16)} disabled={(this.props.allowable_next_ids.indexOf(16) < 16)} active={this.props.currentPostbases.indexOf(16) >= 0}>{nounPostbases[16].description}</Button>
          <Button as='h4' toggle key={17} onClick={this.props.setPostbase.bind(this, 17)} disabled={(this.props.allowable_next_ids.indexOf(17) < 17)} active={this.props.currentPostbases.indexOf(17) >= 0}>{nounPostbases[17].description}</Button>
          <Button as='h4' toggle key={18} onClick={this.props.setPostbase.bind(this, 18)} disabled={(this.props.allowable_next_ids.indexOf(18) < 18)} active={this.props.currentPostbases.indexOf(18) >= 0}>{nounPostbases[18].description}</Button>
          <Button as='h4' toggle key={19} onClick={this.props.setPostbase.bind(this, 19)} disabled={(this.props.allowable_next_ids.indexOf(19) < 19)} active={this.props.currentPostbases.indexOf(19) >= 0}>{nounPostbases[19].description}</Button>
          <Button as='h4' toggle key={20} onClick={this.props.setPostbase.bind(this, 20)} disabled={(this.props.allowable_next_ids.indexOf(20) < 20)} active={this.props.currentPostbases.indexOf(20) >= 0}>{nounPostbases[20].description}</Button>
          <Button as='h4' toggle key={21} onClick={this.props.setPostbase.bind(this, 21)} disabled={(this.props.allowable_next_ids.indexOf(21) < 21)} active={this.props.currentPostbases.indexOf(21) >= 0}>{nounPostbases[21].description}</Button>
        </Segment>
      </Button.Group>
    );
  }
}
export default YupikNounPhrase;
