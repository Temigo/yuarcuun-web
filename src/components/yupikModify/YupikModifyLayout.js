import React, { Component } from 'react';
import '../../semantic/dist/semantic.min.css';
import { Container, Grid, Header, Dropdown, List, Visibility, Icon, Loader, Label } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router';

import palette from 'google-palette';
import shuffle from 'shuffle-array';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from '../../App.js';

import YupikModify from './YupikModify.js';
import YupikModifyNoun from './YupikModifyNoun.js';
import YupikModifyVerb from './YupikModifyVerb.js';
import StickyMenu from '../common/StickyMenu.js';
import YupikEnding from '../yupikEnding/YupikEnding.js';
import YupikEndingGroups from '../yupikEnding/YupikEndingGroups.js';
import YupikPostbaseGroups from '../yupikPostbase/YupikPostbaseGroups.js';
import YupikPostbase from '../yupikPostbase/YupikPostbase.js';
import YupikAllPostbases from '../yupikPostbase/YupikAllPostbases.js';
import YupikAllNounPostbases from '../yupikNoun/YupikAllNounPostbases.js';
import YupikNounDescriptors from '../yupikNoun/YupikNounDescriptors.js';
import YupikNounPhrase from '../yupikNoun/YupikNounPhrase.js';
import YupikNounCombine from '../yupikNoun/YupikNounCombine.js';
import { postbases, nounPostbases, retrieveSubjectObject } from '../constants/constants.js';
import { interrogative, optative, dependent, verb2noun, postbaseButtons, enclitics } from '../modifyWord/modifyVerbOptions.js';
import { nounEndings, indicative_intransitive_endings,
  indicative_transitive_endings, interrogative_intransitive_endings,
  interrogative_transitive_endings, optative_intransitive_endings,
  optative_transitive_endings, subordinative_intransitive_endings,
  subordinative_transitive_endings, connective_intransitive_endings,
  connective_transitive_endings, connective_consonantEnd_intransitive_endings,
  connective_consonantEnd_transitive_endings, connective_contemporative_intransitive_endings,
  connective_contemporative_transitive_endings, connective_conditional_intransitive_endings,
  connective_conditional_transitive_endings } from '../constants/constants_verbs.js';
import Chip from '../common/Chip.js';
import { connect } from "react-redux";
import { toggleAllPostbases } from '../../redux/actions';
import { pronounEnding, addedWord, getsubjectis as getsubjectis_verb, processPostbases as processPostbases_verb, pushEnding as pushEnding_verb } from '../modifyWord/ModifyWordVerb.js';
import { processPostbases as processPostbases_noun, getsubjectis as getsubjectis_noun, isvowel, returnEnding } from '../modifyWord/ModifyWordNoun.js';
import { processUsage } from '../modifyWord/processUsage.js';
import { removeCombos } from '../modifyWord/removeCombos.js';

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class YupikModifyLayout extends Component {
  constructor(props) {
    super(props);
    console.log('YupikModifyLayout props', props)
    this.verb = this.props.location.pathname.includes('verb');
    this.state = {
      canTTS: true, // whether TTS is available for this word
      loadingTTS: false, // whether we are loading the TTS for this word
      headerFixed: false,
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
      value3_text: "",
      allPostbasesMode: false, // whether the number of postbases is unlocked
      completeSentence: "",
      allowable_next_ids: [],
      possessiveSubject: false,
      possessiveObject: false,
      objectExists: false,
      subjectExists: false,
      enclitic: '',
      alternateTense: '',
      nounEnding: '',
      verbEnding: false,
      encliticExpression: '',
      fullEnglish: '',
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
    this.modifyWordVerb = this.modifyWordVerb.bind(this);
    this.modifyWordNoun = this.modifyWordNoun.bind(this);
    this.modifyWord = this.verb ? this.modifyWordVerb : this.modifyWordNoun;
    this.setMood = this.verb ? this.setMoodVerb : this.setMoodNoun;
    this.initialize = this.initialize.bind(this);
    this.switchMode = this.switchMode.bind(this);

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

  componentDidMount() {
    this.switchMode();
  }

  switchMode() {
    if (!this.props.advancedMode) {
      this.props.history.push(this.verb ? `${this.props.match.url}/verb` : `${this.props.match.url}/noun`);
    }
    else {
      this.props.history.push(this.verb ? `${this.props.match.url}/verb/all` : `${this.props.match.url}/noun/all`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.advancedMode !== this.props.advancedMode) {
      this.switchMode();
    }
  }

  setDisplayPostbases(event, data) {
    event.preventDefault();
    this.setState({displayPostbases: !this.state.displayPostbases});
  }

  initialize() {
    if (this.state.properties.includes('momentary')) {
      this.state.alternateTense = 'present'
      this.state.tense = 'past'
    } else if (this.state.properties.includes('not_momentary')) {
      this.state.alternateTense = 'recent past'
    }
    let new_state = processUsage(this.state.usage);
    console.log('processed')
    this.state = {...this.state, ...new_state};
    if (this.verb) {
      if (this.state.objectExists) {
        this.state.postbasesList = ["+'(g)aa"]
      } else {
        this.state.postbasesList = ["+'(g/t)uq"]
      }      
    }
    if (this.verb) {
      this.modifyWord(this.state.person, this.state.people,
        this.state.objectPerson, this.state.objectPeople,
        this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.value1, this.state.currentWord, this.state.currentPostbases);
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
    if (this.verb) {
      if (newState.encliticExpression != this.state.encliticExpression || newState.value1 != this.state.value1 || newState.people != this.state.people || newState.person != this.state.person || newState.objectPerson != this.state.objectPerson || newState.objectPeople != this.state.objectPeople || newState.moodSpecific != this.state.moodSpecific || newState.nounEnding != this.state.nounEnding) {
        if (newState.mood != this.state.mood) {
          if (newState.mood != 'nounEnding') {
            newState.nounEnding = ''
            this.setState({nounEnding:''})
          }
          if (newState.encliticExpression === this.state.encliticExpression) {
          newState.enclitic = ''
          newState.encliticExpression = ''
          this.state.enclitic = ''
          this.state.encliticExpression = ''
          }
          if (newState.mood == 'indicative' || newState.mood == 'interrogative') {
            if (newState.value1[0] == '4') {  // if 4th person subject, switch to 3rd person singular
              this.setState({people: 1, person: 3, value1: '31-1(1)'})
              newState.person = 3
              newState.people = 1
              newState.value1 = '31-1(1)'
            }
            if (newState.value2[0] == '4') {  // if 4th person object, switch to 3rd person singular
              this.setState({objectPeople: 1, objectPerson: 3, value2: '31-1(2)'})
              newState.objectPerson = 3
              newState.objectPeople = 1
              newState.value2 = '31-1(2)'
            }
            if (newState.value3[0] == '4') {
              this.setState({objectPeople: 1, objectPerson: 3, value3: '31-1(3)'})
              newState.objectPerson = 3
              newState.objectPeople = 1
              newState.value3 = '31-1(3)'
            }
            if (newState.mood == 'interrogative') { //moving into interrogative
              if (newState.value1[0] == '1') { //if 1st person subject, switch to 'He'
                this.setState({people: 1, person: 3, value1: '31-1(1)'})
                newState.person = 3
                newState.people = 1
                newState.value1 = '31-1(1)'
              }
            }
            let str = newState.value1
            str = str.substring(0, str.length - 2)+ '1)';
            this.setState({value1:str})
            newState.value1 = str
          } else if (newState.mood == 'subordinative') {
            if (this.state.value1[0] == '3') { //if 3rd person subject, switch to 4th person singular
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
          } else if (newState.mood == 'optative') {
            this.setState({people: 1, person: 2, value1: '21(2)'})
            newState.person = 2
            newState.people = 1
            if (this.state.value2[0] == '2') { //if 2nd person object, use 3rd person singular instead
              this.setState({objectPeople: 1, objectPerson: 3, value2: '31-1(2)'})
              newState.objectPerson = 3
              newState.objectPeople = 1
            }
          } else {
            let str = this.state.value1
            str = str.substring(0, str.length - 2)+ '1)';
            this.setState({value1:str})
          }
        }
        if (newState.moodSpecific == 'when (future)...' || newState.moodSpecific == 'when (past)...' || newState.mood == 'optative' || newState.moodSpecific == 'before...') {
          let array = this.state.currentPostbases
          for(var i = array.length-1; i >= 0; i--) {
            if(array[i] === 5 || array[i] === 6 || array[i] === 7 || array[i] === 8 || array[i] === 9 || array[i] === 22) {
               array.splice(i, 1);
            }
          }
          this.setState({currentPostbases:array})
          var array3 = [5,6,7,8,9,22].concat(this.state.allowable_next_ids);
          array3 = array3.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
          })
          this.setState({allowable_next_ids:array3})
        }
        if (newState.mood !== 'indicative') {
          let array = this.state.currentPostbases
          for(var i = array.length-1; i >= 0; i--) {
            if(array[i] === 0) {
               array.splice(i, 1);
            }
          }
          this.setState({currentPostbases:array})
          var array3 = [0].concat(this.state.allowable_next_ids);
          array3 = array3.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
          })
          this.setState({allowable_next_ids:array3})
        }
        if (newState.encliticExpression !== this.state.encliticExpression) {
        	if (newState.encliticExpression === '(yes or no?)' && newState.mood === 'interrogative') {
        		newState.mood = 'indicative'
        		this.state.mood = 'indicative'
        		newState.moodSpecific = 'indicative'
        		this.state.moodSpecific = 'indicative'
        	}
        }

        this.modifyWord(newState.person, newState.people, newState.objectPerson, newState.objectPeople, newState.mood, newState.moodSpecific, newState.nounEnding, newState.value1, this.state.currentWord, this.state.currentPostbases);
      }
    }
    else {
      if (newState.people != this.state.people || newState.value4 != this.state.value4 || newState.person != this.state.person || newState.possessorPerson != this.state.possessorPerson || newState.possessorPeople != this.state.possessorPeople || newState.mood != this.state.mood || newState.nounEnding != this.state.nounEnding || newState.verbEnding != this.state.verbEnding) {
        if (newState.nounEnding !== this.state.nounEnding) {
          if (newState.nounEnding !== '') {
            if (newState.nounEnding == 'and others - only applies to people or animals' || newState.nounEnding == 'and another - only applies to people or animals') {
              this.setState({ value4: 1 });
              newState.value4 = 1
            } else if (newState.nounEnding == 'just a little') {
              this.setState({ value4: 1, nounEnding: 'just a little' });
              newState.value4 = 1
            } else if (newState.nounEnding == 'many of them') {
              this.setState({ value4: 3, nounEnding: 'many of them' });
              newState.value4 = 3
            }
            this.setState({ possessorPeople: 0, possessorPerson: 0});
            newState.possessorPeople = 0
            newState.possessorPerson = 0
          }
        }
        if (newState.possessorPeople != this.state.possessorPeople) {
          if (newState.possessorPeople != 0) {
            if (newState.verbEnding || newState.nounEnding != '') {
              this.setState({ currentPostbases: this.state.currentPostbases.slice(1)})
            }
            this.setState({ verbEnding: false, nounEnding: '' });
            newState.verbEnding = false
            newState.nounEnding = ''
          }
        }
        if (newState.verbEnding != this.state.verbEnding) {
          if (newState.verbEnding == true) {
            this.setState({ possessorPeople: 0, possessorPerson: 0 });
            newState.possessorPeople = 0
            newState.possessorPerson = 0
          }
        }
        if (newState.verbEndingEnglish == "the place does not have" || newState.verbEndingEnglish == "the place has") {
          this.setState({ people: 1, person: 3 });
          newState.people = 1
          newState.person = 3
        }
        if (newState.mood != this.state.mood) {
          if (newState.mood !== 'absolutive') {
            if (newState.nounEnding !== '' || newState.verbEnding == true) {
              this.setState({ currentPostbases: this.state.currentPostbases.slice(1), nounEnding: '', verbEnding: false });
              newState.nounEnding = ''
              newState.verbEnding = false
            }
          }
        }
        this.modifyWord(newState.person, newState.people, newState.possessorPerson, newState.possessorPeople, newState.mood, newState.moodSpecific, newState.nounEnding, newState.verbEnding, newState.value4, this.state.currentWord, this.state.currentPostbases);
      }
    }
  }

  setPeople(people, event, data) {
    this.setState({ people: (this.state.people == people) ? 0 : people });
  }

  setPerson(person, event, data) {
    this.setState({ person: (this.state.person == person) ? 0 : person });
  }

  setObjectPeople(objectPeople, event, data) {
    this.setState({ objectPeople: (this.state.objectPeople == objectPeople) ? 0 : objectPeople });
  }

  setObjectPerson(objectPerson, event, data) {
    this.setState({ objectExists: (this.state.objectPerson == objectPerson) ? false : true });
    this.setState({ objectPerson: (this.state.objectPerson == objectPerson) ? 0 : objectPerson });
  }

  setValue1(e, data) {
    this.setState({
      value1: data.value,
      person: parseInt(data.value[0]),
      people: parseInt(data.value[1])
    });
  }

  setValue2(e, data) {
    this.setState({
      value2: data.value,
      objectPerson: parseInt(data.value[0]),
      objectPeople: parseInt(data.value[1])
    });
  }

  setValue3(e, data) {
    if (this.verb) {
      this.setState({
        value3: data.value,
        objectPerson: parseInt(data.value[0]),
        objectPeople: parseInt(data.value[1])
      });
    }
    else {
      this.setState({
        value3: data.value,
        possessorPerson: parseInt(data.value[0]),
        possessorPeople: parseInt(data.value[1])
      });
    }
  }

  setValue4(i, e, data) {
    this.setState({ value4: i});
  }

  speak(event, data) {
    let addedbeginning = ''
    let addedending = ''
    if (this.state.mood == 'interrogative') {
      addedbeginning = this.state.addedWord+this.state.enclitic+'^'
    } else {
      addedending = this.state.enclitic
    }
    let audio = new Audio(API_URL + "/tts/" + addedbeginning + this.state.modifiedWord.replace('*','') + addedending);
    this.setState({loadingTTS: true});
    audio.play().then((e) => {
      this.setState({loadingTTS: false})
    }, (error) => {
      this.setState({loadingTTS: false, canTTS: false});
    }
    );
  }

  allPostbasesMode(event,data) {
    this.setState({allPostbasesMode: !this.state.allPostbasesMode});
    let allowable = []
    if (this.verb) { //this could be sent to another function since it is repeated in setPostbase
      if (this.state.allPostbasesMode) {
        if (this.state.currentPostbases.length === 0) {
          // pass
        } else if (this.state.currentPostbases.length === 1) {
          allowable = postbases[this.state.currentPostbases[0]].allowable_next_ids
        } else {
          allowable = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
          this.state.currentPostbases.forEach((i, index) => {
            allowable.splice(allowable.indexOf(this.state.currentPostbases[index]),1)
          })

        }
      }
      if (this.state.moodSpecific == 'when (future)...' || this.state.moodSpecific == 'when (past)...' || this.state.moodSpecific == 'before...') {
        allowable.push(5)
        allowable.push(6)
        allowable.push(7)
        allowable.push(8)
        allowable.push(9)
        allowable.push(22)
      }
      this.setState({allowable_next_ids: allowable})
      this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.value1, this.state.currentWord, this.state.currentPostbases);
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
            this.state.currentPostbases.forEach((i, index) => {
              if (i < 7) {
                allremaining.splice(allremaining.indexOf(this.state.currentPostbases[index]),1)
              }
            })
            this.setState({allowable_next_ids: allremaining})
        }
      }
      this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.value1, this.state.currentWord, this.state.currentPostbases);
    }
  }

  setPostbase(postbase_id, event, data) {
    event.preventDefault();
    let index = this.state.currentPostbases.indexOf(postbase_id);
    let currentPostbases = this.state.currentPostbases;
    let allowable = []
    if (this.verb) {
      if (index > -1) {
        currentPostbases.splice(index, 1);
      }
      else {
        currentPostbases.push(postbase_id);
      }
      if (this.state.moodSpecific == 'when (future)...' || this.state.moodSpecific == 'when (past)...' || this.state.moodSpecific == 'before...') {
        allowable.push(5)
        allowable.push(6)
        allowable.push(7)
        allowable.push(8)
        allowable.push(9)
        allowable.push(22)
      }
      if (this.state.mood !== 'indicative') {
        allowable.push(0)
      } else {
        allowable.splice(allowable.indexOf(0),1)
      }
      if (!this.state.allPostbasesMode) {
        if (currentPostbases.length === 0) {
          //pass
        } else if (currentPostbases.length === 1) {
          // this.setState({allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]})
          var array3 = (postbases[currentPostbases[0]].allowable_next_ids).concat(this.state.allowable_next_ids);
          allowable = array3.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
          })
        } else {
          allowable = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
          currentPostbases.forEach((i, index) => {
            allowable.splice(allowable.indexOf(currentPostbases[index]),1)
          })
        }
      }
      // console.log(allowable)
      this.setState({allowable_next_ids: allowable})
      this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.value1, this.state.currentWord, currentPostbases);
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
          currentPostbases = currentPostbases.slice(1)
          this.setState({ verbEnding: false})
          verbEnding = false
        } else if (this.state.mood != 'absolutive') {
          this.setState({ mood: 'absolutive'})
          moodEnding = 'absolutive'
        }
        if (nounEnding == 'and others - only applies to people or animals' || nounEnding == 'and another - only applies to people or animals') {
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
          currentPostbases = currentPostbases.slice(1)
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
    if (this.state.mood !== 'interrogative') {
      this.setState({ mood: 'indicative', moodSpecific:'indicative'});
    }
  }

  setNounEnding(ending, event, data) {
    this.setState({ nounEnding: (this.state.nounEnding == ending) ? '' : ending})
    this.setState({ mood: (this.state.nounEnding == ending) ? 'indicative' : 'nounEnding' });
    this.setState({ moodSpecific: (this.state.nounEnding == ending) ? 'indicative' : 'nounEnding' })
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

  modifyWordVerb(person, people, objectPerson, objectPeople, mood, moodSpecific, nounEnding, value1, word, currentPostbases) {
    // Restore TTS option if it was disabled for previous word
    if (!this.state.canTTS) {
      this.setState({canTTS: true});
    }
    let { originalText2: newText2, originalText3: newText3, currentEnglish: newEnglish, tense } = this.state;
    let newText1 = ''
    let newText1after = ''
    let newText2after = ''
    let newText3tense = ''
    let englishEnding = []
    currentPostbases = currentPostbases.reverse()
    let new_str = ''
    let new_adj = ''
    let be_adj = ''
    let being_adj = ''
    let nois = false
    let does = ''
    if (this.state.alternateTense == 'present' && person == 1) {
      tense = 'present'
    }

    if (newText2.includes('is ')) {
      new_str = newText2.split("is ");
      console.log(new_str)
      if (new_str.length == 2) {
        new_adj = new_str[1].trim()
      } else if (new_str.length == 3) {
        new_adj = new_str[1]+'is '+new_str[2]
      }
    } else if (newText2.includes('was ')) {
      new_str = newText2.split("was ");
      new_adj = new_str[1].trim()
      tense = 'past'
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
    let originalverb = nlp(test).verbs().out() //might not work if there are multiple verbs
    if (originalverb.includes(' ')) {
      originalverb = nlp(test).verbs().out().split(' ')[0]
    }
    // console.log(originalverb)
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
        verbtenses = nlp(originalverb).verbs().conjugate()[0]
        // console.log(verbtenses)
        gerund_new_adj = test.replace(originalverb,verbtenses.Gerund)
        infinitive_new_adj = test.replace(originalverb,verbtenses.Infinitive)
      }
    } else {
      gerund_new_adj = new_adj
      infinitive_new_adj = 'be '+new_adj
    }
    let firstpass = true
    // console.log(gerund_new_adj)
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

    let pushEnding = pushEnding_verb.bind(null, infinitive_new_adj, gerund_new_adj, new_adj, englishEnding);
    if (currentPostbases.length == 0 && mood == 'indicative' && !this.state.properties.includes('not_momentary')) {
       englishEnding.push(newText2)
       newText2 = ''
    } else {
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
              pushEnding('i', 0)
            } else {
              pushEnding('g', 0)
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
              pushEnding('i', 0)
            } else {
              pushEnding('g', 0)
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
              pushEnding('i', 0)
            } else {
              pushEnding('g', 0)
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
                      pushEnding('i', i)
                    } else if (place.concat(A,B,C).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                      postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                      pushEnding('g', i)
                    } else if (place.concat(D,E,F).includes(s) && A.includes(nextIndexPostbase)) {
                      if (endingMood == 'g') {
                        postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                      } else {
                        postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                      }
                      pushEnding('i', i)
                    } else if (place.concat(D,E,F).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                      if (endingMood == 'g') {
                        postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                      } else {
                        postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierInfinitive(''))
                      }
                      pushEnding('g', i)
                    } else {
                      postbasesEnglish.push(postbases[nextIndexPostbase].englishModifierInfinitive(''))
                      if (nextIndexPostbase == 26 || nextIndexPostbase == 28) {
                        pushEnding('g', i)
                      } else if (place.concat(A,B,C).includes(nextIndexPostbase)) {
                        pushEnding('i',i)
                      } else {
                        pushEnding(endingMood, i)
                      }
                    }
                  } else { //gerund
                    if (place.concat(A,B,C).includes(s) && A.includes(nextIndexPostbase)) {
                      postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierGerund(''))
                      pushEnding('i', i)
                    } else if (place.concat(A,B,C).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                      // console.log('called?')
                      postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierGerund(''))
                      pushEnding('g', i)
                    } else if (place.concat(D,E,F).includes(s) &&  A.includes(nextIndexPostbase)) {
                      if (endingMood == 'g') {
                        postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifierGerund(''))
                      } else {
                        postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierGerund(''))
                      }
                      pushEnding('i', i)
                    } else if (place.concat(D,E,F).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                      if (endingMood == 'g') {
                        postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifierGerund(''))
                      } else {
                        postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifierGerund(''))
                      }
                      pushEnding('g', i)
                    } else {
                      postbasesEnglish.push(postbases[nextIndexPostbase].englishModifierGerund(''))
                      if (nextIndexPostbase == 26 || nextIndexPostbase == 28) {
                        pushEnding('g', i)
                      } else if (place.concat(A,B,C).includes(nextIndexPostbase)) {
                        pushEnding('i', i)
                      } else {
                        pushEnding(endingMood, i)
                      }
                    }
                  }
                } else {
                  if (place.concat(A,B,C).includes(s) && A.includes(nextIndexPostbase)) {
                    postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifier(''))
                    pushEnding('i', i)
                  } else if (place.concat(A,B,C).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                    postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifier(''))
                    pushEnding('g', i)
                  } else if (place.concat(D,E,F).includes(s) && A.includes(nextIndexPostbase)) {
                    if (endingMood == 'g') {
                      postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifier(''))
                    } else {
                      postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifier(''))
                    }
                    pushEnding('i', i)
                  } else if (place.concat(D,E,F).includes(s) && place.concat(F,G).includes(nextIndexPostbase)) {
                    if (endingMood == 'g') {
                      postbasesEnglish.push('being'+postbases[nextIndexPostbase].englishModifier(''))
                    } else {
                      postbasesEnglish.push('be'+postbases[nextIndexPostbase].englishModifier(''))
                    }
                    pushEnding('g', i)
                  } else {
                    postbasesEnglish.push(postbases[nextIndexPostbase].englishModifier(''))
                    if (nextIndexPostbase == 26 || nextIndexPostbase == 28) {
                      pushEnding('g', i)
                    } else if (place.concat(A,B,C).includes(nextIndexPostbase)) {
                      pushEnding('i', i)
                    } else {
                      pushEnding(endingMood, i)
                    }
                  }
                }
                console.log(englishEnding)
                if (place.concat(E,G).includes(nextIndexPostbase) == false ) {
                  endingMood = moodIndex[nextIndexPostbase]
                  // console.log(endingMood)
                  // console.log(postbases[nextIndexPostbase].description)
                }
              }
            })
        }
      let adjectivalbeing = ''
      if (this.state.properties.includes('adjectival')) {
        adjectivalbeing = ' being'
      }
      let getsubjectis = getsubjectis_verb.bind(null, currentPostbases, person);
      if (moodSpecific == 'You, stop!') {
        if (person == '3' || person == '1') {
          newText1 = 'let'
          newText2 = 'stop '
          // newText3 = newText3+'!'
        } else {
          newText1 = ''
          newText2 = ', stop'+adjectivalbeing
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
      } else if (moodSpecific == 'when (future)...') {
        newText1 = 'when'
        newText1after = ''
        newText2 = ''
        newText2after = 'will '+getsubjectis('future',people,person,'be',)
      } else if (moodSpecific == 'when (past)...') {
        newText1 = 'when '
        newText1after = ''
        newText2 = ''
        newText2after = getsubjectis('past',people,person,does)
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
      } else if (nounEnding !== '') {
        newText1 = ''
        newText1after = ''
        newText2 = verb2noun.find((p)=> {return p.ending==nounEnding}).text
        newText2after = ' ('+adjectivalbeing
        newText3 = newText3+')'
      } else {
        newText1 = ''
        newText1after = ''
        newText2 = ''
        newText2after = getsubjectis(tense,people,person,does)+getsubjectis(tense,people,person,'be')
      }
      currentPostbases = currentPostbases.reverse()
    }

    let postbasesList = [];
    let base = word;

    postbasesList = processPostbases_verb(currentPostbases, base, postbases, word)
    if (nounEnding != '') {
      if (nounEnding == 'device for') {
        if (currentPostbases.length == 0) {
          if (base[base.length-2]=='a' || base[base.length-2]=='e' || base[base.length-2]=='i' || base[base.length-2]=='u') {
            postbasesList = postbasesList.concat('+3uun')
          } else {
            postbasesList = postbasesList.concat('+cuun')
          }
        } else {
          console.log(postbasesList[postbasesList.length-1])
          console.log(postbasesList[postbasesList.length-1].length-2)
          if (postbasesList[postbasesList.length-1][postbasesList[postbasesList.length-1].length-2] =='a' || postbasesList[postbasesList.length-1][postbasesList[postbasesList.length-1].length-2]=='e' || postbasesList[postbasesList.length-1][postbasesList[postbasesList.length-1].length-2]=='i' || postbasesList[postbasesList.length-1][postbasesList[postbasesList.length-1].length-2]=='u') {
            postbasesList = postbasesList.concat('+3uun')
          } else {
            postbasesList = postbasesList.concat('+cuun')
          }
        }
      } else {
        postbasesList = postbasesList.concat([nounEndings[nounEnding]]);
      }
    } else {
    if (this.state.objectExists) {
      if (mood == 'indicative') {
        postbasesList = postbasesList.concat([indicative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'interrogative') {
        postbasesList = postbasesList.concat([interrogative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'subordinative') {
        postbasesList = postbasesList.concat([subordinative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_precessive') {
        postbasesList = postbasesList.concat(['@~+(t)vaileg\\'])
        postbasesList = postbasesList.concat([connective_consonantEnd_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_consequential') {
        postbasesList = postbasesList.concat(['@~:(6)a\\'])
        postbasesList = postbasesList.concat([connective_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_contingent') {
        postbasesList = postbasesList.concat(['+\'(g)aqa\\'])
        postbasesList = postbasesList.concat([connective_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_concessive') {
        if (person == 2 || person == 1) {
          postbasesList = postbasesList.concat(['@-6rar\\'])
        } else {
          postbasesList = postbasesList.concat(['@-6r\\'])
        }
        postbasesList = postbasesList.concat([connective_consonantEnd_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_conditional') {
        postbasesList = postbasesList.concat(['@~-ku\\'])
        postbasesList = postbasesList.concat([connective_conditional_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_first_contemporative') {
        postbasesList = postbasesList.concat(['-ller\\'])
        postbasesList = postbasesList.concat([connective_contemporative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_second_contemporative') {
        postbasesList = postbasesList.concat(['@:(6)inaner\\'])
        postbasesList = postbasesList.concat([connective_contemporative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'do!') {
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'do (in the future)!') {
        postbasesList = postbasesList.concat(['@~-ki\\'])
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'You, stop!') {
        postbasesList = postbasesList.concat(['@~+(t)viiqna\\'])
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'You, do not!') {
        if (person == 2) {
          postbasesList = postbasesList.concat(['@~+yaquna\\'])
        } else {
          postbasesList = postbasesList.concat(['-nrilki\\'])
        }
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      }
    } else {
      if (mood == 'indicative') {
        // console.log(indicative_intransitive_endings, person, people)
        postbasesList = postbasesList.concat([indicative_intransitive_endings[person][people]]);
    } else if (mood == 'interrogative') {
        postbasesList = postbasesList.concat([interrogative_intransitive_endings[person][people]]);
    } else if (mood == 'subordinative') {
        postbasesList = postbasesList.concat([subordinative_intransitive_endings[person][people]]);
      } else if (mood == 'connective_precessive') {
        postbasesList = postbasesList.concat(['@~+(t)vaileg\\'])
        postbasesList = postbasesList.concat([connective_consonantEnd_intransitive_endings[person][people]]);
      } else if (mood == 'connective_consequential') {
        postbasesList = postbasesList.concat(['@~:(6)a\\'])
        postbasesList = postbasesList.concat([connective_intransitive_endings[person][people]]);
      } else if (mood == 'connective_contingent') {
        postbasesList = postbasesList.concat(['+\'(g)aqa\\'])
        postbasesList = postbasesList.concat([connective_intransitive_endings[person][people]]);
      } else if (mood == 'connective_concessive') {
        if (person == 2 || (person == 1 && people != 1)) {
          postbasesList = postbasesList.concat(['@-6rar\\'])
        } else {
          postbasesList = postbasesList.concat(['@-6r\\'])
        }
        postbasesList = postbasesList.concat([connective_consonantEnd_intransitive_endings[person][people]]);
      } else if (mood == 'connective_conditional') {
        postbasesList = postbasesList.concat(['@~-ku\\'])
        postbasesList = postbasesList.concat([connective_conditional_intransitive_endings[person][people]]);
      } else if (mood == 'connective_first_contemporative') {
        postbasesList = postbasesList.concat(['-ller\\'])
        postbasesList = postbasesList.concat([connective_contemporative_intransitive_endings[person][people]]);
      } else if (mood == 'connective_second_contemporative') {
        postbasesList = postbasesList.concat(['@:(6)inaner\\'])
        postbasesList = postbasesList.concat([connective_contemporative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'do!') {
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'do (in the future)!') {
        postbasesList = postbasesList.concat(['@~-ki\\'])
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'You, stop!') {
        postbasesList = postbasesList.concat(['@~+(t)viiqna\\'])
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'You, do not!') {
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
  }
  if (postbasesList[postbasesList.length-1] == '+(t)vtek') {
    let k = postbasesList[postbasesList.length-2]
    k = k[k.length-2]
    // console.log(k)
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
  let added_word = addedWord(moodSpecific, this.state.objectExists, objectPeople, people, )

  this.setState({postbasesList: postbasesList})
  let postbasesString = "";
  postbasesList.forEach((e) => {
    postbasesString = postbasesString + "&postbase=" + encodeURIComponent(e);
  });
  currentPostbases = currentPostbases.reverse()


  //process the ^himself^ ^his^ etc. cases
  var betweencarrots = /\^([^\]]+)\^/; // regex to match (text)
  let pronoun = newText3.match(betweencarrots);
  let pronountype = ''
  if (pronoun){
    if (pronoun[0] === '^himself^' || pronoun[0] === '^herself^' || pronoun[0] === '^itself^') {
      pronountype = 'self'
    } else if (pronoun[0] === '^his^' || pronoun[0] === '^her^' || pronoun[0] === '^its^') {
      pronountype = 'possessive'
    } else {
      pronountype = 'asis'
    }
    if (pronountype == 'self' || pronountype == 'possessive') {
      newText3=newText3.replace(pronoun[0],pronounEnding(value1, pronountype))
    } else {
      newText3=newText3.replace(pronoun[0],pronoun[1])
    }
  }

  pronoun = englishEnding[0].match(betweencarrots);
  if (pronoun){
    if (pronoun[0] === '^himself^' || pronoun[0] === '^herself^' || pronoun[0] === '^itself^') {
      pronountype = 'self'
    } else if (pronoun[0] === '^his^' || pronoun[0] === '^her^' || pronoun[0] === '^its^') {
      pronountype = 'possessive'
    } else {
      pronountype = 'asis'
    }
    if (pronountype == 'self' || pronountype == 'possessive') {
      englishEnding[0]=englishEnding[0].replace(pronoun[0],pronounEnding(value1, pronountype))
    } else {
      englishEnding[0]=englishEnding[0].replace(pronoun[0],pronounEnding(value1, pronountype))
    }
  }
  let postbasesEnglishPhrase = postbasesEnglish.join(' ')
  let SubjecT = retrieveSubjectObject[this.state.value1]
  let ObjecT = retrieveSubjectObject[this.state.value2]
  if (ObjecT) {
    ObjecT = retrieveSubjectObject[this.state.value2]
  } else {
    ObjecT = ''
  }
  this.setState({fullEnglish: newText1+' '+newText1after+' '+SubjecT+' '+newText2+' '+newText2after+' '+postbasesEnglishPhrase+' '+englishEnding[0]+' '+ObjecT+' '+newText3+' '+newText3tense})

  // it -> its
  // it -> it
  // it -> itself
  // he -> himself
  // he -> his
  // she -> her
  // she -> herself

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
  } // end of ModifyWordVerb

  modifyWordNoun(person, people, possessorPerson, possessorPeople, mood, moodSpecific, nounEnding, verbEnding, value4, word, currentPostbases) {
    if (value4 != 1 || possessorPeople != 0 || mood != 'absolutive' || verbEnding == true || nounEnding == true || currentPostbases.length > 0) {
      word = this.state.usage
    }
    currentPostbases = currentPostbases.sort((p1, p2) => {
      return (nounPostbases[p1].priority > nounPostbases[p2].priority) ? 1 : ((nounPostbases[p1].priority < nounPostbases[p2].priority) ? -1 : 0);
    });

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
    let processPostbases = processPostbases_noun;

     let endingPostbase = []
      if (possessorPerson > 0) {
        postbasesList = processPostbases(currentPostbases, base, nounPostbases)
        postbasesList = postbasesList.concat(returnEnding(postbasesList, value4,possessorPerson,possessorPeople,mood))
      } else if (verbEnding) {
        postbasesList = processPostbases(currentPostbases, base, nounPostbases)
        postbasesList = postbasesList.concat(indicative_intransitive_endings[person][people]);
      } else if (value4 != 1) {
        postbasesList = processPostbases(currentPostbases, base, nounPostbases)
        postbasesList = postbasesList.concat(returnEnding(postbasesList, value4,possessorPerson,possessorPeople,mood))
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
          postbasesList = postbasesList.concat(returnEnding(postbasesList, value4,possessorPerson,possessorPeople,mood))
        }
      }
      console.log(currentPostbases)
      let added_word = ''
      let adder = ''
      let adjectivesEnglish = []
      let nounEndingEnglish = []
      let verbEndingEnglish = []

      let getsubjectis = getsubjectis_noun;
      if (currentPostbases.length>0) {
        currentPostbases.forEach((p) => {
          adder = ''
          if (p > -1 && p < 7) {
            adjectivesEnglish.push(nounPostbases[p].englishModifier(adder));
          } else if (p > 6 && p < 11) {
            nounEndingEnglish.push(nounPostbases[p].englishModifier(adder));
          } else if (p == 14 || p == 21 || p == 17) {
            verbEndingEnglish.push(getsubjectis(true,people,person)+' '+nounPostbases[p].englishModifier(adder));
          } else if (p == 18 || p == 19) {
            verbEndingEnglish.push(nounPostbases[p].englishModifier(adder));
            this.setState({value1: '31-3(1)', person: 3, people: 1});
            person = 3;
            people = 1;
          } else {
            verbEndingEnglish.push(getsubjectis(false,people,person)+' '+nounPostbases[p].englishModifier(adder));
          }
        })
      }

    this.setState({postbasesList: postbasesList})
    let postbasesString = "";
    postbasesList.forEach((e) => {
      postbasesString = postbasesString + "&postbase=" + encodeURIComponent(e);
    });
    currentPostbases = currentPostbases.reverse()

    axios
      .get(API_URL + "/concat?root=" + word.replace('-', '') + postbasesString)
      .then(response => {
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
    } // end of ModifyWordNoun

  render() {
    console.log('YupikModifyLayout state', this.state)
    var dict1 = [];
    var dict2 = [];
    var dict3 = [];
    const { verb, value1, value2, value3, id1, mood, possessiveObject, objectExists } = this.state;
    removeCombos(dict1, dict2, dict3, verb, value1, value2, mood, possessiveObject, objectExists);

    let countEndingPostbase = this.state.postbasesList.length-this.state.currentPostbases.length
    let postbasesDisplay = ''
    let wordDisplay = ''
    let updatedPostbasesList = []
    let nounType = ''

    if (this.verb || !(this.state.verbEnding)) {
      postbasesDisplay = (
        <span>
        <span >{this.state.currentWord}</span>
        {this.state.postbasesList.slice(0,this.state.postbasesList.length-countEndingPostbase).map((p, i) => {
          return <span key={i} style={{color: this.state.colorsList[2+this.state.postbasesList.length-countEndingPostbase-i]}}>{' ' + p.replace('\\','-')}</span>;
        })}
        {this.state.postbasesList.slice(this.state.postbasesList.length-countEndingPostbase).map((p, i) => {
          return <span key={i} style={{color: '#852828'}}>{' ' + p}</span>; // change to 2-i for other color
        })}
        </span>
      );
      wordDisplay = (
        <span>
        {this.state.colorIndexes.map((index, i) => {
          if (i == 0) {
            return <span key={i}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          } else if (i < this.state.colorIndexes.length-countEndingPostbase) {
            return <span key={i} style={{color: this.state.colorsList[2+this.state.colorIndexes.length-countEndingPostbase-i]}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          } else if (i == this.state.colorIndexes.length-countEndingPostbase) {
            return <span key={i} style={{color: '#852828'}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i])}</span>;
          }
        })}
        </span>
      );
    } else {
      postbasesDisplay = (
        <span>
        <span >{this.state.usage}</span>
        {this.state.postbasesList.slice(0,this.state.postbasesList.length-countEndingPostbase-1).map((p, i) => {
          return <span style={{color: this.state.colorsList[2+this.state.postbasesList.length-countEndingPostbase-i]}}>{' ' + p.replace('\\','-')}</span>;
        })}
        {this.state.postbasesList.slice(this.state.postbasesList.length-countEndingPostbase-1).map((p, i) => {
          return <span style={{color: '#852828'}}>{' ' + p}</span>;
        })}
        </span>
      );

      wordDisplay = (
        <span>
        {this.state.colorIndexes.map((index, i) => {
          if (i == 0) {
            return <span >{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          } else if (i < this.state.colorIndexes.length-countEndingPostbase-1) {
            return <span style={{color: this.state.colorsList[2+this.state.colorIndexes.length-countEndingPostbase-i]}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i], this.state.colorIndexes[i+1])}</span>;
          } else if (i == this.state.colorIndexes.length-countEndingPostbase-1) {
            return <span style={{color: '#852828'}}>{this.state.modifiedWord.substring(this.state.colorIndexes[i])}</span>;
          }
        })}
        </span>
      );
    }

    //this.state.colorsList[2] changed to '#852828'

    //MAKE MORE SUCCINCT, also assumes in the future only one time postbase at a time
    let timeIndex = ''
    console.log(this.state.currentPostbases)
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
      'enclitic': this.state.enclitic
    };
    let fixedStyle = {
      position: 'fixed',
      margin: 'auto',
      top: '5.9em',
      zIndex: 100,
      backgroundColor: 'white',
      left: 0,
      right: 0,
      width: '100%'
    };
    return (
      <div>
      <StickyMenu displaySimple={false} word={this.state.currentWord} goBack={this.props.history.goBack} switchMode={this.switchMode} {...this.props} />
      <Container attached='true' style={{ paddingTop: '8em' }} onClick={() => {if (this.state.displayPostbases) { this.setState({displayPostbases: false}); }}}>
      <Visibility
        onTopPassed={() => {console.log('top passed!'); this.setState({ headerFixed: true }); }}
        onTopPassedReverse={() => {console.log('top reverse passed!'); this.setState({ headerFixed: false }); }}
        once={false}
        offset={[150, 150]}
      >
        <Grid style={this.state.headerFixed ? fixedStyle : {top: '1em'}}>
          {this.state.displayPostbases ?
          <Grid.Row style={{padding: 0}}>
            <Grid.Column align='center'>
              <Header as='h5'>
              {postbasesDisplay}
              </Header>
            </Grid.Column>
          </Grid.Row>
          : ''}

          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              <Header textAlign='center' as='h1'>
              <span onClick={this.setDisplayPostbases.bind(this)} style={{cursor: 'pointer', backgroundColor: (this.state.displayPostbases ? '#b3c3db' : 'white')}}>
              {this.state.addedWord !== '' ?
              <span style={{color: '#852828'}}>{this.state.addedWord}</span>
              :''}
              {this.state.enclitic !== '' && this.state.mood === 'interrogative' ? this.state.enclitic+' '
              :' '}
              {wordDisplay}
              {this.state.enclitic !== '' && this.state.encliticExpression !== '(again)' && this.state.mood === 'indicative' ? this.state.enclitic
              :''}
              {this.state.enclitic === '-qaa' ? '?' : ''}
              </span>
              <span style={{color: '#852828'}}>
              {this.state.mood === 'interrogative' ? '?' :''}
              {''}
              {this.verb || this.state.currentPostbases.length == 0 && this.state.mood == 'absolutive' && this.state.value4 == 1 && this.state.possessiveButton == 0 ?
              (this.state.loadingTTS ?
                <Loader inline active />
                :
                (this.state.canTTS ?
                  <Icon name='volume up' color='black' size='small' onClick={this.speak.bind(this)} link />
                  :
                  <Icon.Group>
                    <Icon name='ban' color='grey' />
                    <Icon name='volume up' color='black' size='tiny' />
                  </Icon.Group>
                )
              )
              :
              ''
              }
              <a href="https://goo.gl/forms/be5L5cgSQmCJeVDl1" target="_blank" rel="noopener noreferrer">
              <Icon inverted name='exclamation circle' color='grey' size='small'/>
              </a>
              </span>
              </Header>

            </Grid.Column>

          </Grid.Row>


          {this.verb ?
          (this.state.nounEnding !== '' ?
          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              <Header as='h4' align='center'>
                <span style={{color: '#852828'}}>{this.state.text2}</span>
                {' '}
                {this.state.text2after}
                {' '}
                {this.state.postbasesEnglish.map((p, i) => {
                return <span style={{color: this.state.colorsList[3+i]}}>{' ' + p}</span>;
                })}
                {' '}
                <span >{this.state.englishEnding[0]}</span>
                {' '}
                {this.state.text3}
                {' '}
                {timeIndex !== '' ?
                  <span style={{color: this.state.colorsList[3+timeIndex]}}>{this.state.text3tense}</span>
                  :
                  <span style={{color: '#852828'}}>{this.state.text3tense}</span>
                }
              </Header>
            </Grid.Column>
          </Grid.Row>
          :
          <Grid.Row>
            <Grid.Column verticalAlign='middle' align='center'>
              <Header as='h4' align='center'>
                {' '}
                <span style={{color: '#852828'}}>{this.state.text1}</span>
                {' '}
                {timeIndex !== '' ?
                  <span style={{color: this.state.colorsList[3+timeIndex]}}>{this.state.text1after}</span>
                  :
                  this.state.text1after
                }
                {' '}
                <span style={{color: '#852828',background: '#e0e0e0', paddingLeft:2, paddingRight:0, paddingTop:5, paddingBottom:5, borderRadius:5, borderWidth: 1, borderColor: '#fff'}}>
                <Dropdown inline scrolling options={dict1} onChange={this.setValue1.bind(this)} value={value1} />
                </span>
                {' '}
                <span style={{color: '#852828'}}>{this.state.text2}</span>
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
                <span >{this.state.englishEnding[0]}</span>
                {' '}

                {this.state.objectExists && this.state.moodSpecific !== 'who'  ?
                <span style={{color: '#852828',background: '#e0e0e0', paddingLeft:2, paddingRight:0, paddingTop:5, paddingBottom:5, borderRadius:5, borderWidth: 1, borderColor: '#fff'}}>
                <Dropdown inline scrolling options={dict2} onChange={this.setValue2.bind(this)} value={value2} />
                </span>
                :
                ''
                }
                {this.state.objectExists && this.state.moodSpecific === 'who'  ?
                <span style={{color: '#852828'}}>
                (<Dropdown inline scrolling options={dict2} onChange={this.setValue2.bind(this)} value={value2} />)
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
                  <span style={{color: '#852828'}}>{this.state.text3tense}</span>
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
                  <span style={{color: '#852828'}}>
                  <Dropdown scrolling style={{color: '#852828',background: '#e0e0e0', paddingLeft:2, paddingRight:0, paddingTop:5, paddingBottom:5, borderRadius:5, borderWidth: 1, borderColor: '#fff'}} inline options={dict1} onChange={this.setValue1.bind(this)} value={value1} />
                  </span>:
                  ''
                )}
                {' '}
                {(this.state.possessiveButton == 1 ?
                  <span style={{color: '#852828'}}>
                  <Dropdown scrolling style={{color: '#852828',background: '#e0e0e0', paddingLeft:2, paddingRight:0, paddingTop:5, paddingBottom:5, borderRadius:5, borderWidth: 1, borderColor: '#fff'}} inline options={dict3} onChange={this.setValue3.bind(this)} value={value3} />
                  </span>:
                  ''
                )}

                {this.state.verbEndingEnglish != '' ?
                <span style={{color: '#852828'}}>{this.state.verbEndingEnglish}</span>
                :
                ''
                }
                {this.state.adjectivesEnglish.reverse().map((p, i) => {
                return <span style={{color: this.state.colorsList[3+i+nounEndingcounter-verbEndingcounter]}}>{' ' + p}</span>;
                })}
                {' '}
                <span >{this.state.text2}</span>
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
                {this.state.verbEnding== false && this.state.value4 == 2 && this.state.nounEnding !== 'many of them'?
                <span style={{color: '#852828'}}>(two of them)</span>
                :
                ''
                }
                {this.state.verbEnding== false && this.state.value4 == 3 && this.state.nounEnding !== 'many of them'?
                <span style={{color: '#852828'}}>(three or more)</span>
                :
                ''
                }
              </Header>
            </Grid.Column>
          </Grid.Row>
          }

          {this.verb && this.state.alternateTense != '' && this.state.mood == 'indicative' && this.state.currentPostbases.length == 0 && this.state.person != 1 ?
            <Grid.Row>
              <Grid.Column>
                <Header color='grey' fontStyle='italic' as='h5' align='center'>
                  <i> also {this.state.alternateTense} tense </i>
                </Header>
              </Grid.Column>
            </Grid.Row>
            : ''
          }
          <Grid.Row textAlign='center'>
            <Grid.Column>

          {this.state.currentPostbases.length > 0 || (this.verb && this.state.mood != 'indicative') || (this.verb == false && this.state.mood != 'absolutive') || this.state.possessiveButton === 1 || this.state.enclitic !== '' ?
                <List horizontal>
                {this.state.mood !== 'absolutive' && this.verb == false ?
                  <List.Item onClick={(event) => this.setMoodNoun(this.state.mood, event)}>
                    <Chip  text={this.state.mood} />
                  </List.Item>
                :
                ''
                }
                {this.state.possessiveButton === 1 ?
                  <List.Item onClick={(event) => this.setPossessiveButton(1, event)}>
                    <Chip  text={'possessive'} />
                  </List.Item>
                  :
                  ''
                }
                {this.state.mood == 'optative' || this.state.mood == 'interrogative' || this.state.mood == 'connective_precessive' || this.state.mood == 'connective_consequential' || this.state.mood == 'connective_contingent' || this.state.mood == 'connective_concessive' || this.state.mood == 'connective_conditional' || this.state.mood == 'connective_first_contemporative' || this.state.mood == 'connective_second_contemporative' || this.state.mood == 'subordinative' ?
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
                {this.state.enclitic !== '' ?
                  <List.Item onClick={(event) => this.setEnclitic(this.state.enclitic,this.state.encliticExpression, event)}>
                    <Chip  text={this.state.encliticExpression} />
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
      {this.state.allPostbasesMode === false && this.verb && this.state.currentPostbases.length > 0 ?
        <List.Item><List.Icon circular name='lock' onClick={this.allPostbasesMode.bind(this)}/></List.Item>
        :
        ''
      }
      {this.state.allPostbasesMode === true && this.verb && this.state.currentPostbases.length > 0 ?
        <List.Item><List.Icon circular name='lock open' onClick={this.allPostbasesMode.bind(this)}/></List.Item>
        :
        ''
      }
      </List>
          : ''}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Visibility>

        <Visibility
          onTopVisibleReverse={() => {console.log('top visible!'); this.setState({ headerFixed: false }); }}
          offset={this.state.headerFixed ? [300, 0] : [300, 0]}
        >
        <div style={this.state.headerFixed ? {paddingTop: (this.state.displayPostbases ? '15em' : '12em')} : {paddingTop: '1.5em'}}>
        <Route exact path={`${this.props.match.path}/noun`} component={YupikModifyNoun} />
        <Route exact path={`${this.props.match.path}/noun/all`} render={(props) => <YupikAllNounPostbases {...props} {...yupikAllPostbasesProps} />} />
        <Route exact path={`${this.props.match.path}/noun/descriptors`} render={(props) => <YupikNounDescriptors {...props} {...yupikAllPostbasesProps} />} />
        <Route exact path={`${this.props.match.path}/noun/phrase`} render={(props) => <YupikNounPhrase {...props} {...yupikAllPostbasesProps} />} />
        <Route exact path={`${this.props.match.path}/noun/combine`} render={(props) => <YupikNounCombine {...props} {...yupikAllPostbasesProps} />} />

        <Route exact path={`${this.props.match.path}/verb`} render={(props) => <YupikModifyVerb {...props} advancedMode={this.props.advancedMode}  {...yupikAllPostbasesProps} />} />
        <Route exact path={`${this.props.match.path}/verb/all`} render={(props) => <YupikAllPostbases {...props} {...yupikAllPostbasesProps}/>} />
        <Route exact path={`${this.props.match.path}/verb/ending`} render={(props) => <YupikEndingGroups {...props} {...yupikAllPostbasesProps}/>} />
        <Route exact path={`${this.props.match.path}/verb/ending/:ending_group_id`} render={(props) => <YupikEnding {...props} {...yupikAllPostbasesProps}/>} />
        <Route exact path={`${this.props.match.path}/verb/ending/:ending_group_id/postbase`} render={(props) => <YupikPostbaseGroups {...props} {...yupikAllPostbasesProps}/>} />
        <Route exact path={`${this.props.match.path}/verb/ending/:ending_group_id/postbase/:postbase_group_id`} render={(props) => <YupikPostbase {...props} {...yupikAllPostbasesProps}/>} />
        </div>
        </Visibility>
      </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { advancedMode: state.allPostbases.allPostbasesMode };
};
export default connect(mapStateToProps, { toggleAllPostbases })(withRouter(YupikModifyLayout));
