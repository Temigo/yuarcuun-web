import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Segment, Button, Card } from 'semantic-ui-react';
import { nounPostbases } from './constants.js';

class YupikNounVerbPostbases extends Component {
  render() {
    return (
      <Card color='violet' fluid>
        <Card.Content>
          <Card.Header>
          Verb forms
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Group stackable itemsPerRow={3}>
              <Card><Button toggle key={16} onClick={this.props.setPostbase.bind(this, 16)} disabled={(this.props.allowable_next_ids.indexOf(16) >= 0)} active={this.props.currentPostbases.indexOf(16) >= 0}>{nounPostbases[16].description}</Button></Card>
              <Card><Button toggle key={11} onClick={this.props.setPostbase.bind(this, 11)} disabled={(this.props.allowable_next_ids.indexOf(11) >= 0)} active={this.props.currentPostbases.indexOf(11) >= 0}>{nounPostbases[11].description}</Button></Card>
              <Card><Button toggle key={12} onClick={this.props.setPostbase.bind(this, 12)} disabled={(this.props.allowable_next_ids.indexOf(12) >= 0)} active={this.props.currentPostbases.indexOf(12) >= 0}>{nounPostbases[12].description}</Button></Card>
              <Card><Button toggle key={13} onClick={this.props.setPostbase.bind(this, 13)} disabled={(this.props.allowable_next_ids.indexOf(13) >= 0)} active={this.props.currentPostbases.indexOf(13) >= 0}>{nounPostbases[13].description}</Button></Card>
              <Card><Button toggle key={14} onClick={this.props.setPostbase.bind(this, 14)} disabled={(this.props.allowable_next_ids.indexOf(14) >= 0)} active={this.props.currentPostbases.indexOf(14) >= 0}>{nounPostbases[14].description}</Button></Card>
              <Card><Button toggle key={15} onClick={this.props.setPostbase.bind(this, 15)} disabled={(this.props.allowable_next_ids.indexOf(15) >= 0)} active={this.props.currentPostbases.indexOf(15) >= 0}>{nounPostbases[15].description}</Button></Card>
              <Card><Button toggle key={17} onClick={this.props.setPostbase.bind(this, 17)} disabled={(this.props.allowable_next_ids.indexOf(17) >= 0)} active={this.props.currentPostbases.indexOf(17) >= 0}>{nounPostbases[17].description}</Button></Card>
              <Card><Button toggle key={18} onClick={this.props.setPostbase.bind(this, 18)} disabled={(this.props.allowable_next_ids.indexOf(18) >= 0)} active={this.props.currentPostbases.indexOf(18) >= 0}>{nounPostbases[18].description}</Button></Card>
              <Card><Button toggle key={19} onClick={this.props.setPostbase.bind(this, 19)} disabled={(this.props.allowable_next_ids.indexOf(19) >= 0)} active={this.props.currentPostbases.indexOf(19) >= 0}>{nounPostbases[19].description}</Button></Card>
              <Card><Button toggle key={20} onClick={this.props.setPostbase.bind(this, 20)} disabled={(this.props.allowable_next_ids.indexOf(20) >= 0)} active={this.props.currentPostbases.indexOf(20) >= 0}>{nounPostbases[20].description}</Button></Card>
              <Card><Button toggle key={21} onClick={this.props.setPostbase.bind(this, 21)} disabled={(this.props.allowable_next_ids.indexOf(21) >= 0)} active={this.props.currentPostbases.indexOf(21) >= 0}>{nounPostbases[21].description}</Button></Card>
          </Card.Group>
        </Card.Content>
      </Card>
    );
  }
}
export default YupikNounVerbPostbases;
