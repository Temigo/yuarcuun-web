import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';
import { Link } from 'react-router-dom';

class YupikEntry extends Component {
  constructor(props) {
    super(props);
    console.log(props.entry);

    this.state = {
      entry: props.entry,
      displayEntryNumber: props.displayEntryNumber,
      entryNumber: props.entryNumber
    };

  }

  render() {
    console.log('hi');
    console.log(this.state.entryNumber)
    return (
      <Segment style={{fontSize:'20px'}}>
      <p> {this.state.entry.descriptor} </p>
      {this.state.displayEntryNumber == true ?  //if multiple entries
        <p> <span style={{ fontWeight: 'bold' }}>{this.state.entryNumber} </span>   {this.state.entry.definition}  </p> 
        : 
        <p> {this.state.entry.definition} </p>
      }

      <button class="fluid ui button"> + Add Endings</button>

      <Segment>
      {this.state.entry.usage.length > 0 ? <span> Main Usage: </span> : ''}
      {this.state.entry.usage.map((usage) => {
        return (
        <li style={{fontStyle:'italic'}} key={usage}>{usage}</li>
         );
      })
      }
      <ul></ul>

      {this.state.entry.synonyms.length > 0 ? <span> Synonyms: </span> : ''}
      {this.state.entry.synonyms.map(function(synonym,index){
        return (
        <Link style={{fontStyle:'italic'}} key={synonym} to={'/' + synonym}>{synonym}, </Link>
         );
      })
      }
      <ul></ul>

      {this.state.entry.example_sentence.length > 0 ? <span> Example Sentences: </span> : ''}
      {this.state.entry.example_sentence.map((sentence) => {
        return (
        <li style={{fontStyle:'italic'}} key={sentence[0]}>{sentence[0]}<br/>{sentence[1]}</li>
         );
      })
      }
      <ul></ul>

      {this.state.entry.related_words.length > 0 ? <span> Related Words: </span> : ''}
      {this.state.entry.related_words.map(function(related_words,index){
        return (
        <Link style={{fontStyle:'italic'}} key={related_words} to={'/' + related_words}>{related_words}, </Link>
         );
      })
      }
      <ul></ul>

      {this.state.entry.additional_info.length > 0 ? <span> Additional Information: </span> : ''}
      {this.state.entry.additional_info.map((additional_info) => {
        return (
        <li style={{fontStyle:'italic'}} key={additional_info}>{additional_info}</li>
         );
      })
      }

      </Segment>
      </Segment>
    );
  }
}

export default YupikEntry;
