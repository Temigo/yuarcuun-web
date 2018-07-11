import React, { Component } from 'react';
import axios from 'axios';
import elasticlunr from 'elasticlunr';
import { Container, Header, Image, Divider, Grid, Icon, Input, List, Button } from 'semantic-ui-react';
import YupikDetails from './YupikDetails.js';
import './App.css';
import './semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import { API_URL } from './App.js';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dictionary: [],
      dictionaryNouns: [],
      dictionaryVerbs: [],
      wordsList: [],
      search: '',
      currentWord: {},
    }
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.selectWord = this.selectWord.bind(this);

    this.index = elasticlunr(function () {
      this.addField('english');
      this.addField('yupik');
      //this.addField('rootForm');
      this.setRef("yupik");
      //this.saveDocument(false);
    });
  }

  componentDidMount() {
    /*axios
      .get(API_URL + "/verb/all")
      .then(response => {
        response.data.forEach((word) => {
          word['rootForm'] = 'verb';
          this.index.addDoc(word);
        });
        this.setState({ dictionaryVerbs: response.data });
      });
    axios
      .get(API_URL + "/noun/all")
      .then(response => {
        response.data.forEach((word) => {
          word['rootForm'] = 'noun';
          this.index.addDoc(word);
        });
        this.setState({ dictionaryNouns: response.data });
      });*/
    axios
      .get(API_URL + "/word/all")
      .then(response => {
        response.data.forEach((word) => {
          //console.log(word);
          this.index.addDoc(word);
        });
        this.setState({ dictionary: response.data });
      });
  }

  onChangeSearch(event, data) {
    let new_search = data.value;
    if (new_search.length >= 2) {
      // Search
      let results = this.index.search(new_search);
      let wordsList = results.map((e) => {
        return this.index.documentStore.getDoc(e.ref);
      });
      console.log(wordsList);
      this.setState({ wordsList: wordsList.sort((w1, w2) => { return (w1.yupik > w2.yupik) ? 1 : ((w1.yupik < w2.yupik) ? -1 : 0); }), search: new_search });
    }
    else {
      this.setState({ search: new_search });
    }
  }

  selectWord(word, event) {
    this.setState({ currentWord: word });
  }

  resetCurrentWord(event, data) {
    this.setState({ currentWord: {} });
  }

  render() {
    console.log(this.state);
    let displayList = this.state.search.length >= 2;
    let displayWord = this.state.currentWord.yupik !== undefined;
    return (
      <Container text>
        <Header as='h1' dividing>
          Yuarcuun
        </Header>
        <Container>
          <Input
            placeholder='Search...'
            icon='search'
            onChange={this.onChangeSearch}
            value={this.state.search}
            fluid />
          <List divided selection>
            {displayList ? this.state.wordsList.map((word) => {
              return (
                <List.Item key={word.yupik}>
                  <List.Content>
                    <List.Header><Link to={{pathname: '/' + word.yupik, state: { word: word }}}>{word.yupik}</Link></List.Header>
                    <List.Description>{word.english}</List.Description>
                  </List.Content>
                </List.Item>
              );
            }) : ''}
          </List>
        </Container>
      </Container>
    );
  }
}

export default SearchPage;
