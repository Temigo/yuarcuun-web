import React, { Component } from 'react';
import { Segment, Button, Header, Grid, Container, Dropdown, Divider, Menu} from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';
import { options1, options2, options3, nounPostbases } from './constants.js';
import { nounEndings, indicative_intransitive_endings,
  indicative_transitive_endings, interrogative_intransitive_endings,
  interrogative_transitive_endings, optative_intransitive_endings,
  optative_transitive_endings, subordinative_intransitive_endings,
  subordinative_transitive_endings, connective_intransitive_endings,
  connective_transitive_endings, connective_consonantEnd_intransitive_endings,
  connective_consonantEnd_transitive_endings, connective_contemporative_intransitive_endings,
  connective_contemporative_transitive_endings, connective_conditional_intransitive_endings,
  connective_conditional_transitive_endings, absolutive_endings, localis_endings, relative_endings, ablative_endings, terminalis_endings, vialis_endings, equalis_endings } from './constants_nouns.js';
import StickyMenu from './StickyMenu.js';
import palette from 'google-palette';
import shuffle from 'shuffle-array';

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class YupikModifyNoun extends Component {
  constructor(props) {
    super(props);
    console.log("YupikModifyNoun props: ", props);
    console.log(getRandomArbitrary(0, 100));
    this.state = {
      usageId: this.props.match.params.usage_id,
      entry: this.props.location.state.entry,
      usage: this.props.location.state.entry.usage[this.props.match.params.usage_id][0],
      properties: this.props.location.state.entry.properties,
      people: 1,
      person: 3,
      objectPeople: 1,
      objectPerson: 1,
      possessiveButton: false,
      possessorPerson: 0,
      possessorPeople: 0,
      value1: "31-1(1)",
      value2: "",
      value3: "11(3)",
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
      adjectivesEnglish: '',
      nounEndingEnglish: '',
      verbEndingEnglish: '',
      mood:"absolutive",
      moodSpecific:"absolutive",
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
      modifiedWord: this.props.location.state.entry.usage[this.props.match.params.usage_id][0],//this.props.location.state.word
      currentWord: this.props.location.state.word,//this.props.location.state.word
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
    this.modifyWord(this.state.person, this.state.people, this.state.possessorPerson, this.state.possessorPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.verbEnding, this.state.value4, this.state.currentWord, this.state.currentPostbases);

  }

  componentWillUpdate(newProps, newState) {
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
    this.setState({ possessorPerson: data.value[0]});
    this.setState({ possessorPeople: data.value[1]});
  }
  setValue4(i, e, data) {
    this.setState({ value4: i});
  }

  setPostbase(postbase_id, event, data) {
    event.preventDefault();
    let index = this.state.currentPostbases.indexOf(postbase_id);
    let currentPostbases = this.state.currentPostbases;
    console.log(postbase_id)
    console.log(currentPostbases)
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

  setMood(mood, event, data) {
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

  modifyWord(person, people, possessorPerson, possessorPeople, mood, moodSpecific, nounEnding, verbEnding, value4, word, currentPostbases) {
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
        } else if (currentPostbases.length > 0) {
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


      render() {
        var dict1 = options1;
        var dict2 = [];
        var dict3 = options3;
        console.log("YupikModifyVerb state: ", this.state);        
        const{value1}=this.state
        const{value2}=this.state
        const{value3}=this.state
        const{id1}=this.state
        let postbasesDisplay = (
          <span>
          <span style={{color: this.state.colorsList[0]}}>{this.state.usage}</span>
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

            <Grid columns={1}>
              <Grid.Column verticalAlign='middle' align='center'>
                <Header as='h4' align='center'>

                  {(this.state.verbEnding ? 
                    <Dropdown inline options={dict1} onChange={this.setValue1.bind(this)} value={value1} /> :
                    ''
                  )}
                  {' '}
                  {(this.state.possessiveButton == 1 ? 
                    <Dropdown inline options={dict3} onChange={this.setValue3.bind(this)} value={value3} /> :
                    ''
                  )}

                  {this.state.verbEndingEnglish != '' ?
                  <text> {this.state.verbEndingEnglish} </text>
                  :
                  ''
                  }
                  {this.state.adjectivesEnglish != '' ?
                  <text> {this.state.adjectivesEnglish.join(', ')} </text>
                  :
                  ''
                  }
                  {' '}
                  {this.state.text2}
                  {' '}
                  {this.state.nounEndingEnglish != '' ?
                  <text> ({this.state.nounEndingEnglish}) </text>
                  :
                  ''
                  }
                  {' '}
                  {this.state.verbEnding== false && this.state.value4 == 1 ?
                  '(one of them)'
                  :
                  ''
                  }
                  {this.state.verbEnding== false && this.state.value4 == 2 ?
                  '(two of them)'
                  :
                  ''
                  }
                  {this.state.verbEnding== false && this.state.value4 == 3 ?
                  '(three of them)'
                  :
                  ''
                  }                                    
                </Header>
              </Grid.Column>
              <Grid.Row/>
            </Grid>
            <div align="center">
            Mood Markers:
            </div>
            <div align="center">

            {this.state.verbEnding== false ?
            <Button.Group inverted color='pink' vertical>
              <Segment>
              How many?
              <Button as='h4' toggle onClick={this.setValue4.bind(this,1)} active={this.state.value4==1}>1</Button>
              <Button as='h4' toggle onClick={this.setValue4.bind(this,2)} active={this.state.value4==2}>2</Button>
              <Button as='h4' toggle onClick={this.setValue4.bind(this,3)} active={this.state.value4==3}>3</Button>
              </Segment>
            </Button.Group>
            : ''}

            <Button.Group inverted color='pink' vertical>
              <Segment>
              It is owned by someone?
              <Button as='h4' toggle onClick={this.setPossessiveButton.bind(this,1)} active={this.state.possessiveButton==1}>possessive</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='pink' vertical>
              <Segment>
              Ending Moods
              <Button onClick={this.setMood.bind(this,'relative')} active={this.state.mood=='relative'}>relative</Button>
              <Button onClick={this.setMood.bind(this,'localis')} active={this.state.mood=='localis'}>localis</Button>
              <Button onClick={this.setMood.bind(this,'ablative')} active={this.state.mood=='ablative'}>ablative</Button>
              <Button onClick={this.setMood.bind(this,'terminalis')} active={this.state.mood=='terminalis'}>terminalis</Button>
              <Button onClick={this.setMood.bind(this,'vialis')} active={this.state.mood=='vialis'}>vialis</Button>
              <Button onClick={this.setMood.bind(this,'equalis')} active={this.state.mood=='equalis'}>equalis</Button>
              </Segment>
            </Button.Group>

            </div>
            <Divider />
            <div align="center">
            Postbases:
            </div>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Noun -> Noun Postbases (Adjectival)
                <Button as='h4' toggle key={0} onClick={this.setPostbase.bind(this, 0)} disabled={(this.state.allowable_next_ids.indexOf(0) < 0)} active={this.state.currentPostbases.indexOf(0) >= 0}>{nounPostbases[0].description}</Button>
                <Button as='h4' toggle key={1} onClick={this.setPostbase.bind(this, 1)} disabled={(this.state.allowable_next_ids.indexOf(1) < 1)} active={this.state.currentPostbases.indexOf(1) >= 0}>{nounPostbases[1].description}</Button>
                <Button as='h4' toggle key={2} onClick={this.setPostbase.bind(this, 2)} disabled={(this.state.allowable_next_ids.indexOf(2) < 2)} active={this.state.currentPostbases.indexOf(2) >= 0}>{nounPostbases[2].description}</Button>
                <Button as='h4' toggle key={3} onClick={this.setPostbase.bind(this, 3)} disabled={(this.state.allowable_next_ids.indexOf(3) < 3)} active={this.state.currentPostbases.indexOf(3) >= 0}>{nounPostbases[3].description}</Button>
                <Button as='h4' toggle key={4} onClick={this.setPostbase.bind(this, 4)} disabled={(this.state.allowable_next_ids.indexOf(4) < 4)} active={this.state.currentPostbases.indexOf(4) >= 0}>{nounPostbases[4].description}</Button>
                <Button as='h4' toggle key={5} onClick={this.setPostbase.bind(this, 5)} disabled={(this.state.allowable_next_ids.indexOf(5) < 5)} active={this.state.currentPostbases.indexOf(5) >= 0}>{nounPostbases[5].description}</Button>
                <Button as='h4' toggle key={6} onClick={this.setPostbase.bind(this, 6)} disabled={(this.state.allowable_next_ids.indexOf(6) < 6)} active={this.state.currentPostbases.indexOf(6) >= 0}>{nounPostbases[6].description}</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Noun -> Noun Postbases (Endings)
                <Button as='h4' toggle key={7} onClick={this.setPostbase.bind(this, 7)} disabled={(this.state.allowable_next_ids.indexOf(7) < 7)} active={this.state.currentPostbases.indexOf(7) >= 0}>{nounPostbases[7].description}</Button>
                <Button as='h4' toggle key={8} onClick={this.setPostbase.bind(this, 8)} disabled={(this.state.allowable_next_ids.indexOf(8) < 8)} active={this.state.currentPostbases.indexOf(8) >= 0}>{nounPostbases[8].description}</Button>
                <Button as='h4' toggle key={9} onClick={this.setPostbase.bind(this, 9)} disabled={(this.state.allowable_next_ids.indexOf(9) < 9)} active={this.state.currentPostbases.indexOf(9) >= 0}>{nounPostbases[9].description}</Button>
                <Button as='h4' toggle key={10} onClick={this.setPostbase.bind(this, 10)} disabled={(this.state.allowable_next_ids.indexOf(10) < 10)} active={this.state.currentPostbases.indexOf(10) >= 0}>{nounPostbases[10].description}</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Noun -> Verb Postbases (Endings)
                <Button as='h4' toggle key={11} onClick={this.setPostbase.bind(this, 11)} disabled={(this.state.allowable_next_ids.indexOf(11) < 11)} active={this.state.currentPostbases.indexOf(11) >= 0}>{nounPostbases[11].description}</Button>
                <Button as='h4' toggle key={12} onClick={this.setPostbase.bind(this, 12)} disabled={(this.state.allowable_next_ids.indexOf(12) < 12)} active={this.state.currentPostbases.indexOf(12) >= 0}>{nounPostbases[12].description}</Button>
                <Button as='h4' toggle key={13} onClick={this.setPostbase.bind(this, 13)} disabled={(this.state.allowable_next_ids.indexOf(13) < 13)} active={this.state.currentPostbases.indexOf(13) >= 0}>{nounPostbases[13].description}</Button>
                <Button as='h4' toggle key={14} onClick={this.setPostbase.bind(this, 14)} disabled={(this.state.allowable_next_ids.indexOf(14) < 14)} active={this.state.currentPostbases.indexOf(14) >= 0}>{nounPostbases[14].description}</Button>
                <Button as='h4' toggle key={15} onClick={this.setPostbase.bind(this, 15)} disabled={(this.state.allowable_next_ids.indexOf(15) < 15)} active={this.state.currentPostbases.indexOf(15) >= 0}>{nounPostbases[15].description}</Button>
                <Button as='h4' toggle key={16} onClick={this.setPostbase.bind(this, 16)} disabled={(this.state.allowable_next_ids.indexOf(16) < 16)} active={this.state.currentPostbases.indexOf(16) >= 0}>{nounPostbases[16].description}</Button>
                <Button as='h4' toggle key={17} onClick={this.setPostbase.bind(this, 17)} disabled={(this.state.allowable_next_ids.indexOf(17) < 17)} active={this.state.currentPostbases.indexOf(17) >= 0}>{nounPostbases[17].description}</Button>
                <Button as='h4' toggle key={18} onClick={this.setPostbase.bind(this, 18)} disabled={(this.state.allowable_next_ids.indexOf(18) < 18)} active={this.state.currentPostbases.indexOf(18) >= 0}>{nounPostbases[18].description}</Button>
                <Button as='h4' toggle key={19} onClick={this.setPostbase.bind(this, 19)} disabled={(this.state.allowable_next_ids.indexOf(19) < 19)} active={this.state.currentPostbases.indexOf(19) >= 0}>{nounPostbases[19].description}</Button>
                <Button as='h4' toggle key={20} onClick={this.setPostbase.bind(this, 20)} disabled={(this.state.allowable_next_ids.indexOf(20) < 20)} active={this.state.currentPostbases.indexOf(20) >= 0}>{nounPostbases[20].description}</Button>
                <Button as='h4' toggle key={21} onClick={this.setPostbase.bind(this, 21)} disabled={(this.state.allowable_next_ids.indexOf(21) < 21)} active={this.state.currentPostbases.indexOf(21) >= 0}>{nounPostbases[21].description}</Button>
              </Segment>
            </Button.Group>
          </Container>
          </div>
        );
      }
    };

export default YupikModifyNoun;
