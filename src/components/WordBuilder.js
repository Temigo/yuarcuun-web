import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Image, Grid, Dropdown, List, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../App.js';
import axios from 'axios';
import {nounoptions1, nounoptions2, nounoptionsmodalis, options1, options2, verbPostbases, nounPostbases} from './constants/newconstants.js'
import {ending_underlying} from './constants/ending_underlying.js'
import palette from 'google-palette';
import shuffle from 'shuffle-array';
import { TagColors } from './SearchPageHelpers.js';

let peopleDict = {
	'1':"Sg",
	'2':"Du",
	'3':"Pl",
}
let notis = [1,2,7,10]
let future = [1,2]
let nextinfinitive = [1,2,6,8,9,11]
let matchCase = [3,4,5,12]

let pastwas = [8,9]
let pastdid = [4] // becomes inf
let pastVerbTense = [3,5,12]
let pastGerund = [7,10]
let doesis = [7,10]

let beingnotis = [1,2,7,10]
let befirst = [1,2,6,8,9,11]
let beingfirst = [7,10]

let beingwas = [3,4,5,8,9,12]

// let nounPostbaseDefaultNoNV = [13,14,15,16]
let verbPostbaseParticipialDefault = [3,4,5,6,7,8,9,10,11,12]
let verbPostbaseDefault = [1,2,3,4,5,6,7,8,9,10,11,12]
let nnpostbases = [13,14,15,16]
let nounPostbaseDefault = [13,14,15,16,17,18,19,20,21,22,23,24,25]
let nounToVerb = [17,18,19,20,21,22,23,24,25]
let nvNoIs = [20,21,22]

let getVerbInfo = {
	0:{'inup':'','eng':'',text:'past tense'},
	1:{'inup':'','eng':'',text:'question: yes or no?'},
	2:{'inup':'summan ','eng':'why ',text:'question: why?'},
	3:{'inup':'qanuq ','eng':'how ',text:'question: how?'},
	4:{'inup':'sumi ','eng':'at where ',text:'question: where at?'},
	5:{'inup':'sumun ','eng':'to where ',text:'question: to where?'},
	6:{'inup':'sumiñ ','eng':'from where ',text:'question: from where?'},
}


let nounQuestionWords = [
	{value:0,key:0,text:'at (localis)'},
	{value:1,key:1,text:'toward (terminalis)'},
	{value:2,key:2,text:'from (ablative)'},
	{value:3,key:3,text:'like (similaris)'},
	{value:4,key:4,text:'the (relative)'},
	{value:5,key:5,text:'a, some (modalis)'},
	// {value:6,key:6,text:'through, using (vialis)'},
]

let getNounInfo = {
	0:{'inup':'','eng':'at ',text:'Localis',buttontext:'at (localis)'},
	1:{'inup':'','eng':'toward ',text:'Terminalis',buttontext:'toward (terminalis)'},
	2:{'inup':'','eng':'from ',text:'Ablative',buttontext:'from (ablative)'},
	3:{'inup':'','eng':'like ',text:'Similaris',buttontext:'like (similaris)'},
	4:{'inup':'','eng':'',text:'Relative',buttontext:'the (relative)'},
	5:{'inup':'','eng':'',text:'Modalis',buttontext:'a, some (modalis)'},
	// 6:{'inup':'','eng':'',text:'Vialis',buttontext:'through, using (vialis)'},
	// 2:{'inup':'summan ','eng':'why ',text:'question: why?'},
	// 3:{'inup':'qanuq ','eng':'how ',text:'question: how?'},
	// 4:{'inup':'sumi ','eng':'at where ',text:'question: where at?'},
	// 5:{'inup':'sumun ','eng':'to where ',text:'question: to where?'},
	// 6:{'inup':'sumiñ ','eng':'from where ',text:'question: from where?'},
}



let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"
let letterbutton = {paddingTop:'10px',paddingBottom:'10px',paddingRight:'14px',paddingLeft:'14px'}

let nounvalue1def = '1'
let nounvalue2def = '00(3)'
let value1def = 's31-3(1)'
let value2def = 'o31-3(2)'

class WordBuilder extends Component {
	constructor(props) {
		// console.log(props)
		super(props);
		this.state = {
			// show: false,
			// word: decodeURI(props.match.params.word),
			// word: 'nakuu-',
			entryModified:[],
			activeKeyInEditIndex: props.location.state === undefined ? 0 : props.location.state.activeKeyInEditIndex,
			activeDefinitionInEditIndex: 0,
			usageDefinition: props.location.state === undefined ? '' : props.location.state.usageDefinition,
			baseUsageWord: props.location.state === undefined ? 'pissurtuq' : props.location.state.word,
			baseCase: props.location.state === undefined ? '' : props.location.state.baseCase,
			pluralizedDefinition:'',
			tag: '',
			baseTag: '',
			otherBases: [],
			entryUrl: '',
			nounMood: 'Absolutive',
			verbMood: 'Indicative',
			baseOptions: [],
			definitionBaseOptions: [],
			postbaseInformationAvailable1: [],
			postbaseInformationAvailable2: [],
			postbasesAvailable: [],
			postbaseMaster: {},
			allPostbasesAvailable: [],
			colorsList: shuffle(palette('tol-rainbow', 30).map((c) => { return '#' + c; })),
			// url: 

			subjectIs:'is ',
			subject:'it',
			people: 1,
			person: 3,
			nounvalue1: props.location.state === undefined ? nounvalue1def : props.location.state.nounvalue1,
			nounvalue2: props.location.state === undefined ? nounvalue2def : props.location.state.nounvalue2,
			value1: props.location.state === undefined ? value1def : props.location.state.value1,
			value2: props.location.state === undefined ? value2def : props.location.state.value2,
			sisters: [],


      firstVerb: '',
      definitionraw: '',
      preSubjectText: '',
      value1: '',
      afterSubjectText: '',
      containsIs: '',
      primaryVerb: '',
      preObjectText: '',
      value2: '',
      afterObjectText: '',
      startingVerbTense: -1,

			currentPostbases: [],
			availablePostbaseInformationText: [],
			usageVerbTenses: [],

			// activeKeyInEditIndex: 0,
			transitiveLeftOfObject:'',
			transitiveRightOfObject:'',
			englishPreVerb:[],
			englishPreSubject: [],
			englishPreNoun:[],
			englishPreNounOptions:'',
			leftOfVerb: '',
			rightOfVerb: '',
			primaryNoun: '',
			primaryVerb: '',
			primaryVerbBase: '',
			bePreVerb: '',
			beforeSubject: '',
			questionMark: '',
			questionWord: '',
			questionWordEnglish: '',
			moodSpecific: '',
			endingNumber: -1,
			hasFuture: false,
			underlyingCallReturn: [],
			postbase1: -1,
			postbase2: -1,
			ending1: -1,

			objectPossessed: false,
		}

	    this.getWord = this.getWord.bind(this);
	    this.addPostbase = this.addPostbase.bind(this);
	    this.getWord(decodeURI(props.match.params.word),-1);
	    this.setNoun = this.setNoun.bind(this);
	    this.setIntransitive = this.setIntransitive.bind(this);
	    
	}

  // identifyObjectCase = (match) => {
  // 	console.log('eventually set the object type here, her/him versus it')
  // 	let ind = Math.round(Math.random())
		// let value1 = ''
		// let value2 = ''
		// let possessed = false
		// if (ind % 2 == 0) {
		// value1 = "s31-2(1)"  
		// } else {
		// value1 = "s31-1(1)"  
		// }
		// if (match == '<her/him/it>') {
  // 		value2 = "o31-3(2)"
		// } else if (match == '<her/him>') {
  // 		if (ind % 2 == 0) {
  // 		value2 = "o31-1(2)"			
  // 		} else {
  // 		value2 = "o31-2(2)"
  // 		}
		// } else if (match == '<her/his>') {
  // 		if (ind % 2 == 0) {
  // 		value2 = "o31-1(2)"			
  // 		} else {
  // 		value2 = "o31-2(2)"
  // 		}
		// } else if (match == '<her>') {
  // 		value2 = "o31-2(2)"
		// } else if (match == '<him>') {
  // 		value2 = "o31-1(2)"
		// } else if (match == '<a person/it>') {
  // 		value2 = "o31-3(2)"
		// } else if (match == '<it>') {
  // 		value2 = "o31-3(2)"
		// } else if (match == '<them>') {
  // 		value2 = "o33(2)"
		// } else if (match == '<someone/something>') {
  // 		value2 = "o31-3(2)"
		// } else if (match == '<her/his/its>') {
		// 	possessed = true
  // 		value2 = "o31-3(2)"
		// } else {
  // 		value2 = "o31-3(2)"			
		// }
		// this.setState({objectPossessed:possessed})
		// this.setState({value1:value1,value2:value2})
  // }


	defaultFstCall = (tag) => {
		// console.log(ind)
		console.log(tag)
		this.setState({baseTag: tag})
		if (tag === 'i') {
			this.setIntransitive(true,undefined,undefined)
			// this.setState({person: 3,people: 1, value1: "31-1(1)",activeEditIndex:ind}); this.getFSTParse(fstCall,ind,0); 
			// let verbTenseMatch = this.state.usageDefinition.match(/\⟨.*?\⟩/g)
			// let splitAroundVerb = []
			// if (verbTenseMatch.length == 1) {
			// 	splitAroundVerb = this.state.usageDefinition.split(verbTenseMatch[0])
			// }
			// this.setState({
			// 	leftOfVerb: splitAroundVerb[0],
			// 	rightOfVerb: splitAroundVerb[1],
			// 	primaryVerb: verbTenseMatch[0].replace("⟨","").replace("⟩",""),
			// 	primaryVerbBase: verbTenseMatch[0].replace("⟨","").replace("⟩",""),
			// })

		} else if (tag === 'n') {
			this.setNoun(true,undefined,undefined)
			// this.setState({
			// 	primaryNoun: this.state.usageDefinition,
			// })			
		} else if (tag === 't') {
			// let matches = this.state.usageDefinition.match(/\<.*?\>/g)
			// let splitSentence = []
			// if (matches.length == 1) {
			// 	splitSentence = this.state.usageDefinition.split(matches[0])
			// }
			// this.identifyObjectCase(matches[0])
			// // let leftOfObject = splitSentence[0]
			// let verbTenseMatch = splitSentence[0].match(/\⟨.*?\⟩/g)
			// let splitLeftOfObject = []
			// if (verbTenseMatch.length == 1) {
			// 	splitLeftOfObject = splitSentence[0].split(verbTenseMatch[0])
			// }
			// this.setState({
			// 	leftOfVerb: splitLeftOfObject[0],
			// 	rightOfVerb: splitLeftOfObject[1],
			// 	primaryVerb: verbTenseMatch[0].replace("⟨","").replace("⟩",""),
			// 	primaryVerbBase: verbTenseMatch[0].replace("⟨","").replace("⟩",""),
			// 	transitiveRightOfObject: splitSentence[1],
			// 	// entryModified: matches[0],
			// });
			this.setTransitive(true,undefined,undefined)
		}

		if (tag === 'n') {
			let postbaseInformationAvailable = []
			nounPostbaseDefault.map((a)=>{
				postbaseInformationAvailable.push({value:a,key:a,text:nounPostbases[a].description})
			})

			let definitionBaseOptions = []
			this.state.usageDefinition.map((k,index)=>{
				definitionBaseOptions.push({value:index,key:index,text:k[0].replace("⟨","").replace("⟩","")})
			})
			
			this.setState({definitionBaseOptions:definitionBaseOptions})
			this.setState({postbasesAvailable:nounPostbaseDefault})
			this.setState({allPostbasesAvailable:nounPostbaseDefault})
			this.setState({postbaseMaster:nounPostbases})
			this.setState({postbaseInformationAvailable1:postbaseInformationAvailable})
		} else {
			let postbaseInformationAvailable = []
			verbPostbaseDefault.map((a)=>{
				postbaseInformationAvailable.push({value:a,key:a,text:verbPostbases[a].description})
			})
			this.setState({postbasesAvailable:verbPostbaseDefault})
			this.setState({allPostbasesAvailable:verbPostbaseDefault})
			this.setState({postbaseMaster:verbPostbases})
			this.setState({postbaseInformationAvailable1:postbaseInformationAvailable})
		}

		let baseOptions = []

		let otherBases = this.state.otherBases
		const index = otherBases.indexOf(this.state.baseCase);
		otherBases.splice(index,1)

		baseOptions.push({id:0,value:0,text:this.state.baseCase})

		otherBases.map((m,ind)=>{
			baseOptions.push({id:ind+1,value:ind+1,text:m})
		})
		this.setState({baseOptions:baseOptions})
	}


  getWord(word,num) {
  	// console.log(this.state.baseCase,this.state.activeKeyInEditIndex)
  	this.setState({
			nounvalue1: nounvalue1def,
			nounvalue2: nounvalue2def,
			value1: value1def,
			value2: value2def,
			verbMood: 'Indicative',
			nounMood: 'Absolutive',
			currentPostbases: [],
			englishPreVerb: [],
			primaryNoun: '',
			englishPreNounOptions:'',
			postbase1: -1,
			postbase2: -1,
		})

    axios
      .get(API_URL + "/yupikusage/" + encodeURIComponent(word))
      .then(response => {
        console.log(response.data);
        let tag;
        if (num === -1) {
        	// console.log(response.data[Object.keys(response.data)[0]])
	        this.setState({
	          usageDefinition: response.data['key'][3],	
	          baseUsageWord: response.data['key'][2],	
	          // otherBases: response.data['key'].otherBases,
	          baseCase: response.data['key'][1],
	          entryUrl: response.data['key'][2],	
	          tag: response.data['key'][0],	
	          sisters: response.data['sisters'],

	      	})

	        if (response.data['key'].length > 4) {
	        this.setState({
	          usageVerbTenses: response.data['key'][4],
	          startingVerbTense: response.data['key'][4].indexOf(response.data['key'][5][4]),
			      definitionraw: response.data['key'][5] === undefined ? '' : response.data['key'][5],
			      preSubjectText: response.data['key'][5] === undefined ? '' : response.data['key'][5][0],
			      value1: response.data['key'][5] === undefined ? '' :response.data['key'][5][1],
			      afterSubjectText: response.data['key'][5] === undefined ? '' :response.data['key'][5][2],
			      containsIs: response.data['key'][5] === undefined ? '' :response.data['key'][5][3],
			      primaryVerbBase: response.data['key'][5] === undefined ? '' :response.data['key'][5][4],
			      preObjectText: response.data['key'][5] === undefined ? '' :response.data['key'][5][5],
			      value2: response.data['key'][5] === undefined ? '' :response.data['key'][5][6],
			      afterObjectText: response.data['key'][5] === undefined ? '' :response.data['key'][5][7],

	      	})	        	
	        }
	      	// console.log(index)
	        tag = response.data['key'][0]
	      }
        // } else {
        	// console.log(response.data[this.state.num])        
	       //  this.setState({
	       //    otherBases: response.data[this.state.activeKeyInEditIndex].otherBases,	
	       //    entryUrl: response.data[this.state.activeKeyInEditIndex].url,	
	       //    tag: response.data[this.state.activeKeyInEditIndex].tag,	
	       //    sisters: response.data[this.state.activeKeyInEditIndex].sisters,
	       //    usageVerbTenses: response.data[this.state.activeKeyInEditIndex].usageVerbTenses
	      	// })
	       //  tag = response.data[this.state.activeKeyInEditIndex].tag
        // }   

        this.setState({
          entryData: response.data,
        });
        // console.log(tag)
        this.defaultFstCall(tag)
        // if (tag == 'NOUN') {
        // 	this.setNoun(this,true)
        // } else if (tag == 'INTRANSITIVE VERB') {
        // 	this.setIntransitive(this,true)
        // }
        
      });
  }


  setIntransitive(initializing, e, data) {
  	// console.log(e, data)
  	let value1;
  	let tag = 'i'
  	// let verbMood = 'Indicative'

  	if (initializing) {
  		let ind = Math.round(Math.random())
  		if (ind % 2 == 0) {
  		value1 = "s31-2(1)"  			
  		} else {
  		value1 = "s31-1(1)"   
  		}

  		// person = 
  		// people = 
  	} else {
  		value1 = data.value
  		// person = data.value[0]
  		// people = data.value[1]
  	}

  	// let fstCall = ''
   //  if (verbMood === 'Indicative') {
   //  	fstCall = '>+V+Ind+Prs+' + value1[1] + peopleDict[value1[2]]
   //  }

    this.setState({
      value1: value1,
      // activeEditIndex:ind,
      // person: person,
      // people: people,
      // fstCall: fstCall,
    });

    if (this.state.baseTag === 'n') {
    	this.setEnglishNoun(this.state.currentPostbases,value1,'',this.state.nounMood)
    } else {
    	this.setEnglish(this.state.currentPostbases,value1,'',this.state.verbMood,this.state.moodSpecific)
    }
    
    this.getFSTParse(this.state.baseCase,this.state.currentPostbases,tag,this.state.verbMood,this.state.moodSpecific,value1,'',this.state.nounMood,[],[])
  }

  setTransitive(initializing, e, data) {
  	// console.log(e, data, ind, initializing)
  	let value1, value2;
  	if (initializing) {
  		// if (ind % 2 == 0) {
  		value1 = this.state.value1 			
  		// } else {
  		// value1 = "s31-1(1)"  
  		// }
  		value2 = this.state.value2
  		// person = 
  		// people = 
  	} else {
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

  	// let fstCall = ''
   //  if (this.state.verbMood === 'Indicative') {
   //  	fstCall = '>+V+Ind+Prs+' + value1[1] + peopleDict[value1[2]] + '+' + value2[1]+peopleDict[value2[2]] + 'O'
   //  }

    this.setState({
      value1: value1,
      value2: value2,
      // activeEditIndex:ind,
      // person: person,
      // people: people,
      // fstCall: fstCall,
    });

    this.setEnglish(this.state.currentPostbases,value1,value2,this.state.verbMood,this.state.moodSpecific)
    this.getFSTParse(this.state.baseCase,this.state.currentPostbases,this.state.tag,this.state.verbMood,this.state.moodSpecific,value1,value2,this.state.nounMood,[],[])
  }


	// getSubjectIs = (personN, peopleN) => {
	//   let subjectis = '';
	//   if (this.state.currentPostbases.length > 0) {
	// 	  if (!notis.includes(this.state.currentPostbases[0])) {
	// 		  if (peopleN === '1' && personN === '1') {
	// 		    subjectis = 'am '
	// 		  } else if (peopleN === '1' && personN === '3') {
	// 		    subjectis = 'is '
	// 		  } else {
	// 		    subjectis = 'are '
	// 		  }	  	
	// 	  }  	
	//   } else {
	// 	  if (peopleN === '1' && personN === '1') {
	// 	    subjectis = 'am '
	// 	  } else if (peopleN === '1' && personN === '3') {
	// 	    subjectis = 'is '
	// 	  } else {
	// 	    subjectis = 'are '
	// 	  }	 	  	
	//   }
 //    this.setState({
 //      person: parseInt(personN),
 //      people: parseInt(peopleN),
 //      subjectIs: subjectis,
 //      })	 
	// };

	getIs = (personN, peopleN,capitalize) => {
		// console.log()
		let subjectis = '';
		if (capitalize) {
			if (peopleN === '1' && personN === '1') {
		    subjectis = 'Am '
		  } else if (peopleN === '1' && personN === '3') {
		    subjectis = 'Is '
		  } else {
		    subjectis = 'Are '
		  }				
		} else {
			if (peopleN === '1' && personN === '1') {
		    subjectis = 'am '
		  } else if (peopleN === '1' && personN === '3') {
		    subjectis = 'is '
		  } else {
		    subjectis = 'are '
		  }	
		}
	  return subjectis
	}

	getDo = (personN, peopleN,capitalize) => {
		let subjectis = '';
		if (capitalize) {
		  if (peopleN === '1' && personN === '1') {
		    subjectis = 'Do '
		  } else if (peopleN === '1' && personN === '3') {
		    subjectis = 'Does '
		  } else {
		    subjectis = 'Do '
		  }
		} else {
		  if (peopleN === '1' && personN === '1') {
		    subjectis = 'do '
		  } else if (peopleN === '1' && personN === '3') {
		    subjectis = 'does '
		  } else {
		    subjectis = 'do '
		  }
		}
		return subjectis
	}

  setNoun(initializing, e, data) {
  	console.log(e,data,initializing)
  	let nounvalue1, nounvalue2, owner;
  	if (initializing) {
  		nounvalue1=this.state.nounvalue1
  		nounvalue2=this.state.nounvalue2
  		// owner = '+'+this.state.nounvalue2[0]+peopleDict[this.state.nounvalue2[1]]
  		// person = 
  		// people = 
  	} else {
  		if (data.value.length == 1) {
	  		nounvalue1=data.value
	  		nounvalue2=this.state.nounvalue2
  		} else {
	  		nounvalue1=this.state.nounvalue1
	  		nounvalue2=data.value	
  		}

  		// console.log(owner)
  		// value1 = data.value
  		// person = data.value[0]
  		// people = data.value[1]
  	}

	// if (nounvalue2[0] !== '0') {
	// 	owner = '+'+nounvalue2[0]+peopleDict[nounvalue2[1]]
	// } else {
	// 	owner = ''
	// }

 //  	let fstCall = ''
 //    if (this.state.nounMood === 'Absolutive') {
 //    	fstCall = '>+N+Abs+' + peopleDict[nounvalue1] + owner
 //    }

    this.setState({
      nounvalue1: nounvalue1,
      nounvalue2: nounvalue2,
      // activeEditIndex:ind,
      // person: person,
      // people: people,
      // fstCall: fstCall,
    });

    let definitionBaseOptions = []
		this.state.usageDefinition.map((k,index)=>{
	    let sentence = this.state.usageDefinition[index][0]
			let matches = sentence.match(/\⟨.*?\⟩/g)
			if (matches !== null) {
				if (nounvalue1 !== '1') {
					matches.map((m) => sentence = sentence.replace(m,this.state.usageDefinition[index][2][1]))						
				} else {
					matches.map((m) => sentence = sentence.replace(m,this.state.usageDefinition[index][2][0]))						
				}
			}
			// console.log(sentence)
			definitionBaseOptions.push({value:index,key:index,text:sentence})
		})
		
		this.setState({definitionBaseOptions:definitionBaseOptions})

    this.setEnglishNoun(this.state.currentPostbases,nounvalue1,nounvalue2,this.state.nounMood)
    this.getFSTParse(this.state.baseCase,this.state.currentPostbases,this.state.tag,this.state.verbMood,this.state.moodSpecific,[],[],this.state.nounMood,nounvalue1,nounvalue2)
  }




	usageEntry = (ind,tag) => {
		// console.log(ind,tag)
		if (tag === 'n') {
			return (	
							<div>
								<div style={{marginTop:'30px',marginBottom:'10px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
								{this.state.entryModified.map((modifiedword, m)=>
									<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
										{this.state.otherBases.length == 0 ?
											(modifiedword.split('>').map((q,index) =>
												<span style={{color:(index === 0 ? '#000000': (modifiedword.split(">").length-1 == index ? '#852828' : this.state.colorsList[this.state.currentPostbases[this.state.currentPostbases.length-index]]))}}>{q}</span>
												))
											:
											<Dropdown inline scrolling onChange={this.changeActiveUsageKey.bind(this)} text={(modifiedword.split('>').map((q,index) => <span style={{fontWeight:'400',color:(modifiedword.split(">").length-1 == index ?'#852828':'#000000')}}>{q}</span>))} value={this.state.activeDefinitionInEditIndex} options={this.state.baseOptions} />
										}
									</div>
									)}
								</div>

								<div style={{display:'flex',justifyContent:'center',fontSize:'20px',marginBottom:'15px',fontWeight:'300'}}> 
								<span style={{padding:'10px'}}>
									{this.state.baseCase+'-'}
								</span>
								{this.state.underlyingCallReturn.map((x,xind)=>
									(x[0] == '' ? 
										null
										:
										<span style={{padding:'10px',color:(xind == this.state.underlyingCallReturn.length - 1 ? '#852828' : this.state.colorsList[this.state.currentPostbases[this.state.currentPostbases.length-xind-1]])}}>
										{x.join(', ')}
										</span>			
									)
								)}
								</div>

								<div style={{textAlign:'center',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>
								<span style={{color:'#852828'}}>{this.state.englishPreNounOptions}</span>
								{this.state.nounMood === 'Modalis' ?
								<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setNoun.bind(this,false)} value={this.state.nounvalue2} options={nounoptionsmodalis} />
								:
								<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setNoun.bind(this,false)} value={this.state.nounvalue2} options={nounoptions1} />
								}
								<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setNoun.bind(this,false)} value={this.state.nounvalue1} options={nounoptions2} />
								{this.state.englishPreNoun.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[this.state.currentPostbases[wind]]}}>{w}</span>
								})}
								{this.state.usageDefinition.length > 1 ?
									<Dropdown inline scrolling onChange={this.changeActiveDefinitionKey.bind(this)} value={this.state.activeDefinitionInEditIndex} options={this.state.definitionBaseOptions} />
									:
									(this.state.nounvalue1 !== '1' ?
										<span style={{color:'#777777'}}>{this.processStyledText(this.state.usageDefinition[this.state.activeDefinitionInEditIndex][2][1])}</span>
										:
										<span style={{color:'#777777'}}>{this.processStyledText(this.state.usageDefinition[this.state.activeDefinitionInEditIndex][2][0])}</span>
									)
								}
								</div>
							</div>		
						)
		} else if (tag === 'i') {
			return (	
							<div>
								<div style={{marginTop:'30px',marginBottom:'10px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
								{this.state.entryModified.map((modifiedword, m)=>
									<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									<span style={{color:'#852828','paddingRight':'5px'}}>{this.state.questionWord}</span>
									{this.state.otherBases.length == 0 ?
										(modifiedword.split('>').map((q,index) =>
											<span style={{color:(index === 0 ? '#000000': (modifiedword.split(">").length-1 == index ? '#852828' : this.state.colorsList[this.state.currentPostbases[this.state.currentPostbases.length-index]]))}}>{q}</span>
											))
										:
										<Dropdown inline scrolling onChange={this.changeActiveUsageKey.bind(this)} text={(modifiedword.split('>').map((q,index) => <span style={{fontWeight:'400',color:(modifiedword.split(">").length-1 == index ?'#852828':this.state.colorsList[this.state.currentPostbases[this.state.currentPostbases.length-index]])}}>{q}</span>))} value={this.state.activeKeyInEditIndex} options={this.state.baseOptions} />
									}
									<span style={{color:'#852828'}}>{' '+this.state.questionMark}</span>									
									</div>
									)}
								</div>

								<div style={{display:'flex',justifyContent:'center',fontSize:'20px',marginBottom:'15px',fontWeight:'300'}}> 
								<span style={{padding:'10px'}}>
									{this.state.baseCase+'-'}
								</span>
								{this.state.underlyingCallReturn.map((x,xind)=>
									<span style={{padding:'10px',color:(xind == this.state.underlyingCallReturn.length - 1 ? '#852828' : this.state.colorsList[this.state.currentPostbases[this.state.currentPostbases.length-xind-1]])}}>
									{x.join(', ')}
									</span>			
								)}
								</div>

								<div style={{textAlign:'center',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>
								<span style={{color:'#852828'}}>{this.processStyledText(this.state.questionWordEnglish)}</span>
								{this.state.englishPreSubject.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[this.state.currentPostbases[wind]]}}>{w}</span>
								})}
								<span style={{color:'#777777'}}>{this.state.preSubjectText}</span>
								<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setIntransitive.bind(this,false)} value={this.state.value1} options={options1} />
								<span style={{color:'#777777'}}>{this.state.afterSubjectText}</span>
								<span style={{color:'#777777'}}>{this.state.subjectIs}</span>
								{this.state.englishPreNoun.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[this.state.currentPostbases[wind]]}}>{w}</span>
								})}
								{this.state.englishPreVerb.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[this.state.currentPostbases[wind]]}}>{w}</span>
								})}
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.bePreVerb)}</span>
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.preObjectText)}</span>
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.primaryVerb)}</span>
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.primaryNoun)}</span>
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.afterObjectText)}</span>
								<span style={{color:'#852828'}}>{' '+this.state.questionMark}</span>
								</div>
							</div>		
						)
		} else if (tag === 't') {
			return (	
							<div>
								<div style={{marginTop:'30px',marginBottom:'10px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
								{this.state.entryModified.map((modifiedword, m)=>
									<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									<span style={{color:'#852828','paddingRight':'5px'}}>{this.state.questionWord}</span>
									{this.state.otherBases.length == 0 ?
										(modifiedword.split('>').map((q,index) =>
											<span style={{color:(index === 0 ? '#000000': (modifiedword.split(">").length-1 == index ? '#852828' : this.state.colorsList[this.state.currentPostbases[this.state.currentPostbases.length-index]]))}}>{q}</span>
											))
										:
										<Dropdown inline scrolling onChange={this.changeActiveUsageKey.bind(this)} text={(modifiedword.split('>').map((q,index) => <span style={{fontWeight:'400',color:(modifiedword.split(">").length-1 == index ?'#852828':this.state.colorsList[this.state.currentPostbases[this.state.currentPostbases.length-index]])}}>{q}</span>))} value={this.state.activeKeyInEditIndex} options={this.state.baseOptions} />
									}
									<span style={{color:'#852828'}}>{' '+this.state.questionMark}</span>
									</div>
									)}
								</div>

								<div style={{display:'flex',justifyContent:'center',fontSize:'20px',marginBottom:'15px',fontWeight:'300'}}> 
								<span style={{padding:'10px'}}>
									{this.state.baseCase+'-'}
								</span>
								{this.state.underlyingCallReturn.map((x,xind)=>
									<span style={{padding:'10px',color:(xind == this.state.underlyingCallReturn.length - 1 ? '#852828' : this.state.colorsList[this.state.currentPostbases[this.state.currentPostbases.length-xind-1]])}}>
									{x.join(', ')}
									</span>			
								)}
								</div>
																<div style={{textAlign:'center',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>
								<span style={{color:'#852828'}}>{this.processStyledText(this.state.questionWordEnglish)}</span>
								{this.state.englishPreSubject.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[this.state.currentPostbases[wind]]}}>{w}</span>
								})}
								<span style={{color:'#777777'}}>{this.state.preSubjectText}</span>
								<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.setTransitive.bind(this,false)} value={this.state.value1} options={options1} />
								<span style={{color:'#777777'}}>{this.state.afterSubjectText}</span>
								<span style={{color:'#777777'}}>{this.state.subjectIs}</span>
								{this.state.englishPreVerb.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[this.state.currentPostbases[wind]]}}>{w+" "}</span>
								})}
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.bePreVerb)}</span>
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.preObjectText)}</span>
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.primaryVerb)}</span>
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.primaryNoun)}</span>
								<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}} onChange={this.setTransitive.bind(this,false)} value={this.state.value2} options={options2} />
								<span style={{color:'#777777'}}>{this.processStyledText(this.state.afterObjectText)}</span>
								<span style={{color:'#852828'}}>{' '+this.state.questionMark}</span>
								</div>
							</div>		
						)			
		}
	}



	processUnderlyingForm() {
		//add here
	}

	switchToSister(info) {
		this.getWord(info,-1)

	}

	setEnglishNoun(currentPostbases,value1,value2,nounMood) {
		let subjectis = ''
		let englishPreNoun = []
		let englishPreNounOptions = ''
		console.log(currentPostbases, nounMood)

		let personN = value1[1]
		let peopleN = value1[2]
		if (currentPostbases.length > 0) {
			if (!nvNoIs.includes(currentPostbases[0])) {
				subjectis = this.getIs(personN, peopleN, false) 
			}

			if (peopleN === '1' && personN === '3') {
				currentPostbases.map((i,index)=>{
					englishPreNoun.push(this.state.postbaseMaster[i].englishModifier(""))
				})
			} else {
				currentPostbases.map((i,index)=>{
					englishPreNoun.push(this.state.postbaseMaster[i].englishModifierPlural(""))
				})				
			}

		}
		

		// currentPostbases.map((i,index)=>{
		// 	englishPreNoun.push(this.state.postbaseMaster[i].englishModifier(""))
		// })

		if (nounMood === 'Localis') {
			englishPreNounOptions = getNounInfo[0]['eng']
		} else if (nounMood === 'Terminalis') {
			englishPreNounOptions = getNounInfo[1]['eng']
		} else if (nounMood === 'Ablative') {
			englishPreNounOptions = getNounInfo[2]['eng']
		} else if (nounMood === 'Similaris') {
			englishPreNounOptions = getNounInfo[3]['eng']
		} else if (nounMood === 'Relative') {
			englishPreNounOptions = getNounInfo[4]['eng']
		} else if (nounMood === 'Modalis') {
			englishPreNounOptions = getNounInfo[5]['eng']
		}

		// console.log(englishPreVerb)
		// this.getSubjectIs(value1[1],value1[2])
		this.setState({
			englishPreNoun: englishPreNoun,
			englishPreNounOptions: englishPreNounOptions,
			subjectIs: subjectis,
		});	
		// this.getSubjectIs(value1[1],value1[2])
	}

	setEnglish(currentPostbases,value1,value2,verbMood,moodSpecific) {
		let englishPreVerb = []
		let englishPreSubject = []
		let primaryVerb = ''
		let subjectis = ''
		let beforeSubject = ''
		let bePreVerb = ''
		let personN = value1[1]
		let peopleN = value1[2]
		let questionWord = ''
		let questionWordEnglish = ''
		let capitalize = true


		let i = -1
		let j = -1
		if (currentPostbases.length == 1) {
			i = currentPostbases[0]
		} else if (currentPostbases.length == 2) {
			i = currentPostbases[0]
			j = currentPostbases[1]
		}


// let pastwas = [8,9]
// let pastdid = [4] // becomes inf
// let pastVerbTense = [3,5,12]
// let pastGerund = [7,10]

		if (verbMood == 'Participial') {
			if (this.state.primaryVerbBase.length === 0) { //be condition
				if (currentPostbases.length === 0) {
					subjectis = 'was '
				} else {
					if (pastwas.includes(i)) {
						subjectis = 'was '
					}
					englishPreVerb.push(this.state.postbaseMaster[i].englishModifierPast(""))
					if (befirst.includes(i)) {
						bePreVerb = 'be'
					} else if (beingfirst.includes(i)) {
						bePreVerb = 'being'
					}
				}
			} else {
				if (currentPostbases.length === 0) {
					primaryVerb=this.state.usageVerbTenses[1]
				} else {
					if (pastdid.includes(i)) {
						subjectis = 'did '
					} else if (pastwas.includes(i)) {
						subjectis = 'was '
					}
					englishPreVerb.push(this.state.postbaseMaster[i].englishModifierPast(""))
					if (pastVerbTense.includes(i)) {
						primaryVerb = this.state.usageVerbTenses[1]
					} else if (pastGerund.includes(i)) {
						primaryVerb = this.state.usageVerbTenses[3]
					} else {
						primaryVerb = this.state.usageVerbTenses[0]
					}
				}
			}
		} else if (verbMood == 'Interrogative') {
			if (moodSpecific.length !== 0) {
				// console.log(moodSpecific)
				questionWord = getVerbInfo[moodSpecific]['inup']
				questionWordEnglish = getVerbInfo[moodSpecific]['eng']
				capitalize = false
			}
			if (this.state.primaryVerbBase.length === 0) { //be condition
				primaryVerb = this.state.primaryVerbBase
				if (currentPostbases.length === 0) {
				  beforeSubject = this.getIs(personN, peopleN, capitalize) 
				} else {
					if (notis.includes(i)) {
						if (doesis.includes(i)) {
							beforeSubject = this.getDo(personN,peopleN,capitalize)
						englishPreVerb.push(this.state.postbaseMaster[i].englishModifierInfinitive(""))
						} else {
							beforeSubject = ''
						englishPreVerb.push(this.state.postbaseMaster[i].englishModifier(""))
						}
					} else {
					  beforeSubject = this.getIs(personN, peopleN, capitalize)  	
						englishPreVerb.push(this.state.postbaseMaster[i].englishModifier(""))
					}
					if (befirst.includes(i)) {
						bePreVerb = 'be'
					} else if (beingfirst.includes(i)) {
						bePreVerb = 'being'
					}
				}
			} else {
				if (currentPostbases.length === 0) {
				  beforeSubject = this.getIs(personN, peopleN, capitalize) 
				  primaryVerb = this.state.primaryVerbBase
				} else {
					if (notis.includes(i)) {
						if (doesis.includes(i)) {
						  beforeSubject = this.getDo(personN,peopleN,capitalize)
							englishPreVerb.push(this.state.postbaseMaster[i].englishModifierInfinitive(""))
						} else {
							beforeSubject = ''
							englishPreSubject.push(this.state.postbaseMaster[i].englishModifierPast(""))
						}
					} else {
					  beforeSubject = this.getIs(personN, peopleN, capitalize) 
						englishPreVerb.push(this.state.postbaseMaster[i].englishModifier(""))
					}
					if (nextinfinitive.includes(i)) {
						primaryVerb = this.state.usageVerbTenses[0]
					} else {
						primaryVerb = this.state.usageVerbTenses[3]
					}
				}
			}
		} else{

			if (notis.includes(i) || future.includes(j)) {
				subjectis = ''
			} else {
				subjectis = this.getIs(personN, peopleN, false) 	
			}

			if (this.state.primaryVerbBase.length === 0) { //be condition

				if (currentPostbases.length === 0) {
					// this.setState({primaryVerb: this.state.primaryVerbBase});	

				} else if (currentPostbases.length === 1) { 
					
					englishPreVerb.push(this.state.postbaseMaster[i].englishModifier(""))
					if (befirst.includes(i)) {
						bePreVerb = 'be'
					} else if (beingfirst.includes(i)) {
						bePreVerb = 'being'
					}

				} else { // two postbases
					englishPreVerb.push(this.state.postbaseMaster[i].englishModifier(""))
					if (nextinfinitive.includes(i)) {
						englishPreVerb.push(this.state.postbaseMaster[j].englishModifierInfinitive(""))
					} else {
						englishPreVerb.push(this.state.postbaseMaster[j].englishModifierGerund(""))
					}

					if (matchCase.includes(j)) {
						if (befirst.includes(i)) {
							bePreVerb = 'be'
						} else if (beingfirst.includes(i)) {
							bePreVerb = 'being'
						}
					} else if (befirst.includes(j)) {
						bePreVerb = 'be'
					} else if (beingfirst.includes(j)) {
						bePreVerb = 'being'
					}
				}
			} else {
				if (currentPostbases.length === 0) {
					primaryVerb=this.state.primaryVerbBase
				} else if (currentPostbases.length === 1) { 
					englishPreVerb.push(this.state.postbaseMaster[i].englishModifier(""))
					if (nextinfinitive.includes(i)) { 
						primaryVerb=this.state.usageVerbTenses[0]
					} else {
						primaryVerb=this.state.usageVerbTenses[3]
					}
				} else { // two postbases
					englishPreVerb.push(this.state.postbaseMaster[i].englishModifier(""))
					// console.log(i,j)
					if (matchCase.includes(j)) {
						if (nextinfinitive.includes(i)) {
							englishPreVerb.push(this.state.postbaseMaster[j].englishModifierInfinitive(""))
							primaryVerb=this.state.usageVerbTenses[0]
						} else {
							englishPreVerb.push(this.state.postbaseMaster[j].englishModifierGerund(""))
							primaryVerb=this.state.usageVerbTenses[3]
						}
					} else {
						if (nextinfinitive.includes(i)) {
							englishPreVerb.push(this.state.postbaseMaster[j].englishModifierInfinitive(""))
						} else {
							englishPreVerb.push(this.state.postbaseMaster[j].englishModifierGerund(""))
						}						
						if (nextinfinitive.includes(j)) {
							primaryVerb=this.state.usageVerbTenses[0]
						} else {
							primaryVerb=this.state.usageVerbTenses[3]
						}
					}
				}
			}
		}

		// currentPostbases.map((i,index)=>{
		// 	if (index !== currentPostbases.length-1) {
		// 		// console.log(notis.includes(i), value1[1], value1[2])
		// 		if (notis.includes(i)) {
		// 			if (value1[1] === '3' && value1[2] === '1') {
		// 				englishPreVerb.push(this.state.postbaseMaster[i].englishModifier(""))
		// 			} else {
		// 				englishPreVerb.push(this.state.postbaseMaster[i].englishModifierSecond(""))
		// 			}
		// 		} else {
		// 			englishPreVerb.push(this.state.postbaseMaster[i].englishModifierSecond(""))
		// 		}
		// 	} else {
		// 		englishPreVerb.push(this.state.postbaseMaster[i].englishModifierSecond(""))
		// 		if (infinitive.includes(i)) {
		// 			this.setState({primaryVerb: this.state.usageVerbTenses[0],});	
		// 		}
		// 	}
		// })
		// console.log(englishPreVerb)
		// this.getSubjectIs(value1[1],value1[2])

		if (verbMood == 'Interrogative') {
			this.setState({questionMark: '?'})
		} else {
			this.setState({questionMark: ''})
		}

		this.setState({
			primaryVerb: primaryVerb,
			englishPreVerb: englishPreVerb,
			englishPreSubject: englishPreSubject,
			bePreVerb: bePreVerb,
      person: parseInt(personN),
      people: parseInt(peopleN),
      subjectIs: subjectis,
      beforeSubject: beforeSubject,
      questionWord: questionWord,
      questionWordEnglish: questionWordEnglish,
		});	
	}

	// addNounPostbase(e, {value}) {
	// 	// console.log(e, value)
	// 	let currentPostbases = this.state.currentPostbases
	// 	let postbasesAvailable = this.state.postbaseMaster[value].allowable_next_ids
	// 	// var remove = postbasesAvailable.indexOf(value)
	// 	// postbasesAvailable.splice(remove,1)
	// 	// console.log(postbasesAvailable)
	// 	let postbaseInformationAvailable = []
	// 	postbasesAvailable.map((a)=>{
	// 		postbaseInformationAvailable.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifier("")})
	// 	})
	// 	currentPostbases.push(value)
	// 	this.setState({
	// 		currentPostbases: currentPostbases,
	// 		postbasesAvailable: postbasesAvailable,
	// 		postbaseInformationAvailable: postbaseInformationAvailable,
	// 	});

	// 	// let fstCall = ''
	// 	let owner = ''
	// 	let nounvalue1 = this.state.nounvalue1
	// 	let nounvalue2 = this.state.nounvalue2

	// 	if (nounvalue2[0] !== '0') {
	// 		owner = '+'+nounvalue2[0]+peopleDict[nounvalue2[1]]
	// 	} else {
	// 		owner = ''
	// 	}

	// 	// if (currentPostbases.includes(17)) {
	// 	// 	this.setState({tag: 'INTRANSITIVE VERB'})	
 //  //   	fstCall = '>+V+Ind+Prs+' + this.state.value1[1] + peopleDict[this.state.value1[2]]
	// 	// } else {
	// 	// 	this.setState({tag: 'NOUN'})	
	//  //    if (this.state.nounMood === 'Absolutive') {
	//  //    	fstCall = '>+N+Abs+' + peopleDict[nounvalue1] + owner
	//  //    }
	// 	// }

	// 	this.setEnglishNoun(currentPostbases,this.state.value1,this.state.value2)
	// 	this.getFSTParse(this.state.baseCase,currentPostbases,this.state.tag,this.state.verbMood,null,null,this.state.nounMood,nounvalue1,nounvalue2)
	// }

	addPostbase(e, {value}) {
		// console.log(e, value)

		let currentPostbases = this.state.currentPostbases
		// let postbasesAvailable = this.state.postbaseMaster[value].allowable_next_ids
		// var remove = postbasesAvailable.indexOf(value)
		// postbasesAvailable.splice(remove,1)
		// console.log(postbasesAvailable)
		if (this.state.baseTag == 'n') {
			if (nnpostbases.includes(value)) {
				currentPostbases.push(value)
			} else {
				currentPostbases.unshift(value)
			}
		} else {
			currentPostbases.push(value)
		}

		// this.setAvailablePostbaseInformation(currentPostbases,this.state.verbMood)
		// let postbaseInformationAvailable = []

		


		// let fstCall = this.state.fstCall
		// let owner = ''
		// let nounvalue1 = this.state.nounvalue1
		// let nounvalue2 = this.state.nounvalue2
		let tag = this.state.tag
		let verbMood = this.state.verbMood
		if (this.state.baseTag == 'n') {

			// postbasesAvailable.map((a)=>{
			// 	postbaseInformationAvailable.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifier("")})
			// })
			// if (nounvalue2[0] !== '0') {
			// 	owner = '+'+nounvalue2[0]+peopleDict[nounvalue2[1]]
			// } else {
			// 	owner = ''
			// }
			// this.setAvailablePostbaseInformation(postbasesAvailable)
			// console.log(currentPostbases,nounToVerb)
			// console.log(currentPostbases.filter(value => nounToVerb.includes(value)).)
			if (currentPostbases.filter(value => nounToVerb.includes(value)).length > 0) {
				tag = 'INTRANSITIVE VERB'
				verbMood = 'Indicative'
				// this.getFSTParse(this.state.baseCase,this.state.currentPostbases,'INTRANSITIVE VERB','INDICATIVE',this.state.value1,'',this.state.nounMood,[],[])
			}
				// this.setState({tag: 'INTRANSITIVE VERB'})	
	    	// fstCall = '>+V+Ind+Prs+' + this.state.value1[1] + peopleDict[this.state.value1[2]]
			// } else {
				// this.setState({tag: 'NOUN'})	
		    // if (this.state.nounMood === 'Absolutive') {
		    	// fstCall = '>+N+Abs+' + peopleDict[nounvalue1] + owner
		    // }
			// }
			this.setAvailablePostbaseInformation(currentPostbases,this.state.nounMood)
			this.setEnglishNoun(currentPostbases,this.state.value1,this.state.value2,this.state.nounMood)

		} else {
			// postbasesAvailable.map((a)=>{
			// 	postbaseInformationAvailable.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifier("")})
			// })
			this.setAvailablePostbaseInformation(currentPostbases,this.state.verbMood)
			this.setEnglish(currentPostbases,this.state.value1,this.state.value2,this.state.verbMood,this.state.moodSpecific)			
		}

		console.log(tag,verbMood)

		this.getFSTParse(this.state.baseCase,currentPostbases,tag,verbMood,this.state.moodSpecific,this.state.value1,this.state.value2,this.state.nounMood,this.state.nounvalue1,this.state.nounvalue2)

		let postbase1 = -1
		let postbase2 = -1
		if (currentPostbases.length == 2) {
			postbase1 = currentPostbases[0]
			postbase2 = currentPostbases[1]
		} else if (currentPostbases.length == 1) {
			postbase1 = currentPostbases[0]
		}

		this.setState({
			postbase1:postbase1,
			postbase2:postbase2,
			currentPostbases: currentPostbases,
			tag: tag,
			verbMood: this.state.verbMood,

			// postbasesAvailable: postbasesAvailable,
			// postbaseInformationAvailable: postbaseInformationAvailable,
		});
	}


	removePostbase(value, e, data) {
		// console.log(value)
		let currentPostbases = this.state.currentPostbases
		// var remove = currentPostbases.indexOf(value)
		currentPostbases.splice(value,1)
		// console.log(postbasesAvailable)

		// let postbasesAvailable = []
		// if (currentPostbases.length == 1) {
		// 	postbasesAvailable = this.state.postbaseMaster[currentPostbases[0]].allowable_next_ids
		// } else {
		// 	if (this.state.verbMood == 'Participial') {
		// 		postbasesAvailable = verbPostbaseParticipialDefault
		// 	} else {
		// 		postbasesAvailable = this.state.allPostbasesAvailable
		// 	}
			
		// }
		// let postbaseInformationAvailable = []
		// postbasesAvailable.map((a)=>{
		// 	postbaseInformationAvailable.push({value:a,key:a,text:this.state.postbaseMaster[a].description})
		// })

		this.setAvailablePostbaseInformation(currentPostbases,this.state.verbMood)


		let postbase1 = -1
		let postbase2 = -1
		if (currentPostbases.length == 2) {
			postbase1 = currentPostbases[0]
			postbase2 = currentPostbases[1]
		} else if (currentPostbases.length == 1) {
			postbase1 = currentPostbases[0]
		}

		this.setState({
			postbase1:postbase1,
			postbase2:postbase2,
			currentPostbases: currentPostbases,
			// postbasesAvailable: postbasesAvailable,
			// postbaseInformationAvailable: postbaseInformationAvailable,
		});


		let tag = this.state.tag
		let verbMood = this.state.verbMood

		// let fstCall = this.state.fstCall
		let owner = ''
		let nounvalue1 = this.state.nounvalue1
		let nounvalue2 = this.state.nounvalue2

		if (this.state.baseTag == 'n') {

			// postbasesAvailable.map((a)=>{
			// 	postbaseInformationAvailable.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifier("")})
			// })
			// if (nounvalue2[0] !== '0') {
			// 	owner = '+'+nounvalue2[0]+peopleDict[nounvalue2[1]]
			// } else {
			// 	owner = ''
			// }
			// if (currentPostbases.includes(17)) {
			// 	this.setState({tag: 'INTRANSITIVE VERB'})	
	  //   	fstCall = '>+V+Ind+Prs+' + this.state.value1[1] + peopleDict[this.state.value1[2]]
			// } else {
			// 	this.setState({tag: 'NOUN'})	
		 //    if (this.state.nounMood === 'Absolutive') {
		 //    	fstCall = '>+N+Abs+' + peopleDict[nounvalue1] + owner
		 //    }
			// }
			// console.log(currentPostbases)
			// console.log(currentPostbases.filter(value => nounToVerb.includes(value)))
			if (currentPostbases.filter(value => nounToVerb.includes(value)).length > 0) {
				tag = 'INTRANSITIVE VERB'
				verbMood = 'Indicative'
				// this.getFSTParse(this.state.baseCase,this.state.currentPostbases,'INTRANSITIVE VERB','INDICATIVE',this.state.value1,'',this.state.nounMood,[],[])
			} else {
				tag = 'n'
			}
			this.setState({tag:tag})
			console.log(tag)

			this.setAvailablePostbaseInformation(currentPostbases,this.state.nounMood)
			this.setEnglishNoun(currentPostbases,this.state.value1,this.state.value2,this.state.nounMood)

		} else {
			// postbasesAvailable.map((a)=>{
			// 	postbaseInformationAvailable.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifierSecond("")})
			// })
			this.setAvailablePostbaseInformation(currentPostbases,this.state.verbMood)
			this.setEnglish(currentPostbases,this.state.value1,this.state.value2,this.state.verbMood,this.state.moodSpecific)			
		}

		

		this.getFSTParse(this.state.baseCase,currentPostbases,tag,this.state.verbMood,this.state.moodSpecific,this.state.value1,this.state.value2,this.state.nounMood,this.state.nounvalue1,this.state.nounvalue2)

	}


	setAvailablePostbaseInformation(currentPostbases,mood) {
		let availablePostbaseInformationText = []
		let postbaseInformationAvailable1 = []
		let postbaseInformationAvailable2 = []

		// if (this.state.currentPostbases.length == 0 && this.state.verbMood == 'Participial') {
		// 	postbasesAvailable = verbPostbaseParticipialDefault
		// }

		console.log(currentPostbases)


		let postbasesAvailable = []
		if (currentPostbases.length == 0) {
			if (mood == 'Participial') {
				postbasesAvailable = verbPostbaseParticipialDefault
			} else if (this.state.baseTag == 'n' && mood !== 'Absolutive') {
				postbasesAvailable = nnpostbases
			} else {
				postbasesAvailable = this.state.allPostbasesAvailable
			}
		} else {
			if (this.state.baseTag == 'n' && mood !== 'Absolutive') {

			} else {
				postbasesAvailable = this.state.postbaseMaster[currentPostbases[0]].allowable_next_ids
			}
			
		}

		console.log(mood)

		let hasFuture = false
		if (mood !== 'Indicative' && mood !== 'Participial' && mood !== 'Interrogative') {
			if (this.state.currentPostbases.length == 0) {
				postbasesAvailable.map((a)=>{
					postbaseInformationAvailable1.push({value:a,key:a,text:this.state.postbaseMaster[a].description})
					availablePostbaseInformationText.push(this.state.postbaseMaster[a].englishModifier(""))
				})
			} else if (this.state.currentPostbases.length == 1) {
				// console.log('hi',postbasesAvailable)
				postbaseInformationAvailable1 = this.state.postbaseInformationAvailable1
				postbasesAvailable.map((a)=>{
					postbaseInformationAvailable2.push({value:a,key:a,text:this.state.postbaseMaster[a].description})
					availablePostbaseInformationText.push(this.state.postbaseMaster[a].englishModifier(""))
				})		
			}
		} else {
			if (mood == 'Participial') {
				postbasesAvailable.map((a)=>{
					postbaseInformationAvailable1.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifierPast("")})
					availablePostbaseInformationText.push(this.state.postbaseMaster[a].englishModifierPast(""))
				})
			} else if (mood == 'Interrogative') {
				postbasesAvailable.map((a)=>{
					postbaseInformationAvailable1.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifierInfinitive("")})
					availablePostbaseInformationText.push(this.state.postbaseMaster[a].englishModifierInfinitive(""))
				})
			} else {
				if (this.state.currentPostbases.length == 0) {
					postbasesAvailable.map((a)=>{
						postbaseInformationAvailable1.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifier("")})
						availablePostbaseInformationText.push(this.state.postbaseMaster[a].englishModifier(""))
					})
				} else if (this.state.currentPostbases.length == 1) {
					postbaseInformationAvailable1 = this.state.postbaseInformationAvailable1
					if (future.includes(this.state.currentPostbases[0])) {
						hasFuture = true
					}
					console.log('wadup')
					if (nextinfinitive.includes(this.state.currentPostbases[0])) {
						postbasesAvailable.map((a)=>{
							postbaseInformationAvailable2.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifierInfinitive("")})
							availablePostbaseInformationText.push(this.state.postbaseMaster[a].englishModifierInfinitive(""))
						})		
					}	else {
						postbasesAvailable.map((a)=>{
							postbaseInformationAvailable2.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifierGerund("")})
							availablePostbaseInformationText.push(this.state.postbaseMaster[a].englishModifierGerund(""))
						})		
					}		
				}
			}
		}


		// postbasesAvailable.map((a)=>{
		// 	postbaseInformationAvailable.push({value:a,key:a,text:this.state.postbaseMaster[a].englishModifier("")})
		// })		

		this.setState({
			// currentPostbases: currentPostbases,
			postbasesAvailable: postbasesAvailable,
			hasFuture: hasFuture,
			postbaseInformationAvailable1: postbaseInformationAvailable1,
			postbaseInformationAvailable2: postbaseInformationAvailable2,
			availablePostbaseInformationText: availablePostbaseInformationText,
		});

	}


	changeVerbEnding(reset,e, data) {
		console.log(data.value)
		// let mood = 'Interrogative'
		// let moodSpecific = data.value
		this.setState({endingNumber:data.value});	
		if (reset) {
			this.changeEnding('Indicative','','')
		} else {
			if (data.value === 0) {
				this.changeEnding('Participial','','')
			} else {
				this.changeEnding('Interrogative',data.value,'')
			}		
		}
		
	}

	changeNounEnding(reset,e, data) {
		console.log(data.value)
		// let mood = 'Interrogative'
		// let moodSpecific = data.value
		this.setState({endingNumber:data.value});	
		if (reset) {
			this.changeEnding('','','Absolutive')
		} else {
			this.changeEnding('','',getNounInfo[data.value]['text'])
		}
		
	}

	changeEnding(verbMood,moodSpecific,nounMood) {

		console.log()
		let postbasesAvailable = []



		if (this.state.tag === 'n') {
			// if (mood === this.state.nounMood) {	
			// 	mood = 'Absolutive'
			// 	moodSpecific = ''
			// 	// nounMood = 
			// }
			this.setAvailablePostbaseInformation(this.state.currentPostbases,nounMood)
    	this.setEnglishNoun(this.state.currentPostbases,this.state.value1,this.state.value2,nounMood)
    	this.setState({nounMood:nounMood});	
    	this.setState({moodSpecific:moodSpecific});	

		} else {
			if (verbMood === this.state.verbMood && moodSpecific === this.state.moodSpecific) {
				// verbMood = 'Indicative'
				verbMood = 'Indicative'
				moodSpecific = ''
			} 

			// if (this.state.currentPostbases.length === 0) {
			// 	if (mood == 'Participial') {
			// 		this.setAvailablePostbaseInformation(verbPostbaseParticipialDefault,mood)
			// 	} else {
			// 		this.setAvailablePostbaseInformation(verbPostbaseDefault,mood)
			// 	}
			// }
			this.setAvailablePostbaseInformation(this.state.currentPostbases,verbMood)
	    this.setEnglish(this.state.currentPostbases,this.state.value1,this.state.value2,verbMood,moodSpecific)
    	this.setState({verbMood:verbMood});	
    	this.setState({moodSpecific:moodSpecific});	
		}

    this.getFSTParse(this.state.baseCase,this.state.currentPostbases,this.state.tag,verbMood,moodSpecific,this.state.value1,this.state.value2,nounMood,this.state.nounvalue1,this.state.nounvalue2)



		// if (this.state.currentPostbases.length == 0) {
		// 	this.setAvailablePostbaseInformation(this.state.allPostbasesAvailable)
		// 	// if (verbMood == 'Participial') {
		// 	// 	this.setAvailablePostbaseInformation(verbPostbaseParticipialDefault)
		// 	// } else if (verbMood == 'Indicative') {
		
		// 	// }
		// }
		
	}

  changeActiveUsageKey(entry, data) {
  	console.log(data)
  	let num = data.value
  	// console.log(data.options)
    this.setState({
      // value1: data.value,
      activeKeyInEditIndex:data.value,
      // baseCase: data.options[data.value].text,
    });
    this.getFSTParse(this.state.baseCase,this.state.currentPostbases,this.state.tag,this.state.verbMood,this.state.moodSpecific,this.state.value1,this.state.value2,this.state.nounMood,this.state.nounvalue1,this.state.nounvalue2)
  }


  changeActiveDefinitionKey(entry, data) {
  	console.log(data)
  	let num = data.value
  	// console.log(data.options)
    this.setState({
      // value1: data.value,
      activeDefinitionInEditIndex:data.value,
      // baseCase: data.options[data.value].text,
    });

    console.log(this.state.usageDefinition[data.value][0])
    let sentence = this.state.usageDefinition[data.value][0]
		let matches = sentence.match(/\⟨.*?\⟩/g)
		if (matches !== null) {
			matches.map((m) => sentence = sentence.replace(m,m.slice(1,-1)))	
		}
		console.log(sentence)

    this.setState({pluralizedDefinition:sentence})
    // console.log(this.state.usageDefinition[data.value][])
    // this.getFSTParse(this.state.baseCase,this.state.currentPostbases,this.state.tag,this.state.verbMood,this.state.moodSpecific,this.state.value1,this.state.value2,this.state.nounMood,this.state.nounvalue1,this.state.nounvalue2)
  }
  

  getFSTParse(baseCase,currentPostbases,tag,verbMood,moodSpecific,value1,value2,nounMood,nounvalue1,nounvalue2) {
  	console.log(baseCase,currentPostbases,tag,verbMood,value1,value2,nounMood,nounvalue1,nounvalue2)
  	console.log(nounMood,tag,value1,value2)

  	let fstCall = ''
  	let owner = ''
  	if (tag == 'n') {
      if (nounvalue2[0] !== '0') {
        owner = nounvalue2[0]+peopleDict[nounvalue2[1]]+'Poss'
      } else {
        owner = 'Unpd'
      }

  		if (nounMood == 'Absolutive') {
	      if (owner !== 'Unpd') {
	        fstCall = '[N][Abs][' + owner + '][' + peopleDict[nounvalue1] + 'Posd]'   
	      } else {
	        fstCall = '[N][Abs][' + peopleDict[nounvalue1] + owner + ']'        
	      }
  		} else if (nounMood == 'Localis') {
  			fstCall = '>+N+Loc+' + peopleDict[nounvalue1] + owner
  		} else if (nounMood == 'Terminalis') {
  			fstCall = '>+N+Trm+' + peopleDict[nounvalue1] + owner
  		} else if (nounMood == 'Ablative') {
  			fstCall = '>+N+Abl+' + peopleDict[nounvalue1] + owner
  		} else if (nounMood == 'Similaris') {
  			fstCall = '>+N+Sim+' + peopleDict[nounvalue1] + owner
  		} else if (nounMood == 'Relative') {
  			fstCall = '>+N+Rel+' + peopleDict[nounvalue1] + owner
  		} else if (nounMood == 'Modalis') {
  			fstCall = '>+N+Mod+' + peopleDict[nounvalue1] + owner
  		}
  	} else {
	  	if (verbMood == 'Indicative') {
	  		if (tag == 'i') {
	  			fstCall = '[V][Ind][Intr][S_' + value1[1] + peopleDict[value1[2]] + ']'
	  		} else {
	  			fstCall = '[V][Ind][Trns][A_' + value1[1] + peopleDict[value1[2]] + '][P_' + value2[1]+peopleDict[value2[2]] + ']'
	  		}	
	  	} else if (verbMood == 'Participial') {
	  		if (tag == 'i') {
	  			fstCall = '>+V+Ind+Pst+' + value1[1] + peopleDict[value1[2]]
	  		} else {
	  			fstCall = '>+V+Ind+Pst+' + value1[1] + peopleDict[value1[2]] + '+' + value2[1]+peopleDict[value2[2]] + 'O'
	  		}	
	  	} else if (verbMood == 'Interrogative') {
	  		if (tag == 'i') {
	  			fstCall = '>+V+Int+' + value1[1] + peopleDict[value1[2]]
	  		} else {
	  			fstCall = '>+V+Int+' + value1[1] + peopleDict[value1[2]] + '+' + value2[1]+peopleDict[value2[2]] + 'O'
	  		}	
	  	}
  	}


  	let underlyingCall = []

		let postfstCall = []
		let postfstCallString = ''
		if (currentPostbases.length > 0) {
			currentPostbases.map((i)=>{
				postfstCall.push(this.state.postbaseMaster[i].expression)
			})
			postfstCall = postfstCall.reverse()
			postfstCallString = '-'+postfstCall.join('-')
			
		}
		// fstCall = postfstCall+fstCall
		// console.log(underlyingCall,postfstCall)
		underlyingCall = underlyingCall.concat(postfstCall)
		underlyingCall.push(fstCall.slice(1))


		
  	let FSTsearch = baseCase[this.state.activeKeyInEditIndex] + postfstCallString + '-' + fstCall
  	// console.log(baseCase,postfstCallString,fstCall)
  	// console.log(FSTsearch)
  	// console.log(underlyingCall)
  	console.log(postfstCall)
  	console.log(fstCall)
		// console.log(FSTsearch,activeEditIndex)
		let underlyingCallReturn = []
		postfstCall.map((j)=>{
			underlyingCallReturn.push([j.replace('[V→V]','-')])
		})
		// console.log(ending_underlying[fstCall])
		underlyingCallReturn.push(ending_underlying[fstCall])
		// console.log(underlyingCallReturn)
    this.setState({
      underlyingCallReturn: underlyingCallReturn,
    });

		// console.log(encodeURIComponent(FSTsearch))
    axios
      .get(API_URL + "/segment/" + encodeURIComponent(FSTsearch))
      .then(response => {
        console.log(response.data);

        // var slicedColors = this.state.colorsList
        // slicedColors=slicedColors.slice(0,this.state.currentPostbases.length)
        let words = []
        response.data.words.map((k,ind)=>{
        	words.push(k.replace("u>a","ua"))
        	// words.push(k)
        })
        this.setState({
        	// englishColorList: slicedColors,
        	// inupiaqColorList: ['#000000'].concat(slicedColors.slice(0).reverse()).concat(['#852828']),
          entryModified: words,
        });

        // if (response.data.chld !== []) {}
        // console.log(response.data.etymology)
        // if (response.data.etymology !== []) {
        // 	this.setState({etymology: response.data.etymology[0]})
        // }
      });
  }



	processStyledText = (sentence) => {			
		let matches = sentence.match(/\⎡.*?\⎤/g)
		if (matches !== null) {
			matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))		
			return <span dangerouslySetInnerHTML={{__html: sentence}} />		
		} else {
			return <span>{sentence.replace("<","").replace(">","")}</span>
		}
	}

	processStyledText2 = (sentence,tag) => {
		console.log(sentence,tag)
		sentence = sentence.replace("⟨","").replace("⟩","").replace("]","").replace("[","").replace("<","").replace(">","")
		// if (tag == 'NOUN') {
		// 	sentence = 'the one '+sentence
		// } else {
		// 	sentence = 'he/she is '+sentence
		// }
		
		// let matches = sentence.match(/\<.*?\>/g)
		// if (matches !== null) {
			// matches.map((m) => sentence = sentence.replace(m,'<b>'+m.slice(1,-1)+'</b>'))		
			// return <span dangerouslySetInnerHTML={{__html: sentence}} />		
		// } else {
			return <span>{sentence}</span>
		// }
	}

	render() {
		console.log(this.state)
		// console.log(this.state.colorsList)
		let verbQuestionWords = [
			{value:0,key:0,text:'past tense',disabled:this.state.hasFuture},
			{value:1,key:1,text:'question: yes or no?'},
			{value:2,key:2,text:'question: why?'},
			{value:3,key:3,text:'question: how?'},
			{value:4,key:4,text:'question: where at?'},
			{value:5,key:5,text:'question: to where?'},
			{value:6,key:6,text:'question: from where?'},
		]

		return (
			<div style={{fontFamily:customFontFam}}>

      <Grid textAlign='center'>
      <Grid.Row  style={{height:40,paddingBottom:0}}>
      <Grid.Column style={{ maxWidth: 800, padding: 10 }} textAlign='left'>

			<div style={{display:'flex',textDecoration:'underline'}}>
	      <div style={{flex:1,justifyContent:'flex-start'}}>
					<Link to={{pathname: '/'}}>
					Ivaqłiqsatqiun Allanik Uqaluŋnik - Back to Search
					</Link>
	      </div>


	      <div style={{flex:1,display:'flex',justifyContent:'flex-end',paddingLeft:5,textDecoration:'underline'}}>
					<Link to={{pathname: '/'+ this.state.entryUrl}}>
					<span>

					{'Utiġiñ Uqaluum Maŋŋuanun - See Dictionary Entry: '}
					</span>
					<span style={{fontWeight:'500'}}>
					{this.state.entryUrl}
					</span>
					</Link>
				</div>
			</div>


					<div style={{border:'1px solid #E3E3E3',marginTop:'20px'}}>

					<div className='hierarchymain'>
					<span className='span1'>Uqaluliuġun</span>
					<span className='span2'>Word Builder</span>
					</div>



				<Container>
					<div>
					{this.usageEntry(this.state.activeKeyInEditIndex,this.state.tag)}
					</div>
				</Container>

				<div style={{paddingTop:'30px',paddingRight:'30px',paddingLeft:'30px'}}>
						{this.state.englishPreSubject.map((q,qindex)=>{
							return <div style={{display:'flex',justifyContent:'center',paddingBottom:'20px'}}><Button fluid style={{display:'flex',maxWidth:'350px',justifyContent:'space-between',paddingLeft:'14px', paddingRight:'3px', color:this.state.colorsList[this.state.currentPostbases[qindex]], border:'1px solid '+this.state.colorsList[this.state.currentPostbases[qindex]],backgroundColor:'white'}} onClick={this.removePostbase.bind(this,qindex)}><span>{q}</span><Icon name='delete'/></Button></div>
						})}
						{this.state.englishPreNoun.map((q,qindex)=>{
							return <div style={{display:'flex',justifyContent:'center',paddingBottom:'20px'}}><Button fluid style={{display:'flex',maxWidth:'350px',justifyContent:'space-between',paddingLeft:'14px', paddingRight:'3px', color:this.state.colorsList[this.state.currentPostbases[qindex]], border:'1px solid '+this.state.colorsList[this.state.currentPostbases[qindex]],backgroundColor:'white'}} onClick={this.removePostbase.bind(this,qindex)}><span>{q}</span><Icon name='delete'/></Button></div>
						})}
						{this.state.englishPreVerb.map((q,qindex)=>{
							return <div style={{display:'flex',justifyContent:'center',paddingBottom:'20px'}}><Button fluid style={{display:'flex',maxWidth:'350px',justifyContent:'space-between',paddingLeft:'14px', paddingRight:'3px', color:this.state.colorsList[this.state.currentPostbases[qindex]], border:'1px solid '+this.state.colorsList[this.state.currentPostbases[qindex]],backgroundColor:'white'}} onClick={this.removePostbase.bind(this,qindex)}><span>{q}</span><Icon name='delete'/></Button></div>
						})}
						{this.state.nounMood !== 'Absolutive' ?
							<div style={{display:'flex',justifyContent:'center',paddingBottom:'20px'}}><Button fluid style={{display:'flex',maxWidth:'350px',justifyContent:'space-between',paddingLeft:'14px', paddingRight:'3px',color:'#852828',backgroundColor:'white',border:'1px solid #852828'}} onClick={this.changeNounEnding.bind(this,true)}><span>{getNounInfo[this.state.endingNumber]['buttontext']}</span><Icon name='delete'/></Button></div>
							:
							null
						}
						{this.state.verbMood == 'Participial' || this.state.verbMood == 'Interrogative' ?
							<div style={{display:'flex',justifyContent:'center',paddingBottom:'20px'}}><Button fluid style={{display:'flex',maxWidth:'350px',justifyContent:'space-between',paddingLeft:'14px', paddingRight:'3px',color:'#852828',backgroundColor:'white',border:'1px solid #852828'}} onClick={this.changeVerbEnding.bind(this,true)}><span>{getVerbInfo[this.state.endingNumber]['text']}</span><Icon name='delete'/></Button></div>
							:
							null
						}
				</div>

				<div style={{height:'15px'}} />

				{this.state.currentPostbases.length == 0 ? 
					<div style={{display:'flex',justifyContent:'center',height:'56px',paddingRight:'30px',paddingLeft:'30px'}}>
					  <Dropdown
					  	style={{maxWidth:'350px'}}
					    placeholder={()=><div style={{display:'flex', flexDirection:'column'}}><span>{'Akunniġutilivsaaġuŋ'}</span><span style={{color:'grey',paddingTop:'4px'}}>{'Add a postbase'}</span></div>}
					    fluid
					    selection
					    value={this.state.postbase1}
					    selectOnBlur={false}
					    options={this.state.postbaseInformationAvailable1}
					    onChange={this.addPostbase.bind(this)}
					  />
					</div>
					:
					<div style={{display:'flex',justifyContent:'center',height:'56px',paddingRight:'30px',paddingLeft:'30px'}}>

						{this.state.currentPostbases.length == 1 && this.state.postbasesAvailable.length !== 0 && this.state.verbMood != 'Participial' && this.state.verbMood != 'Interrogative' ?
						  <Dropdown
					  		style={{maxWidth:'350px'}}
					    	placeholder={()=><div style={{display:'flex', flexDirection:'column'}}><span>{'Akunniġutilivsaaġuŋ'}</span><span style={{color:'grey',paddingTop:'4px'}}>{'Add a postbase'}</span></div>}
						    fluid
						    selection
						    value={this.state.postbase2}
						    selectOnBlur={false}
						    options={this.state.postbaseInformationAvailable2}
					    	onChange={this.addPostbase.bind(this)}
						  />
						  :
						  null
						}
					</div>
				}


				{this.state.tag == 'n' && this.state.nounMood == 'Absolutive' ?
					<div style={{display:'flex',justifyContent:'center',height:'71px',paddingTop:'15px',paddingRight:'30px',paddingLeft:'30px'}}>
					  <Dropdown
					  	style={{maxWidth:'350px'}}
					    placeholder={()=><div style={{display:'flex', flexDirection:'column'}}><span>{'Simmiġuŋ Isua'}</span><span style={{color:'grey',paddingTop:'4px'}}>{'Change Ending Type'}</span></div>}
					    fluid
					    selection
					    selectOnBlur={false}
					    value={this.state.ending1}
					    options={nounQuestionWords}
				    	onChange={this.changeNounEnding.bind(this,false)}
					  />
				  </div>
				:
				null
				}


				{this.state.baseTag != 'n' && this.state.verbMood != 'Participial' && this.state.verbMood != 'Interrogative' && this.state.currentPostbases.length < 2 ?
					<div style={{display:'flex',justifyContent:'center',height:'71px',paddingTop:'15px',paddingRight:'30px',paddingLeft:'30px'}}>
					  <Dropdown
					  	style={{maxWidth:'350px'}}
					    placeholder={()=><div style={{display:'flex', flexDirection:'column'}}><span>{'Simmiġuŋ Isua'}</span><span style={{color:'grey',paddingTop:'4px'}}>{'Change Ending Type'}</span></div>}
					    fluid
					    selection
					    selectOnBlur={false}
					    value={this.state.ending1}
					    options={verbQuestionWords}
				    	onChange={this.changeVerbEnding.bind(this,false)}
					  />
				  </div>
				  :
				  null
				}

				<div style={{height:'30px'}} />


				{Object.keys(this.state.sisters).length !== 0 ?

					<div>
					<div className='hierarchymain'>
					<span className='span1'>Allat Uqaluit Maŋŋuqatiŋi</span>
					<span className='span2'>Related Entries</span>
					</div>

							<List style={{marginTop:0}} divided selection>
							{Object.keys(this.state.sisters).map((i,index)=>
						    <List.Item key={i} onClick={()=>this.switchToSister(i)}>
                  <List.Content floated='right'>
                    <Icon style={{paddingTop:'3px', color:'#B1B1B1'}} size='large' name='chevron right' />
                  </List.Content>
						      <List.Content  style={{paddingRight:'16px'}}>
						        <List.Header style={{fontSize:'19px',paddingBottom:'4px',paddingLeft:'15px',fontFamily:customFontFam,lineHeight:'25px'}}>
						          		<div> 
						              <span style={{'paddingRight':'3px',fontWeight:'400'}}>
						              {this.processStyledText(this.state.sisters[i][2])}
						                <span style={{'marginLeft':'15px',marginRight:'6px'}}>  
		                      		<TagColors key={this.state.sisters[i][0]} word={this.state.sisters[i][0]} />
						                </span>
						              </span>
						              </div>
						        </List.Header>
						        <List.Description style={{fontSize:'16px',color:'#000000cc',paddingLeft:'15px',fontWeight:'400',lineHeight:'23px',paddingTop:'4px'}}>{this.processStyledText2(this.state.sisters[i][3],this.state.sisters[i][0])}</List.Description>
						      </List.Content>
						    </List.Item>
              	)}
							</List>
					</div>
					:
					null
				}


					</div>

			</Grid.Column>
			</Grid.Row>
			</Grid>

			</div>
		);
	}
}
export default WordBuilder;