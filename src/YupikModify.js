import React, { Component } from 'react';
import { Segment, Button, Header, Grid, Container, Dropdown } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';
import { Link } from 'react-router-dom';

const options1 = [
  {value: '11(1)', text:'I'},
  {value: '21(1)', text:'You'},
  {value: '31-1(1)', text:'He'},
  {value: '31-2(1)', text:'She'},
  {value: '31-3(1)', text:'It'},
  {value: '12(1)', text:'The two of us'},
  {value: '22(1)', text:'The two of you'},
  {value: '32(1)', text:'The two of them'},
  {value: '13(1)', text:'We all (3+)'},
  {value: '23(1)', text:'You all (3+)'},
  {value: '33(1)', text:'They all (3+)'}
]

const options2 = [
  {value: '11(2)', text:'me'},
  {value: '21(2)', text:'you'},
  {value: '31-1(2)', text:'him'},
  {value: '31-2(2)', text:'her'},
  {value: '31-3(2)', text:'it'},
  {value: '12(2)', text:'the two of us'},
  {value: '22(2)', text:'the two of you'},
  {value: '32(2)', text:'the two of them'},
  {value: '13(2)', text:'us all (3+)'},
  {value: '23(2)', text:'you all (3+)'},
  {value: '33(2)', text:'them all (3+)'}
]

const options3 = [
  {value: '11(3)', text:'my'},
  {value: '21(3)', text:'your'},
  {value: '31-1(3)', text:'his'},
  {value: '31-2(3)', text:'her'},
  {value: '31-3(3)', text:'its'},
  {value: '12(3)', text:'our (two)'},
  {value: '22(3)', text:'your (two)'},
  {value: '32(3)', text:'their (two)'},
  {value: '13(3)', text:'our (3+)'},
  {value: '23(3)', text:'your (3+)'},
  {value: '33(3)', text:'their (3+)'}
]


const postbases = [
  {
    description: 'future tense',
    englishModifier: (english) => { return nlp(english).sentences().toFutureTense().out('text'); },
    expression: '+ciqe\\',
    expression_conditional: '@ciiqe-',  // conditional te_ending
    conditional_rule: 'attaching_to_te',  // defined later and if satisfied display expression_conditional
    group: 'future',
    priority: 4,
    common: true,
    transitive: true,
    intransitive: true,
    tense:true,
  },
  {
    description: 'to love',
    englishModifier: (english) => { return 'love to ' + english; },
    expression: '@~+yunqegg\\',
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
    expression: '@~+yug\\',
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
    expression: '-llru\\',
    group: 'past',
    priority: 5,
    common: true,
    transitive: true,
    intransitive: true,
    tense: true,
  }
];

class YupikModify extends Component {
  constructor(props) {
    super(props);
    console.log("YupikModify props: ", props);

    this.state = {
      usageId: this.props.match.params.usage_id,
      entry: this.props.location.state.entry,
      usage: this.props.location.state.entry.usage[this.props.match.params.usage_id][1],
      people: 1,
      person: 3,
      objectPeople: 1,
      objectPerson: 1,
      value1: "",
      value2: "",
      value3: "",
      possessiveObject: false,
      objectExists: false,
      subjectExists: false,
      tense: 'present',
      text1: "",
      text2: "is hunting",
      mood:"indicative",
      originalText2: "",
      text3: "",
      transitive: true,
      //usage: "[he] is hunting <it>",
      currentPostbases: [],
      modifiedWord: this.props.location.state.word,//props.word.yupik,
      currentWord: this.props.location.state.word,//props.word.yupik,
      currentEnglish: "",//currentVerb,
      modifiedEnglish: "",//props.word.english,//new Inflectors(currentVerb),
    };
    this.processUsage=this.processUsage.bind(this);
    let new_state = this.processUsage(this.state.usage);
    this.state = {...this.state, ...new_state};
    this.modifyWord = this.modifyWord.bind(this);
    this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.currentWord, this.state.currentPostbases);

  }

  componentWillUpdate(newProps, newState) {
    if (newState.people != this.state.people || newState.person != this.state.person || newState.objectPerson != this.state.objectPerson || newState.objectPeople != this.state.objectPeople || newState.mood != this.state.mood) {
      this.modifyWord(newState.person, newState.people, newState.objectPerson, newState.objectPeople, newState.mood, this.state.currentWord, this.state.currentPostbases);
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
      new_state = {...new_state, subjectExists: true};
      new_state = {
        ...new_state,
        value1: "31-1(1)",
        people: 1,
        person: 3,
        text1: res[0] + res[1]
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
          text3: res[2]
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
          text3: res[2]
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
      let newGroup = true;
      currentPostbases.forEach((id) => {
        console.log( postbases[id].group !== postbases[postbase_id].group);
        newGroup = newGroup && postbases[id].group !== postbases[postbase_id].group;
      });
      if (newGroup) {
        currentPostbases.push(postbase_id);
      }

    }
    this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.currentWord, currentPostbases);
  }

  setMood(newMood, event, data) {
    this.setState({ mood: (this.state.mood == newMood) ? 'indicative' : newMood });
  }

  modifyWord(person, people, objectPerson, objectPeople, mood, word, currentPostbases) {
    let indicative_intransitive_endings = {
      1: { // 1st person
        1: '+\'(g/t)u:6a', // I
        2: '+\'(g/t)ukuk', // you
        3: '+\'(g/t)ukut', // he
      },
      2: {
        1: '+\'(g/t)uten', // I
        2: '+\'(g/t)utek', // you
        3: '+\'(g/t)uci', // he
      },
      3: {
        1: '+\'(g/t)uq',
        2: '+\'(g/t)uk',
        3: '+\'(g/t)ut',
      }
    };
    let indicative_transitive_endings = {
      1: {
        1: {
          1: {
            1:'', //not allowed
            2:'',
            3:'',
          },
          2: {
            1:'+\'(g)amken',
            2:'+\'(g)amtek',
            3:'+\'(g)amci',
          },
          3: {
            1:'+\'(g)aqa',
            2:'+\'(g)agka',
            3:'+\'(g)anka',
          },
        },
        2: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'+\'(g)amegten',
            2:'+\'(g)amegtek',
            3:'+\'(g)amegci',
          },
          3: {
            1:'+\'(g)apuk',
            2:'+\'(g)agpuk',
            3:'+\'(g)apuk',
          },
        },
        3: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'+\'(g)amteggen',
            2:'+\'(g)amcetek',
            3:'+\'(g)amceci',
          },
          3: {
            1:'+\'(g)aput',
            2:'+\'(g)agput',
            3:'+\'(g)aput',
          }
        }
      },
      2: {
        1: {
          1: {
            1:'+\'(g)arpenga',
            2:'+\'(g)arpekuk',
            3:'+\'(g)arpekut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+\'(g)an',
            2:'+\'(g)agken',
            3:'+\'(g)aten',
          },
        },
        2: {
          1: {
            1:'+\'(g)arpetegnga',
            2:'+\'(g)arpetegkuk',
            3:'+\'(g)arpetegkut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+\'(g)atek',
            2:'+\'(g)agtek',
            3:'+\'(g)atek',
          },
        },
        3: {
          1: {
            1:'+\'(g)arpecia',
            2:'+\'(g)arpecikuk',
            3:'+\'(g)arpecikut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+\'(g)aci',
            2:'+\'(g)agci',
            3:'+\'(g)aci',
          }
        }
      },
      3: {
        1: {
          1: {
            1:'+\'(g)anga',
            2:'+\'(g)akuk',
            3:'+\'(g)akut',
          },
          2: {
            1:'+\'(g)aten',
            2:'+\'(g)atek',
            3:'+\'(g)aci',
          },
          3: {
            1:'+\'(g)aa',
            2:'+\'(g)ak',
            3:'+\'(g)ai',
          },
        },
        2: {
          1: {
            1:'+\'(g)agnga',
            2:'+\'(g)agkuk',
            3:'+\'(g)agkut',
          },
          2: {
            1:'+\'(g)agten',
            2:'+\'(g)agtek',
            3:'+\'(g)agci',
          },
          3: {
            1:'+\'(g)aak',
            2:'+\'(g)agkek',
            3:'+\'(g)akek',
          },
        },
        3: {
          1: {
            1:'+\'(g)atnga',
            2:'+\'(g)aitkuk',
            3:'+\'(g)aitkut',
          },
          2: {
            1:'+\'(g)atgen',
            2:'+\'(g)aicetek',
            3:'+\'(g)aiceci',
          },
          3: {
            1:'+\'(g)aat',
            2:'+\'(g)agket',
            3:'+\'(g)ait',
          }
        }
      }
    };
    let interrogative_intransitive_endings = {
      1: { // 1st person
        1: '~+(t)sia',
        2: '@~+ceuk',
        3: '@~+ceta',
      },
      2: {
        1: '~+(t)sit',
        2: '@~+cetek',
        3: '@~+ceci',
      },
      3: {
        1: '+\'(g/t)a',
        2: '+\'(g/t)ak',
        3: '+\'(g/t)at',
      }
    };
    let interrogative_transitive_endings = {
      1: {
        1: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'',
            2:'',
            3:'',
          },
        },
        2: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'',
            2:'',
            3:'',
          },
        },
        3: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'',
            2:'',
            3:'',
          }
        }
      },
      2: {
        1: {
          1: {
            1:'~+(t)sia',
            2:'~+(t)sikuk',
            3:'~+(t)sikut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'~+(t)siu',
            2:'~+(t)sikek',
            3:'~+(t)siki',
          },
        },
        2: {
          1: {
            1:'@~+cetegenga',
            2:'@~+cetegkuk',
            3:'@~+cetegkut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'@~+cetegnegu',
            2:'@~+cetegkek',
            3:'@~+cetegki',
          },
        },
        3: {
          1: {
            1:'@~+cecia',
            2:'@~+cecikuk',
            3:'@~+cecikut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'@~+ceciu',
            2:'@~+cecikek',
            3:'@~+ceciki',
          }
        }
      },
      3: {
        1: {
          1: {
            1:'+\'(g/t)anga',
            2:'+\'(g/t)akuk',
            3:'+\'(g/t)akut',
          },
          2: {
            1:'+\'(g/t)aten',
            2:'+\'(g/t)atek',
            3:'+\'(g/t)aci',
          },
          3: {
            1:'+\'(g/t)a:gu',
            2:'+\'(g/t)akek',
            3:'+\'(g/t)aki',
          },
        },
        2: {
          1: {
            1:'+\'(g/t)agnga',
            2:'+\'(g/t)agkuk',
            3:'+\'(g/t)agkut',
          },
          2: {
            1:'+\'(g/t)agten',
            2:'+\'(g/t)agtek',
            3:'+\'(g/t)agci',
          },
          3: {
            1:'+\'(g/t)agnegu',
            2:'+\'(g/t)agkek',
            3:'+\'(g/t)agki',
          },
        },
        3: {
          1: {
            1:'+\'(g/t)atnga',
            2:'+\'(g/t)atkuk',
            3:'+\'(g/t)atkut',
          },
          2: {
            1:'+\'(g/t)atgen',
            2:'+\'(g/t)acetek',
            3:'+\'(g/t)aceci',
          },
          3: {
            1:'+\'(g/t)atgu',
            2:'+\'(g/t)atkek',
            3:'+\'(g/t)atki',
          }
        }
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
      // });

      let newText2 = this.state.originalText2
      console.log(currentPostbases)
      if (currentPostbases.length>0) {
        newText2 = nlp(this.state.originalText2).sentences().toFutureTense().out() //change to future tense first so that word attachment looks good
        let adder = ''
        currentPostbases.forEach((p) => {
          if (!postbases[p].tense) {
            adder = postbases[p].englishModifier(adder);
          }
        })
        newText2 = newText2.replace("will","will "+adder) //replace 'will' hunt with 'will try to' hunt or 'will want to' hunt, etc.
        if (this.state.tense == 'present'){
          newText2 = nlp(newText2).sentences().toPresentTense().out()
        } else if (this.state.tense == 'past'){
          newText2 = nlp(newText2).sentences().toPastTense().out()
        } else {
          newText2 = nlp(newText2).sentences().toFutureTense().out()
        }
        currentPostbases.forEach((p) => {
          if (postbases[p].tense) {
            newText2 = postbases[p].englishModifier(newText2);
          }
        })
      }


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
      console.log(this.state.mood)
      if (mood == 'indicative') {
        if (this.state.objectExists) {
          postbasesList = currentPostbases.map((p) => {
          return postbases[p].expression;
        }).concat([indicative_transitive_endings[person][people][objectPerson][objectPeople]]);
        } else {
          postbasesList = currentPostbases.map((p) => {
          return postbases[p].expression;
        }).concat([indicative_intransitive_endings[person][people]]);
        }
      } else if (mood == 'interrogative') {
        if (this.state.objectExists) {
          postbasesList = currentPostbases.map((p) => {
          return postbases[p].expression;
        }).concat([interrogative_transitive_endings[person][people][objectPerson][objectPeople]]);
        } else {
          postbasesList = currentPostbases.map((p) => {
          return postbases[p].expression;
        }).concat([interrogative_intransitive_endings[person][people]]);
        }
      }


      let postbasesString = "";
      postbasesList.forEach((e) => {
        postbasesString = postbasesString + "&postbase=" + encodeURIComponent(e);
      });
      console.log(postbasesString)

      axios
        .get(API_URL + "/concat?root=" + word.replace('-', '') + postbasesString)
        .then(response => {
          this.setState({ modifiedWord: response.data.concat, modifiedEnglish: newEnglish, currentPostbases: currentPostbases, text2: newText2});
        });
    }


      render() {
        console.log("YupikModify state: ", this.state);
        const{value1}=this.state
        const{value2}=this.state
        const{value3}=this.state
        return (
          <Container>
            <Header dividing>Modify Word</Header>

            <Button onClick={() => {this.props.history.goBack()}}>Back</Button>

            <Grid columns={3}>
              <Grid.Column />
              <Grid.Column verticalAlign='middle' align='center'>
                <Header textAlign='center' as='h1'>
                {this.state.modifiedWord}
                </Header>
              </Grid.Column>
            </Grid>

            <Grid columns={1}>
              <Grid.Column verticalAlign='middle' align='center'>
                <span as='h4' align='center'>
                  {this.state.text1}
                  {' '}
                  <Dropdown inline options={options1} onChange={this.setValue1.bind(this)} value={value1} />
                  {' '}
                  {this.state.text2}
                  {' '}
                  <Dropdown inline options={options2} onChange={this.setValue2.bind(this)} value={value2} />
                  {' '}
                  {this.state.text3}
                </span>
              </Grid.Column>
              <Grid.Row/>
            </Grid>

            <div align="center">
            {postbases.map((postbase, id) => {
              return (
                <Button as='h4' toggle key={id} onClick={this.setPostbase.bind(this, id)} active={this.state.currentPostbases.indexOf(id) >= 0}>{postbase.description}</Button>
              );
            })}
            <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative')} active={this.state.mood=='interrogative'}>interrogative</Button>
            </div>

          </Container>
        );
      }
    };


export default YupikModify;
