import React, { Component } from 'react';
import axios from 'axios';
import elasticlunr from 'elasticlunr';
import { Container, Header, Image, Divider, Grid, Icon, Input, List } from 'semantic-ui-react';
import './App.css';
import './semantic/dist/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary: [],
      wordsList: [],
      search: '',
    }
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.index = elasticlunr(function () {
      this.addField('english');
      this.addField('yupik');
      this.setRef("id");
    });
  }
  
  componentDidMount() {
    console.log("did mount");
    axios
      .get("http://localhost:8000/noun/all")
      .then(response => {
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
  
  render() {
    console.log(this.state.wordsList);
    let displayList = this.state.search.length >= 2;
    return (
      <Container text>
        <Header as='h1' dividing>
          Yuarcuun
        </Header>
        <Input 
          placeholder='Search...' 
          icon='search' 
          onChange={this.onChangeSearch}
          fluid />
        <List divided>
          {displayList ? this.state.wordsList.map((word) => {
            return (
              <List.Item key={word.id}>
                <List.Content>
                  <List.Header as='p'>{word.yupik}</List.Header>
                  <List.Description>{word.english}</List.Description>
                </List.Content>
              </List.Item>
            );
          }) : ''}
        </List>
      </Container>
    );
  }
}

export default App;
