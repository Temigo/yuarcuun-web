import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { interrogative, optative, dependent, verb2noun } from './modifyVerbOptions.js';
import { Card, Button } from 'semantic-ui-react';

class YupikEnding extends Component {
  render() {
    let options = {
      0: interrogative,
      1: optative,
      2: dependent,
      3: verb2noun
    };
    let group_id = this.props.match.params.ending_group_id;
    return (
      <div>
        <Card.Group stackable itemsPerRow={3}>
          {options[group_id].map((e) => {
            return (
              <Card>
              {(group_id == 3) ? 
                <Button onClick={() => this.props.setNounEnding(e.ending)} toggle active={this.props.nounEnding === e.ending}>{e.text}</Button> 
                :
                <Button
                  onClick={() => {
                    (group_id === 3 ? this.props.setNounEnding(e.ending) : this.props.setMood(e.group, e.mood));
                    this.props.history.push(`${this.props.match.url}/postbase`);
                  }}
                  toggle
                  active={(group_id === 3) ? this.props.nounEnding === e.ending : this.props.moodSpecific === e.mood}
                  >
                  {e.mood}
                </Button>
              }
              </Card>
            );              
          })}
        </Card.Group>
      </div>
    );
  }
}
export default YupikEnding;
