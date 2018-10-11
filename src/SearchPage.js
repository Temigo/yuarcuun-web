import React, { Component } from 'react';
import axios from 'axios';
import elasticlunr from 'elasticlunr';
import { Container, Header, Divider, Grid, Input, List, Label, Checkbox, Icon } from 'semantic-ui-react';
import './App.css';
import './semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import { API_URL } from './App.js';

// Cache dictionary
let dictionary = [];

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
      onlyCommon: false,
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
    if (dictionary.length == 0) {
      axios
        .get(API_URL + "/word/all")
        .then(response => {
          response.data.forEach((word) => {
            this.index.addDoc(word);
          });
          this.setState({ dictionary: response.data });
          dictionary = response.data;
          console.log('Fetched dictionary');
        });
    }
    else {
      dictionary.forEach((word) => {
        this.index.addDoc(word);
      });
      this.setState({ dictionary: dictionary });
    }
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

  handleRef = (c) => {
    this.inputRef = c;
  }

  render() {
    console.log("SearchPage state: ", this.state);
    let displayList = this.state.search.length >= 2 && this.state.wordsList.length > 0;
    let displayWord = this.state.currentWord.yupik !== undefined;
    let wordsList = this.state.wordsList;
    let isCommonList = wordsList.map((word) => { return Object.keys(word).some((key) => { return word[key].properties && word[key].properties.indexOf('common') > -1; }); });
    if (this.state.onlyCommon) {
      wordsList = wordsList.filter((word, i) => { return isCommonList[i]; });
    }
    let displayCommonOption = wordsList.some((word, i) => { return isCommonList[i]; }) && wordsList.some((word, i) => { return !isCommonList[i]; });
    return (
      <div>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign={(displayList || !this.state.startingSearch) ? 'top' : 'middle'}>
      <Grid.Row style={displayList ? {height: 'auto'} : {height: '90%'}}>
      <Grid.Column style={{ maxWidth: 800, padding: 10 }} textAlign='left'>
        <Header as='h1' dividing>
          <Link to='/' style={{ color: 'black' }}>Yuarcuun</Link>
        </Header>
        <Container>
          <Grid stackable>
            <Grid.Row >
              <Grid.Column style={{ flex: 1 }}>
              <Input
                ref={this.handleRef}
                placeholder='Search by word...'
                icon='search'
                iconPosition='left'
                size='huge'
                onChange={this.onChangeSearch}
                value={this.state.search}
                fluid transparent />
              </Grid.Column>
              <Grid.Column floated='right'>
                <Icon link name='close' onClick={() => { this.inputRef.focus(); this.setState({search: '', startingSearch: false});}}/>
              </Grid.Column>
            </Grid.Row>
            {displayCommonOption ?
            <Grid.Row>
              <Grid.Column floated='right' style={{ flex: '0 0 17em' }}>
                <Label
                  as='a'
                  content='Show Common Words Only'
                  color='teal'
                  basic={!this.state.onlyCommon}
                  onClick={() => { this.setState({ onlyCommon: !this.state.onlyCommon }); }}
                  />
              </Grid.Column>
            </Grid.Row>
            : ''}
          </Grid>
          <List divided selection>
            {displayList ? wordsList.map((word) => {
              let isCommon = Object.keys(word).some((key) => { return word[key].properties && word[key].properties.indexOf('common') > -1; });
              let isHBC = Object.keys(word).some((key) => { return word[key].properties && word[key].properties.indexOf('HBC') > -1; });
              let isNoun = Object.keys(word).some((key) => { return word[key].descriptor && word[key].descriptor.indexOf('noun') > -1; });
              let isVerb = Object.keys(word).some((key) => { return word[key].descriptor && word[key].descriptor.indexOf('verb') > -1; });
              let isParticle = Object.keys(word).some((key) => { return word[key].descriptor && word[key].descriptor.indexOf('particle') > -1; });
              let isExpression = Object.keys(word).some((key) => { return word[key].descriptor && word[key].descriptor.indexOf('Common Expression') > -1; });
              return (

                <List.Item key={word.yupik}>
                <Link to={{pathname: '/' + word.yupik, state: { word: word, search: this.state.search, wordsList: this.state.wordsList }}}>
                  <List.Content>
                    <List.Header>
                      {word.yupik}
                      <span style={{ 'margin-left': '10px' }}>
                        {isCommon ? <Label size='mini' color='teal'>COMMON</Label> : ''}
                        {isHBC ? <Label size='mini' color='orange'>HBC DIALECT</Label> : ''}
                        {isNoun ? <Label size='mini' color='grey'>NOUN</Label> : ''}
                        {isVerb ? <Label size='mini' color='brown'>VERB</Label> : ''}
                        {isParticle ? <Label size='mini' color='red'>PARTICLE</Label> : ''}
                        {isExpression ? <Label size='mini' color='green'>EXPRESSION</Label> : ''}
                      </span>
                    </List.Header>
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
                <List.Item> © Yuarcuun </List.Item>
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
