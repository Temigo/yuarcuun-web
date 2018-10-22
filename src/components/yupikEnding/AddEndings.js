import React, { Component } from 'react';
import { Container, Header, Image, Divider, Grid, Icon, Input, List, Button, Segment}  from 'semantic-ui-react';
import '../../semantic/dist/semantic.min.css';
import axios from 'axios';
import nlp from 'compromise';
import { API_URL } from '../../App.js';
import { Link } from 'react-router-dom';

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
    console.log(objectPerson)
    console.log(this.state.objectPerson)
    console.log(this.state.objectExists)
    console.log('done')
  }

  speak(event, data) {
      let audio = new Audio(API_URL + "/tts/" + this.state.modifiedWord.replace('-', ''));
      audio.play();
  }

  modifyWord(person, people, objectPerson, objectPeople, word, currentPostbases) {
    let indicative_intransitive_endings = {
      0: {
        0: '',
        1: '',
        2: '',
        3: '',
      },
      1: { // 1st person
        0: '',
        1: '+\'(g/t)u:6a', // I
        2: '+\'(g/t)ukuk', // you
        3: '+\'(g/t)ukut', // he
      },
      2: {
        0: '',
        1: '+\'(g/t)uten', // I
        2: '+\'(g/t)utek', // you
        3: '+\'(g/t)uci', // he
      },
      3: {
        0: '',
        1: '+\'(g/t)uq',
        2: '+\'(g/t)uk',
        3: '+\'(g/t)ut',
      }
    };

    let indicative_transitive_endings = {
      0: {
        0: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
        },
        1: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
        },
        2: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
        },
        3: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'',
            2:'',
            3:'',
          }
        }
      },
      1: {
        0: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
        },
        1: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'', //not allowed
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'+\'(g)amken',
            2:'+\'(g)amtek',
            3:'+\'(g)amci',
          },
          3: {
            0:'',
            1:'+\'(g)aqa',
            2:'+\'(g)agka',
            3:'+\'(g)anka',
          },
        },
        2: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'+\'(g)amegten',
            2:'+\'(g)amegtek',
            3:'+\'(g)amegci',
          },
          3: {
            0:'',
            1:'+\'(g)apuk',
            2:'+\'(g)agpuk',
            3:'+\'(g)apuk',
          },
        },
        3: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'+\'(g)amteggen',
            2:'+\'(g)amcetek',
            3:'+\'(g)amceci',
          },
          3: {
            0:'',
            1:'+\'(g)aput',
            2:'+\'(g)agput',
            3:'+\'(g)aput',
          }
        }
      },
      2: {
        0: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
        },
        1: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'+\'(g)arpenga',
            2:'+\'(g)arpekuk',
            3:'+\'(g)arpekut',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'+\'(g)an',
            2:'+\'(g)agken',
            3:'+\'(g)aten',
          },
        },
        2: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'+\'(g)arpetegnga',
            2:'+\'(g)arpetegkuk',
            3:'+\'(g)arpetegkut',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'+\'(g)atek',
            2:'+\'(g)agtek',
            3:'+\'(g)atek',
          },
        },
        3: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'+\'(g)arpecia',
            2:'+\'(g)arpecikuk',
            3:'+\'(g)arpecikut',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'+\'(g)aci',
            2:'+\'(g)agci',
            3:'+\'(g)aci',
          }
        }
      },
      3: {
        0: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          2: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          3: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
        },
        1: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'+\'(g)anga',
            2:'+\'(g)akuk',
            3:'+\'(g)akut',
          },
          2: {
            0:'',
            1:'+\'(g)aten',
            2:'+\'(g)atek',
            3:'+\'(g)aci',
          },
          3: {
            0:'',
            1:'+\'(g)aa',
            2:'+\'(g)ak',
            3:'+\'(g)ai',
          },
        },
        2: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'+\'(g)agnga',
            2:'+\'(g)agkuk',
            3:'+\'(g)agkut',
          },
          2: {
            0:'',
            1:'+\'(g)agten',
            2:'+\'(g)agtek',
            3:'+\'(g)agci',
          },
          3: {
            0:'',
            1:'+\'(g)aak',
            2:'+\'(g)agkek',
            3:'+\'(g)akek',
          },
        },
        3: {
          0: {
            0:'',
            1:'',
            2:'',
            3:'',
          },
          1: {
            0:'',
            1:'+\'(g)atnga',
            2:'+\'(g)aitkuk',
            3:'+\'(g)aitkut',
          },
          2: {
            0:'',
            1:'+\'(g)atgen',
            2:'+\'(g)aicetek',
            3:'+\'(g)aiceci',
          },
          3: {
            0:'',
            1:'+\'(g)aat',
            2:'+\'(g)agket',
            3:'+\'(g)ait',
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
    // let newEnglish =  this.state.currentEnglish;
    // //newEnglish = nlp(newEnglish).sentences().toPresentTense().out('text');
    // // FIXME remove dash for verbs only
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
        //console.log( postbases[id].group !== postbases[postbase_id].group);
        newGroup = newGroup && postbases[id].group !== postbases[postbase_id].group;
      });
      if (newGroup) {
        currentPostbases.push(postbase_id);
      }

    }
    this.modifyWord(this.state.person, this.state.people, this.state.objectPerson, this.state.objectPeople, this.state.currentWord, currentPostbases);
  }

  render() {
    console.log('hi');
    //console.log(this.state.objectPerson)
    //console.log(this.state.objectExists)
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
