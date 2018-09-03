import React, { Component } from 'react';
import { Segment, Button, List, Header, Label } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';
import { Link } from 'react-router-dom';

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

  render() {
    return (
      <Segment style={{fontSize:'20px'}}>
      <p>
      {this.state.entry.descriptor.map((descriptor) => {
        return <Label color='blue' horizontal key={descriptor}>{descriptor.toUpperCase()}</Label>;
      })}

      {this.state.displayEntryNumber == true ?  //if multiple entries
        <span><span style={{ fontWeight: 'bold' }}>{this.state.entryNumber} </span>   {this.state.entry.definition}</span>
        :
        <span>{this.state.entry.definition}</span>
      }
      </p>

      {this.state.entry.usage.length > 0 ? <Header as='h2'> Main Usage</Header> : ''}
      <List bulleted>
      {this.state.entry.usage.map((usage, index) => {
        return (

          <List.Item key={usage} style={{fontStyle:'italic'}}>
          <Link  to={{pathname: '/' + this.state.word + '/' + index + '/modify', state: { entry: this.state.entry, word: this.state.word }}}>
            <List.Header>{usage[0]}</List.Header>
            <List.Description>{usage[1]}</List.Description>
          </Link>
          </List.Item>

         );
      })
      }
      </List>

      {this.state.entry.synonyms.length > 0 ? <Header as='h2'> Synonyms</Header> : ''}
      <List bulleted horizontal>
      {this.state.entry.synonyms.map(function(synonym,index){
        return (
          <List.Item key={synonym}>
            <Link style={{fontStyle:'italic'}} to={'/' + synonym}>{synonym}</Link>
          </List.Item>
         );
      })
      }
      </List>

      {this.state.entry.example_sentence.length > 0 ? <Header as='h2'> Example Sentences </Header> : ''}
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

      {this.state.entry.related_words.length > 0 ? <Header as='h2'> Related Words </Header> : ''}
      <List bulleted horizontal>
      {this.state.entry.related_words.map(function(related_words,index){
        return (
          <List.Item key={related_words}>
            <Link style={{fontStyle:'italic'}} to={'/' + related_words}>{related_words}</Link>
          </List.Item>
         );
      })
      }
      </List>

      {this.state.entry.additional_info.length > 0 ? <Header as='h2'> Additional Information </Header> : ''}
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

      </Segment>
    );
  }
}

export default YupikEntry;
