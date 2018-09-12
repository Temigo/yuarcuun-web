import React, { Component } from 'react';
import axios from 'axios';
import elasticlunr from 'elasticlunr';
import { Container, Header, Divider, Grid, Input, List, } from 'semantic-ui-react';
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
      search: props.location.state == undefined ? '' : props.location.state.search,
      currentWord: {},
      startingSearch: true,
    }
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.selectWord = this.selectWord.bind(this);

    this.index = elasticlunr(function () {
      this.addField('english');
      this.addField('yupik');
      this.setRef("yupik");
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
          this.index.addDoc(word);
        });
        this.setState({ dictionary: response.data });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dictionary.length != this.state.dictionary.length) {
      this.onChangeSearch(undefined, {value: this.state.search});
    }
  }

  onChangeSearch(event, data) {
    let newStartingSearch = event == undefined;
    let new_search = data.value;
    if (new_search.length >= 2) {
      // Search
      let results = this.index.search(new_search);
      let wordsList = results.map((e) => {
        return this.index.documentStore.getDoc(e.ref);
      });
      this.setState({ startingSearch: newStartingSearch, wordsList: wordsList.sort((w1, w2) => { return (w1.yupik > w2.yupik) ? 1 : ((w1.yupik < w2.yupik) ? -1 : 0); }), search: new_search });
    }
    else {
      this.setState({ startingSearch: newStartingSearch, search: new_search });
    }
  }

  selectWord(word, event) {
    this.setState({ currentWord: word });
  }

  resetCurrentWord(event, data) {
    this.setState({ currentWord: {} });
  }

  render() {
    console.log("SearchPage state: ", this.state);
    let displayList = this.state.search.length >= 2 && this.state.wordsList.length > 0;
    let displayWord = this.state.currentWord.yupik !== undefined;
    return (
      <div>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign={(displayList || !this.state.startingSearch) ? 'top' : 'middle'}>
      <Grid.Row style={displayList ? {height: 'auto'} : {height: '90%'}}>
      <Grid.Column style={{ maxWidth: 800, padding: 10 }} textAlign='left'>
        <Header as='h1' dividing>
          Yuarcuun
        </Header>
        <Container>
          <Input
            placeholder='Search...'
            icon='search'
            iconPosition='left'
            size='huge'
            onChange={this.onChangeSearch}
            value={this.state.search}
            fluid transparent />
          <List divided selection>
            {displayList ? this.state.wordsList.map((word) => {
              return (

                <List.Item key={word.yupik}>
                <Link to={{pathname: '/' + word.yupik, state: { word: word, search: this.state.search, wordsList: this.state.wordsList }}}>
                  <List.Content>
                    <List.Header>{word.yupik}</List.Header>
                    <List.Description>{word.english}</List.Description>
                  </List.Content>
                </Link>
                </List.Item>

              );
            }) : ''}
          </List>
        </Container>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign='bottom' style={{height: '10%'}}>
          <Grid.Column>
            <Container textAlign='left'>
              <Divider fluid />
              <List horizontal bulleted>
                <List.Item> © Yugtun by Christopher W. Liu</List.Item>
                <List.Item> <Link to='/about'>About</Link> </List.Item>
                <List.Item> contact@yugtun.com</List.Item>
              </List>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      </div>
    );
  }
}

export default SearchPage;
