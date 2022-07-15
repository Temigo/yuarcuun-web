import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Image, Grid, Dropdown, List, Label, Input, Segment, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../App.js';
import axios from 'axios';
import {nounOptionsPossessors, nounOptionsNumbers, nounoptionsmodalis, mvSubjectOptions, mvObjectOptions, verbPostbases, nounPostbases, VVpostbases, NNpostbases} from './constants/newconstants.js'
import {ending_underlying} from './constants/ending_underlying.js'
import palette from 'google-palette';
import shuffle from 'shuffle-array';
import { TagColors } from './SearchPageHelpers.js';
import fuzzysort from 'fuzzysort'
import now from 'performance-now';
import ReactGA from 'react-ga';


let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"


const optionsFuzzy = {
  keys: ['definitionString', 'keyString'],
  limit: 10, // don't return more results than you need!
  threshold: -10000, // don't return bad results
};

let dictionary = [];
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


			// mvSubjectColor: '#852828',
			// mvObjectColor: '#b53434',
			// // mvPostbaseColors: 

			// cvSubjectColor: '#3070AB',
			// cvObjectColor: '#b53434',

			currentPostbases: ['13'],
			mvSubjectDisplay: [['angute',1],['cuara',20],['at',1]],
			mvSubjectUnderlyingDisplay: [[['angute-',1]],[['–cuar(ar*)[N→N]',20]],[['%:(e)t',1]],],

			mvObjectDisplay: [['tuntuvi',2],['it',2]],
			mvObjectUnderlyingDisplay: [[['tuntuvag-',2]],[['%:(e)t',2]],],

			mvDisplay: [['nii',0],['cugnarqe',3],['llru',0],['i',2],['t',1]],
			mvUnderlyingDisplay: [[['niite-',0]],[['@~+yugnarqe2[V→V]',3]],[['–llru[V→V]',0]],[["+'(g)ai",2],["t",1]]],

			mvEnglish1: [],			
			mvSubjectEnglish: [['small',20],['men',1]],
			mvEnglish2: [['probably',3],['heard',0],['', 0]],
			mvObjectEnglish: [['moose',2]],
			mvEnglish3: [],


			cvExists: true,
			cvSubjectDisplay: [['arnar',6],['pi',21],['it',6]],
			cvSubjectUnderlyingDisplay: [[['arnar-',6]],[['–rpag|@vag[N→N]',21]],[['%:(e)t',6]],],

			cvObjectDisplay: [['tumyara',7],['t',7]],
			cvObjectUnderlyingDisplay: [[['tumyarar-',7]],[['%:(e)t',7]],],

			cvDisplay: [['tanger',0],['pailg',5],['at',6],['ki',7]],
			cvUnderlyingDisplay: [[['niite-',0]],[['@+paileg',5]],[['at',6],["ki",7]]],

			cvEnglish1: [['before',5],],			
			cvSubjectEnglish: [['big',21],['women',6]],
			cvEnglish2: [['saw',0]],
			cvObjectEnglish: [['trails',7]],
			cvEnglish3: [],


			mvnsBases:[],
			mvns:[], 
			mvvBase:"aqume-–llru[V→V]",
			mvvMood:"Ind",
			mvvTrans:"i",
			mvvs:[3,1,3],
			// mvnoBases:

			// mvBase:"aqume-–llru[V→V]",

			baseCase: ['niite'],


			postObject: "",
			subjectIs: "is ",
			bePreVerb: "",
			preObjectText: "",
			primaryVerb: "hunt",
			primaryNoun: "",
			afterObjectText: "",
			afterObjectText2: [],
			questionMark: "",

			mvSubject: "330",
			mvObject: "330",

			mvSubjectExists: true,
			mvSubjectNounExists: false,
			mvSubjectNumber: '3',
			mvSubjectPossessor: '000',

			mvObjectExists: true,
			mvObjectNounExists: true,
			mvObjectNumber: '3',
			mvObjectPossessor: '000',


			cvSubject: "330",
			cvObject: "330",

			cvSubjectExists: true,
			cvSubjectNounExists: true,
			cvSubjectNumber: '3',
			cvSubjectPossessor: '000',

			cvObjectExists: true,
			cvObjectNounExists: true,
			cvObjectNumber: '3',
			cvObjectPossessor: '000',


			verbsWordsList: [],
			verbSearch:'',
			search:'',
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

          dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
          // dictionary_prepared = fuzzysort.prepare(dictionary)

					let filteredDictI = dictionary.filter(entry => entry.usagetags.includes('i'))
					let filteredDictT = dictionary.filter(entry => entry.usagetags.includes('t'))
					let filteredDictN = dictionary.filter(entry => entry.usagetags.includes('n'))

    // let wordsList = fuzzysort.go(word, filteredDictionary, optionsFuzzy).map(({ obj }) => (obj));

          this.setState({ dictionary: dictionary, dictionary_dict: dictionary_dict, filteredDictI: filteredDictI, filteredDictT: filteredDictT, filteredDictN: filteredDictN});
        });
    }
}


	modifySentence(verb, entry, {value}) {

		// console.log(verb, value)
		let keyChanged = verb
		let keyChangedValue=value.split('')
		let mv = {
			nsBases:this.state.mvnsBases,
			ns:this.state.mvns, 
			vBase:this.state.mvvBase,
			vMood:this.state.mvvMood,
			vTrans:this.state.mvvTrans,
			vs:this.state.mvvs,
		}
		let cv = {}



		console.log(keyChanged,keyChangedValue,mv)


    axios
      .post(API_URL + "/sentencebuilder", {
      	keyChanged:keyChanged,
      	keyChangedValue:keyChangedValue,
      	mv:mv,
      	cv:cv,
      })
      .then(response => {
        console.log(response);
  		})
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



	render() {
		console.log(this.state)
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


					<div style={{border:'1px solid #E3E3E3',marginTop:'20px'}}>

					<div className='hierarchymain'>
					<span className='span2'>Word Builder</span>
					</div>



				<Container>
					<div>

							<div style={{marginTop:'30px',}}>

							 	{this.state.mvSubjectNounExists ? 
									<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
											{this.state.mvSubjectDisplay.map((m, mind)=>
													<span style={{color:this.state.colorsList[m[1]]}}>{m[0]}</span>
												)}
											</div>
										</div>

										<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
										{this.state.mvSubjectUnderlyingDisplay.map((y)=>
											<span style={{padding:'8px'}}>
											{y.map((x,xind)=> <span style={{borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
											</span>
										)}
										</div>
									</div>
									:
									null
								}

							 	{this.state.mvObjectNounExists ? 
							 		<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
											{this.state.mvObjectDisplay.map((m, mind)=>
													<span style={{color:this.state.colorsList[m[1]]}}>{m[0]}</span>
												)}
											</div>
										</div>

										<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
										{this.state.mvObjectUnderlyingDisplay.map((y)=>
											<span style={{padding:'8px'}}>
											{y.map((x,xind)=> <span style={{borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
											</span>
										)}
										</div>			
									</div>
									:
									null
								}			

								<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
									<div style={{display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.mvDisplay.map((m, mind)=>
											<span style={{color:this.state.colorsList[m[1]]}}>{m[0]}</span>
										)}
									</div>
								</div>

								<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
								{this.state.mvUnderlyingDisplay.map((y)=>
									<span style={{padding:'8px'}}>
									{y.map((x,xind)=> <span style={{borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
									</span>
								)}
								</div>



								<div style={{textAlign:'center',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>

								{this.state.mvEnglish1.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}			

								{this.state.mvSubjectExists ?
									(this.state.mvSubjectNounExists ? 
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} value={this.state.mvSubjectPossessor} options={nounOptionsPossessors} />
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} value={this.state.mvSubjectNumber} options={nounOptionsNumbers} />								
											{this.state.mvSubjectEnglish.map((w,wind)=>{
												return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
											})}
											<Icon style={{color:this.state.colorsList[1]}}  name='edit outline' />
										</span>
										:
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={this.modifySentence.bind(this, ['mv','vs'])}  value={this.state.mvSubject} options={mvSubjectOptions} />
										</span>
										)
									:
									null
								}

						
								{this.state.mvEnglish2.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}		
								<Icon style={{color:this.state.colorsList[0]}}  name='edit outline' />


								{this.state.mvObjectExists ?
									(this.state.mvObjectNounExists ? 
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} value={this.state.mvObjectPossessor} options={nounOptionsPossessors} />
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} value={this.state.mvObjectNumber} options={nounOptionsNumbers} />								
											{this.state.mvObjectEnglish.map((w,wind)=>{
												return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
											})}
											<Icon style={{color:this.state.colorsList[2]}}  name='edit outline' />


				              <Popup
				                trigger={<Icon style={{color:'#d4d4d4'}} link name='pencil'>{'\n'}</Icon>}
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
											 		  onChange={this.onChangeSearch.bind(this,this.state.baseTag)}
								            value={this.state.search}
								            />
											      <Segment vertical style={{maxHeight:300,overflow: 'auto',padding:0,marginTop:5,marginBottom:0,borderBottom:'0px solid #e2e2e2'}}>
											      <List selection>
												    {this.state.verbsWordsList.length > 0 ?
												      (this.state.verbsWordsList.map((k)=>{return <List.Item onClick={()=>{this.setState({search:'',verbsWordsList:[],opened:false}); this.changeBase(k,this.state.baseTag)}} style={{cursor:'pointer',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'15px',padding:5}}>
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




										</span>
										:
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  value={this.state.mvObject} options={mvObjectOptions} />
										</span>
									)
									:
									null
								}

								{this.state.mvEnglish3.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}

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

										<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
										{this.state.cvSubjectUnderlyingDisplay.map((y)=>
											<span style={{padding:'8px'}}>
											{y.map((x,xind)=> <span style={{borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
											</span>
										)}
										</div>
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

										<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
										{this.state.cvObjectUnderlyingDisplay.map((y)=>
											<span style={{padding:'8px'}}>
											{y.map((x,xind)=> <span style={{borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
											</span>
										)}
										</div>			
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

								<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
								{this.state.cvUnderlyingDisplay.map((y)=>
									<span style={{padding:'8px'}}>
									{y.map((x,xind)=> <span style={{borderBottom:'1px solid '+this.state.colorsList[x[1]], color:this.state.colorsList[x[1]]}}>{x[0]}</span>)}
									</span>
								)}
								</div>



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