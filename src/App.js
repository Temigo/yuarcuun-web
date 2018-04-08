import React, { Component } from 'react';
import axios from 'axios';
import { Container, Header, Image, Divider, Grid, Icon, Input } from 'semantic-ui-react';
import './App.css';
import './semantic/dist/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsList: [],
    }
  }
  componentDidMount() {
    console.log("did mount");
    axios
      .get("http://localhost:8000/noun/all")
      .then(response => {
        this.setState({ wordsList: response.data });
      });
  }
  
  render() {
    return (
      <Container text>
        <Header as='h1' dividing>
          Yuarcuun
        </Header>
        <Input placeholder='Search...' icon='search' fluid />
      </Container>
    );
  }
}

export default App;
