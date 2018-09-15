import React, { Component } from 'react';
import { Segment, Button, Header, Grid, Container, Dropdown, Divider, Menu, Accordion, Icon, Card } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';
import { options1, options2, options3, postbases } from './constants.js';
import { nounEndings, indicative_intransitive_endings,
  indicative_transitive_endings, interrogative_intransitive_endings,
  interrogative_transitive_endings, optative_intransitive_endings,
  optative_transitive_endings, subordinative_intransitive_endings,
  subordinative_transitive_endings, connective_intransitive_endings,
  connective_transitive_endings, connective_consonantEnd_intransitive_endings,
  connective_consonantEnd_transitive_endings, connective_contemporative_intransitive_endings,
  connective_contemporative_transitive_endings, connective_conditional_intransitive_endings,
  connective_conditional_transitive_endings } from './constants_verbs.js';
import { interrogative, optative, dependent, verb2noun, postbaseButtons, enclitics } from './modifyVerbOptions.js';
import StickyMenu from './StickyMenu.js';
import palette from 'google-palette';
import shuffle from 'shuffle-array';

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class YupikModifyVerb extends Component {
  constructor(props) {
    super(props);
    console.log("YupikModifyVerb props: ", props);
    console.log(getRandomArbitrary(0, 100));
    this.state = {
      usageId: this.props.match.params.usage_id,
      entry: this.props.location.state.entry,
      usage: this.props.location.state.entry.usage[this.props.match.params.usage_id][1],
      properties: this.props.location.state.entry.properties,
      people: 1,
      person: 3,
      objectPeople: 1,
      objectPerson: 1,
      value1: "",
      value2: "",
      value3: "",
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
      encliticExpression: '',
      tense: 'present',
      text1: "",
      text2: "",
      mood:"indicative",
      moodSpecific:"indicative",
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
      modifiedWord: this.props.location.state.word,//props.word.yupik,
      currentWord: this.props.location.state.word,//props.word.yupik,
      currentEnglish: "",//currentVerb,
      modifiedEnglish: "",//props.word.english,//new Inflectors(currentVerb),
    };
    if (this.state.properties.includes('momentary')) {
      this.state.alternateTense = 'present'
      this.state.tense = 'past'
    } else if (this.state.properties.includes('not_momentary')) {
      this.state.alternateTense = 'recent past'
    }
    this.processUsage=this.processUsage.bind(this);
    let new_state = this.processUsage(this.state.usage);
    this.state = {...this.state, ...new_state};
    this.modifyWord = this.modifyWord.bind(this);
    if (this.state.objectExists) {
      this.state.postbasesList = ["+'(g)aa"]
    } else {
      this.state.postbasesList = ["+'(g/t)uq"]
    }
    this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.currentWord, this.state.currentPostbases);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUpdate(newProps, newState) {
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
    return new_state;
  }

  setValue1(e, data) {
    console.log(e)
    console.log(data)
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
    this.setState({ value3: data.value });
    this.setState({ objectPerson: data.value[0]});
    this.setState({ objectPeople: data.value[1]});
  }

  setPostbase(postbase_id, event, data) {
    event.preventDefault();
    let index = this.state.currentPostbases.indexOf(postbase_id);
    let currentPostbases = this.state.currentPostbases;
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

  setMood(newMood, moodSpecific, event, data) {
    this.setState({ mood: (this.state.moodSpecific == moodSpecific) ? 'indicative' : newMood });
    this.setState({ moodSpecific: (this.state.moodSpecific == moodSpecific) ? 'indicative' : moodSpecific })
  }

  setEnclitic(enclitic, encliticExpression, event, data) {
    this.setState({ enclitic: (this.state.enclitic == enclitic) ? '' : enclitic })
    this.setState({ encliticExpression: (this.state.enclitic == enclitic) ? '' : encliticExpression })
  }

  setNounEnding(ending, event, data) {
    this.setState({ nounEnding: (this.state.nounEnding == ending) ? '' : ending})
  }

  modifyWord(person, people, objectPerson, objectPeople, mood, moodSpecific, nounEnding, word, currentPostbases) {
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
    var postbasesEnglish = []
    let test = new_adj
    let originalverb = nlp(test).verbs().out().split(' ')[0]
    let verbtenses = nlp(test).verbs().conjugate()[0]
    let gerund_new_adj = test.replace(originalverb,verbtenses.Gerund)
    let infinitive_new_adj = test.replace(originalverb,verbtenses.Infinitive)
    let firstpass = true
    let englishEnding = []
    console.log(new_adj)
    if (moodSpecific == 'You, stop!' || nounEnding == 'device for') {
      if (tense == 'past') {
        englishEnding.push('(in the past)')
      } else if (tense == 'future') {
        englishEnding.push('(in the future)')
      }
      if (currentPostbases.length>0) {
        firstpass = true
        currentPostbases.forEach((p) => {
          if (firstpass) {
            if (p > 1 && p < 5) {
              postbasesEnglish.push('being'+postbases[p].englishModifier(''))
            } else {
              postbasesEnglish.push(postbases[p].englishModifier(''))
            }
            firstpass = false
          } else if (p > 1 && p < 5 || p > 15 && p < 19 ) {
            postbasesEnglish.push('be'+postbases[p].englishModifier(''))
          } else {
            postbasesEnglish.push(postbases[p].englishModifier(''))
          }
        })
        englishEnding.push('be '+gerund_new_adj)
      } else {
        if (this.state.properties.includes('adjectival')) {
          englishEnding.push('being '+new_adj)
        } else if (nois) {
          englishEnding.push(gerund_new_adj)
        } else {
          englishEnding.push(gerund_new_adj)
        }
      }
    if (moodSpecific == 'You, stop!') {
      if (person == '3' || person == '1') {
        newText1 = 'let'
        newText2 = 'stop '
        newText3 = '!'
      } else {
        newText2 = ', stop '
        newText3 = '!'
      }
    }
  }


    console.log(newText1)
    console.log(newText2)
    console.log(postbasesEnglish)
    console.log(englishEnding)
    console.log(newText3)
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


    handleClick(e, titleProps) {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index

      this.setState({ activeIndex: newIndex })
    }

      render() {
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
        console.log("YupikModifyVerb state: ", this.state);
        const{value1}=this.state
        const{value2}=this.state
        const{value3}=this.state
        const{id1}=this.state
        let postbasesDisplay = (
          <span>
          <span style={{color: this.state.colorsList[0]}}>{this.state.currentWord}</span>
          {this.state.postbasesList.map((p, i) => {
            return <span style={{color: this.state.colorsList[i+1]}}>{' ' + p}</span>;
          })}
          </span>
        );
        let wordDisplay = (
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
        //let completeSentence = 'may also mean: "' + nlp(this.state.text1+'<>'+this.state.text2+'<>'+this.state.text3).sentences().toPastTense().out() + '" (past tense)'
        //{this.state.mood == 'indicative' ? <Grid.Column verticalAlign='middle' align='center'>{completeSentence}</Grid.Column> : ''}


            // <div align="center">
            // Mood Markers:
            // </div>
            // <div align="center">
            // <Button.Group inverted color='pink' vertical>
            //   <Segment>
            //   interrogative (question form)
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','who')} active={this.state.moodSpecific=='who'}>who</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','when did (past)')} active={this.state.moodSpecific=='when did (past)'}>when? (past)</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','when will (future)')} active={this.state.moodSpecific=='when will (future)'}>when? (future)</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','at where')} active={this.state.moodSpecific=='at where'}>at where?</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','from where')} active={this.state.moodSpecific=='from where'}>from where?</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','toward where')} active={this.state.moodSpecific=='toward where'}>toward where?</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','why')} active={this.state.moodSpecific=='why'}>why?</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','how')} active={this.state.moodSpecific=='how'}>how?</Button>
            //   </Segment>
            // </Button.Group>

            // <Button.Group inverted color='brown' vertical>
            // <Segment>
            //   optative (command form)
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'optative','do!')} active={this.state.moodSpecific=='do!'}>do!</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'optative','do (in the future)!')} active={this.state.moodSpecific=='do (in the future)!'}>do (in the future)!</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'optative','You, do not!')} active={this.state.moodSpecific=='You, do not!'}>You, do not!</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'optative','You, stop!')} active={this.state.moodSpecific=='You, stop!'}>You, stop!</Button>
            // </Segment>
            // </Button.Group>

            // <Button.Group inverted color='blue' vertical>
            //   <Segment>
            //   connective (add a sub. conjunction)
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_precessive','before')} active={this.state.moodSpecific=='before'}>precessive (before)</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_consequential','because')} active={this.state.moodSpecific=='because'}>consequential (because)</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_contingent','whenever')} active={this.state.moodSpecific=='whenever'}>contingent (whenever)</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_concessive','although')} active={this.state.moodSpecific=='although'}>concessive (although)</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_conditional','while')} active={this.state.moodSpecific=='while'}>conditional (while)</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_first_contemporative','when (past)')} active={this.state.moodSpecific=='when (past)'}>1st_contem (when in the past)</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_second_contemporative','when (future)')} active={this.state.moodSpecific=='when (future)'}>2nd_contem (when in the future)</Button>
            //   <Button as='h4' toggle onClick={this.setMood.bind(this,'subordinative','by or being that')} active={this.state.moodSpecific=='by or being that'}>subordinative (by or being that)</Button>
            //   </Segment>
            // </Button.Group>
            // <Button.Group inverted color='green' vertical>
            //   <Segment>
            //     Noun Endings
            //     <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'the one who is')} active={this.state.nounEnding=='the one who is'}>the one who is</Button>
            //     <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'device for')} active={this.state.nounEnding=='device for'}>device for</Button>
            //     <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'one that customarily/capably is')} active={this.state.nounEnding=='one that customarily/capably is'}>one that customarily/capably</Button>
            //     <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'how to/way of')} active={this.state.nounEnding=='how to/way of'}>how to/way of</Button>
            //     <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'one who is good at')} active={this.state.nounEnding=='one who is good at'}>one who is good at</Button>
            //     <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'act or state of')} active={this.state.nounEnding=='act or state of'}>act or state of</Button>
            //   </Segment>
            // </Button.Group>
            // </div>



        return (
          <div>
          <StickyMenu word={this.state.currentWord} goBack={this.props.history.goBack}/>

          <Container style={{ marginTop: '6em'}}>


            <Grid columns={1}>
              <Grid.Column verticalAlign='middle' align='center'>
                {postbasesDisplay}
              </Grid.Column>
            </Grid>

            <Grid columns={3}>
              <Grid.Column />
              <Grid.Column verticalAlign='middle' align='center'>
                <Header textAlign='center' as='h1'>
                {this.state.encliticExpression == '(again)' ? 'ataam '
                :''}
                {wordDisplay}
                {this.state.enclitic !== '' && this.state.encliticExpression !== '(again)' ? this.state.enclitic
                :''}
                </Header>
              </Grid.Column>
            </Grid>

            {this.state.nounEnding !== '' ?
            <Grid columns={1}>
              <Grid.Column verticalAlign='middle' align='center'>
                <Header as='h4' align='center'>
                  {this.state.text2}
                </Header>
              </Grid.Column>
              <Grid.Row/>
            </Grid>
            :
            <Grid columns={1}>
              <Grid.Column verticalAlign='middle' align='center'>
                <Header as='h4' align='center'>
                  {this.state.text1}
                  {' '}
                  <Dropdown inline options={dict1} onChange={this.setValue1.bind(this)} value={value1} />
                  {' '}
                  {this.state.text2}
                  {' '}
                  {this.state.postbasesEnglish.join(' ')}
                  {' '}
                  {this.state.englishEnding[0]}
                  {' '}
                  {this.state.objectExists ?
                  <Dropdown inline options={dict2} onChange={this.setValue2.bind(this)} value={value2} /> : ''}
                  {' '}
                  {this.state.text3}
                  {this.state.encliticExpression !== '' ? this.state.encliticExpression :''}
                  {this.state.mood == 'interrogative' ? '?':''}
                </Header>
              </Grid.Column>
              {this.state.alternateTense != '' && this.state.mood == 'indicative' && this.state.currentPostbases.length == 0 ?
                <Grid.Column>
                  <Header fontStyle='italic' as='h5' align='center'>
                    <i> could also be in {this.state.alternateTense} tense </i>
                  </Header>
                </Grid.Column>:
                ''
              }
              <Grid.Row/>
            </Grid>
            }

            <Accordion fluid exclusive={false}>
              <Accordion.Title active={this.state.activeIndex === 0 || this.state.mood === 'interrogative'} index={0} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Question form
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 0 || this.state.mood === 'interrogative'}>
                <Card.Group itemsPerRow={3} stackable>
                {interrogative.map((e) => {
                  return (
                    <Card>
                    <Button onClick={this.setMood.bind(this, e.group, e.mood)} toggle active={this.state.moodSpecific === e.mood}>{e.text}</Button>
                    </Card>
                  );
                })}
                </Card.Group>
              </Accordion.Content>

              <Accordion.Title active={this.state.activeIndex === 1 || this.state.mood === 'optative'} index={1} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Make a command
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 1 || this.state.mood === 'optative'}>
                <Card.Group itemsPerRow={3} stackable>
                {optative.map((e) => {
                  return (
                    <Card>
                    <Button onClick={this.setMood.bind(this, e.group, e.mood)} toggle active={this.state.moodSpecific === e.mood}>{e.text}</Button>
                    </Card>
                  );
                })}
                </Card.Group>
              </Accordion.Content>



              <Accordion.Title active={this.state.activeIndex === 2 || this.state.mood[0] == 'c' || this.state.mood[0] == 's'} index={2} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Dependent clause
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 2 || this.state.mood[0] == 'c' || this.state.mood[0] == 's'}>
                <Card.Group itemsPerRow={3} stackable>
                {dependent.map((e) => {
                  return (
                    <Card>
                    <Button onClick={this.setMood.bind(this,'optative', e.mood)} toggle active={this.state.moodSpecific === e.mood}>{e.text}</Button>
                    </Card>
                  );
                })}
                </Card.Group>
              </Accordion.Content>

              <Accordion.Title active={this.state.activeIndex === 3 || this.state.nounEnding != ''} index={3} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Verb to noun
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 3 || this.state.nounEnding != ''}>
                <Card.Group itemsPerRow={3} stackable>
                {verb2noun.map((e) => {
                  return (
                    <Card>
                    <Button onClick={this.setNounEnding.bind(this, e.ending)} toggle active={this.state.nounEnding === e.ending}>{e.text}</Button>
                    </Card>
                  );
                })}
                </Card.Group>
              </Accordion.Content>
            </Accordion>

            <Divider />
            <div align="center">
            Postbases:
            </div>

            <Accordion>
              {postbaseButtons.map((group) => {
                return (
                  <div>
                  <Accordion.Title active={this.state.activeIndex === group.activeIndex} index={group.activeIndex} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    {group.text}
                  </Accordion.Title>
                  <Accordion.Content active={this.state.activeIndex === group.activeIndex}>
                    <Card.Group itemsPerRow={3} stackable>
                    {group.indexes.map((e) => {
                      return (
                        <Card>
                        <Button onClick={this.setPostbase.bind(this, e)} disabled={(this.state.allowable_next_ids.indexOf(e) < e)} toggle active={this.state.currentPostbases.indexOf(e) >= 0}>{postbases[e].description}</Button>
                        </Card>
                      );
                    })}
                    </Card.Group>
                  </Accordion.Content>
                  </div>
                );
              })}
            </Accordion>
            <Divider />


            {this.state.mood == 'indicative' || this.state.mood == 'interrogative' ?
            <Accordion>
              <Accordion.Title active={this.state.activeIndex === enclitics[this.state.mood].activeIndex} index={enclitics[this.state.mood].activeIndex} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Enclitics
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === enclitics[this.state.mood].activeIndex}>
                <Card.Group itemsPerRow={3} stackable>
                {enclitics[this.state.mood].items.map((e) => {
                    return (
                      <Card>
                      <Button onClick={this.setEnclitic.bind(this, e.ending, e.meaning)} toggle active={this.state.enclitic === e.ending}>{e.text}</Button>
                      </Card>
                    );
                  })}
                  </Card.Group>
                </Accordion.Content>
            </Accordion>
            :''}

          </Container>
          </div>
        );
      }
    };


export default YupikModifyVerb;
