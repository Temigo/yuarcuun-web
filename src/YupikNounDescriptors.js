import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Button, Segment, Grid } from 'semantic-ui-react';
import { nounPostbases } from './constants.js';
import YupikNounHowMany from './YupikNounHowMany.js';
import YupikNounPossessor from './YupikNounPossessor.js';

class YupikNounDescriptors extends Component {
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
            <Button.Group inverted color='violet' vertical>
              <Segment>
                Noun -> Noun Postbases (Adjectival)
                <Button as='h4' toggle key={0} onClick={this.props.setPostbase.bind(this, 0)} disabled={(this.props.allowable_next_ids.indexOf(0) < 0)} active={this.props.currentPostbases.indexOf(0) >= 0}>{nounPostbases[0].description}</Button>
                <Button as='h4' toggle key={1} onClick={this.props.setPostbase.bind(this, 1)} disabled={(this.props.allowable_next_ids.indexOf(1) < 1)} active={this.props.currentPostbases.indexOf(1) >= 0}>{nounPostbases[1].description}</Button>
                <Button as='h4' toggle key={2} onClick={this.props.setPostbase.bind(this, 2)} disabled={(this.props.allowable_next_ids.indexOf(2) < 2)} active={this.props.currentPostbases.indexOf(2) >= 0}>{nounPostbases[2].description}</Button>
                <Button as='h4' toggle key={3} onClick={this.props.setPostbase.bind(this, 3)} disabled={(this.props.allowable_next_ids.indexOf(3) < 3)} active={this.props.currentPostbases.indexOf(3) >= 0}>{nounPostbases[3].description}</Button>
                <Button as='h4' toggle key={4} onClick={this.props.setPostbase.bind(this, 4)} disabled={(this.props.allowable_next_ids.indexOf(4) < 4)} active={this.props.currentPostbases.indexOf(4) >= 0}>{nounPostbases[4].description}</Button>
                <Button as='h4' toggle key={5} onClick={this.props.setPostbase.bind(this, 5)} disabled={(this.props.allowable_next_ids.indexOf(5) < 5)} active={this.props.currentPostbases.indexOf(5) >= 0}>{nounPostbases[5].description}</Button>
                <Button as='h4' toggle key={6} onClick={this.props.setPostbase.bind(this, 6)} disabled={(this.props.allowable_next_ids.indexOf(6) < 6)} active={this.props.currentPostbases.indexOf(6) >= 0}>{nounPostbases[6].description}</Button>
              </Segment>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button.Group inverted color='violet' vertical>
              <Segment>
                Noun -> Noun Postbases (Endings)
                <Button as='h4' toggle key={7} onClick={this.props.setPostbase.bind(this, 7)} disabled={(this.props.allowable_next_ids.indexOf(7) < 7)} active={this.props.currentPostbases.indexOf(7) >= 0}>{nounPostbases[7].description}</Button>
                <Button as='h4' toggle key={8} onClick={this.props.setPostbase.bind(this, 8)} disabled={(this.props.allowable_next_ids.indexOf(8) < 8)} active={this.props.currentPostbases.indexOf(8) >= 0}>{nounPostbases[8].description}</Button>
                <Button as='h4' toggle key={9} onClick={this.props.setPostbase.bind(this, 9)} disabled={(this.props.allowable_next_ids.indexOf(9) < 9)} active={this.props.currentPostbases.indexOf(9) >= 0}>{nounPostbases[9].description}</Button>
                <Button as='h4' toggle key={10} onClick={this.props.setPostbase.bind(this, 10)} disabled={(this.props.allowable_next_ids.indexOf(10) < 10)} active={this.props.currentPostbases.indexOf(10) >= 0}>{nounPostbases[10].description}</Button>
              </Segment>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default YupikNounDescriptors;
