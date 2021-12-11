import React, { Component } from 'react';
import { Segment, List, Header, Label, Grid , Icon} from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';

class YupikEntry extends Component {
  constructor(props) {
    super(props);
    console.log("YupikEntry props: ", props);
    this.state = {
      entry: props.entry,
      word: props.word,
      // displayEntryNumber: props.displayEntryNumber,
      // entryNumber: props.entryNumber
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) {
      this.setState({
        entry: this.props.entry,
        word: this.props.word,
        // displayEntryNumber: this.props.displayEntryNumber,
        // entryNumber: this.props.entryNumber
      });
    }
  }
  fontUsage(word) {
    if (this.state.entry.descriptor[0] === 'noun') {
      return ['(root form)','','','','']
    }
    let text1 = ''
    let sub = ''
    let text2 = ''
    let obj = ''
    let text3 = ''

    let res = word.replace(/\^/g,"")
    var rx1 = /\[([^\]]+)]/;
    var rx2 = /<([^\]]+)>/;
    let subject = word.match(rx1);
    let object = word.match(rx2);
    if (subject !== null) {
      res = res.split(rx1);
      text1 = res[0]
      sub = res[1]
      text2 = res[2]
      res = res[2];
    }
    if (object !== null) {
      res = res.split(rx2);
      text2 = res[0]
      obj = res[1]
      text3 = res[2]
    }
    return [text1, sub, text2, obj, text3]
  }

  render() {
    console.log(this.state)
    return (
      <Segment style={{fontSize:'1em'}}>
      <Grid>

      {this.state.entry !== "" ?
      <Grid.Row>
        <Grid.Column>
        <Header as='h2'>Definition</Header>
          {this.state.entry.definition.map((entry,i) => {
            return <div>
            <span>{i+1+'. '+entry[0]}</span>
            {entry[1][0] !== '' ?
              <Label horizontal>{entry[1]}</Label>
              :
              null
              }
            </div>;
          })}

        <Header as='h2'>Verb Keys</Header>
          {this.state.entry.verbkeyString.keySplit.map((entry,i) => {
            return <div>
            <span>{i+1+'. '+entry[0]}</span>
            {entry[1][0] !== '' ?
              <Label horizontal>{entry[1]}</Label>
              :
              null
              }
            </div>;
          })}


        <Header as='h2'>Verb Definition</Header>
          {this.state.entry.verbkeyString.definition.map((entry,i) => {
            return <div>
            <span>{i+1+'. '+entry[0]}</span>
            {entry[1][0] !== '' ?
              <Label horizontal>{entry[1]}</Label>
              :
              null
              }
            </div>;
          })}

        <Header as='h2'>Base Examples</Header>
            {this.state.entry.baseExamples.map((sentence) => {
              return (
                <List.Item key={sentence[0]}>
                  <List.Header>
                <Link to={{pathname:'/', state: {...this.props.location.state, updateSearchEntry:true, search: sentence[0], activeTabIndex:1}}}>
                  <span style={{textDecoration:'underline'}}>
                  {sentence[0]}
                  </span>
                </Link>
                  </List.Header>
                  <List.Description>{sentence[1]}</List.Description>
                </List.Item>
               );
            })
            }
        </Grid.Column>
      </Grid.Row>
      :
      null
      }
      <a href="https://goo.gl/forms/be5L5cgSQmCJeVDl1" target="_blank" rel="noopener noreferrer">
        <Icon inverted name='exclamation circle' color='grey' size='large' />
        <span style={{color:'grey'}}>Report a mistake</span>
      </a>

      </Grid>
      </Segment>
    );
  }
}

export default withRouter(YupikEntry);
