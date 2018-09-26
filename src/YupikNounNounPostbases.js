import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Segment, Button, Card } from 'semantic-ui-react';
import { nounPostbases } from './constants.js';

class YupikNounNounPostbases extends Component {
  render() {
    return [
      <Card key='adjectival'>
        <Card.Content>
          <Card.Header>
          Adjectives
          </Card.Header>
        </Card.Content>
        <Card.Content>
        <Card.Group stackable>
            <Card><Button toggle key={0} onClick={this.props.setPostbase.bind(this, 0)} disabled={(this.props.allowable_next_ids.indexOf(0) >= 0)} active={this.props.currentPostbases.indexOf(0) >= 0}>{nounPostbases[0].description}</Button></Card>
            <Card><Button toggle key={1} onClick={this.props.setPostbase.bind(this, 1)} disabled={(this.props.allowable_next_ids.indexOf(1) >= 0)} active={this.props.currentPostbases.indexOf(1) >= 0}>{nounPostbases[1].description}</Button></Card>
            <Card><Button toggle key={2} onClick={this.props.setPostbase.bind(this, 2)} disabled={(this.props.allowable_next_ids.indexOf(2) >= 0)} active={this.props.currentPostbases.indexOf(2) >= 0}>{nounPostbases[2].description}</Button></Card>
            <Card><Button toggle key={3} onClick={this.props.setPostbase.bind(this, 3)} disabled={(this.props.allowable_next_ids.indexOf(3) >= 0)} active={this.props.currentPostbases.indexOf(3) >= 0}>{nounPostbases[3].description}</Button></Card>
            <Card><Button toggle key={4} onClick={this.props.setPostbase.bind(this, 4)} disabled={(this.props.allowable_next_ids.indexOf(4) >= 0)} active={this.props.currentPostbases.indexOf(4) >= 0}>{nounPostbases[4].description}</Button></Card>
            <Card><Button toggle key={5} onClick={this.props.setPostbase.bind(this, 5)} disabled={(this.props.allowable_next_ids.indexOf(5) >= 0)} active={this.props.currentPostbases.indexOf(5) >= 0}>{nounPostbases[5].description}</Button></Card>
            <Card><Button toggle key={6} onClick={this.props.setPostbase.bind(this, 6)} disabled={(this.props.allowable_next_ids.indexOf(6) >= 0)} active={this.props.currentPostbases.indexOf(6) >= 0}>{nounPostbases[6].description}</Button></Card>
        </Card.Group>
        </Card.Content>
      </Card>,
      <Card key='endings' color='violet'>
        <Card.Content>
          <Card.Header>
          Number of objects
          </Card.Header>
        </Card.Content>
        <Card.Content>
        <Card.Group stackable>
            <Card><Button toggle key={7} onClick={this.props.setPostbase.bind(this, 7)} disabled={(this.props.allowable_next_ids.indexOf(7) >= 0)} active={this.props.currentPostbases.indexOf(7) >= 0}>{nounPostbases[7].description}</Button></Card>
            <Card><Button toggle key={8} onClick={this.props.setPostbase.bind(this, 8)} disabled={(this.props.allowable_next_ids.indexOf(8) >= 0)} active={this.props.currentPostbases.indexOf(8) >= 0}>{nounPostbases[8].description}</Button></Card>
            <Card><Button toggle key={9} onClick={this.props.setPostbase.bind(this, 9)} disabled={(this.props.allowable_next_ids.indexOf(9) >= 0)} active={this.props.currentPostbases.indexOf(9) >= 0}>{nounPostbases[9].description}</Button></Card>
            <Card><Button toggle key={10} onClick={this.props.setPostbase.bind(this, 10)} disabled={(this.props.allowable_next_ids.indexOf(10) >= 0)} active={this.props.currentPostbases.indexOf(10) >= 0}>{nounPostbases[10].description}</Button></Card>
        </Card.Group>
        </Card.Content>
      </Card>
    ];
  }
}
export default YupikNounNounPostbases;
