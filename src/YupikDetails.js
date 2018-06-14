import React, { Component } from 'react';
import { Container, Header, Image, Divider, Grid, Icon, Input, List, Button } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';

const postbases = [
  {
    description: 'to love',
    englishModifier: (english) => { return 'love to ' + english; },
    expression: '@~+yunqegg-',
    group: 'love',
    priority: 4,
    common: true,
    transitive: true,
    intransitive: true,
    tense:false,
  },
  {
    description: 'to want',
    englishModifier: (english) => { return 'want to ' + english; },
    expression: '@~+yug-',
    group: 'love',
    priority: 4,
    common: true,
    transitive: true,
    intransitive: true,
    tense: false,
  },
  {
    description: 'Paste tense',
    englishModifier: (english) => { return nlp(english).sentences().toPastTense().out('text'); },
    expression: '-llru-',
    group: 'past',
    priority: 5,
    common: true,
    transitive: true,
    intransitive: true,
    tense: true,
  },
];

class YupikDetails extends Component {
  constructor(props) {
    super(props);
    console.log(API_URL);
    // FIXME some way of locating the verb only
    let currentVerb = props.word.english.replace('to', '');
    this.state = {
      currentWord: props.word.yupik,
      modifiedWord: props.word.yupik,
      currentEnglish: currentVerb,
      modifiedEnglish: props.word.english,//new Inflectors(currentVerb),
      people: 0,
      person: 0,
      fullWord: props.word,
      currentPostbases: [],
    };

    this.modifyWord = this.modifyWord.bind(this);
    //console.log(nlp(props.word.english).sentences().toFutureTense().out('text'));
  }

  componentWillUpdate(newProps, newState) {
    if (newState.people != this.state.people || newState.person != this.state.person) {
      this.modifyWord(newState.person, newState.people, this.state.currentWord, this.state.currentPostbases);
    }
  }

  setPeople(people, event, data) {
    console.log(this.state.people == people);
    this.setState({ people: (this.state.people == people) ? 0 : people });
  }

  setPerson(person, event, data) {
    this.setState({ person: (this.state.person == person) ? 0 : person });
  }

  speak(event, data) {
      let audio = new Audio(API_URL + "/tts/" + this.state.modifiedWord.replace('-', ''));
      audio.play();
  }

  modifyWord(person, people, word, currentPostbases) {
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
    let person_english = {
      0: '',
      1: 'I',
      2: 'You',
      3: 'He',
    };
    let people_english = {
      0: '',
      1: '(1)',
      2: '(2)',
      3: '(3+)',
    }
    currentPostbases = currentPostbases.sort((p1, p2) => {
      return (postbases[p1].priority > postbases[p2].priority) ? 1 : ((postbases[p1].priority < postbases[p2].priority) ? -1 : 0);
    });
    let newEnglish =  this.state.currentEnglish;
    //newEnglish = nlp(newEnglish).sentences().toPresentTense().out('text');
    // FIXME remove dash for verbs only
    currentPostbases.forEach((p) => {
      if (!postbases[p].tense) {
        newEnglish = postbases[p].englishModifier(newEnglish);
      }
    });
    newEnglish = person_english[person] + ' ' + newEnglish  + ' ' + people_english[people];
    currentPostbases.forEach((p) => {
      if (postbases[p].tense) {
        newEnglish = postbases[p].englishModifier(newEnglish);
      }
    });
    let postbasesList = currentPostbases.map((p) => {
      return postbases[p].expression;
    }).concat([endings[people][person]]);
    let postbasesString = "";
    postbasesList.forEach((e) => {
      postbasesString = postbasesString + "&postbase='" + e + "'";
    });

    axios
      .get(API_URL + "/concat?root=" + word.replace('-', '') + postbasesString)
      .then(response => {
        this.setState({ modifiedWord: response.data.concat, modifiedEnglish: newEnglish, currentPostbases: currentPostbases});
      });
  }

  setPostbase(postbase_id, event, data) {
    event.preventDefault();
    let index = this.state.currentPostbases.indexOf(postbase_id);
    let currentPostbases = this.state.currentPostbases;
    if (index > -1) {
      currentPostbases.splice(index, 1);
    }
    else {
      let newGroup = true;
      currentPostbases.forEach((id) => {
        console.log( postbases[id].group !== postbases[postbase_id].group);
        newGroup = newGroup && postbases[id].group !== postbases[postbase_id].group;
      });
      if (newGroup) {
        currentPostbases.push(postbase_id);
      }

    }
    this.modifyWord(this.state.person, this.state.people, this.state.currentWord, currentPostbases);
  }

  render() {
    console.log(this.state);
    return (
      <Container>
        <Header textAlign='center'>
          {this.state.modifiedWord}
          <Header.Subheader>
            {this.state.modifiedEnglish}
          </Header.Subheader>
        </Header>
        <Container textAlign='center'>
          <Button circular color='blue' icon='volume up' onClick={this.speak.bind(this)} />
        </Container>
        {(this.state.fullWord.rootForm == 'verb') ?
        <Container>
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
          {postbases.map((postbase, id) => {
            return (
              <Button toggle key={id} onClick={this.setPostbase.bind(this, id)} active={this.state.currentPostbases.indexOf(id) >= 0}>{postbase.description}</Button>
            );
          })}
        </Container>
        : ''}

      </Container>
    );
  }
}

export default YupikDetails;
