import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Button, Segment, Grid } from 'semantic-ui-react';
import YupikNounHowMany from './YupikNounHowMany.js';
import YupikNounPossessor from './YupikNounPossessor.js';
import { nounPostbases } from './constants.js';

class YupikAllNounPostbases extends Component {
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
        <Grid.Row>
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
        </Grid.Row>
      </Grid>

    );
  }
}
export default YupikAllNounPostbases;
