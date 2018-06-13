import React, { Component } from 'react';
import { Container, Header, Image, Divider, Grid, Icon, Input, List, Button } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import { API_URL } from './App.js';

class YupikDetails extends Component {
  constructor(props) {
    super(props);
    console.log(API_URL);
    this.state = {
      currentWord: props.word.yupik,
      modifiedWord: props.word.yupik,
      people: 0,
      person: 0,
      fullWord: props.word,
    };

    this.modifyWord = this.modifyWord.bind(this);
  }

  componentWillUpdate(newProps, newState) {
    if (newState.people != this.state.people || newState.person != this.state.person) {
      this.modifyWord(newState.person, newState.people, this.state.currentWord);
    }
  }

  setPeople(people, event, data) {
    this.setState({ people: people });
  }

  setPerson(person, event, data) {
    this.setState({ person: person });
  }

  speak(event, data) {
      let audio = new Audio(API_URL + "/tts/" + this.state.modifiedWord.replace('-', ''));
      audio.play();
  }

  modifyWord(person, people, word) {
    let endings = {
      0: {
        0: '',
        1: '',
        2: '',
        3: '',
      },
      1: { // 1 people
        0: '',
        1: '+\'(g/t)u:6a', // I
        2: '+\'(g/t)uten', // you
        3: '+\'(g/t)uq', // he
      },
      2: {
        0: '',
        1: '+\'(g/t)ukuk', // I
        2: '+\'(g/t)utek', // you
        3: '+\'(g/t)uk', // he
      },
      3: {
        0: '',
        1: '+\'(g/t)ukut',
        2: '+\'(g/t)uci',
        3: '+\'(g/t)ut',
      }
    };
    // FIXME remove dash for verbs only
    axios
      .get(API_URL + "/concat?root=" + word.replace('-', '') + "&postbase='" + endings[people][person] + "'")
      .then(response => {
        console.log(response.data);
        this.setState({ modifiedWord: response.data.concat });
      });
  }

  render() {
    console.log(this.state);
    return (
      <Container>
        <Header textAlign='center'>
          {this.state.modifiedWord}
          <Header.Subheader>
            {this.state.fullWord.english}
          </Header.Subheader>
        </Header>
        <Container textAlign='center'>
          <Button circular color='blue' icon='volume up' onClick={this.speak.bind(this)} />
        </Container>
        <p>How many people are you talking about?</p>
        <Button.Group widths='3' key='0'>
          <Button inverted color='blue' onClick={this.setPeople.bind(this, 1)} active={this.state.people == 1}>1</Button>
          <Button inverted color='blue' onClick={this.setPeople.bind(this, 2)} active={this.state.people == 2}>2</Button>
          <Button inverted color='blue' onClick={this.setPeople.bind(this, 3)} active={this.state.people == 3}>3+</Button>
        </Button.Group>
        <Divider />
        <p>1st, 2nd, or 3rd person point-of-view?</p>
        <Button.Group widths='3' key='1'>
          <Button inverted color='blue' onClick={this.setPerson.bind(this, 1)} active={this.state.person == 1}>I, us two, we</Button>
          <Button inverted color='blue' onClick={this.setPerson.bind(this, 2)} active={this.state.person == 2}>you, you all</Button>
          <Button inverted color='blue' onClick={this.setPerson.bind(this, 3)} active={this.state.person == 3}>he, she, them, it</Button>
        </Button.Group>
        <Divider />

      </Container>
    );
  }
}

export default YupikDetails;
