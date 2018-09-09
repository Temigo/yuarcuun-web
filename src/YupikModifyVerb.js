import React, { Component } from 'react';
import { Segment, Button, Header, Grid, Container, Dropdown, Divider, Label } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from './App.js';
import { Link } from 'react-router-dom';
import { options1, options2, options3, postbases } from './constants.js';

class YupikModifyVerb extends Component {
  constructor(props) {
    super(props);
    console.log("YupikModifyVerb props: ", props);

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
      id1: "",
      value1_text: "he",
      value2_text: "it",
      value3_text: "",
      completeSentence: "",
      allowable_next_ids: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
      possessiveObject: false,
      objectExists: false,
      subjectExists: false,
      enclitic: '',
      nounEnding: '',
      encliticExpression: '',
      tense: 'present',
      text1: "",
      text2: "",
      mood:"indicative",
      moodSpecific:"indicative",
      originalText2: "",
      text3: "",
      transitive: true,
      postbasesList: [],
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
    if (this.state.objectExists) {
      this.state.postbasesList = ["+'(g)aa"]
    } else {
      this.state.postbasesList = ["+'(g/t)uq"]
    }
    this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.mood, this.state.moodSpecific, this.state.nounEnding, this.state.currentWord, this.state.currentPostbases);

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

  // expression_conditional_func(p, base, event, data) {
  //   if (postbases[p].conditional_rule == 'attaching_to_te') {
  //     if (base.slice(base.length-3,base.length-1)=='te') {
  //       return postbases[p].expression_conditional;
  //     } else {
  //       return postbases[p].expression;
  //     }
  //   } else {
  //     return postbases[p].expression;
  //   };
  // }

  modifyWord(person, people, objectPerson, objectPeople, mood, moodSpecific, nounEnding, word, currentPostbases) {
    let nounEndings = {
      'the one who is': '-lria',
      'device for': '+cuun',
      'one that customarily/capably': '-tuli',
      'way of/how to': '@~+yaraq',
      'one who is good at': '@~-yuli',
      'act or state of': '-lleq '
    };
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
            1:'+\'(g)amte4en',
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
        2: '@~+ce8uk',
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
    let optative_intransitive_endings = {
      1: { // 1st person
        1: '@~+lii', //if te ending, tl becomes ll
        2: '@~+luk', //if te ending, tl becomes ll
        3: '-lta', // also %(e)lta
      },
      2: {
        1: '$', // ending in a, i, u, do nothing. ending in two vowels or e, (g)i. ending in te, ending is n. consonant ending, end is :a. special te, ending is lu.
        2: '@+tek',//drops te from bases
        3: '@+ci',
      },
      3: {
        1: '@~+li', //if te ending, tl becomes ll
        2: '@~+lik', //if te ending, tl becomes ll
        3: '@~+lit', //if te ending, tl becomes ll
      }
    };
    let optative_transitive_endings = {
      1: {
        1: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'@~+lamken',
            2:'@~+lamtek',
            3:'@~+lamci',
          },
          3: {
            1:'@~+laku',
            2:'@~+lakek',
            3:'@~+laki',
          },
        },
        2: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'@~+lamegten',
            2:'@~+lamegtek',
            3:'@~+lamegci',
          },
          3: {
            1:'@+lauk',
            2:'@+lagpuk',
            3:'@+lapuk',
          },
        },
        3: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'@~+lamte4en',
            2:'@~+lamcetek',
            3:'@~+lamceci',
          },
          3: {
            1:'@+laut',
            2:'@+lagput',
            3:'@+laput',
          }
        }
      },
      2: {
        1: {
          1: {
            1:'@+:(6)a',
            2:'@+kuk',
            3:'@+kut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'&',
            2:'@+kek',
            3:'@+ki',
          },
        },
        2: {
          1: {
            1:'@+tegnga',
            2:'@+tegkuk',
            3:'@+tegkut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'@+tegu',
            2:'@+tegkek',
            3:'@+tegki',
          },
        },
        3: {
          1: {
            1:'@+cia',
            2:'@+cikuk',
            3:'@+cikut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'@+ciu',
            2:'@+ciki',
            3:'@+cikek',
          }
        }
      },
      3: {
        1: {
          1: {
            1:'@~+linga',
            2:'@~+likuk',
            3:'@~+likut',
          },
          2: {
            1:'@~+liten',
            2:'@~+litek',
            3:'@~+lici',
          },
          3: {
            1:'@~+liku',
            2:'@~+likek',
            3:'@~+liki',
          },
        },
        2: {
          1: {
            1:'@~+lignga',
            2:'@~+ligkuk',
            3:'@~+ligkut',
          },
          2: {
            1:'@~+ligten',
            2:'@~+ligtek',
            3:'@~+ligci',
          },
          3: {
            1:'@~+ligtegu',
            2:'@~+ligtegkek',
            3:'@~+ligtegki',
          },
        },
        3: {
          1: {
            1:'@~+litnga',
            2:'@~+litkuk',
            3:'@~+litkut',
          },
          2: {
            1:'@~+litgen',
            2:'@~+licetek',
            3:'@~+liceci',
          },
          3: {
            1:'@~+lignegu',
            2:'@~+ligkek',
            3:'@~+ligki',
          }
        }
      }
    };
    let subordinative_intransitive_endings = {
      1: {
        1: '@~+lua',
        2: '@~+lunuk',
        3: '@~+luta',
      },
      2: {
        1: '@~+luten',
        2: '@~+lutek',
        3: '@~+luci',
      },
      4: {
        1: '@~+luni',
        2: '@~+lutek',
        3: '@~+luteng',
      }
    };
    let subordinative_transitive_endings = {
      1: {
        1: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'@~+luten',
            2:'@~+lutek',
            3:'@~+luci',
          },
          3: {
            1:'@~+luku',
            2:'@~+lukek',
            3:'@~+luki',
          },
        },
        2: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'@~+luten',
            2:'@~+lutek',
            3:'@~+luci',
          },
          3: {
            1:'@~+luku',
            2:'@~+lukek',
            3:'@~+luki',
          },
        },
        4: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'@~+luten',
            2:'@~+lutek',
            3:'@~+luci',
          },
          3: {
            1:'@~+luku',
            2:'@~+lukek',
            3:'@~+luki',
          }
        }
      },
      2: {
        1: {
          1: {
            1:'@~+lua',
            2:'@~+lunuk',
            3:'@~+luta',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'@~+luku',
            2:'@~+lukek',
            3:'@~+luki',
          },
        },
        2: {
          1: {
            1:'@~+lua',
            2:'@~+lunuk',
            3:'@~+luta',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'@~+luku',
            2:'@~+lukek',
            3:'@~+luki',
          },
        },
        4: {
          1: {
            1:'@~+lua',
            2:'@~+lunuk',
            3:'@~+luta',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'@~+luku',
            2:'@~+lukek',
            3:'@~+luki',
          }
        }
      },
      4: {
        1: {
          1: {
            1:'@~+lua',
            2:'@~+lunuk',
            3:'@~+luta',
          },
          2: {
            1:'@~+luten',
            2:'@~+lutek',
            3:'@~+luci',
          },
          3: {
            1:'@~+luku',
            2:'@~+lukek',
            3:'@~+luki',
          },
        },
        2: {
          1: {
            1:'@~+lua',
            2:'@~+lunuk',
            3:'@~+luta',
          },
          2: {
            1:'@~+luten',
            2:'@~+lutek',
            3:'@~+luci',
          },
          3: {
            1:'@~+luku',
            2:'@~+lukek',
            3:'@~+luki',
          },
        },
        4: {
          1: {
            1:'@~+lua',
            2:'@~+lunuk',
            3:'@~+luta',
          },
          2: {
            1:'@~+luten',
            2:'@~+lutek',
            3:'@~+luci',
          },//
          3: {
            1:'@~+luku',
            2:'@~+lukek',
            3:'@~+luki',
          }
        }
      }
    };
    let connective_intransitive_endings = {
      1: {
        1: '+ma',
        2: '-megnuk',
        3: '-mta',
      },
      2: {
        1: '+(t)vet',
        2: '+(t)vtek',
        3: '+(t)vci',
      },
      3: {
        1: ':an',
        2: ':agnek',
        3: ':ata',
      },
      4: {
        1: '+mi',
        2: '+mek',
        3: '+meng',
      }
    };
    let connective_transitive_endings = {
      1: {
        1: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-mken',
            2:'-mtek',
            3:'-mci',
          },
          3: {
            1:'-mku',
            2:'-mkek',
            3:'-mki',
          },
          4: {
            1:'-mni',
            2:'-mtek',
            3:'-mteng',
          },
        },
        2: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-megten',
            2:'-megtek',
            3:'-megci',
          },
          3: {
            1:'-megnegu',
            2:'-megkek',
            3:'-megki',
          },
          4: {
            1:'-megni',
            2:'-megtek',
            3:'-megteng',
          },
        },
        3: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-mte4en',
            2:'-mcetek',
            3:'-mceci',
          },
          3: {
            1:'-mte4u',
            2:'-mtekek',
            3:'-mteki',
          },
          4: {
            1:'-mteni',
            2:'-mcetek',
            3:'-mceteng',
          },
        }
      },
      2: {
        1: {
          1: {
            1:'+(t)vnga',
            2:'+(t)vkuk',
            3:'+(t)vkut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vgu',
            2:'+(t)vkek',
            3:'+(t)vki',
          },
          4: {
            1:'+(t)vni',
            2:'+(t)vtek',
            3:'+(t)vteng',
          },
        },
        2: {
          1: {
            1:'+(t)vtegnga',
            2:'+(t)vtegkuk',
            3:'+(t)vtegkut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vtegni',
            2:'+(t)vtegtek',
            3:'+(t)vtegteng',
          },
          4: {
            1:'+(t)vtegu',
            2:'+(t)vtegkek',
            3:'+(t)vtegki',
          },
        },
        3: {
          1: {
            1:'+(t)vcia',
            2:'+(t)vcikuk',
            3:'+(t)vcikut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vciu',
            2:'+(t)vcikek',
            3:'+(t)vciki',
          },
          4: {
            1:'+(t)vce8i',
            2:'+(t)vcetek',
            3:'+(t)vceteng',
          }
        }
      },
      3: {
        1: {
          1: {
            1:':anga',
            2:':akuk',
            3:':akut',
          },
          2: {
            1:':aten',
            2:':atek',
            3:':aci',
          },
          3: {
            1:':aku',
            2:':akek',
            3:':aki',
          },
          4: {
            1:':ani',
            2:':atek',
            3:':ateng',
          },
        },
        2: {
          1: {
            1:':agnga',
            2:':agkuk',
            3:':agkut',
          },
          2: {
            1:':agten',
            2:':agtek',
            3:':agci',
          },
          3: {
            1:':agku',
            2:':agkek',
            3:':agki',
          },
          4: {
            1:':agni',
            2:':agtek',
            3:':agteng',
          },
        },
        3: {
          1: {
            1:':atnga',
            2:':atkuk',
            3:':atkut',
          },
          2: {
            1:':atgen',
            2:':acetek',
            3:':aceci',
          },
          3: {
            1:':atgu',
            2:':atkek',
            3:':atki',
          },
          4: {
            1:':atni',
            2:':acetek',
            3:':aceteng',
          },
        }
      },
      4: {
        1: {
          1: {
            1:'+mia',
            2:'+mikuk',
            3:'+mikut',
          },
          2: {
            1:'+miten',
            2:'+mitek',
            3:'+mici',
          },
          3: {
            1:'+miu',
            2:'+mikek',
            3:'+miki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          },
        },
        2: {
          1: {
            1:'+megnenga',
            2:'+megnekuk',
            3:'+megnekut',
          },
          2: {
            1:'+megnegen',
            2:'+megnetek',
            3:'+megneci',
          },
          3: {
            1:'+megnegu',
            2:'+megnekek',
            3:'+megneki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          },
        },
        3: {
          1: {
            1:'+megtenga',
            2:'+megtekuk',
            3:'+megtekut',
          },
          2: {
            1:'+megte4en',
            2:'+megcetek',
            3:'+megneci',
          },
          3: {
            1:'+megte4u',
            2:'+megtekek',
            3:'+megteki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          }
        }
      }
    };
    let connective_consonantEnd_intransitive_endings = {
      1: {
        1: '+ma',
        2: '-megnuk',
        3: '-mta',
      },
      2: {
        1: '+(t)vet',
        2: '+(t)vetek',
        3: '+(t)veci',
      },
      3: {
        1: ':an',
        2: ':agnek',
        3: ':ata',
      },
      4: {
        1: '+mi',
        2: '+mek',
        3: '+meng',
      }
    };
    let connective_consonantEnd_transitive_endings = {
      1: {
        1: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-mken',
            2:'-mtek',
            3:'-mci',
          },
          3: {
            1:'-mku',
            2:'-mkek',
            3:'-mki',
          },
          4: {
            1:'-mni',
            2:'-mtek',
            3:'-mteng',
          },
        },
        2: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-megten',
            2:'-megtek',
            3:'-megci',
          },
          3: {
            1:'-megnegu',
            2:'-megkek',
            3:'-megki',
          },
          4: {
            1:'-megni',
            2:'-megtek',
            3:'-megteng',
          },
        },
        3: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-mte4en',
            2:'-mcetek',
            3:'-mceci',
          },
          3: {
            1:'-mte4u',
            2:'-mtekek',
            3:'-mteki',
          },
          4: {
            1:'-mteni',
            2:'-mcetek',
            3:'-mceteng',
          },
        }
      },
      2: {
        1: {
          1: {
            1:'+(t)venga',
            2:'+(t)vekuk',
            3:'+(t)vekut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vegu',
            2:'+(t)vekek',
            3:'+(t)veki',
          },
          4: {
            1:'+(t)veni',
            2:'+(t)vetek',
            3:'+(t)veteng',
          },
        },
        2: {
          1: {
            1:'+(t)vetegnga',
            2:'+(t)vetegkuk',
            3:'+(t)vetegkut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vetegni',
            2:'+(t)vetegtek',
            3:'+(t)vetegteng',
          },
          4: {
            1:'+(t)vetgu',
            2:'+(t)vetegkek',
            3:'+(t)vetegki',
          },
        },
        3: {
          1: {
            1:'+(t)vecia',
            2:'+(t)vecikuk',
            3:'+(t)vecikut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)veciu',
            2:'+(t)vecikek',
            3:'+(t)veciki',
          },
          4: {
            1:'+(t)vece8i',
            2:'+(t)vecetek',
            3:'+(t)veceteng',
          }
        }
      },
      3: {
        1: {
          1: {
            1:':anga',
            2:':akuk',
            3:':akut',
          },
          2: {
            1:':aten',
            2:':atek',
            3:':aci',
          },
          3: {
            1:':aku',
            2:':akek',
            3:':aki',
          },
          4: {
            1:':ani',
            2:':atek',
            3:':ateng',
          },
        },
        2: {
          1: {
            1:':agnga',
            2:':agkuk',
            3:':agkut',
          },
          2: {
            1:':agten',
            2:':agtek',
            3:':agci',
          },
          3: {
            1:':agku',
            2:':agkek',
            3:':agki',
          },
          4: {
            1:':agni',
            2:':agtek',
            3:':agteng',
          },
        },
        3: {
          1: {
            1:':atnga',
            2:':atkuk',
            3:':atkut',
          },
          2: {
            1:':atgen',
            2:':acetek',
            3:':aceci',
          },
          3: {
            1:':atgu',
            2:':atkek',
            3:':atki',
          },
          4: {
            1:':atni',
            2:':acetek',
            3:':aceteng',
          },
        }
      },
      4: {
        1: {
          1: {
            1:'+mia',
            2:'+mikuk',
            3:'+mikut',
          },
          2: {
            1:'+miten',
            2:'+mitek',
            3:'+mici',
          },
          3: {
            1:'+miu',
            2:'+mikek',
            3:'+miki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          },
        },
        2: {
          1: {
            1:'+megnenga',
            2:'+megnekuk',
            3:'+megnekut',
          },
          2: {
            1:'+megnegen',
            2:'+megnetek',
            3:'+megneci',
          },
          3: {
            1:'+megnegu',
            2:'+megnekek',
            3:'+megneki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          },
        },
        3: {
          1: {
            1:'+megtenga',
            2:'+megtekuk',
            3:'+megtekut',
          },
          2: {
            1:'+megte4en',
            2:'+megcetek',
            3:'+megneci',
          },
          3: {
            1:'+megte4u',
            2:'+megtekek',
            3:'+megteki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          }
        }
      }
    };
    let connective_contemporative_intransitive_endings = {
      1: {
        1: '-mni',
        2: '-megni',
        3: '-mte8i',
      },
      2: {
        1: '+(t)veni',
        2: '+(t)vetegni',
        3: '+(t)vece8i',
      },
      3: {
        1: ':ani',
        2: ':agni',
        3: ':atni',
      },
      4: {
        1: '+mini',
        2: '+megni',
        3: '+me4ni',
      }
    };
    let connective_contemporative_transitive_endings = {
      1: {
        1: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-mken',
            2:'-mtek',
            3:'-mci',
          },
          3: {
            1:'-mku',
            2:'-mkek',
            3:'-mki',
          },
          4: {
            1:'-mni',
            2:'-mtek',
            3:'-mteng',
          },
        },
        2: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-megten',
            2:'-megtek',
            3:'-megci',
          },
          3: {
            1:'-megnegu',
            2:'-megkek',
            3:'-megki',
          },
          4: {
            1:'-megni',
            2:'-megtek',
            3:'-megteng',
          },
        },
        3: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-mte4en',
            2:'-mcetek',
            3:'-mceci',
          },
          3: {
            1:'-mte4u',
            2:'-mtekek',
            3:'-mteki',
          },
          4: {
            1:'-mteni',
            2:'-mcetek',
            3:'-mceteng',
          },
        }
      },
      2: {
        1: {
          1: {
            1:'+(t)venga',
            2:'+(t)vekuk',
            3:'+(t)vekut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vegu',
            2:'+(t)vekek',
            3:'+(t)veki',
          },
          4: {
            1:'+(t)veni',
            2:'+(t)vetek',
            3:'+(t)veteng',
          },
        },
        2: {
          1: {
            1:'+(t)vetegnga',
            2:'+(t)vetegkuk',
            3:'+(t)vetegkut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vetegni',
            2:'+(t)vetegtek',
            3:'+(t)vetegteng',
          },
          4: {
            1:'+(t)vetgu',
            2:'+(t)vetegkek',
            3:'+(t)vetegki',
          },
        },
        3: {
          1: {
            1:'+(t)vecia',
            2:'+(t)vecikuk',
            3:'+(t)vecikut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)veciu',
            2:'+(t)vecikek',
            3:'+(t)veciki',
          },
          4: {
            1:'+(t)vece8i',
            2:'+(t)vecetek',
            3:'+(t)veceteng',
          }
        }
      },
      3: {
        1: {
          1: {
            1:':anga',
            2:':akuk',
            3:':akut',
          },
          2: {
            1:':aten',
            2:':atek',
            3:':aci',
          },
          3: {
            1:':aku',
            2:':akek',
            3:':aki',
          },
          4: {
            1:':ani',
            2:':atek',
            3:':ateng',
          },
        },
        2: {
          1: {
            1:':agnga',
            2:':agkuk',
            3:':agkut',
          },
          2: {
            1:':agten',
            2:':agtek',
            3:':agci',
          },
          3: {
            1:':agku',
            2:':agkek',
            3:':agki',
          },
          4: {
            1:':agni',
            2:':agtek',
            3:':agteng',
          },
        },
        3: {
          1: {
            1:':atnga',
            2:':atkuk',
            3:':atkut',
          },
          2: {
            1:':atgen',
            2:':acetek',
            3:':aceci',
          },
          3: {
            1:':atgu',
            2:':atkek',
            3:':atki',
          },
          4: {
            1:':atni',
            2:':acetek',
            3:':aceteng',
          },
        }
      },
      4: {
        1: {
          1: {
            1:'+minia',
            2:'+minikuk',
            3:'+minikut',
          },
          2: {
            1:'+miniten',
            2:'+minitek',
            3:'+minici',
          },
          3: {
            1:'+miniu',
            2:'+minikek',
            3:'+miniki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          },
        },
        2: {
          1: {
            1:'+minegnenga',
            2:'+minegnekuk',
            3:'+minegnekut',
          },
          2: {
            1:'+minegnegen',
            2:'+minegnetek',
            3:'+minegneci',
          },
          3: {
            1:'+minegnegu',
            2:'+minegnekek',
            3:'+minegneki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          },
        },
        3: {
          1: {
            1:'+minegtenga',
            2:'+minegtekuk',
            3:'+minegtekut',
          },
          2: {
            1:'+minegte4en',
            2:'+minegcetek',
            3:'+minegneci',
          },
          3: {
            1:'+minegte4u',
            2:'+minegtekek',
            3:'+minegteki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          }
        }
      }
    };
    let connective_conditional_intransitive_endings = {
      1: {
        1: '+ma',
        2: '-megnuk',
        3: '-mta',
      },
      2: {
        1: '+(t)vet',
        2: '+(t)vtek',
        3: '+(t)vci',
      },
      3: {
        1: ':an',
        2: ':agnek',
        3: ':ata',
      },
      4: {
        1: '+mi',
        2: '+mek',
        3: '+meng',
      }
    };
    let connective_conditional_transitive_endings = {
      1: {
        1: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-mken',
            2:'-mtek',
            3:'-mci',
          },
          3: {
            1:'-mku',
            2:'-mkek',
            3:'-mki',
          },
          4: {
            1:'-mni',
            2:'-mtek',
            3:'-mteng',
          },
        },
        2: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-megten',
            2:'-megtek',
            3:'-megci',
          },
          3: {
            1:'-megnegu',
            2:'-megkek',
            3:'-megki',
          },
          4: {
            1:'-megni',
            2:'-megtek',
            3:'-megteng',
          },
        },
        3: {
          1: {
            1:'',
            2:'',
            3:'',
          },
          2: {
            1:'-mte4en',
            2:'-mcetek',
            3:'-mceci',
          },
          3: {
            1:'-mte4u',
            2:'-mtekek',
            3:'-mteki',
          },
          4: {
            1:'-mteni',
            2:'-mcetek',
            3:'-mceteng',
          },
        }
      },
      2: {
        1: {
          1: {
            1:'+(t)vnga',
            2:'+(t)vkuk',
            3:'+(t)vkut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vgu',
            2:'+(t)vkek',
            3:'+(t)vki',
          },
          4: {
            1:'+(t)vni',
            2:'+(t)vtek',
            3:'+(t)vteng',
          },
        },
        2: {
          1: {
            1:'+(t)vtegnga',
            2:'+(t)vtegkuk',
            3:'+(t)vtegkut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vtegni',
            2:'+(t)vtegtek',
            3:'+(t)vtegteng',
          },
          4: {
            1:'+(t)vtegu',
            2:'+(t)vtegkek',
            3:'+(t)vtegki',
          },
        },
        3: {
          1: {
            1:'+(t)vcia',
            2:'+(t)vcikuk',
            3:'+(t)vcikut',
          },
          2: {
            1:'',
            2:'',
            3:'',
          },
          3: {
            1:'+(t)vciu',
            2:'+(t)vcikek',
            3:'+(t)vciki',
          },
          4: {
            1:'+(t)vce8i',
            2:'+(t)vcetek',
            3:'+(t)vceteng',
          }
        }
      },
      3: {
        1: {
          1: {
            1:':anga',
            2:':akuk',
            3:':akut',
          },
          2: {
            1:':aten',
            2:':atek',
            3:':aci',
          },
          3: {
            1:':aku',
            2:':akek',
            3:':aki',
          },
          4: {
            1:':ani',
            2:':atek',
            3:':ateng',
          },
        },
        2: {
          1: {
            1:':agnga',
            2:':agkuk',
            3:':agkut',
          },
          2: {
            1:':agten',
            2:':agtek',
            3:':agci',
          },
          3: {
            1:':agku',
            2:':agkek',
            3:':agki',
          },
          4: {
            1:':agni',
            2:':agtek',
            3:':agteng',
          },
        },
        3: {
          1: {
            1:':atnga',
            2:':atkuk',
            3:':atkut',
          },
          2: {
            1:':atgen',
            2:':acetek',
            3:':aceci',
          },
          3: {
            1:':atgu',
            2:':atkek',
            3:':atki',
          },
          4: {
            1:':atni',
            2:':acetek',
            3:':aceteng',
          },
        }
      },
      4: {
        1: {
          1: {
            1:'+nia',
            2:'+nikuk',
            3:'+nikut',
          },
          2: {
            1:'+niten',
            2:'+nitek',
            3:'+nici',
          },
          3: {
            1:'+niu',
            2:'+nikek',
            3:'+niki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          },
        },
        2: {
          1: {
            1:'+negnenga',
            2:'+negnekuk',
            3:'+negnekut',
          },
          2: {
            1:'+negnegen',
            2:'+negnetek',
            3:'+negneci',
          },
          3: {
            1:'+negnegu',
            2:'+negnekek',
            3:'+negneki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          },
        },
        3: {
          1: {
            1:'+negtenga',
            2:'+negtekuk',
            3:'+negtekut',
          },
          2: {
            1:'+negte4en',
            2:'+negcetek',
            3:'+negneci',
          },
          3: {
            1:'+negte4u',
            2:'+negtekek',
            3:'+negteki',
          },
          4: {
            1:'',
            2:'',
            3:'',
          }
        }
      }
    };
    // currentPostbases = currentPostbases.sort((p1, p2) => {
    //   return (postbases[p1].priority > postbases[p2].priority) ? 1 : ((postbases[p1].priority < postbases[p2].priority) ? -1 : 0);
    // });
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
    // });
    let newText1 = ''
    let newText2 = this.state.originalText2
    if (nounEnding != '') {
      newText2 = nounEnding + ' (' + newText2 + ') '
    } else {
      console.log(newText2)
      if (currentPostbases.length>0) {
        newText2 = nlp(this.state.originalText2).sentences().toFutureTense().out() //change to future tense first so that word attachment looks good
        let adder = ''
        currentPostbases.forEach((p) => {
          if (!postbases[p].tense) {
            adder = postbases[p].englishModifier(adder);
          }
        })
        newText2 = newText2.replace("will"," will "+adder+" ") //replace 'will' hunt with 'will try to' hunt or 'will want to' hunt, etc.

        // if (this.state.tense == 'present'){
           newText2 = nlp(newText2).sentences().toPresentTense().out()
        // } else if (this.state.tense == 'past'){
        //   newText2 = nlp(newText2).sentences().toPastTense().out()
        // } else {
        //   newText2 = nlp(newText2).sentences().toFutureTense().out()
        // }
        console.log(newText2)
        currentPostbases.forEach((p) => {
          if (postbases[p].tense) {
            newText2 = postbases[p].englishModifier(newText2);
          }
        })
      }
      console.log(moodSpecific[0])
      if (mood[0]=='c' || mood =='interrogative') {
        newText1 = moodSpecific+' '
      } else {
        newText1 = ''
      }
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
    let base = '';
    if (currentPostbases.length == 1 || currentPostbases.length == 0) {
      base = word
    } else {
      base = postbases[currentPostbases[0]].expression
    }

    if (nounEnding != '') {
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
      postbasesList = postbasesList.concat([nounEndings[nounEnding]]);
    } else {
    if (this.state.objectExists) {
      if (mood == 'indicative') {
        postbasesList = currentPostbases.map((p) => {
          // let k = this.expression_conditional_func.bind(this, p, bases) GET SOME HELP ON THIS
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
        postbasesList = postbasesList.concat([indicative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'interrogative') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat([interrogative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'subordinative') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat([subordinative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_precessive') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~+(t)vaileg\\'])
        postbasesList = postbasesList.concat([connective_consonantEnd_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_consequential') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~:(6)a\\'])
        postbasesList = postbasesList.concat([connective_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_contingent') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['+\'(g)aqa\\'])
        postbasesList = postbasesList.concat([connective_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_concessive') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        if (person == 2 || person == 1) {
          postbasesList = postbasesList.concat(['@-6rar\\'])
        } else {
          postbasesList = postbasesList.concat(['@-6r\\'])
        }
        postbasesList = postbasesList.concat([connective_consonantEnd_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_conditional') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~-ku-\\'])
        postbasesList = postbasesList.concat([connective_conditional_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_first_contemporative') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['-ller\\'])
        postbasesList = postbasesList.concat([connective_contemporative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (mood == 'connective_second_contemporative') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@:(6)inaner\\'])
        postbasesList = postbasesList.concat([connective_contemporative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'do!') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'do (in the future)!') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~-ki\\'])
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'You, stop!') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~+(t)viiqna\\'])
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      } else if (moodSpecific == 'You, do not!') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        if (person == 2) {
          postbasesList = postbasesList.concat(['@~+yaquna\\'])
        } else {
          postbasesList = postbasesList.concat(['-nrilki\\'])
        }
        postbasesList = postbasesList.concat([optative_transitive_endings[person][people][objectPerson][objectPeople]]);
      }
    } else {
      if (mood == 'indicative') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        ;
      })
        postbasesList = postbasesList.concat([indicative_intransitive_endings[person][people]]);
    } else if (mood == 'interrogative') {
        postbasesList = currentPostbases.map((p) => {
        if (postbases[p].conditional_rule == 'attaching_to_te') {
          if (base.slice(base.length-3,base.length-1)=='te') {
            return postbases[p].expression_conditional
          } else {
            return postbases[p].expression
          }
        } else {
          return postbases[p].expression
        }
      })
        postbasesList = postbasesList.concat([interrogative_intransitive_endings[person][people]]);
    } else if (mood == 'subordinative') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat([subordinative_intransitive_endings[person][people]]);
      } else if (mood == 'connective_precessive') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~+(t)vaileg\\'])
        postbasesList = postbasesList.concat([connective_consonantEnd_intransitive_endings[person][people]]);
      } else if (mood == 'connective_consequential') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~:(6)a\\'])
        postbasesList = postbasesList.concat([connective_intransitive_endings[person][people]]);
      } else if (mood == 'connective_contingent') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['+\'(g)aqa\\'])
        postbasesList = postbasesList.concat([connective_intransitive_endings[person][people]]);
      } else if (mood == 'connective_concessive') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        if (person == 2 || (person == 1 && people != 1)) {
          postbasesList = postbasesList.concat(['@-6rar\\'])
        } else {
          postbasesList = postbasesList.concat(['@-6r\\'])
        }
        postbasesList = postbasesList.concat([connective_consonantEnd_intransitive_endings[person][people]]);
      } else if (mood == 'connective_conditional') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~-ku\\'])
        postbasesList = postbasesList.concat([connective_conditional_intransitive_endings[person][people]]);
      } else if (mood == 'connective_first_contemporative') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['-ller\\'])
        postbasesList = postbasesList.concat([connective_contemporative_intransitive_endings[person][people]]);
      } else if (mood == 'connective_second_contemporative') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@:(6)inaner\\'])
        postbasesList = postbasesList.concat([connective_contemporative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'do!') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'do (in the future)!') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~-ki\\'])
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'You, stop!') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
        postbasesList = postbasesList.concat(['@~+(t)viiqna\\'])
        postbasesList = postbasesList.concat([optative_intransitive_endings[person][people]]);
      } else if (moodSpecific == 'You, do not!') {
        postbasesList = currentPostbases.map((p) => {
          if (postbases[p].conditional_rule == 'attaching_to_te') {
            if (base.slice(base.length-3,base.length-1)=='te') {
              return postbases[p].expression_conditional
            } else {
              return postbases[p].expression
            }
          } else {
            return postbases[p].expression
          }
        })
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
      newText2 = nlp(newText2).sentences().toPastTense().out()
    } else if (moodSpecific=='when will (future)') {
      added_word='qaku '
      newText2 = nlp(newText2).sentences().toFutureTense().out()
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
    } else if (moodSpecific=='when (in the past)') {
      newText2 = nlp(newText2).sentences().toPastTense().out()
    } else if (moodSpecific=='when (in the future)') {
      newText2 = nlp(newText2).sentences().toFutureTense().out()
    }
    this.setState({postbasesList: postbasesList})
    let postbasesString = "";
    postbasesList.forEach((e) => {
      postbasesString = postbasesString + "&postbase=" + encodeURIComponent(e);
    });
    console.log(postbasesList)
    console.log(postbasesString)

    axios
      .get(API_URL + "/concat?root=" + word.replace('-', '') + postbasesString)
      .then(response => {
        this.setState({ modifiedWord: added_word + response.data.concat, modifiedEnglish: newEnglish, currentPostbases: currentPostbases, text1: newText1, text2: newText2});
      });
  }


      render() {
        var dict1 = [];
        var dict2 = [];
        var dict3 = [];
        for (var i = 0; i < 14; i++) { // this portion of the code is meant to remove options that are not possible in subject/object combos
          let flag1 = false;
          let flag2 = false;
          if (this.state.mood == 'indicative' || this.state.mood == 'optative' || this.state.mood == 'subordinative') {
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
        console.log(nlp('hunted').sentences().toNegative().out('text'))
        const{value1}=this.state
        const{value2}=this.state
        const{value3}=this.state
        const{id1}=this.state
        let postbasesDisplay = this.state.currentWord+' '+this.state.postbasesList.join(' ')
        let completeSentence = 'may also mean: "' + nlp(this.state.text1+'<>'+this.state.text2+'<>'+this.state.text3).sentences().toPastTense().out() + '" (past tense)'
        return (
          <Container>
            <Header dividing>Modify Word (Verb)</Header>
            <Button onClick={this.props.history.goBack}>Back</Button>


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
                {this.state.modifiedWord}
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
                  {this.state.objectExists ?
                  <Dropdown inline options={dict2} onChange={this.setValue2.bind(this)} value={value2} /> : ''}
                  {' '}
                  {this.state.text3}
                  {this.state.encliticExpression !== '' ? this.state.encliticExpression :''}
                  {this.state.mood == 'interrogative' ? '?':''}
                </Header>
              </Grid.Column>
              {this.state.mood == 'indicative' ? <Grid.Column verticalAlign='middle' align='center'>{completeSentence}</Grid.Column> : ''}
              <Grid.Row/>
            </Grid>
            }

            <div align="center">
            Mood Markers:
            </div>
            <div align="center">
            <Button.Group inverted color='pink' vertical>
              <Segment>
              interrogative (question form)
              <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','who')} active={this.state.moodSpecific=='who'}>who</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','when did (past)')} active={this.state.moodSpecific=='when did (past)'}>when? (past)</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','when will (future)')} active={this.state.moodSpecific=='when will (future)'}>when? (future)</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','at where')} active={this.state.moodSpecific=='at where'}>at where?</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','from where')} active={this.state.moodSpecific=='from where'}>from where?</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','toward where')} active={this.state.moodSpecific=='toward where'}>toward where?</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','why')} active={this.state.moodSpecific=='why'}>why?</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'interrogative','how')} active={this.state.moodSpecific=='how'}>how?</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='brown' vertical>
            <Segment>
              optative (command form)
              <Button as='h4' toggle onClick={this.setMood.bind(this,'optative','do!')} active={this.state.moodSpecific=='do!'}>do!</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'optative','do (in the future)!')} active={this.state.moodSpecific=='do (in the future)!'}>do (in the future)!</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'optative','You, do not!')} active={this.state.moodSpecific=='You, do not!'}>You, do not!</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'optative','You, stop!')} active={this.state.moodSpecific=='You, stop!'}>You, stop!</Button>
            </Segment>
            </Button.Group>

            <Button.Group inverted color='blue' vertical>
              <Segment>
              connective (add a sub. conjunction)
              <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_precessive','before')} active={this.state.moodSpecific=='before'}>precessive (before)</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_consequential','because')} active={this.state.moodSpecific=='because'}>consequential (because)</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_contingent','whenever')} active={this.state.moodSpecific=='whenever'}>contingent (whenever)</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_concessive','although')} active={this.state.moodSpecific=='although'}>concessive (although)</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_conditional','while')} active={this.state.moodSpecific=='while'}>conditional (while)</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_first_contemporative','when (in the past)')} active={this.state.moodSpecific=='when (in the past)'}>1st_contem (when in the past)</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'connective_second_contemporative','when (in the future)')} active={this.state.moodSpecific=='when (in the future)'}>2nd_contem (when in the future)</Button>
              <Button as='h4' toggle onClick={this.setMood.bind(this,'subordinative','by or being')} active={this.state.moodSpecific=='by or being'}>subordinative (by or being)</Button>
              </Segment>
            </Button.Group>
            <Button.Group inverted color='green' vertical>
              <Segment>
                Noun Endings
                <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'the one who is')} active={this.state.nounEnding=='the one who is'}>the one who is</Button>
                <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'device for')} active={this.state.nounEnding=='device for'}>device for</Button>
                <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'one that customarily/capably')} active={this.state.nounEnding=='one that customarily/capably'}>one that customarily/capably</Button>
                <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'way of/how to')} active={this.state.nounEnding=='way of/how to'}>way of/how to</Button>
                <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'one who is good at')} active={this.state.nounEnding=='one who is good at'}>one who is good at</Button>
                <Button as='h4' toggle onClick={this.setNounEnding.bind(this,'act or state of')} active={this.state.nounEnding=='act or state of'}>act or state of</Button>
              </Segment>
            </Button.Group>
            </div>
            <Divider />
            <div align="center">
            Postbases:
            </div>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Maybe
                <Button as='h4' toggle key={0} onClick={this.setPostbase.bind(this, 0)} disabled={(this.state.allowable_next_ids.indexOf(0) < 0)} active={this.state.currentPostbases.indexOf(0) >= 0}>{postbases[0].description}</Button>
                <Button as='h4' toggle key={1} onClick={this.setPostbase.bind(this, 1)} disabled={(this.state.allowable_next_ids.indexOf(1) < 1)} active={this.state.currentPostbases.indexOf(1) >= 0}>{postbases[1].description}</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Ability
                <Button as='h4' toggle key={2} onClick={this.setPostbase.bind(this, 2)} disabled={(this.state.allowable_next_ids.indexOf(2) < 2)} active={this.state.currentPostbases.indexOf(2) >= 0}>{postbases[2].description}</Button>
                <Button as='h4' toggle key={3} onClick={this.setPostbase.bind(this, 3)} disabled={(this.state.allowable_next_ids.indexOf(3) < 3)} active={this.state.currentPostbases.indexOf(3) >= 0}>{postbases[3].description}</Button>
                <Button as='h4' toggle key={4} onClick={this.setPostbase.bind(this, 4)} disabled={(this.state.allowable_next_ids.indexOf(4) < 4)} active={this.state.currentPostbases.indexOf(4) >= 0}>{postbases[4].description}</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Time
                <Button as='h4' toggle key={5} onClick={this.setPostbase.bind(this, 5)} disabled={(this.state.allowable_next_ids.indexOf(5) < 5)} active={this.state.currentPostbases.indexOf(5) >= 0}>{postbases[5].description}</Button>
                <Button as='h4' toggle key={6} onClick={this.setPostbase.bind(this, 6)} disabled={(this.state.allowable_next_ids.indexOf(6) < 6)} active={this.state.currentPostbases.indexOf(6) >= 0}>{postbases[6].description}</Button>
                <Button as='h4' toggle key={7} onClick={this.setPostbase.bind(this, 7)} disabled={(this.state.allowable_next_ids.indexOf(7) < 7)} active={this.state.currentPostbases.indexOf(7) >= 0}>{postbases[7].description}</Button>
                <Button as='h4' toggle key={8} onClick={this.setPostbase.bind(this, 8)} disabled={(this.state.allowable_next_ids.indexOf(8) < 8)} active={this.state.currentPostbases.indexOf(8) >= 0}>{postbases[8].description}</Button>
                <Button as='h4' toggle key={9} onClick={this.setPostbase.bind(this, 9)} disabled={(this.state.allowable_next_ids.indexOf(9) < 9)} active={this.state.currentPostbases.indexOf(9) >= 0}>{postbases[9].description}</Button>
                <Button as='h4' toggle key={10} onClick={this.setPostbase.bind(this, 10)} disabled={(this.state.allowable_next_ids.indexOf(10) < 10)} active={this.state.currentPostbases.indexOf(10) >= 0}>{postbases[10].description}</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Habit/Frequency
                <Button as='h4' toggle key={11} onClick={this.setPostbase.bind(this, 11)} disabled={(this.state.allowable_next_ids.indexOf(11) < 11)} active={this.state.currentPostbases.indexOf(11) >= 0}>{postbases[11].description}</Button>
                <Button as='h4' toggle key={12} onClick={this.setPostbase.bind(this, 12)} disabled={(this.state.allowable_next_ids.indexOf(12) < 12)} active={this.state.currentPostbases.indexOf(12) >= 0}>{postbases[12].description}</Button>
                <Button as='h4' toggle key={13} onClick={this.setPostbase.bind(this, 13)} disabled={(this.state.allowable_next_ids.indexOf(13) < 13)} active={this.state.currentPostbases.indexOf(13) >= 0}>{postbases[13].description}</Button>
                <Button as='h4' toggle key={14} onClick={this.setPostbase.bind(this, 14)} disabled={(this.state.allowable_next_ids.indexOf(14) < 14)} active={this.state.currentPostbases.indexOf(14) >= 0}>{postbases[14].description}</Button>
                <Button as='h4' toggle key={15} onClick={this.setPostbase.bind(this, 15)} disabled={(this.state.allowable_next_ids.indexOf(15) < 15)} active={this.state.currentPostbases.indexOf(15) >= 0}>{postbases[15].description}</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Trying
                <Button as='h4' toggle key={16} onClick={this.setPostbase.bind(this, 16)} disabled={(this.state.allowable_next_ids.indexOf(16) < 16)} active={this.state.currentPostbases.indexOf(16) >= 0}>{postbases[16].description}</Button>
                <Button as='h4' toggle key={17} onClick={this.setPostbase.bind(this, 17)} disabled={(this.state.allowable_next_ids.indexOf(17) < 17)} active={this.state.currentPostbases.indexOf(17) >= 0}>{postbases[17].description}</Button>
                <Button as='h4' toggle key={18} onClick={this.setPostbase.bind(this, 18)} disabled={(this.state.allowable_next_ids.indexOf(18) < 18)} active={this.state.currentPostbases.indexOf(18) >= 0}>{postbases[18].description}</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Adjectival
                <Button as='h4' toggle key={19} onClick={this.setPostbase.bind(this, 19)} disabled={(this.state.allowable_next_ids.indexOf(19) < 19)} active={this.state.currentPostbases.indexOf(19) >= 0}>{postbases[19].description}</Button>
                <Button as='h4' toggle key={20} onClick={this.setPostbase.bind(this, 20)} disabled={(this.state.allowable_next_ids.indexOf(20) < 20)} active={this.state.currentPostbases.indexOf(20) >= 0}>{postbases[20].description}</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Desire
                <Button as='h4' toggle key={21} onClick={this.setPostbase.bind(this, 21)} disabled={(this.state.allowable_next_ids.indexOf(21) < 21)} active={this.state.currentPostbases.indexOf(21) >= 0}>{postbases[21].description}</Button>
                <Button as='h4' toggle key={22} onClick={this.setPostbase.bind(this, 22)} disabled={(this.state.allowable_next_ids.indexOf(22) < 22)} active={this.state.currentPostbases.indexOf(22) >= 0}>{postbases[22].description}</Button>
                <Button as='h4' toggle key={23} onClick={this.setPostbase.bind(this, 23)} disabled={(this.state.allowable_next_ids.indexOf(23) < 23)} active={this.state.currentPostbases.indexOf(23) >= 0}>{postbases[23].description}</Button>
                <Button as='h4' toggle key={24} onClick={this.setPostbase.bind(this, 24)} disabled={(this.state.allowable_next_ids.indexOf(24) < 24)} active={this.state.currentPostbases.indexOf(24) >= 0}>{postbases[24].description}</Button>
                <Button as='h4' toggle key={25} onClick={this.setPostbase.bind(this, 25)} disabled={(this.state.allowable_next_ids.indexOf(25) < 25)} active={this.state.currentPostbases.indexOf(25) >= 0}>{postbases[25].description}</Button>
                <Button as='h4' toggle key={26} onClick={this.setPostbase.bind(this, 26)} disabled={(this.state.allowable_next_ids.indexOf(26) < 26)} active={this.state.currentPostbases.indexOf(26) >= 0}>{postbases[26].description}</Button>
              </Segment>
            </Button.Group>

            <Button.Group inverted color='violet' vertical>
              <Segment>
                Unlisted
                <Button as='h4' toggle key={27} onClick={this.setPostbase.bind(this, 27)} disabled={(this.state.allowable_next_ids.indexOf(27) < 27)} active={this.state.currentPostbases.indexOf(27) >= 0}>{postbases[27].description}</Button>
                <Button as='h4' toggle key={28} onClick={this.setPostbase.bind(this, 28)} disabled={(this.state.allowable_next_ids.indexOf(28) < 28)} active={this.state.currentPostbases.indexOf(28) >= 0}>{postbases[28].description}</Button>
                <Button as='h4' toggle key={29} onClick={this.setPostbase.bind(this, 29)} disabled={(this.state.allowable_next_ids.indexOf(29) < 29)} active={this.state.currentPostbases.indexOf(29) >= 0}>{postbases[29].description}</Button>
                <Button as='h4' toggle key={30} onClick={this.setPostbase.bind(this, 30)} disabled={(this.state.allowable_next_ids.indexOf(30) < 30)} active={this.state.currentPostbases.indexOf(30) >= 0}>{postbases[30].description}</Button>
              </Segment>
            </Button.Group>

            {this.state.mood == 'indicative' ?
            <Button.Group inverted color='violet' vertical>
              <Segment>
                Enclitics
                <Button as='h4' toggle onClick={this.setEnclitic.bind(this,'-qaa','(yes or no?)')} active={this.state.enclitic=='-qaa'}>Yes or no?</Button>
                <Button as='h4' toggle onClick={this.setEnclitic.bind(this,'-wa','(indication of a complete thought)')} active={this.state.enclitic=='-wa'}>indication of a complete thought</Button>
                <Button as='h4' toggle onClick={this.setEnclitic.bind(this,'-gguq','(one says)')} active={this.state.enclitic=='-gguq'}>one says</Button>
                <Button as='h4' toggle onClick={this.setEnclitic.bind(this,'-llu','(and, also)')} active={this.state.enclitic=='-llu'}>and, also</Button>
                <Button as='h4' toggle onClick={this.setEnclitic.bind(this,'ataam','(again)')} active={this.state.enclitic=='ataam'}>again</Button>
              </Segment>
            </Button.Group>
            :''}

            {this.state.mood == 'interrogative' ?
            <Button.Group inverted color='violet' vertical>
              <Segment>
                Enclitics
                <Button as='h4' toggle onClick={this.setEnclitic.bind(this,'-kiq','(I wonder...)')} active={this.state.enclitic=='-kiq'}>I wonder...</Button>
                <Button as='h4' toggle onClick={this.setEnclitic.bind(this,'-tanem','(emphasized)')} active={this.state.enclitic=='-tanem'}>Add emphasis</Button>
              </Segment>
            </Button.Group>
            :''}
          </Container>
        );
      }
    };


export default YupikModifyVerb;
