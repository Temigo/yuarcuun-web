import React, { Component } from 'react';
import '../App.css';
import '../semantic/dist/semantic.min.css';
import { Container, Dropdown, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL } from '../App.js';
import YupikEntry from './YupikEntry.js';
import {withRouter} from 'react-router';
import StickyMenu from './common/StickyMenu.js';
import {nounoptions1, nounoptions2, options1, options2, options3} from './constants/newconstants.js'

let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"
const options = [
  { key: 1, text: 'it', value: 1 },
  { key: 2, text: 'you', value: 2 },
]

let peopleDict = {
  '1':"Sg",
  '2':"Du",
  '3':"Pl",
}


class SimpleWordBuilder extends Component {
  constructor(props) {
    super(props);
    console.log("YupikDetails props: ", props);
    this.state = {
      definition: '[he] is hunting', // from json
      // definitionraw: 'hunting', // from json
      baseCases: ['pissur','nere'], // from json
      definitionraw: "⟨hunting⟩ <it>", 
      firstVerb: [
                    "hunt", 
                    "hunted", 
                    "hunts", 
                    "hunting"
                ],

      fstCall: '',
      objectPossessed: false,
      baseOptions: [],
      activeKeyInEditIndex: 0,
      // definition: props.definition === undefined ? '' : props.definition,
      entryModified: [],
      tag: 'TRANSITIVE VERB',
      verbMood: 'Indicative',
      wordBuilderOn: false,

      // base: props.base === undefined ? '' : props.base,
    };
    // this.getWord = this.getWord.bind(this);
    // this.getWord(decodeURI(props.match.params.word));
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.match.params.word !== this.props.match.params.word) {
  //     this.getWord(decodeURI(this.props.match.params.word));
  //   }
  // }

  // getWord(word) {
  //   axios
  //     .get(API_URL + "/word2021/" + encodeURIComponent(word))
  //     .then(response => {
  //       // console.log(response.data);
  //       this.setState({
  //         currentWord: word,
  //         modifiedWord: word,
  //         fullWord: response.data
  //       });
  //     });
  // }

  getFSTParse(fstCall,activeEditIndex,activeKeyInEditIndex) {
    console.log(fstCall,activeEditIndex,activeKeyInEditIndex)
    let FSTsearch = this.state.definition[activeEditIndex][3][activeKeyInEditIndex] + fstCall
    // console.log(FSTsearch,activeEditIndex)

    let baseOptions = []
    this.state.definition[activeEditIndex][3].map((m,ind)=>{
      baseOptions.push({id:ind,value:ind,text:m})
    })
    this.setState({baseOptions:baseOptions})

    console.log(encodeURIComponent(FSTsearch))
    axios
      .get(API_URL + "/inupiaqsegment/" + encodeURIComponent(FSTsearch))
      .then(response => {
        console.log(response.data);

        this.setState({
          entryModified: response.data.words,
        });

        // if (response.data.chld !== []) {}
        // console.log(response.data.etymology)
        // if (response.data.etymology !== []) {
        //  this.setState({etymology: response.data.etymology[0]})
        // }
      });
  }

  identifyObjectCase = (match) => {
    console.log('eventually set the object type here, her/him versus it')
    console.log(match)
    // if (match == '<her/him>') {
    //  if (ind % 2 === 0) {
    //    //return him
    //  } else {
    //    //return her
    //  }
    // value2 = "o31-1(2)"  him
    // value2 = "o31-2(2)"  her
    // value2 = "o31-3(2)"  its
    // }
    let value1 = ''
    let value2 = ''
    let possessed = false
    // if (ind % 2 == 0) {
    value1 = "s31-2(1)"  
    // } else {
    // value1 = "s31-1(1)"  
    // }
    if (match == '<her/him/it>') {
      value2 = "o31-3(2)"
    } else if (match == '<her/him>') {
      // if (ind % 2 == 0) {
      value2 = "o31-1(2)"     
      // } else {
      // value2 = "o31-2(2)"
      // }
    } else if (match == '<her/his>') {
      // if (ind % 2 == 0) {
      value2 = "o31-1(2)"     
      // } else {
      // value2 = "o31-2(2)"
      // }
    } else if (match == '<her>') {
      value2 = "o31-2(2)"
    } else if (match == '<him>') {
      value2 = "o31-1(2)"
    } else if (match == '<a person/it>') {
      value2 = "o31-3(2)"
    } else if (match == '<it>') {
      value2 = "o31-3(2)"
    } else if (match == '<them>') {
      value2 = "o33(2)"
    } else if (match == '<someone/something>') {
      value2 = "o31-3(2)"
    } else if (match == '<her/his/its>') {
      possessed = true
      value2 = "o31-3(2)"
    } else {
      value2 = "o31-3(2)"     
    }
    this.setState({objectPossessed:possessed})
    return [value1, value2]


  }

  defaultFstCall = () => {
    let tag = this.state.tag
    let value1 = ''
    let value2 = ''
    let nounvalue1 = ''
    let nounvalue2 = ''
    let owner = ''
    // console.log(tag,ind)
    if (tag === 'INTRANSITIVE VERB') {
      value1 = "s31-1(1)"  
      this.setIntransitive(true,value1,undefined,undefined)
      // this.setState({person: 3,people: 1, value1: "31-1(1)",activeEditIndex:ind}); this.getFSTParse(fstCall,ind,0); 
    // } else if (tag === 'NOUN') {
    //   nounvalue1="1"
    //   nounvalue2="00(3)"
    //   owner = ''
    //   this.setNoun(ind,true,nounvalue1,nounvalue2,owner,undefined,undefined)
    } else if (tag === 'TRANSITIVE VERB') {
      let matches = this.state.definitionraw.match(/\<.*?\>/g)
      let splitSentence = []
      if (matches.length == 1) {
        splitSentence = this.state.definitionraw.split(matches[0])
      }
      
      let values = this.identifyObjectCase(matches[0])
      console.log(splitSentence[0],splitSentence[1])



      this.setState({
        transitiveLeftOfObject: splitSentence[0].replace("⟨","").replace("⟩",""),
        transitiveRightOfObject: splitSentence[1].replace("⟨","").replace("⟩",""),
        // entryModified: matches[0],
      });
      this.setTransitive(true,values[0],values[1],undefined,undefined)
    }
  }

  setIntransitive(initializing, value1, e, data) {
    console.log(e, data)
    if (!initializing) {
      value1 = data.value
      // person = data.value[0]
      // people = data.value[1]
    }

    let fstCall = ''
    if (this.state.verbMood === 'Indicative') {
      fstCall = '-[V][Ind][Intr][S_' + value1[1] + peopleDict[value1[2]] + ']'
    }

    this.setState({
      value1: value1,
      // activeEditIndex:ind,
      // person: person,
      // people: people,
      fstCall: fstCall,
    });

    this.getFSTParse(fstCall,this.state.activeKeyInEditIndex)
  }


  setNoun(ind, initializing, nounvalue1, nounvalue2, owner, e, data) {
    console.log(e,data,ind,initializing)
    if (!initializing) {
      if (data.value.length == 1) {
        nounvalue1=data.value
        nounvalue2=this.state.nounvalue2
      } else {
        nounvalue1=this.state.nounvalue1
        nounvalue2=data.value 
      }

      if (nounvalue2[0] !== '0') {
        owner = '+'+nounvalue2[0]+peopleDict[nounvalue2[1]]
      } else {
        owner = ''
      }
      console.log(owner)
      // value1 = data.value
      // person = data.value[0]
      // people = data.value[1]
    }


    let fstCall = ''
    if (this.state.nounMood === 'Absolutive') {
      fstCall = '>+N+Abs+' + peopleDict[nounvalue1] + owner
    }

    this.setState({
      nounvalue1: nounvalue1,
      nounvalue2: nounvalue2,
      value1: "s31-3(1)",
      activeEditIndex:ind,
      // person: person,
      // people: people,
      fstCall: fstCall,
    });

    this.getFSTParse(fstCall,ind,this.state.activeKeyInEditIndex)
  }


  setTransitive(initializing, value1, value2, e, data) {
    // console.log(e, data, ind, initializing)
    if (!initializing) {
      console.log(data.value)
      if (data.value[0] == 's') {
        value1 = data.value
        value2 = this.state.value2
      } else {
        value1 = this.state.value1
        value2 = data.value 
      }
      // person = data.value[0]
      // people = data.value[1]
    }

    let fstCall = ''
    if (this.state.verbMood === 'Indicative') {
      fstCall = '-[V][Ind][Trns][A_' + value1[1] + peopleDict[value1[2]] + '][P_' + value2[1]+peopleDict[value2[2]] + ']'
    }

    this.setState({
      value1: value1,
      value2: value2,
      // activeEditIndex:ind,
      // person: person,
      // people: people,
      fstCall: fstCall,
    });

    this.getFSTParse(fstCall,this.state.activeKeyInEditIndex)
  }

  //   if (this.state.nounMood === 'Absolutive') {
  //    let fstCall = '>+N+Abs+'+
  //   }

  //   this.getFSTParse(fstCall,this.state.activeEditIndex,this.state.activeKeyInEditIndex)
  // }

  // setNounNumber(e, data) {
  //  // console.log(data)
  //   this.setState({
  //     value1: data.value,
  //     person: parseInt(data.value[0]),
  //     people: parseInt(data.value[1])
  //   });
    
  //   this.getFSTParse(">+V+Ind+Prs+",data.value[0],data.value[1],this.state.activeEditIndex,this.state.activeKeyInEditIndex)
  // }

  changeActiveUsageKey(entry, data) {
    console.log(data)
    this.setState({
      // value1: data.value,
      activeKeyInEditIndex:data.value,
    });
    this.getFSTParse(this.state.fstCall,data.value)
  }


  getSubjectIs = (personN, peopleN) => {
    let subjectis = '';
    if (peopleN === '1' && personN === '1') {
      subjectis = 'am'
    } else if (peopleN === '1' && personN === '3') {
      subjectis = 'is'
    } else {
      subjectis = 'are'
    }
    return subjectis
  };


  getFSTParse(fstCall,activeKeyInEditIndex) {
    console.log(fstCall,activeKeyInEditIndex)
    let FSTsearch = this.state.baseCases[activeKeyInEditIndex] + fstCall
    console.log(FSTsearch)

    let baseOptions = []
    this.state.baseCases.map((m,ind)=>{
      baseOptions.push({id:ind,value:ind,text:m})
    })
    this.setState({
      baseOptions:baseOptions,
      wordBuilderOn: true,
    })

    console.log(encodeURIComponent(FSTsearch))
    axios
      .get(API_URL + "/segment/" + encodeURIComponent(FSTsearch))
      .then(response => {
        console.log(response.data);

        this.setState({
          entryModified: response.data.words,
        });

        // if (response.data.chld !== []) {}
        // console.log(response.data.etymology)
        // if (response.data.etymology !== []) {
        //  this.setState({etymology: response.data.etymology[0]})
        // }
      });
  }


  processStyledText = (sentence) => {     
    sentence = sentence.replace("⟨","").replace("⟩","")
    let matches = sentence.match(/\⎡.*?\⎤/g)
    if (matches !== null) {
      matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))   
      return <span dangerouslySetInnerHTML={{__html: sentence}} />    
    } else {
      return <span>{sentence}</span>
    }
  }

  processStyledText2 = (sentence,ind,tag) => {
    console.log(sentence,ind,tag)
    sentence = sentence.replace("⟨","").replace("⟩","")
    if (tag == 'NOUN') {
      sentence = 'the one '+sentence
    } else {
      if (ind % 2 == 0) {
      sentence = 'she is '+sentence       
      } else {
      sentence = 'he is '+sentence
      }     
    }
    let matches = sentence.match(/\⎡.*?\⎤/g)
    if (matches !== null) {
      matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))   
      return <span dangerouslySetInnerHTML={{__html: sentence}} />    
    } else {
      return <span>{sentence.replace("<","").replace(">","")}</span>
    }
  }


  usageEntry = (tag) => {
    if (tag === 'NOUN') {
      return (  
              <div>
                <div style={{marginTop:'15px', marginLeft:'45px',fontSize:'20px',color:'#000000',fontWeight:'300'}}>
                {this.state.entryModified.map((modifiedword, m)=>
                  <span>
                  {m > 0 ?
                    ', '
                    :
                    null
                  }
                  {this.state.definition[this.state.activeEditIndex][3].length == 1 ?
                    (modifiedword.split('>').map((q,index) =>
                      <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>
                      ))
                    :
                    <Dropdown inline scrolling onChange={this.changeActiveUsageKey.bind(this)} text={(modifiedword.split('>').map((q,index) => <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>))} value={this.state.activeKeyInEditIndex} options={this.state.baseOptions} />
                  }
                  </span>
                  )}
                <Icon onClick={()=>console.log('hi')} style={{marginLeft:'20px',color:'#8F8F8F',cursor:'pointer'}} name='volume up' />
                </div>
                <div style={{marginTop:'15px', marginBottom:'15px',marginLeft:'45px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>
                <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setNoun.bind(this,this.state.activeEditIndex,false,'','','')} value={this.state.nounvalue2} options={nounoptions1} />
                <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setNoun.bind(this,this.state.activeEditIndex,false,'','','')} value={this.state.nounvalue1} options={nounoptions2} />
                <span style={{color:'#777777'}}>{this.processStyledText(this.state.definitionraw)}</span>
                </div>
              </div>    
            )
    } else if (tag === 'INTRANSITIVE VERB') {
      return (  
              <div>
                <div style={{marginTop:'15px', marginLeft:'45px',fontSize:'20px',color:'#000000',fontWeight:'300'}}>
                {this.state.entryModified.map((modifiedword, m)=>
                  <span>
                  {m > 0 ?
                    ', '
                    :
                    null
                  }
                  {this.state.baseCases.length == 1 ?
                    (modifiedword.split('>').map((q,index) =>
                      <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>
                      ))
                    :
                    <Dropdown inline scrolling onChange={this.changeActiveUsageKey.bind(this)} text={(modifiedword.split('>').map((q,index) => <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>))} value={this.state.activeKeyInEditIndex} options={this.state.baseOptions} />
                  }
                  </span>
                  )}
                <Icon onClick={()=>console.log('hi')} style={{marginLeft:'20px',color:'#8F8F8F',cursor:'pointer'}} name='volume up' />
                </div>
                <div style={{marginTop:'15px', marginBottom:'15px',marginLeft:'45px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>
                <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setIntransitive.bind(this, false, '')} value={this.state.value1} options={options1} />
                <span style={{color:'#777777'}}>{this.getSubjectIs(this.state.value1[1],this.state.value1[2])+" "}</span>
                <span style={{color:'#777777'}}>{this.processStyledText(this.state.definitionraw)}</span>
                </div>
              </div>    
            )
    } else if (tag === 'TRANSITIVE VERB') {
      return (  
              <div>
                <div style={{marginTop:'15px', marginLeft:'45px',fontSize:'20px',color:'#000000',fontWeight:'300'}}>
                {this.state.entryModified.map((modifiedword, m)=>
                  <span>
                  {m > 0 ?
                    ', '
                    :
                    null
                  }
                  {this.state.baseCases.length == 1 ?
                    (modifiedword.split('>').map((q,index) =>
                      <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>
                      ))
                    :
                    <Dropdown inline scrolling onChange={this.changeActiveUsageKey.bind(this)} text={(modifiedword.split('>').map((q,index) => <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>))} value={this.state.activeKeyInEditIndex} options={this.state.baseOptions} />
                  }
                  </span>
                  )}
                <Icon onClick={()=>console.log('hi')} style={{marginLeft:'20px',color:'#8F8F8F',cursor:'pointer'}} name='volume up' />
                </div>
                <div style={{marginTop:'15px', marginBottom:'15px',marginLeft:'45px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>
                <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setTransitive.bind(this,false,'','')} value={this.state.value1} options={options1} />
                <span style={{color:'#777777'}}>{this.getSubjectIs(this.state.value1[1],this.state.value1[2])+" "}</span>
                <span style={{color:'#777777'}}>{this.state.transitiveLeftOfObject}</span>
                {this.state.objectPossessed ?
                  <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setTransitive.bind(this,false,'','')} value={this.state.value2} options={options3} />
                  :
                  <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setTransitive.bind(this,false,'','')} value={this.state.value2} options={options2} />
                }
                <span style={{color:'#777777'}}>{this.state.transitiveRightOfObject}</span>
                </div>
              </div>    
            )     
    }
  }


  render() {
    console.log(this.state)
    // let numEntries = Object.keys(this.state.fullWord).filter((entryNumber) => {
    //   return entryNumber !== 'english' && entryNumber !== 'yupik';
    // }).length;
    return (
      <div>
        {this.state.base}
        {this.state.definition}
          {this.state.wordBuilderOn ?
            <div>
            {this.usageEntry(this.state.tag)}
            </div>
            :
            <Icon onClick={this.defaultFstCall.bind(this)} style={{marginLeft:'5px',fontSize:'20px',color:'#989898',cursor:'pointer'}} name='edit outline' />
          }

      </div>
    );
  }
}

export default withRouter(SimpleWordBuilder);
