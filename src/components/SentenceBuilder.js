import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Image, Grid, Dropdown, List, Label, Input, Segment, Popup, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../App.js';
import axios from 'axios';
import {nounOptionsPossessors, nounOptionsNumbers, nounoptionsmodalis, mvSubjectOptions, mvObjectOptions, verbPostbases, nounPostbases, VVpostbases, NNpostbases} from './constants/newconstants.js'
import {ending_underlying} from './constants/ending_underlying.js'
import palette from 'google-palette';
import shuffle from 'shuffle-array';
// import { TagColors } from './SentenceBulderHelpe.js';
import fuzzysort from 'fuzzysort'
import now from 'performance-now';
import ReactGA from 'react-ga';


let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"


const optionsFuzzy = {
  keys: ['yupikword', 'englishnorm'],
  limit: 10, // don't return more results than you need!
  threshold: -10000, // don't return bad results
};

let dictionary = [];
let usageDictionary = [];
let dictionary_dict = {};

class OneVerbWordBuilder extends Component {
	constructor(props) {
		// console.log(decodeURI(props.match.params.num))
		super(props);
		this.state = {
			otherBases: [],
			colorsList: [
			'#000000',
			'#852828',
			'#b53434',
			'#578f7f',
			'#f29090',
			'purple',//connective 5
			'#3070AB',//connective subject 6
			'#4338ac', //connective object 7

			].concat(shuffle(palette('tol-rainbow', 500).map((c) => { return '#' + c; }))),


			mvSubjectColor: '#852828',
			mvObjectColor: '#b53434',
			// // mvPostbaseColors: 

			// cvSubjectColor: '#3070AB',
			// cvObjectColor: '#b53434',

			// currentPostbases: ['13'],
			// mvSubjectDisplay: [['angute',1],['cuara',20],['at',1]],
			// mvSubjectUnderlyingDisplay: [[['angute-',1]],[['–cuar(ar*)[N→N]',20]],[['%:(e)t',1]],],



			// mvObjectDisplay: [['tuntuvi',2],['it',2]],
			// mvObjectUnderlyingDisplay: [[['tuntuvag-',2]],[['%:(e)t',2]],],

			// mvDisplay: [['nii',0],['cugnarqe',3],['llru',0],['i',2],['t',1]],
			// mvUnderlyingDisplay: [[['niite-',0]],[['@~+yugnarqe2[V→V]',3]],[['–llru[V→V]',0]],[["+'(g)ai",2],["t",1]]],

			// mvEnglish1: [],			
			// mvSubjectEnglish: [['small',20],['men',1]],
			// mvEnglish2: [['probably',3],['heard',0],['', 0]],
			// mvObjectEnglish: [['moose',2]],
			// mvEnglish3: [],


			// cvExists: true,
			// cvSubjectDisplay: [['arnar',6],['pi',21],['it',6]],
			// cvSubjectUnderlyingDisplay: [[['arnar-',6]],[['–rpag|@vag[N→N]',21]],[['%:(e)t',6]],],

			// cvObjectDisplay: [['tumyara',7],['t',7]],
			// cvObjectUnderlyingDisplay: [[['tumyarar-',7]],[['%:(e)t',7]],],

			// cvDisplay: [['tanger',0],['pailg',5],['at',6],['ki',7]],
			// cvUnderlyingDisplay: [[['niite-',0]],[['@+paileg',5]],[['at',6],["ki",7]]],

			// cvEnglish1: [['before',5],],			
			// cvSubjectEnglish: [['big',21],['women',6]],
			// cvEnglish2: [['saw',0]],
			// cvObjectEnglish: [['trails',7]],
			// cvEnglish3: [],


			mvSubjectDisplay: [[['arna',2],['cuara',2],['ak',2]],[['qimugt',1],['ii',1],['k',2]],],
			mvSubjectUnderlyingDisplay: [
				[[['arnar-',2]],[['–cuar(ar*)[N→N]',2]],[['%:(e)k',2]]],
				[[['qimugte-',1]],[[':(ng)a',1],['k',2]]],
				],
			mvObjectDisplay: [],
			mvObjectUnderlyingDisplay: [],

			// mvDisplay: [['aqume',0],['llru',3],['uq',1]],
			// mvUnderlyingDisplay: [[['aqume-',0]],[['–llru[V→V]',3]],[["+'(g/t)uq",1]]],

			mvEnglish1: [['<definition1>',0]],
			mvSubjectEnglish: [[['small',2],["womens'",2]],[['dog',1]]],
			mvEnglish2: [['<definition2>',0]],
			// mvEnglish2: [['sat down',0]],
			mvObjectEnglish: [['moose',2]],
			mvEnglish3: [['<definition3>',0]],

			mvSubjectSegments:"",
			// mvSegments:"nere>llru>uq",
			mvvSegments:"",
			mvnsSegments:[],

			// cvExists: false,
			// cvSubjectDisplay: [['arnar',6],['pi',21],['it',6]],
			// cvSubjectUnderlyingDisplay: [[['arnar-',6]],[['–rpag|@vag[N→N]',21]],[['%:(e)t',6]],],

			// cvObjectDisplay: [['tumyara',7],['t',7]],
			// cvObjectUnderlyingDisplay: [[['tumyarar-',7]],[['%:(e)t',7]],],

			// cvDisplay: [['tanger',0],['pailg',5],['at',6],['ki',7]],
			// cvUnderlyingDisplay: [[['niite-',0]],[['@+paileg',5]],[['at',6],["ki",7]]],

			// cvEnglish1: [['before',5],],			
			// cvSubjectEnglish: [['big',21],['women',6]],
			// cvEnglish2: [['saw',0]],
			// cvObjectEnglish: [['trails',7]],
			// cvEnglish3: [],



			// mvvBase:[["nere","–llru[V→V]"],"i"],
			// mvvMood:"Ind",
			// mvvs:[3,1,1],

			// mvnsBases:[["qimugte","–cuar(ar*)[N→N]"],["angute","–rpag|@vag[N→N]"],],
			// mvns:[[3,1,1,1],[2,1,1,1]],


			mvvBase:[],
			mvvMood:"",
			mvvs:[],

			mvnsBases:[],
			mvns:[],


			mvvo:[],
			mvnoBases:[],
			mvno:[],

			// mvSubject:[3,1,1],

			// mvSubjectNumbers: [['000','2'],['1']],
			// mvSubjectPossessor: '000',


			// mvObjectNumber: '3',
			// mvObjectPossessor: '000',


			// cvSubject: "330",
			// cvObject: "330",

			// cvSubjectExists: true,
			// cvSubjectNounExists: true,
			// cvSubjectNumber: '3',
			// cvSubjectPossessor: '000',

			// cvObjectExists: true,
			// cvObjectNounExists: true,
			// cvObjectNumber: '3',
			// cvObjectPossessor: '000',


			verbsWordsList: [],
			verbSearch:'',
			search:'',
			currentEditMode:'default',

			candidateBase:[],
			candidateFST:[],
			candidateType:'',
			showUnderlying:false,
			lockSubmit:false,
		}


	    // this.getWord = this.getWord.bind(this);
	    // this.changeBase = this.changeBase.bind(this)
	    // this.addPostbase = this.addPostbase.bind(this);
	    // // this.getWord(decodeURI(props.match.params.word),-1);
	    // this.setNoun = this.setNoun.bind(this);
	    // this.setIntransitive = this.setIntransitive.bind(this);
	    
	}


	componentDidMount() {


		let start = now();
    if (dictionary.length === 0) {
      axios
        .get(API_URL + "/word/all2021")
        .then(response => {
          let end = now();
          ReactGA.timing({
            category: 'Loading',
            variable: 'dictionary',
            value: (end-start).toFixed(3),
            label: 'Dictionary loading'
          });
          dictionary = response.data;
          console.log(dictionary)
          // fuse.setCollection(dictionary);
          // fuse1.setCollection(dictionary);
          console.log('Fetched dictionary');

          // dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
          // dictionary_prepared = fuzzysort.prepare(dictionary)

					// let filteredDictI = dictionary.filter(entry => entry.usagetags.includes('i'))
					// let filteredDictT = dictionary.filter(entry => entry.usagetags.includes('t'))
					// let filteredDictN = dictionary.filter(entry => entry.usagetags.includes('n'))

    // let wordsList = fuzzysort.go(word, filteredDictionary, optionsFuzzy).map(({ obj }) => (obj));

          this.setState({ dictionary: dictionary});
        });
    }

    if (usageDictionary.length === 0) {
      axios
        .get(API_URL + "/yupiksearchableusagelist/all")
        .then(response => {
          let end = now();
          ReactGA.timing({
            category: 'Loading',
            variable: 'dictionary',
            value: (end-start).toFixed(3),
            label: 'Dictionary loading'
          });
          usageDictionary = response.data;
          console.log(usageDictionary)
          // fuse.setCollection(dictionary);
          // fuse1.setCollection(dictionary);
          console.log('Fetched usage dictionary');

          // dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
          // dictionary_prepared = fuzzysort.prepare(dictionary)

					let filteredDictV = usageDictionary.filter(entry => (entry.type.includes('i')||entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')) )
					let filteredDictN = usageDictionary.filter(entry => (entry.type.includes('n')||entry.type.includes('[V→N]')||entry.type.includes('[N→N]')))

    // let wordsList = fuzzysort.go(word, filteredDictionary, optionsFuzzy).map(({ obj }) => (obj));

          this.setState({ usageDictionary: usageDictionary, filteredDictV: filteredDictV, filteredDictN: filteredDictN});
        });
    }

}


	backEndCallModify(command,label,value) {
		console.log(command,label,value)
		let keyChanged = [[command,label,value],]
		console.log(keyChanged)
		// let keyChangedValue=value.split('')
		let mv = {
			// nsBases:this.state.mvnsBases,
			// ns:this.state.mvns, 
			vBase:this.state.mvvBase,
			vMood:this.state.mvvMood,
		}

		if (this.state.mvvs.length > 0) {
			mv['vs'] = this.state.mvvs
		}

		if (this.state.mvvo.length > 0) {
			mv['vo'] = this.state.mvvo
		}
		// let cv = {}



		console.log(keyChanged, mv)


    axios
      .post(API_URL + "/sentencebuilder", {
      	keyChanged:keyChanged,
      	// mv:mv,
      	// cv:cv,
      })
      .then(response => {
      	console.log(response.data)
      	// if ("mv" in response.data) {
      	// 	Object.keys(response.data['mv']).map((k)=>{
      	// 		let mvkey = 'mv'+k
		     //    this.setState({
		     //    	[mvkey]: response.data['mv'][k],
		     //    })

      	// 	})
      	// }
       //  console.log(response.data.segments.mv.v);
       //  this.setState({
       //  	mvSegments: response.data.segments.mv.v,
       //  })
  		})
	}


	backEndCall(keyChanged) {
		console.log(keyChanged)

		let mv = {}
		let cv = {}
		let sv = {}
		let np = {}

		if (this.state.mvvBase.length > 0) {mv['vBase']=this.state.mvvBase}
		if (this.state.mvnsBases.length > 0) {mv['nsBases']=this.state.mvnsBases}
		if (this.state.mvns.length > 0) {mv['ns']=this.state.mvns}
		if (this.state.mvvMood.length > 0) {mv['vMood']=this.state.mvvMood}
		if (this.state.mvvs.length > 0) {mv['vs']=this.state.mvvs}

		console.log(keyChanged,mv)
    axios
      .post(API_URL + "/sentencebuilder", {
      	keyChanged:keyChanged,
      	mv:mv,
      	// cv:cv,
      	// sv:sv,
      	// np:np,
      })
      .then(response => {
      	console.log(response.data)
      	if ("mv" in response.data) {
      		Object.keys(response.data['mv']).map((k)=>{
      			let mvkey = 'mv'+k
		        this.setState({
		        	[mvkey]: response.data['mv'][k],
		        })

      		})
      	}
      	if ("segments" in response.data) {
      		if ("mv" in response.data.segments) {
      			if ("v" in response.data.segments.mv) {
			        this.setState({
			        	mvvSegments: response.data.segments.mv.v,
			        })      				
      			}
      			if ("ns" in response.data.segments.mv) {
			        this.setState({
			        	mvnsSegments: response.data.segments.mv.ns,
			        })      				
      			}
      		}
      	}

  		})

	}

	modifySentence(change, data, entry) {

		console.log(change,data,entry)


		if (change === 'mvvs') {
			this.setState({mvvs:entry.value.split('').map(Number)},()=>{this.backEndCall([["Update",["mv","vs"],entry.value.split('').map(Number)]])})
		}

		if (change === 'mvvo') {
			this.setState({mvvo:entry.value.split('').map(Number)},()=>{this.backEndCallModify('Update',["mv","vo"],entry.value.split('').map(Number))})
		}

		if (change === 'mvvBase') {
			this.setState({mvvBase: change[1] },()=>{this.backEndCallModify('Update',["mv","vBase"],change[1])})
		}

				// let keyChanged = verb
		// let keyChangedValue=value.split('')
		// let mv = {
		// 	nsBases:this.state.mvnsBases,
		// 	ns:this.state.mvns, 
		// 	vBase:this.state.mvvBase,
		// 	vMood:this.state.mvvMood,
		// 	vTrans:this.state.mvvTrans,
		// 	vs:this.state.mvvs,
		// }
		// let cv = {}



		// console.log(keyChanged,keyChangedValue,mv)


  //   axios
  //     .post(API_URL + "/sentencebuilder", {
  //     	keyChanged:keyChanged,
  //     	keyChangedValue:keyChangedValue,
  //     	mv:mv,
  //     	cv:cv,
  //     })
  //     .then(response => {
  //       console.log(response);
  // 		})
	
	}

	// changeVerbEnding(reset,e, data) {
	// 	console.log(data.value)
	// 	// let mood = 'Interrogative'
	// 	// let moodSpecific = data.value
	// 	this.setState({endingNumber:data.value});	
	// 	if (reset) {
	// 		this.changeEnding('Indicative','','')
	// 	} else {
	// 		if (data.value === 0) {
	// 			this.changeEnding('Participial','','')
	// 		} else {
	// 			this.changeEnding('Interrogative',data.value,'')
	// 		}		
	// 	}
		
	// }



	processStyledText = (sentence) => {			
		let matches = sentence.match(/\⎡.*?\⎤/g)
		if (matches !== null) {
			matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))		
			return <span dangerouslySetInnerHTML={{__html: sentence}} />		
		} else {
			return <span>{sentence.replace("<","").replace(">","")}</span>
		}
	}


	onChangeBaseSearch = (endingNeeded,event,data) => {
		let word = data.value
		let wordsList
		if (endingNeeded === 'v') {
    	wordsList = fuzzysort.go(word, this.state.filteredDictV, optionsFuzzy).map(({ obj }) => (obj));
    	this.setState({ verbsWordsList: wordsList, verbSearch: word });
		} else if (endingNeeded = 'n') {
    	wordsList = fuzzysort.go(word, this.state.filteredDictN, optionsFuzzy).map(({ obj }) => (obj));
    	this.setState({ verbsWordsList: wordsList, verbSearch: word });
		}
	}


	onChangeSearch = (searchType,event,data) => {
    // console.log(bool,homeMode, event,data)
    // let word
    // if (bool) {
      // word = data
    // } else {
    let word = data.value
    //   homeMode = this.state.homeMode
    // }

    let wordsList
    // word = word.replaceAll("’","'").replaceAll("ḷ","ḷ").replaceAll("ł̣","ł̣").replaceAll("G","ġ").replaceAll("g.","ġ").replaceAll("l.","ḷ").replaceAll("L","ł").replaceAll("ł.","ł̣");
    // new_search = word.replaceAll('ġ','g').replaceAll('ñ','n').replaceAll('ḷ','l').replaceAll('ł','l').replaceAll('ł̣','l').replaceAll('G','g').replaceAll('(','').replaceAll('-','').replaceAll(')','').toLowerCase().replaceAll('he is ','').replaceAll('she is ','').replaceAll('it is ','').replaceAll('i am ','').replaceAll(' ','').replaceAll(',','')

    // console.log(word, new_search)
    // if (homeMode === 1) {
    	// wordsList = fuzzysort.go(new_search, usagedictionary, optionsUsageFuzzy).map(({ obj }) => (obj));
    // } else if (homeMode === 0) {
		// let filterFlag = 'i'
    // let filteredDictionary = dictionary.filter(entry => entry.usagetags.includes(filterFlag))
    if (searchType === 'i') {
    	wordsList = fuzzysort.go(word, this.state.filteredDictI, optionsFuzzy).map(({ obj }) => (obj));
    	this.setState({ verbsWordsList: wordsList, verbSearch: word });

    } else if (searchType === 't') {
    	wordsList = fuzzysort.go(word, this.state.filteredDictT, optionsFuzzy).map(({ obj }) => (obj));
    } else if (searchType === 'n') {
    	wordsList = fuzzysort.go(word, this.state.filteredDictN, optionsFuzzy).map(({ obj }) => (obj));
    	this.setState({ verbsWordsList: wordsList, search: word });

    }
    // } else if (homeMode === 2) {
    	// wordsList = fuzzysort.go(new_search, audiolibrary, optionsAudioFuzzy).map(({ obj }) => (obj));
    // }


	}

	

  handleOpen = (current) => {
    this.setState({ isOpen: true ,currentlyOpen: current});
  }
  
  menuSelect = (direction) => {
    this.setState({ isOpen: false },()=>{this.setState({currentEditMode:direction, isOpen: true})});
    
  }

	editMenu = (type,ind) => {

		// if (mind) {
		// 	mind=mind.toString()			
		// }
		// console.log(type,ind)
		let typeInd = type+(ind+1).toString()

		// console.log(typeInd)

		if (type==='default') {
			         		return <Popup
		                trigger={									
											<Button icon>
												<Icon name='plus' />
											</Button>
		                }
		                on='click'
		                open={this.state.isOpen && this.state.currentlyOpen === typeInd}
		                onOpen={()=>{this.handleOpen(typeInd)}}
		                onClose={()=>{this.setState({isOpen:false,currentEditMode:'default'})}}
		                position='bottom center'
		                style={{
		                	height:(this.state.currentEditMode==='default' ? 80 : '406px'),
		                	padding:(this.state.currentEditMode==='default' ? 0 : null)}}
		                content={
											this.state.currentEditMode==='default' ?
											<Menu vertical>
							        <Menu.Item
							          name='messages'
							          // active={this.state.activeItem === 'messages'}
							          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
							          onClick={()=>{this.menuSelect('changeverbbase')}}
							        >
							          <div>Add Main Verb Phrase</div>
		                		<Icon name='chevron right' />
							        </Menu.Item>
							        <Menu.Item
							          name='messages'
							          // active={this.state.activeItem === 'messages'}
							          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
							          onClick={()=>{this.menuSelect('changeverbbase')}}
							        >
							          <div>Add Noun Phrase</div>
		                		<Icon name='chevron right' />
							        </Menu.Item>					        
							        </Menu>
							        :
							        this.baseChooser(["Insert",["mv",]],'v')
							      }
							      />

		} else if (type === 'mvns') {
			         		return <Popup
		                trigger={									

												<div style={{paddingRight:10,cursor:'pointer',marginBottom:10,}}>
												{this.state.mvnsSegments[ind].map((k,kind)=>
													<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
														{k.replaceAll('>','')}
													</div>													
												)}
												</div>
											
		                }
		                on='click'
		                open={this.state.isOpen && this.state.currentlyOpen === typeInd}
		                onOpen={()=>{this.handleOpen(typeInd)}}
		                onClose={()=>{this.setState({isOpen:false,currentEditMode:'default'})}}
		                position='bottom center'
		                style={{
		                	height:(this.state.currentEditMode==='default' ? 80 : '406px'),
		                	padding:(this.state.currentEditMode==='default' ? 0 : null)}}
		                content={
											this.state.currentEditMode==='default' ?
											<Menu vertical>
							        <Menu.Item
							          name='messages'
							          // active={this.state.activeItem === 'messages'}
							          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
							          onClick={()=>{this.menuSelect('changeverbbase')}}
							        >
							          <div>Change Noun</div>
		                		<Icon name='chevron right' />
							        </Menu.Item>
							        <Menu.Item
							          name='messages'
							          // active={this.state.activeItem === 'messages'}
							          // onClick={()=>{this.setState({currentEditMode:'changeverbbase'})}}
							        >
							          Delete Noun
							        </Menu.Item>							        
							        </Menu>
							        :
							        null
							      }
							      />
			
		} else if (type === 'mv') {

		         //        trigger={
											// <div style={{marginBottom:10,fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											// 	<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>

											// 	{this.state.mvDisplay.map((m, mind)=>
											// 			<span style={{color:this.state.colorsList[m[1]],paddingBottom:'2px',borderBottom:'2px solid '+this.state.colorsList[m[1]]}}>{m[0]}</span>
											// 		)}

											// 	</div>
											// </div>
		         //        }

			         		return <Popup
		                trigger={
											<div style={{marginBottom:10,fontSize:'30px',color:'#000000',fontWeight:'400'}}>
												<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
													{this.state.mvvSegments.replaceAll('>','')}
												</div>
											</div>
		                }
		                on='click'
		                open={this.state.isOpen && this.state.currentlyOpen === 'mv'}
		                onOpen={()=>{this.handleOpen('mv')}}
		                onClose={()=>{this.setState({isOpen:false,currentEditMode:'default'})}}
		                position='bottom center'
		                style={{
		                	height:(this.state.currentEditMode==='default' ? 80 : '406px'),
		                	padding:(this.state.currentEditMode==='default' ? 0 : null)}}
		                content={
											this.state.currentEditMode==='default' ?
											<Menu vertical>
							        <Menu.Item
							          name='messages'
							          // active={this.state.activeItem === 'messages'}
							          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
							          onClick={()=>{this.menuSelect('changeverbbase')}}
							        >
							          <div>Change Main Verb</div>
		                		<Icon name='chevron right' />
							        </Menu.Item>
							        <Menu.Item
							          name='messages'
							          // active={this.state.activeItem === 'messages'}
							          // onClick={()=>{this.setState({currentEditMode:'changeverbbase'})}}
							        >
							          Delete Main Verb
							        </Menu.Item>							        
							        </Menu>
							        :
							        this.baseChooser()
							      }
							      />
		      // }
		}
	}

	updateCandidateCall=()=>{
		let lockSubmit = false
		let candidateFST = ''
		let type = 'Ind'
		let transitivity = ''
		this.state.candidateBase.reverse().map((x,xind)=>{
			if (xind === 0 && x['type'].length < 3) {
				lockSubmit = true
				transitivity = x['type'] 
			}
			candidateFST = candidateFST + x['fsts'][0]
		})

		if (lockSubmit) {
	  	this.setState({
	  		candidateCall:[candidateFST,type,transitivity],
	  		lockSubmit:lockSubmit,
	  	})			
		}
	}

	baseChooser = (itemUpdating,endingNeeded) => {
		         return <Grid style={{height:'400px',width:'505px'}}>
		                	<Grid.Row columns={2} style={{paddingBottom:'0px'}}divided>
		                	<Grid.Column >
		                		<Button onClick={()=>{this.menuSelect('default')}} style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'13px'}}>
		                			<Icon name='chevron left' />
		                			<div style={{color:'#666666'}}>{'Back'}</div>
		                		</Button>
		                		<div style={{color:'#666666',marginTop:'5px',marginBottom:'5px'}}>{'Change Verb Base'}</div>
									      <Input 
									      icon='search' 
									      iconPosition='left' 
									      name='search'     
									      // width='100%'
									      style={{width:'220px'}}
									 		  onChange={this.onChangeBaseSearch.bind(this,endingNeeded)}
						            value={this.state.verbSearch}
						            />
									      <Segment vertical style={{height:255,overflow: 'auto',padding:0,marginTop:5,marginBottom:0,borderBottom:'0px solid #e2e2e2'}}>
									      <List selection>
										    {this.state.verbsWordsList.map((k)=>{return <List.Item onClick={()=>{
										    	// let candidateFST = ''
										    	// let lockSubmit = false
										    	// console.log(this.state.candidateBase)
										    	// this.state.candidateBase.reverse().map((x,xind)=>{
										    	// 	console.log(xind === 0, x['type'].length < 3)
										    	// let lockSubmit = false
									    		// if (k['type'].length < 3) {
									    		// 	lockSubmit = true

									    		// }
										    	// 	candidateFST = candidateFST + x['fsts'][0]
										    	// })
										    	this.setState({
										    		verbSearch:'',
										    		verbsWordsList:[],
										    		candidateBase:this.state.candidateBase.concat(k),
										    		// candidateFST:this.state.candidateFST.concat(k['fsts'][0]),
										    		// lockSubmit:lockSubmit,
										    	},()=>{
										    		this.updateCandidateCall()
										    	})

										    }} style={{cursor:'pointer',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'15px',padding:5}}>
											        <List.Description style={{paddingBottom:'4px'}}>{k['yupikword']}</List.Description>
											        <List.Header style={{fontWeight:'400'}}>{k['englishraw']}</List.Header>
											      </List.Item>				      	
										      })}
									    	</List>
									      </Segment>
									      {this.state.verbsWordsList.length > 0 ?
										      <div style={{textAlign:'center'}}>
											      <Icon color='grey' name='chevron down' />
										      </div>
										      :
										      null
										    }

										  </Grid.Column>
										  <Grid.Column style={{display:'flex',flexDirection:'column'}}>
									  
									        <div style={{color:'#666666'}}>{'Candidate (English Order)'}</div>
									        <Segment style={{height:290,overflow: 'auto',padding:10}}>
									        	<List divided>
									        	{this.state.candidateBase.map((k,kindex)=>{return (kindex===this.state.candidateBase.length-1 ?
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
										        		<div style={{flex:1}}>
											        		<div style={{color:'#000000b3'}}>{k['yupikword']}</div>
											        		<div style={{fontWeight:''}}>{k['englishraw']}</div>
										        		</div>
										        		<Icon circular onClick={()=>{this.setState({candidateBase:this.state.candidateBase.slice(0,-1)},()=>{this.updateCandidateCall()})}} style={{cursor:'pointer',width:30}} name='x' />
										        		</List.Item>
									        			:
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
										        		<div style={{flex:1}}>										        		
											        		<div style={{color:'#000000b3'}}>{k['yupikword']}</div>
											        		<div style={{fontWeight:''}}>{k['englishraw']}</div>
										        		</div>
										        		<div style={{width:30}} />
										        		</List.Item>
									        			)
									        	})}
									        	</List>
								        	</Segment>
									      <div style={{paddingBottom:10}}>
		                		<Button color='blue' disabled={!this.state.lockSubmit} style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}>
		                			<div>{'Submit'}</div>
		                			<Icon name='chevron right' />
		                		</Button>
		                		</div>

		                	</Grid.Column>
		                	</Grid.Row>
									    </Grid>

	}

	render() {
		console.log(this.state)
		// console.log(this.state.mvvs.join(""))
		// console.log(this.state.colorsList)
		// let verbQuestionWords = [
		// 	{value:0,key:0,text:'past tense',disabled:this.state.hasFuture},
		// 	{value:1,key:1,text:'question: yes or no?'},
		// 	{value:2,key:2,text:'question: why?'},
		// 	{value:3,key:3,text:'question: how?'},
		// 	{value:4,key:4,text:'question: where at?'},
		// 	{value:5,key:5,text:'question: to where?'},
		// 	{value:6,key:6,text:'question: from where?'},
		// ]

		return (
			<div style={{fontFamily:customFontFam}}>

      <Grid textAlign='center'>
      <Grid.Row  style={{height:40,paddingBottom:0}}>
      <Grid.Column style={{ maxWidth: 800, padding: 10 }} textAlign='left'>

			<div style={{display:'flex',textDecoration:'underline'}}>
	      <div style={{flex:1,justifyContent:'flex-start'}}>
					<Link to={{pathname: '/'}}>
					Back to Search
					</Link>
	      </div>


	      <div style={{flex:1,display:'flex',justifyContent:'flex-end',paddingLeft:5,textDecoration:'underline'}}>
					<Link to={{pathname: '/'+ this.state.entryUrl}}>
					<span>

					{'See Dictionary Entry: '}
					</span>
					<span style={{fontWeight:'500'}}>
					{this.state.entryUrl}
					</span>
					</Link>
				</div>
			</div>



			<div><Button onClick={this.modifySentence.bind(this,['mvvBase',[["nere","–llru[V→V]"],"t"]])}>Transitive</Button></div>
			<div><Button onClick={this.modifySentence.bind(this,['mvvBase',[["nere","–llru[V→V]"],"i"]])}>Intransitive</Button></div>

			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv",],[["aqume","–llru[V→V]"],"i","Ind"]]])}}>Add mv</Button></div>
			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv","ns",0,0],[["angute",],[0,0,0,1]]]])}}>Add noun</Button></div>
			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv","ns",0],[["arnar",],[0,0,0,1]]]])}}>Add woman possessed</Button></div>
			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv","ns",-1],[["qimugte",],[0,0,0,1]]]])}}>Add dog possessor</Button></div>

					<div style={{border:'1px solid #E3E3E3',marginTop:'20px'}}>

					<div className='hierarchymain'>
					<span className='span2'>Word Builder</span>
					</div>



				<Container>
					<div>

							<div style={{marginTop:'30px',}}>

							 	{this.state.mvnsBases.length > 0 ? 
									<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.mvnsSegments.reverse().map((k,kind)=> {
												return <span>{this.editMenu('mvns',kind)}</span>								
											})}
											</div>	

										</div>
										{this.state.showUnderlying ?
											<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
											{this.state.mvSubjectUnderlyingDisplay.map((y)=>
													<span style={{padding:'8px'}}>
													{y.map((z)=>
														<span style={{padding:'8px'}}>
														{z.map((x,xind)=> <span style={{opacity:0.6,borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
														</span>
													)}
													</span>
											)}
											</div>
											:
											null
										}
									</div>
									:
									null
								}



							 	{this.state.mvnoBases.length > 0 ? 
							 		<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
											{this.state.mvObjectDisplay.map((m, mind)=>
													<span style={{color:this.state.colorsList[m[1]]}}>{m[0]}</span>
												)}
											</div>
										</div>
										{this.state.showUnderlying ?
											<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
											{this.state.mvObjectUnderlyingDisplay.map((y)=>
												<span style={{padding:'8px'}}>
												{y.map((x,xind)=> <span style={{opacity:0.6,borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
												</span>
											)}
											</div>		
											:
											null
										}	
									</div>
									:
									null
								}			

								{this.state.mvvBase.length > 0 ?
									this.editMenu('mv',-1)
									:
									null
								}


								{this.state.showUnderlying ?
									<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
									{this.state.mvUnderlyingDisplay.map((y)=>
										<span style={{padding:'8px'}}>
										{y.map((x,xind)=> <span style={{opacity:0.6,borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
										</span>
									)}
									</div>
									:
									null
								}



								<div style={{textAlign:'center',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>

								{this.state.mvEnglish1.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}			

								{this.state.mvvs.length > 0 ?
									(this.state.mvnsSegments.length > 0 ? 
										<span>					
											{this.state.mvnsSegments.map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",0,0],(data.value+this.state.mvns[0][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvns[0][0].slice(0, -1).join("")} options={nounOptionsPossessors} />
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",0,0],this.state.mvns[0][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvns[0][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((w,wind)=>
														<span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",0,xind],this.state.mvns[xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvns[xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{x.map((w,wind)=>
															<span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
															)}
													</span>
												}
												</span>
											)}
										</span>
										:
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={mvSubjectOptions} />
										</span>
										)
									:
									null
								}

						
								{this.state.mvEnglish2.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}		


								{this.state.mvvo.length > 0 ?
									(this.state.mvnoBases.length > 0 ? 
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={this.modifySentence.bind(this, 'Update', ['mv','vs'])} value={this.state.mvObjectPossessor} options={nounOptionsPossessors} />
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}}  onChange={this.modifySentence.bind(this, 'Update', ['mv','vs'])} value={this.state.mvObjectNumber} options={nounOptionsNumbers} />								
											{this.state.mvObjectEnglish.map((w,wind)=>{
												return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
											})}
											<Icon style={{color:this.state.colorsList[2]}}  name='edit outline' />
										</span>
										:
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}} onChange={this.modifySentence.bind(this, ['mvvo'])}  value={this.state.mvvo.join("")} options={mvObjectOptions} />
										</span>
									)
									:
									null
								}

								{this.state.mvEnglish3.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}

								</div>

								<div style={{display:'flex',justifyContent:'center'}}>

								{this.editMenu('default')}

								</div>

							</div>


						{this.state.cvExists ?

							<div style={{marginTop:'30px',}}>

							 	{this.state.cvSubjectNounExists ? 
									<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
											{this.state.cvSubjectDisplay.map((m, mind)=>
													<span style={{color:this.state.colorsList[m[1]]}}>{m[0]}</span>
												)}
											</div>
										</div>

										{this.state.showUnderlying ?
											<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
											{this.state.cvSubjectUnderlyingDisplay.map((y)=>
												<span style={{padding:'8px'}}>
												{y.map((x,xind)=> <span style={{borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
												</span>
											)}
											</div>
											:
											null
										}
									</div>
									:
									null
								}

							 	{this.state.cvObjectNounExists ? 
							 		<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
											{this.state.cvObjectDisplay.map((m, mind)=>
													<span style={{color:this.state.colorsList[m[1]]}}>{m[0]}</span>
												)}
											</div>
										</div>

										{this.state.showUnderlying ?
											<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
											{this.state.cvObjectUnderlyingDisplay.map((y)=>
												<span style={{padding:'8px'}}>
												{y.map((x,xind)=> <span style={{borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
												</span>
											)}
											</div>			
											:
											null
										}
									</div>
									:
									null
								}			

								<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
									<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.cvDisplay.map((m, mind)=>
											<span style={{color:this.state.colorsList[m[1]]}}>{m[0]}</span>
										)}
									</div>
								</div>

								{this.state.showUnderlying ?
									<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
									{this.state.cvUnderlyingDisplay.map((y)=>
										<span style={{padding:'8px'}}>
										{y.map((x,xind)=> <span style={{borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
										</span>
									)}
									</div>
									:
									null
								}


								<div style={{textAlign:'center',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>

								{this.state.cvEnglish1.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}			

								{this.state.cvSubjectExists ?
									(this.state.cvSubjectNounExists ? 
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:this.state.colorsList[6],fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} value={this.state.cvSubjectPossessor} options={nounOptionsPossessors} />
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:this.state.colorsList[6],fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} value={this.state.cvSubjectNumber} options={nounOptionsNumbers} />								
											{this.state.cvSubjectEnglish.map((w,wind)=>{
												return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
											})}
											<Icon style={{color:this.state.colorsList[6]}}  name='edit outline' />
										</span>
										:
										<span>
											<Dropdown inline scrolling style={{backgroundColor:this.state.colorsList[6],color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  value={this.state.cvSubject} options={mvSubjectOptions} />
										</span>
										)
									:
									null
								}

						
								{this.state.cvEnglish2.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}		
								<Icon style={{color:this.state.colorsList[0]}}  name='edit outline' />


								{this.state.cvObjectExists ?
									(this.state.cvObjectNounExists ? 
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:this.state.colorsList[7],fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} value={this.state.cvObjectPossessor} options={nounOptionsPossessors} />
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:this.state.colorsList[7],fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} value={this.state.cvObjectNumber} options={nounOptionsNumbers} />								
											{this.state.cvObjectEnglish.map((w,wind)=>{
												return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
											})}
											<Icon style={{color:this.state.colorsList[7]}}  name='edit outline' />																	
										</span>
										:
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:this.state.colorsList[7],fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  value={this.state.cvObject} options={mvObjectOptions} />
										</span>
									)
									:
									null
								}

								{this.state.cvEnglish3.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}

								</div>

							</div>		
							:
							null
						}

					</div>
				</Container>



				<div style={{height:'15px'}} />


				</div>
{/*		              <Popup
		                trigger={<Icon style={{color:this.state.colorsList[0]}} link name='edit outline'>{'\n'}</Icon>}
		                on='click'
		                position='bottom left'
		                style={{maxHeight:(this.state.verbsWordsList.length > 0 ? '400px' : '110px')}}
		                content={
		                	<div>
		                		<div style={{color:'#666666',marginBottom:'5px'}}>{'Change Base'}</div>
									      <Input 
									      icon='search' 
									      iconPosition='left' 
									      name='search'     
									      // width='100%'
									      style={{width:'220px'}}
									 		  onChange={this.onChangeSearch.bind(this,this.state.mvvBase)}
						            value={this.state.verbSearch}
						            />
									      <Segment vertical style={{maxHeight:300,overflow: 'auto',padding:0,marginTop:5,marginBottom:0,borderBottom:'0px solid #e2e2e2'}}>
									      <List selection>
										    {this.state.verbsWordsList.length > 0 ?
										      (this.state.verbsWordsList.map((k)=>{return <List.Item onClick={()=>{this.setState({search:'',verbsWordsList:[],opened:false}); this.changeBase(k,this.state.mvvBase)}} style={{cursor:'pointer',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'15px',padding:5}}>
											        <List.Header style={{paddingBottom:'4px'}}>{k['keyString']}</List.Header>
											        <List.Description style={{fontWeight:'400'}}>{k['definitionString']}</List.Description>
											      </List.Item>				      	
										      }))
									      :
									      (this.state.search.length > 1 ? 
										      <div style={{marginTop:'2px',color:'grey'}}>{'No results'}</div>
										      :
										      null
									      )
									    }
									    	</List>
									      </Segment>
									      {this.state.verbsWordsList.length > 0 ?
										      <div style={{textAlign:'center'}}>
											      <Icon color='grey' name='chevron down' />
										      </div>
										      :
										      null
										    }
									    </div>
		                }
		              />

*/}
{/*									<div style={{display:'flex',justifyContent:'center'}}>
		              {this.editMenu('mv')}
		              </div>
*/}
{/*
		              <Popup
		                trigger={<Icon style={{color:this.state.colorsList[0]}} link name='edit outline'>{'\n'}</Icon>}
		                on='click'
		                position='bottom left'
		                style={{height:'406px'}}
		                content={
		                	<Grid style={{height:'400px',width:'505px'}}>
		                	<Grid.Row columns={2} style={{paddingBottom:'0px'}}divided>
		                	<Grid.Column >
		                		<Button style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'13px'}}>
		                			<Icon name='chevron left' />
		                			<div style={{color:'#666666'}}>{'Back'}</div>
		                		</Button>
		                		<div style={{color:'#666666',marginTop:'5px',marginBottom:'5px'}}>{'Change Verb Base'}</div>
									      <Input 
									      icon='search' 
									      iconPosition='left' 
									      name='search'     
									      // width='100%'
									      style={{width:'220px'}}
									 		  onChange={this.onChangeSearch.bind(this,this.state.mvvBase)}
						            value={this.state.verbSearch}
						            />
									      <Segment vertical style={{height:255,overflow: 'auto',padding:0,marginTop:5,marginBottom:0,borderBottom:'0px solid #e2e2e2'}}>
									      <List selection>
										    {this.state.verbsWordsList.map((k)=>{return <List.Item onClick={()=>{this.setState({verbSearch:'',verbsWordsList:[],candidateBase:this.state.candidateBase.concat(k)})}} style={{cursor:'pointer',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'15px',padding:5}}>
											        <List.Description style={{paddingBottom:'4px'}}>{k['keyString']}</List.Description>
											        <List.Header style={{fontWeight:'400'}}>{k['definitionString']}</List.Header>
											      </List.Item>				      	
										      })}
									    	</List>
									      </Segment>
									      {this.state.verbsWordsList.length > 0 ?
										      <div style={{textAlign:'center'}}>
											      <Icon color='grey' name='chevron down' />
										      </div>
										      :
										      null
										    }

										  </Grid.Column>
										  <Grid.Column style={{display:'flex',flexDirection:'column'}}>
									  
									        <div style={{color:'#666666'}}>{'Candidate (English Order)'}</div>
									        <Segment style={{height:290,overflow: 'auto',padding:10}}>
									        	<List divided>
									        	{this.state.candidateBase.map((k,kindex)=>{return (kindex===this.state.candidateBase.length-1 ?
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
										        		<div style={{flex:1}}>
											        		<div style={{color:'#000000b3'}}>{k['keyString']}</div>
											        		<div style={{fontWeight:''}}>{k['definitionString']}</div>
										        		</div>
										        		<Icon circular onClick={()=>{this.setState({candidateBase:this.state.candidateBase.slice(0,-1)})}} style={{cursor:'pointer',width:30}} name='x' />
										        		</List.Item>
									        			:
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
										        		<div style={{flex:1}}>										        		
											        		<div style={{color:'#000000b3'}}>{k['keyString']}</div>
											        		<div style={{fontWeight:''}}>{k['definitionString']}</div>
										        		</div>
										        		<div style={{width:30}} />
										        		</List.Item>
									        			)
									        	})}
									        	</List>
								        	</Segment>
									      <div style={{paddingBottom:10}}>
		                		<Button color='blue' disabled={true} style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}>
		                			<div>{'Submit'}</div>
		                			<Icon name='chevron right' />
		                		</Button>
		                		</div>

		                	</Grid.Column>
		                	</Grid.Row>
									    </Grid>
		                }
		              />
*/}




			</Grid.Column>  
			</Grid.Row>
			</Grid>


			</div>
		);
	}
}
export default OneVerbWordBuilder;