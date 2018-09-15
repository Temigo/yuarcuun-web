import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Button, Segment, Grid } from 'semantic-ui-react';
import YupikNounHowMany from './YupikNounHowMany.js';
import YupikNounPossessor from './YupikNounPossessor.js';

class YupikNounCombine extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            {this.props.verbEnding== false ? <YupikNounHowMany {...this.props} /> : ''}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <YupikNounPossessor {...this.props} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button.Group inverted color='pink' vertical>
              <Segment>
              Ending Moods
              <Button onClick={this.props.setMood.bind(this,'relative')} active={this.props.mood=='relative'}>relative</Button>
              <Button onClick={this.props.setMood.bind(this,'localis')} active={this.props.mood=='localis'}>localis</Button>
              <Button onClick={this.props.setMood.bind(this,'ablative')} active={this.props.mood=='ablative'}>ablative</Button>
              <Button onClick={this.props.setMood.bind(this,'terminalis')} active={this.props.mood=='terminalis'}>terminalis</Button>
              <Button onClick={this.props.setMood.bind(this,'vialis')} active={this.props.mood=='vialis'}>vialis</Button>
              <Button onClick={this.props.setMood.bind(this,'equalis')} active={this.props.mood=='equalis'}>equalis</Button>
              </Segment>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default YupikNounCombine;
