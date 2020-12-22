import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';
import axios from 'axios';
import { API_URL } from '../App.js';
import YupikEntry from './YupikEntry.js';
import {withRouter} from 'react-router';
import StickyMenu from './common/StickyMenu.js';

class YupikDetails extends Component {
  constructor(props) {
    super(props);
    console.log("YupikDetails props: ", props);
    this.state = {
      search: props.location.state === undefined ? '' : props.location.state.search ,
      wordsList: props.location.state === undefined ? [] : props.location.state.wordsList,
      yugtunAnalyzer: props.location.state === undefined ? false : props.location.state.yugtunAnalyzer,
      currentWord: "",
      modifiedWord: "",
      fullWord: "",
      fromSearch: props.location.state !== undefined
    };
    this.getWord = this.getWord.bind(this);
    // Fetch more word informations from API
    this.getWord(decodeURI(props.match.params.word));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.word !== this.props.match.params.word) {
      this.getWord(decodeURI(this.props.match.params.word));
    }
  }

  getWord(word) {
    axios
      .get(API_URL + "/word/" + encodeURIComponent(word))
      .then(response => {
        console.log(response.data);
        this.setState({
          currentWord: response.data.yupik,
          modifiedWord: response.data.yupik,
          fullWord: response.data
        });
      });
  }

  render() {
    let numEntries = Object.keys(this.state.fullWord).filter((entryNumber) => {
      return entryNumber !== 'english' && entryNumber !== 'yupik';
    }).length;
    return (
      <div>
      <StickyMenu
        word={this.state.currentWord}
        goBack={() => { this.props.history.push({pathname: '/', state: this.props.location.state }) }}
        displaySimple
        {...this.props}
      />
      <Container text style={{ marginTop: '5em'}}>
        {Object.keys(this.state.fullWord).map((entryNumber) => {
          if (entryNumber === 'english' || entryNumber === 'yupik') {
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
      </div>
    );
  }
}

export default withRouter(YupikDetails);
