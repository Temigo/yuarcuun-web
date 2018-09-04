import React, { Component } from 'react';
import { Container, Header, Dropdown, Grid, Icon, Button } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';
import YupikEntry from './YupikEntry.js';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';

class YupikDetails extends Component {
  constructor(props) {
    super(props);
    console.log("YupikDetails props: ", props);
    this.state = {
      search: props.location.state == undefined ? '' : props.location.state.search ,
      wordsList: props.location.state == undefined ? [] : props.location.state.wordsList,
      currentWord: "",//props.word.yupik,
      modifiedWord: "",//props.word.yupik,
      fullWord: "",//props.word,
      fromSearch: props.location.state !== undefined,
    };
    this.getWord = this.getWord.bind(this);

    if (props.location.state == undefined) { // from search page
      let word = props.match.params.word;
      this.getWord(word);
    }
    else {
      this.state = {
        ...this.state,
        currentWord: this.props.location.state.word.yupik,
        modifiedWord: this.props.location.state.word.yupik,
        fullWord: this.props.location.state.word
      };
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.word !== this.props.match.params.word) {
      this.getWord(this.props.match.params.word);
    }
  }

  getWord(word) {
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

  speak(event, data) {
      let audio = new Audio(API_URL + "/tts/" + this.state.modifiedWord.replace('-', ''));
      audio.play();
  }

  render() {
    console.log("YupikDetails state: ", this.state);
    let numEntries = Object.keys(this.state.fullWord).filter((entryNumber) => { return entryNumber !== 'english' && entryNumber !== 'yupik'; }).length;
    return (
      <Container text location={this.props.location}>
        <Header dividing as='h1' textAlign='center'>
          {this.state.currentWord}
          <Icon name='volume up' color='teal' size='mini' onClick={this.speak.bind(this)} />
        </Header>

        <Button primary icon circular onClick={() => { this.props.history.push('/', { search: this.state.search, wordsList: this.state.wordsList }); }}>
          <Icon name='chevron left' />
        </Button>


        {Object.keys(this.state.fullWord).map((entryNumber) => {
          if (entryNumber == 'english' || entryNumber == 'yupik') {
            return '';
          }
          else {
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

export default withRouter(YupikDetails);
