import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Button, Segment, Grid } from 'semantic-ui-react';
import YupikNounHowMany from './YupikNounHowMany.js';
import YupikNounPossessor from './YupikNounPossessor.js';
import YupikNounNounPostbases from './YupikNounNounPostbases.js';
import YupikNounEndingMoods from './YupikNounEndingMoods.js';
import YupikNounVerbPostbases from './YupikNounVerbPostbases.js';
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
            <YupikNounNounPostbases {...this.props} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <YupikNounEndingMoods {...this.props} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <YupikNounVerbPostbases {...this.props} />
        </Grid.Row>
      </Grid>

    );
  }
}
export default YupikAllNounPostbases;
