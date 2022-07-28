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

			mvEnglish1: [['<>',0]],
			mvSubjectEnglish: [[['small',2],["womens'",2]],[['dog',1]]],
			mvEnglish2: [['<>',0]],
			// mvEnglish2: [['sat down',0]],
			mvObjectEnglish: [['moose',2]],
			mvEnglish3: [['<>',0]],

			mvSubjectSegments:"",
			// mvSegments:"nere>llru>uq",
			mvvSegments:"",
			mvnsSegments:[],
			mvnoSegments:[],

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


			npn:[],
			npnBases:[],
			npnCase:[],
			npnSegments:[],

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


			wordsList: [],
			searchQuery:'',
			search:'',
			currentEditMode:'default',

			candidateBase:[],
			candidateFST:[],
			candidateType:'',
			showUnderlying:false,
			lockSubmit:false,
		}

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
          console.log('Fetched dictionary');

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
          console.log('Fetched usage dictionary');

					let filteredDictV = usageDictionary.filter(entry => (entry.type.includes('i')||entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')) )
					let filteredDictN = usageDictionary.filter(entry => (entry.type.includes('n')||entry.type.includes('[V→N]')||entry.type.includes('[N→N]')))

    // let wordsList = fuzzysort.go(word, filteredDictionary, optionsFuzzy).map(({ obj }) => (obj));

          this.setState({ usageDictionary: usageDictionary, filteredDictV: filteredDictV, filteredDictN: filteredDictN});
        });
    }

}


	initialize(type) {
		if (type === 'mv') {

			this.setState({
				mvvBase:[],
				mvnsBases:[],
				mvnoBases:[],
				mvno:[],				
				mvns:[],
				mvvMood:"",
				mvvs:[],
				mvvo:[],
			})

		}
	}
	backEndCall(keyChanged) {
		console.log(keyChanged)

		let mv = {}
		let cv = {}
		let sv = {}
		let np = {}

		if (this.state.mvvBase.length > 0) {mv['vBase']=this.state.mvvBase}
		if (this.state.mvnsBases.length > 0) {mv['nsBases']=this.state.mvnsBases}
		if (this.state.mvnoBases.length > 0) {mv['noBases']=this.state.mvnoBases}
		if (this.state.mvno.length > 0) {mv['no']=this.state.mvno}
		if (this.state.mvns.length > 0) {mv['ns']=this.state.mvns}
		if (this.state.mvvMood.length > 0) {mv['vMood']=this.state.mvvMood}
		if (this.state.mvvs.length > 0) {mv['vs']=this.state.mvvs}
		if (this.state.mvvo.length > 0) {mv['vo']=this.state.mvvo}

		if (this.state.npn.length > 0) {np['npn']=this.state.npn}
		if (this.state.npnBases.length > 0) {np['npnBases']=this.state.npnBases}
		if (this.state.npnCase.length > 0) {np['npnCase']=this.state.npnCase}

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
      	} else {
      		this.initialize('mv')
      	}
      	if ("np" in response.data) {
      		Object.keys(response.data['np']).map((k)=>{
      			let npkey = 'np'+k
		        this.setState({
		        	[npkey]: response.data['np'][k],
		        })

      		})
      	} else {
      		this.initialize('np')
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
      			if ("no" in response.data.segments.mv) {
			        this.setState({
			        	mvnoSegments: response.data.segments.mv.no,
			        })      				
      			}      			  
      		}

    			if ("np" in response.data.segments) {
    				if ("n" in response.data.segments.np) {
			        this.setState({
			        	npnSegments: response.data.segments.np.n,
			        })      				
			      }
    			} 

      	}

  		})

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


	onChangeBaseSearch = (endingNeeded,event,data) => {
		let word = data.value
		let wordsList
		if (endingNeeded === 'v') {
    	wordsList = fuzzysort.go(word, this.state.filteredDictV, optionsFuzzy).map(({ obj }) => (obj));
    	this.setState({ wordsList: wordsList, searchQuery: word });
		} else if (endingNeeded = 'n') {
    	wordsList = fuzzysort.go(word, this.state.filteredDictN, optionsFuzzy).map(({ obj }) => (obj));
    	this.setState({ wordsList: wordsList, searchQuery: word });
		}
	}

	

  handleOpen = (current) => {
    this.setState({ isOpen: true ,currentlyOpen: current});
  }
  
  menuSelect = (direction) => {
    this.setState({ isOpen: false },()=>{this.setState({currentEditMode:direction, isOpen: true})});
    
  }

  returnHeight = (type) => {
  	if (type === 'default') {
  		return 80
  	} else {
  		return 406
  	}
  }

  triggerItems = (type,ind) => {
  	if (type==='default') {
  		return <Button size='large' icon>
							 <Icon name='plus' />
						 </Button>
  	} else if (type==='defaultmv') {
  		return <Button size='small' icon>
							 <Icon name='plus' />
						 </Button>
  	} else if (type==='mvns') {
  		return <div style={{paddingRight:10,cursor:'pointer',marginBottom:10,}}>
							{this.state.mvnsSegments.slice().reverse()[ind].map((k,kind)=>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{k.replaceAll('>','')}
								</div>													
							)}
							</div>
  	} else if (type==='mvno') {
  		return 	<div style={{paddingRight:10,cursor:'pointer',marginBottom:10,}}>
							{this.state.mvnoSegments.slice().reverse()[ind].map((k,kind)=>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{k.replaceAll('>','')}
								</div>													
							)}
							</div>	
  	} else if (type==='mv') {
  		return 	<div style={{marginBottom:10,fontSize:'30px',color:'#000000',fontWeight:'400'}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.mvvSegments.replaceAll('>','')}
								</div>
							</div>
  	}
    	
  }

  contentItems = (type,ind) => {
  	if (this.state.currentEditMode==='default') {
  		if (type === 'default') {
  			return <Menu vertical>
			      {this.menuItem('BaseChooser','Add Main Verb Phrase','mvinsert',null,null)}
			      {this.menuItem('BaseChooser','Add Noun Phrase','npinsert',null,null)}
			      {this.menuItem('BaseChooser','Ask Question Phrase','question','Int',null)}
			      {this.menuItem('BaseChooser','Make Command','command',null,null)}
			    	</Menu>  			
  		} else if (type === 'defaultmv') {
				return <Menu vertical>
						{this.state.mvvs.length > 0 && this.state.mvns.length == 0 ? this.menuItem('BaseChooser','Add Noun Subject','mvnsinsert',null) : null}
						{this.state.mvvo.length > 0 && this.state.mvno.length == 0 ? this.menuItem('BaseChooser','Add Noun Object','mvinsert',null) : null}
			    	</Menu>  			
  		} else if (type === 'mv') {
				return <Menu vertical>
			      {this.subMenuItem('Change Verb Type')}
			      {this.menuItem('BaseChooser','Change Main Verb','mvupdate',null)}
			      {this.menuItem('BaseChooser','Delete Main Verb','npinsert',null)}
			    	</Menu>  			
 			} else if (type === 'mvns') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Noun','mvnsupdate',null)}
						{ind == 0 ? this.menuItem('BaseChooser','Add Possessor Noun','mvnspossessorinsert',null) : null}
			      {ind == this.state.mvns.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun','mvnsinsert',null): null}
			    	</Menu>  			
 			}
  	} else if (this.state.currentEditMode==='mvinsert') {
  		return this.baseChooser(["Insert",["mv"]],'v','insert')
  	} else if (this.state.currentEditMode==='mvupdate') {
  		return this.baseChooser(["Update",["mv","vBase"]],'v','update')
  	} else if (this.state.currentEditMode==='npinsert') {
  		return this.baseChooser(["Insert",["np"]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnsinsert') {
  		return this.baseChooser(["Insert",["mv","ns",0]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnsupdate') {
  		return this.baseChooser(["Update",["mv","ns",this.state.mvnsSegments.length-1-ind,0]],'n','insert')
  	} else if (this.state.currentEditMode==='npinsert') {
  		return this.baseChooser(["Insert",["np"]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnspossessorinsert') {
  		return this.baseChooser(["Insert",["mv","ns",-1]],'n','insert')
  	} else if (this.state.currentEditMode==='question') {
  		return this.menuItem('Question','Make Command','command',null,null)
  	}
    	
  }

	editMenu = (type,ind) => {

		// if (mind) {
		// 	mind=mind.toString()			
		// }
		// console.log(type,ind)
		let typeInd = type+(ind+1).toString()

		// console.log(typeInd)

 		return <Popup
      trigger={									
				this.triggerItems(type,ind)
      }
      on='click'
      open={this.state.isOpen && this.state.currentlyOpen === typeInd}
      onOpen={()=>{this.handleOpen(typeInd)}}
      onClose={()=>{this.setState({isOpen:false,currentEditMode:'default'})}}
      position='bottom center'
      style={{
      	height:(this.returnHeight(this.state.currentEditMode)),
      	padding:(this.state.currentEditMode==='default' ? 0 : null)}}
      content={
      	this.contentItems(type,ind)
      }
      />

	}


	subMenuItem=(type)=> {

	}


	menuItem=(type,text,endRequirement,mood,backEnd)=>{

		if (type === 'Delete') {
			return <Menu.Item
		          name='messages'
		          // active={this.state.activeItem === 'messages'}
		          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
							onClick={()=>{this.backEndCall(backEnd)}}
		        >
		          <div>{text}</div>
	        		<Icon name='chevron right' />
		        </Menu.Item>			
		}

		if (type === 'Change') {
			return <Menu.Item
		          name='messages'
		          // active={this.state.activeItem === 'messages'}
		          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
		          onClick={()=>{this.menuSelect(endRequirement)}}
		        >
		          <div>Change Main Verb</div>
          		<Icon name='chevron right' />
		        </Menu.Item>			
		}
		if (type === 'BaseChooser') {
			return <Menu.Item
		          name='messages'
		          // active={this.state.activeItem === 'messages'}
		          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
		          onClick={()=>{this.menuSelect(endRequirement)}}
		        >
		          <div>{text}</div>
          		<Icon name='chevron right' />
		        </Menu.Item>			
		}


	}

	updateCandidateCall=(type,update)=>{

		console.log(type, update)


		let lockSubmit = false
		let candidateFST = []
		let transitivity = ''
		this.state.candidateBase.slice().reverse().map((x,xind)=>{
			if (xind === 0 && x['type'].length < 3) {
				lockSubmit = true
				transitivity = x['type'] 
			}
			candidateFST = candidateFST.concat(x['fsts'][0])
		})

		if (update==='insert') {
			if (type === 'n') {

		  	this.setState({
		  		candidateCall:[candidateFST,[0,0,0,1]],
		  		lockSubmit:lockSubmit,
		  	})		

			} else if (type === 'v') {

		  	this.setState({
		  		candidateCall:[candidateFST,transitivity,'Ind'],
		  		lockSubmit:lockSubmit,
		  	})		

	 		}
		} else if (update==='update') {
			if (type === 'n') {
		  	this.setState({
		  		candidateCall:[candidateFST,[0,0,0,1]],
		  		lockSubmit:lockSubmit,
		  	})			
			} else if (type === 'v') {
		  	this.setState({
		  		candidateCall:[candidateFST,transitivity],
		  		lockSubmit:lockSubmit,
		  	})					
			}
	

		}

	

	
	}

	baseChooser = (itemUpdating,endingNeeded,update) => {
		console.log(itemUpdating,endingNeeded,update)
		         return <Grid style={{height:'400px',width:'505px'}}>
		                	<Grid.Row columns={2} style={{paddingBottom:'0px'}}divided>
		                	<Grid.Column >
		                		<Button onClick={()=>{this.menuSelect('default')}} style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'13px',marginBottom:'10px'}}>
		                			<Icon name='chevron left' />
		                			<div style={{color:'#666666'}}>{'Back'}</div>
		                		</Button>
									      <Input 
									      icon='search' 
									      iconPosition='left' 
									      name='search'     
									      disabled={this.state.lockSubmit}
									      // width='100%'
									      style={{width:'220px'}}
									 		  onChange={this.onChangeBaseSearch.bind(this,endingNeeded)}
						            value={this.state.searchQuery}
						            />
									      <Segment vertical style={{height:255,overflow: 'auto',padding:0,marginTop:5,marginBottom:0,borderBottom:'0px solid #e2e2e2'}}>
									      <List selection>
										    {this.state.wordsList.map((k)=>{return <List.Item onClick={()=>{

										    	this.setState({
										    		searchQuery:'',
										    		wordsList:[],
										    		candidateBase:this.state.candidateBase.concat(k),
										    	},()=>{
										    		this.updateCandidateCall(endingNeeded,update)
										    	})

										    }} style={{cursor:'pointer',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'15px',padding:5}}>
											        <List.Description style={{paddingBottom:'4px'}}>{k['yupikword']}</List.Description>
											        <List.Header style={{fontWeight:'400'}}>{k['englishraw']}</List.Header>
											      </List.Item>				      	
										      })}
									    	</List>
									      </Segment>
									      {this.state.wordsList.length > 0 ?
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
										        		<Icon circular onClick={()=>{this.setState({candidateBase:this.state.candidateBase.slice(0,-1)},()=>{this.updateCandidateCall(endingNeeded)})}} style={{cursor:'pointer',width:30}} name='x' />
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
		                		<Button color='blue' onClick={()=>{this.backEndCall([[itemUpdating[0],itemUpdating[1],this.state.candidateCall]]); this.setState({isOpen:false,currentEditMode:'default',searchQuery:'',wordsList:[],candidateBase:[],lockSubmit:false}) }} disabled={!this.state.lockSubmit} style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}>
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




			<div><Button onClick={()=>{this.backEndCall([[ "Insert", ["np"], 	[["arnar","–yagar*[N→N]"],[0,0,0,1],"Equ"] ]])}}>Add np equalis</Button></div>
			<div><Button onClick={()=>{this.backEndCall([[ "Insert", ["np"], 	[["arnar","–yagar*[N→N]"],[0,0,0,1]] ]])}}>Add np arnayagaq</Button></div>
			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv",],[["pissur"],"i","Ind"]]])}}>Add mv</Button></div>
			<div><Button onClick={()=>{this.backEndCall([["Update",["mv","vBase"],[["nere","–llru[V→V]"],"i"]]])}}>Change mv</Button></div>

			<div><Button onClick={()=>{this.backEndCall([["Update",["mv","vBase"],[["nere","–llru[V→V]"],"t"]]])}}>Change mv transitive</Button></div>

			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv","ns",0,0],[["angute",],[0,0,0,1]]]])}}>Add subject</Button></div>
			
			<div><Button onClick={()=>{this.backEndCall([["Update",["mv","ns",0,0],[["qimugte",],[0,0,0,1]]]])}}>Update subject</Button></div>


			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv","ns",-1],[["arnar",],[0,0,0,1]]]])}}>Add subject woman possessor</Button></div>
			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv","ns",0],[["qimugte",],[0,0,0,1]]]])}}>Add subject dog possessed</Button></div>

			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv","no",0,0],[["tuntu",],[0,0,0,1]]]])}}>Add object</Button></div>
			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv","no",-1],[["kuig",],[0,0,0,1]]]])}}>Add object river possessor</Button></div>
			<div><Button onClick={()=>{this.backEndCall([["Insert",["mv","no",0],[["piipir",],[0,0,0,1]]]])}}>Add object babies possessor</Button></div>


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
											{this.state.mvnsSegments.slice().reverse().map((k,kind)=> {
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
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.mvnoSegments.slice().reverse().map((k,kind)=> {
												return <span>{this.editMenu('mvno',kind)}</span>								
											})}
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
								
								
								{this.state.npnSegments.length > 0 ?
									(this.state.npnSegments.slice().reverse().map((x,xind)=> 
									<div style={{paddingRight:10,cursor:'pointer',marginBottom:10,}}>
										<span>
										{x.map((k,kind)=>
											<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
												{k.replaceAll('>','')}
											</div>													
										)}
										</span>
									</div>
									))
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


								{this.state.mvvs.length > 0 ?
									<div style={{display:'flex',justifyContent:'center',paddingBottom:10}}>
									{this.editMenu('defaultmv',-1)}
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
											{this.state.mvnsSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",this.state.mvnsSegments.length-1,0],(data.value+this.state.mvns[this.state.mvnsSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvns[this.state.mvnsSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsPossessors} />
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",this.state.mvnsSegments.length-1,0],this.state.mvns[this.state.mvnsSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvns[this.state.mvnsSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((w,wind)=>
														<span style={{color:this.state.colorsList[w[1]]}}>{w+" "}</span>
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",this.state.mvnsSegments.length-1-xind,0],this.state.mvns[this.state.mvnsSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvns[this.state.mvnsSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{x.map((w,wind)=>
															<span style={{color:this.state.colorsList[w[1]]}}>{w+" "}</span>
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
									(this.state.mvnoSegments.length > 0 ? 
										<span>					
											{this.state.mvnoSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1,0],(data.value+this.state.mvno[this.state.mvnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvno[this.state.mvnoSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsPossessors} />
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1,0],this.state.mvno[this.state.mvnoSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvno[this.state.mvnoSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((w,wind)=>
														<span style={{color:this.state.colorsList[w[1]]}}>{w+" "}</span>
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1-xind,0],this.state.mvno[this.state.mvnoSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvno[this.state.mvnoSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{x.map((w,wind)=>
															<span style={{color:this.state.colorsList[w[1]]}}>{w+" "}</span>
															)}
													</span>
												}
												</span>
											)}
										</span>
										:
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptions} />
										</span>
									)
									:
									null
								}

								{this.state.mvEnglish3.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}

								</div>

								{this.state.mvvs.length === 0 && this.state.npn.length === 0 ?
									<div style={{display:'flex',justifyContent:'center'}}>
									{this.editMenu('default',-1)}
									</div>
									:
									null
								}


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





			</Grid.Column>  
			</Grid.Row>
			</Grid>


			</div>
		);
	}
}
export default OneVerbWordBuilder;