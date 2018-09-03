import React, { Component } from 'react';
import { Container, Header, Dropdown, Grid, Icon, Button } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';
import YupikEntry from './YupikEntry.js';
import { Link } from 'react-router-dom';


class YupikDetails extends Component {
  constructor(props) {
    super(props);
    console.log("YupikDetails props: ", props);
    // FIXME some way of locating the verb only
    //let currentVerb = props.word.english.replace('to', '');
    this.state = {
      search: props.location.state == undefined ? '' : props.location.state.search ,
      currentWord: "",//props.word.yupik,
      modifiedWord: "",//props.word.yupik,
      fullWord: "",//props.word,
      fromSearch: props.location.state !== undefined,
    };
    if (props.location.state == undefined) { // from search page
      let word = props.match.params.word;
      axios
        .get(API_URL + "/word/" + word)
        .then(response => {
          this.setState({
            currentWord: response.data.yupik,
            modifiedWord: response.data.yupik,
            fullWord: response.data
          });
        });
    }
    else {
      this.state = {
        ...this.state,
        currentWord: props.location.state.word.yupik,
        modifiedWord: props.location.state.word.yupik,
        fullWord: props.location.state.word
      };
    }
  }


  speak(event, data) {
      let audio = new Audio(API_URL + "/tts/" + this.state.modifiedWord.replace('-', ''));
      audio.play();
  }

  render() {
    console.log(this.state);
    let numEntries = Object.keys(this.state.fullWord).filter((entryNumber) => { return entryNumber !== 'english' && entryNumber !== 'yupik'; }).length;
    console.log(numEntries);
    return (
      <Container text>
        <Button onClick={() => { this.props.history.push('/', { search: this.state.search }); }}>Return</Button>

        <Header dividing as='h1'>
          {this.state.currentWord}
          <Icon name='volume up' color='teal' size='mini' onClick={this.speak.bind(this)} />
        </Header>
        {Object.keys(this.state.fullWord).map((entryNumber) => {
          //console.log(entryNumber);
          //console.log(this.state.fullWord[entryNumber]);
          if (entryNumber == 'english' || entryNumber == 'yupik') {
            return '';
          }
          else {
            console.log(entryNumber);
            return (
              <YupikEntry
                key={entryNumber}
                entry={this.state.fullWord[entryNumber]}
                word={this.state.modifiedWord}
                entryNumber={entryNumber}
                displayEntryNumber={numEntries > 1}
              />
            );
          }
        })}
      </Container>

    );
  }
}

export default YupikDetails;
