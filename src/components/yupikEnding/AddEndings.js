import React, { Component } from 'react';
import { Container, Header, Image, Divider, Grid, Icon, Input, List, Button, Segment}  from 'semantic-ui-react';
import '../../semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from '../../App.js';
import { Link } from 'react-router-dom';
import { indicative_intransitive_endings, indicative_transitive_endings,
  person_english, people_english } from './AddEndingsHelpers.js';

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
    description: 'past tense',
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

class AddEndings extends Component {
  constructor(props) {
    super(props);
    console.log(props.entry);

    this.state = {
      entry: props.entry,
      displayEntryNumber: props.displayEntryNumber,
      entryNumber: props.entryNumber,
      currentWord: props.currentWord,
      modifiedWord: props.currentWord,
      fullWord: props.currentWord,
      subjectExists: false,
      objectExists: false,
      people: 1,
      person: 3,
      objectPerson: 0,
      objectPeople: 0,
      currentPostbases: [],
    };
    this.modifyWord = this.modifyWord.bind(this);

  }
  componentWillUpdate(newProps, newState) {
    if (newState.people != this.state.people || newState.person != this.state.person || newState.objectPerson != this.state.objectPerson || newState.objectPeople != this.state.objectPeople) {
      this.modifyWord(newState.person, newState.people, newState.objectPerson, newState.objectPeople, this.state.currentWord, this.state.currentPostbases);
    }
  }

  setPeople(people, event, data) {
    //console.log(this.state.people == people);
    this.setState({ people: (this.state.people == people) ? 0 : people });
  }

  setPerson(person, event, data) {
    this.setState({ person: (this.state.person == person) ? 0 : person });
  }

  setObjectPeople(objectPeople, event, data) {
    //console.log(this.state.objectPeople == objectPeople);
    this.setState({ objectPeople: (this.state.objectPeople == objectPeople) ? 0 : objectPeople });
  }

  setObjectPerson(objectPerson, event, data) {
    this.setState({ objectExists: (this.state.objectPerson == objectPerson) ? false : true });
    this.setState({ objectPerson: (this.state.objectPerson == objectPerson) ? 0 : objectPerson });
  }

  speak(event, data) {
      let audio = new Audio(API_URL + "/tts/" + this.state.modifiedWord.replace('-', ''));
      audio.play();
  }

  modifyWord(person, people, objectPerson, objectPeople, word, currentPostbases) {
    currentPostbases = currentPostbases.sort((p1, p2) => {
      return (postbases[p1].priority > postbases[p2].priority) ? 1 : ((postbases[p1].priority < postbases[p2].priority) ? -1 : 0);
    });
    let postbasesList = currentPostbases.map((p) => {
      return postbases[p].expression;
    }).concat([indicative_transitive_endings[person][people][objectPerson][objectPeople]]);
    let postbasesString = "";
    console.log(postbasesList)

    postbasesList.forEach((e) => {
      postbasesString = postbasesString + "&postbase='" + e + "'";
    });

    axios
      .get(API_URL + "/concat?root=" + word.replace('-', '') + postbasesString)
      .then(response => {
        this.setState({ modifiedWord: response.data.concat, currentPostbases: currentPostbases}); //removed  modifiedEnglish: newEnglish
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
        newGroup = newGroup && postbases[id].group !== postbases[postbase_id].group;
      });
      if (newGroup) {
        currentPostbases.push(postbase_id);
      }
    }
    this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.currentWord, currentPostbases);
  }

  render() {
    return (
      <Container>
        <Header textAlign='center'>
        {this.state.modifiedWord}
          <Header.Subheader>
           {this.state.entry.definition}
          </Header.Subheader>
        </Header>

        <Container textAlign='center'>
          <Button circular color='blue' icon='volume up' />
        </Container>

        <Divider />
        <div class="ui grid">
          <div class="four wide centered column">
          {(this.state.person == 1 && this.state.people == 1) ? 'I'
          :(this.state.person == 1 && this.state.people == 2) ? 'We (two)'
          :(this.state.person == 1 && this.state.people == 3) ? 'We (3+)'
          :(this.state.person == 2 && this.state.people == 1) ? 'You'
          :(this.state.person == 2 && this.state.people == 2) ? 'You two'
          :(this.state.person == 2 && this.state.people == 3) ? 'You all (3+)'
          :(this.state.person == 3 && this.state.people == 1) ? 'She/He/It'
          :(this.state.person == 3 && this.state.people == 2) ? 'They two'
          :(this.state.person == 3 && this.state.people == 3) ? 'They all (3+)'
          :''}
          </div>
          <div class="eight wide centered column">{this.state.entry.definition}</div>
          <div class="four wide centered column">
          {(this.state.objectPerson == 1 && this.state.objectPeople == 1) ? 'me'
          :(this.state.objectPerson == 1 && this.state.objectPeople == 2) ? 'us two'
          :(this.state.objectPerson == 1 && this.state.objectPeople == 3) ? 'us (3+)'
          :(this.state.objectPerson == 2 && this.state.objectPeople == 1) ? 'you'
          :(this.state.objectPerson == 2 && this.state.objectPeople == 2) ? 'you two'
          :(this.state.objectPerson == 2 && this.state.objectPeople == 3) ? 'you (3+)'
          :(this.state.objectPerson == 3 && this.state.objectPeople == 1) ? 'her/him/it'
          :(this.state.objectPerson == 3 && this.state.objectPeople == 2) ? 'them two'
          :(this.state.objectPerson == 3 && this.state.objectPeople == 3) ? 'them (3+)'
          :''}
          </div>
        </div>
        <Divider />

        <Container>
        <div className="ui equal width grid">
          <div className="equal centered width column">
            <p> Subject </p>
            <div className="ui vertical buttons">
              <Button inverted color='blue' onClick={this.setPerson.bind(this, 1)} active={this.state.person == 1}>I, we (two), we</Button>
              <Button inverted color='blue' onClick={this.setPerson.bind(this, 2)} active={this.state.person == 2}>you, you all</Button>
              <Button inverted color='blue' onClick={this.setPerson.bind(this, 3)} active={this.state.person == 3}>he, she, they, it</Button>
            </div>
            <div className="ui vertical buttons">
              <Button inverted color='blue' onClick={this.setPeople.bind(this, 1)} active={this.state.people == 1}>1</Button>
              <Button inverted color='blue' onClick={this.setPeople.bind(this, 2)} active={this.state.people == 2}>2</Button>
              <Button inverted color='blue' onClick={this.setPeople.bind(this, 3)} active={this.state.people == 3}>3+</Button>
            </div>
          </div>
          <div className="equal centered width column">
            <p> Object </p>
            <div className="ui vertical buttons">
              <Button inverted color='blue' onClick={this.setObjectPerson.bind(this, 1)} active={this.state.objectPerson == 1}>me, us two, us</Button>
              <Button inverted color='blue' onClick={this.setObjectPerson.bind(this, 2)} active={this.state.objectPerson == 2}>you, you all</Button>
              <Button inverted color='blue' onClick={this.setObjectPerson.bind(this, 3)} active={this.state.objectPerson == 3}>her, him, them, it</Button>
            </div>
            <div className="ui vertical buttons">
              <Button inverted color='blue' onClick={this.setObjectPeople.bind(this, 1)} active={this.state.objectPeople == 1}>1</Button>
              <Button inverted color='blue' onClick={this.setObjectPeople.bind(this, 2)} active={this.state.objectPeople == 2}>2</Button>
              <Button inverted color='blue' onClick={this.setObjectPeople.bind(this, 3)} active={this.state.objectPeople == 3}>3+</Button>
            </div>
          </div>
        </div>
          <Divider />
          {postbases.map((postbase, id) => {
            return (
              <Button toggle key={id} onClick={this.setPostbase.bind(this, id)} active={this.state.currentPostbases.indexOf(id) >= 0}>{postbase.description}</Button>
            );
          })}
        </Container>
      </Container>


    );
  }
}

export default AddEndings;
