import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import YupikModifyNoun from './YupikModifyNoun.js';
import YupikModifyVerb from './YupikModifyVerb.js';
import { Card, Button } from 'semantic-ui-react';
import { postbaseButtons, enclitics } from './modifyVerbOptions.js';
import { postbases } from './constants.js';

class YupikPostbase extends Component {
  render() {
    let group_id = this.props.match.params.postbase_group_id;
    //console.log(postbaseButtons, group_id);
    // postbaseButtons.forEach((p) => { console.log(p, p.activeIndex, p.activeIndex == group_id, p.activeIndex == parseInt(group_id)); })
    // console.log(postbaseButtons.filter((p) => { p.activeIndex == parseInt(group_id) }))
    let group = postbaseButtons.find((p) => { return p.activeIndex == group_id });
    return (
      <Card.Group stackable itemsPerRow={3}>
        {group.indexes.map((e) => {
          return (
            <Card>
            <Button
              onClick={(event) => {
                this.props.setPostbase(e, event)
              } }
              toggle
              disabled={(this.props.allowable_next_ids.indexOf(e) < e)}
              active={this.props.currentPostbases.indexOf(e) >= 0}
              >
              {postbases[e].description}
            </Button>
            </Card>
          );
        })}
      </Card.Group>
    );
  }
}
export default YupikPostbase;
