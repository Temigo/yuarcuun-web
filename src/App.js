import React, { Component } from 'react';
import axios from 'axios';
import elasticlunr from 'elasticlunr';
import { Container, Header, Image, Divider, Grid, Icon, Input, List, Button } from 'semantic-ui-react';
import YupikDetails from './YupikDetails.js';
import './App.css';
import './semantic/dist/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary: [],
      wordsList: [],
      search: '',
      currentWord: '',
    }
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.selectWord = this.selectWord.bind(this);

    this.index = elasticlunr(function () {
      this.addField('english');
      this.addField('yupik');
      this.setRef("id");
    });
  }

  componentDidMount() {
    console.log("did mount");
    axios
      .get("http://yuarcuun.herokuapp.com/noun/all")
      .then(response => {
        console.log(typeof(response.data));
        response.data.forEach((word) => {
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
      this.setState({ wordsList: wordsList, search: new_search });
    }
    else {
      this.setState({ search: new_search });
    }
  }

  selectWord(word, event) {
    console.log(word);
    this.setState({ currentWord: word.yupik });
  }

  resetCurrentWord(event, data) {
    this.setState({ currentWord: '' });
  }

  render() {
    console.log(this.state.wordsList);
    let displayList = this.state.search.length >= 2;
    let displayWord = this.state.currentWord.length > 0;
    return (
      <Container text>
        <Header as='h1' dividing>
          Yuarcuun
        </Header>
        {displayWord ?
        <Container>
          <Button onClick={this.resetCurrentWord.bind(this)}>Return</Button>
          <YupikDetails word={this.state.currentWord}/>
        </Container>
        :
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
                <List.Item key={word.id} onClick={this.selectWord.bind(this, word)}>
                  <List.Content>
                    <List.Header as='p'>{word.yupik}</List.Header>
                    <List.Description>{word.english}</List.Description>
                  </List.Content>
                </List.Item>
              );
            }) : ''}
          </List>
        </Container>
        }
      </Container>
    );
  }
}

export default App;
