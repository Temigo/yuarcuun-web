import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Container, Grid, Header, Dropdown, List, Visibility, Icon } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router';

import palette from 'google-palette';
import shuffle from 'shuffle-array';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';

import YupikModify from './YupikModify.js';
import YupikModifyNoun from './YupikModifyNoun.js';
import YupikModifyVerb from './YupikModifyVerb.js';
import StickyMenu from './StickyMenu.js';
import YupikEnding from './YupikEnding.js';
import YupikEndingGroups from './YupikEndingGroups.js';
import YupikPostbaseGroups from './YupikPostbaseGroups.js';
import YupikPostbase from './YupikPostbase.js';
import YupikAllPostbases from './YupikAllPostbases.js';
import YupikAllNounPostbases from './YupikAllNounPostbases.js';
import YupikNounDescriptors from './YupikNounDescriptors.js';
import YupikNounPhrase from './YupikNounPhrase.js';
import YupikNounCombine from './YupikNounCombine.js';
import { options1, options2, options3, postbases, nounPostbases } from './constants.js';
import { interrogative, optative, dependent, verb2noun, postbaseButtons, enclitics } from './modifyVerbOptions.js';
import { nounEndings, indicative_intransitive_endings,
  indicative_transitive_endings, interrogative_intransitive_endings,
  interrogative_transitive_endings, optative_intransitive_endings,
  optative_transitive_endings, subordinative_intransitive_endings,
  subordinative_transitive_endings, connective_intransitive_endings,
  connective_transitive_endings, connective_consonantEnd_intransitive_endings,
  connective_consonantEnd_transitive_endings, connective_contemporative_intransitive_endings,
  connective_contemporative_transitive_endings, connective_conditional_intransitive_endings,
  connective_conditional_transitive_endings,  absolutive_endings, localis_endings, relative_endings, ablative_endings, terminalis_endings, vialis_endings, equalis_endings } from './constants_verbs.js';
import Chip from './Chip.js';

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class YupikModifyLayout extends Component {
  constructor(props) {
    super(props);
    console.log('YupikModifyLayout props', props)
    this.verb = this.props.location.pathname.includes('verb');
    this.state = {
      headerFixed: false,
      advancedMode: false,
      usageId: this.props.match.params.usage_id,
      entry: undefined,
      usage: undefined,
      properties: undefined,
      people: 1,
      person: 3,
      objectPeople: 1,
      objectPerson: 1,
      possessiveButton: false,
      possessorPerson: 0,
      possessorPeople: 0,
      value1: this.verb ? "" : "31-1(1)",
      value2: "",
      value3: this.verb ? "" : "11(3)",
      value4: 1,
      text1after: '',
      text2after: '',
      text3tense: '',
      id1: "",
      addedWord: "",
      value1_text: "he",
      value2_text: "it",
      allPostbasesMode: false,
      value3_text: "",
      completeSentence: "",
      allowable_next_ids: [],
      possessiveObject: false,
      objectExists: false,
      subjectExists: false,
      enclitic: '',
      alternateTense: '',
      nounEnding: '',
      verbEnding: false,
      encliticExpression: '',
      tense: 'present',
      text1: "",
      text2: "",
      adjectivesEnglish: [],
      nounEndingEnglish: [],
      verbEndingEnglish: [],
      mood: this.verb ? "indicative" : "absolutive",
      moodSpecific: this.verb ? "indicative" : "absolutive",
      postbasesEnglish: [],
      englishEnding: [],
      originalText2: "",
      originalText3: "",
      text3: "",
      transitive: true,
      postbasesList: [],
      colorsList: shuffle(palette('tol-rainbow', 10).map((c) => { return '#' + c; })), // http://google.github.io/palette.js/
      colorIndexes: [0],
      colorSeed: getRandomArbitrary(0, 100),
      //usage: "[he] is hunting <it>",
      currentPostbases: [],
      modifiedWord: '',//props.word.yupik,
      currentWord: '',//props.word.yupik,
      currentEnglish: "",//currentVerb,
      modifiedEnglish: "",//props.word.english,//new Inflectors(currentVerb),
      displayPostbases: false,
    };
    this.getWord = this.getWord.bind(this);
    this.processUsage=this.processUsage.bind(this);
    this.modifyWordVerb = this.modifyWordVerb.bind(this);
    this.modifyWordNoun = this.modifyWordNoun.bind(this);
    this.modifyWord = this.verb ? this.modifyWordVerb : this.modifyWordNoun;
    this.setMood = this.verb ? this.setMoodVerb : this.setMoodNoun;
    this.initialize = this.initialize.bind(this);
     if (props.location.state == undefined) { // from search page
      let word = props.match.params.word;
      this.getWord(word);
    }
    else {
      this.state = {
        ...this.state,
        currentWord: this.props.location.state.word,
        modifiedWord: this.props.location.state.word,
        entry: this.props.location.state.entry,
        usage: this.props.location.state.entry.usage[this.props.match.params.usage_id][this.verb ? 1 : 0],
        properties: this.props.location.state.entry.properties,
      };
      this.initialize()
    }
  }

  initialize() {
    if (this.state.properties.includes('momentary')) {
      this.state.alternateTense = 'present'
      this.state.tense = 'past'
    } else if (this.state.properties.includes('not_momentary')) {
      this.state.alternateTense = 'recent past'
    }
    let new_state = this.processUsage(this.state.usage);
    console.log('processed')
    this.state = {...this.state, ...new_state};
    if (this.state.objectExists) {
      this.state.postbasesList = ["+'(g)aa"]
    } else {
      this.state.postbasesList = ["+'(g/t)uq"]
    }
    if (this.verb) {
      this.modifyWord(this.state.person, this.state.people,
        this.state.objectPerson, this.state.objectPeople,
        this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.currentWord, this.state.currentPostbases);
    }
    else {
      this.modifyWord(this.state.person, this.state.people, this.state.possessorPerson, this.state.possessorPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.verbEnding, this.state.value4, this.state.currentWord, this.state.currentPostbases);
    }
  }

  getWord(word) {
    axios
      .get(API_URL + "/word/" + word)
      .then(response => {
        this.setState({
          currentWord: response.data.yupik,
          modifiedWord: response.data.yupik,
          entry: response.data[this.props.match.params.entry_id],
          usage: response.data[this.props.match.params.entry_id].usage[this.props.match.params.usage_id][this.verb ? 1 : 0],
          properties: response.data[this.props.match.params.entry_id].properties,
        });
        this.initialize();
      });
  }

  componentWillUpdate(newProps, newState) {
    // console.log('newState', newState, this.state)
    if (this.verb) {
      if (newState.people != this.state.people || newState.person != this.state.person || newState.objectPerson != this.state.objectPerson || newState.objectPeople != this.state.objectPeople || newState.moodSpecific != this.state.moodSpecific || newState.nounEnding != this.state.nounEnding) {
        if (newState.mood != this.state.mood) {
          newState.nounEnding = ''
          this.state.nounEnding = ''
          newState.enclitic = ''
          newState.encliticExpression = ''
          this.state.enclitic = ''
          this.state.encliticExpression = ''
          if (newState.mood == 'indicative' || newState.mood == 'interrogative' || newState.mood == 'optative') {
            if (this.state.value1[0] == '4') {  // if 4th person subject, switch to 3rd person singular
              this.setState({people: 1, person: 3, value1: '31-1(1)'})
              newState.person = 3
              newState.people = 1
            }
            if (this.state.value1[0] == '4') {
              this.setState({people: 1, person: 3, value1: '31-1(1)'})
              newState.person = 3
              newState.people = 1
            }
            if (this.state.value2[0] == '4') {  // if 4th person object, switch to 3rd person singular
              this.setState({objectPeople: 1, objectPerson: 3, value2: '31-1(2)'})
              newState.objectPerson = 3
              newState.objectPeople = 1
            }
            if (this.state.value3[0] == '4') {
              this.setState({objectPeople: 1, objectPerson: 3, value3: '31-1(3)'})
              newState.objectPerson = 3
              newState.objectPeople = 1
            }
            if (newState.mood == 'interrogative') { //moving into interrogative
              if (this.state.value1[0] == '1') { //if 1st person subject, switch to 'He'
                this.setState({people: 1, person: 3, value1: '31-1(1)'})
                newState.person = 3
                newState.people = 1
              }
            }
          } else if (newState.mood == 'subordinative') {
            if (this.state.value1[0] == '3') { //if 3rd person subject, switch to 4th person singular
              console.log('ICIIIII')
              this.setState({people: 1, person: 4, value1: '41(1)'})
              newState.person = 4
              newState.people = 1
            }
            if (this.state.value2[0] == '4') {  // if 4th person object, switch to 3rd person singular
              this.setState({objectPeople: 1, objectPerson: 3, value2: '31-1(2)'})
              newState.objectPerson = 3
              newState.objectPeople = 1
            }
            if (this.state.value3[0] == '4') {
              this.setState({objectPeople: 1, objectPerson: 3, value3: '31-1(3)'})
              newState.objectPerson = 3
              newState.objectPeople = 1
            }
          }
        }
        if (newState.moodSpecific != this.state.moodSpecific) {
          if (newState.moodSpecific == 'You, stop!' || newState.moodSpecific == 'You, do not!') {
            this.setState({people: 1, person: 2, value1: '21(1)'})
            newState.person = 2
            newState.people = 1
          }
        }
        if (newState.nounEnding != this.state.nounEnding) {
          if (newState.nounEnding != '') {
            newState.mood = 'nounEnding'
            newState.moodSpecific = 'nounEnding'
            this.setState({mood: 'nounEnding', moodSpecific: 'nounEnding'})
          } else {
            newState.mood = 'indicative'
            newState.moodSpecific = 'indicative'
            this.setState({mood: 'indicative', moodSpecific: 'indicative'})
          }
        }
        this.modifyWord(newState.person, newState.people, newState.objectPerson, newState.objectPeople, newState.mood, newState.moodSpecific, newState.nounEnding, this.state.currentWord, this.state.currentPostbases);
      }
    }
    else {
      if (newState.people != this.state.people || newState.value4 != this.state.value4 || newState.person != this.state.person || newState.possessorPerson != this.state.possessorPerson || newState.possessorPeople != this.state.possessorPeople || newState.mood != this.state.mood || newState.nounEnding != this.state.nounEnding || newState.verbEnding != this.state.verbEnding) {
        if (newState.nounEnding !== this.state.nounEnding) {
          if (newState.nounEnding !== '') {
            if (newState.nounEnding == 'and others' || newState.nounEnding == 'and another') {
              this.state.value4 = 1
              newState.value4 = 1
            } else if (newState.nounEnding == 'just a little') {
              this.state.value4 = 1
              newState.value4 = 1
              this.state.nounEnding = 'just a little'
            } else if (newState.nounEnding == 'many of them') {
              this.state.value4 = 3
              newState.value4 = 3
              this.state.nounEnding = 'many of them'
            }
            this.state.possessorPeople = 0
            newState.possessorPeople = 0
            this.state.possessorPerson = 0
            newState.possessorPerson = 0
          }
        }
        if (newState.possessorPeople != this.state.possessorPeople) {
          if (newState.possessorPeople != 0) {
            if (newState.verbEnding || newState.nounEnding != '') {
              this.state.currentPostbases.shift()
            }
            newState.verbEnding = false
            this.state.verbEnding = false
            this.state.nounEnding = ''
            newState.nounEnding = ''
          }
        }
        if (newState.verbEnding != this.state.verbEnding) {
          if (newState.verbEnding == true) {
            this.state.possessorPeople = 0
            newState.possessorPeople = 0
            this.state.possessorPerson = 0
            newState.possessorPerson = 0
          }
        }
        if (newState.mood != this.state.mood) {
          if (newState.mood !== 'absolutive') {
            if (newState.nounEnding !== '' || newState.verbEnding == true) {
              this.state.currentPostbases.shift()
              this.state.nounEnding = ''
              newState.nounEnding = ''
              this.state.verbEnding = false
              newState.verbEnding = false
            }
          }
        }
        // if (newState.nounEndingEnglish.includes("and another") || newState.nounEndingEnglish.includes("and others")) {
        //   this.state.value4 = 1
        //   newState.value4 = 1
        // }
        this.modifyWord(newState.person, newState.people, newState.possessorPerson, newState.possessorPeople, newState.mood, newState.moodSpecific, newState.nounEnding, newState.verbEnding, newState.value4, this.state.currentWord, this.state.currentPostbases);
      }
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

  processUsage(usage, event, data) {
    let new_state = {};
    let res = usage;
    var rx1 = /\[([^\]]+)]/; // regex to match [text]
    var rx2 = /<([^\]]+)>/; // regex to match (text)
    let subject = usage.match(rx1);
    let object = usage.match(rx2);
    if (subject !== null) {
      res = res.split(rx1);
      console.log(res)
      new_state = {...new_state, subjectExists: true};
      new_state = {
        ...new_state,
        value1: "31-1(1)",
        people: 1,
        person: 3,
        text1: res[0]
      }
      res = res[2];
    }
    if (object !== null) {
      res = res.split(rx2);
      new_state = {...new_state, objectExists: true};
      if (res[1] === 'it') {
        new_state = {
          ...new_state,
          value2_text: "it",
          value2: "31-3(2)",
          objectPeople: 1,
          objectPerson: 3,
          text2: res[1],
          originalText2: res[0],
          text3: res[2],
          originalText3: res[2],
        }
      } else if (res[1] === 'its') {
        new_state = {
          ...new_state,
          value2_text: "its",
          value3: "31-3(3)",
          objectPeople: 1,
          objectPerson: 3,
          possessiveObject: true,
          text2: res[1],
          originalText2: res[0],
          text3: res[2],
          originalText3: res[2],
        }
      } else if (res[1] === 'her*') { //fix this
        new_state = {
          ...new_state,
          value2_text: "her",
          value3: "31-2(1)",
          objectPeople: 1,
          objectPerson: 3,
          possessiveObject: false,
          text2: res[1],
          originalText2: res[0],
          text3: res[2],
          originalText3: res[2],
        }
      }
    }
    else {
      new_state = {
        ...new_state,
        text2: res,
        originalText2: res
      }
    }
    // var res = usage.split("|");
    // // need an error case in case it's not all available here
    // this.state.text1 =res[0].trim()
    // this.state.text2 =res[1].trim()
    // this.state.text3 =res[2].trim()
    console.log('processUsage', new_state)
    return new_state;
  }

  setValue1(e, data) {
    console.log('setValue1', e)
    console.log('setValue1', data)
    this.setState({ value1: data.value });
    this.setState({ person: data.value[0]});
    this.setState({ people: data.value[1]});
  }

  setValue2(e, data) {
    this.setState({ value2: data.value });
    this.setState({ objectPerson: data.value[0]});
    this.setState({ objectPeople: data.value[1]});
  }

  setValue3(e, data) {
    if (this.verb) {
      this.setState({ value3: data.value });
      this.setState({ objectPerson: data.value[0]});
      this.setState({ objectPeople: data.value[1]});
    }
    else {
      this.setState({ value3: data.value });
      this.setState({ possessorPerson: data.value[0]});
      this.setState({ possessorPeople: data.value[1]});
    }
  }

  setValue4(i, e, data) {
    this.setState({ value4: i});
  }

  speak(event, data) {
    let audio = new Audio(API_URL + "/tts/" + this.state.modifiedWord.replace('*',''));
    audio.play();
  }

  allPostbasesMode(event,data) {
    this.setState({allPostbasesMode: !this.state.allPostbasesMode})
    if (this.verb) { //this could be sent to another function since it is repeated in setPostbase
      if (!this.state.allPostbasesMode) {
        this.setState({allowable_next_ids: []})
      } else {
        if (this.state.currentPostbases.length === 0) {
          this.setState({allowable_next_ids: []})
        } else if (this.state.currentPostbases.length === 1) {
          this.setState({allowable_next_ids: postbases[this.state.currentPostbases[0]].allowable_next_ids})
        } else {
          let allremaining = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
          this.state.currentPostbases.forEach((i, index) => {
            allremaining.splice(allremaining.indexOf(this.state.currentPostbases[index]),1)
          })
          this.setState({allowable_next_ids: allremaining})     
        }
      }
      this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.currentWord, this.state.currentPostbases);
    } else {
      let allremaining = [0,1,2,3,4,5,6]
      if (!this.state.allPostbasesMode) {
        this.setState({allowable_next_ids: []})
      } else {
        if (this.state.currentPostbases.length === 0) {
          this.setState({allowable_next_ids: []})
        } else if (this.state.currentPostbases.length === 1) {
          if (this.state.currentPostbases[0] < 7) {
            this.setState({allowable_next_ids: nounPostbases[this.state.currentPostbases[0]].allowable_next_ids})
          } else {
            this.setState({allowable_next_ids: []})
          }
        } else if (this.state.currentPostbases.length === 2) {
          if (this.state.currentPostbases[0] < 7) {
            allremaining.splice(allremaining.indexOf(this.state.currentPostbases[1]),1)
            allremaining.splice(allremaining.indexOf(this.state.currentPostbases[0]),1)   
            this.setState({allowable_next_ids: allremaining})
          } else {
            this.setState({allowable_next_ids: nounPostbases[this.state.currentPostbases[1]].allowable_next_ids})
          }
        } else {
            console.log(allremaining)
            this.state.currentPostbases.forEach((i, index) => {
              if (i < 7) {
                allremaining.splice(allremaining.indexOf(this.state.currentPostbases[index]),1)
              }
            })
            // allremaining.splice(allremaining.indexOf(this.state.currentPostbases[2]),1)
            // allremaining.splice(allremaining.indexOf(this.state.currentPostbases[1]),1)
            console.log(allremaining)  
            this.setState({allowable_next_ids: allremaining})      
        }
      }
      this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.currentWord, this.state.currentPostbases);      
    }
  }
  setPostbase(postbase_id, event, data) {
    console.log(postbase_id, event, data)
    event.preventDefault();
    let index = this.state.currentPostbases.indexOf(postbase_id);
    let currentPostbases = this.state.currentPostbases;
    if (this.verb) {
      if (index > -1) {
        currentPostbases.splice(index, 1);
      }
      else {
        currentPostbases.push(postbase_id);
        // let newGroup = true;
        // currentPostbases.forEach((id) => {
        //   console.log( postbases[id].group !== postbases[postbase_id].group);
        //   newGroup = newGroup && postbases[id].group !== postbases[postbase_id].group;
        // });
        // if (newGroup) {
        //   currentPostbases.push(postbase_id);
        // }
      }
      console.log(currentPostbases)
      if (this.state.allPostbasesMode) {
        this.setState({allowable_next_ids: []})
      } else {
        if (currentPostbases.length === 0) {
          this.setState({allowable_next_ids: []})
        } else if (currentPostbases.length === 1) {
          // this.setState({allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]})
          this.setState({allowable_next_ids: postbases[currentPostbases[0]].allowable_next_ids})
        } else {
          let allremaining = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
          // allremaining.splice(allremaining.indexOf(currentPostbases[0]),1)
          // allremaining.splice(allremaining.indexOf(currentPostbases[1]),1)
          // console.log(allremaining)
          // this.setState({allowable_next_ids: allremaining}) //postbases[currentPostbases[0]].allowable_next_ids

          currentPostbases.forEach((i, index) => {
            allremaining.splice(allremaining.indexOf(currentPostbases[index]),1)
          })
          this.setState({allowable_next_ids: allremaining})     
        }
      }
      this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.currentWord, currentPostbases);
    }
    else {
      let verbEnding = this.state.verbEnding
      let nounEnding = this.state.nounEnding
      let moodEnding = this.state.mood
      let value4 = this.state.value4
      if (index > -1) {
        currentPostbases.splice(index, 1);
        if (postbase_id > 10) {
          this.setState({ verbEnding: false})
          verbEnding = false
        } else if (postbase_id > 6) {
          this.setState({ nounEnding: ''})
          nounEnding = ''
        }
      } else if (postbase_id > 6 && postbase_id < 11) {
        for (var i=7; i<11;i++){
          if (currentPostbases.indexOf(i)>-1) {
            currentPostbases.splice(currentPostbases.indexOf(i),1);
          }
        }
        if (verbEnding) {
          currentPostbases.shift()
          this.setState({ verbEnding: false})
          verbEnding = false          
        } else if (this.state.mood != 'absolutive') {
          this.setState({ mood: 'absolutive'})
          moodEnding = 'absolutive'
        }
        if (nounEnding == 'and others' || nounEnding == 'and another') {
          this.setState({ value4: 1})
          value4 = 1
        } else if (nounEnding == 'just a little') {
          this.setState({ value4: 1})
          value4 = 1
        } else if (nounEnding == 'many of them') {
          this.setState({ value4: 3})
          value4 = 3
        }
        currentPostbases.push(postbase_id);
        this.setState({ nounEnding: nounPostbases[postbase_id].englishModifier('')})
        nounEnding = nounPostbases[postbase_id].englishModifier('')
        this.setState({ possessiveButton: 0, possessorPeople: 0, possessorPerson: 0})
      } else if (postbase_id > 10) {
        for (var i=11; i<22;i++){
          if (currentPostbases.indexOf(i)>-1) {
            currentPostbases.splice(currentPostbases.indexOf(i),1);
          }
        }
        if (nounEnding !== '') {
          currentPostbases.shift()
          this.setState({ nounEnding: ''})
          nounEnding = ''
        } else if (this.state.mood != 'absolutive') {
          this.setState({ mood: 'absolutive'})
          moodEnding = 'absolutive'
        }
        currentPostbases.push(postbase_id);
        this.setState({ verbEnding: true})
        verbEnding = true
        this.setState({ possessiveButton: 0, possessorPeople: 0, possessorPerson: 0})
      }
      else {
        currentPostbases.push(postbase_id);
      }
      let allremaining = [0,1,2,3,4,5,6]
      currentPostbases = currentPostbases.sort((p1, p2) => {
        return (nounPostbases[p1].priority > nounPostbases[p2].priority) ? 1 : ((nounPostbases[p1].priority < nounPostbases[p2].priority) ? -1 : 0);
      });
      console.log(currentPostbases)
      if (this.state.allPostbasesMode) {
        this.setState({allowable_next_ids: []})
      } else {
        if (currentPostbases.length === 0) {
          this.setState({allowable_next_ids: []})
        } else if (currentPostbases.length === 1) {
          if (currentPostbases[0] < 7) {
            this.setState({allowable_next_ids: nounPostbases[currentPostbases[0]].allowable_next_ids})
          } else {
            this.setState({allowable_next_ids: []})
          }
        } else if (currentPostbases.length === 2) {
          if (currentPostbases[0] < 7) {
            allremaining.splice(allremaining.indexOf(currentPostbases[1]),1)
            allremaining.splice(allremaining.indexOf(currentPostbases[0]),1)   
            this.setState({allowable_next_ids: allremaining})
          } else {
            this.setState({allowable_next_ids: nounPostbases[currentPostbases[1]].allowable_next_ids})
          }
        } else {
            currentPostbases.forEach((i, index) => {
              if (i < 7) {
                allremaining.splice(allremaining.indexOf(currentPostbases[index]),1)
              }
            })
            this.setState({allowable_next_ids: allremaining})      
        }
      }
    this.modifyWord(this.state.person, this.state.people, this.state.possessorPerson, this.state.possessorPeople, moodEnding, this.state.moodSpecific, nounEnding, verbEnding, value4, this.state.currentWord, currentPostbases);
  }
}
  

  setMoodVerb(newMood, moodSpecific, event, data) {
    this.setState({ mood: (this.state.moodSpecific == moodSpecific) ? 'indicative' : newMood });
    this.setState({ moodSpecific: (this.state.moodSpecific == moodSpecific) ? 'indicative' : moodSpecific })
  }

  setMoodNoun(mood, event, data) {
    this.setState({ mood: (this.state.mood == mood) ? 'absolutive' : mood });
  }

  setEnclitic(enclitic, encliticExpression, event, data) {
    this.setState({ enclitic: (this.state.enclitic == enclitic) ? '' : enclitic })
    this.setState({ encliticExpression: (this.state.enclitic == enclitic) ? '' : encliticExpression })
  }

  setNounEnding(ending, event, data) {
    this.setState({ nounEnding: (this.state.nounEnding == ending) ? '' : ending})
  }

  setPossessiveButton(num, event, data) {
    if (this.state.possessiveButton == num) {
      this.setState({ possessiveButton: 0, possessorPeople: 0, possessorPerson: 0})
    } else {
      this.setState({ possessiveButton: num, possessorPeople: this.state.value3[1], possessorPerson: this.state.value3[0]})
      let currentPostbases = this.state.currentPostbases
      for (var i=11; i<22;i++){
        if (currentPostbases.indexOf(i)>-1) {
          currentPostbases.splice(currentPostbases.indexOf(i),1);
        }
      }
      this.setState({ currentPostbases: currentPostbases})
    }
  }

  modifyWordVerb(person, people, objectPerson, objectPeople, mood, moodSpecific, nounEnding, word, currentPostbases) {
    // currentPostbases = currentPostbases.sort((p1, p2) => {
    //   return (postbases[p1].priority > postbases[p2].priority) ? 1 : ((postbases[p1].priority < postbases[p2].priority) ? -1 : 0);
    // });

// ending: 'the one who is','device for', 'one that customarily/capably is', 'how to/way of', 'one who is good at', 'act or state of',

// 'interrogative',
//  'who','when (in past)', 'when (in future)','at where','from where','toward where','why',
// 'optative',
// 'do!','do (in the future)!', 'You, do not!', 'You, stop!',



//     group: 'connective_precessive','connective_consequential','connective_contingent','connective_concessive','connective_conditional','connective_first_contemporative','connective_second_contemporative',
//     mood: 'before','because','whenever', 'although','while','when (past)','when (future)',

//   {
//     group: 'subordinative',
//     mood: 'by or being that',
    let newText1 = ''
    let newText2 = this.state.originalText2
    let newText1after = ''
    let newText2after = ''
    let newText3tense = ''
    let newText3 = this.state.originalText3
    let newEnglish =  this.state.currentEnglish;
    let englishEnding = []

    let moodSpecificLoop = ['who','when (in past)', 'when (in future)','at where','from where','toward where','why', 'do!','do (in the future)!', 'You, do not!', 'You, stop!','before','because','whenever', 'although','if','when (past)','when (future)','by or being that','','','','','','']
    let moodLoop = ['interrogative','interrogative','interrogative','interrogative','interrogative','interrogative','interrogative','optative','optative','optative','optative','connective_precessive','connective_consequential','connective_contingent','connective_concessive','connective_conditional','connective_first_contemporative','connective_second_contemporative','subordinative','','','','','','']
    let nounEndingLoop = ['','','','','','','','','','','','','','','','','','','','the one who is','device for', 'one that customarily/capably is', 'how to/way of', 'one who is good at', 'act or state of']
    // console.log(moodSpecificLoop)
    // console.log(moodLoop)

//     for (let i = 0; i < moodSpecificLoop.length; i++) {
//       for (let j = 0; j < 30; j++) {

//   // if (i != 8) {
//   //   newText1 = ''
//   // } else {


//         people = 1
//         person = 3
//         mood = moodLoop[i]
//         moodSpecific = moodSpecificLoop[i]
//         nounEnding = nounEndingLoop[i]
//         currentPostbases = [postbases[j].id]
//         // 0 2 6 8 9 10 12 14 16 18 20 21 26 27 28 29currentPostbases.forEach((s,i) => {
//         // let o = 6
//         // if (j != o) {
//         //   currentPostbases.push(postbases[o].id)
//         // }
        
//         // console.log(currentPostbases)

//     if (currentPostbases.length == 1) {
// console.log('--------------------------------------------'+j+' '+postbases[currentPostbases[0]].description)
//     } else {
// console.log('--------------------------------------------'+j+postbases[currentPostbases[0]].description+' '+postbases[currentPostbases[1]].description)
//     }
    
    currentPostbases = currentPostbases.reverse()
    newEnglish =  this.state.currentEnglish;
    newText1 = ''
    newText2 = this.state.originalText2
    newText3 = this.state.originalText3
    let new_str = ''
    let new_adj = ''
    let be_adj = ''
    let being_adj = ''
    let tense = this.state.tense
    let subjectis = ''
    let nois = false
    let does = ''
    if (this.state.alternateTense == 'present' && person == 1) {
      tense = 'present'
    }
    let getsubjectis = (tenseN, peopleN, personN, doesN) => {
      if (doesN=='does') {
        if (peopleN == 1 && personN == 3) {
          if (tenseN == 'past') {
            subjectis = 'did'
          } else if (tenseN == 'future') {
            subjectis = 'will'
          } else {
            subjectis = 'does'
          }
        } else {
          subjectis = 'do'
        }
      } else if (doesN=='had' && tenseN !='future') {
        if (peopleN == 1 && personN == 3) {
          subjectis = 'had'
        } else {
          subjectis = 'have'
        }
      } else if (doesN == 'be') {
        if (tenseN == 'future' && currentPostbases[0] !== 23) {
          subjectis = ' be'
        } else {
          subjectis = ''
        }
      } else if (doesN == 'prewho') {
        if (peopleN == 1 && person == 1) {
          subjectis = 'am'
        } else if (peopleN == 1 && personN == 3) {
          subjectis = 'is'
        } else {
          subjectis = 'are'
        }        
      } else if (tenseN == 'present') {
        if (peopleN == 1 && personN == 1) {
          subjectis = 'am'
        } else if (peopleN == 1 && personN == 3) {
          subjectis = 'is'
        } else {
          subjectis = 'are'
        }
      } else if (tenseN == 'past') {
        if (peopleN == 1 && personN == 1) {
          subjectis = 'was'
        } else if (peopleN == 1 && personN == 3) {
          subjectis = 'was'
        } else {
          subjectis = 'were'
        }
      } else if (tenseN == 'future') {
        subjectis = 'will'
      }
      return subjectis
  }
    if (newText2.includes('is ')) {
      new_str = newText2.split("is ");
      new_adj = new_str[1].trim()
    } else {
      new_adj = newText2.trim()
      nois = true
    }
    be_adj = 'be '+new_adj
    being_adj = 'being '+new_adj
    let addis = false
    addis = false
    let conditionalbe = ' be '
    let hasDesire = false
    hasDesire = false


    var postbasesEnglish = []
    let test = new_adj
    let originalverb = nlp(test).verbs().out().split(' ')[0]
    let verbtenses = ''
    let gerund_new_adj = ''
    let infinitive_new_adj = ''
    if (this.state.properties.includes('adjectival')) {
      gerund_new_adj = new_adj
      infinitive_new_adj = 'be '+new_adj    
    } else if (originalverb) {
      if (originalverb == 'being') {
        gerund_new_adj = test.replace(originalverb,'')
        infinitive_new_adj = test.replace(originalverb,'')
      } else {
        verbtenses = nlp(test).verbs().conjugate()[0]
        gerund_new_adj = test.replace(originalverb,verbtenses.Gerund)
        infinitive_new_adj = test.replace(originalverb,verbtenses.Infinitive)
      }
    } else {
      gerund_new_adj = new_adj
      infinitive_new_adj = 'be '+new_adj   
    }
    let firstpass = true
    console.log(gerund_new_adj)
    englishEnding = []
    let postbase28 = false
    let inTheFutureFlag = false
    let inThePastFlag = false
    let place = []
    let unmodifyingPostbases = [ 0, 1, 5, 7, 9, 11, 12, 13, 14, 15, 19, 20, 27]
    let A = [2,3,4,10,29]
    let B = [16,17,18]
    let C = [21,22,24,25,23]
    let D = [26]
    let E = [19,20,0,1,5,7,8,11,12,13,14,15,27]
    let F = [28]
    let G = [9]
    let H = [6]
    let firstP = 0
    let willbe = ''
    let willMark = ''
    let beMark = ''
    let endingMood = ''
    let nextIndexPostbase = 0
    let bebeing = ''
    let subjectType = ''
    let moodIndex = ["g","g","i","i","i","g","g","g","g","g","i","g","g","g","g","g","i","i","i","g","g","i","i","i","i","i","g","g","g","i"]
    // console.log(currentPostbases)
    currentPostbases = currentPostbases.reverse()
    // console.log(currentPostbases[0])
    let pushEnding = (thisMood, people, person, subjectType, index) => {
      subjectType = ''
      // console.log(currentPostbases.length)
      // console.log(index+1)
      if (index == 0) {///FIX THIS!!!
        if (thisMood=='i') {
          englishEnding.push(subjectType + infinitive_new_adj)
        } else if (thisMood =='g') {
          englishEnding.push(subjectType + gerund_new_adj)
        } else {
          englishEnding.push(subjectType + new_adj)
        }
      }
    }

    if (currentPostbases.length == 0) {
      if (endingMood == 'infinitive') {
        englishEnding.push(infinitive_new_adj)
      } else {
        englishEnding.push(gerund_new_adj)
      }        
    }

    if (moodSpecific == 'You, stop!' || nounEnding !== '') {
      endingMood = 'g'
      if (currentPostbases.includes(5)) {
        newText3tense = ' (in the past)'
        tense = 'past'
      } else if ([7,8,9].some(r=> currentPostbases.includes(r))) {
        newText3tense = ' (in the future)'
        tense = 'future'
      }
      if (currentPostbases.length>0) {
        firstP = currentPostbases[0]
        if (place.concat(A,F,G,H).includes(firstP)) {
          postbasesEnglish.push('being'+postbases[firstP].englishModifier(''))
        } else if (C.includes(firstP)) {
          postbasesEnglish.push(postbases[firstP].englishModifierGerund(''))
        } else {
          postbasesEnglish.push(postbases[firstP].englishModifier(''))
        }
        if (currentPostbases.length == 1) {
          if (place.concat(A,B,C).includes(firstP)) {
            pushEnding('i',people,person,'',0)
          } else {
            pushEnding('g',people,person,'',0)
          }          
        }
      }
    } else if (mood == 'optative') {
      newText2 = 'be'
      if (moodSpecific == 'do (in the future)!') {
        newText3tense = ' (in the future)'
      }
      endingMood = 'i'
      if (currentPostbases.includes(5)) {
        newText3tense = ' (in the past)'
        tense = 'past'
      } else if ([7,8,9].some(r=> currentPostbases.includes(r))) {
        newText3tense = ' (in the future)'
        tense = 'future'
      }
      if (currentPostbases.length>0) {
        firstP = currentPostbases[0]
        if (place.concat(B,C,D).includes(firstP)) {
          postbasesEnglish.push(postbases[firstP].englishModifierGerund(''))
        } else {
          postbasesEnglish.push(postbases[firstP].englishModifier(''))
        }
        if (currentPostbases.length == 1) {
          if (place.concat(A,B,C).includes(firstP)) {
            pushEnding('i',people,person,'',0)
          } else {
            pushEnding('g',people,person,'',0)
          }          
        }
      }
    } else {
      endingMood = 'g'
      if (currentPostbases.includes(5)) {
        tense = 'past'
      } else if ([7,8,9].some(r=> currentPostbases.includes(r))) {
        tense = 'future'
      }
      if (currentPostbases.length>0) {
        firstP = currentPostbases[0]
        if (place.concat(B,C,D).includes(firstP)) {
          if (firstP == 23) {
            does = 'does'
            postbasesEnglish.push(postbases[firstP].englishModifierInfinitive(''))
          } else {
            postbasesEnglish.push(postbases[firstP].englishModifierGerund(''))
          }
        } else {
          postbasesEnglish.push(postbases[firstP].englishModifier(''))
        }
        if (currentPostbases.length == 1) {
          if (place.concat(A,B,C).includes(firstP)) {
            pushEnding('i',people,person,'',0)
          } else {
            pushEnding('g',people,person,'',0)
          }          
        }
      }
    }
       if (currentPostbases.length>1) {
          endingMood = moodIndex[currentPostbases[0]]
          currentPostbases.forEach((s,i) => {
            if (i !== currentPostbases.length-1) {
              nextIndexPostbase = postbases[currentPostbases[i+1]].id
              // console.log(postbases[nextIndexPostbase].id)
              if (place.concat(B,C,D).includes(nextIndexPostbase)) {
                if (endingMood == 'i') {
                  if (place.concat(A,B,C).includes(s) && A.includes(nextIndexPostbase)) {
                    postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                    pushEnding('i',people,person,'',i)
                  } else if (place.concat(A,B,C).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                    postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                    pushEnding('g',people,person,'',i)
                  } else if (place.concat(D,E,F).includes(s) && A.includes(nextIndexPostbase)) {
                    if (endingMood == 'g') {
                      postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                    } else {
                      postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                    }
                    pushEnding('i',people,person,'',i)
                  } else if (place.concat(D,E,F).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                    if (endingMood == 'g') {
                      postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                    } else {
                      postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                    }
                    pushEnding('g',people,person,'',i)
                  } else {
                    postbasesEnglish.push(postbases[nextIndexPostbase].englishModifierInfinitive(''))
                    if (nextIndexPostbase == 26 || nextIndexPostbase == 28) {
                      pushEnding('g',people,person,'',i)
                    } else if (place.concat(A,B,C).includes(nextIndexPostbase)) { 
                      pushEnding('i',people,person,'',i)
                    } else {
                      pushEnding(endingMood,people,person,'',i)
                    }
                  }                     
                } else { //gerund
                  if (place.concat(A,B,C).includes(s) && A.includes(nextIndexPostbase)) {
                    postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierGerund(''))
                    pushEnding('i',people,person,'',i)
                  } else if (place.concat(A,B,C).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                    console.log('called?')
                    postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierGerund(''))
                    pushEnding('g',people,person,'',i)
                  } else if (place.concat(D,E,F).includes(s) &&  A.includes(nextIndexPostbase)) {
                    if (endingMood == 'g') {
                      postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifierGerund(''))
                    } else {
                      postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierGerund(''))
                    }
                    pushEnding('i',people,person,'',i)
                  } else if (place.concat(D,E,F).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                    if (endingMood == 'g') {
                      postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifierGerund(''))
                    } else {
                      postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierGerund(''))
                    }
                    pushEnding('g',people,person,'',i)
                  } else {
                    postbasesEnglish.push(postbases[nextIndexPostbase].englishModifierGerund(''))
                    if (nextIndexPostbase == 26 || nextIndexPostbase == 28) {
                      pushEnding('g',people,person,'',i)
                    } else if (place.concat(A,B,C).includes(nextIndexPostbase)) { 
                      pushEnding('i',people,person,'',i)
                    } else {
                      pushEnding(endingMood,people,person,'',i)
                    }
                  }        
                }
              } else {
                if (place.concat(A,B,C).includes(s) && A.includes(nextIndexPostbase)) {
                  postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifier(''))
                  pushEnding('i',people,person,'',i)
                } else if (place.concat(A,B,C).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                  postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifier(''))
                  pushEnding('g',people,person,'',i)
                } else if (place.concat(D,E,F).includes(s) && A.includes(nextIndexPostbase)) {
                  if (endingMood == 'g') {
                    postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifier(''))
                  } else {
                    postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifier(''))
                  }
                  pushEnding('i',people,person,'',i)
                } else if (place.concat(D,E,F).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                  if (endingMood == 'g') {
                    postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifier(''))
                  } else {
                    postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifier(''))
                  }
                  pushEnding('g',people,person,'',i)
                } else {
                  postbasesEnglish.push(postbases[nextIndexPostbase].englishModifier(''))
                  if (nextIndexPostbase == 26 || nextIndexPostbase == 28) {
                    pushEnding('g',people,person,'',i)
                  } else if (place.concat(A,B,C).includes(nextIndexPostbase)) { 
                    pushEnding('i',people,person,'',i)
                  } else {
                    pushEnding(endingMood,people,person,'',i)
                  }
                }        
              }
              if (place.concat(E,G).includes(nextIndexPostbase) == false ) {
                endingMood = moodIndex[nextIndexPostbase]
                console.log(endingMood)
                console.log(postbases[nextIndexPostbase].description)
              }
            }
          })     
      } 
    

    if (moodSpecific == 'You, stop!') {
      if (person == '3' || person == '1') {
        newText1 = 'let'
        newText2 = 'stop '
        // newText3 = newText3+'!'
      } else {
        newText1 = ''
        newText2 = ', stop '
        // newText3 = newText3+'!'
      }
    } else if (moodSpecific == 'You, do not!') {
      newText1after = ''
      newText2after = ''
      if (person == '3' || person == '1') {
        newText1 = 'let'
        newText2 = 'not '+newText2
        // newText3 = newText3+'!'
      } else {
        newText1 = ''
        newText2 = ', do not '+newText2
        // newText3 = newText3+'!'
      }
    } else if (moodSpecific == 'do!'){
      newText1after = ''
      newText2after = ''
      if (person == '3' || person == '1') {
        newText1 = 'let'
        newText2 = newText2+''
        // newText3 = newText3+'!'
      } else {
        newText1 = ''
        newText2 = ', '+newText2
        // newText3 = newText3+'!'  for optative render it'll look like newText2 + object + newText3 + newText3tense + '!'
      }
    } else if (moodSpecific == 'do (in the future)!') {
      newText1after = ''
      newText2after = ''
      if (person == '3' || person == '1') {
        newText1 = 'let'
        newText2 = newText2+''
      } else {
        newText1 = ''
        newText2 = ', '+newText2
      }
    } else if (moodSpecific == 'when (future)') {
      newText1 = 'when'
      newText1after = ''
      newText2 = ''
      newText2after = 'will '+getsubjectis(tense,people,person,'be')
      newText3 = newText3
    } else if (moodSpecific == 'when (past)') {
      newText1 = 'when '
      newText1after = ''
      newText2 = ''
      newText2after = getsubjectis('past',people,person,does)
      newText3 = newText3
    } else if (moodSpecific == 'who' && this.state.objectExists) {
      newText1 = 'whom '+getsubjectis(tense,people,person,'prewho')
      newText1after = ''
      newText2 = ''
      newText2after = ''
      newText3 = newText3+'?'        
    } else if (moodSpecific == 'who') {
      newText1 = 'who '+getsubjectis(tense,people,person,'prewho')
      newText1after = ''
      newText2 = ' who '
      newText2after = getsubjectis(tense,people,person,does)
      newText3 = newText3+'?'
    } else if (mood == 'interrogative') {
      if (moodSpecific == 'when (in past)') {
        tense = 'past'
      } else if (moodSpecific == 'when (in future)') {
        tense = 'future'
      }
      console.log(moodSpecific)
      newText1 = interrogative.find((p)=> {return p.mood==moodSpecific}).text
      newText1after = getsubjectis(tense,people,person,does)
      newText2 = ''
      newText2after = getsubjectis(tense,people,person,'be')
      newText3 = newText3+'?'
    } else if (mood == 'connective_precessive' || mood == 'connective_consequential' || mood == 'connective_contingent' || mood == 'connective_concessive' || mood == 'connective_conditional' || mood == 'connective_first_contemporative' || mood == 'connective_second_contemporative' || mood == 'subordinative') {
      newText1 = dependent.find((p)=> {return p.mood==moodSpecific}).text
      newText1after = ''
      newText2 = ''
      newText2after = getsubjectis(tense,people,person,does)+getsubjectis(tense,people,person,'be')
      newText3 = newText3
    } else if (nounEnding !== '') {
      newText1 = ''
      newText1after = ''
      newText2 = verb2noun.find((p)=> {return p.ending==nounEnding}).text
      newText2after = ' ('
      newText3 = newText3+')'
    } else {
      newText1 = ''
      newText1after = ''
      newText2 = ''
      newText2after = getsubjectis(tense,people,person,does)+getsubjectis(tense,people,person,'be')
      newText3 = ''
    }
    currentPostbases = currentPostbases.reverse()
    console.log(newText1+newText2+postbasesEnglish.join(' ')+' '+englishEnding.join(' ')+newText3)

    //   }
    // }
  
 

    let postbasesList = [];
    let base = word;


    let processPostbases = (currentPostbases, base, postbases) => {
      postbasesList = currentPostbases.map((p,i) => {
        if (postbases[p].conditional_rule == 'attaching_to_te') {
          if (currentPostbases.length == 1 || currentPostbases.length == 0) {
            base = word
          } else {
            if (i != 0) {
              base = postbases[currentPostbases[i-1]].expression
            } else {
              base = word
            }
          }
          if (base.slice(base.length-3,base.length-1)=='te') {
            return postbases[p].expression_conditional
          } else {
            return postbases[p].expression
          }
        } else {
          return postbases[p].expression
        };
      })
      return postbasesList
     };



    if (nounEnding != '') {
      postbasesList = processPostbases(currentPostbases, base, postbases)
      postbasesList = postbasesList.concat([nounEndings[nounEnding]]);
    } else {
    if (this.state.objectExists) {
      if (mood == 'indicative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat([indicative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'interrogative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat([interrogative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'subordinative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat([subordinative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_precessive') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~+(t)vaileg\\'])
        postbasesList = postbasesList.concat([connective_consonantEnd_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_consequential') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~:(6)a\\'])
        postbasesList = postbasesList.concat([connective_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_contingent') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['+\'(g)aqa\\'])
        postbasesList = postbasesList.concat([connective_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_concessive') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        if (person == 2 || person == 1) {
          postbasesList = postbasesList.concat(['@-6rar\\'])
        } else {
          postbasesList = postbasesList.concat(['@-6r\\'])
        }
        postbasesList = postbasesList.concat([connective_consonantEnd_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_conditional') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~-ku-\\'])
        postbasesList = postbasesList.concat([connective_conditional_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_first_contemporative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['-ller\\'])
        postbasesList = postbasesList.concat([connective_contemporative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_second_contemporative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@:(6)inaner\\'])
        postbasesList = postbasesList.concat([connective_contemporative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'do!') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'do (in the future)!') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~-ki\\'])
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'You, stop!') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~+(t)viiqna\\'])
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'You, do not!') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        if (person == 2) {
          postbasesList = postbasesList.concat(['@~+yaquna\\'])
        } else {
          postbasesList = postbasesList.concat(['-nrilki\\'])
        }
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      }
    } else {
      if (mood == 'indicative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        console.log(indicative_intransitive_endings, person, people)
        postbasesList = postbasesList.concat([indicative_intransitive_endings[person][people]]);
    } else if (mood == 'interrogative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat([interrogative_intransitive_endings[person][people]]);
    } else if (mood == 'subordinative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat([subordinative_intransitive_endings[person][people]]);
      } else if (mood == 'connective_precessive') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~+(t)vaileg\\'])
        postbasesList = postbasesList.concat([connective_consonantEnd_intransitive_endings[person][people]]);
      } else if (mood == 'connective_consequential') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~:(6)a\\'])
        postbasesList = postbasesList.concat([connective_intransitive_endings[person][people]]);
      } else if (mood == 'connective_contingent') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['+\'(g)aqa\\'])
        postbasesList = postbasesList.concat([connective_intransitive_endings[person][people]]);
      } else if (mood == 'connective_concessive') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        if (person == 2 || (person == 1 && people != 1)) {
          postbasesList = postbasesList.concat(['@-6rar\\'])
        } else {
          postbasesList = postbasesList.concat(['@-6r\\'])
        }
        postbasesList = postbasesList.concat([connective_consonantEnd_intransitive_endings[person][people]]);
      } else if (mood == 'connective_conditional') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~-ku\\'])
        postbasesList = postbasesList.concat([connective_conditional_intransitive_endings[person][people]]);
      } else if (mood == 'connective_first_contemporative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['-ller\\'])
        postbasesList = postbasesList.concat([connective_contemporative_intransitive_endings[person][people]]);
      } else if (mood == 'connective_second_contemporative') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@:(6)inaner\\'])
        postbasesList = postbasesList.concat([connective_contemporative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'do!') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'do (in the future)!') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~-ki\\'])
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'You, stop!') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        postbasesList = postbasesList.concat(['@~+(t)viiqna\\'])
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'You, do not!') {
        postbasesList = processPostbases(currentPostbases, base, postbases)
        if (person == 2) {
          postbasesList = postbasesList.concat(['@~+yaquna\\'])
        } else {
          postbasesList = postbasesList.concat(['-nrilki\\'])
        }
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      }
    }
  }

    //post process  '+(t)vtek', => '+(t)vetek' if preceding postbase ends in consonant


    if (moodSpecific == 'do (in the future)!' && this.state.objectExists == false && person == 2 && people == 1) {
      postbasesList[postbasesList.length-1] = '+na'
    }
    if (moodSpecific == 'do (in the future)!' && postbasesList[postbasesList.length-1] == '@+nga') {
      postbasesList[postbasesList.length-1] = '@+a'
    }
    if (moodSpecific == 'You, do not!' && this.state.objectExists == false && person == 2 && people == 1) {
      postbasesList[postbasesList.length-1] = '@+k'
    } else if (moodSpecific == 'You, stop!' && this.state.objectExists == false && person == 2 && people == 1) {
      postbasesList[postbasesList.length-1] = '@+k'
    } else if (moodSpecific == 'You, do not!' && this.state.objectExists == true && person == 2 && people == 1 && objectPerson == 3 && objectPeople == 1 ) {
      postbasesList[postbasesList.length-1] = '@+ku'
    } else if (moodSpecific == 'You, stop!' && this.state.objectExists == true && person == 2 && people == 1 && objectPerson == 3 && objectPeople == 1 ) {
      postbasesList[postbasesList.length-1] = '@+ku'
    } else if (moodSpecific == 'You, do not!' && this.state.objectExists == true && person == 2 && people == 1 && objectPerson == 1 && objectPeople == 1 ) {
      postbasesList[postbasesList.length-1] = '@+:(6)a'
      // console.log(postbasesList)
      // const index = postbasesList.indexOf('@~+yaquna')
      // postbasesList = postbasesList.splice(index,1)
      // console.log(postbasesList)
    }
    if (postbasesList[postbasesList.length-1] == '+(t)vtek') {
      let k = postbasesList[postbasesList.length-2]
      k = k[k.length-2]
      console.log(k)
      if (k != 'a' && k != 'e' && k != 'i' && k != 'u') {
        postbasesList[postbasesList.length-1] = '+(t)vetek'
      }
    }
    if (postbasesList[postbasesList.length-1] == '+(t)vci') {
      let k = postbasesList[postbasesList.length-2]
      k = k[k.length-2]
      if (k != 'a' && k != 'e' && k != 'i' && k != 'u') {
        postbasesList[postbasesList.length-1] = '+(t)veci'
      }
    }
    let added_word = ''
    if (moodSpecific=='who' && this.state.objectExists) {
      if (objectPeople == 1) {
        added_word='kina '
      } else if (objectPeople == 2) {
        added_word='kinkuk '
      } else {
        added_word='kinkut '
      }
    } else if (moodSpecific=='who') {
      if (people == 1) {
        added_word='kina '
      } else if (people == 2) {
        added_word='kinkuk '
      } else {
        added_word='kinkut '
      }
    } else if (moodSpecific=='when (in past)') {
      added_word='qangvaq '
      // newText2 = nlp(newText2).sentences().toPastTense().out()
    } else if (moodSpecific=='when (in future)') {
      added_word='qaku '
      // newText2 = nlp(newText2).sentences().toFutureTense().out()
    } else if (moodSpecific=='at where') {
      added_word='nani '
    } else if (moodSpecific=='from where') {
      added_word='naken '
    } else if (moodSpecific=='toward where') {
      added_word='natmun '
    } else if (moodSpecific=='why') {
      added_word='ciin '
    } else if (moodSpecific=='how') {
      added_word='qaillun '
    } else {
      added_word=''
    }
    // } else if (moodSpecific=='when (past)') {
    //   newText2 = nlp(newText2).sentences().toPastTense().out()
    // } else if (moodSpecific=='when (future)') {
    //   newText2 = nlp(newText2).sentences().toFutureTense().out()
    // }
    console.log('new list', postbasesList);
    this.setState({postbasesList: postbasesList})
    let postbasesString = "";
    postbasesList.forEach((e) => {
      postbasesString = postbasesString + "&postbase=" + encodeURIComponent(e);
    });
    // console.log(postbasesList)
    // console.log(postbasesString)
    currentPostbases = currentPostbases.reverse()

    axios
      .get(API_URL + "/concat?root=" + word.replace('-', '') + postbasesString)
      .then(response => {
        // console.log(response.data);
        this.setState({
          addedWord: added_word,
          modifiedWord: response.data.concat,
          modifiedEnglish: newEnglish,
          currentPostbases: currentPostbases,
          text1after: newText1after,
          text2after: newText2after,
          text1: newText1,
          text2: newText2,
          text3: newText3,
          text3tense: newText3tense,
          postbasesEnglish: postbasesEnglish,
          englishEnding: englishEnding,
          colorIndexes: response.data.indexes
        });
      });
    }

    modifyWordNoun(person, people, possessorPerson, possessorPeople, mood, moodSpecific, nounEnding, verbEnding, value4, word, currentPostbases) {
      if (value4 != 1 || possessorPeople != 0 || mood != 'absolutive' || verbEnding == true || nounEnding == true || currentPostbases.length > 0) {
        word = this.state.usage
      }
      currentPostbases = currentPostbases.sort((p1, p2) => {
        return (nounPostbases[p1].priority > nounPostbases[p2].priority) ? 1 : ((nounPostbases[p1].priority < nounPostbases[p2].priority) ? -1 : 0);
      });
      console.log(currentPostbases)

      currentPostbases = currentPostbases.reverse()
      let newEnglish =  this.state.entry.definition;
      let newText1 = ''
      let newText2 = this.state.entry.definition;
      let newText3 = ''


      let postbasesList = [];
      let base = '';
      if (currentPostbases.length == 1 || currentPostbases.length == 0) {
        base = word
      } else {
        base = nounPostbases[currentPostbases[0]].expression_postbase
      }

      console.log(currentPostbases)
      let processPostbases = (currentPostbases, base, nounPostbases) => {
        postbasesList = currentPostbases.map((p) => {
          if (nounPostbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return nounPostbases[p].expression_conditional_postbase
            } else {
              return nounPostbases[p].expression_postbase
            }
          } else {
            return nounPostbases[p].expression_postbase
          };
        })
        return postbasesList
       };

      // let processEndingPostbase = (currentPostbases, base, nounPostbases, endingPostbase) => {
      //   if (nounPostbases[endingPostbase].conditional_rule == 'attaching_to_te') {
      //     if (base.slice(base.length-3,base.length-1)=='te') {
      //       postbasesList = postbasesList.concat(nounPostbases[endingPostbase].expression_conditional_end)
      //     } else {
      //       postbasesList = postbasesList.concat(nounPostbases[endingPostbase].expression_end)
      //     }
      //   } else {
      //     return postbasesList = postbasesList.concat(nounPostbases[endingPostbase].expression_end)
      //   };
      //   return postbasesList
      // };
      let returnEnding = (value4, possessorPerson, possessorPeople, mood) => {
        if (mood == 'absolutive') {
          return [absolutive_endings[value4][possessorPerson][possessorPeople]]
        } else if (mood == 'localis') {
          return [localis_endings[value4][possessorPerson][possessorPeople]]
        } else if (mood == 'terminalis') {
          return [terminalis_endings[value4][possessorPerson][possessorPeople]]
        } else if (mood == 'relative') {
          return [relative_endings[value4][possessorPerson][possessorPeople]]
        } else if (mood == 'equalis') {
          return [equalis_endings[value4][possessorPerson][possessorPeople]]
        } else if (mood == 'vialis') {
          return [vialis_endings[value4][possessorPerson][possessorPeople]]
        } else if (mood == 'ablative') {
          return [ablative_endings[value4][possessorPerson][possessorPeople]]
        }
      }

       let endingPostbase = []
        if (possessorPerson > 0) {
          postbasesList = processPostbases(currentPostbases, base, nounPostbases)
          postbasesList = postbasesList.concat(returnEnding(value4,possessorPerson,possessorPeople,mood))
          // postbasesList = postbasesList.concat([absolutive_endings[value4][possessorPerson][possessorPeople]]);
        } else if (verbEnding) {
          postbasesList = processPostbases(currentPostbases, base, nounPostbases)
          postbasesList = postbasesList.concat(indicative_intransitive_endings[person][people]);
        } else if (value4 != 1) {
          postbasesList = processPostbases(currentPostbases, base, nounPostbases)
          postbasesList = postbasesList.concat(returnEnding(value4,possessorPerson,possessorPeople,mood))
          // postbasesList = postbasesList.concat([absolutive_endings[value4][possessorPerson][possessorPeople]]);
        } else {
          if (currentPostbases.length > 0 && verbEnding) {
            postbasesList = processPostbases(currentPostbases, base, nounPostbases)
            postbasesList = postbasesList.concat(indicative_intransitive_endings[person][people]);
          } else if (currentPostbases.length > 0 && mood == 'absolutive') {
            let lastPostbase = currentPostbases[currentPostbases.length-1]
            let remainingPostbases = currentPostbases.slice(0,[currentPostbases.length-1])
            postbasesList = processPostbases(remainingPostbases, base, nounPostbases)
            postbasesList = postbasesList.concat(nounPostbases[lastPostbase].expression_end);  //make smarter
          } else {
            postbasesList = processPostbases(currentPostbases, base, nounPostbases)
            postbasesList = postbasesList.concat(returnEnding(value4,possessorPerson,possessorPeople,mood))
            // postbasesList = postbasesList.concat([absolutive_endings[value4][possessorPerson][possessorPeople]]);
          }
        }
        console.log(postbasesList)
        // currentPostbases = currentPostbases.reverse()

        // if (mood == 'indicative') {
        //   postbasesList = processPostbases(currentPostbases, base, nounPostbases)
        //   console.log(postbasesList)
        //   console.log(value4)
        //   console.log(possessorPerson)
        //   console.log(possessorPeople)
        //   postbasesList = postbasesList.concat([absolutive_endings[value4][possessorPerson][possessorPeople]]);
        // }
        let added_word = ''
        let adder = ''
        let adjectivesEnglish = []
        let nounEndingEnglish = []
        let verbEndingEnglish = []
        let subjectis = ''
        console.log(currentPostbases)

        let getsubjectis = (does, people, person) => {
          if (does) {
            if (people == 1 && person == 3) {
              subjectis = 'has'
            } else {
              subjectis = 'have'
            }
          } else {
            if (people == 1 && person == 1) {
              subjectis = 'am'
            } else if (people == 1 && person == 3) {
              subjectis = 'is'
            } else {
              subjectis = 'are'
            }
          }
          return subjectis
        }

        if (currentPostbases.length>0) {
          currentPostbases.forEach((p) => {
            adder = ''
            if (p > -1 && p < 7) {
              adjectivesEnglish.push(nounPostbases[p].englishModifier(adder));
            } else if (p > 6 && p < 11) {
              nounEndingEnglish.push(nounPostbases[p].englishModifier(adder));
            } else if (p == 14 || p == 21) {
              verbEndingEnglish.push(getsubjectis(true,people,person)+' '+nounPostbases[p].englishModifier(adder));
            } else {
              verbEndingEnglish.push(getsubjectis(false,people,person)+' '+nounPostbases[p].englishModifier(adder));
            }
          })
        }

        console.log(adjectivesEnglish)
        console.log(nounEndingEnglish)
        console.log(verbEndingEnglish)



      this.setState({postbasesList: postbasesList})
      let postbasesString = "";
      postbasesList.forEach((e) => {
        postbasesString = postbasesString + "&postbase=" + encodeURIComponent(e);
      });
      // console.log(postbasesList)
      // console.log(postbasesString)
      currentPostbases = currentPostbases.reverse()

      axios
        .get(API_URL + "/concat?root=" + word.replace('-', '') + postbasesString)
        .then(response => {
          // console.log(response.data);
          this.setState({
            modifiedWord: added_word + response.data.concat,
            modifiedEnglish: newEnglish,
            currentPostbases: currentPostbases,
            text1: newText1,
            text2: newText2,
            text3: newText3,
            adjectivesEnglish: adjectivesEnglish,
            nounEndingEnglish: nounEndingEnglish,
            verbEndingEnglish: verbEndingEnglish,
            colorIndexes: response.data.indexes
          });
        });
      }



  switchMode(event, data) {
    this.setState({ advancedMode: !this.state.advancedMode });
    if (this.state.advancedMode) {
      this.props.history.push(this.verb ? `${this.props.match.url}/verb` : `${this.props.match.url}/noun`);
    }
    else {
      this.props.history.push(this.verb ? `${this.props.match.url}/verb/all` : `${this.props.match.url}/noun/all`);
    }
  }

  render() {
    console.log(this.state)
    //       {React.cloneElement(this.props.children, { advancedMode: this.state.advancedMode })}
    var dict1 = [];
    var dict2 = [];
    var dict3 = [];
    for (var i = 0; i < 14; i++) { // this portion of the code is meant to remove options that are not possible in subject/object combos
      let flag1 = false;
      let flag2 = false;
      if (this.state.mood == 'indicative' || this.state.mood == 'subordinative') {
        if (this.state.value1[0]=='1' && options2[i].value[0]=='1' || this.state.value1[0]=='2' && options2[i].value[0]=='2') { //process options2 and options3 first
          flag1 = true
        }
        if (options2[i].value[0]!=4) { //object 4th person not allowed
          dict2.push({id: options2[i].id,value: options2[i].value,text: options2[i].text,disabled:flag1});
        }
        if (options3[i].value[0]!=4) { //object 4th person not allowed for possessive form
          dict3.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
        }
        if (this.state.value2[0]=='1' && options1[i].value[0]=='1' || this.state.value2[0]=='2' && options1[i].value[0]=='2') { //process options1 next
          flag2 = true
        }
        if (this.state.mood == 'subordinative') {
          if (options1[i].value[0]!=3) { //subject 3rd person not allowed
            dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
          }
        } else {
          if (options1[i].value[0]!=4) { //subject 4th person not allowed
            dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
          }
        }
      } else if (this.state.mood == 'optative') {
        if (this.state.value1[0]=='1' && options2[i].value[0]=='1' || this.state.value1[0]=='2' && options2[i].value[0]=='2') { //process options2 and options3 first
          flag1 = true
        }
        if (options2[i].value[0]!=4) { //object 4th person not allowed
          dict2.push({id: options2[i].id,value: options2[i].value,text: options2[i].text,disabled:flag1});
        }
        if (options3[i].value[0]!=4) { //object 4th person not allowed for possessive form
          dict3.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
        }
        if (this.state.value2[0]=='1' && options1[i].value[0]=='1' || this.state.value2[0]=='2' && options1[i].value[0]=='2') { //process options1 next
          flag2 = true
        }
        if (options1[i].value[0]!=4) { //subject 4th person not allowed
          dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].otext,disabled:flag2});
        }
      } else if (this.state.mood == 'interrogative') {
        if (this.state.objectExists) {
          if (this.state.value1[0]=='1' && options2[i].value[0]=='1' || this.state.value1[0]=='2' && options2[i].value[0]=='2'){ //process options2 and options3 first
            flag1 = true
          }
          if (options2[i].value[0]!=4) { //object 4th person not allowed
            dict2.push({id: options2[i].id,value: options2[i].value,text: options2[i].text,disabled:flag1});
          }
          if (options3[i].value[0]!=4) { //object 4th person not allowed for possessive form
            dict3.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
          }
          if ((this.state.value2[0]=='1' && options1[i].value[0]=='1' || this.state.value2[0]=='2' && options1[i].value[0]=='2') || options1[i].value[0]=='1')  { //process options1 next
            flag2 = true
          }
          if (options1[i].value[0]!=4) { //subject 4th person not allowed
            dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
          }          
        } else {
          if (options1[i].value[0]!=4) { //subject 4th person not allowed
            dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text});
          }             
        }
      } else { //all connective moods
        if ((this.state.value1[0]=='1' && options2[i].value[0]=='1') || (this.state.value1[0]=='2' && options2[i].value[0]=='2') || (this.state.value1[0]=='4' && options2[i].value[0]=='4')) { //process options2 and options3 first
          flag1 = true
        }
        dict2.push({id: options2[i].id,value: options2[i].value,text: options2[i].text,disabled:flag1});
        dict3.push({id: options3[i].id,value: options3[i].value,text: options3[i].text,disabled:flag1});
        if ((this.state.value2[0]=='1' && options1[i].value[0]=='1') || (this.state.value2[0]=='2' && options1[i].value[0]=='2') || (this.state.value2[0]=='4' && options1[i].value[0]=='4')) { //process options1 next
          flag2 = true
        }
        dict1.push({id: options1[i].id,value: options1[i].value,text: options1[i].text,disabled:flag2});
      }
    }


    const{value1}=this.state
    const{value2}=this.state
    const{value3}=this.state
    const{id1}=this.state
    // console.log(this.state.postbasesList)
    // console.log(this.state.currentPostbases)
    // console.log(this.state.colorIndexes)
    let countEndingPostbase = this.state.postbasesList.length-this.state.currentPostbases.length
    // console.log(countEndingPostbase)
    let postbasesDisplay = ''
    let wordDisplay = ''
    let updatedPostbasesList = []
    let nounType = ''

    // if (this.state.possessiveButton == 1) {
    //   if (this.state.currentPostbases > 0) {
    //     if (this.state.currentPostbases[0] > 6) { 
    //       nounType = 'possessive_nounending'
    //     } else {
    //       nounType = 'possessive'
    //     }
    //   } else {
    //     nounType = 'possessive_nounending'
    //   }
    // }
    // if (this.state.verbEnding) {
    //   if (this.state.currentPostbases > 1) {
    //     if (this.state.currentPostbases[1] > 5) {
    //       nounType = 'verbendingnounending'
    //     } else {
    //       nounType = 'verbendingonly'
    //     }        
    //   } else {
    //     nounType = 'verbendingonly'
    //   }
    // }
    // if (this.state.currentPostbases.length > 0) {
    //   if (this.state.currentPostbases[0] > 6) {
    //     if (this.state.mood != 'absolutive') {
    //       nounType = 'moodplusnounending'
    //     } else {
    //       if (this.state.value4 > 1) {
    //         nounType = 'nounendingplural'
    //       } else {
    //         nounType = 'nounendingonly'
    //       }
    //     }
    //   } else {
    //     if (this.state.mood != 'absolutive') {
    //       nounType = 'moodonly'
    //     } else {
    //       if (this.state.value4 > 1) {
    //         nounType = 'pluralonly'
    //       } else {
    //         nounType = 'postbaseonly'
    //       }
    //     }
    //   }
    // } else {
    //   if (this.state.mood != 'absolutive' || this.state.value4 != 1) {
    //     nounType = 'moodorplural'
    //   } else {
    //     nounType = ''
    //   }
    // }

        // updatedPostbasesList.push(this.state.postbasesList[this.state.postbasesList.length-2])
        // updatedPostbasesList.push(this.state.postbasesList[this.state.postbasesList.length-1])
    // console.log(nounType)
    
    if (this.verb || !(this.state.verbEnding)) {
      postbasesDisplay = (
        <span>
        <span style={{color: this.state.colorsList[0]}}>{this.state.currentWord}</span>
        {this.state.postbasesList.slice(0,this.state.postbasesList.length-countEndingPostbase).map((p, i) => {
          return <span style={{color: this.state.colorsList[2+this.state.postbasesList.length-countEndingPostbase-i]}}>{' ' + p}</span>;
        })}
        {this.state.postbasesList.slice(this.state.postbasesList.length-countEndingPostbase).map((p, i) => {
          return <span style={{color: this.state.colorsList[2]}}>{' ' + p}</span>; // change to 2-i for other color
        })}
        </span>
      );
      // if (this.state.currentPostbases.length == 0) {
      //   console.log('no postbases')
      // }
      wordDisplay = (
        <span>
        {this.state.colorIndexes.map((index, i) => {
          if (i == 0) {
            return <span style={{color: this.state.colorsList[0]}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          } else if (i < this.state.colorIndexes.length-countEndingPostbase) {
            return <span style={{color: this.state.colorsList[2+this.state.colorIndexes.length-countEndingPostbase-i]}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          } else if (i == this.state.colorIndexes.length-countEndingPostbase) {
            return <span style={{color: this.state.colorsList[2]}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i])}</span>;
          }
        })}
        </span>
      );
    } else {
      postbasesDisplay = (
          // {this.state.currentPostbases[0] > 15 ? 
        //   {this.state.currentPostbases

        //   }
        //  : 
        //  }
        <span>
        <span style={{color: this.state.colorsList[0]}}>{this.state.currentWord}</span>
        {this.state.postbasesList.slice(0,this.state.postbasesList.length-countEndingPostbase-1).map((p, i) => {
          return <span style={{color: this.state.colorsList[2+this.state.postbasesList.length-countEndingPostbase-i]}}>{' ' + p}</span>;
        })}
        {this.state.postbasesList.slice(this.state.postbasesList.length-countEndingPostbase-1).map((p, i) => {
          return <span style={{color: this.state.colorsList[2]}}>{' ' + p}</span>;
        })}
        </span>
      );
      if (this.state.currentPostbases.length == 0) {
        console.log('no postbases')
      }
      wordDisplay = (
        <span>
        {this.state.colorIndexes.map((index, i) => {
          if (i == 0) {
            return <span style={{color: this.state.colorsList[0]}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          } else if (i < this.state.colorIndexes.length-countEndingPostbase-1) {
            return <span style={{color: this.state.colorsList[2+this.state.colorIndexes.length-countEndingPostbase-i]}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          } else if (i == this.state.colorIndexes.length-countEndingPostbase-1) {
            return <span style={{color: this.state.colorsList[2]}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i])}</span>;
          }
        })}
        </span>
      );
    }

//       postbasesDisplay = (
//         <span>
//         <span style={{color: this.state.colorsList[0]}}>{this.state.currentWord}</span>
//         {this.state.postbasesList.slice(0,this.state.postbasesList.length-countEndingPostbase).map((p, i) => {
//           // console.log(i)
//           // console.log(this.state.postbasesList.length)
//           // console.log(countEndingPostbase)
//           return <span style={{color: this.state.colorsList[this.state.postbasesList.length-1-i]}}>{' ' + p}</span>;
//         })}
//         {this.state.postbasesList.slice(this.state.postbasesList.length-countEndingPostbase,this.state.postbasesList.length+1).map((p, i) => {
//           return <span style={{color: this.state.colorsList[2+i]}}>{' ' + p}</span>;
//         })}
//         </span>
//       );
//       if (this.state.currentPostbases.length == 0) {
//         console.log('no postbases')
//       }
//       wordDisplay = (
//         <span>
//         {this.state.colorIndexes.map((index, i) => {
//           let c = this.state.colorsList[i];
//           if (i < this.state.colorIndexes.length-1) {
//             return <span style={{color: c}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
//           }
//           else {
//             return <span style={{color: c}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i])}</span>;
//           }
//         })}
//         </span>
//       );
// {color: 'black'}

    // console.log(this.state.postbasesEnglish)
    // console.log(this.state.currentPostbases)

    //MAKE MORE SUCCINCT, also assumes in the future only one time postbase at a time
    let timeIndex = ''
    if (this.state.currentPostbases.includes(5)) {
      timeIndex = this.state.currentPostbases.indexOf(5)
    } else if (this.state.currentPostbases.includes(7)) {
      timeIndex = this.state.currentPostbases.indexOf(7)
    } else if (this.state.currentPostbases.includes(8)) {
      timeIndex = this.state.currentPostbases.indexOf(8)
    } else if (this.state.currentPostbases.includes(9)) {
      timeIndex = this.state.currentPostbases.indexOf(9)
    }
    // console.log(timeIndex)
    let colorIndexMax = 2+this.state.colorIndexes.length-this.state.postbasesList.length-this.state.currentPostbases.length
    //
    let nounEndingcounter = 0
    let verbEndingcounter = 0
    if (this.state.nounEndingEnglish != '') {
      nounEndingcounter = 1
    }
    if (this.state.verbEnding) {
      verbEndingcounter = -1
    }
    // console.log(this.state.adjectivesEnglish)
    let yupikAllPostbasesProps = {
      'mood': this.state.mood,
      'nounEnding': this.state.nounEnding,
      'moodSpecific': this.state.moodSpecific,
      'allowable_next_ids': this.state.allowable_next_ids,
      'currentPostbases': this.state.currentPostbases,
      'verbEnding': this.state.verbEnding,
      'value4': this.state.value4,
      'possessiveButton': this.state.possessiveButton,
      'setMood': this.setMood.bind(this),
      'setNounEnding': this.setNounEnding.bind(this),
      'setPostbase': this.setPostbase.bind(this),
      'setEnclitic': this.setEnclitic.bind(this),
      'setValue4': this.setValue4.bind(this),
      'setPossessiveButton': this.setPossessiveButton.bind(this),
    };
    let fixedStyle = {
      position: 'fixed',
      margin: 'auto',
      top: '5.9em',
      zIndex: 100,
      backgroundColor: 'white',
      width: '92%',
      //borderBottom: '1px solid black',
    };
    return (
      <div>
      <StickyMenu word={this.state.currentWord} goBack={this.props.history.goBack} switchMode={this.switchMode.bind(this)} allPostbasesMode={this.allPostbasesMode.bind(this)} />
      <Container attached style={{ paddingTop: '6em' }}>
      <Visibility
        onTopPassed={() => {console.log('top passed!'); this.setState({ headerFixed: true }); }}
        onTopPassedReverse={() => {console.log('top reverse passed!'); this.setState({ headerFixed: false }); }}
        once={false}
        offset={[120, 120]}
      >
        <Grid style={this.state.headerFixed ? fixedStyle : {top: '1em'}}>
          {this.state.advancedMode ?
          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              {postbasesDisplay}
            </Grid.Column>
          </Grid.Row>
          : ''}

          <Grid.Row>

            <Grid.Column verticalAlign='middle' align='center'>
              <Header textAlign='center' as='h1'>
              {this.state.encliticExpression == '(again)' ? 'ataam '
              :''}
              {this.state.addedWord !== '' ? 
              <span style={{color: this.state.colorsList[2]}}>{this.state.addedWord}</span>
              :''}
              {wordDisplay}
              {this.state.enclitic !== '' && this.state.encliticExpression !== '(again)' ? this.state.enclitic
              :''}
              <span style={{color: this.state.colorsList[2]}}>
              {this.state.mood === 'interrogative' ? '?' :''}
              <Icon name='volume up' color='black' size='small' onClick={this.speak.bind(this)} />  
              </span>
              </Header>
                          
            </Grid.Column>

          </Grid.Row>


          {this.verb ?
          (this.state.nounEnding !== '' ?
          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              <Header as='h4' align='center'>
                <span style={{color: this.state.colorsList[2]}}>{this.state.text2}</span>
                {' '}
                {this.state.text2after}
                {' '}
                {this.state.postbasesEnglish.map((p, i) => {
                return <span style={{color: this.state.colorsList[3+i]}}>{' ' + p}</span>;
                })}
                {' '}
                <span style={{color: this.state.colorsList[0]}}>{this.state.englishEnding[0]}</span>
                {' '}
                {this.state.text3}
                {' '}
                {timeIndex !== '' ? 
                  <span style={{color: this.state.colorsList[3+timeIndex]}}>{this.state.text3tense}</span>
                  :
                  <span style={{color: this.state.colorsList[2]}}>{this.state.text3tense}</span>
                }
              </Header>
            </Grid.Column>
          </Grid.Row>
          :
          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              <Header as='h4' align='center'>
                {' '}
                <span style={{color: this.state.colorsList[2]}}>{this.state.text1}</span>
                {' '}
                {timeIndex !== '' ? 
                  <span style={{color: this.state.colorsList[3+timeIndex]}}>{this.state.text1after}</span>
                  :
                  this.state.text1after
                }
                {' '}
                <span style={{color: this.state.colorsList[2]}}>
                <Dropdown inline options={dict1} onChange={this.setValue1.bind(this)} value={value1} />
                </span>
                {' '}
                <span style={{color: this.state.colorsList[2]}}>{this.state.text2}</span>
                {' '}
                {timeIndex !== '' ? 
                  <span style={{color: this.state.colorsList[3+timeIndex]}}>{this.state.text2after}</span>
                  :
                  this.state.text2after
                }
                {' '}
                {this.state.postbasesEnglish.map((p, i) => {
                return <span style={{color: this.state.colorsList[3+i]}}>{' ' + p}</span>;
                })}
                {' '}
                <span style={{color: this.state.colorsList[0]}}>{this.state.englishEnding[0]}</span>
                {' '}

                {this.state.objectExists && this.state.moodSpecific !== 'who'  ?
                <span style={{color: this.state.colorsList[2]}}>
                <Dropdown inline options={dict2} onChange={this.setValue2.bind(this)} value={value2} />
                </span>
                : 
                ''
                }
                {this.state.objectExists && this.state.moodSpecific === 'who'  ?
                <span style={{color: this.state.colorsList[2]}}>
                (<Dropdown inline options={dict2} onChange={this.setValue2.bind(this)} value={value2} />)
                </span>
                : 
                ''
                }
                {' '}
                {this.state.text3}
                {' '}
                {timeIndex !== '' ? 
                  <span style={{color: this.state.colorsList[3+timeIndex]}}>{this.state.text3tense}</span>
                  :
                  <span style={{color: this.state.colorsList[2]}}>{this.state.text3tense}</span>
                }
                
                {this.state.encliticExpression !== '' ? this.state.encliticExpression :''}
                {this.state.mood === 'optative' ? '!' :''}
              </Header>
            </Grid.Column>
          </Grid.Row>
          )
          :
          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              <Header as='h4' align='center'>

                {(this.state.verbEnding ?
                  <span style={{color: this.state.colorsList[2]}}>
                  <Dropdown inline options={dict1} onChange={this.setValue1.bind(this)} value={value1} />
                  </span>:
                  ''
                )}
                {' '}
                {(this.state.possessiveButton == 1 ?
                  <span style={{color: this.state.colorsList[2]}}>
                  <Dropdown inline options={dict3} onChange={this.setValue3.bind(this)} value={value3} />
                  </span>:
                  ''
                )}

                {this.state.verbEndingEnglish != '' ?
                <span style={{color: this.state.colorsList[2]}}>{this.state.verbEndingEnglish}</span>
                :
                ''
                }
                {this.state.adjectivesEnglish.reverse().map((p, i) => {
                return <span style={{color: this.state.colorsList[3+i+nounEndingcounter-verbEndingcounter]}}>{' ' + p}</span>;
                })}
                {' '}
                <span style={{color: this.state.colorsList[0]}}>{this.state.text2}</span>
                {' '}
                {this.state.nounEndingEnglish != '' ?
                <span style={{color: this.state.colorsList[3-verbEndingcounter]}}>({this.state.nounEndingEnglish})</span>
                :
                ''
                }
                {' '}
                {this.state.verbEnding== false && this.state.value4 == 1 ?
                ''
                :
                ''
                }
                {this.state.verbEnding== false && this.state.value4 == 2 ?
                <span style={{color: this.state.colorsList[2]}}>(two of them)</span>
                :
                ''
                }
                {this.state.verbEnding== false && this.state.value4 == 3 ?
                <span style={{color: this.state.colorsList[2]}}>(three of them)</span>
                :
                ''
                }
              </Header>
            </Grid.Column>
          </Grid.Row>
          }


          {this.state.currentPostbases.length > 0 || (this.verb && this.state.mood != 'indicative') || (this.verb == false && this.state.mood != 'absolutive') ?
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <List horizontal>
                {this.verb && this.state.alternateTense != '' && this.state.mood == 'indicative' && this.state.currentPostbases.length == 0 && this.state.person != 1 ?
                  <Grid.Row>
                    <Grid.Column>
                      <Header fontStyle='italic' as='h5' align='center'>
                        <i> could also be in {this.state.alternateTense} tense </i>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  : ''
                }

                {this.state.mood !== 'absolutive' && this.verb == false ?
                  <List.Item onClick={(event) => this.setMoodNoun(this.state.mood, event)}>
                    <Chip  text={this.state.mood} />
                  </List.Item>
                :
                ''
                }
                {this.state.mood == 'interrogative' || this.state.mood == 'optative'?
                  <List.Item onClick={(event) => this.setMoodVerb(this.state.mood, this.state.moodSpecific, event)}>
                    <Chip  text={this.state.moodSpecific} />
                  </List.Item>
                  :
                  ''
                }

                { this.state.mood == 'connective_precessive' || this.state.mood == 'connective_consequential' || this.state.mood == 'connective_contingent' || this.state.mood == 'connective_concessive' || this.state.mood == 'connective_conditional' || this.state.mood == 'connective_first_contemporative' || this.state.mood == 'connective_second_contemporative' || this.state.mood == 'subordinative' ?
                  <List.Item onClick={(event) => this.setMoodVerb(this.state.mood, this.state.moodSpecific, event)}>
                    <Chip  text={this.state.moodSpecific} />
                  </List.Item>
                  :
                  ''
                }

                {this.state.mood == 'nounEnding' ?
                  <List.Item onClick={(event) => this.setNounEnding(this.state.nounEnding, event)}>
                    <Chip  text={this.state.nounEnding} />
                  </List.Item>
                  :
                  ''
                }
                {this.state.currentPostbases.map((index) =>
                  <List.Item onClick={(event) => this.setPostbase(index, event)}>
                    {this.verb ?
                      <Chip  text={postbases.find((p) => p.id == index).description} />
                    :
                      <Chip  text={nounPostbases.find((p) => p.id == index).description} />
                    }
                  </List.Item>
                )}
              </List>
            </Grid.Column>
          </Grid.Row>
          : ''}

        </Grid>
        </Visibility>

        <Visibility
          onTopVisibleReverse={() => {console.log('top visible!'); this.setState({ headerFixed: false }); }}
          offset={this.state.headerFixed ? [100, 0] : [100, 0]}
        >
        <div style={this.state.headerFixed ? {paddingTop: '12em'} : {paddingTop: '1.5em'}}>
        <Route exact path={`${this.props.match.path}/noun`} component={YupikModifyNoun} />
        <Route exact path={`${this.props.match.path}/noun/all`} render={(props) => <YupikAllNounPostbases {...props} {...yupikAllPostbasesProps} />} />
        <Route exact path={`${this.props.match.path}/noun/descriptors`} render={(props) => <YupikNounDescriptors {...props} {...yupikAllPostbasesProps} />} />
        <Route exact path={`${this.props.match.path}/noun/phrase`} render={(props) => <YupikNounPhrase {...props} {...yupikAllPostbasesProps} />} />
        <Route exact path={`${this.props.match.path}/noun/combine`} render={(props) => <YupikNounCombine {...props} {...yupikAllPostbasesProps} />} />

        <Route exact path={`${this.props.match.path}/verb`} render={(props) => <YupikModifyVerb {...props} advancedMode={this.state.advancedMode}  {...yupikAllPostbasesProps} />} />
        <Route exact path={`${this.props.match.path}/verb/all`} render={(props) => <YupikAllPostbases {...props} {...yupikAllPostbasesProps}/>} />
        <Route exact path={`${this.props.match.path}/verb/ending`} component={YupikEndingGroups} />
        <Route exact path={`${this.props.match.path}/verb/ending/:ending_group_id`} render={(props) => <YupikEnding {...props} {...yupikAllPostbasesProps}/>} />
        <Route exact path={`${this.props.match.path}/verb/ending/:ending_group_id/postbase`} component={YupikPostbaseGroups} />
        <Route exact path={`${this.props.match.path}/verb/ending/:ending_group_id/postbase/:postbase_group_id`} render={(props) => <YupikPostbase {...props} {...yupikAllPostbasesProps}/>} />
        </div>
        </Visibility>
      </Container>
      </div>
    );
  }
}

export default withRouter(YupikModifyLayout);
