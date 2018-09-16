import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Segment, Button, Card } from 'semantic-ui-react';
import { nounPostbases } from './constants.js';

class YupikNounEndingMoods extends Component {
  render() {
    return (
      <Card color='pink'>
        <Card.Content>
          <Card.Header>
            Ending Moods
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Group>
            <Card><Button onClick={this.props.setMood.bind(this,'relative')} active={this.props.mood=='relative'}>relative</Button></Card>
            <Card><Button onClick={this.props.setMood.bind(this,'localis')} active={this.props.mood=='localis'}>localis</Button></Card>
            <Card><Button onClick={this.props.setMood.bind(this,'ablative')} active={this.props.mood=='ablative'}>ablative</Button></Card>
            <Card><Button onClick={this.props.setMood.bind(this,'terminalis')} active={this.props.mood=='terminalis'}>terminalis</Button></Card>
            <Card><Button onClick={this.props.setMood.bind(this,'vialis')} active={this.props.mood=='vialis'}>vialis</Button></Card>
            <Card><Button onClick={this.props.setMood.bind(this,'equalis')} active={this.props.mood=='equalis'}>equalis</Button></Card>
          </Card.Group>
        </Card.Content>
      </Card>
    );
  }
}
export default YupikNounEndingMoods;
