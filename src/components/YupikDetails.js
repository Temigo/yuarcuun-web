import React, { Component } from 'react';
import '../App.css';
import '../semantic/dist/semantic.min.css';
import { Container } from 'semantic-ui-react';
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
      .get(API_URL + "/word2021/" + encodeURIComponent(word))
      .then(response => {
        // console.log(response.data);
        this.setState({
          currentWord: word,
          modifiedWord: word,
          fullWord: response.data
        });
      });
  }

  render() {
    // console.log(this.state)
    // let numEntries = Object.keys(this.state.fullWord).filter((entryNumber) => {
    //   return entryNumber !== 'english' && entryNumber !== 'yupik';
    // }).length;
    return (
      <Container style={{margin:0,padding:0}} text>
{/*      <StickyMenu
        word={this.state.currentWord.replaceAll(',',', ')}
        goBack={() => { this.props.history.push({pathname: '/', state: this.props.location.state }) }}
        displaySimple
        {...this.props}
      <Container text style={{ marginTop: '7em'}}>
      />*/}
{/*        {Object.keys(this.state.fullWord).map((entryNumber) => {
          if (entryNumber === 'english' || entryNumber === 'yupik') {
            return '';
          }
          else {
            return (*/}
              <YupikEntry
                entry={this.state.fullWord}
                word={this.state.modifiedWord}
              />
{/*            );
          }
        })}*/}
      </Container>
    );
  }
}

export default withRouter(YupikDetails);
