import React, { Component } from 'react';
import { Segment, List, Header, Label, Grid , Icon} from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';

class YupikEntry extends Component {
  constructor(props) {
    super(props);
    console.log("YupikEntry props: ", props);

    this.state = {
      entry: props.entry,
      word: props.word,
      displayEntryNumber: props.displayEntryNumber,
      entryNumber: props.entryNumber
    };

  }

  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) {
      this.setState({
        entry: this.props.entry,
        word: this.props.word,
        displayEntryNumber: this.props.displayEntryNumber,
        entryNumber: this.props.entryNumber
      });
    }
  }
  fontUsage(word) {
    if (this.state.entry.descriptor == 'noun') {
      return ['(root form)','','','','']
    }
    let new_state = {};
    let text1 = ''
    let sub = ''
    let text2 = ''
    let obj = ''
    let text3 = ''

    let res = word
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


    return (
      <Segment style={{fontSize:'1em'}}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
          <Header as='h2'>Definition</Header>
          {this.state.entry.descriptor.map((descriptor) => {
            return <Label color='blue' horizontal key={descriptor}>{descriptor.toUpperCase()}</Label>;
          })}
          {this.state.displayEntryNumber === true ?  //if multiple entries
            <span><span style={{ fontWeight: 'bold' }}>{this.state.entryNumber} </span>   {this.state.entry.definition}</span>
            :
            <span>{this.state.entry.definition}</span>
          }
          </Grid.Column>
        </Grid.Row>


        {this.state.entry.usage.length > 0 ? (
          <Grid.Row>
            <Grid.Column>
            <Header as='h2'>Add Postbases</Header>
            <List ordered selection celled>
            {this.state.entry.usage.map((usage, index) => {
              return (
                <List.Item key={usage} style={{fontStyle:'italic'} }>
                  <List.Content floated='right'>
                    <Icon size='big' name='angle right' />
                  </List.Content>
                <Link  to={{pathname: '/' + this.state.word + '/' + this.props.entryNumber + '/'+ index + '/modify/' + (this.state.entry.descriptor[0].includes('verb') ? 'verb' : 'noun'), state: { entry: this.state.entry, word: this.state.word }}}>
                  <List.Header>{usage[0]}</List.Header>
                  <List.Description>
                  {this.fontUsage(usage[1])[0]}
                  <span style={{color: '#cc6600'}}> <b>{this.fontUsage(usage[1])[1]} </b></span>
                  {this.fontUsage(usage[1])[2]}
                  <span style={{color: '#cc6600'}}> <b>{this.fontUsage(usage[1])[3]} </b></span>
                  {this.fontUsage(usage[1])[4]}
                  </List.Description>
                </Link>
                </List.Item>
               );
            })
            }
            </List>
            </Grid.Column>
          </Grid.Row>
        ) : ''}

        {this.state.entry.synonyms.length > 0 ? (
          <Grid.Row>
            <Grid.Column>
            <Header as='h2'> Synonyms</Header>
            <List bulleted horizontal size='large'>
            {this.state.entry.synonyms.map(function(synonym,index){
              return (
                <List.Item key={synonym}>
                  <Link style={{fontStyle:'italic'}} to={'/' + synonym}>{synonym}</Link>
                </List.Item>
               );
            })
            }
            </List>
            </Grid.Column>
          </Grid.Row>
        ) : ''}

        {this.state.entry.example_sentence.length > 0 ? (
          <Grid.Row>
            <Grid.Column>
            <Header as='h2'> Example Sentences </Header>
            <List>
            {this.state.entry.example_sentence.map((sentence) => {
              return (
                <List.Item key={sentence[0]}>
                  <List.Header>{sentence[0]}</List.Header>
                  <List.Description>{sentence[1]}</List.Description>
                </List.Item>
               );
            })
            }
            </List>
            </Grid.Column>
          </Grid.Row>
        ) : ''}


      {this.state.entry.related_words.length > 0 ? (
        <Grid.Row>
          <Grid.Column>
          <Header as='h2'> Related Words </Header>
          <List bulleted horizontal size='large'>
          {this.state.entry.related_words.map(function(related_words,index){
            return (
              <List.Item key={related_words}>
                <Link style={{fontStyle:'italic'}} to={'/' + related_words}>{related_words}</Link>
              </List.Item>
             );
          })
          }
          </List>
          </Grid.Column>
        </Grid.Row>
      ) : ''}


      {this.state.entry.additional_info.length > 0 ? (
        <Grid.Row>
          <Grid.Column>
          <Header as='h2'> Additional Information </Header>
          <List bulleted>
          {this.state.entry.additional_info.map((additional_info) => {
            return (
              <List.Item key={additional_info}>
                {additional_info}
              </List.Item>
             );
          })
          }
          </List>
          </Grid.Column>
        </Grid.Row>
      ) : ''}

      </Grid>
      </Segment>
    );
  }
}

export default withRouter(YupikEntry);
