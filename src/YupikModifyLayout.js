import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import { Container, Grid, Header, Dropdown, List } from 'semantic-ui-react';
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
      id1: "",
      value1_text: "he",
      value2_text: "it",
      value3_text: "",
      completeSentence: "",
      allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
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
    console.log('newState', newState, this.state)
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
        if (newState.possessorPeople != this.state.possessorPeople) {
          if (newState.possessorPeople != 0) {
            newState.verbEnding = false
            this.state.verbEnding = false
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
          value2: "31-3(2)",
          objectPeople: 1,
          objectPerson: 3,
          text2: res[1],
          originalText2: res[0],
          text3: res[2],
          originalText3: res[2],
        }
      }
      else if (res[1] === 'its') {
        new_state = {
          ...new_state,
          value3: "31-3(3)",
          objectPeople: 1,
          objectPerson: 3,
          possessiveObject: true,
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
      if (currentPostbases.length === 0) {
        this.setState({allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]})
      } else if (currentPostbases.length === 1) {
        this.setState({allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]})
        //this.setState({allowable_next_ids: postbases[currentPostbases[0]].allowable_next_ids})
      } else {
        this.setState({allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]})
      }
      this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.currentWord, currentPostbases);
    }
    else {
      let verbEnding = this.state.verbEnding
      if (index > -1) {
        currentPostbases.splice(index, 1);
        if (postbase_id > 10) {
          this.setState({ verbEnding: false})
          verbEnding = false
        }
      } else if (postbase_id > 6 && postbase_id < 11) {
        for (var i=7; i<11;i++){
          if (currentPostbases.indexOf(i)>-1) {
            currentPostbases.splice(currentPostbases.indexOf(i),1);
          }
        }
        currentPostbases.push(postbase_id);
      } else if (postbase_id > 10) {
        for (var i=11; i<22;i++){
          if (currentPostbases.indexOf(i)>-1) {
            currentPostbases.splice(currentPostbases.indexOf(i),1);
          }
        }
        currentPostbases.push(postbase_id);
        this.setState({ verbEnding: true})
        verbEnding = true
        this.setState({ possessiveButton: 0, possessorPeople: 0, possessorPerson: 0})
      }
      else {
        currentPostbases.push(postbase_id);
      }
      console.log(currentPostbases)
      if (currentPostbases.length === 0) {
        this.setState({allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]})
      } else if (currentPostbases.length === 1) {
        this.setState({allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]})
        //this.setState({allowable_next_ids: postbases[currentPostbases[0]].allowable_next_ids})
      } else {
        this.setState({allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]})
      }
      this.modifyWord(this.state.person, this.state.people, this.state.possessorPerson, this.state.possessorPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, verbEnding,this.state.value4, this.state.currentWord, currentPostbases);
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
    console.log(currentPostbases)
    currentPostbases = currentPostbases.reverse()

    let newEnglish =  this.state.currentEnglish;
    //newEnglish = nlp(newEnglish).sentences().toPresentTense().out('text');
    // FIXME remove dash for verbs only
    // currentPostbases.forEach((p) => {
    //   if (!postbases[p].tense) {
    //     newEnglish = postbases[p].englishModifier(newEnglish);
    //   }
    // });
    // newEnglish = person_english[person] + ' ' + newEnglish  + ' ' + people_english[people];
    // currentPostbases.forEach((p) => {
    //   if (postbases[p].tense) {
    //     newEnglish = postbases[p].englishModifier(newEnglish);
    //   }
    // // });


    // console.log(nlp('is grumbling').verbs().conjugate()[0])
    // console.log(nlp('is bloodstained').verbs().conjugate()[0])
    // console.log(nlp('bought something for').verbs().conjugate()[0])
    // console.log(nlp('cried out').verbs().conjugate()[0])
    // console.log(nlp('fell hard').verbs().conjugate()[0])
    // console.log(nlp('is standing').verbs().conjugate()[0])
    // console.log(nlp('beat').verbs().conjugate()[0])
    // console.log(nlp('trying').verbs().conjugate()[0])

    // // let test = 'bought'
    // // let originalverb = nlp(test).verbs().out().split(' ')[0]
    // // let verbtenses = nlp(test).verbs().conjugate()[0]
    // // let test1 = test.replace(originalverb,verbtenses.Gerund)
    // // let test2 = test.replace(originalverb,verbtenses.Infinitive)
    // // console.log(test1)
    // // console.log(test2)



    //     console.log(this.state.properties.includes('adjectival'))
    //     console.log(this.state.properties.includes('momentary'))

    let newText1 = ''
    let newText2 = this.state.originalText2
    let newText3 = this.state.originalText3
    console.log('original', newText2, newText3)
    //if (this.state.originalText2 == '' && this.state.originalText3 == '') { return; }
    let new_str = ''
    let new_adj = ''
    let be_adj = ''
    let being_adj = ''
    let tense = this.state.tense
    let subjectis = ''
    let nois = false
    console.log(moodSpecific)
    // if (moodSpecific == 'when did (past)') {
    //   tense = 'past'
    // } else if (moodSpecific == 'when will (future)') {
    //   tense = 'future'
    // }

    // add the 'active' ones 'did' 'does' 'do' depending on closest english
    let getsubjectis = (tense, people, person, does) => {
      if (does=='does') {
        if (people == 1 && person == 3) {
          if (tense == 'past') {
            subjectis = 'did'
          } else {
            subjectis = 'does'
          }
        } else {
          subjectis = 'do'
        }
      } else if (does=='had' && tense !='future') {
        if (people == 1 && person == 3) {
          subjectis = 'had'
        } else {
          subjectis = 'have'
        }
      } else if (tense == 'present') {
        if (people == 1 && person == 1) {
          subjectis = 'am'
        } else if (people == 1 && person == 3) {
          subjectis = 'is'
        } else {
          subjectis = 'are'
        }
      } else if (tense == 'past') {
        if (people == 1 && person == 1) {
          subjectis = 'was'
        } else if (people == 1 && person == 3) {
          subjectis = 'was'
        } else {
          subjectis = 'were'
        }
      } else if (tense == 'future') {
        if (people == 1 && person == 1) {
          subjectis = 'will'
        } else if (people == 1 && person == 3) {
          subjectis = 'will'
        } else {
          subjectis = 'will'
        }
      }
      return subjectis
  }
    if (newText2.includes('is')) {
      new_str = newText2.split("is");
      new_adj = new_str[1].trim()
    } else {
      new_adj = newText2.trim()
      nois = true
    }
    be_adj = 'be '+new_adj
    being_adj = 'being '+new_adj
    let addis = false
    addis = false
    let does = ''
    let conditionalbe = ' be '
    let hasDesire = false
    hasDesire = false

    // console.log(nlp('is no longer able to').sentences().toPastTense().out())
    // console.log(nlp('trying (unsuccessfully) to be happy').sentences().toFutureTense().out())
    // // console.log(nlp('is trying (unsuccessfully) to be happy').sentences().toPastTense().out())
    // // console.log(nlp('be happy').sentences().toPastTense().out())
    // console.log(newText1)
    // console.log(newText2)
    console.log(new_adj);
    var postbasesEnglish = []
    let test = new_adj
    let originalverb = nlp(test).verbs().out().split(' ')[0]
    let verbtenses = nlp(test).verbs().conjugate()[0]
    let gerund_new_adj = test.replace(originalverb,verbtenses.Gerund)
    let infinitive_new_adj = test.replace(originalverb,verbtenses.Infinitive)
    let firstpass = true
    let englishEnding = []
    let postbase28 = false
    let inTheFutureFlag = false
    let inThePastFlag = false
    let unmodifyingPostbases = [5, 11, 0, 1, 12, 6, 13, 14, 15, 19, 20, 27]
    let willbe = ''
    console.log(currentPostbases[0])
    console.log(new_adj)
    if (moodSpecific == 'You, stop!' || nounEnding == 'device for') {
      if (tense == 'past') {
        englishEnding.push('(in the past)')
      } else if (tense == 'future') {
        englishEnding.push('(in the future)')
      }
      if (currentPostbases.length>0) {
        if (currentPostbases.every(r=> unmodifyingPostbases.indexOf(r) >= 0)) {
          currentPostbases.forEach((p) => {
            postbasesEnglish.push(postbases[p].englishModifier(''))
          })
          englishEnding.push(gerund_new_adj)
        } else {
          firstpass = true
          currentPostbases.forEach((p) => {
            if (p == 5) {
              englishEnding.push(gerund_new_adj+' (in the past)')
            } else if (p == 7 || p == 8 || p == 9) {
              englishEnding.push(gerund_new_adj+' (in the future)')
              postbasesEnglish.push(postbases[p].englishModifier(''))
            } else if (firstpass) {
              if (unmodifyingPostbases.includes(p)) {
                postbasesEnglish.push(postbases[p].englishModifier(''))
              } else {
                if (p > 1 && p < 5 || p == 10 || p == 15 || p == 28 || p == 29) {
                  postbasesEnglish.push('being'+postbases[p].englishModifier(''))
                } else if (p > 20 && p < 27) {
                  postbasesEnglish.push(postbases[p].englishModifierGerund(''))
                } else {
                  postbasesEnglish.push(postbases[p].englishModifier(''))
                }
                firstpass = false
              }
            } else {
              if (p > 1 && p < 5 || p == 10 || p == 15 || p == 28 || p == 29) {
                postbasesEnglish.push('be'+postbases[p].englishModifier(''))
              } else if (p > 20 && p < 27) {
                postbasesEnglish.push(postbases[p].englishModifierPlural(''))
              } else {
                postbasesEnglish.push(postbases[p].englishModifier(''))
              }
              firstpass = false
            }
            if (p == 28) {
              postbase28 = true
            }
          })
          if (postbase28) {
            englishEnding.push(gerund_new_adj)
          } else {
            englishEnding.push(infinitive_new_adj)
          }
        }
      } else {
        if (this.state.properties.includes('adjectival')) {
          englishEnding.push('being '+new_adj)
        } else if (nois) {
          englishEnding.push(gerund_new_adj)
        } else {
          englishEnding.push(gerund_new_adj)
        }
      }
    } else if (mood == 'optative' ) {
      if (tense == 'past') {
        inThePastFlag = true
      } else if (tense == 'future') {
        inTheFutureFlag = true
      }
      if (currentPostbases.length>0) {
        if (currentPostbases.every(r=> unmodifyingPostbases.indexOf(r) >= 0)) {
          currentPostbases.forEach((p) => {
            postbasesEnglish.push(postbases[p].englishModifier(''))
          })
          englishEnding.push(infinitive_new_adj)
        } else {
          firstpass = true
          currentPostbases.forEach((p) => {
            if (p == 5) {
              inThePastFlag = true
              englishEnding.push(gerund_new_adj)
            } else if (p == 7 || p == 8 || p == 9) {
              englishEnding.push(gerund_new_adj)
              inTheFutureFlag = true
              postbasesEnglish.push(postbases[p].englishModifier(''))
            } else if (firstpass) {
              if (unmodifyingPostbases.includes(p)) {
                postbasesEnglish.push(postbases[p].englishModifier(''))
              } else {
                if (p > 1 && p < 5 || p == 10 || p == 15 || p == 28 || p == 29) {
                  postbasesEnglish.push('be'+postbases[p].englishModifier(''))
                } else if (p > 20 && p < 27) {
                  postbasesEnglish.push(postbases[p].englishModifierPlural(''))
                } else {
                  postbasesEnglish.push(postbases[p].englishModifier(''))
                }
                firstpass = false
              }
            } else {
              if (p > 1 && p < 5 || p == 10 || p == 15 || p == 28 || p == 29) {
                postbasesEnglish.push('be'+postbases[p].englishModifier(''))
              } else if (p > 20 && p < 27) {
                postbasesEnglish.push(postbases[p].englishModifierPlural(''))
              } else {
                postbasesEnglish.push(postbases[p].englishModifier(''))
              }
              firstpass = false
            }
            if (p == 28) {
              postbase28 = true
            }
          })
          if (postbase28) {
            englishEnding.push(gerund_new_adj)
          } else {
            englishEnding.push(infinitive_new_adj)
          }
        }
      } else {
        if (this.state.properties.includes('adjectival')) {
          englishEnding.push('being '+new_adj)
        } else if (nois) {
          englishEnding.push(infinitive_new_adj)
        } else {
          englishEnding.push(infinitive_new_adj)
        }
      }
    } else if (moodSpecific == 'when (future)' || (currentPostbases[0] > 6 && currentPostbases[0] < 10)) {
      tense = 'future'
      if (moodSpecific !== 'when (future)') {
        postbasesEnglish.push('will')
      }
      if (currentPostbases.length>0) {
        firstpass = true
        currentPostbases.forEach((p) => {
          if (p > 1 && p < 5 || p == 10 || p == 15 || p == 28 || p == 29) {
            postbasesEnglish.push('be'+postbases[p].englishModifier(''))
          } else if (p > 20 && p < 27) {
            postbasesEnglish.push(postbases[p].englishModifierPlural(''))
          } else if (p > 15 && p < 19) {
            postbasesEnglish.push('be'+postbases[p].englishModifier(''))
          } else {
            postbasesEnglish.push(postbases[p].englishModifier(''))
          }
          firstpass = false
          if (p == 28) {
            postbase28 = true
          }
        })
        if (postbase28) {
          englishEnding.push(gerund_new_adj)
        } else {
          englishEnding.push(infinitive_new_adj)
        }
      } else {
        if (this.state.properties.includes('adjectival')) {
          englishEnding.push('be '+new_adj)
        } else if (nois) {
          englishEnding.push(infinitive_new_adj)
        } else {
          englishEnding.push(infinitive_new_adj)
        }
      }
    } else if (moodSpecific == 'when (past)' || (currentPostbases[currentPostbases.length-1] == 5)) {
      tense = 'past'
      if (currentPostbases.length==1 && currentPostbases.includes(5)) {
        englishEnding.push(getsubjectis(tense, people, person, '')+' '+gerund_new_adj)
      } else if (currentPostbases.length>0) {
        if (currentPostbases.every(r=> unmodifyingPostbases.indexOf(r) >= 0)) {
          console.log('test')
          firstpass=true
          currentPostbases.forEach((p) => {
            if (firstpass) {
              postbasesEnglish.push(getsubjectis(tense, people, person, '')+' '+postbases[p].englishModifier(''))
              firstpass = false
            } else {
              postbasesEnglish.push(postbases[p].englishModifier(''))
            }
          })
          if (this.state.properties.includes('adjectival')) {
            englishEnding.push(new_adj)
          } else {
            englishEnding.push(gerund_new_adj)
          }

        } else {
          firstpass = true
          currentPostbases.forEach((p) => {
            if (p == 7 || p == 8 || p == 9) {
              englishEnding.push(gerund_new_adj)
              inTheFutureFlag = true
              postbasesEnglish.push(postbases[p].englishModifier(''))
            } else if (firstpass) {
              if (unmodifyingPostbases.includes(p)) {
                postbasesEnglish.push(postbases[p].englishModifier(''))
              } else {
                if (p > 1 && p < 5 || p == 10 || p == 15 || p == 28 || p == 29 || p > 15 && p < 19) {
                  postbasesEnglish.push(getsubjectis(tense, people, person, '')+' '+postbases[p].englishModifier(''))
                } else if (p == 23) {
                  postbasesEnglish.push(getsubjectis(tense, people, person, 'does')+' '+postbases[p].englishModifierPlural(''))
                } else {
                  postbasesEnglish.push(getsubjectis(tense, people, person, '')+' '+postbases[p].englishModifier(''))
                }
                firstpass = false
              }
            } else {
              if (p > 1 && p < 5 || p == 10 || p == 15 || p == 28 || p == 29) {
                postbasesEnglish.push(postbases[p].englishModifier(''))
              } else if (p > 20 && p < 27) {
                postbasesEnglish.push(postbases[p].englishModifierPlural(''))
              } else {
                postbasesEnglish.push(postbases[p].englishModifier(''))
              }
              firstpass = false
            }
            if (p == 28) {
              postbase28 = true
            }
          })
          if (postbase28) {
            englishEnding.push(gerund_new_adj)
          } else {
            englishEnding.push(infinitive_new_adj)
          }
        }
      } else {
        if (this.state.properties.includes('adjectival')) {
          englishEnding.push(getsubjectis(tense, people, person, '')+' '+new_adj)
        } else if (nois) {
          englishEnding.push(getsubjectis(tense, people, person, '')+' '+gerund_new_adj)
        } else {
          englishEnding.push(getsubjectis(tense, people, person, '')+' '+gerund_new_adj)
        }
      }
    } else if (this.state.properties.includes('adjectival')) {
      if (currentPostbases.length>0) {
        if (currentPostbases.every(r=> unmodifyingPostbases.indexOf(r) >= 0)) {
          firstpass=true
          currentPostbases.forEach((p) => {
            if (firstpass) {
              postbasesEnglish.push(getsubjectis(tense, people, person, '')+' '+postbases[p].englishModifier(''))
              firstpass = false
            } else {
              postbasesEnglish.push(postbases[p].englishModifier(''))
            }
          })
          englishEnding.push(new_adj)
        } else {
          firstpass = true
          currentPostbases.forEach((p) => {
            if (p > 1 && p < 5 || p == 10 || p == 15 || p == 28 || p == 29 || p > 15 && p < 19) {
              postbasesEnglish.push(getsubjectis(tense, people, person, '')+' '+postbases[p].englishModifier(''))
            } else if (p == 23) {
              postbasesEnglish.push(getsubjectis(tense, people, person, 'does')+' '+postbases[p].englishModifierPlural(''))
            } else {
              postbasesEnglish.push(getsubjectis(tense, people, person, '')+' '+postbases[p].englishModifier(''))
            }
            firstpass = false
            if (p == 28) {
              postbase28 = true
            }
          })
          englishEnding.push('be '+new_adj)
        }
      } else {
        englishEnding.push(getsubjectis(tense, people, person, '')+' '+new_adj)
      }
    } else { //present tense
      if (currentPostbases.length>0) {
        if (currentPostbases.every(r=> unmodifyingPostbases.indexOf(r) >= 0)) {
          firstpass=true
          currentPostbases.forEach((p) => {
            if (firstpass) {
              postbasesEnglish.push(getsubjectis(tense, people, person, '')+' '+postbases[p].englishModifier(''))
              firstpass = false
            } else {
              postbasesEnglish.push(postbases[p].englishModifier(''))
            }
          })
          englishEnding.push(new_adj)
        } else {
          firstpass = true
          currentPostbases.forEach((p) => {
            if (p > 1 && p < 5 || p == 10 || p == 15 || p == 28 || p == 29 || p > 15 && p < 19) {
              postbasesEnglish.push(getsubjectis(tense, people, person, '')+' '+postbases[p].englishModifier(''))
            } else if (p == 23) {
              postbasesEnglish.push(getsubjectis(tense, people, person, 'does')+' '+postbases[p].englishModifierPlural(''))
            } else {
              postbasesEnglish.push(getsubjectis(tense, people, person, '')+' '+postbases[p].englishModifier(''))
            }
            firstpass = false
            if (p == 28) {
              postbase28 = true
            }
          })
          englishEnding.push('be '+gerund_new_adj)
        }
      } else {
        englishEnding.push(getsubjectis(tense, people, person, '')+' '+gerund_new_adj)
      }
    }

    if (inTheFutureFlag) {
      englishEnding.push('(in the future)')
    } else if (inThePastFlag) {
      englishEnding.push('(in the past)')
    }

    if (moodSpecific == 'You, stop!') {
      if (person == '3' || person == '1') {
        newText1 = 'let'
        newText2 = 'stop '
        newText3 = newText3+'!'
      } else {
        newText1 = ''
        newText2 = ', stop '
        newText3 = newText3+'!'
      }
    } else if (nounEnding == 'device for') {
      newText1 = ''
      newText2 = 'device for ('
      newText3 = ')'
    } else if (moodSpecific == 'You, do not!') {
      if (person == '3' || person == '1') {
        newText1 = 'let'
        newText2 = 'not '
        newText3 = newText3+'!'
      } else {
        newText1 = ''
        newText2 = ', do not '
        newText3 = '!'
      }
    } else if (moodSpecific == 'do!'){
      if (person == '3' || person == '1') {
        newText1 = 'let'
        newText2 = ''
        newText3 = '!'
      } else {
        newText1 = ''
        newText2 = ', '
        newText3 = newText3+'!'
      }
    } else if (moodSpecific == 'do (in the future)!') {
      if (person == '3' || person == '1') {
        newText1 = 'let'
        newText2 = ''
        newText3 = '!'
      } else {
        newText1 = ''
        newText2 = ', '
        newText3 = '!'
      }
    } else if (moodSpecific == 'when will (future)') {
      newText1 = 'when will'
      newText2 = ''
      newText3 = ''
    } else if (tense == 'future') {
      newText1 = ''
      newText2 = ''
      newText3 = ''
    } else if (moodSpecific == 'when (past)') {
      if (person == '3' || person == '1') {
        newText1 = 'when '+getsubjectis(tense,people,person,'does')
        newText2 = ''
        newText3 = ''
      } else {
        newText1 = 'when '+getsubjectis(tense,people,person,'does')
        newText2 = ''
        newText3 = ''
      }
    } else if (tense == 'past') {
      newText1 = ''
      newText2 = ''
      newText3 = ''
    } else if (moodSpecific == 'who') {
      newText1 = 'who '+getsubjectis(tense,people,person,'')
      newText2 = 'who'
      newText3 = ''
    // } else if (moodSpecific == 'at where') {
    //   newText1 = 'at where '+getsubjectis(tense,people,person,'does')
    //   newText2 = ''
    //   newText3 = ''
    // } else if (moodSpecific == 'from where') {
    //   newText1 = 'from where '+getsubjectis(tense,people,person,'does')
    //   newText2 = ''
    //   newText3 = ''
    // } else if (moodSpecific == 'toward where') {
    //   newText1 = 'toward where '+getsubjectis(tense,people,person,'does')
    //   newText2 = ''
    //   newText3 = ''
    // } else if (moodSpecific == 'why') {
    //   newText1 = 'why '+getsubjectis(tense,people,person,'does')
    //   newText2 = ''
    //   newText3 = ''
    // } else if (moodSpecific == 'how') {
    //   newText1 = 'how '+getsubjectis(tense,people,person,'does')
    //   newText2 = ''
    //   newText3 = ''
    } else if (mood == 'interrogative') {
      newText1 = interrogative.find((p)=> {return p.mood==moodSpecific}).text+' '+getsubjectis(tense,people,person,'does')
      newText2 = ''
      newText3 = ''
    } else if (mood[0] == 'c' || mood[0] == 'p') { //is attempting to access an empty string
      console.log(mood)
      console.log(dependent)
      newText1 = dependent.find((p)=> {return p.mood==moodSpecific}).mood
      newText2 = ''
      newText3 = ''
    } else if (nounEnding !== '') {
      newText1 = verb2noun.find((p)=> {return p.text==nounEnding}).text
      newText2 = ''
      newText3 = ''
    } else {
      newText1 = ''
      newText2 = ''
      newText3 = ''
    }

    console.log(nounEnding)
    console.log(newText2)
    console.log(postbasesEnglish)
    console.log(englishEnding)
    console.log(newText3)

    // currentPostbases = currentPostbases.reverse()
    // let rootEnglish = ''
    // let adder = ''
    // if (currentPostbases.length>0) {
    //   currentPostbases.forEach((p) => {
    //     adder = ''
    //     if ((p == 21 || p == 22 || p == 23 || p == 24 || p == 25 || p == 26)) {
    //       hasDesire = true
    //       if (currentPostbases[currentPostbases.length-1] != p) {
    //         adder = postbases[p].englishModifierPlural(adder)+' ';
    //       } else if (mood == 'interrogative' && moodSpecific != 'who' || mood[0] == 'c') {
    //         console.log('hit')
    //         adder = postbases[p].englishModifierPlural(adder)+' ';
    //         does = 'does'
    //       } else {
    //         adder = postbases[p].englishModifier(adder)+' ';
    //       }
    //     } else {
    //       adder = postbases[p].englishModifier(adder)+' ';
    //     }
    //     postbasesEnglish.push(adder)
    //   })
    //   postbasesEnglish = postbasesEnglish.reverse()
    //   adder = postbasesEnglish.join(' ')
    //   if (adder == ' (past) ') {
    //     if (nois) {
    //       newText2 = nlp(new_adj).sentences().toPastTense().out()
    //       rootEnglish = nlp(new_adj).sentences().toPastTense().out()
    //     } else {
    //       newText2 = new_adj
    //       rootEnglish = new_adj
    //     }

    //   } else if (adder == ' (future) ') {
    //     if (moodSpecific == 'optative') {
    //       newText2 = '['+new_adj+' (in the future) ]'
    //     }
    //     else if (nois) {
    //       newText2 = nlp(new_adj).sentences().toFutureTense().out()
    //     } else {
    //       newText2 = nlp(new_adj).sentences().toFutureTense().out().replace('will','')
    //     }

    //   } else if ([currentPostbases[currentPostbases.length-1]].some(r=> [21, 22, 24, 25].includes(r))) {
    //     newText2 = ' '+adder +' '+ be_adj
    //     conditionalbe = ''
    //     rootEnglish= be_adj
    //   } else if ([currentPostbases[currentPostbases.length-1]].some(r=> [26].includes(r))) {
    //     newText2 = ' '+adder +' '+ being_adj
    //     conditionalbe = ''
    //     does = 'does'
    //     rootEnglish= being_adj
    //   } else if ([currentPostbases[currentPostbases.length-1]].some(r=> [23].includes(r))) {
    //     newText2 = ' '+adder +' '+ be_adj
    //     conditionalbe = ''
    //     does = 'does'
    //     rootEnglish= be_adj
    //   } else if (currentPostbases.some(r=> [2, 3, 4, 8, 9, 10, 16, 17, 18, 16, 29].includes(r))) {
    //     addis = true
    //     newText2 = ' '+adder +' '+ be_adj
    //     rootEnglish= be_adj
    //   } else {
    //     addis = true
    //     newText2 = ' '+adder +' '+ new_adj
    //     rootEnglish= new_adj
    //   }
    //   if (currentPostbases[currentPostbases.length-1] == 5) {
    //     tense = 'past'
    //   } else if (currentPostbases[currentPostbases.length-1] == 7 || currentPostbases[currentPostbases.length-1] == 8 || currentPostbases[currentPostbases.length-1] == 9) {
    //     tense = 'future'
    //   }
    // } else {
    //   newText2 = new_adj
    //   rootEnglish= new_adj
    // }
    // // console.log(newText2)
    // // console.log(tense)
    // // console.log(nois)
    // let postbasesEnding = ''
    // let subject1 = getsubjectis(tense, people, person, does)
    // if (this.state.properties.includes('momentary')) {
    //   does = 'had'
    // }
    // subjectis = getsubjectis(tense, people, person, does)
    // postbasesEnding = subjectis
    // if (nois==true) {
    //   postbasesEnding = ''
    // }


    // if (mood == 'interrogative') {
    //   if (moodSpecific == 'who') {
    //     newText1 = 'who '+subject1
    //     newText2 = 'who '+postbasesEnding+' '+newText2
    //   } else if (moodSpecific == 'when did (past)') {
    //     tense = 'past'
    //     subjectis = getsubjectis(tense,people, person,does)
    //     newText1 = 'when '+subjectis
    //     newText2 = newText2
    //   } else if (moodSpecific == 'when will (future)') {
    //     newText1 = 'when will'
    //     if (nois==true) {
    //       newText2 = nlp(newText2).sentences().toFutureTense().out().replace('will','')
    //     } else {
    //       newText2 = 'be '+newText2
    //     }
    //   } else {
    //     newText1 = moodSpecific+' '+subjectis
    //     newText2 = newText2
    //   }
    // } else if (mood == 'optative') {
    //   if (nois==true) {
    //     if ([currentPostbases[currentPostbases.length-1]].some(r=> [21, 22, 23, 24, 25, 26].includes(r))) {
    //       newText2 = newText2.replace('loves','love')
    //       newText2 = newText2.replace('wants','want')
    //       newText2 = newText2.replace('yearns','yearn')
    //       newText2 = newText2.replace('enjoys','enjoy')
    //       } else {
    //       if (moodSpecific == 'You, stop!') {
    //         newText2 = nlp(newText2).sentences().toPresentTense().out() // CHANGE TO GERUND FORM OF VERB
    //       } else {
    //         newText2 = 'be '+newText2
    //       }
    //     }
    //   } else {
    //     if ([currentPostbases[currentPostbases.length-1]].some(r=> [21, 22, 23, 24, 25, 26].includes(r))) {
    //       newText2 = newText2.replace('loves','love')
    //       newText2 = newText2.replace('wants','want')
    //       newText2 = newText2.replace('yearns','yearn')
    //       newText2 = newText2.replace('enjoys','enjoy')
    //       } else {
    //       if (moodSpecific == 'You, stop!') {
    //         newText2 = 'being '+newText2
    //       } else {
    //         newText2 = 'be '+newText2
    //       }
    //     }
    //   }
    //   if (moodSpecific == 'You, do not!') {
    //     if (nois==true) {
    //       if (person == '3' || person == '1') {
    //         newText1 = 'let'
    //         newText2 = 'not ' + nlp(newText2).sentences().toFutureTense().out().replace('will','')
    //         newText3 = newText3+'!'
    //       } else {
    //         newText2 = ', do not '+nlp(newText2).sentences().toFutureTense().out().replace('will','')
    //         newText3 = newText3+'!'
    //       }
    //     } else {
    //       if (person == '3' || person == '1') {
    //         newText1 = 'let'
    //         newText2 = 'not ' + newText2
    //         newText3 = newText3+'!'
    //       } else {
    //         newText2 = ', do not '+newText2
    //         newText3 = newText3+'!'
    //       }
    //     }
    //   } else if (moodSpecific == 'You, stop!') {
    //     if (person == '3' || person == '1') {
    //       newText1 = 'let'
    //       newText2 = 'stop ' + newText2
    //       newText3 = newText3+'!'
    //     } else {
    //       newText2 = ', stop '+newText2
    //       newText3 = newText3+'!'
    //     }
    //   } else if (moodSpecific == 'do!'){
    //     if (nois==true) {
    //       if (person == '3' || person == '1') {
    //         newText1 = 'let'
    //         newText2 = nlp(newText2).sentences().toFutureTense().out().replace('will','')
    //         newText3 = newText3+'!'
    //       } else {
    //         newText2 = ', '+nlp(newText2).sentences().toFutureTense().out().replace('will','')
    //         newText3 = newText3+'!'
    //       }
    //     } else {
    //       if (person == '3' || person == '1') {
    //         newText1 = 'let'
    //         newText2 = newText2
    //         newText3 = newText3+'!'
    //       } else {
    //         newText2 = ', '+newText2
    //         newText3 = newText3+'!'
    //       }
    //     }
    //   } else if (moodSpecific == 'do (in the future)!'){
    //     if (nois==true) {
    //       if (person == '3' || person == '1') {
    //         newText1 = 'let'
    //         newText2 = nlp(newText2).sentences().toFutureTense().out().replace('will','')
    //         newText3 = newText3+' in the future!'
    //       } else {
    //         newText2 = ', '+nlp(newText2).sentences().toFutureTense().out().replace('will','')
    //         newText3 = newText3+' in the future!'
    //       }
    //     } else {
    //       if (person == '3' || person == '1') {
    //         newText1 = 'let'
    //         newText2 = newText2
    //         newText3 = newText3+' in the future!'
    //       } else {
    //         newText2 = ', '+newText2
    //         newText3 = newText3+' in the future!'
    //       }
    //     }
    //   }
    // } else if (mood == 'indicative') {
    //   console.log(newText2)
    //   console.log(subjectis)
    //   console.log(tense)
    //   console.log(does)
    //   subjectis = getsubjectis(tense,people,person,does)
    //   console.log(subjectis)
    //   if (currentPostbases.length == 0) {
    //     newText2 = subjectis+' '+newText2
    //   } else if (addis) {
    //     newText2 = subjectis+' '+newText2
    //   } else if (hasDesire == true && does != 'does') {
    //     newText2 = newText2
    //   } else {
    //     newText2 = subjectis+' '+newText2
    //   }
    // } else if (nounEnding != '') {
    //   if (nois==true) {
    //     newText2 = nounEnding + ' (to '+nlp(newText2).sentences().toFutureTense().out().replace('will','')+') '
    //   } else {
    //     if (nounEnding == 'the one who is' || nounEnding == 'one that customarily/capably is') {
    //       newText2 = nounEnding + ' ('+ newText2 +') '
    //     } else {
    //       newText2 = nounEnding + ' (being '+ newText2 +') '
    //     }
    //   }
    // } else { //assuming connective
    //   if (moodSpecific=='when (past)') {
    //     if (nois==true) {
    //       newText1 = moodSpecific
    //       newText2 = newText2
    //     } else {
    //       tense = 'past'
    //       subjectis = getsubjectis(tense,people, person, does)
    //       newText1 = moodSpecific
    //       newText2 = subjectis+' '+newText2
    //     }
    //   } else if (moodSpecific=='when (future)') {
    //     if (nois==true) {
    //       newText1 = moodSpecific
    //       newText2 = nlp(newText2).sentences().toPresentTense().out()
    //     } else {
    //       tense = 'future'
    //       subjectis = getsubjectis(tense,people, person, does)
    //       newText1 = moodSpecific
    //       newText2 = subjectis+conditionalbe+newText2
    //     }
    //   } else {
    //     newText1 = moodSpecific
    //     newText2 = subjectis+' '+newText2
    //   }
    // }
    // newText2 = newText2.replace(/\s+/g,' ').trim();

    // subjectis = nlp(subjectis).sentences().toPresentTense().out()
    // console.log(newText2)
    // if (newText2.includes('(past)')) {
    //   newText2 = newText2.split("(past)")
    //   if (newText2[0].trim()=='is' || newText2[0].trim()=='are' || newText2[0].trim()=='am' || newText2[0].trim()=='') {
    //     newText2 = nlp(newText2[0]+newText2[1]).sentences().toPastTense().out()
    //   } else {
    //     newText2 = newText2[0]+'['+newText2[1]+' (in the past) ]'
    //   }
    // }
    // if (newText2.includes('(future)')) {
    //   newText2 = newText2.split("(future)")
    //   if (nois==true) {
    //     if (newText2[0].trim()=='is' || newText2[0].trim()=='are' || newText2[0].trim()=='am') {
    //       // newText2 = nlp(newText2[1]).sentences().toFutureTense().out()
    //       newText2 = newText2[0]+'['+newText2[1]+' (in the future) ]'
    //     } else {
    //       newText2 = newText2[0]+'['+newText2[1]+' (in the future) ]'
    //     }
    //   } else {
    //     if (newText2[0].trim()=='is' || newText2[0].trim()=='are' || newText2[0].trim()=='am') {
    //       //newText2 = nlp(newText2[0]+newText2[1]).sentences().toFutureTense().out()
    //       newText2 = newText2[0]+'['+newText2[1]+' (in the future) ]'
    //     } else {
    //       newText2 = newText2[0]+'['+newText2[1]+' (in the future) ]'
    //     }
    //   }
    // }
    // if (newText2.includes('to trying')) {
    //   newText2 = newText2.replace("to trying",'to try')
    // }
    // console.log(newText2)

    // console.log(newText1)
    // postbasesEnglish.push(rootEnglish)
    // console.log(postbasesEnglish)



    // let s1 = newText2.match(/\@(\S*)\@/g)
    // if (s1.length>0) {
    // s1.forEach((p) => {
    //   let s2 = p.slice(1,-1);
    //   if (this.state.people > 1) {
    //     s2 = nlp(s2).nouns().toPlural().out()
    //     console.log(p)
    //     console.log(s2)
    //     newText2 = newText2.replace(p,s2)
    //   } else {
    //     newText2 = newText2.replace(p,s2)
    //   }
    // })
    // }
    // let d1 = newText2.match(/\#(\S*)\#/g)
    // console.log(d1)
    // d1.forEach((p) => {
    //   let d2 = p.slice(1,-1);
    //   if (this.state.objectPeople > 1) {
    //     d2 = nlp(d2).nouns().toPlural().out()
    //     console.log(p)
    //     console.log(d2)
    //     newText2 = newText2.replace(p,d2)
    //   } else {
    //     newText2 = newText2.replace(p,d2)
    //   }
    // })


    let postbasesList = [];
    let base = '';
    if (currentPostbases.length == 1 || currentPostbases.length == 0) {
      base = word
    } else {
      base = postbases[currentPostbases[0]].expression
    }


    let processPostbases = (currentPostbases, base, postbases) => {
      postbasesList = currentPostbases.map((p) => {
        if (postbases[p].conditional_rule == 'attaching_to_te') {
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
    if (moodSpecific=='who') {
      added_word='kina '
    } else if (moodSpecific=='when did (past)') {
      added_word='qangvaq '
      // newText2 = nlp(newText2).sentences().toPastTense().out()
    } else if (moodSpecific=='when will (future)') {
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
          modifiedWord: added_word + response.data.concat,
          modifiedEnglish: newEnglish,
          currentPostbases: currentPostbases,
          text1: newText1,
          text2: newText2,
          text3: newText3,
          postbasesEnglish: postbasesEnglish,
          englishEnding: englishEnding,
          colorIndexes: response.data.indexes
        });
      });
    }

    modifyWordNoun(person, people, possessorPerson, possessorPeople, mood, moodSpecific, nounEnding, verbEnding, value4, word, currentPostbases) {
      if (value4 != 1 || verbEnding == true || nounEnding == true || currentPostbases.length > 0) {
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
    console.log(this.state.postbasesList)
    let countEndingPostbase = this.state.postbasesList.length-this.state.currentPostbases.length
    let postbasesDisplay = ''
    let wordDisplay = ''
    if (this.verb || this.state.verbEnding || this.state.possessiveButton == 1) {
      postbasesDisplay = (
        <span>
        <span style={{color: this.state.colorsList[0]}}>{this.state.currentWord}</span>
        {this.state.postbasesList.slice(0,this.state.postbasesList.length-countEndingPostbase).map((p, i) => {
          console.log(i)
          console.log(this.state.postbasesList.length)
          console.log(countEndingPostbase)
          return <span style={{color: this.state.colorsList[this.state.postbasesList.length-1-i]}}>{' ' + p}</span>;
        })}
        {this.state.postbasesList.slice(this.state.postbasesList.length-countEndingPostbase,this.state.postbasesList.length+1).map((p, i) => {
          return <span style={{color: this.state.colorsList[2+i]}}>{' ' + p}</span>;
        })}
        </span>
      );
      if (this.state.currentPostbases.length == 0) {
        console.log('no postbases')
      }
      wordDisplay = (
        <span>
        {this.state.colorIndexes.map((index, i) => {
          let c = this.state.colorsList[i];
          if (i < this.state.colorIndexes.length-1) {
            return <span style={{color: c}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          }
          else {
            return <span style={{color: c}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i])}</span>;
          }
        })}
        </span>
      );      
    } else {
      postbasesDisplay = (
        <span>
        <span style={{color: this.state.colorsList[0]}}>{this.state.currentWord}</span>
        {this.state.postbasesList.slice(0,this.state.postbasesList.length-countEndingPostbase).map((p, i) => {
          console.log(i)
          console.log(this.state.postbasesList.length)
          console.log(countEndingPostbase)
          return <span style={{color: this.state.colorsList[this.state.postbasesList.length-1-i]}}>{' ' + p}</span>;
        })}
        {this.state.postbasesList.slice(this.state.postbasesList.length-countEndingPostbase,this.state.postbasesList.length+1).map((p, i) => {
          return <span style={{color: this.state.colorsList[2+i]}}>{' ' + p}</span>;
        })}
        </span>
      );
      if (this.state.currentPostbases.length == 0) {
        console.log('no postbases')
      }
      wordDisplay = (
        <span>
        {this.state.colorIndexes.map((index, i) => {
          let c = this.state.colorsList[i];
          if (i < this.state.colorIndexes.length-1) {
            return <span style={{color: c}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          }
          else {
            return <span style={{color: c}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i])}</span>;
          }
        })}
        </span>
      );      
    }


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
    return (
      <div>
      <StickyMenu word={this.state.currentWord} goBack={this.props.history.goBack} switchMode={this.switchMode.bind(this)} />
      <Container attached style={{ marginTop: '6em' }}>
        <Grid>
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
              {wordDisplay}
              {this.state.enclitic !== '' && this.state.encliticExpression !== '(again)' ? this.state.enclitic
              :''}
              </Header>
            </Grid.Column>
          </Grid.Row>

          {this.verb ?
          (this.state.nounEnding !== '' ?
          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              <Header as='h4' align='center'>
                {this.state.text2}
              </Header>
            </Grid.Column>
          </Grid.Row>
          :
          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              <Header as='h4' align='center'>
                <span style={{color: this.state.colorsList[1]}}>{this.state.text1}</span>
                {' '}
                <Dropdown inline options={dict1} onChange={this.setValue1.bind(this)} value={value1} />
                {' '}
                {this.state.text2}
                {' '}
                {this.state.postbasesEnglish.reverse().map((p, i) => {
                return <span style={{color: this.state.colorsList[i+2]}}>{' ' + p}</span>;
                })}
                {' '}
                <span style={{color: this.state.colorsList[0]}}>{this.state.englishEnding[0]}</span>
                {' '}
                {this.state.objectExists ?
                <Dropdown inline options={dict2} onChange={this.setValue2.bind(this)} value={value2} /> : ''}
                {' '}
                {this.state.text3}
                {this.state.encliticExpression !== '' ? this.state.encliticExpression :''}
                {this.state.mood == 'interrogative' ? '?':''}
              </Header>
            </Grid.Column>
          </Grid.Row>
          )
          :
          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              <Header as='h4' align='center'>

                {(this.state.verbEnding ?
                  <span style={{color: this.state.colorsList[this.state.postbasesList.length]}}>
                  <Dropdown inline options={dict1} onChange={this.setValue1.bind(this)} value={value1} />
                  </span>:
                  ''
                )}
                {' '}
                {(this.state.possessiveButton == 1 ?
                  <span style={{color: this.state.colorsList[this.state.adjectivesEnglish.length+1]}}>
                  <Dropdown inline options={dict3} onChange={this.setValue3.bind(this)} value={value3} />
                  </span>:
                  ''
                )}

                {this.state.verbEndingEnglish != '' ?
                <span style={{color: this.state.colorsList[this.state.adjectivesEnglish.length+1]}}>{this.state.verbEndingEnglish}</span>
                :
                ''
                }
                {this.state.adjectivesEnglish.reverse().map((p, i) => {
                return <span style={{color: this.state.colorsList[i+1]}}>{' ' + p}</span>;
                })}
                {' '}
                <span style={{color: this.state.colorsList[0]}}>{this.state.text2}</span>
                {' '}
                {this.state.nounEndingEnglish != '' ?
                <span style={{color: this.state.colorsList[this.state.adjectivesEnglish.length+1]}}>({this.state.nounEndingEnglish})</span>
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
                <span style={{color: this.state.colorsList[this.state.adjectivesEnglish.length+1]}}>(two of them)</span>
                :
                ''
                }
                {this.state.verbEnding== false && this.state.value4 == 3 ?
                <span style={{color: this.state.colorsList[this.state.adjectivesEnglish.length+1]}}>(three of them)</span>
                :
                ''
                }
              </Header>
            </Grid.Column>
          </Grid.Row>
          }

          {this.verb && this.state.alternateTense != '' && this.state.mood == 'indicative' && this.state.currentPostbases.length == 0 ?
            <Grid.Row>
              <Grid.Column>
                <Header fontStyle='italic' as='h5' align='center'>
                  <i> could also be in {this.state.alternateTense} tense </i>
                </Header>
              </Grid.Column>
            </Grid.Row>
            : ''
          }

          <Grid.Row textAlign='center'>
            <Grid.Column>
              <List horizontal>
                {this.state.currentPostbases.map((index) =>
                  <List.Item onClick={(event) => this.setPostbase(index, event)}>
                    {this.verb ?
                      <Chip color={this.state.colorsList[(this.state.currentPostbases.find((p) => p == index))+1]} text={postbases.find((p) => p.id == index).description} />
                    :
                      <Chip color={this.state.colorsList[(this.state.currentPostbases.find((p) => p == index))+1]} text={nounPostbases.find((p) => p.id == index).description} />
                    }
                  </List.Item>
                )}
              </List>
            </Grid.Column>
          </Grid.Row>

        </Grid>
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
      </Container>
      </div>
    );
  }
}

export default withRouter(YupikModifyLayout);
