import React, { Component } from 'react';
import '../App.css';
import '../semantic/dist/semantic.min.css';
import { Container, Dropdown, Icon, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../App.js';
import YupikEntry from './YupikEntry.js';
import {withRouter} from 'react-router';
import StickyMenu from './common/StickyMenu.js';
import {nounOptionsMVPossessors,colorsList, mvSubject4thPersonCalls, mvObject4thPersonCalls,nObject4thPersonCalls, nounOptionsMVPossessorsThe, mvSubjectOptionsWho, mvSubjectOptionsWhat, mvObjectOptionsWhom, mvObjectOptionsWhomAbl, mvObjectOptionsWhat, mvObjectOptionsWhatAbl,retrieveMoodEnglish, nounOptionsPossessorsNo4th, mvSubjectOptionsOnly2nd, nounOptionsNumbers, nounoptionsmodalis, mvSubjectOptions, mvObjectOptions, mvSubjectOptionsEnglish, verbPostbases, nounPostbases, VVpostbases, NNpostbases} from './constants/newconstants.js'

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


let vOptions = [
  'vBase',
  'nsBases',
  'noBases',
  'no',
  'ns',
  'vMood',
  'vs',
  'vo',
  'nObliques',
  'qWord',
  'vType',
]

let nOptions = [
  'n',
  'nBases',
  'nCase',
  'nType',
]

let vEnglish = [
  'mvEnglish1',
  'mvEnglish2',
  'mvEnglish3',
  'mvEnglishAbl',
  'mvnsEnglish1',
  'mvnsEnglish2',
  'mvnoEnglish1',
  'mvnoEnglish2',
  'cvnsEnglish1',
  'cvnsEnglish2',
  'cvnoEnglish1',
  'cvnoEnglish2',
  'svnoEnglish1',
  'svnoEnglish2',
  'cvEnglish1',
  'cvEnglish2',
  'cvEnglish3',
  'cvEnglishAbl',
  'svEnglish1',
  'svEnglish2',
  'svEnglishAbl',
  'npnEnglish1',
  'npnEnglish2',
  'mvnObliquesEnglish1',
  'mvnObliquesEnglish2',
  'cvnObliquesEnglish1',
  'cvnObliquesEnglish2',
  'svnObliquesEnglish1',
  'svnObliquesEnglish2',
]



class SimpleWordBuilderUpdated extends Component {
  constructor(props) {
    super(props);
    // console.log("YupikDetails props: ", props);
    // console.log(props.entry)
    // console.log(props.entry[5][0])
    this.state = {
      mvEnglish1: [],
      mvEnglish2: [],
      mvEnglish3: [],
      mvEnglishAbl: [],
      mvvs:[],
      mvvo:[],
      mvvBase:[],
      mvvMood:"",
      mvvSegments:"",
      colorScheme:0,
      colorsList: {
        'mvv.b':'#000000',
        'mvv.e':'#852828',
        'mvv.s':'#852828',
        'mvv.o':'#961616',
        'mvv.m':'#838383',
        'mvv.1':'#3455b5',
        'mvv.2':'#d3741e',
        'mvv.3':'#c062c3',
        'mvv.4':'#008000',
        'mvv.5':'#69b4b4',
        'mvv.6':'#e02323',

        'npn00.b':'#000000',
        'npn00.1':'#e02323',
        'npn00.2':'#69b4b4',
        'npn00.pd':'#961616',
        'npn00.ps':'#852828',
        // 'mvns00.b':'#852828',
        // 'mvns00.1':'#b53434',
        // 'mvns00.2':'#578f7f',
        // 'mvns00.e':'#f29090',
        // 'mvns10.b':'#852828',
        // 'mvv.4':'#000000',
      },

      npnEnglish1: [],
      npnEnglish2: [],

      npn:[],
      npnBases:[],
      npnCase:[],
      npnSegments:[],
      npnType:[], 

      // mvSubjectOptions:mvSubjectOptions,
      // mvObjectOptions:mvObjectOptions,

      mvSubjectOptions1:mvSubjectOptions,
      mvObjectOptions1:mvObjectOptions,

    }
  }

  componentDidMount() {
    // backEndCall()
    console.log(this.props)
    let initializedCall
    if (this.props.entry[0] == 'n') {
      initializedCall = [["Insert",["np"],[[[this.props.word,0,this.props.index,this.props.definitionIndex]],[0,0,0,1],"Abs"]]]
    } else {
      initializedCall = [["Insert",["mv"],[[[this.props.word,0,this.props.index,0]],this.props.entry[0],"Ind"]]]
    }

    // [["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]]]]
    this.backEndCall(initializedCall, true)
  }

  componentWillReceiveProps(nextProps) {
    // backEndCall()
    console.log(nextProps)
    let initializedCall
    if (nextProps.entry[0] == 'n') {
      initializedCall = [["Insert",["np"],[[[nextProps.word,0,nextProps.index,nextProps.definitionIndex]],[0,0,0,1],"Abs"]]]
    } else {
      initializedCall = [["Insert",["mv"],[[[nextProps.word,0,nextProps.index,0]],nextProps.entry[0],"Ind"]]]
    }

    // [["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]]]]
    this.backEndCall(initializedCall, true)
  }


  backEndCall(keyChanged, eraseExisting) {
    console.log('backend',this.state)
    console.log(keyChanged)

    let mv = {}
    let cv = {}
    let sv = {}
    let np = {}

    if (eraseExisting) {

    } else {
      if (this.state.mvvBase.length > 0) {mv['vBase']=this.state.mvvBase}

      if (this.state.mvvMood.length > 0) {mv['vMood']=this.state.mvvMood}
      if (this.state.mvvs.length > 0) {mv['vs']=this.state.mvvs}
      if (this.state.mvvo.length > 0) {mv['vo']=this.state.mvvo}

      if (this.state.npn.length > 0) {np['n']=this.state.npn}
      if (this.state.npnBases.length > 0) {np['nBases']=this.state.npnBases}
      if (this.state.npnCase.length > 0) {np['nCase']=this.state.npnCase}

    }

    // console.log(keyChanged,mv)
    axios
      .post(API_URL + "/sentencebuilder", {
        keyChanged:keyChanged,
        mv:mv,
        cv:cv,
        sv:sv,
        np:np,
      })
      .then(response => {
        // console.log(response.data)
        let vkey, nkey
        let updateDict = {}
        if ("english" in response.data) {
          vEnglish.map((k)=>{
            if (k in response.data['english']) {
              updateDict[[k]] = response.data['english'][k]
            } else {
              updateDict[[k]] = []
            }
          })

        }

        if ("mv" in response.data) {
          updateDict['mv'] = response.data['mv']
          vOptions.map((k)=>{
            vkey = 'mv'+k
            if (k in response.data['mv']) {
              // this.setState({
                // [vkey]: response.data['mv'][k],
              // })

              updateDict[[vkey]] = response.data['mv'][k]
              // if (k == 'qWord') {
              //  updateDict[['interCase']] = response.data['mv'][k][0]           
              // }
            } else {

              updateDict[[vkey]] = []

              // this.setState({
                // [vkey]: [],
              // })             
            }
          })
        } else {
          this.initialize('mv')
        }

        if ("np" in response.data) {
          updateDict['np'] = response.data['np']

          nOptions.map((k)=>{
            nkey = 'np'+k
            if (k in response.data['np']) {
              updateDict[[nkey]] = response.data['np'][k]
            } else {
              updateDict[[nkey]] = []           
            }
          })
        } else {
          this.initialize('np')
        }

        if ("segments" in response.data) {
          if ("mv" in response.data.segments) {
            if ("v" in response.data.segments.mv) {
              // this.setState({
                // mvvSegments: response.data.segments.mv.v,
              // })             
              updateDict['mvvSegments'] = response.data.segments.mv.v
            } else {
              // this.setState({
                // mvvSegments: "",
              // })                     
              updateDict['mvvSegments'] = ""
            }       
          }

          if ("np" in response.data.segments) {
            if ("n" in response.data.segments.np) {
              // this.setState({
                // npnSegments: response.data.segments.np.n,
              // })             
              updateDict['npnSegments'] = response.data.segments.np.n
            } else {
              // this.setState({
                // npnSegments: [],
              // })                     
              updateDict['npnSegments'] = []
            }
          }
        }


        this.setState(updateDict)



      })

  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.mv !== this.state.mv || prevState.np !== this.state.np) {
      this.updateAllowableOptions()
    }

  }

  updateAllowableOptions = () => {

    let mvSubjectOptions1 = []
    let mvObjectOptions1 = []
    // let nounOptionsSVPossessors1 
    // let nounOptionsCVPossessors1 
    // let nounOptionsMVPossessors1 
    // let nounOptionsCVAblPossessors1
    // let nounOptionsMVAblPossessors1 
    // let nounOptionsSVAblPossessors1

    if (this.state.mvvs.length > 0 && this.state.mvvo.length > 0) {
      if (this.state.mvvs[0] == 1) {
        mvObjectOptions.map((k)=>{
          if (![0,6,10].includes(k['id'])) {
            mvObjectOptions1 = mvObjectOptions1.concat(k)
          }
        })
      } else if (this.state.mvvs[0] == 2) {
        mvObjectOptions.map((k)=>{
          if (![1,7,11].includes(k['id'])) {
            mvObjectOptions1 = mvObjectOptions1.concat(k)
          }
        })
      } else {
        mvObjectOptions1 = mvObjectOptions
      }

      if (this.state.mvvo[0] == 1) {
        mvSubjectOptions.map((k)=>{
          if (![0,6,10].includes(k['id'])) {
            mvSubjectOptions1 = mvSubjectOptions1.concat(k)
          }
        })
      } else if (this.state.mvvo[0] == 2) {
        mvSubjectOptions.map((k)=>{
          if (![1,7,11].includes(k['id'])) {
            mvSubjectOptions1 = mvSubjectOptions1.concat(k)
          }
        })
      } else {
        mvSubjectOptions1 = mvSubjectOptions
      }
      
    } else {
      mvSubjectOptions1 = mvSubjectOptions
    }

    this.setState({
      mvSubjectOptions1:mvSubjectOptions1,
      mvObjectOptions1:mvObjectOptions1,
    })
    
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //   this.setState({ 
  //     tag: nextProps.entry[0],
  //     baseCases: nextProps.entry[1],
  //     baseWord: nextProps.entry[2],
  //     definition: nextProps.entry[3],

  //     firstVerb: '',
  //     preSubjectText: '',
  //     value1: '',
  //     afterSubjectText: '',
  //     containsIs: '',
  //     primaryVerb: '',
  //     preObjectText: '',
  //     value2: '',
  //     afterObjectText: '',
  //     fstCall: '',
  //     objectPossessed: false,
  //     baseOptions: [],
  //     activeKeyInEditIndex: 0,
  //     entryModified: [],
  //     verbMood: 'Indicative',
  //     nounMood: 'Absolutive',
  //     wordBuilderOn: false,
  //     nounvalue1:'1',
  //     nounvalue2:'00(3)',
  //     activeDefinitionInEditIndex: 0,
  //     pluralizedDefinition: '',
  //     definitionBaseOptions: [],

  //   });  
  //   if (nextProps.entry[0] !== 'n') {
  //     this.setState({ 
  //       firstDefinition: nextProps.entry[3],
  //       firstVerb: nextProps.entry[4],
  //       preSubjectText: nextProps.entry[5][0],
  //       value1: nextProps.entry[5][1],
  //       afterSubjectText: nextProps.entry[5][2],
  //       containsIs: nextProps.entry[5][3],
  //       primaryVerb: nextProps.entry[5][4],
  //       preObjectText: nextProps.entry[5][5],
  //       value2: nextProps.entry[5][6],
  //       afterObjectText: nextProps.entry[5][7],
  //     });
  //   } else {
  //     this.setState({ 
  //       firstDefinition: 'the one '+nextProps.entry[3][0][0],
  //     })
  //   }
  // }
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
  // initialize(tag) {
  //   console.log(tag.state.tag)
  //   if (tag.state.tag !== 'n') {
  //     console.log('hi',this.props)
  //     this.setState({
  //       firstVerb: this.props.entry[4],
  //       preSubjectText: this.props.entry[5][0],
  //       value1: this.props.entry[5][1],
  //       afterSubjectText: this.props.entry[5][2],
  //       containsIs: this.props.entry[5][3],
  //       primaryVerb: this.props.entry[5][4],
  //       preObjectText: this.props.entry[5][5],
  //       value2: this.props.entry[5][6],
  //       afterObjectText: this.props.entry[5][7],
  //     })
  //   }
  // }

  // getFSTParse(fstCall,activeEditIndex,activeKeyInEditIndex) {
  //   console.log(fstCall,activeEditIndex,activeKeyInEditIndex)
  //   let FSTsearch = this.state.definition[activeEditIndex][3][activeKeyInEditIndex] + fstCall
  //   // console.log(FSTsearch,activeEditIndex)

  //   let baseOptions = []
  //   this.state.definition[activeEditIndex][3].map((m,ind)=>{
  //     baseOptions.push({id:ind,value:ind,text:m})
  //   })
  //   this.setState({baseOptions:baseOptions})

  //   console.log(encodeURIComponent(FSTsearch))
  //   axios
  //     .get(API_URL + "/inupiaqsegment/" + encodeURIComponent(FSTsearch))
  //     .then(response => {
  //       console.log(response.data);

  //       this.setState({
  //         entryModified: response.data.words,
  //       });

  //       // if (response.data.chld !== []) {}
  //       // console.log(response.data.etymology)
  //       // if (response.data.etymology !== []) {
  //       //  this.setState({etymology: response.data.etymology[0]})
  //       // }
  //     });
  // }




  // identifySubjectandIsCase = (match) => {

  //   //   console.log('eventually set the object type here, her/him versus it')
  //   // console.log(match)
  //   // if (match == '<her/him>') {
  //   //  if (ind % 2 === 0) {
  //   //    //return him
  //   //  } else {
  //   //    //return her
  //   //  }
  //   // value2 = "o31-1(2)"  him
  //   // value2 = "o31-2(2)"  her
  //   // value2 = "o31-3(2)"  its
  //   // }
  //   let value1 = ''
  //   let containsIs = false
  //   // let value2 = ''
  //   // let possessed = false
  //   // if (ind % 2 == 0) {
  //   // value1 = "s31-2(1)"  
  //   // } else {
  //   // value1 = "s31-1(1)"  
  //   // }
  //   if (match.includes('[he]')) {
  //     value1 = "s31-1(1)"
  //     match = match.replace('[he]','')
  //   } else if (match.includes('[she]')) {
  //     // if (ind % 2 == 0) {
  //     value1 = "s31-2(1)"     
  //     match = match.replace('[she]','')
  //     // } else {
  //     // value2 = "o31-2(2)"
  //     // }
  //   } else if (match.includes('[it]')) {
  //     // if (ind % 2 == 0) {
  //     value1 = "s31-3(1)"     
  //     match = match.replace('[it]','')
  //     // } else {
  //     // value2 = "o31-2(2)"
  //     // }
  //   } else {
  //     value1 = "s31-3(1)"
  //   }
  //   console.log(match)
  //   let matches = match.trim().split(' ')
  //   let definitionraw = ''
  //   console.log(matches)
  //   if (matches[0] == 'is') {
  //     containsIs = true
  //     definitionraw = matches.slice(1,).join(' ')
  //   }

  //   this.setState({
  //     definitionraw:definitionraw,
  //     containsIs:containsIs,
  //   })
  //   return [value1, containsIs, definitionraw]


  // }


  // identifySubjectIsObjectCase = (match) => {
  //   console.log('eventually set the object type here, her/him versus it')
  //   console.log(match)


  //   let matches = this.state.definitionraw.match(/\<.*?\>/g)
  //   let splitSentence = []
  //   if (matches.length == 1) {
  //     splitSentence = this.state.definitionraw.split(matches[0])
  //   }      
      
  //   // if (match == '<her/him>') {
  //   //  if (ind % 2 === 0) {
  //   //    //return him
  //   //  } else {
  //   //    //return her
  //   //  }
  //   // value2 = "o31-1(2)"  him
  //   // value2 = "o31-2(2)"  her
  //   // value2 = "o31-3(2)"  its
  //   // }
  //   let value1 = ''
  //   let value2 = ''
  //   let possessed = false
  //   // if (ind % 2 == 0) {
  //   value1 = "s31-2(1)"  
  //   // } else {
  //   // value1 = "s31-1(1)"  
  //   // }
  //   if (match == '<her/him/it>') {
  //     value2 = "o31-3(2)"
  //   } else if (match == '<her/him>') {
  //     // if (ind % 2 == 0) {
  //     value2 = "o31-1(2)"     
  //     // } else {
  //     // value2 = "o31-2(2)"
  //     // }
  //   } else if (match == '<her/his>') {
  //     // if (ind % 2 == 0) {
  //     value2 = "o31-1(2)"     
  //     // } else {
  //     // value2 = "o31-2(2)"
  //     // }
  //   } else if (match == '<her>') {
  //     value2 = "o31-2(2)"
  //   } else if (match == '<him>') {
  //     value2 = "o31-1(2)"
  //   } else if (match == '<a person/it>') {
  //     value2 = "o31-3(2)"
  //   } else if (match == '<it>') {
  //     value2 = "o31-3(2)"
  //   } else if (match == '<them>') {
  //     value2 = "o33(2)"
  //   } else if (match == '<someone/something>') {
  //     value2 = "o31-3(2)"
  //   } else if (match == '<her/his/its>') {
  //     possessed = true
  //     value2 = "o31-3(2)"
  //   } else {
  //     value2 = "o31-3(2)"     
  //   }
  //   this.setState({objectPossessed:possessed})
  //   return [value1, value2]


  // }


  // defaultFstCall = () => {
  //   console.log(this.state)
  //   let tag = this.state.tag
  //   let value1 = ''
  //   let value2 = ''
  //   let nounvalue1 = ''
  //   let nounvalue2 = ''
  //   let owner = ''
  //   // console.log(tag,ind)
  //   if (tag === 'i') {
  //     // value1 = "s31-1(1)"  
  //     // let items = this.identifySubjectandIsCase(this.state.definition)
  //     // console.log(items)
  //     this.setIntransitive(true,undefined,undefined)
  //     // this.setState({person: 3,people: 1, value1: "31-1(1)",activeEditIndex:ind}); this.getFSTParse(fstCall,ind,0); 
  //   } else if (tag === 'n') {
  //     nounvalue1="1"
  //     nounvalue2="00(3)"
  //     owner = 'Unpd'



  //     let definitionBaseOptions = []
  //     this.state.definition.map((k,index)=>{
  //       definitionBaseOptions.push({value:index,key:index,text:k[0].replace("⟨","").replace("⟩","")})
  //     })
      
  //     this.setState({definitionBaseOptions:definitionBaseOptions})


  //     this.setNoun(true,nounvalue1,nounvalue2,owner,undefined,undefined)
  //   } else if (tag === 't') {
  //     // let values = this.identifySubjectIsObjectCase(this.state.definition)


  //     // console.log(splitSentence[0],splitSentence[1])



  //     // this.setState({
  //       // transitiveLeftOfObject: this.state.,
  //       // transitiveRightOfObject: splitSentence[1].replace("⟨","").replace("⟩",""),
  //       // entryModified: matches[0],
  //     // });
  //     this.setTransitive(true,undefined,undefined)
  //   }
  // }

  // setIntransitive(initializing, e, data) {
  //   console.log(e, data)
  //   // console.log(this.state.definitionraw)
  //   let value1 = this.state.value1
  //   console.log(value1)
  //   if (!initializing) {
  //     value1 = data.value
  //     // person = data.value[0]
  //     // people = data.value[1]
  //   }

  //   let fstCall = ''
  //   if (this.state.verbMood === 'Indicative') {
  //     fstCall = '-[V][Ind][Intr][S_' + value1[1] + peopleDict[value1[2]] + ']'
  //   }

  //   this.setState({
  //     value1: value1,
  //     // activeEditIndex:ind,
  //     // person: person,
  //     // people: people,
  //     fstCall: fstCall,
  //   });

  //   this.getFSTParse(fstCall,this.state.activeKeyInEditIndex)
  // }


  // setNoun(initializing, nounvalue1, nounvalue2, owner, e, data) {
  //   console.log(e,data,initializing,nounvalue1,nounvalue2,owner)
  //   if (!initializing) {
  //     if (data.value.length == 1) {
  //       nounvalue1=data.value
  //       nounvalue2=this.state.nounvalue2
  //     } else {
  //       nounvalue1=this.state.nounvalue1
  //       nounvalue2=data.value 
  //     }

  //     if (nounvalue2[0] !== '0') {
  //       owner = nounvalue2[0]+peopleDict[nounvalue2[1]]+'Poss'
  //     } else {
  //       owner = 'Unpd'
  //     }
  //     console.log(owner)
  //     // value1 = data.value
  //     // person = data.value[0]
  //     // people = data.value[1]
  //   }


  //   let fstCall = ''
  //   console.log(peopleDict[nounvalue1], owner)
  //   if (this.state.nounMood === 'Absolutive') {
  //     if (owner !== 'Unpd') {
  //       fstCall = '-[N][Abs][' + owner + '][' + peopleDict[nounvalue1] + 'Posd]'   
  //     } else {
  //       fstCall = '-[N][Abs][' + peopleDict[nounvalue1] + owner + ']'        
  //     }
  //   }

  //   let definitionBaseOptions = []
  //   this.state.definition.map((k,index)=>{
  //     let sentence = this.state.definition[index][0]
  //     let matches = sentence.match(/\⟨.*?\⟩/g)
  //     if (matches !== null) {
  //       if (nounvalue1 !== '1') {
  //         matches.map((m) => sentence = sentence.replace(m,this.state.definition[index][2][1]))            
  //       } else {
  //         matches.map((m) => sentence = sentence.replace(m,this.state.definition[index][2][0]))            
  //       }
  //     }
  //     // console.log(sentence)
  //     definitionBaseOptions.push({value:index,key:index,text:sentence})
  //   })

  //   this.setState({
  //     nounvalue1: nounvalue1,
  //     nounvalue2: nounvalue2,
  //     value1: "s31-3(1)",
  //     definitionBaseOptions: definitionBaseOptions,
  //     // activeEditIndex:ind,
  //     // person: person,
  //     // people: people,
  //     fstCall: fstCall,
  //   });

  //   this.getFSTParse(fstCall,this.state.activeKeyInEditIndex)
  // }


  // setTransitive(initializing, e, data) {
  //   // console.log(e, data, ind, initializing)
  //   let value1 = this.state.value1
  //   let value2 = this.state.value2
  //   if (!initializing) {
  //     console.log(data.value)
  //     if (data.value[0] == 's') {
  //       value1 = data.value
  //     } else {
  //       value2 = data.value 
  //     }
  //     // person = data.value[0]
  //     // people = data.value[1]
  //   }

  //   let fstCall = ''
  //   if (this.state.verbMood === 'Indicative') {
  //     fstCall = '-[V][Ind][Trns][A_' + value1[1] + peopleDict[value1[2]] + '][P_' + value2[1]+peopleDict[value2[2]] + ']'
  //   }

  //   this.setState({
  //     value1: value1,
  //     value2: value2,
  //     // activeEditIndex:ind,
  //     // person: person,
  //     // people: people,
  //     fstCall: fstCall,
  //   });

  //   this.getFSTParse(fstCall,this.state.activeKeyInEditIndex)
  // }

  // //   if (this.state.nounMood === 'Absolutive') {
  // //    let fstCall = '>+N+Abs+'+
  // //   }

  // //   this.getFSTParse(fstCall,this.state.activeEditIndex,this.state.activeKeyInEditIndex)
  // // }

  // // setNounNumber(e, data) {
  // //  // console.log(data)
  // //   this.setState({
  // //     value1: data.value,
  // //     person: parseInt(data.value[0]),
  // //     people: parseInt(data.value[1])
  // //   });
    
  // //   this.getFSTParse(">+V+Ind+Prs+",data.value[0],data.value[1],this.state.activeEditIndex,this.state.activeKeyInEditIndex)
  // // }

  // changeActiveUsageKey(entry, data) {
  //   console.log(data)
  //   this.setState({
  //     // value1: data.value,
  //     activeKeyInEditIndex:data.value,
  //   });
  //   this.getFSTParse(this.state.fstCall,data.value)
  // }

  // changeActiveDefinitionKey(entry, data) {
  //   console.log(data)
  //   let num = data.value
  //   // console.log(data.options)
  //   this.setState({
  //     // value1: data.value,
  //     activeDefinitionInEditIndex:data.value,
  //     // baseCase: data.options[data.value].text,
  //   });

  //   console.log(this.state.definition[data.value][0])
  //   let sentence = this.state.definition[data.value][0]
  //   let matches = sentence.match(/\⟨.*?\⟩/g)
  //   if (matches !== null) {
  //     matches.map((m) => sentence = sentence.replace(m,m.slice(1,-1)))  
  //   }
  //   console.log(sentence)

  //   this.setState({pluralizedDefinition:sentence})
  //   // console.log(this.state.usageDefinition[data.value][])
  //   // this.getFSTParse(this.state.baseCase,this.state.currentPostbases,this.state.tag,this.state.verbMood,this.state.moodSpecific,this.state.value1,this.state.value2,this.state.nounMood,this.state.nounvalue1,this.state.nounvalue2)
  // }
  

  // getSubjectIs = (personN, peopleN) => {
  //   let subjectis = '';
  //   if (this.state.containsIs) {
  //     if (peopleN === '1' && personN === '1') {
  //       subjectis = 'am'
  //     } else if (peopleN === '1' && personN === '3') {
  //       subjectis = 'is'
  //     } else {
  //       subjectis = 'are'
  //     }      
  //   }
  //   return subjectis
  // };


  // getFSTParse(fstCall,activeKeyInEditIndex) {
  //   console.log(fstCall,activeKeyInEditIndex)
  //   let FSTsearch = this.state.baseCases[activeKeyInEditIndex] + fstCall
  //   console.log(FSTsearch)

  //   let baseOptions = []
  //   this.state.baseCases.map((m,ind)=>{
  //     baseOptions.push({id:ind,value:ind,text:m})
  //   })
  //   this.setState({
  //     baseOptions:baseOptions,
  //     wordBuilderOn: true,
  //   })

  //   console.log(encodeURIComponent(FSTsearch))
  //   axios
  //     .get(API_URL + "/segment/" + encodeURIComponent(FSTsearch))
  //     .then(response => {
  //       console.log(response.data);

  //       this.setState({
  //         entryModified: response.data.words,
  //       });

  //       // if (response.data.chld !== []) {}
  //       // console.log(response.data.etymology)
  //       // if (response.data.etymology !== []) {
  //       //  this.setState({etymology: response.data.etymology[0]})
  //       // }
  //     });
  // }


  // processStyledText = (sentence) => {     
  //   sentence = sentence.replace("⟨","").replace("⟩","")
  //   let matches = sentence.match(/\⎡.*?\⎤/g)
  //   if (matches !== null) {
  //     matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))   
  //     return <span dangerouslySetInnerHTML={{__html: sentence}} />    
  //   } else {
  //     return <span>{sentence}</span>
  //   }
  // }

  // processStyledText2 = (sentence,ind,tag) => {
  //   // console.log(sentence,ind,tag)
  //   sentence = sentence.replace("⟨","").replace("⟩","").replace("<","").replace(">","").replace("[","").replace("]","").replaceAll("^","")
  //   // if (tag == 'NOUN') {
  //   //   sentence = 'the one '+sentence
  //   // } else {
  //   //   if (ind % 2 == 0) {
  //   //   sentence = 'she is '+sentence       
  //   //   } else {
  //   //   sentence = 'he is '+sentence
  //   //   }     
  //   // }
  //   // let matches = sentence.match(/\⎡.*?\⎤/g)
  //   // if (matches !== null) {
  //   //   matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))   
  //   //   return <span dangerouslySetInnerHTML={{__html: sentence}} />    
  //   // } else {
  //     return <span>{sentence}</span>
  //   // }
  // }

  // processStyledText3 = (sentence) => {
  //   // sentence = sentence.replace("⟨","").replace("⟩","")
  //   let matches = sentence.match(/\^.*?\^/g)
  //   let type1 = ''
  //   // let self = sentence.includes('self')
  //   let regSub = ['^he^','^she^','^it^']
  //   let regObj = ['^him^','^she^','^it^']
  //   let self = ['^himself^','^herself^','^itself^']
  //   let poss = ['^her^','^his^','^its^']

  //   if (matches !== null) {
  //     if (regSub.includes(matches[0])) {
  //       type1 = 'regSub'
  //     } else if (regObj.includes(matches[0])) {
  //       type1 = 'regObj'
  //     } else if (self.includes(matches[0])) {
  //       type1 = 'self'
  //     } else if (poss.includes(matches[0])) {
  //       type1 = 'poss'
  //     } 
  //     matches.map((m) => sentence = sentence.replace(m,retrieveReflexiveSubjectPronoun[type1][this.state.value1]))           
  //     return <span dangerouslySetInnerHTML={{__html: sentence}} />    
  //   } else {
  //     return <span>{sentence}</span>
  //   }
  // }


  // usageEntry = (tag) => {
  //   if (tag === 'n') {
  //     return (  
  //             <div>
  //               <div style={{marginTop:'15px', marginLeft:'0px',fontSize:'20px',color:'#000000',fontWeight:'300'}}>
  //               {this.state.entryModified.map((modifiedword, m)=>
  //                 <span>
  //                 {m > 0 ?
  //                   ', '
  //                   :
  //                   null
  //                 }
  //                 {this.state.baseCases.length == 1 ?
  //                   (modifiedword.split('>').map((q,index) =>
  //                     <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>
  //                     ))
  //                   :
  //                   <Dropdown inline scrolling onChange={this.changeActiveUsageKey.bind(this)} text={(modifiedword.split('>').map((q,index) => <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>))} value={this.state.activeKeyInEditIndex} options={this.state.baseOptions} />
  //                 }
  //                 </span>
  //                 )}
  //               <Icon onClick={()=>console.log('hi')} style={{marginLeft:'20px',color:'#8F8F8F',cursor:'pointer'}} name='volume up' />
  //               </div>
  //               <div style={{marginTop:'15px', marginBottom:'15px',marginLeft:'0px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>
  //               <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setNoun.bind(this,false,'','','')} value={this.state.nounvalue2} options={nounoptions1} />
  //               <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setNoun.bind(this,false,'','','')} value={this.state.nounvalue1} options={nounoptions2} />
  //               {this.state.definition.length > 1 ?
  //                 <Dropdown inline scrolling onChange={this.changeActiveDefinitionKey.bind(this)} value={this.state.activeDefinitionInEditIndex} options={this.state.definitionBaseOptions} />
  //                 :
  //                 (this.state.nounvalue1 !== '1' ?
  //                   <span style={{color:'#777777'}}>{this.processStyledText(this.state.definition[this.state.activeDefinitionInEditIndex][2][1])}</span>
  //                   :
  //                   <span style={{color:'#777777'}}>{this.processStyledText(this.state.definition[this.state.activeDefinitionInEditIndex][2][0])}</span>
  //                 )
  //               }

  //               </div>
  //             </div>    
  //           )
  //   } else if (tag === 'i') {
  //     return (  
  //             <div>
  //               <div style={{marginTop:'15px', marginLeft:'0px',fontSize:'20px',color:'#000000',fontWeight:'300'}}>
  //               {this.state.entryModified.map((modifiedword, m)=>
  //                 <span>
  //                 {m > 0 ?
  //                   ', '
  //                   :
  //                   null
  //                 }
  //                 {this.state.baseCases.length == 1 ?
  //                   (modifiedword.split('>').map((q,index) =>
  //                     <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>
  //                     ))
  //                   :
  //                   <Dropdown inline scrolling onChange={this.changeActiveUsageKey.bind(this)} text={(modifiedword.split('>').map((q,index) => <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>))} value={this.state.activeKeyInEditIndex} options={this.state.baseOptions} />
  //                 }
  //                 </span>
  //                 )}
  //               <Icon onClick={()=>console.log('hi')} style={{marginLeft:'20px',color:'#8F8F8F',cursor:'pointer'}} name='volume up' />
  //               </div>
  //               <div style={{marginTop:'3px', marginBottom:'15px',marginLeft:'0px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>
  //               <span style={{color:'#777777'}}>{this.processStyledText(this.state.preSubjectText)}</span>
  //               <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setIntransitive.bind(this, false)} value={this.state.value1} options={options1} />
  //               <span style={{color:'#777777'}}>{this.getSubjectIs(this.state.value1[1],this.state.value1[2])+" "}</span>
  //               <span style={{color:'#777777'}}>{this.processStyledText(this.state.primaryVerb+" ")}</span>
  //               <span style={{color:'#777777'}}>{this.processStyledText3(this.state.preObjectText+" ")}</span>
  //               <span style={{color:'#777777'}}>{this.processStyledText3(this.state.afterObjectText+" ")}</span>
  //               </div>
  //             </div>    
  //           )
  //   } else if (tag === 't') {
  //     return (  
  //             <div>
  //               <div style={{marginTop:'15px', marginLeft:'0px',fontSize:'20px',color:'#000000',fontWeight:'300'}}>
  //               {this.state.entryModified.map((modifiedword, m)=>
  //                 <span>
  //                 {m > 0 ?
  //                   ', '
  //                   :
  //                   null
  //                 }
  //                 {this.state.baseCases.length == 1 ?
  //                   (modifiedword.split('>').map((q,index) =>
  //                     <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>
  //                     ))
  //                   :
  //                   <Dropdown inline scrolling onChange={this.changeActiveUsageKey.bind(this)} text={(modifiedword.split('>').map((q,index) => <span style={{color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>))} value={this.state.activeKeyInEditIndex} options={this.state.baseOptions} />
  //                 }
  //                 </span>
  //                 )}
  //               <Icon onClick={()=>console.log('hi')} style={{marginLeft:'20px',color:'#8F8F8F',cursor:'pointer'}} name='volume up' />
  //               </div>
  //               <div style={{marginTop:'3px', marginBottom:'15px',marginLeft:'0px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>
  //               <span style={{color:'#777777'}}>{this.processStyledText(this.state.preSubjectText+" ")}</span>
  //               <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setTransitive.bind(this,false)} value={this.state.value1} options={options1} />
  //               <span style={{color:'#777777'}}>{this.getSubjectIs(this.state.value1[1],this.state.value1[2])+" "}</span>
  //               <span style={{color:'#777777'}}>{this.processStyledText(this.state.primaryVerb+" ")}</span>
  //               <span style={{color:'#777777'}}>{this.processStyledText3(this.state.preObjectText+" ")}</span>
  //               {this.state.objectPossessed ?
  //                 <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setTransitive.bind(this,false)} value={this.state.value2} options={options3} />
  //                 :
  //                 <Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setTransitive.bind(this,false)} value={this.state.value2} options={options2} />
  //               }
  //               <span style={{color:'#777777'}}>{this.processStyledText3(this.state.afterObjectText)}</span>
  //               </div>
  //             </div>    
  //           )     
  //   }
  // }


  render() {
    // console.log(this.state)

    // console.log(mvSubjectOptions)
    // console.log(mvObjectOptions)

    // let numEntries = Object.keys(this.state.fullWord).filter((entryNumber) => {
    //   return entryNumber !== 'english' && entryNumber !== 'yupik';
    // }).length;
    return (
      <div>

      {this.state.mvvBase.length > 0 && this.state.mvvSegments.length > 0 ?
        <div style={{marginTop:'13px', marginBottom:'20px',marginLeft:'15px'}}>
        <div style={{marginBottom:10,fontSize:'22px',color:'#000000',fontWeight:'400'}}>
          <div style={{cursor:'pointer',lineHeight:'35px',marginLeft:'2px'}}>
            {this.state.mvvSegments.map((t)=>
              <span style={{color:colorsList[this.state.colorScheme][t[1]]}}>{t[0]}</span>
            )}
          </div>
        </div>

        <div style={{marginTop:'10px', marginBottom:'20px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>          
        {this.state.mvEnglish1.map((w,wind)=>{
          return <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]+" "}</span>
        })}
        {this.state.mvvs.length > 0 ?
          <Dropdown inline scrolling style={{border:'solid 1px #22242626',color:'#852828',fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={this.state.mvSubjectOptions1} />
          :
          null
        }
        {this.state.mvEnglish2.map((w,wind)=>{
          return <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]+" "}</span>
        })}   

        {this.state.mvvo.length > 0 ?
          (this.state.mvvBase[1] == 'it' ?
            (this.state.mvEnglishAbl.map((w,wind)=>
              <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]}</span>
            ))
            :
            <Dropdown inline scrolling style={{border:'solid 1px #22242626',color:'#c84141',fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={this.state.mvObjectOptions1} />
          )
          :
          null
        }

        {this.state.mvEnglish3.map((w,wind)=>{
          return <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]+" "}</span>
        })}
        </div>

        <div style={{}}>
        <Link to={{pathname: '/sentencebuilder/2', state: { mv: this.state.mv }}}>
          <Button basic compact style={{fontSize:'16px',fontWeight:'300'}}>
          <div style={{display:'flex',flexDirection:'column',fontFamily:customFontFam}}>
          Try Word Builder
          </div>
          </Button>
        </Link>
        </div>

        </div>
        :
        null
      }


      {this.state.npnSegments.length > 0 && this.state.npnSegments.length === this.state.npn.length ?
        <div style={{marginTop:'13px', marginBottom:'20px',marginLeft:'15px'}}>
          <div style={{marginBottom:10,fontSize:'22px',fontWeight:'400'}}>
            <div style={{lineHeight:'35px',marginLeft:'2px'}}>

              {this.state.npnSegments.slice().reverse()[0][0].map((t)=>
                <span style={{color:colorsList[this.state.colorScheme][t[1]]}}>{t[0]}</span>
              )}

            </div>
          </div>



          <span>
            <div style={{marginTop:'10px', marginBottom:'20px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>          
            {this.state.npnEnglish1.map((w,wind)=>
              <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]+" "}</span>
              )}
            <Dropdown inline scrolling style={{border:'solid 1px #22242626',color:'#5c5c5c',fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1,0],(data.value+this.state.npn[this.state.npnSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.npn[this.state.npnSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsMVPossessorsThe} />
            <Dropdown inline scrolling style={{border:'solid 1px #22242626',color:'#852828',fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1,0],this.state.npn[this.state.npnSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.npn[this.state.npnSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />                                
            {this.state.npnEnglish2[0].map((w,wind)=>
              (w.map((t)=> <span style={{color:colorsList[this.state.colorScheme][t[1]]}}>{t[0]+" "}</span>))
              )}
            </div>
          </span>

          <div style={{}}>
          <Link to={{pathname: '/sentencebuilder/2', state: { np: this.state.np }}}>
            <Button basic compact style={{fontSize:'16px',fontWeight:'300'}}>
            <div style={{display:'flex',flexDirection:'column',fontFamily:customFontFam}}>
            Try Word Builder
            </div>
            </Button>
          </Link>
          </div>
        </div>

          :
          null
      }



      </div>
    );
  }
}

export default withRouter(SimpleWordBuilderUpdated);
