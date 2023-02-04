import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Image, Grid, Dropdown, List, Label, Input, Segment, Accordion, Menu, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../App.js';
import axios from 'axios';
import {nounOptionsMVPossessors, mvObjectOptionsEnglish, popularVPostbasesPAST, popularVPostbasesFUTURE, popularVPostbasesNOTIME, popularNPostbases, popularNouns, popularVerbs, npnEnglish, npnEnglishself, colorsList,  mvSubject4thPersonCalls, mvObject4thPersonCalls,nObject4thPersonCalls, mvSubjectOptionsWho, mvSubjectOptionsWhat, mvObjectOptionsWhom, mvObjectOptionsWhomAbl, mvObjectOptionsWhat, mvObjectOptionsWhatAbl,retrieveMoodEnglish, nounOptionsPossessorsNo4th, mvSubjectOptionsOnly2nd, nounOptionsNumbers, nounoptionsmodalis, mvSubjectOptions, mvObjectOptions, mvSubjectOptionsEnglish, verbPostbases, nounPostbases, VVpostbases, NNpostbases} from './constants/newconstants.js'
import {newpostbases} from './constants/newpostbases.js'
import {ending_underlying} from './constants/ending_underlying.js'
import palette from 'google-palette';
import shuffle from 'shuffle-array';
// import { TagColors } from './SentenceBulderHelpe.js';
import fuzzysort from 'fuzzysort'
import now from 'performance-now';
import ReactGA from 'react-ga';
// import SentenceTemplates from './SentenceTemplates.js'
import SentenceTemplates from "./SentenceTemplates.js";
import SentenceGlossary from "./SentenceGlossary.js";
import { sentenceTemplates } from './constants/sentence_templates.js'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"
const YUGTUNDOTCOM_URL = "https://www.yugtun.com/";

const popularVPostbases = popularVPostbasesPAST.concat(popularVPostbasesFUTURE, popularVPostbasesNOTIME)
const popularVPostbasesOnlyPast = popularVPostbasesPAST.concat(popularVPostbasesNOTIME)
const popularVPostbasesOnlyFuture = popularVPostbasesFUTURE.concat(popularVPostbasesNOTIME)
const popularVPostbasesNoTime = popularVPostbasesNOTIME


let tensesSentenceTemplates = [
	'llru',
	'ciq',
	'ksail',
]

let requirePostbasesDictionary = {

	'Intrg4': [
	{'fst':[['-llru¹-',0,-1,0]],'english':'past tense (-llru-)'}, 
	],

	'Intrg5': [
	{'fst':[['+ciqe-|@ciiqe-',0,-1,0]],'english':'future V (+ciqe-)'}, 
	{'fst':[['-qatar-',0,-1,0]],'english':'about to V (-qatar-)'}
	],

	'CtmpI': [
	{'fst':[['-llru¹-',0,-1,0]],'english':'past tense (-llru-)'}, 
	],

	'CtmpII': [
	{'fst':[['-llru¹-',0,-1,0]],'english':'past tense (-llru-)'}, 
	],

	'Cont': [
	{'fst':[['@~-yuite-',0,-1,0]],'english':'never Vs (@~-yuite-)'}, 
	{'fst':[['~+lar-,@~+lar-,-lar-',0,-1,0]],'english':'often Vs (-lar-)'}
	],

}

let pastTensePostbases = [
	'-llru¹-',
]
let futureTensePostbases = [
	'+ciqe-|@ciiqe-',
	'-qatar-',
]


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
	'mvEnglishQaa',
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

// let retrieveMoodEnglish = {
// 	'Prec':'before'
// }


let dictionary = [];
let usageDictionary = [];
let dictionary_dict = {};

class SentenceBuilder extends Component {
	constructor(props) {
		super(props);
		console.log(this.props)
		// console.log(decodeURI(props.match.params.num))
		this.state = {

			dictionary: this.props.dictionary,
			usageDictionary: this.props.usageDictionary,
			dictionary_dict: this.props.dictionary_dict,
			filteredDictV: this.props.filteredDictV,
			filteredDictVit: this.props.filteredDictVit,
			filteredDictN: this.props.filteredDictN,

			// filteredDictVVfuture:{},
			// filteredDictVVpast:{},
			filteredDictVVall:{},
			otherBases: [],
			nextTenses: [],
			unallowable_next_ids: [],
			startingCase:'',
			modalOpen:true,

			colorScheme: 0,
			activeIndexes:[],
			activeIndexes1:[],
			addSubject:false,
			addIs:true,
			nounNum:'s',
			mvvsPlanned: [],
			overlayOn:false,
			// colorsList: {
			// 	'mvv.b':'#000000',
			// 	'mvv.e':'#852828',
			// 	'mvv.s':'#852828',
			// 	'mvv.o':'#C84141',
			// 	'mvv.m':'#838383',
			// 	'mvv.1':'#d3741e',
			// 	'mvv.2':'#c062c3',
			// 	'mvv.3':'#008000',
			// 	'mvv.4':'#69b4b4',
			// 	'mvv.5':'#e02323',
			// 	'mvv.6':'#3455b5',

			// 	'mvnObliques000.b':'#000000',
			// 	'mvnObliques000.ps':'#c51818',
			// 	'mvnObliques000.pd':'#d23636',
			// 	'mvnObliques000.c':'#9c9c9c',
			// 	'mvnObliques000.1':'#69b4b4',

			// 	'mvnObliques100.b':'#000000',
			// 	'mvnObliques100.ps':'#c51818',
			// 	'mvnObliques100.pd':'#d23636',
			// 	'mvnObliques100.c':'#9c9c9c',

			// 	'cvv.b':'#000000',
			// 	'cvv.e':'#3070AB',
			// 	'cvv.s':'#3070AB',
			// 	'cvv.o':'#618EB8',
			// 	'cvv.m':'#75557e',

			// 	'npn00.b':'#000000',
			// 	'npn00.pd':'#d23636',
			// 	'npn00.ps':'#c51818',
			// 	'npn00.1':'#69b4b4',
			// 	'npn00.2':'#e02323',
			// 	'npn00.c':'#9c9c9c',


			// 	'mvns00.b':'#852828',
			// 	'mvns00.ps':'#c51818',
			// 	'mvns00.pd':'#d23636',				
			// 	'mvns00.1':'#b53434',
			// 	'mvns00.2':'#578f7f',
			// 	'mvns00.e':'#f29090',

			// 	'mvno00.b':'#C84141',
			// 	'mvno00.1':'#b53434',
			// 	'mvno00.2':'#578f7f',
			// 	'mvno00.e':'#f29090',
			// 	// 'mvns10.b':'#852828',
			// 	// 'mvv.4':'#000000',
			// },
			// '#000000',
			// '#852828',
			// '#b53434',
			// '#578f7f',
			// '#f29090',
			// 'purple',//connective 5
			// '#3070AB',//connective subject 6
			// '#4338ac', //connective object 7

			// ].concat(shuffle(palette('tol-rainbow', 500).map((c) => { return '#' + c; }))),


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

			mvEnglish1: [],
			mvEnglish2: [],
			mvEnglish3: [],
			mvEnglishAbl: [],
			mvEnglishQaa: [],
			svEnglishAbl: [],

			mvnsEnglish1: [],
			mvnsEnglish2: [],

			mvnoEnglish1: [],
			mvnoEnglish2: [],

			mvSubjectEnglish: [],
			mvObjectEnglish: [],

			cvEnglish1: [],
			cvEnglish2: [],
			cvEnglish3: [],
			cvEnglishAbl: [],
			cvSubjectEnglish: [],
			cvObjectEnglish: [],

			svEnglish1: [],
			svEnglish2: [],
			svObjectEnglish: [],

			npnEnglish1: [],
			npnEnglish2: [],


			mvSubjectSegments:"",
			// mvSegments:"nere>llru>uq",
			mvvSegments:"",
			mvqWordSegments:"",
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
			mvvType:'',

			mvnsBases:[],
			mvns:[],


			mvvo:[],
			mvnoBases:[],
			mvno:[],
			mvqWord:[],


			cvvBase:[],
			cvnsBases:[],
			cvnoBases:[],

			cvno:[],				
			cvns:[],
			cvvMood:"",
			cvvType:'',
			cvvs:[],
			cvvo:[],

			cvvSegments:"",
			cvnsSegments:[],
			cvnoSegments:[],


			svvBase:[],
			svnsBases:[],
			svnoBases:[],

			svno:[],				
			svns:[],
			svvMood:"",
			svvType:'',
			svvs:[],
			svvo:[],

			svvSegments:"",
			svnsSegments:[],
			svnoSegments:[],



			npn:[],
			npnBases:[],
			npnCase:[],
			npnSegments:[],
			npnType:[],


			mvnObliquesSegments: [],
			cvnObliquesSegments: [],
			svnObliquesSegments: [],

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
			cpreviousEditMode:'default',

			mvnObliques:[],
			cvnObliques:[],
			svnObliques:[],

			candidateBase:[],
			candidateDisplay:[],
			candidateFST:[],
			candidateType:'',
			lockSubmit:false,
			glossary:false,

			showShortcuts:false,
			svvText:'',
			endingAdjusted:'',

			requirePostbase: '',
			optCase: '',

			// mvSubjectOptions:mvSubjectOptions,
			// mvObjectOptions:mvObjectOptions,
			nounOptionsMVPossessors:[{id: 0, value: '000', text:'the'}].concat(nounOptionsMVPossessors),
			nounOptionsMVAblPossessors:[{id: 0, value: '000', text:'a, some'}].concat(nounOptionsMVPossessors),
			nounOptionsCVPossessors:[{id: 0, value: '000', text:'the'}].concat(nounOptionsMVPossessors),
			nounOptionsCVAblPossessors:[{id: 0, value: '000', text:'a, some'}].concat(nounOptionsMVPossessors),
			nounOptionsSVPossessors:[{id: 0, value: '000', text:'the'}].concat(nounOptionsMVPossessors),
			nounOptionsSVAblPossessors:[{id: 0, value: '000', text:'a, some'}].concat(nounOptionsMVPossessors),

			cvSubjectOptions1:mvSubjectOptions,
			cvObjectOptions1:mvObjectOptions,
			mvSubjectOptions1:mvSubjectOptions,
			mvObjectOptions1:mvObjectOptions,
			svObjectOptions1:mvObjectOptions,
			nounOptionsMVPossessors1:[{id: 0, value: '000', text:'the'}].concat(nounOptionsMVPossessors),
			nounOptionsMVAblPossessors1:[{id: 0, value: '000', text:'a, some'}].concat(nounOptionsMVPossessors),
			nounOptionsCVPossessors1:[{id: 0, value: '000', text:'the'}].concat(nounOptionsMVPossessors),
			nounOptionsCVAblPossessors1:[{id: 0, value: '000', text:'a, some'}].concat(nounOptionsMVPossessors),
			nounOptionsSVPossessors1:[{id: 0, value: '000', text:'the'}].concat(nounOptionsMVPossessors),
			nounOptionsSVAblPossessors1:[{id: 0, value: '000', text:'a, some'}].concat(nounOptionsMVPossessors),

			nounIndexChosen:0,

			parses:{},
			switchedToEdit:false,
			currentlyOpen:'',
			crecentlyOpen:'',
			containsTime:false,

		}

		this.subjectMenu = {}
		this.editMenuRef = {}
		this.mainScreenMenuRef = {}
		this.fromEntry = false
		console.log(decodeURI(props.match.params.num))
		if (decodeURI(props.match.params.num) == 1) {
				this.backEndCall([['Delete',['mv',],''],['Delete',['np',],'']])
	  } else if (decodeURI(props.match.params.num) == 2) {
    	// console.log('hi',this.props.location.state)
    	this.fromEntry = true;
			this.backEndCall([],true,true)
    }

    // if (decodeURI(props.match.params.num) in sentenceTemplates) {
			// this.backEndCall(sentenceTemplates[decodeURI(props.match.params.num)][2])
    // }
	}


	componentDidMount() {
		let start = now();
		// console.log(this.props)
    // if (dictionary.length === 0) {
    //   // axios
    //   //   .get(API_URL + "/word/all2021")
    //   //   .then(response => {
    //   //     let end = now();
    //   //     ReactGA.timing({
    //   //       category: 'Loading',
    //   //       variable: 'dictionary',
    //   //       value: (end-start).toFixed(3),
    //   //       label: 'Dictionary loading'
    //   //     });
    //   //     dictionary = response.data;
    //   //     console.log(dictionary)
    //   //     console.log('Fetched dictionary');

          // this.setState({ dictionary: this.props.dictionary});
    //   //   });
    // }

    // if (this.props.usageDictionary.length > 0) {
    //   // axios
    //   //   .get(API_URL + "/yupiksearchableusagelist/all")
    //   //   .then(response => {
    //   //     let end = now();
    //   //     ReactGA.timing({
    //   //       category: 'Loading',
    //   //       variable: 'dictionary',
    //   //       value: (end-start).toFixed(3),
    //   //       label: 'Dictionary loading'
    //   //     });
    //   //     usageDictionary = response.data;
    //   //     console.log(usageDictionary)
    //   //     console.log('Fetched usage dictionary');

				// 	let filteredDictV = this.props.usageDictionary.filter(entry => (entry.type.includes('i')||entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')) )
				// 	let filteredDictN = this.props.usageDictionary.filter(entry => (entry.type.includes('n')||entry.type.includes('[V→N]')||entry.type.includes('[N→N]')))
				// 	let filteredDictVit = this.props.usageDictionary.filter(entry => (entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')))


    //       this.setState({ filteredDictV: filteredDictV, filteredDictVit: filteredDictVit, filteredDictN: filteredDictN});
    //     // });
    // }

    if (this.state.usageDictionary.length === 0) {
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

          // let filteredDictV = usageDictionary.filter(entry => (entry.type.includes('i')||entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')) )
          // let filteredDictN = usageDictionary.filter(entry => (entry.type.includes('n')||entry.type.includes('[V→N]')||entry.type.includes('[N→N]')))
          // let filteredDictVit = usageDictionary.filter(entry => (entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')))

          // this.setState({ usageDictionary: usageDictionary});

          let filteredDictV = usageDictionary.filter(entry => (entry.type.includes('i')||entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')) )
          let filteredDictN = usageDictionary.filter(entry => (entry.type.includes('n')||entry.type.includes('[V→N]')||entry.type.includes('[N→N]')))
          let filteredDictVit = usageDictionary.filter(entry => (entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')))

          let filteredDictVVnofuture = usageDictionary.filter(entry => (entry.type.includes('[V→V]') && !entry.properties.includes('future')))
          let filteredDictVVnopast = usageDictionary.filter(entry => (entry.type.includes('[V→V]') && !entry.properties.includes('past')))
          let filteredDictVVnotime = usageDictionary.filter(entry => (entry.type.includes('[V→V]') && !entry.properties.includes('past')  && !entry.properties.includes('future')))
          let filteredDictVVall = usageDictionary.filter(entry => (entry.type.includes('[V→V]')))

          this.setState({ usageDictionary: usageDictionary, filteredDictV: filteredDictV, filteredDictVit: filteredDictVit, filteredDictN: filteredDictN, filteredDictVVnofuture: filteredDictVVnofuture, filteredDictVVnopast: filteredDictVVnopast, filteredDictVVnotime:filteredDictVVnotime, filteredDictVVall: filteredDictVVall});
        });
    } else {
    			usageDictionary = this.state.usageDictionary
          let filteredDictV = usageDictionary.filter(entry => (entry.type.includes('i')||entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')) )
          let filteredDictN = usageDictionary.filter(entry => (entry.type.includes('n')||entry.type.includes('[V→N]')||entry.type.includes('[N→N]')))
          let filteredDictVit = usageDictionary.filter(entry => (entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')))

          let filteredDictVVnofuture = usageDictionary.filter(entry => (entry.type.includes('[V→V]') && !entry.properties.includes('future')))
          let filteredDictVVnopast = usageDictionary.filter(entry => (entry.type.includes('[V→V]') && !entry.properties.includes('past')))
          let filteredDictVVnotime = usageDictionary.filter(entry => (entry.type.includes('[V→V]') && !entry.properties.includes('past')  && !entry.properties.includes('future')))
          let filteredDictVVall = usageDictionary.filter(entry => (entry.type.includes('[V→V]')))

          this.setState({ usageDictionary: usageDictionary, filteredDictV: filteredDictV, filteredDictVit: filteredDictVit, filteredDictN: filteredDictN, filteredDictVVnofuture: filteredDictVVnofuture, filteredDictVVnopast: filteredDictVVnopast, filteredDictVVnotime:filteredDictVVnotime, filteredDictVVall: filteredDictVVall});
    }

}

  componentDidUpdate(prevProps, prevState) {
  	if (this.props.match.params.num !== prevProps.match.params.num) {
			if (decodeURI(this.props.match.params.num) == 1) {
				this.fromEntry = false
				this.backEndCall([['Delete',['mv',],''],['Delete',['np',],'']])
	    }
  	}
    if (prevState.mv !== this.state.mv || prevState.cv !== this.state.cv || prevState.sv !== this.state.sv || prevState.np !== this.state.np) {
			// console.log('changed')
			this.update4thPersonAndAgreement()
    }

    if (prevState.wordsList !== this.state.wordsList || prevState.activeIndexes !== this.state.activeIndexes) {
    	let tag = this.state.currentlyOpen
			this.setState({currentlyOpen:''},()=>{this.setState({currentlyOpen:tag})})
    }

    if (prevState.addSubject !== this.state.addSubject && this.state.crecentlyOpen !== '') {
    	this.openSubjectMenu(this.state.crecentlyOpen)
    	// this.subjectMenu.open();    		
    }

    // if (prevState.currentEditMode !== this.state.currentEditMode && this.state.crecentlyOpen !== '') {
    // 	// console.log(this.state.crecentlyOpen)
    // 	this.openEditMenuRef(this.state.crecentlyOpen)
    // 	// this.setState({currentEditMode:'default'})
    // 	// this.openMainScreenMenuRef(this.state.crecentlyOpen)
    // }

    // if (prevState.currentlyOpen !== this.state.currentlyOpen && this.state.currentEditMode === this.state.cpreviousEditMode) {
    // 	// console.log(this.state.currentlyOpen)
    // 	this.setState({currentEditMode:'default'})
    // }



    // if (prevState.currentEditMode !== this.state.currentEditMode) {
    // 	this.editMenuRef.open();
    // }

  }

  update4thPersonAndAgreement = () => {

		let mvSubjectOptions1 = []
		let mvObjectOptions1 = []
		let cvSubjectOptions1 = []
		let cvObjectOptions1 = []
		let nounOptionsSVPossessors1 = []
		let nounOptionsCVPossessors1 = []
		let nounOptionsMVPossessors1 = [] 
		let nounOptionsCVAblPossessors1 = []
		let nounOptionsMVAblPossessors1 = [] 
		let nounOptionsSVAblPossessors1 = []

		if (this.state.mvvs.length > 0) {
			// console.log(this.state.mvvs.join(""))
			let mvvalueSub = mvSubject4thPersonCalls[this.state.mvvs.join("")]
			let mvvalueObj = mvObject4thPersonCalls[this.state.mvvs.join("")]
			let npossvalue = nObject4thPersonCalls[this.state.mvvs.join("")]
			let subjDontAllow = []
			let objDontAllow = []

			if (this.state.cvvo.length > 0) {
    		if (this.state.cvvs[0] == 1 && this.state.cvvo[0] == 4 || this.state.cvvs[0] == 4 && this.state.cvvo[0] == 1) {
    			subjDontAllow = subjDontAllow.concat([0,6,10])
	        // mvSubjectOptions.map((k)=>{
	        //   if (![0,6,10].includes(k['id'])) {
	        //     mvSubjectOptions1 = mvSubjectOptions1.concat(k)
	        //   }
	        // })
    		} else if (this.state.cvvs[0] == 2 && this.state.cvvo[0] == 4 || this.state.cvvs[0] == 4 && this.state.cvvo[0] == 2) {
    			subjDontAllow = subjDontAllow.concat([1,7,11])
	        // mvSubjectOptions.map((k)=>{
	          // if (![1,7,11].includes(k['id'])) {
	            // mvSubjectOptions1 = mvSubjectOptions1.concat(k)
	          // }
	        // })
    		}
    	}


	    if (this.state.mvvo.length > 0) {
	    	if (this.state.mvvMood == 'Intrg') {
    			subjDontAllow = subjDontAllow.concat([0,6,10])	    		
	    	}
	      if (this.state.mvvs[0] == 1) {
    			objDontAllow = objDontAllow.concat([0,6,10])

	        // mvObjectOptions.map((k)=>{
	          // if (![0,6,10].includes(k['id'])) {
	            // mvObjectOptions1 = mvObjectOptions1.concat(k)
	          // }
	        // })
	      } else if (this.state.mvvs[0] == 2) {
    			objDontAllow = objDontAllow.concat([1,7,11])

	        // mvObjectOptions.map((k)=>{
	        //   if (![1,7,11].includes(k['id'])) {
	        //     mvObjectOptions1 = mvObjectOptions1.concat(k)
	        //   }
	        // })
	      }

	      if (this.state.mvvo[0] == 1) {
    			subjDontAllow = subjDontAllow.concat([0,6,10])
	        // mvSubjectOptions.map((k)=>{
	        //   if (![0,6,10].includes(k['id'])) {
	        //     mvSubjectOptions1 = mvSubjectOptions1.concat(k)
	        //   }
	        // })
	      } else if (this.state.mvvo[0] == 2) {
    			subjDontAllow = subjDontAllow.concat([1,7,11])
	        // mvSubjectOptions.map((k)=>{
	        //   if (![1,7,11].includes(k['id'])) {
	        //     mvSubjectOptions1 = mvSubjectOptions1.concat(k)
	        //   }
	        // })
	      }
        mvObjectOptions.map((k)=>{
          if (!objDontAllow.includes(k['id'])) {
            mvObjectOptions1 = mvObjectOptions1.concat(k)
          }
        })
	    }

    	if (this.state.mvvMood == 'Sbrd') {
  			subjDontAllow = subjDontAllow.concat([0,2,3,4,6,8,10,12])	    		
    	}

      mvSubjectOptions.map((k)=>{
        if (!subjDontAllow.includes(k['id'])) {
          mvSubjectOptions1 = mvSubjectOptions1.concat(k)
        }
      })   		

	    if (this.state.cvvo.length > 0) {
	      if (this.state.cvvs[0] == 1) {
	        mvObjectOptions.map((k)=>{
	          if (![0,6,10].includes(k['id'])) {
	            cvObjectOptions1 = cvObjectOptions1.concat(k)
	          }
	        })
	      } else if (this.state.cvvs[0] == 2) {
	        mvObjectOptions.map((k)=>{
	          if (![1,7,11].includes(k['id'])) {
	            cvObjectOptions1 = cvObjectOptions1.concat(k)
	          }
	        })
	      } else {
	        cvObjectOptions1 = mvObjectOptions
	      }

	      if (this.state.cvvo[0] == 1) {
	        mvSubjectOptions.map((k)=>{
	          if (![0,6,10].includes(k['id'])) {
	            cvSubjectOptions1 = cvSubjectOptions1.concat(k)
	          }
	        })
	      } else if (this.state.cvvo[0] == 2) {
	        mvSubjectOptions.map((k)=>{
	          if (![1,7,11].includes(k['id'])) {
	            cvSubjectOptions1 = cvSubjectOptions1.concat(k)
	          }
	        })
	      } else {
	        cvSubjectOptions1 = mvSubjectOptions
	      }
	      
	    } else {
	      cvSubjectOptions1 = mvSubjectOptions
	    }



			if (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) {
				if (this.state.cvvs[0] !== 4 && this.state.svvs[0] !== 4) {
					cvObjectOptions1 = [{id: 5, value: '410', text:mvvalueObj+' (subject)'}].concat(cvObjectOptions1)
				} 
				if (this.state.cvvo[0] !== 4) {
					cvSubjectOptions1 = [{id: 5, value: '410', text:mvvalueSub+' (subject)'}].concat(cvSubjectOptions1)
				}
				nounOptionsMVPossessors1 = [{id: 6, value: '410', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsMVPossessors)
				nounOptionsMVAblPossessors1 = [{id: 6, value: '410', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsMVAblPossessors)
			} else if (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 2) {
				cvSubjectOptions1 = [{id: 9, value: '420', text:mvvalueSub+' (subjects)'}].concat(cvSubjectOptions1)
				cvObjectOptions1 = [{id: 9, value: '420', text:mvvalueObj+' (subjects)'}].concat(cvObjectOptions1)
				nounOptionsMVPossessors1 = [{id: 10, value: '420', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsMVPossessors)
				nounOptionsMVAblPossessors1 = [{id: 10, value: '420', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsMVAblPossessors)
			} else if (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 3) {
				cvSubjectOptions1 = [{id: 13, value: '430', text:mvvalueSub+' (subjects)'}].concat(cvSubjectOptions1)
				cvObjectOptions1 = [{id: 13, value: '430', text:mvvalueObj+' (subjects)'}].concat(cvObjectOptions1)
				nounOptionsMVPossessors1 = [{id: 14, value: '430', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsMVPossessors)
				nounOptionsMVAblPossessors1 = [{id: 14, value: '430', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsMVAblPossessors)
			} else {
				// cvSubjectOptions1 = mvSubjectOptions
				// cvObjectOptions1 = mvObjectOptions
				nounOptionsMVPossessors1 = this.state.nounOptionsMVPossessors
				nounOptionsMVAblPossessors1 = this.state.nounOptionsMVAblPossessors
			}
			this.setState({
				mvSubjectOptions1:mvSubjectOptions1,
				mvObjectOptions1:mvObjectOptions1,
				cvSubjectOptions1:cvSubjectOptions1,
				cvObjectOptions1:cvObjectOptions1,
				nounOptionsMVPossessors1:nounOptionsMVPossessors1,
				nounOptionsMVAblPossessors1:nounOptionsMVAblPossessors1,
			})
		}

		if (this.state.cvvs.length > 0) {
			let npossvalue;
			if (this.state.cvvs[0] == 4) {
				npossvalue = nObject4thPersonCalls[this.state.mvvs.join("")]
			} else {
				npossvalue = nObject4thPersonCalls[this.state.cvvs.join("")]
			}

			if ((this.state.cvvs[0] == 3 || this.state.cvvs[0] == 4) && this.state.cvvs[1] == 1) {
				nounOptionsCVPossessors1 = [{id: 6, value: '411', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsCVPossessors)
				nounOptionsCVAblPossessors1 = [{id: 6, value: '411', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsCVAblPossessors)
			} else if ((this.state.cvvs[0] == 3 || this.state.cvvs[0] == 4) && this.state.cvvs[1] == 2) {
				nounOptionsCVPossessors1 = [{id: 10, value: '421', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsCVPossessors)
				nounOptionsCVAblPossessors1 = [{id: 10, value: '421', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsCVAblPossessors)
			} else if ((this.state.cvvs[0] == 3 || this.state.cvvs[0] == 4) && this.state.cvvs[1] == 3) {
				nounOptionsCVPossessors1 = [{id: 14, value: '431', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsCVPossessors)
				nounOptionsCVAblPossessors1 = [{id: 14, value: '431', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsCVAblPossessors)
			} else {
				nounOptionsCVPossessors1 = this.state.nounOptionsCVPossessors
				nounOptionsCVAblPossessors1 = this.state.nounOptionsCVAblPossessors
			}
			this.setState({
				nounOptionsCVPossessors1:nounOptionsCVPossessors1,
				nounOptionsCVAblPossessors1:nounOptionsCVAblPossessors1,
			})
		}

		if (this.state.svvo.length > 0) {
			let svvalueSub = mvSubject4thPersonCalls[this.state.mvvs.join("")]
			let svvalueObj = mvObject4thPersonCalls[this.state.mvvs.join("")]
			let npossvalue = nObject4thPersonCalls[this.state.mvvs.join("")]
			if (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) {
				nounOptionsSVPossessors1 = [{id: 6, value: '410', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsSVPossessors)
				nounOptionsSVAblPossessors1 = [{id: 6, value: '410', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsSVAblPossessors)
			} else if (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 2) {
				nounOptionsSVPossessors1 = [{id: 10, value: '420', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsSVPossessors)
				nounOptionsSVAblPossessors1 = [{id: 10, value: '420', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsSVAblPossessors)
			} else if (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 3) {
				nounOptionsSVPossessors1 = [{id: 14, value: '430', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsSVPossessors)
				nounOptionsSVAblPossessors1 = [{id: 14, value: '430', text: npossvalue+" (subject)"}].concat(this.state.nounOptionsSVAblPossessors)
			} else {
				nounOptionsSVPossessors1 = this.state.nounOptionsSVPossessors
				nounOptionsSVAblPossessors1 = this.state.nounOptionsSVAblPossessors		
			}
			this.setState({
				nounOptionsSVPossessors1:nounOptionsSVPossessors1,
				nounOptionsSVAblPossessors1:nounOptionsSVAblPossessors1,
			})
		}



  }


	// setDefaultInstructions = (num, event, data) => {
	// 	// instructionSet[num].map((x)=>{
	// 	// 	console.log(x)
	// 	this.backEndCall(instructionSet[num])
	// 	// })
	// }

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
				mvnObliques:[],
      	mvnObliquesSegments: [],
      	mvvSegments: [],
      	mvnsSegments: [],
      	mvnoSegments: [],
      	mvEnglish1: [],
      	mvEnglish2: [],
      	mvEnglish3: [],
      	mvEnglishAbl: [],
      	mvEnglishQaa: [],
      	mvqWord: [],
      	mvqWordSegments: [],
      	mvvType:'',
      	optCase:'',
      	mv:{},
      	requirePostbase:'',
			})

		} else if (type === 'cv') {
			this.setState({
				cvvBase:[],
				cvnsBases:[],
				cvnoBases:[],
				cvno:[],				
				cvns:[],
				cvvMood:"",
      	cvvType:'',
				cvvs:[],
				cvvo:[],
				cvnObliques:[],
      	cvnObliquesSegments: [],
      	cvvSegments: [],
      	cvnsSegments: [],
      	cvnoSegments: [],
      	cvEnglish1: [],
      	cvEnglish2: [],
      	cvEnglish3: [],
      	cvEnglishAbl: [],
      	cv:{},
      	requirePostbase:'',
			})			
		} else if (type === 'sv') {
			this.setState({
				svvBase:[],
				svnsBases:[],
				svnoBases:[],
				svno:[],				
				svns:[],
				svvMood:"",
				svvType:"",
				svvs:[],
				svvo:[],
				svnObliques:[],
      	svnObliquesSegments: [],
      	svvSegments: [],
      	svnoSegments: [],
      	svEnglish1:[],
      	svEnglish2:[],
      	svEnglishAbl: [],
      	sv:{},

			})			
		} else if (type === 'np') {
			this.setState({
				npn:[],
				npnBases:[],
				npnCase:[],
				npnType:[],
		    npnSegments: [],
		    npnEnglish1: [],
		    npnEnglish2: [],
		    np:{},
			})			
		}
	}

	requirePostbaseMood(mood) {
		if (mood == 'Intrg4' || mood == 'Intrg5' || mood == 'Cont' || mood == 'CtmpI' || mood == 'CtmpII') {
			return true
		} else {
			return false	
		}
	}

	backEndCall(keyChanged, eraseExisting, simpleCall) {
		console.log('backend',this.state)
		console.log('backendcall',keyChanged, eraseExisting, simpleCall)

		let mv = {}
		let cv = {}
		let sv = {}
		let np = {}



		if (eraseExisting) {
			if (simpleCall && this.props.location.state !== undefined) {
				if ('mv' in this.props.location.state) {
					Object.keys(this.props.location.state['mv']).map((k)=>{
						// console.log('entry',k)
						mv[k]=this.props.location.state['mv'][k]
					})
				} else {
					Object.keys(this.props.location.state['np']).map((k)=>{
						// console.log('entry',k)
						np[k]=this.props.location.state['np'][k]
					})
				}
			}
		} else {
			if (this.state.mvvBase.length > 0) {mv['vBase']=this.state.mvvBase}
			if (this.state.mvnsBases.length > 0) {mv['nsBases']=this.state.mvnsBases}
			if (this.state.mvnoBases.length > 0) {mv['noBases']=this.state.mvnoBases}
			if (this.state.mvno.length > 0) {mv['no']=this.state.mvno}
			if (this.state.mvns.length > 0) {mv['ns']=this.state.mvns}

			if (this.state.mvvMood.length > 0) {mv['vMood']=this.state.mvvMood}
			if (this.state.mvvType.length > 0) {mv['vType']=this.state.mvvType}
			if (this.state.mvvs.length > 0) {mv['vs']=this.state.mvvs}
			if (this.state.mvvo.length > 0) {mv['vo']=this.state.mvvo}
			if (this.state.mvnObliques.length > 0) {mv['nObliques']=this.state.mvnObliques}
			// if (this.state.mvqWord.length > 0) {mv['qWord']=this.state.mvqWord}

			if (this.state.cvvBase.length > 0) {cv['vBase']=this.state.cvvBase}
			if (this.state.cvnsBases.length > 0) {cv['nsBases']=this.state.cvnsBases}
			if (this.state.cvnoBases.length > 0) {cv['noBases']=this.state.cvnoBases}
			if (this.state.cvno.length > 0) {cv['no']=this.state.cvno}
			if (this.state.cvns.length > 0) {cv['ns']=this.state.cvns}
			if (this.state.cvvMood.length > 0) {cv['vMood']=this.state.cvvMood}
			if (this.state.cvvType.length > 0) {cv['vType']=this.state.cvvType}
			if (this.state.cvvs.length > 0) {cv['vs']=this.state.cvvs}
			if (this.state.cvvo.length > 0) {cv['vo']=this.state.cvvo}
			if (this.state.cvnObliques.length > 0) {cv['nObliques']=this.state.cvnObliques}

			if (this.state.svvBase.length > 0) {sv['vBase']=this.state.svvBase}
			if (this.state.svnsBases.length > 0) {sv['nsBases']=this.state.svnsBases}
			if (this.state.svnoBases.length > 0) {sv['noBases']=this.state.svnoBases}
			if (this.state.svno.length > 0) {sv['no']=this.state.svno}
			if (this.state.svns.length > 0) {sv['ns']=this.state.svns}
			if (this.state.svvMood.length > 0) {sv['vMood']=this.state.svvMood}
			if (this.state.svvType.length > 0) {sv['vType']=this.state.svvType}
			if (this.state.svvs.length > 0) {sv['vs']=this.state.svvs}
			if (this.state.svvo.length > 0) {sv['vo']=this.state.svvo}
			if (this.state.svnObliques.length > 0) {sv['nObliques']=this.state.svnObliques}

			if (this.state.npn.length > 0) {np['n']=this.state.npn}
			if (this.state.npnBases.length > 0) {np['nBases']=this.state.npnBases}
			if (this.state.npnCase.length > 0) {np['nCase']=this.state.npnCase}
			if (this.state.npnType.length > 0) {np['nType']=this.state.npnType}

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
      	console.log(response.data)
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
      		// Object.keys(response.data['english']).map((k)=>{
      		// 		// console.log(k)
      		// 		// console.log(response.data['english'][k])
      		// 		updateDict[[k]] = response.data['english'][k]

			     //    // this.setState({
			     //    // 	[k]: response.data['english'][k],
			     //    // })

			     //  })
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
      				if (k == 'vType') {
      					if (this.requirePostbaseMood(response.data['mv']['vType'])) {
      						updateDict['requirePostbase'] = response.data['mv']['vType'] 					      						
      					}
      				}
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

      	if ("cv" in response.data) {
      		updateDict['cv'] = response.data['cv']

      		vOptions.map((k)=>{
      			vkey = 'cv'+k
      			if (k in response.data['cv']) {
      				updateDict[[vkey]] = response.data['cv'][k]
      				if (k == 'vMood') {
      					if (this.requirePostbaseMood(response.data['cv']['vMood'])) {
      						updateDict['requirePostbase'] = response.data['cv']['vMood'] 					      						
      					}
      				}
      			} else {
      				updateDict[[vkey]] = []
			        // this.setState({
			        	// [vkey]: [],
			        // })      				
      			}
      		})
      	} else {
      		this.initialize('cv')
      	}

      	if ("sv" in response.data) {
      		updateDict['sv'] = response.data['sv']

      		vOptions.map((k)=>{
      			vkey = 'sv'+k
      			if (k in response.data['sv']) {
      				updateDict[[vkey]] = response.data['sv'][k]
			        // this.setState({
			        // 	[vkey]: response.data['sv'][k],
			        // })
      			} else {
      				updateDict[[vkey]] = []
			        // this.setState({
			        	// [vkey]: [],
			        // })      				
      			}
      		})
      		// if (this.state.svvType.length > 0) {
      			// updateDict['svEnglish1']=[[this.state.svvType, 'svv.e']].concat(updateDict['svEnglish1'])
      			// this.setState({svEnglish1:[[this.state.svvType, 'svv.e']].concat(this.state.svEnglish1)})
      		// }
      	} else {
      		this.initialize('sv')
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

      	if ("parses" in response.data) {
      		updateDict['parses'] = response.data.parses
      	}

      	if ("segments" in response.data) {
      		if ("mv" in response.data.segments) {
      			if ("nObliques" in response.data.segments.mv) {
			        // this.setState({
			        	// mvnObliquesSegments: response.data.segments.mv.nObliques,
			        // })      				
      				updateDict['mvnObliquesSegments'] = response.data.segments.mv.nObliques
      			} else {
			        // this.setState({
			        	// mvnObliquesSegments: [],
			        // })      	      				
      				updateDict['mvnObliquesSegments'] = []
      			}
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
      			if ("qWord" in response.data.segments.mv) {
			        // this.setState({
			        	// mvvSegments: response.data.segments.mv.v,
			        // })      				
      				updateDict['mvqWordSegments'] = response.data.segments.mv.qWord
      			} else {
			        // this.setState({
			        	// mvvSegments: "",
			        // })      	      				
      				updateDict['mvqWordSegments'] = ""
      			}
      			if ("ns" in response.data.segments.mv) {
			        // this.setState({
			        	// mvnsSegments: response.data.segments.mv.ns,
			        // })      				
      				updateDict['mvnsSegments'] = response.data.segments.mv.ns
      			} else {
			        // this.setState({
			        	// mvnsSegments: [],
			        // })      	      				
      				updateDict['mvnsSegments'] = []
      			}
      			if ("no" in response.data.segments.mv) {
			        // this.setState({
			        	// mvnoSegments: response.data.segments.mv.no,
			        // })      				
      				updateDict['mvnoSegments'] = response.data.segments.mv.no
      			} else {
			        // this.setState({
			        	// mvnoSegments: [],
			        // })      	      				
      				updateDict['mvnoSegments'] = []
      			}      			  
      		}
      		if ("cv" in response.data.segments) {
      			if ("nObliques" in response.data.segments.cv) {
			        // this.setState({
			        	// cvnObliquesSegments: response.data.segments.cv.nObliques,
			        // })      				
      				updateDict['cvnObliquesSegments'] = response.data.segments.cv.nObliques
      			} else {
			        // this.setState({
			        	// cvnObliquesSegments: "",
			        // })      	      				
      				updateDict['cvnObliquesSegments'] = ""
      			}      			
      			if ("v" in response.data.segments.cv) {
			        // this.setState({
			          // cvvSegments: response.data.segments.cv.v,
			        // })      				
      				updateDict['cvvSegments'] = response.data.segments.cv.v
      			} else {
			        // this.setState({
			        	// cvvSegments: "",
			        // })      	      				
      				updateDict['cvvSegments'] = ""
      			}
      			if ("ns" in response.data.segments.cv) {
			        // this.setState({
			        	// cvnsSegments: response.data.segments.cv.ns,
			        // })      				
      				updateDict['cvnsSegments'] = response.data.segments.cv.ns
      			} else {
			        // this.setState({
			        	// cvnsSegments: [],
			        // })      	      				
      				updateDict['cvnsSegments'] = []
      			}
      			if ("no" in response.data.segments.cv) {
			        // this.setState({
			        	// cvnoSegments: response.data.segments.cv.no,
			        // })      				
      				updateDict['cvnoSegments'] = response.data.segments.cv.no
      			} else {
			        // this.setState({
			        	// cvnoSegments: [],
			        // })      	      				
      				updateDict['cvnoSegments'] = []
      			}      			  
      		}

      		if ("sv" in response.data.segments) {
      			if ("nObliques" in response.data.segments.sv) {
			        // this.setState({
			        	// svnObliquesSegments: response.data.segments.sv.nObliques,
			        // })      				
      				updateDict['svnObliquesSegments'] = response.data.segments.sv.nObliques
      			} else {
			        // this.setState({
			        	// svnObliquesSegments: "",
			        // })      	      				
      				updateDict['svnObliquesSegments'] = ""
      			}   
      			if ("v" in response.data.segments.sv) {
			        // this.setState({
			        	// svvSegments: response.data.segments.sv.v,
			        // })      				
      				updateDict['svvSegments'] = response.data.segments.sv.v
      			} else {
			        // this.setState({
			        	// svvSegments: "",
			        // })      	      				
      				updateDict['svvSegments'] = ""
      			}
      			if ("no" in response.data.segments.sv) {
			        // this.setState({
			        	// svnoSegments: response.data.segments.sv.no,
			        // })      				
      				updateDict['svnoSegments'] = response.data.segments.sv.no
      			} else {
			        // this.setState({
			        	// svnoSegments: [],
			        // })      	      				
      				updateDict['svnoSegments'] = []
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


      	this.setState(updateDict,()=>{this.resetAfterSubmit()})


      	// Object.keys(updateDict).map((k)=>{
      		// this.setState({[k]:updateDict[k]})
      	// })
      	

  		})

	}

	resetAfterSubmit = () => {
		this.setState({containsTime:false,activeIndexes:[],activeIndexes1:[],currentlyOpen:'',isOpen:false,mvvsPlanned:[],searchQuery:'',wordsList:[],candidateBase:[],candidateDisplay:[],candidateCall:[],nextTenses:[],nounNum:'s',unallowable_next_ids:[],addIs:true,lockSubmit:false});
	}


	processStyledText = (sentence) => {			
		let matches = sentence.match(/\<.*?\>/g)
		if (matches !== null) {
			matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))		
			return <span dangerouslySetInnerHTML={{__html: sentence.replace("⟨","").replace("⟩","")}} />		
		} else {
			return <span>{sentence.replace("⟨","").replace("⟩","")}</span>
		}
	}


	onChangeBaseSearch = (endingNeeded,forEnglish,itemUpdating,mood,submood,event,data) => {
		console.log(endingNeeded,forEnglish,itemUpdating,mood,submood)
		let word = data.value
		let wordsList
		let filteredDictV = {}
		let noFuture = false
		let noPast = false
		let optionsFuzzy = {
		  keys: ['yupikword', 'base_case'],
		  limit: 10, // don't return more results than you need!
		  threshold: -10000, // don't return bad results
		};

		// if (word.length>0) {
		// this.setState({ activeIndexes: [] });			
		// }

		let newSearch = word.replaceAll(/^is /g,'').replaceAll(/^am /g,'')


		console.log((endingNeeded,event,data))
		if (this.state.nextTenses.length > 0) {
			if (this.state.nextTenses[this.state.nextTenses.length-1] === 'p') {
				optionsFuzzy['keys'] = ['yupikword','past_preverb']
			} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'g') {
				optionsFuzzy['keys'] = ['yupikword','ger_preverb']
			} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'i') {
				optionsFuzzy['keys'] = ['yupikword','inf_preverb']
			} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'pp') {
				optionsFuzzy['keys'] = ['yupikword','past_preverb']
			}
		}

		console.log(optionsFuzzy)
		if (mood == 'CtmpI' || mood == 'CtmpII' || submood == 'Intrg4' || mood == 'Sbrd' || mood.includes('Opt')) {
			noFuture = true
		}
		if (mood == 'Sbrd' || mood.includes('Opt') || submood == 'Intrg5') {
			noPast = true
		}
		// if (submood == 'Intrg4' || submood == 'Intrg5') {
		// 	noFuture = true
		// 	noPast = true
		// }
		if (submood == 'Intrg1' || submood == 'Intrg3') {
			filteredDictV = this.state.filteredDictVit
		} else {
			filteredDictV = this.state.filteredDictV
		}
		if (noFuture && noPast) {
			Object.keys(this.state.filteredDictVVnotime).map(key => filteredDictV[key]=this.state.filteredDictVVnotime[key])
		} else if (noFuture) {
			Object.keys(this.state.filteredDictVVnofuture).map(key => filteredDictV[key]=this.state.filteredDictVVnofuture[key])
		} else if (noPast) {
			Object.keys(this.state.filteredDictVVnopast).map(key => filteredDictV[key]=this.state.filteredDictVVnopast[key])
		} else {
			Object.keys(this.state.filteredDictVVall).map(key => filteredDictV[key]=this.state.filteredDictVVall[key])
		}

		if (this.state.endingAdjusted == 'n') {
	    	wordsList = fuzzysort.go(newSearch, this.state.filteredDictN, optionsFuzzy).map(({ obj }) => (obj));
	    	this.setState({ wordsList: wordsList, searchQuery: word });
		} else if (this.state.endingAdjusted == 'v') {
	    	wordsList = fuzzysort.go(newSearch, filteredDictV, optionsFuzzy).map(({ obj }) => (obj));
	    	this.setState({ wordsList: wordsList, searchQuery: word });
		} else {
			if (endingNeeded === 'v') {
	    	wordsList = fuzzysort.go(newSearch, filteredDictV, optionsFuzzy).map(({ obj }) => (obj));
	    	this.setState({ wordsList: wordsList, searchQuery: word });
			} else if (endingNeeded === 'n') {
	    	wordsList = fuzzysort.go(newSearch, this.state.filteredDictN, optionsFuzzy).map(({ obj }) => (obj));
	    	this.setState({ wordsList: wordsList, searchQuery: word });
			}
		}
	}

	

  handleOpen = (current) => {
    this.setState({ isOpen: true ,currentlyOpen: current});
  }
  
  menuSelect = (direction) => {
  	console.log(direction)
  	// if (this.state.cpreviousEditMode !== this.state.currentEditMode) {
	  	// this.closeEditMenuRef(direction[0],'default')
	  // } else {
	  this.closeEditMenuRef(direction[0],direction[1],true)
	  // }
    // this.setState({ isOpen: false },()=>{this.setState({isOpen: true})});
    
  }

  returnHeight = (type) => {
  	// var height = 0
  	// console.log(type)
  	// height = document.getElementById('tester');
  	// if (height) {
  	// 	console.log(height.offsetHeight)  		
  	// } else {
  	// 	console.log('null')
  	// }
  	if (type === 'default') {
  		return
  	} else if (type === 'mvinsert' || type === 'mvupdate') {
  		return 616
  	} else {
  		return 616
  		// return document.getElementById.clientHeight('menuheight');
  	}
  }

  triggerItems = (type,ind) => {
  	// console.log(this.state)
  	// console.log('trigger',type,ind)
  	if (type==='default') {
  		return this.contentDisplay([], 3)
  	} else if (type==='defaultverbphrase') {
  		return this.contentDisplay([], 3)
  	} else if (type==='defaultmv') {
  		return this.contentDisplay([], 4)
  	} else if (type==='defaultcv') {
  		return this.contentDisplay([], 4)
  	} else if (type==='defaultsv') {
  		return this.contentDisplay([], 4)
  	} else if (type === 'mvnsParser') {
  		return this.contentDisplay(this.state.mvnsSegments.slice().reverse()[ind[0]][ind[1]], 1)
  	} else if (type==='mvnsappositiveParser') {
  		return this.contentDisplay(this.state.mvnsSegments.slice().reverse()[ind[0]][ind[1]], 1)		
  	} else if (type==='mvnoParser') {
  		return this.contentDisplay(this.state.mvnoSegments.slice().reverse()[ind[0]][ind[1]], 1)		
  	} else if (type==='mvnoappositiveParser') {
  		return this.contentDisplay(this.state.mvnoSegments.slice().reverse()[ind[0]][ind[1]], 1)			
  	} else if (type === 'cvnsParser' || type === 'cvnsappositiveParser') {
  		return this.contentDisplay(this.state.cvnsSegments.slice().reverse()[ind[0]][ind[1]], 1)
  	} else if (type === 'cvnoParser' || type === 'cvnoappositiveParser') {
  		return this.contentDisplay(this.state.cvnoSegments.slice().reverse()[ind[0]][ind[1]], 1)		
  	} else if (type==='svnoParser' || type === 'svnoappositiveParser') {
  		return this.contentDisplay(this.state.svnoSegments.slice().reverse()[ind[0]][ind[1]], 1)		
  	} else if (type==='cvnoappositiveParser') {
  		return this.contentDisplay(this.state.cvnoSegments.slice().reverse()[ind[0]][ind[1]], 1)		
  	} else if (type == 'mvQuestion' || type == 'mvParser') {
  		return this.contentDisplay(this.state.mvvSegments, 2)		
  	} else if (type==='mvqWord' || type==='mvqWordParser') {
  		return this.contentDisplay(this.state.mvqWordSegments, 2)		
  	} else if (type == 'cvParser') {
  		return this.contentDisplay(this.state.cvvSegments, 2)		
  	} else if (type == 'svParser') {
  		return this.contentDisplay(this.state.svvSegments, 2)		
  	} else if (type==='npnParser' || type==='npnappositiveParser') {
  		return this.contentDisplay(this.state.npnSegments.slice().reverse()[ind[0]][ind[1]], 1)		
  	} else if (type==='mvnObliquesParser' || type == 'mvnObliquesAppositiveParser') {
  		return this.contentDisplay(this.state.mvnObliquesSegments[ind[0]][ind[1]][ind[2]], 1)		
  	} else if (type==='cvnObliquesParser' || type==='cvnObliquesAppositiveParser') {
  		return this.contentDisplay(this.state.cvnObliquesSegments[ind[0]][ind[1]][ind[2]], 1)		
  	} else if (type==='svnObliquesParser' || type==='svnObliquesAppositiveParser') {
  		return this.contentDisplay(this.state.svnObliquesSegments[ind[0]][ind[1]][ind[2]], 1)
  	} else if (type==='mvEnglish1') {
  		return this.contentDisplay(this.state.mvEnglish1, 5)
		} else if (type==='mvEnglish2') {
			return <span>
								{this.state.mvEnglish3.length > 0 ?
									this.contentDisplay([this.state.mvEnglish3,this.state.mvEnglish2], 8)
									:
									this.contentDisplay(this.state.mvEnglish2, 5)
								}
							</span>
		} else if (type==='mvEnglishAbl') {
  		return this.contentDisplay(this.state.mvEnglishAbl, 5)
		} else if (type==='mvEnglishQaa') {
  		return this.contentDisplay(this.state.mvEnglishQaa, 5)
		} else if (type==='npnEnglish1') {
  		return this.contentDisplay(this.state.npnEnglish1, 5)
		} else if (type==='cvEnglish1') {
  		return this.contentDisplay(this.state.cvEnglish1, 5)
		} else if (type==='cvEnglishAbl') {
  		return this.contentDisplay(this.state.cvEnglishAbl, 5)
		} else if (type==='cvEnglish2') {
  		return <span>
								{this.state.cvEnglish3.length > 0 ?
									this.contentDisplay([this.state.cvEnglish3,this.state.cvEnglish2], 8)
									:
									this.contentDisplay(this.state.cvEnglish2, 5)
								}
							</span>
		} else if (type==='svEnglishAbl') {
  		return this.contentDisplay(this.state.svEnglishAbl, 5)
		} else if (type==='svEnglish2') {
  		return this.contentDisplay(this.state.svEnglish2, 5)
		} else if (type==='mvnObliquesEnglish1') {
  		return this.contentDisplay(this.state.mvnObliquesEnglish1[ind], 5)
		} else if (type==='svnObliquesEnglish1') {
  		return this.contentDisplay(this.state.svnObliquesEnglish1[ind], 5)
		} else if (type==='cvnObliquesEnglish1') {
  		return this.contentDisplay(this.state.cvnObliquesEnglish1[ind], 5)
		} else if (type==='mvnsEnglish2' || type==='mvnsEnglish2appositive') {
  		return this.contentDisplay(this.state.mvnsEnglish2[ind[0]][ind[1]], 5)
		} else if (type==='mvnoEnglish2' || type==='mvnoEnglish2appositive') {
  		return this.contentDisplay(this.state.mvnoEnglish2[ind[0]][ind[1]], 5)
		} else if (type==='cvnsEnglish2' || type==='cvnsEnglish2appositive') {
  		return this.contentDisplay(this.state.cvnsEnglish2[ind[0]][ind[1]], 5)
		} else if (type==='cvnoEnglish2' || type==='cvnoEnglish2appositive') {
  		return this.contentDisplay(this.state.cvnoEnglish2[ind[0]][ind[1]], 5)
		} else if (type==='svnoEnglish2' || type==='svnoEnglish2appositive') {
  		return this.contentDisplay(this.state.svnoEnglish2[ind[0]][ind[1]], 5)
		} else if (type==='npnEnglish2') {
  		return this.contentDisplay(this.state.npnEnglish2[ind[0]][ind[1]], 5)
		} else if (type==='npnEnglish2appositive') {
  		return this.contentDisplay(this.state.npnEnglish2[ind[0]][ind[1]], 5)
		} else if (type==='cvnsEnglish2') {
  		return this.contentDisplay(this.state.cvnsEnglish2[ind], 6)
		} else if (type==='svnoEnglish2') {
  		return this.contentDisplay(this.state.svnoEnglish2[ind], 6)
		} else if (type==='mvnObliquesEnglish2' || type ==='mvnObliquesEnglish2appositive') {
  		return this.contentDisplay(this.state.mvnObliquesEnglish2[ind[0]][this.state.mvnObliquesEnglish2[ind[0]].length-1-ind[1]][this.state.mvnObliquesEnglish2[ind[0]][this.state.mvnObliquesEnglish2[ind[0]].length-1-ind[1]].length-1-ind[2]], 5)
		} else if (type==='cvnObliquesEnglish2' || type==='cvnObliquesEnglish2appositive') {
  		return this.contentDisplay(this.state.cvnObliquesEnglish2[ind[0]][this.state.cvnObliquesEnglish2[ind[0]].length-1-ind[1]][this.state.cvnObliquesEnglish2[ind[0]][this.state.cvnObliquesEnglish2[ind[0]].length-1-ind[1]].length-1-ind[2]], 5)
		} else if (type==='svnObliquesEnglish2' || type==='svnObliquesEnglish2appositive') {
  		return this.contentDisplay(this.state.svnObliquesEnglish2[ind[0]][this.state.svnObliquesEnglish2[ind[0]].length-1-ind[1]][this.state.svnObliquesEnglish2[ind[0]][this.state.svnObliquesEnglish2[ind[0]].length-1-ind[1]].length-1-ind[2]], 5)
		} else if (type==='svEnglish1') {
			return <span style={{display:'inline-block',border:'1px solid #22242626',marginRight:'2px',marginLeft:'2px',cursor:'pointer',fontSize:'18px',padding:'8px 5px 8px 5px',borderRadius:'5px'}}> 
			{this.state.svEnglish2.map((w,wind)=>
				<span style={{color:this.getColor(w[1])}}>{this.state.svvText+w[0]+" "}</span>
				)} 
			{this.state.svEnglish1.map((w,wind)=>
				<span style={{color:this.getColor(w[1])}}>{this.state.svvText+w[0]+" "}</span>
				)} 
			<Icon style={{fontSize:'16px',margin:0}} name='dropdown' /></span>  	
		}
		
  }



  contentDisplay = (data, fontType) => {
  	// console.log(data)
  	if (fontType == 1) {
		return <div style={{paddingRight:10,paddingLeft:10,cursor:'pointer'}}>
							<span style={{cursor:'pointer',display:'flex',justifyContent:'center', flexDirection:'row', marginBottom:5,lineHeight:'35px'}}>
{/*								{data.map((t)=>
									<span style={{color:this.getColor(t[1]),paddingBottom:'2px',borderBottom:'2px solid '+this.getColor(t[1])}}>{t[0]}</span>
								)}*/}
								{data.map((t)=>
									<span style={{color:this.getColor(t[1])}}>{t[0]}</span>
								)}
							</span>
						</div>								
  	} else if (fontType == 2) {
  		return 	<div style={{fontSize:'30px',fontWeight:'400'}}>
								<span style={{cursor:'pointer',display:'flex',justifyContent:'center', flexDirection:'row', marginBottom:5,lineHeight:'35px'}}>
									{data.map((t)=>
										<span style={{color:this.getColor(t[1])}}>{t[0]}</span>
									)}
								</span>
							</div>  		
  	} else if (fontType == 3) {
  		return <Button size='large' basic icon>
							 <Icon name='plus' />
						 </Button>  		
  	} else if (fontType == 4) {
  		return <Button size='small' basic icon>
							 <Icon name='plus' />
						 </Button>
  	} else if (fontType == 5) {
  		// console.log(data)
  		// console.log('5')
			return <span style={{display:'inline-block',border:'solid 1px #22242626',marginRight:'2px',marginLeft:'2px',cursor:'pointer',fontSize:'18px',padding:'8px 5px 8px 5px',borderRadius:'5px'}}> 
			{data.map((w,wind)=><span 
				style={{color:this.getColor(w[1])}}
				// {{color:this.getColor(w[1]),cursor:'pointer',paddingBottom:'1px',borderBottom:'1px solid '+this.getColor(w[1])}}
				// {{border:'solid 1px #22242626',color:this.getColor(w[1]),fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'2px',marginLeft:'2px',}}
				>{w[0].replaceAll("<","").replaceAll(">","")+" "}</span>)} <Icon style={{fontSize:'16px',margin:0}} name='dropdown' /></span>  		
  	} else if (fontType == 6) {
  		console.log('6')
  		return 	<span> {data.map((w,wind)=>
							(w.map((t)=> <span style={{color:this.getColor(t[1]),cursor:'pointer',paddingBottom:'1px',borderBottom:'1px solid '+this.getColor(t[1])}}>{t[0]+" "}<Icon style={{color:this.getColor(t[1]),fontSize:'16px',margin:0}} name='dropdown' /></span>)))}
  						</span>
  	} else if (fontType == 7) {
  		console.log('7')
  		return 	<span style={{color:this.getColor(data[1]),cursor:'pointer',paddingBottom:'1px',borderBottom:'1px solid '+this.getColor(data[1])}}>{data[0]+" "}<Icon style={{color:this.getColor(data[1]),fontSize:'16px',margin:0}} name='dropdown' /></span>
  	} else if (fontType == 8) {
  		// console.log('8')
			return <span style={{display:'inline-block',border:'solid 1px #22242626',marginRight:'2px',marginLeft:'2px',cursor:'pointer',fontSize:'18px',padding:'8px 5px 8px 5px',borderRadius:'5px'}}> 
			{data[0].map((w,wind)=><span style={{color:this.getColor(w[1])}}>{w[0]+(w[0].length>0?" ":"")}</span>)} 
			{data[1].map((w,wind)=><span style={{color:this.getColor(w[1])}}>{w[0]+(w[0].length>0 && wind !== data[1].length-1 ?" ":"")}</span>)} 
			<Icon style={{color:this.getColor(data[1]),fontSize:'16px',margin:0}} name='dropdown' />
			</span>  
  	}
  }													

  contentItems = (currentEditMode,type,ind,mainscreen,forEnglish,setStateTo) => {
  	// console.log(type,ind)
  	let typeInd = type+(ind+1).toString()
  	// let currentEditMode = this.state.currentEditMode
  	if (setStateTo == undefined) {
  		setStateTo = ['','']
  	}
  	if (mainscreen) {
  		currentEditMode = type
  	}

  	// console.log(currentEditMode)


  	if (currentEditMode==='default') {
  		if (type === 'default') {
  			return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.menuItem('BaseChooser','Make a Verb Statement',[typeInd,'mvinsert'],null,null)}
			      {this.subMenuItem('nounPhrase')}
			      {this.subMenuItem('addQuestion')}
			      {this.subMenuItem('addCommand')}
			    	</Menu>  			
  		} else if (type === 'defaultmv') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.state.mvvs.length > 0 && this.state.mvns.length == 0 && this.state.mvvType !== 'Intrg0' && this.state.mvvType !== 'Intrg2' ? this.menuItem('BaseChooser','Add Noun Subject',[typeInd,'mvnsinsert'],null) : null}
						{this.state.mvvo.length > 0 && this.state.mvno.length == 0 && this.state.mvvType !== 'Intrg1' && this.state.mvvType !== 'Intrg3' ? this.menuItem('BaseChooser','Add Noun Object',[typeInd,'mvnoinsert'],null) : null}
			      {this.subMenuItem('addnOblique')}
			    	</Menu>  			
  		} else if (type === 'mvEnglishAbl') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.state.mvvo.length > 0 && this.state.mvno.length == 0 && this.state.mvvType !== 'Intrg1' && this.state.mvvType !== 'Intrg3' ? this.menuItem('BaseChooser','Add Noun Object',[typeInd,'mvnoinsert'],null) : null}
			    	</Menu>  			
  		} else if (type === 'mvEnglishQaa') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('Update','Remove Yes or No Question',null,null,[["Update",["mv","vType"],'']])}
			    	</Menu>  			
  		} else if (type === 'defaultcv') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.state.cvvs.length > 0 && this.state.cvns.length == 0 ? this.menuItem('BaseChooser','Add Connective Noun Subject',[typeInd,'cvnsinsert'],null) : null}
						{this.state.cvvo.length > 0 && this.state.cvno.length == 0 ? this.menuItem('BaseChooser','Add Connective Noun Object',[typeInd,'cvnoinsert'],null) : null}
			      {this.subMenuItem('caddnOblique')}
			    	</Menu>  			
  		} else if (type === 'cvEnglishAbl') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.state.cvvo.length > 0 && this.state.cvno.length == 0 ? this.menuItem('BaseChooser','Add Connective Noun Object',[typeInd,'cvnoinsert'],null) : null}
			    	</Menu>  			
  		} else if (type === 'defaultsv') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.state.svvo.length > 0 && this.state.svno.length == 0 ? this.menuItem('BaseChooser','Add Subordinative Noun Object',[typeInd,'svnoinsert'],null) : null}
			      {this.subMenuItem('saddnOblique')}
			    	</Menu>  			
  		} else if (type === 'svEnglishAbl') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.state.svvo.length > 0 && this.state.svno.length == 0 ? this.menuItem('BaseChooser','Add Subordinative Noun Object',[typeInd,'svnoinsert'],null) : null}
			    	</Menu>  			
  		} else if (type === 'defaultverbphrase' && this.state.cvvs.length === 0 ) {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.subMenuItem('addnOblique')}
			      {this.subMenuItem('addAnotherVerbPhrase')}
			      {/*{this.subMenuItem('addCV')}*/}
			      {/*{this.subMenuItem('addSV')}*/}
						{/*{this.menuItem('BaseChooser','Add Connective Verb Phrase','mvcvinsert',null)}*/}
						{/*{this.menuItem('BaseChooser','Add Subordinative Verb Phrase','mvcvinsert',null)}*/}
			    	</Menu>  			
  		} else if (type === 'mvParser') {
  			return this.parserPopup(this.state.parses.mv.v)
  		} else if (type === 'mvnsParser') {
  			return this.parserPopup(this.state.parses.mv.ns[this.state.mvnsSegments.length-1-ind[0]][ind[1]])
  		} else if (type === 'mvnoParser') {
  			return this.parserPopup(this.state.parses.mv.no[this.state.mvnoSegments.length-1-ind[0]][ind[1]])
  		} else if (type === 'mvnObliquesParser' || type === 'mvnObliquesAppositiveParser') {
  			return this.parserPopup(this.state.parses.mv.nObliques[ind[0]][ind[1]][ind[2]])
  		} else if (type === 'cvParser') {
  			return this.parserPopup(this.state.parses.cv.v)
  		} else if (type === 'cvnsParser') {
  			return this.parserPopup(this.state.parses.cv.ns[this.state.cvnsSegments.length-1-ind[0]][ind[1]])
  		} else if (type === 'cvnoParser') {
  			return this.parserPopup(this.state.parses.cv.no[this.state.cvnoSegments.length-1-ind[0]][ind[1]])
  		} else if (type === 'cvnObliquesParser' || type === 'cvnObliquesAppositiveParser') {
  			return this.parserPopup(this.state.parses.cv.nObliques[ind[0]][ind[1]][ind[2]])
  		} else if (type === 'svParser') {
  			return this.parserPopup(this.state.parses.sv.v)
  		} else if (type === 'svnoParser') {
  			return this.parserPopup(this.state.parses.sv.no[this.state.svnoSegments.length-1-ind[0]][ind[1]])
  		} else if (type === 'svnObliquesParser' || type === 'svnObliquesAppositiveParser') {
  			return this.parserPopup(this.state.parses.sv.nObliques[ind[0]][ind[1]][ind[2]])
  		} else if (type === 'npnParser' || type === 'npnappositiveParser') {
  			return this.parserPopup(this.state.parses.np.n[this.state.npn.length-1-ind[0]][ind[1]])
  		} else if (type === 'mvqWordParser') {
  			return this.parserPopup(this.state.parses.mv.qWord)
  		}

  		else if (type == 'mvEnglish2') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.menuItem('BaseChooser','Change Verb',[typeInd,'mvupdate'],null)}
			      {/*{this.menuItem('BaseChooser','Change Verb','mvupdate',null)}*/}
			      {this.state.requirePostbase.length > 0 ?
			      	this.subMenuItem('changeRequiredPostbase')
			      	:
			      	null
			      }
{/*			      {this.state.mvvMood == 'Ind'  ?
			      	(this.state.mvvType !== 'qaa' ?
			      		this.menuItem('Update','Make Yes or No Question',null,null,[["Update",["mv","vType"],'qaa']])
			      		:
			      		null
			      		) 
			      	:
			      	null
			      }*/}
			      {this.state.optCase.length > 0 ?
			      	this.subMenuItem('switchOptative')
			      	:
			      	null
			      }
			      {this.menuItem('Delete','Delete Verb',null,null,[["Delete",["mv",],-1]])}

			    	</Menu>
 			} else if (type == 'mvEnglish1') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.subMenuItem('changeQuestiontype')}
			    	</Menu>
 			} else if (type === 'cvEnglish2') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.menuItem('BaseChooser','Change Connective Verb',[typeInd,'cvupdate'],null)}
			      {this.menuItem('Delete','Delete Connective Verb',null,null,[["Delete",["cv",],-1]])}
			    	</Menu>
 			} else if (type === 'cvEnglish1') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.subMenuItem('changeCVtype')}
			    	</Menu>
 			} else if (type === 'cvEnglish2') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.menuItem('BaseChooser','Change Connective Verb',[typeInd,'cvupdate'],null)}
			      {this.menuItem('Delete','Delete Connective Verb',null,null,[["Delete",["cv",],-1]])}
			    	</Menu>
 			} else if (type === 'svEnglish1') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.menuItem('BaseChooser','Change Subordinative Verb',[typeInd,'svupdate'],null)}
			      {this.menuItem('Delete','Delete Subordinative Verb',null,null,[["Delete",["sv",],-1]])}
			    	</Menu>
 			} else if (type === 'svnoEnglish2') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Noun',[typeInd,'svnoupdateEnglish'],null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun',[typeInd,'svnopossessorinsert'],null) : null}
			      {ind[0] == this.state.svno.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun',[typeInd,'svnopossessedinsert'],null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun',[typeInd,'svnoappositiveinsert'],null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["sv","no",ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type === 'svnoEnglish2appositive') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Descriptor Noun',[typeInd,'svnoupdateEnglish'],null)}
			      {this.menuItem('Delete','Delete Descriptor Noun',null,null,[["Delete",["sv","no",ind[0],this.state.svno[ind[0]].length-1-ind[1]],-1]])}
			    	</Menu>  					
 			} else if (type == 'mvnsEnglish2') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Noun',[typeInd,'mvnsupdateEnglish'],null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun',[typeInd,'mvnspossessorinsert'],null) : null}
			      {ind[0] == this.state.mvns.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun',[typeInd,'mvnspossessedinsert'],null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun',[typeInd,'mvnsappositiveinsert'],null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["mv","ns",ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type == 'mvnsEnglish2appositive') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Descriptor Noun',[typeInd,'mvnsupdateEnglish'],null)}
			      {this.menuItem('Delete','Delete Descriptor Noun',null,null,[["Delete",["mv","ns",ind[0],this.state.mvns[ind[0]].length-1-ind[1]],-1]])}
			    	</Menu>  			
 			} else if (type === 'mvnoEnglish2') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Noun',[typeInd,'mvnoupdateEnglish'],null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun',[typeInd,'mvnopossessorinsert'],null) : null}
			      {ind[0] == this.state.mvno.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun',[typeInd,'mvnopossessedinsert'],null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun',[typeInd,'mvnoappositiveinsert'],null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["mv","no",ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type === 'mvnoEnglish2appositive') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Descriptor Noun',[typeInd,'mvnoupdateEnglish'],null)}
			      {this.menuItem('Delete','Delete Descriptor Noun',null,null,[["Delete",["mv","no",ind[0],this.state.mvno[ind[0]].length-1-ind[1]],-1]])}
			    	</Menu>  			
 			} else if (type === 'cvnsEnglish2') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Noun',[typeInd,'cvnsupdateEnglish'],null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun',[typeInd,'cvnspossessorinsert'],null) : null}
			      {ind[0] == this.state.cvns.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun',[typeInd,'cvnspossessedinsert'],null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun',[typeInd,'cvnsappositiveinsert'],null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["cv","ns",ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type === 'cvnoEnglish2') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Noun',[typeInd,'cvnoupdateEnglish'],null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun',[typeInd,'cvnopossessorinsert'],null) : null}
			      {ind[0] == this.state.cvno.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun',[typeInd,'cvnopossessedinsert'],null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun',[typeInd,'cvnoappositiveinsert'],null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["cv","no",ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type === 'cvnsEnglish2appositive') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Descriptor Noun',[typeInd,'cvnsupdateEnglish'],null)}
			      {this.menuItem('Delete','Delete Descriptor Noun',null,null,[["Delete",["cv","ns",ind[0],this.state.cvns[ind[0]].length-1-ind[1]],-1]])}
			    	</Menu>  			
 			} else if (type === 'cvnoEnglish2appositive') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Descriptor Noun',[typeInd,'cvnoupdateEnglish'],null)}
			      {this.menuItem('Delete','Delete Descriptor Noun',null,null,[["Delete",["cv","no",ind[0],this.state.cvno[ind[0]].length-1-ind[1]],-1]])}
			    	</Menu>  					
 			} else if (type === 'npnEnglish2') {
 				// console.log(ind, this.state.npnEnglish2[ind[0]].length-1)
 				// console.log('content',type,ind)
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
					{this.menuItem('BaseChooser','Change Noun',[typeInd,'npnupdateEnglish'],null)}
					{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun',[typeInd,'npnpossessorinsert'],null) : null}
		      {ind[0] == this.state.npnEnglish2.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun',[typeInd,'npnpossessedinsert'],null) : null}
					{this.menuItem('BaseChooser','Add Descriptor Noun',[typeInd,'npnappositiveinsert'],null)}
					{this.menuItem('Delete','Delete Noun',null,null,[["Delete",["np","n",ind[0]],-1]])}
		    	</Menu>  
 			} else if (type === 'npnEnglish2appositive') {
 					console.log('content',type,ind)
 					return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Noun',[typeInd,'npnupdateEnglish'],null)}
				    {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["np","n",ind[0],this.state.npnEnglish2[ind[0]].length-1-ind[1]],-1]])}
			    	</Menu>   					
 			} else if (type === 'npnEnglish1') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.subMenuItem('changeNPtype')}
			    	</Menu>  			
 			} else if (type==='mvnObliquesEnglish1') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.subMenuItem('changeVObliquetype','mv',ind)}
			    	</Menu>  			
 			} else if (type==='cvnObliquesEnglish1') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.subMenuItem('changeVObliquetype','cv',ind)}
			    	</Menu>  			
 			} else if (type==='svnObliquesEnglish1') {
				return <Menu vertical style={{marginTop:10,marginBottom:10}}>
			      {this.subMenuItem('changeVObliquetype','sv',ind)}
			    	</Menu>  			
 			} else if (type ==='mvnObliquesEnglish2') {
  					return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Oblique Noun',[typeInd,'mvnObliqueUpdate'],null)}
						{this.state.mvnObliques.length > 0 ?
						(ind[1] == this.state.mvnObliques[ind[0]].n.length-1 ? this.menuItem('BaseChooser','Add Oblique Possessor Noun',[typeInd,'mvnObliquepossessorinsert'],null) : null)
						:
						null
						}
			      {ind[1] == 0 ? this.menuItem('BaseChooser','Add Oblique Possessed Noun',[typeInd,'mvnObliquepossessedinsert'],null): null}
			      {/*{ind[1] == 0 ? this.subMenuItem('changeVObliquetype','mv',ind[0]): null}*/}
						{this.menuItem('BaseChooser','Add Descriptor Noun',[typeInd,'mvnObliqueappositiveinsert'],null)}
						{ind[1] == 0 ? 
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["mv","nObliques",ind[0],ind[1]],-1]]))
							:
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["mv","nObliques",ind[0],ind[1],ind[2]],-1]]))
						}
			      
			    	</Menu> 
	  	} else if (type ==='cvnObliquesEnglish2') {
  					return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Oblique Noun',[typeInd,'cvnObliqueUpdate'],null)}
						{this.state.cvnObliques.length > 0 ?
						(ind[1] == this.state.cvnObliques[ind[0]].n.length-1 ? this.menuItem('BaseChooser','Add Oblique Possessor Noun',[typeInd,'cvnObliquepossessorinsert'],null) : null)
						:
						null
						}
			      {ind[1] == 0 ? this.menuItem('BaseChooser','Add Oblique Possessed Noun',[typeInd,'cvnObliquepossessedinsert'],null): null}
			      {/*{ind[1] == 0 ? this.subMenuItem('changeVObliquetype','cv',ind[0]): null}*/}
						{this.menuItem('BaseChooser','Add Descriptor Noun',[typeInd,'cvnObliqueappositiveinsert'],null)}
						{ind[1] == 0 ? 
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["cv","nObliques",ind[0],ind[1]],-1]]))
							:
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["cv","nObliques",ind[0],ind[1],ind[2]],-1]]))
						}
			      
			    	</Menu> 
	  	} else if (type ==='cvnObliquesEnglish2appositive') {
  					return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Oblique Appositive Noun',[typeInd,'cvnObliqueUpdate'],null)}
			      {this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["cv","nObliques",ind[0],ind[1],ind[2]],-1]])}
			    	</Menu> 
	  	} else if (type ==='svnObliquesEnglish2') {
  					return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Oblique Noun',[typeInd,'svnObliqueUpdate'],null)}
						{this.state.svnObliques.length > 0 ?
						(ind[1] == this.state.svnObliques[ind[0]].n.length-1 ? this.menuItem('BaseChooser','Add Oblique Possessor Noun',[typeInd,'svnObliquepossessorinsert'],null) : null)
						:
						null
						}
			      {ind[1] == 0 ? this.menuItem('BaseChooser','Add Oblique Possessed Noun',[typeInd,'svnObliquepossessedinsert'],null): null}
			      {/*{ind[1] == 0 ? this.subMenuItem('changeVObliquetype','sv',ind[0]): null}*/}
						{this.menuItem('BaseChooser','Add Descriptor Noun',[typeInd,'svnObliqueappositiveinsert'],null)}
						{ind[1] == 0 ? 
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["sv","nObliques",ind[0],ind[1]],-1]]))
							:
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["sv","nObliques",ind[0],ind[1],ind[2]],-1]]))
						}
			      
			    	</Menu> 
	  	} else if (type ==='svnObliquesEnglish2appositive') {
  					return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Oblique Appositive Noun',[typeInd,'cvnObliqueUpdate'],null)}
			      {this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["cv","nObliques",ind[0],ind[1],ind[2]],-1]])}
			    	</Menu> 
	  	} else if (type ==='mvnObliquesEnglish2appositive') {
	  				console.log(ind)
  					return <Menu vertical style={{marginTop:10,marginBottom:10}}>
						{this.menuItem('BaseChooser','Change Oblique Appositive Noun',[typeInd,'mvnObliqueUpdate'],null)}
			      {this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["mv","nObliques",ind[0],ind[1],ind[2]],-1]])}
			    	</Menu> 
	  	}
  	} else if (currentEditMode==='mvnObliqueUpdate') {
  		return this.baseChooser(["Update",["mv","nObliques",ind[0],'nBases',ind[1],ind[2]]],'n','updatebase','Ind')
  	} else if (currentEditMode==='cvnObliqueUpdate') {
  		return this.baseChooser(["Update",["cv","nObliques",ind[0],'nBases',ind[1],ind[2]]],'n','updatebase','Ind')
  	} else if (currentEditMode==='svnObliqueUpdate') {
  		return this.baseChooser(["Update",["sv","nObliques",ind[0],'nBases',ind[1],ind[2]]],'n','updatebase','Ind')
  	} else if (currentEditMode==='mvinsert') {
  		return this.baseChooser(["Insert",["mv"]],'v','insert','Ind',null,forEnglish)
  	} else if (currentEditMode==='mvinsertqaa') {
  		return this.baseChooser(["Insert",["mv"]],'v','insert','Ind','qaa',forEnglish)
  	} else if (currentEditMode==='cvinsert') {
  		return this.baseChooser(["Insert",["cv"]],'v','insert',setStateTo[0],setStateTo[1],forEnglish)
  	} else if (currentEditMode==='questionInsert') {
  		return this.baseChooser(["Insert",["mv"]],'v','insert','Intrg',setStateTo[0],forEnglish)
  	} else if (currentEditMode==='commandInsert') {
  		return this.baseChooser(["Insert",["mv"]],'v','insert',setStateTo[0],setStateTo[1],forEnglish)
  	} else if (currentEditMode==='svinsert') {
  		return this.baseChooser(["Insert",["sv"]],'v','insert','Sbrd',setStateTo[0],forEnglish)
  	} else if (currentEditMode==='mvupdate') {
  		return this.baseChooser(["Update",["mv","vBase"]],'v','update',this.state.mvvMood,this.state.mvvType,['',this.state.mvvs])
  	} else if (currentEditMode==='svupdate') {
  		return this.baseChooser(["Update",["sv","vBase"]],'v','update')
  	} else if (currentEditMode==='nObliqueInsert') {
  		if (this.state.mvnObliques.length > 0) {
  		return this.baseChooser(["Insert",["mv","nObliques",-1]],'n','insert',setStateTo[0],setStateTo[1],forEnglish)
  		} else {
  		return this.baseChooser(["Insert",["mv","nObliques"]],'n','insert',setStateTo[0],setStateTo[1],forEnglish)  			
  		}
  	} else if (currentEditMode==='nPhraseInsert') {
  		return this.baseChooser(["Insert",["np"]],'n','insert',setStateTo[0],setStateTo[1],forEnglish)  			
  	} else if (currentEditMode==='cnObliqueInsert') {
  		if (this.state.cvnObliques.length > 0) {
  		return this.baseChooser(["Insert",["cv","nObliques",-1]],'n','insert',this.state.npCase,this.state.npCaseType,forEnglish)
  		} else {
  		return this.baseChooser(["Insert",["cv","nObliques"]],'n','insert',this.state.npCase,this.state.npCaseType,forEnglish)  			
  		}
  	} else if (currentEditMode==='snObliqueInsert') {
  		if (this.state.svnObliques.length > 0) {
  		return this.baseChooser(["Insert",["sv","nObliques",-1]],'n','insert',this.state.npCase,this.state.npCaseType,forEnglish)
  		} else {
  		return this.baseChooser(["Insert",["sv","nObliques"]],'n','insert',this.state.npCase,this.state.npCaseType,forEnglish)  			
  		}
  	} else if (currentEditMode==='mvnObliquepossessorinsert') {
  		return this.baseChooser(["Insert",["mv","nObliques",ind[0],-1]],'n','insert',this.state.npCase,this.state.npCaseType)
  	} else if (currentEditMode==='mvnObliquepossessedinsert') {
  		return this.baseChooser(["Insert",["mv","nObliques",ind[0],0]],'n','insert',this.state.npCase,this.state.npCaseType)
  	} else if (currentEditMode==='cvnObliquepossessorinsert') {
  		return this.baseChooser(["Insert",["cv","nObliques",ind[0],-1]],'n','insert',this.state.npCase,this.state.npCaseType)
  	} else if (currentEditMode==='cvnObliquepossessedinsert') {
  		return this.baseChooser(["Insert",["cv","nObliques",ind[0],0]],'n','insert',this.state.npCase,this.state.npCaseType)
  	} else if (currentEditMode==='svnObliquepossessorinsert') {
  		return this.baseChooser(["Insert",["sv","nObliques",ind[0],-1]],'n','insert',this.state.npCase,this.state.npCaseType)
  	} else if (currentEditMode==='svnObliquepossessedinsert') {
  		return this.baseChooser(["Insert",["sv","nObliques",ind[0],0]],'n','insert',this.state.npCase,this.state.npCaseType)
  	} else if (currentEditMode==='npnupdate') {
  		return this.baseChooser(["Update",["np","nBases",this.state.npn.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='npnupdateEnglish') {
  		return this.baseChooser(["Update",["np","nBases",this.state.npn.length-1-ind[0],ind[1]]],'n','updatebase')
  		// return this.baseChooser(["Update",["np","nBases",this.state.npn.length-1-ind[0],this.state.npn[this.state.npn.length-1-ind[0]].length-1-ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='npinsert') {
  		return this.baseChooser(["Insert",["np"]],'n','insert',this.state.npCase,this.state.npCaseType)
  	} else if (currentEditMode==='npnpossessorinsert') {
  		return this.baseChooser(["Insert",["np","n",-1]],'n','insert')
  	} else if (currentEditMode==='npnappositiveinsert') {
  		console.log(this.state.npn,ind)
  		return this.baseChooser(["Insert",["np","n",this.state.npn.length-1-ind[0],-1]],'n','insert')
  	} else if (currentEditMode==='npnpossessedinsert') {
  		return this.baseChooser(["Insert",["np","n",0]],'n','insert')
  	} else if (currentEditMode==='mvnsinsert') {
  		return this.baseChooser(["Insert",["mv","ns"]],'n','insert','Rel')
  	} else if (currentEditMode==='mvnsupdate') {
  		return this.baseChooser(["Update",["mv","nsBases",this.state.mvnsSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='mvnsupdateEnglish' && ind !== -1) {
  		return this.baseChooser(["Update",["mv","nsBases",this.state.mvnsSegments.length-1-ind[0],this.state.mvnsSegments[this.state.mvnsSegments.length-1-ind[0]].length-1-ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='mvnoupdateEnglish' && ind !== -1) {
  		return this.baseChooser(["Update",["mv","noBases",this.state.mvnoSegments.length-1-ind[0],this.state.mvnoSegments[this.state.mvnoSegments.length-1-ind[0]].length-1-ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='mvnsappositiveinsert') {
  		return this.baseChooser(["Insert",["mv","ns",this.state.mvnsSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (currentEditMode==='mvnObliqueappositiveinsert') {
  		return this.baseChooser(["Insert",["mv","nObliques",ind[0],ind[1],-1]],'n','insert')
  	} else if (currentEditMode==='cvnObliqueappositiveinsert') {
  		return this.baseChooser(["Insert",["cv","nObliques",ind[0],ind[1],-1]],'n','insert')
  	} else if (currentEditMode==='svnObliqueappositiveinsert') {
  		return this.baseChooser(["Insert",["sv","nObliques",ind[0],ind[1],-1]],'n','insert')
  	} else if (currentEditMode==='mvnspossessorinsert') {
  		return this.baseChooser(["Insert",["mv","ns",-1]],'n','insert')
  	} else if (currentEditMode==='mvnspossessedinsert') {
  		return this.baseChooser(["Insert",["mv","ns",0]],'n','insert')
  	} else if (currentEditMode==='mvnopossessedinsert') {
  		return this.baseChooser(["Insert",["mv","no",0]],'n','insert')
  	} else if (currentEditMode==='mvnoinsert') {
  		if (this.state.mvvBase[1] === 'it') {
  			return this.baseChooser(["Insert",["mv","no"]],'n','insert','io')  			
  		} else {
  			return this.baseChooser(["Insert",["mv","no"]],'n','insert','Abs')  			
  		}
  	} else if (currentEditMode==='mvnoappositiveinsert') {
  		return this.baseChooser(["Insert",["mv","no",this.state.mvnoSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (currentEditMode==='mvnoupdate') {
  		return this.baseChooser(["Update",["mv","noBases",this.state.mvnoSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='mvnopossessorinsert') {
  		return this.baseChooser(["Insert",["mv","no",-1]],'n','insert',null)
  	} else if (currentEditMode==='cvupdate') {
  		return this.baseChooser(["Update",["cv","vBase"]],'v','update',this.state.cvvMood,null,['',this.state.cvvs])
  	} else if (currentEditMode==='cvnsinsert') {
  		return this.baseChooser(["Insert",["cv","ns"]],'n','insert','Ind')
  	} else if (currentEditMode==='cvnsupdate') {
  		return this.baseChooser(["Update",["cv","nsBases",this.state.cvnsSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='cvnsupdateEnglish' && ind !== -1) {
  		return this.baseChooser(["Update",["cv","nsBases",this.state.cvnsSegments.length-1-ind[0],this.state.cvnsSegments[this.state.cvnsSegments.length-1-ind[0]].length-1-ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='cvnoupdateEnglish' && ind !== -1) {
  		return this.baseChooser(["Update",["cv","noBases",this.state.cvnoSegments.length-1-ind[0],this.state.cvnoSegments[this.state.cvnoSegments.length-1-ind[0]].length-1-ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='svnoupdateEnglish' && ind !== -1) {
  		return this.baseChooser(["Update",["sv","noBases",this.state.svnoSegments.length-1-ind[0],this.state.svnoSegments[this.state.svnoSegments.length-1-ind[0]].length-1-ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='cvnsappositiveinsert') {
  		return this.baseChooser(["Insert",["cv","ns",this.state.cvnsSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (currentEditMode==='cvnspossessorinsert') {
  		return this.baseChooser(["Insert",["cv","ns",-1]],'n','insert')
  	} else if (currentEditMode==='cvnoinsert') {
  		return this.baseChooser(["Insert",["cv","no"]],'n','insert','Ind')
  	} else if (currentEditMode==='cvnoappositiveinsert') {
  		return this.baseChooser(["Insert",["cv","no",this.state.cvnoSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (currentEditMode==='cvnoupdate') {
  		return this.baseChooser(["Update",["cv","noBases",this.state.cvnoSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='cvnopossessorinsert') {
  		return this.baseChooser(["Insert",["cv","no",-1]],'n','insert',null)
  	} else if (currentEditMode==='cvnopossessedinsert') {
  		return this.baseChooser(["Insert",["cv","no",0]],'n','insert')
  	} else if (currentEditMode==='cvnspossessedinsert') {
  		return this.baseChooser(["Insert",["cv","ns",0]],'n','insert')
  	} else if (currentEditMode==='svnopossessedinsert') {
  		return this.baseChooser(["Insert",["sv","no",0]],'n','insert')
  	} else if (currentEditMode==='svnoinsert') {
  		return this.baseChooser(["Insert",["sv","no"]],'n','insert','Ind')
  	} else if (currentEditMode==='svnoappositiveinsert') {
  		return this.baseChooser(["Insert",["sv","no",this.state.svnoSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (currentEditMode==='svnoupdate') {
  		return this.baseChooser(["Update",["sv","noBases",this.state.svnoSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (currentEditMode==='svnopossessorinsert') {
  		return this.baseChooser(["Insert",["sv","no",-1]],'n','insert',null)
  	} else if (currentEditMode==='question') {
  		return this.menuItem('Question','Make Command','command',null,null)
  	}
    	
  }


closeSubjectMenu = (tag,addSubject) => {
	// console.log(tag, addSubject, this.state.crecentlyOpen)
	this.subjectMenu[tag].close()
	this.setState({
		crecentlyOpen:tag,
	},()=>{
		this.setState({
			addSubject:addSubject,
		})
	})
}

openSubjectMenu = (tag) => {
	this.subjectMenu[tag].open()
}

editSubjectMenu = (nounInsert,subject, tag, statevvs, update, backendcall, value, options) => {
	// console.log(value,options)
	return <Popup
			      trigger={									
							<span style={{display:'inline-block',border:'solid 1px #22242626',marginRight:'2px',marginLeft:'2px',color:this.getColor(tag),fontSize:'18px',padding:'8px 2px 8px 5px',borderRadius:'5px',marginRight:'2px',marginLeft:'2px', cursor:'pointer'}}>{options.map((k)=>{return value == k['value'] ? k['text'] : null})}<Icon style={{color:this.getColor(tag),fontSize:'16px',margin:0}} name='dropdown' /></span>
			      }
			      on='click'
			      position='bottom center'
			      // positionFixed
			      // open={this.state.currentlyOpen === tag}
			      // style={{
			      	// height:this.returnHeight(name),
			      // }}
			      ref={(element)=>{this.subjectMenu[tag]=element;}}
			      onOpen={()=>{this.setState({currentlyOpen:tag,overlayOn:true,})}}
			      onClose={()=>{this.setState({currentlyOpen:''})}}
			      // content={
			      	// }
			    >
			      	<div style={{paddingBottom:0}}>
			      	{this.state.addSubject ?
			      		<div>
					      	<Button basic style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'13px',marginBottom:'5px',marginTop:'10px'}} onClick={()=>{this.closeSubjectMenu(tag,false);}}>
              			<Icon name='chevron left' />
               			<div style={{color:'#666666'}}>{'Back'}</div>
					      	</Button>
				      	{this.baseChooser(nounInsert,'n','insert','Abs','')}
				      	</div>
				      	:
				      	<div id='tester' style={{display:'flex',flexDirection:'column',justifyContent:'center',marginTop:10}}>
				      		{subject.length > 0 ?
					      		<Button basic onClick={()=>{this.closeSubjectMenu(tag,true)}}>{'Add '+subject}</Button>
					      		:
					      		null
					      	}
					      	<Segment style={{height:200,overflow:'auto',padding:0,marginBottom:8}}>
						      <Button.Group style={{border:0}} basic vertical>
						      	{options.map((k)=>
						      		<Button active={k['value']==statevvs.join("")} onClick={()=>{this.closeSubjectMenu(tag,false); this.backEndCall([[update,backendcall,k['value'].split('').map(Number)]])}}>{k['text']}</Button>
						      	)}
					      	</Button.Group>
					      	</Segment>
						      <div style={{textAlign:'center'}}>
							      <Icon color='grey' name='chevron down' />
						      </div>
				      	</div>
				      }
			      	</div>
			   	</Popup>
}

	closeMainScreenMenuRef = (name,currentEditMode) => {
		console.log(this.mainScreenMenuRef, name, currentEditMode)
		if (name in this.mainScreenMenuRef) {
			this.mainScreenMenuRef[name].close()
		}
		if (currentEditMode !== 'default') {
			this.setState({
				crecentlyOpen:name,
			},()=>{
				this.setState({
					currentEditMode:currentEditMode,
				})
			})
		} else {
			this.setState({
				crecentlyOpen:'',
			},()=>{
				this.setState({
					currentEditMode:currentEditMode,
				})
			})
		}
	}


	openMainScreenMenuRef = (name) => {
		if (name in this.mainScreenMenuRef) {
			this.mainScreenMenuRef[name].open()
		}
	}

mainScreenMenu = (name, currentEditMode,setState,setStateTo,forEnglish) => {
	// console.log(name, currentEditMode,setState,setStateTo)
	return   <Popup
				    trigger={<div style={{
				    	border:'solid 1px #22242626',
				    	fontSize:'16px',
				    	padding:'5px',
				    	borderRadius:'5px',
				    	marginRight:'2px',
				    	marginLeft:'2px',
				    	cursor:'pointer',
				    	textAlign:'center',
				    	color:'#00000099'
				    }}>{name}</div>}
				    position="bottom center"
				    ref={(element)=>{this.mainScreenMenuRef[name]=element;}}
			      onOpen={()=>{
			      	console.log('open', name, currentEditMode, setState, setStateTo, forEnglish)
			      	this.setState({
							candidateCall:[],
							candidateBase:[],
							candidateDisplay:[],
							unallowable_next_ids:[],
							nextTenses:[],			      		
			      	})

		      		if (setState === 'npCase') {
								this.setState({npCase:setStateTo[0],npCaseType:setStateTo[1]})
							} else if (setState === 'mvvType') {
								this.setState({mvvType:setStateTo[0]})
							} else if (setState === 'mvinsertqaa') {
								this.setState({mvvMood:setStateTo[0] ,mvvType:setStateTo[1]})
							} else if (setState === 'cvvType') {
								this.setState({cvvMood:setStateTo[0] ,cvvType:setStateTo[1]})
							} else if (setState === 'svvType') {
								this.setState({svvType:setStateTo[0]})
							} else if (setState === 'optCase') {
								this.setState({optCase:setStateTo[0], mvvType:setStateTo[1]})
							}
							this.setState({
								currentlyOpen:name, 
								crecentlyOpen: name, 
								currentEditMode:currentEditMode,
								overlayOn:true,
							// candidateCall:[],
							// candidateBase:[],
							// candidateDisplay:[],
							// unallowable_next_ids:[],
							// nextTenses:[],
							})
			      }}
     				onClose={()=>{this.setState({currentlyOpen:'',containsTime:false,cvvMood:'',activeIndexes1:[],candidateCall:[],candidateBase:[],lockSubmit:false,nextTenses:[],candidateDisplay:[],searchQuery:'',wordsList:[]})}}
  >
  	{this.contentItems(currentEditMode,currentEditMode,-1,true,forEnglish,setStateTo)}
  </Popup>

}

														
	closeEditMenuRef = (typeInd,currentEditMode,turnOffAndOn) => {
		console.log(typeInd,currentEditMode)

		if (turnOffAndOn) {
			if (typeInd in this.editMenuRef) {
				this.editMenuRef[typeInd].close()
			}

			this.setState({
				currentEditMode:currentEditMode,
			},()=>{
				this.editMenuRef[typeInd].open()
			})
		} else {
			// console.log(this.editMenuRef, typeInd, typeInd in this.editMenuRef)
			if (typeInd in this.editMenuRef) {
				if (this.editMenuRef[typeInd] !== null) {
					this.editMenuRef[typeInd].close()
				}
			}

			this.setState({
				currentEditMode:'default',
				currentlyOpen:'',
			})		
		}

	}


	openEditMenuRef = (typeInd) => {
		if (typeInd in this.editMenuRef) {
			this.editMenuRef[typeInd].open()
		}
	}

	resetEditMenu = () => {
		this.setState({
			activeIndexes1:[],
			lockSubmit:false,
			searchQuery:'',
			wordsList:[],
			containsTime:false,
				// candidateCall:[],
				// candidateBase:[],
				// candidateDisplay:[],
				// unallowable_next_ids:[],
				// nextTenses:[],
		})		
	}


	checkIfIntrgTense = (type, ind) => {
		console.log(type, ind)
		if (type == 'mvEnglish2' && this.state.mvvMood === 'Intrg' &&  (this.state.mvvType === 'Intrg4' || this.state.mvvType === 'Intrg5')) {
			if (this.state.mvvType === 'Intrg4' && this.state.candidateDisplay.length === 0) {
				console.log(popularVPostbases)
				let p = '0'
  			this.setState({
  				candidateBase:this.state.candidateBase.concat([[newpostbases[popularVPostbases[p]['expression']]['keylookup'],popularVPostbases[p]['expression']]]),
	    		candidateDisplay:this.state.candidateDisplay.concat([[this.processStyledPostbaseText(popularVPostbases[p],'1',undefined,'mv','Intrg'),newpostbases[popularVPostbases[p]['expression']]['exp']]]),
	    		unallowable_next_ids: this.state.unallowable_next_ids.concat([[popularVPostbases[p]['allowable_next_ids'],]]),
	    		nextTenses:(newpostbases[popularVPostbases[p]['expression']]['match_case'] && !('gen_preverb_after' in newpostbases[popularVPostbases[p]['expression']]) ? (this.state.nextTenses.length == 0 ? this.state.nextTenses.concat(['gen']):this.state.nextTenses.concat([this.state.nextTenses[this.state.nextTenses.length-1]])) : this.state.nextTenses.concat([newpostbases[popularVPostbases[p]['expression']]['gen_preverb_after'],])),
  			},()=>{
	    		this.updateCandidateCall('v','insert','Intrg','Intrg4','p')
	    	})						
			} else if (this.state.mvvType === 'Intrg5' && this.state.candidateDisplay.length === 0) {
				let p = '2'
  			this.setState({
  				candidateBase:this.state.candidateBase.concat([[newpostbases[popularVPostbases[p]['expression']]['keylookup'],popularVPostbases[p]['expression']]]),
	    		candidateDisplay:this.state.candidateDisplay.concat([[this.processStyledPostbaseText(popularVPostbases[p],'1',undefined,'mv','Intrg'),newpostbases[popularVPostbases[p]['expression']]['exp']]]),
	    		unallowable_next_ids: this.state.unallowable_next_ids.concat([[popularVPostbases[p]['allowable_next_ids'],]]),
	    		nextTenses:(newpostbases[popularVPostbases[p]['expression']]['match_case'] && !('gen_preverb_after' in newpostbases[popularVPostbases[p]['expression']]) ? (this.state.nextTenses.length == 0 ? this.state.nextTenses.concat(['gen']):this.state.nextTenses.concat([this.state.nextTenses[this.state.nextTenses.length-1]])) : this.state.nextTenses.concat([newpostbases[popularVPostbases[p]['expression']]['gen_preverb_after'],])),
  			},()=>{
	    		this.updateCandidateCall('v','insert','Intrg','Intrg5','p')
	    	})
			} 
		} else {
		this.setState({
				candidateCall:[],
				candidateBase:[],
				candidateDisplay:[],
				unallowable_next_ids:[],
				nextTenses:[],
		})		
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
      // offset={[0, 100]}
      // on='click'
      // open={this.state.isOpen && this.state.currentlyOpen === typeInd}
      onOpen={()=>{console.log('open', this.state); 
	      						// if (this.state.crecentlyOpen !== this.state.currentlyOpen) {
	      						// 	this.setState({'cpreviousEditMode':this.state.currentEditMode})
	      						// }
	      						this.checkIfIntrgTense(type, ind);
      							this.setState({
      								cpreviousEditMode: this.state.currentEditMode, 
      								currentlyOpen: typeInd,
      								crecentlyOpen: typeInd,
      								overlayOn:true,
      							})
      						}}
      onClose={()=>{console.log('close', this.state); 
	      						// if (this.state.crecentlyOpen !== this.state.currentlyOpen) {
	      						// 	this.setState({'cpreviousEditMode':this.state.currentEditMode})
	      						// }
										// this.setState({currentlyOpen:''})
										// this.closeEditMenuRef('','default',false,true)
										// if (this.state.) {
										// 	this.setState({
										// 		candidateCall:[],
										// 		candidateBase:[],
										// 		candidateDisplay:[],
										// 		unallowable_next_ids:[],
										// 		nextTenses:[],												
										// 	})
										// }
										this.resetEditMenu();
      						}}
      position='bottom center'

      ref={(element)=>{this.editMenuRef[typeInd]=element;}}
      // positionFixed
      // style={{margin:0,padding:0}}
      // 	// height:(this.returnHeight(this.state.currentEditMode)),
      // 	padding:(this.state.currentEditMode==='default' ? 0 : null)
      // }}
      // content={
      // 	this.contentItems(type,ind)
      // }
	    			// {this.state.currentEditMode !== 'default' ?
		    		// 	<Button basic style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'13px',marginBottom:'5px',marginTop:'10px'}} onClick={()=>{this.closeEditMenuRef(typeInd,'default')}}>
		      // 			<Icon name='chevron left' />
		      //  			<div style={{color:'#666666'}}>{'Back'}</div>
			     //  	</Button>
		    		// 	:
		    		// 	null
		    		// }

      >

	    		<div>
		      	{this.contentItems(this.state.currentEditMode,type,ind,false)}
		      </div>

      </Popup>

	}

  handleClick = (index,allowAdd) => {
    // console.log(e,titleProps.id)
    // this.setState({ loaderOn: true });
    // const index = titleProps.id;
    const { activeIndexes } = this.state;
    let newIndex = this.state.activeIndexes.slice()
    // const newIndex = []
    // const newIndex = activeIndex === index ? -1 : index;

    const currentIndexPosition = activeIndexes.indexOf(index);

    // console.log(currentIndexPosition, activeIndexes, index)
    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1);
    } else {
    	if (allowAdd) {
      
      	// newIndex.push(index); //this allows multiple open  
      	newIndex = [index] //restricts open to one at a time

      	this.setState({
	    		searchQuery:'',
	    		wordsList:[],      		
      	})
    	}
    }
 
 	// 	let tag = this.state.currentlyOpen
		// this.setState({currentlyOpen:''},()=>{this.setState({currentlyOpen:tag})})
    // console.log(newIndex)
    // newIndex.map((k)=>{
    // 	console.log()
    // })

    // let mood = moods[index];
    // if (newIndex !== -1) {   
      // this.getEndings(this.state.parses[currentIndex],mood);
    // }
    this.setState({ activeIndexes: newIndex });
  };

  handleClick1 = (index,allowAdd) => {
    // console.log(e,titleProps.id)
    // this.setState({ loaderOn: true });
    // const index = titleProps.id;
    const { activeIndexes1 } = this.state;
    const newIndex = this.state.activeIndexes1.slice()
    // const newIndex = []
    // const newIndex = activeIndex === index ? -1 : index;

    const currentIndexPosition = activeIndexes1.indexOf(index);

    // console.log(currentIndexPosition, activeIndexes, index)
    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1);
    } else {
    	if (allowAdd) {
      	newIndex.push(index);    		
      	this.setState({
	    		searchQuery:'',
	    		wordsList:[],      		
      	})
    	}
    }
 
 	// 	let tag = this.state.currentlyOpen
		// this.setState({currentlyOpen:''},()=>{this.setState({currentlyOpen:tag})})
    // console.log(newIndex)
    // newIndex.map((k)=>{
    // 	console.log()
    // })

    // let mood = moods[index];
    // if (newIndex !== -1) {   
      // this.getEndings(this.state.parses[currentIndex],mood);
    // }
    this.setState({ activeIndexes1: newIndex });
  };


	subMenuItem=(type, ind1, ind2)=> {
		if (type==='addCV') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
	    		<Accordion.Title
	    			id={type}
	    			style={{paddingBottom:'2px'}}
	    			active={this.state.activeIndexes.includes(type)}
            onClick={()=>{this.handleClick(type,true)}}
	    		>
	    			<Icon name="dropdown" />
	    			{'Add Connective Verb'}
	    		</Accordion.Title>
	    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
	    		<Button.Group vertical basic fluid>
		        <Button onClick={()=>{this.setState({cvvMood:'Prec',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>before...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Cnsq',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>because...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Cont',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>whenever...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Conc',cvvType:'eventhough'},()=>{this.menuSelect('cvinsert',-1)})}}>even though...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Conc',cvvType:'evenif'},()=>{this.menuSelect('cvinsert',-1)})}}>even if...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Cond',cvvType:'if'},()=>{this.menuSelect('cvinsert',-1)})}}>if...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Cond',cvvType:'wheninthefuture'},()=>{this.menuSelect('cvinsert',-1)})}}>when (in future)...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'CtmpI',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>when (in past)...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'CtmpII',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>while...</Button>
	    		</Button.Group>
	    		</Accordion.Content>
	    </Accordion>				
		} else if (type==='addAnotherVerbPhrase') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
	    		<Accordion.Title
	    			id={type}
	    			style={{paddingBottom:'2px'}}
	    			active={this.state.activeIndexes.includes(type)}
            onClick={()=>{this.handleClick(type,true)}}
	    		>
	    			<Icon name="dropdown" />
	    			{'Add another verb phrase'}
	    		</Accordion.Title>
	    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
	    		<Button.Group vertical basic fluid>
		        <Button onClick={()=>{this.setState({cvvMood:'Prec',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>before he...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Cnsq',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>because he...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Cont',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>whenever he...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Conc',cvvType:'eventhough'},()=>{this.menuSelect('cvinsert',-1)})}}>even though he...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Conc',cvvType:'evenif'},()=>{this.menuSelect('cvinsert',-1)})}}>even if he...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Cond',cvvType:'if'},()=>{this.menuSelect('cvinsert',-1)})}}>if he...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'Cond',cvvType:'wheninthefuture'},()=>{this.menuSelect('cvinsert',-1)})}}>when (in future) he...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'CtmpI',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>when (in past) he...</Button>
		        <Button onClick={()=>{this.setState({cvvMood:'CtmpII',cvvType:''},()=>{this.menuSelect('cvinsert',-1)})}}>while he...</Button>
			      <Button onClick={()=>{this.setState({svvType:'by'},()=>{this.menuSelect('svinsert',-1)})}}>by...</Button>
			      <Button onClick={()=>{this.setState({svvType:'being'},()=>{this.menuSelect('svinsert',-1)})}}>being...</Button>
	    		</Button.Group>
	    		</Accordion.Content>
	    </Accordion>				
		} else if (type==='addQuestion') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
	    		<Accordion.Title
	    			id={type}
	    			active={this.state.activeIndexes.includes(type)}
            onClick={()=>{this.handleClick(type,true)}}
	    		>
	    			<Icon name="dropdown" />
	    			{'Ask a Question'}
	    		</Accordion.Title>
	    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
	    		<Button.Group vertical basic fluid>
		        <Button onClick={()=>{this.setState({mvvMood:'Ind',mvvType:'qaa'},()=>{this.menuSelect('mvinsertqaa',-1)})}}>yes or no question...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg0'},()=>{this.menuSelect('questionInsert',-1)})}}>who is (subject)...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg1'},()=>{this.menuSelect('questionInsert',-1)})}}>to whom (object)...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg2'},()=>{this.menuSelect('questionInsert',-1)})}}>what is (subject)...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg3'},()=>{this.menuSelect('questionInsert',-1)})}}>to what (object)...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg4'},()=>{this.menuSelect('questionInsert',-1)})}}>when did...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg5'},()=>{this.menuSelect('questionInsert',-1)})}}>when will...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg6'},()=>{this.menuSelect('questionInsert',-1)})}}>where is...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg7'},()=>{this.menuSelect('questionInsert',-1)})}}>from where is...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg8'},()=>{this.menuSelect('questionInsert',-1)})}}>to where is...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'Intrg9'},()=>{this.menuSelect('questionInsert',-1)})}}>why is...?</Button>
		        <Button onClick={()=>{this.setState({mvvType:'IntrgA'},()=>{this.menuSelect('questionInsert',-1)})}}>how is...?</Button>
	    		</Button.Group>
	    		</Accordion.Content>
	    </Accordion>				
		} else if (type==='addCommand') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
	    		<Accordion.Title
	    			id={type}
	    			active={this.state.activeIndexes.includes(type)}
            onClick={()=>{this.handleClick(type,true)}}
	    		>
	    			<Icon name="dropdown" />
	    			{'Make a Command'}
	    		</Accordion.Title>
	    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
	    		<Button.Group vertical basic fluid>
	        <Button onClick={()=>{this.setState({optCase:'Opt][PRS',mvvType:''},()=>{this.menuSelect('commandInsert',-1)})}}>command right now</Button>
	        <Button onClick={()=>{this.setState({optCase:'Opt][FUT',mvvType:''},()=>{this.menuSelect('commandInsert',-1)})}}>command in future</Button>
	        <Button onClick={()=>{this.setState({optCase:'Opt][PRS][NEG',mvvType:''},()=>{this.menuSelect('commandInsert',-1)})}}>do not ...</Button>
	        <Button onClick={()=>{this.setState({optCase:'Opt][FUT][NEG',mvvType:''},()=>{this.menuSelect('commandInsert',-1)})}}>do not ... (future)</Button>
	        <Button onClick={()=>{this.setState({optCase:'Sbrd',mvvType:''},()=>{this.menuSelect('commandInsert',-1)})}}>polite request</Button>
	        <Button onClick={()=>{this.setState({optCase:'Sbrd',mvvType:'neg'},()=>{this.menuSelect('commandInsert',-1)})}}>polite do not...</Button>
	    		</Button.Group>
	    		</Accordion.Content>
	    </Accordion>				
		} else if (type==='nounPhrase') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
	    		<Accordion.Title
	    			id={type}
	    			active={this.state.activeIndexes.includes(type)}
            onClick={()=>{this.handleClick(type,true)}}
	    		>
	    			<Icon name="dropdown" />
	    			{'Make a noun phrase'}
	    		</Accordion.Title>
	    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
	    		<Button.Group vertical basic fluid>
	        <Button onClick={()=>{this.setState({npCase:'Abs',npCaseType:''},()=>{this.menuSelect('nPhraseInsert',-1)})}}>the...</Button>
	        <Button onClick={()=>{this.setState({npCase:'Abl_Mod',npCaseType:'from'},()=>{this.menuSelect('nPhraseInsert',-1)})}}>from...</Button>
	        <Button onClick={()=>{this.setState({npCase:'Abl_Mod',npCaseType:'io'},()=>{this.menuSelect('nPhraseInsert',-1)})}}>a or some...</Button>
	        <Button onClick={()=>{this.setState({npCase:'Loc',npCaseType:''},()=>{this.menuSelect('nPhraseInsert',-1)})}}>in, at...</Button>
	        <Button onClick={()=>{this.setState({npCase:'Ter',npCaseType:''},()=>{this.menuSelect('nPhraseInsert',-1)})}}>toward...</Button>
	        <Button onClick={()=>{this.setState({npCase:'Via',npCaseType:''},()=>{this.menuSelect('nPhraseInsert',-1)})}}>through, using...</Button>
	        <Button onClick={()=>{this.setState({npCase:'Equ',npCaseType:''},()=>{this.menuSelect('nPhraseInsert',-1)})}}>like, similar to...</Button>
	    		</Button.Group>
	    		</Accordion.Content>
	    </Accordion>				
		} else if (type==='addnOblique') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
	    		<Accordion.Title
	    			id={type}
	    			style={{paddingBottom:'2px'}}
	    			active={this.state.activeIndexes.includes(type)}
            onClick={()=>{this.handleClick(type,true)}}
	    		>
	    			<Icon name="dropdown" />
	    			{'Add location, direction, etc.'}
	    		</Accordion.Title>
	    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
	    		<Button.Group vertical basic fluid>
		        <Button onClick={()=>{this.setState({npCase:'Loc',npCaseType:''},()=>{this.menuSelect('nObliqueInsert',-1)})}}>in or at the...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Ter',npCaseType:''},()=>{this.menuSelect('nObliqueInsert',-1)})}}>toward the...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Abl_Mod',npCaseType:'from'},()=>{this.menuSelect('nObliqueInsert',-1)})}}>from the...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Via',npCaseType:''},()=>{this.menuSelect('nObliqueInsert',-1)})}}>through, using...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Equ',npCaseType:''},()=>{this.menuSelect('nObliqueInsert',-1)})}}>like a...</Button>
	    		</Button.Group>
	    		</Accordion.Content>
	    </Accordion>			
		} else if (type==='caddnOblique') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
	    		<Accordion.Title
	    			id={type}
	    			style={{paddingBottom:'2px'}}
	    			active={this.state.activeIndexes.includes(type)}
            onClick={()=>{this.handleClick(type,true)}}
	    		>
	    			<Icon name="dropdown" />
	    			{'Add location, direction, etc.'}
	    		</Accordion.Title>
	    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
	    		<Button.Group vertical basic fluid>
		        <Button onClick={()=>{this.setState({npCase:'Loc',npCaseType:''},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>in or at the...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Ter',npCaseType:''},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>toward the...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Abl_Mod',npCaseType:'from'},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>from the...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Via',npCaseType:''},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>through, using...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Equ',npCaseType:''},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>like a...</Button>
	    		</Button.Group>
	    		</Accordion.Content>
	    </Accordion>	
		} else if (type==='saddnOblique') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
	    		<Accordion.Title
	    			id={type}
	    			style={{paddingBottom:'2px'}}
	    			active={this.state.activeIndexes.includes(type)}
            onClick={()=>{this.handleClick(type,true)}}
	    		>
	    			<Icon name="dropdown" />
	    			{'Add location, direction, etc.'}
	    		</Accordion.Title>
	    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
	    		<Button.Group vertical basic fluid>
		        <Button onClick={()=>{this.setState({npCase:'Loc',npCaseType:''},()=>{this.menuSelect('snObliqueInsert',-1)})}}>in or at the...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Ter',npCaseType:''},()=>{this.menuSelect('snObliqueInsert',-1)})}}>toward the...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Abl_Mod',npCaseType:'from'},()=>{this.menuSelect('snObliqueInsert',-1)})}}>from the...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Via',npCaseType:''},()=>{this.menuSelect('snObliqueInsert',-1)})}}>through, using...</Button>
		        <Button onClick={()=>{this.setState({npCase:'Equ',npCaseType:''},()=>{this.menuSelect('snObliqueInsert',-1)})}}>like a...</Button>
	    		</Button.Group>
	    		</Accordion.Content>
	    </Accordion>		
		} else if (type==='addSV') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
		    		<Accordion.Title
		    			id={type}
	    				style={{paddingBottom:'2px'}}
		    			active={this.state.activeIndexes.includes(type)}
	            onClick={()=>{this.handleClick(type,true)}}
		    		>
		    			<Icon name="dropdown" />
		    			{'Add Subordinative Verb'}
		    		</Accordion.Title>
		    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
		    		<Button.Group vertical basic fluid>
			        <Button onClick={()=>{this.setState({svvType:'by'},()=>{this.menuSelect('svinsert',-1)})}}>by...</Button>
			        <Button onClick={()=>{this.setState({svvType:'being'},()=>{this.menuSelect('svinsert',-1)})}}>being...</Button>
		    		</Button.Group>
		    		</Accordion.Content>
	    		</Accordion>		
		} else if (type==='changeCVtype') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
		    		<Accordion.Title
		    			id={type}
		    			active={true}
		    		>
		    			<Icon name="dropdown" />
		    			{'Change Connective Verb Phrase'}
		    		</Accordion.Title>
		    		<Accordion.Content active={true}>
		    		<Button.Group vertical basic fluid>
	        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',cvvMood:'Prec',cvvType:'',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>before...</Button>
	        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',cvvMood:'Cnsq',cvvType:'',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>because...</Button>
	        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',cvvMood:'Cont',cvvType:'',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>whenever...</Button>
	        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',cvvMood:'Conc',cvvType:'eventhough',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood,'eventhough']]])})}}>even though...</Button>
	        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',cvvMood:'Conc',cvvType:'evenif',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood,'evenif']]])})}}>even if...</Button>
	        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',cvvMood:'Cond',cvvType:'if',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood,'if']]])})}}>if...</Button>
	        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',cvvMood:'Cond',cvvType:'wheninthefuture',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood,'wheninthefuture']]])})}}>when (in future)...</Button>
	        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',cvvMood:'CtmpI',cvvType:'',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>when (in past)...</Button>
	        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',cvvMood:'CtmpII',cvvType:'',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>while...</Button>
		    		</Button.Group>
		    		</Accordion.Content>
	    		</Accordion>			
		} else if (type==='changeQuestiontype') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
	    		<Accordion.Title
	    			id={type}
	    			style={{paddingBottom:'2px'}}
		    		active={true}
	    		>
		    			<Icon name="dropdown" />
		    			{'Change Question Type'}
		    		</Accordion.Title>
		    		<Accordion.Content active={true}>
		    		<Button.Group vertical basic fluid>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Ind',mvvType:'qaa',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Ind'],["Update",["mv","vType"],'qaa']])})}}>(yes or no question)?</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg0',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg0']])})}}>who is (subject)...?</Button>
			        {this.state.mvvBase[1] != 'i' ?
			        	<Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg1',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg1']])})}}>to whom (object)...?</Button>
			        	:
			        	null
			        }
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg2',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg2']])})}}>what is (subject)...?</Button>
			        {this.state.mvvBase[1] != 'i' ?
			        	<Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg3',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg3']])})}}>to what (object)...?</Button>
			        	:
			        	null
			        }
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg4',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg4']])})}}>when did...?</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg5',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg5']])})}}>when will...?</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg6',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg6']])})}}>where is...?</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg7',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg7']])})}}>from where is...?</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg8',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg8']])})}}>to where is...?</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'Intrg9',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'Intrg9']])})}}>why is...?</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',mvvMood:'Intrg',mvvType:'IntrgA',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Intrg'],["Update",["mv","vType"],'IntrgA']])})}}>how is...?</Button>
		    		</Button.Group>
		    		</Accordion.Content>
	    		</Accordion>				
		} else if (type == 'switchOptative') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
		    		<Accordion.Title
		    			id={type}
		    			active={this.state.activeIndexes.includes(type)}
	            onClick={()=>{this.handleClick(type,true)}}
		    		>
		    			<Icon name="dropdown" />
		    			{'Change Command Type'}
		    		</Accordion.Title>
		    		<Accordion.Content active={this.state.activeIndexes.includes(type)}>
		    		<Button.Group vertical basic fluid>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',optCase:'Opt][PRS',mvvType:'',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Opt][PRS']])})}}>command right now</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',optCase:'Opt][FUT',mvvType:'',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Opt][FUT']])})}}>command in future</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',optCase:'Opt][PRS][NEG',mvvType:'',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Opt][PRS][NEG']])})}}>do not ...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',optCase:'Opt][FUT][NEG',mvvType:'',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Opt][FUT][NEG']])})}}>do not ... (future)</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',optCase:'Sbrd',mvvType:'',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Sbrd']])})}}>polite request</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',optCase:'Sbrd',mvvType:'neg',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Sbrd'],["Insert",["mv"],[this.state.candidateCall[0].concat([['+peke-|+vke-,+pege-|+vke-', 0, 0, 0]]),this.state.candidateCall[1],'Sbrd']]])})}}>polite do not...</Button>
		    		</Button.Group>
		    		</Accordion.Content>
	    		</Accordion>		
		} else if (type == 'changeNPtype') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
		    		<Accordion.Title
		    			id={type}
		    			active={true}
		    			// style={{paddingBottom:'2px'}}
		    			// active={this.state.activeIndexes.includes(type)}
	            // onClick={()=>{this.handleClick(type,true)}}
		    		>
		    			<Icon name="dropdown" />
		    			{'Change Noun Phrase Type'}
		    		</Accordion.Title>
		    		<Accordion.Content active={true}>
		    		<Button.Group vertical basic fluid>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',npCase:'Abs',npCaseType:'',npnType:'',isOpen:false},()=>{this.backEndCall([["Update",["np","nCase"],'Abs']])})}}>the...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',npCase:'Rel',npCaseType:'',npnType:'',isOpen:false},()=>{this.backEndCall([["Update",["np","nCase"],'Rel']])})}}>the (relative)...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',npCase:'Abl_Mod',npCaseType:'from',npnType:'',isOpen:false},()=>{this.backEndCall([["Update",["np","nCase"],'Abl_Mod'],["Update",["np","nType"],'from']])})}}>from...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',npCase:'Abl_Mod',npCaseType:'io',npnType:'',isOpen:false},()=>{this.backEndCall([["Update",["np","nCase"],'Abl_Mod'],["Update",["np","nType"],'io']])})}}>a or some...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',npCase:'Loc',npCaseType:'',npnType:'',isOpen:false},()=>{this.backEndCall([["Update",["np","nCase"],'Loc']])})}}>in or at...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',npCase:'Ter',npCaseType:'',npnType:'',isOpen:false},()=>{this.backEndCall([["Update",["np","nCase"],'Ter']])})}}>toward...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',npCase:'Via',npCaseType:'',npnType:'',isOpen:false},()=>{this.backEndCall([["Update",["np","nCase"],'Via']])})}}>through, using...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:'',npCase:'Equ',npCaseType:'',npnType:'',isOpen:false},()=>{this.backEndCall([["Update",["np","nCase"],'Equ']])})}}>like, similar to...</Button>
		    		</Button.Group>
		    		</Accordion.Content>
	    		</Accordion>		
		} else if (type == 'changeVObliquetype') {
	    return <Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
		    		<Accordion.Title
		    			id={type}
		    			active={true}
		    		>
		    			<Icon name="dropdown" />
		    			{'Change Noun Type'}
		    		</Accordion.Title>
		    		<Accordion.Content active={true}>
		    		<Button.Group vertical basic fluid>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:''},()=>{this.backEndCall([["Update",[ind1,"nObliques",ind2,'nCase'],'Abl_Mod'],["Update",[ind1,"nObliques",ind2,'nType'],'from']])})}}>from...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:''},()=>{this.backEndCall([["Update",[ind1,"nObliques",ind2,'nCase'],'Abl_Mod'],["Update",[ind1,"nObliques",ind2,'nType'],'io']])})}}>a or some...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:''},()=>{this.backEndCall([["Update",[ind1,"nObliques",ind2,'nCase'],'Loc']])})}}>in or at...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:''},()=>{this.backEndCall([["Update",[ind1,"nObliques",ind2,'nCase'],'Ter']])})}}>toward...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:''},()=>{this.backEndCall([["Update",[ind1,"nObliques",ind2,'nCase'],'Via']])})}}>through, using...</Button>
			        <Button onClick={()=>{this.editMenuRef[this.state.currentlyOpen].close(); this.setState({currentlyOpen:''},()=>{this.backEndCall([["Update",[ind1,"nObliques",ind2,'nCase'],'Equ']])})}}>like, similar to...</Button>
		    		</Button.Group>
		    		</Accordion.Content>
	    		</Accordion>		
		}

	}

// "[Abl_Mod]":"Ablative-Modalis (indirect object, from...)",
// "[Loc]":"Localis (in, at...)",
// "[Ter]":"Terminalis (toward...)",
// "[Via]":"Vialis (through, using...)",
// "[Equ]":"Equalis (like, similar to...)",

	menuItem=(type,text,endRequirement,mood,backEnd)=>{

		if (type === 'UpdateConnective') {
			return <Menu.Item
		          name='messages'
		          // active={this.state.activeItem === 'messages'}
		          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
							onClick={()=>{this.setState({ isOpen: false },()=>{this.backEndCall(backEnd)})}}
		        >
		          <div>{text}</div>
		        </Menu.Item>			
		}

		if (type === 'Update') {
			return <Menu.Item
		          name='messages'
		          // active={this.state.activeItem === 'messages'}
		          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
							onClick={()=>{this.setState({ isOpen: false },()=>{this.backEndCall(backEnd)})}}
		        >
		          <div>{text}</div>
		        </Menu.Item>			
		}

		if (type === 'Delete') {
			return <Menu.Item
		          name='messages'
		          // active={this.state.activeItem === 'messages'}
		          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
							onClick={()=>{this.setState({ isOpen: false },()=>{this.backEndCall(backEnd)})}}
		        >
		          <div>{text}</div>
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
		        </Menu.Item>			
		}
		if (type === 'BaseChooser') {
			return <Menu.Item
		          name='messages'
		          // active={this.state.activeItem === 'messages'}
		          style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
		          onClick={()=>{this.menuSelect(endRequirement)}}
		          // onClose={()=>{this.setState({searchQuery:'',wordsList:[]})}}
		        >
		          <div>{text}</div>
		        </Menu.Item>			
		}


	}

	updateCandidateCall=(type,update,mood,submood,pos)=>{

		// console.log(type, update, mood, submood,this.state.candidateBase)

		let lockSubmit = false
		let candidateFST = []
		let transitivity = ''
		let containsTime = false

		this.state.candidateBase.slice().reverse().map((x,xind)=>{
			if (Array.isArray(x)) {
				if (['-llru¹-','-ksaite-','+ciqe-|@ciiqe-','@~+ngaite-','@~+niarar-','-qatar-'].includes(x[0][0])) {
					containsTime = true
				}				
			}
			if (xind === 0) {
				if (!Array.isArray(x)) {
					lockSubmit = true
					transitivity = x['type']
					if (transitivity == 'n' && type == 'v') {
						transitivity = 'i'
					}			
					this.setState({endingAdjusted:''})
					candidateFST.push([x['key'],0,x['usageIndex'],0])
				} else {
					// console.log(x[1],!newpostbases[x[1]]['match_case'])
					if (!('post_verb' in newpostbases[x[1]])) {
						this.setState({addIs:false})
					}
					if (newpostbases[x[1]]['type'] == 'VN' || newpostbases[x[1]]['type'] == 'VV') {
						lockSubmit = false
						this.setState({endingAdjusted:'v'})
					} else {
						lockSubmit = false
						this.setState({endingAdjusted:'n'})
						this.setState({nounNum:newpostbases[x[1]]['nounNum']})			
					}
					candidateFST.push([x[0][0],0,x[0][1],0])
				}
			}	else {
				if (!Array.isArray(x)) {
					candidateFST.push([x['key'],0,x['usageIndex'],0])
				} else {
					candidateFST.push([x[0][0],0,x[0][1],0])
				}
			}		
			
		})

		this.setState({containsTime:containsTime})

		if (this.state.candidateBase.length === 0) {
			this.setState({endingAdjusted:''})
		}
		// candidateFST = [candidateFST]
		// console.log(candidateFST, transitivity)

		if (update==='insert') {
			if (type === 'n') {
				if (mood === undefined) {
			  	this.setState({
			  		candidateCall:[candidateFST,[0,0,0,1]],
			  		lockSubmit:lockSubmit,
			  	})							
				} else {
			  	this.setState({
			  		candidateCall:[candidateFST,[0,0,0,1],mood,submood],
			  		lockSubmit:lockSubmit,
			  	})		
				}

			} else if (type === 'v') {
				if (mood === 'Ind') {
			  	this.setState({
			  		candidateCall:[candidateFST,transitivity,mood],
			  		lockSubmit:lockSubmit,
			  	})							
				} else if (mood ==='Intrg') {
			  	this.setState({
			  		candidateCall:[candidateFST,transitivity,mood,submood],
			  		lockSubmit:lockSubmit,
			  	})	
				} else {
			  	this.setState({
			  		candidateCall:[candidateFST,transitivity,mood,submood],
			  		lockSubmit:lockSubmit,
			  	})											
				}

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
	

		}	else if (update==='updatebase') {
			if (type === 'n') {
		  	this.setState({
		  		candidateCall:candidateFST,
		  		lockSubmit:lockSubmit,
		  	})			
			}
		}
	
	}


	processStyledMainText = (key,forEnglish, verbtype, mood) => {
		// console.log(key,this.state.startingCase,this.state.mvvs,this.state.mvvsPlanned,this.state.nextTenses)
		let verbAdd = ''
		let sentence = key['englishmain']	
		let startingCase = ''
		let vsPlanned = []
		if (forEnglish !== undefined) {
			startingCase = forEnglish[0]
			vsPlanned = forEnglish[1]
		}


		// if (mood === 'mv') {console.log(key, mood, forEnglish, startingCase, vsPlanned)}

		// console.log(key, forEnglish, startingCase)

		if (key['type'] == 'n') {
			sentence = key['base_case']
			// sentence = key['englishraw']
			// let verbMatches = key['englishraw'].match(/\⟨.*?\⟩/g)
			// if (this.state.nounNum == 'p') {
			// 	verbAdd = key['englishtenses'][this.state.nounIndexChosen][1]
			// } else {
			// 	verbAdd = key['englishtenses'][this.state.nounIndexChosen][0]
			// }
			
			// if (verbMatches !== null) {
			// 	verbMatches.map((m) => sentence = sentence.replace(m,verbAdd))	
			// }
		} else {
			sentence = key['englishmain']	
			if (this.state.nextTenses.length > 0) {
				if ((this.state.addIs && key['englishtenses'][2]=='is') || this.state.nextTenses[this.state.nextTenses.length-1] === 'gen') {
					if (this.state.nextTenses[this.state.nextTenses.length-1] === 'p' || this.state.nextTenses[this.state.nextTenses.length-1] === 'pp') {
						if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
							sentence = sentence.replace('!is!','was')
						} else if ((this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) || this.state.mvvs.length === 0) {
							sentence = sentence.replace('!is!','was')
						} else {
							sentence = sentence.replace('!is!','were')
						}
					} else {
						if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
							sentence = sentence.replace('!is!','am')
						} else if ((this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) || this.state.mvvs.length === 0) {
							sentence = sentence.replace('!is!','is')
						} else {
							sentence = sentence.replace('!is!','are')
						}
					}
				} else {
					// console.log(this.state.nextTenses[this.state.nextTenses.length-1], key['englishtenses'], key['englishraw'])
					if (this.state.nextTenses[this.state.nextTenses.length-1] === 'p') {
						verbAdd = key['englishtenses'][1]
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'g') {
						verbAdd = key['englishtenses'][3]
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'i') {
						verbAdd = key['englishtenses'][0]
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'pp') {
						verbAdd = key['englishtenses'][4]
					}	else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'past') {
						verbAdd = key['englishtenses'][1]
					}	else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'present') {
						verbAdd = key['englishtenses'][2]
					}		
					sentence = key['englishraw']
					let verbMatches = key['englishraw'].match(/\⟨.*?\⟩/g)
					if (verbMatches !== null) {
						verbMatches.map((m) => sentence = sentence.replace(m,verbAdd))	
					}						
				}
			} else {
				if (startingCase.length > 0) {
					if (startingCase === 'p') {
						verbAdd = key['englishtenses'][1]
					} else if (startingCase === 'g') {
						verbAdd = key['englishtenses'][3]
					} else if (startingCase === 'i') {
						verbAdd = key['englishtenses'][0]
					} else if (startingCase === 'pp') {
						verbAdd = key['englishtenses'][4]
					} else if (startingCase === 'gen') {
						verbAdd = key['englishtenses'][2]
					} else if (startingCase === 'past') {
						verbAdd = key['englishtenses'][1]
					}	else if (startingCase === 'present') {
						verbAdd = key['englishtenses'][2]
					}		
					sentence = key['englishraw']
					let verbMatches = key['englishraw'].match(/\⟨.*?\⟩/g)
					if (verbMatches !== null) {
						verbMatches.map((m) => sentence = sentence.replace(m,verbAdd))	
					}	
					sentence = sentence.replace('!is!','')
				} else {

					let specialStartingCase = this.returnBaseCaseforMoods(verbtype,mood,vsPlanned)
					// console.log(key,specialStartingCase)
					let s0 = specialStartingCase[0]
					let s1 = specialStartingCase[1]
					if (s0 === 'main') {
						sentence = key['englishmain'].replace('!is!',s1)	
					} else if (key['englishtenses'][0]=='be' && s1.length > 0) {
						sentence = key['englishmain'].replace('!is!',s1)	
					} else {
						if (s0 === 'p') {
							verbAdd = key['englishtenses'][1]
						} else if (s0 === 'g') {
							verbAdd = key['englishtenses'][3]
						} else if (s0 === 'i') {
							verbAdd = key['englishtenses'][0]
						} else if (s0 === 'pp') {
							verbAdd = key['englishtenses'][4]
						} else if (s0 === 'gen') {
							verbAdd = key['englishtenses'][2]
						} else if (s0 === 'past') {
							verbAdd = key['englishtenses'][1]
						}	else if (s0 === 'present') {
							verbAdd = key['englishtenses'][2]
						}		
						sentence = key['englishraw']
						let verbMatches = key['englishraw'].match(/\⟨.*?\⟩/g)
						if (verbMatches !== null) {
							verbMatches.map((m) => sentence = sentence.replace(m,verbAdd))	
						}						
					}

					// if (key['englishtenses'][0]==='be') {
					// 	sentence = sentence.replace('!is!',s1[1])	
					// } else {
					// 	sentence = sentence.replace('!is!',s1[0])	
					// }
					// if (this.state.mvvs.length > 0) {
					// 	if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
					// 		sentence = sentence.replace('!is!','am')
					// 	} else if ((this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) || this.state.mvvs.length === 0) {
					// 		sentence = sentence.replace('!is!','is')
					// 	} else {
					// 		sentence = sentence.replace('!is!','are')
					// 	}						
					// } else {
					// 	if (mvvsPlanned[0] == 1 && mvvsPlanned[1] == 1)	{
					// 		sentence = sentence.replace('!is!','am')
					// 	} else if ((mvvsPlanned[0] == 3 && mvvsPlanned[1] == 1) || mvvsPlanned.length === 0) {
					// 		sentence = sentence.replace('!is!','is')
					// 	} else {
					// 		sentence = sentence.replace('!is!','are')
					// 	}
					// }
				}
			}
		}

		sentence = this.returnPossessor(sentence, forEnglish, vsPlanned)


		let matches = sentence.match(/\<.*?\>/g)
		if (matches !== null) {
			matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))		
			return <span dangerouslySetInnerHTML={{__html: sentence.replace("⟨","").replace("⟩","")}} />		
		} else {
			return <span>{sentence.replace("⟨","").replace("⟩","")}</span>
		}
	}



	processStyledPostbaseText = (key,i,forEnglish, verbtype, mood) => {
		// console.log(mood)
		let lookup;
		let vsPlanned = []
		if (forEnglish !== undefined) {
			vsPlanned = forEnglish[1]
		}
		if (i === '1') {
			lookup = key['expression']
		} else if (i === '2') {
			lookup = key
		}
		if (lookup in newpostbases) {
			let sentence = ''
			// console.log(sentence)

			if (newpostbases[lookup]['type'] === 'VV') {
				if (!newpostbases[lookup]['is'] && !newpostbases[lookup]['has']) {
					if (vsPlanned[0] == 3 && vsPlanned[1] == 1 || this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) {
						sentence = newpostbases[lookup]['description']
					} else {
						if ('inf_preverb' in newpostbases[lookup]) {
							sentence = newpostbases[lookup]['inf_preverb']						
						} else {
							sentence = newpostbases[lookup]['description']
						}
					}
				} else {
					sentence = newpostbases[lookup]['description']
				}

				if (key['id'] == 5) {
					sentence = '<past tense>'
				} else {
					// console.log(this.state.nextTenses[this.state.nextTenses.length-1])
					if (!newpostbases[lookup]['match_case']) {
						if (this.state.nextTenses.length === 0) {
							let specialStartingCase = this.returnBaseCaseforMoods(verbtype,mood,vsPlanned)
							// console.log(key)
							// console.log(newpostbases[lookup], specialStartingCase)
							let s0 = specialStartingCase[0]
							let s1 = specialStartingCase[1]
							if (s0 === 'main' || s1.length > 0) {
								sentence = newpostbases[lookup]['gen_preverb']
								if (newpostbases[lookup]['is']) {
									sentence = s1 +' '+ sentence
								} else if (newpostbases[lookup]['has']) {
									if (vsPlanned[0] == 3 && vsPlanned[1] == 1) {
										sentence = 'has ' + sentence
									} else {
										sentence = 'have ' + sentence
									}
								}
							} else {
								if (s0 === 'p') {
									if (newpostbases[lookup]['was']) {
										sentence = s1+' (was) '+newpostbases[lookup]['gen_preverb']
									} else {
										sentence = newpostbases[lookup]['past_preverb']
									}
								} else if (s0 === 'g') {
									sentence = newpostbases[lookup]['ger_preverb']
								} else if (s0 === 'i') {
									sentence = newpostbases[lookup]['inf_preverb']
								} else if (s0 === 'pp') {
									sentence = newpostbases[lookup]['past_preverb']
								} else if (s0 === 'gen') {
									sentence = s1+' '+newpostbases[lookup]['gen_preverb']
								} else if (s0 === 'past') {
									if (newpostbases[lookup]['was']) {
										sentence = s1+' (was) '+newpostbases[lookup]['gen_preverb']
									} else {
										sentence = newpostbases[lookup]['past_preverb']
									}
								}	else if (s0 === 'present') {
									sentence = newpostbases[lookup]['gen_preverb']
								} else {
									sentence = newpostbases[lookup]['gen_preverb']									
								}
							}
						} else {
							if (this.state.nextTenses[this.state.nextTenses.length-1] === 'p' || this.state.nextTenses[this.state.nextTenses.length-1] === 'pp' || this.state.nextTenses[this.state.nextTenses.length-1] === 'past') {
								if (newpostbases[lookup]['past_preverb'].length == 0 && newpostbases[lookup]['was']) {
									sentence = newpostbases[lookup]['description']						
									if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
										sentence = 'was '+sentence
									} else if ((this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) || this.state.mvvs.length === 0) {
										if (vsPlanned[1] !== 1) {
											sentence = 'were '+sentence							
										} else {
											sentence = 'was '+sentence														
										}
									} else {
										sentence = 'were '+sentence
									}  
								} else {
									sentence = newpostbases[lookup]['past_preverb']						
								}
							} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'g') {
								sentence = newpostbases[lookup]['ger_preverb']
							} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'gen') {
								sentence = newpostbases[lookup]['gen_preverb']
							} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'i') {
								sentence = newpostbases[lookup]['inf_preverb']
							}	else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'past') {
								sentence = newpostbases[lookup]['past_preverb']
							} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'present') {
								sentence = newpostbases[lookup]['gen_preverb']
							}
						}
					}				
				}
			} else if (newpostbases[lookup]['type'] === 'NV') {
				sentence = newpostbases[lookup]['gen_prenoun']
				if (!newpostbases[lookup]['match_case']) {
					if (this.state.nextTenses[this.state.nextTenses.length-1] === 'p') {
						if (newpostbases[lookup]['past'].length == 0 && newpostbases[lookup]['was']) {
							sentence = newpostbases[lookup]['gen_prenoun']						
							if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
								sentence = 'was '+sentence
							} else if ((this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) || this.state.mvvs.length === 0) {
								if (vsPlanned[1] !== 1) {
									sentence = 'were '+sentence							
								} else {
									sentence = 'was '+sentence														
								}
							} else {
								sentence = 'were '+sentence
							}  
						} else {
							sentence = newpostbases[lookup]['past']						
						}
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'g') {
						sentence = newpostbases[lookup]['ger_prenoun']
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'gen') {
						sentence = newpostbases[lookup]['gen_prenoun']
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'i') {
						sentence = newpostbases[lookup]['inf_prenoun']
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'pp') {
						sentence = newpostbases[lookup]['past']
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'past') {
						sentence = newpostbases[lookup]['past']
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'present') {
						sentence = newpostbases[lookup]['present']
					}
				}				
			} else if (newpostbases[lookup]['type'] === 'NN') {
					if (this.state.nounNum == 'p') {
						sentence = newpostbases[lookup]['pluralDefinition']
					} else {
						sentence = newpostbases[lookup]['singularDefinition']
					}
			} else if (newpostbases[lookup]['type'] === 'VN') {
					if (this.state.nounNum == 'p') {
						sentence = newpostbases[lookup]['pluralDefinition']
					} else {
						sentence = newpostbases[lookup]['singularDefinition']
					}
			}

			// console.log(sentence)



	  	// if (newpostbases[lookup]['is'] && this.state.addIs) {
	  	// 	// if (this.state.nextTenses[this.state.nextTenses.length-1] === 'pp' || this.state.nextTenses[this.state.nextTenses.length-1] === 'p') {
				// 	// if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
				// 	// 	sentence = 'was '+sentence
				// 	// } else if (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) {
				// 	// 	sentence = 'was '+sentence
				// 	// } else {
				// 	// 	sentence = 'were '+sentence
				// 	// }  
	  	// 	// } else {

				// 	// if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
				// 	// 	sentence = 'am '+sentence
				// 	// } else if ((this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1) || this.state.mvvs.length === 0) {
				// 	// 	if (mvvsPlanned[1] !== 1) {
				// 	// 		sentence = 'are '+sentence							
				// 	// 	} else {
				// 	// 		sentence = 'is '+sentence														
				// 	// 	}
				// 	// } else {
				// 	// 	sentence = 'are '+sentence
				// 	// }  	  			

				// 	if (mvvsPlanned[0] == 1 && mvvsPlanned[1] == 1)	{
				// 		sentence = 'am '+sentence							
				// 	} else if (mvvsPlanned.length === 0 || (mvvsPlanned[0] == 3 && mvvsPlanned[1] == 1)) {
				// 		sentence = 'is '+sentence														
				// 	} else {
				// 		sentence = 'are '+sentence							
				// 	}		

	  	// 	// }
				// // this.setState({addIs:false})
	  	// }

	  	// if (newpostbases[lookup]['has'] && this.state.addIs) {
	  	// 	if (this.state.nextTenses[this.state.nextTenses.length-1] === 'pp' || this.state.nextTenses[this.state.nextTenses.length-1] === 'p') {
	  	// 		sentence = 'had '+sentence
	  	// 	} else {
				// 	if (mvvsPlanned[0] == 1 && mvvsPlanned[1] == 1)	{
				// 		sentence = 'have '+sentence							
				// 	} else if (mvvsPlanned.length === 0 || (mvvsPlanned[0] == 3 && mvvsPlanned[1] == 1)) {
				// 		sentence = 'has '+sentence														
				// 	} else {
				// 		sentence = 'have '+sentence							
				// 	}		  			
	  	// 	}
				// // this.setState({addIs:false})
	  	// }


			sentence = this.returnPossessor(sentence, forEnglish, vsPlanned)


			let matches = sentence.match(/\<.*?\>/g)
			if (matches !== null) {
				matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))		
				return <span dangerouslySetInnerHTML={{__html: sentence.replace("⟨","").replace("⟩","")}} />		
			} else {
				return <span>{sentence.replace("⟨","").replace("⟩","")}</span>
			}

			


		} else {
			console.log('not in',lookup)
			return <span>{'not in lookup'}</span>
		}
	}

	returnPossessor = (sentence, forEnglish, vsPlanned) => {
		let mvvs = this.state.mvvs
		if (vsPlanned.length > 0 && mvvs.length == 0) {
			mvvs = vsPlanned
		}
		if (sentence.includes('^his^')) {
			return sentence.replace('^his^',npnEnglish[mvvs.join("")])
		} else if (sentence.includes('^its^')) {
			return sentence.replace('^its^',npnEnglish[mvvs.join("")])
		} else if (sentence.includes('^himself^')) {
			return sentence.replace('^herself^',npnEnglishself[mvvs.join("")])
		} else if (sentence.includes('^herself^')) {
			return sentence.replace('^herself^',npnEnglishself[mvvs.join("")])
		} else if (sentence.includes('^itself^')) {
			return sentence.replace('^itself^',npnEnglishself[mvvs.join("")])
		} else if (sentence.includes('^he^')) {
			return sentence.replace('^he^',mvSubjectOptionsEnglish[mvvs.join("")])
		} else if (sentence.includes('^she^')) {
			return sentence.replace('^she^',mvSubjectOptionsEnglish[mvvs.join("")])
		} else if (sentence.includes('^it^')) {
			return sentence.replace('^it^',mvObjectOptionsEnglish[mvvs.join("")])
		} else if (sentence.includes('^him^')) {
			return sentence.replace('^him^',mvObjectOptionsEnglish[mvvs.join("")])
		} else {			
			return sentence
		}
	}



	returnBaseChooserTitle = (itemUpdating,endingNeeded,mood,submood,forEnglish) => {
		let subject = '';
		if (forEnglish === undefined) {
			forEnglish = ['',[]]
		}
		// console.log(itemUpdating,endingNeeded,mood,submood)
		// console.log(this.state.mvvsPlanned)

		// if (['mv','mvvBase'].includes(itemUpdating[1].join(""))) {
		// 	if (this.state.mvvs.length > 0) {
		// 		subject = mvSubjectOptionsEnglish[this.state.mvvs.join("")] + ' _____'
		// 	} else {
		// 		if (this.state.mvvsPlanned.length > 0) {
		// 			subject = mvSubjectOptionsEnglish[this.state.mvvsPlanned.join("")] + ' _____'
		// 		} else {
		// 			subject = 'he _____'					
		// 		}
		// 	}
		// } else if (['mvns'].includes(itemUpdating[1].join(""))) {
		// 	subject = 'the one _____ is'				
		// } else if (['mvno'].includes(itemUpdating[1].join(""))) {
		// 	subject = 'the one _____'				
		// }
		// } else if (itemUpdating[1][0]==='np') {
		// 	if (itemUpdating[1].length == 1) { //(['np'].includes(itemUpdating[1].join(""))) 
		// 		subject = 'the one'
		// 	} else if (itemUpdating[1].length == 3) { // add possessor or possessive ([npn-1','npn0'].includes(itemUpdating[1].join("")))
		// 		if (itemUpdating[1].join("") == 'npn-1') {
		// 			subject = "the one _____'s N"
		// 		} else {
		// 			subject = "N's one _____"
		// 		}
		// 	} else if (itemUpdating[1].length == 4) { 
		// 		if (itemUpdating[1][1] === 'nBases') { // update
		// 			if (itemUpdating[1][2] === this.state.npn.length-1) {
		// 				subject = npnEnglish[this.state.npn[itemUpdating[1][2]][0].slice(0, -1).join("")] + ' ' + npnEnglish[this.state.npn[itemUpdating[1][2]][0][3]]
		// 			} else {
		// 				subject = npnEnglish[this.state.npn[itemUpdating[1][2]][0][3]]
		// 			}
		// 		} else if (itemUpdating[1][1] === 'n') { // add descriptor
		// 			console.log(npnEnglish, this.state.npn, itemUpdating)
		// 			if (itemUpdating[1][2] === this.state.npn.length-1) {
		// 				subject = npnEnglish[this.state.npn[itemUpdating[1][2]][0].slice(0, -1).join("")] + ' ' + npnEnglish[this.state.npn[itemUpdating[1][2]][0][3]] + ' _____ N'
		// 			} else {
		// 				subject = npnEnglish[this.state.npn[itemUpdating[1][2]][0][3]] + ' _____ N'
		// 			}
		// 		}
		// 	}
		// }

		let starters = {
			'Abs':'[the one] _____',
			'Rel':'[the one] _____',
			'Loc':'in or at [the one] _____',
			'Ter':'toward [the one] _____',
			'from':'from [the one] _____',
			'io':'a _____',
			'Via':'through, using [a] _____',
			'Equ':'like [a] _____',

			'Prec':'before [] _____',
			'Cnsq':'because [] _____',
			'Cont':'whenever [] _____',
			'CtmpI':'when (in past) [] _____',
			'CtmpII':'while [] _____',
			'Conc':'even though [] _____',
			'evenif':'even if [] _____',
			'if':'if [] _____',
			'wheninthefuture':'when (in future) [] _____',

			'Intrg0':'who is [he] who _____?',
			'Intrg1':'[she] _____ whom (object)?',
			'Intrg2':'what is [it] that _____?',
			'Intrg3':'[he] _____ what (object)?',
			'Intrg4':'when did [she] _____?',
			'Intrg5':'when will [he] _____?',
			'Intrg6':'where is [it] _____?',
			'Intrg7':'from where is [he] _____?',
			'Intrg8':'to where is [she] _____?',
			'Intrg9':'why is [it] _____?',
			'IntrgA':'how is [he] _____?',

			'Opt][PRS':'[you], _____ (command)',
			'Opt][FUT':'[you], _____ (command in the future)',
			'Opt][PRS][NEG':'[you], do not _____',
			'Opt][FUT][NEG':'[you], do not _____ (future)',
			'Sbrd':'[you], ____ (polite request)',
			'neg':'[you], do not ____ (polite request)',

			'by':'by ____ ',
			'being':'being ____',

		}

		// console.log(subject, itemUpdating, mood,submood)
		// console.log(itemUpdating, mood,submood)
		// console.log(this.state)

		if (itemUpdating[0]==='Insert') {
			if (mood==='Ind') {
					if (forEnglish[1].length > 0) {
						subject = mvSubjectOptionsEnglish[forEnglish[1].join("")] + ' _____'
					} else {
						subject = 'he _____'					
					}	
			} else if (itemUpdating[1][0]==='cv') {
				if (submood != '') {
					if (submood in starters) {
						subject = starters[submood].replace('[]',mvSubjectOptionsEnglish[this.state.mvvs.join("")]).replace('[','').replace(']','') // if reflexive
					}
				} else {
					if (mood in starters) {
						subject = starters[mood].replace('[]',mvSubjectOptionsEnglish[this.state.mvvs.join("")]).replace('[','').replace(']','') // if reflexive
					}
				}			
			} else if (submood != '') {
				if (submood in starters) {
					subject = starters[submood].replace('[','').replace(']','')
				}
			} else {
				if (mood in starters) {
					subject = starters[mood].replace('[','').replace(']','')
				}
			}
		}

		if (submood === 'qaa') {
			subject = subject + '?'
		}
		return subject
	}

	returnBaseCaseforMoods = (verbtype,mood,vsPlanned) => {
		if (
				verbtype === 'mv' &&
				((
				mood === "Opt][PRS" || 
				mood === "Opt][FUT" || 
				mood === "Opt][PRS][NEG" || 
				mood === "Sbrd")
				 || (
				this.state.mvvMood === "Opt][PRS" || 
				this.state.mvvMood === "Opt][FUT" || 
				this.state.mvvMood === "Opt][PRS][NEG" || 
				this.state.mvvMood === "Sbrd")
				))
		{
			// return 'hunt, be happy, etc.'
			return ['i','']
		} else if (
			verbtype === 'cv' &&
			(this.state.cvvMood === "Prec" ||
			this.state.cvvMood === "Cond" ||
			this.state.cvvMood === "Cont")
			) 
		{ 
			if (vsPlanned.length === 0) {
				if (this.state.cvvs[0] == 1 && this.state.cvvs[1] == 1)	{
					// return 'hunt, am happy, etc.'
					return ['i','am']
				} else if (this.state.cvvs.length === 0 || (this.state.cvvs[0] == 3 && this.state.cvvs[1] == 1)) {
					// return 'hunts, is happy, etc.'
					return ['gen','is']
				} else {
					// return 'hunt, are happy, etc.'
					return ['i','are']
				}		
			} else {
				if (vsPlanned[0] == 1 && vsPlanned[1] == 1)	{
					// return 'hunt, am happy, etc.'
					return ['i','am']
				} else if (vsPlanned[0] == 3 && vsPlanned[1] == 1) {
					// return 'hunts, is happy, etc.'
					return ['gen','is']
				} else {
					// return 'hunt, are happy, etc.'
					return ['i','are']
				}		
			}
		} else if (
			verbtype === 'cv' && this.state.cvvMood === "Conc"
			) 
		{ 
			if (this.state.cvvs[0] == 1 && this.state.cvvs[1] == 1)	{
				// return 'am hunting, happy, etc.'
				return ['main','am']
			} else if (this.state.cvvs.length === 0 || (this.state.cvvs[0] == 3 && this.state.cvvs[1] == 1)) {
				return ['main','is']
			} else {
				return ['main','are']
			}		
		} else if (
			verbtype === 'cv' &&
			(this.state.cvvMood === "Cnsq" ||
			this.state.cvvMood === "CtmpI" ||
			this.state.cvvMood === "CtmpII")

			) 
		{
			if (this.state.cvvs[0] == 1 && this.state.cvvs[1] == 1)	{
				// return 'hunted, was happy, etc.'
				return ['p','']
			} else if (this.state.cvvs.length === 0 || (this.state.cvvs[0] == 3 && this.state.cvvs[1] == 1)) {
				return ['p','']
			} else {
				return ['p','']
			}		
		} else if (
			verbtype === 'mv' &&
			(this.state.mvvType === "Intrg4" ||
			this.state.mvvType === "Intrg5")
			) 
		{
			// return 'hunt, be happy, etc.'
			return ['i','']
		} else if (
			verbtype === 'mv' &&
			(this.state.mvvType === "Intrg6" ||
			this.state.mvvType === "Intrg7" ||
			this.state.mvvType === "Intrg8" ||
			this.state.mvvType === "Intrg9" ||
			this.state.mvvType === "IntrgA")
			) 
		{
			// return 'hunting, being happy, etc.'
			return ['g','']
		} else if (
			verbtype === 'sv' &&
			(this.state.svvType === "by" ||
			this.state.svvType === "being") 
			) 
		{
			return ['g','']
		} else {
			if (vsPlanned.length === 0) {
				if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
					// return 'am hunting, am happy, etc.'
					return ['main','am']
				} else if (this.state.mvvs.length === 0 || (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1)) {
					return ['main','is']
				} else {
					return ['main','are']
				}							
			} else {
				if (vsPlanned[0] == 1 && vsPlanned[1] == 1)	{
					// return 'am hunting, am happy, etc.'
					return ['main','am']
				} else if (vsPlanned[0] == 3 && vsPlanned[1] == 1) {
					return ['main','is']
				} else {
					return ['main','are']
				}			
				
			}
		}
	}

	returnPlaceholder = (endingNeeded, forEnglish, verbtype, mood) => {
		// console.log(endingNeeded, this.state.endingAdjusted, this.state.startingCase, this.state.mvvsPlanned)

		// console.log(endingNeeded, forEnglish, mood)
		let startingCase = ''
		let vsPlanned = []
		if (forEnglish !== undefined) {
			startingCase = forEnglish[0]
			vsPlanned = forEnglish[1]
		}

		if (endingNeeded == 'n') {
			if (this.state.endingAdjusted === 'v') {
				if (startingCase == 'i') {
					return 'hunt, be happy, etc.'
				} else if (startingCase == 'g') {
					return 'hunting, being happy, etc.'
				} else if (vsPlanned.length > 0) {
					if (vsPlanned[0] == 1 && vsPlanned[1] == 1)	{
						return 'am hunting, happy, etc.'
					} else if (vsPlanned.length === 0 || (vsPlanned[0] == 3 && vsPlanned[1] == 1)) {
						return 'is hunting, happy, etc.'
					} else {
						return 'are hunting, happy, etc.'
					}
				} else {
					if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
						return 'am hunting, happy, etc.'
					} else if (this.state.mvvs.length === 0 || (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1)) {
						return 'is hunting, happy, etc.'
					} else {
						return 'are hunting, happy, etc.'
					}
				}
			} else {
				return 'person, land, etc.'
			}
		} else if (endingNeeded == 'v') {
			if (this.state.endingAdjusted === 'n') {
				return 'person, land, etc.'
			} else {
					if (startingCase == 'i' || this.state.nextTenses[this.state.nextTenses.length-1] === 'i') {
						return 'hunt, be happy, etc.'
					} else if (startingCase == 'g' || this.state.nextTenses[this.state.nextTenses.length-1] === 'g') {
						return 'hunting, being happy, etc.'
					} else if (this.state.nextTenses[this.state.nextTenses.length-1] === 'p' || this.state.nextTenses[this.state.nextTenses.length-1] === 'pp') {
						return 'hunted, been happy, etc.'
					} 
					// else if (vsPlanned.length > 0) {
					// 	if (vsPlanned[0] == 1 && vsPlanned[1] == 1)	{
					// 		return 'am hunting, happy, etc.'
					// 	} else if (vsPlanned.length === 0 || (vsPlanned[0] == 3 && vsPlanned[1] == 1)) {
					// 		return 'is hunting, happy, etc.'
					// 	} else {
					// 		return 'are hunting, happy, etc.'
					// 	}
					// } 
					else {
						if (
								verbtype === 'mv' &&
								(this.state.mvvMood === "Opt][PRS" || 
								this.state.mvvMood === "Opt][FUT" || 
								this.state.mvvMood === "Opt][PRS][NEG" || 
								this.state.mvvMood === "Sbrd")
								) 
						{
							return 'hunt, be happy, etc.'
						} else if (
							verbtype === 'cv' &&
							(this.state.cvvMood === "Prec" ||
							this.state.cvvMood === "Cond" ||
							this.state.cvvMood === "Cont")
							) 
						{ 

							if (vsPlanned.length === 0) {
								if (this.state.cvvs[0] == 1 && this.state.cvvs[1] == 1)	{
									return 'hunt, am happy, etc.'
									// return ['i','am']
								} else if (this.state.cvvs.length === 0 || (this.state.cvvs[0] == 3 && this.state.cvvs[1] == 1)) {
									return 'hunts, is happy, etc.'
									// return ['gen','is']
								} else {
									return 'hunt, are happy, etc.'
									// return ['i','are']
								}		
							} else {
								if (vsPlanned[0] == 1 && vsPlanned[1] == 1)	{
									return 'hunt, am happy, etc.'
									// return ['i','am']
								} else if (vsPlanned[0] == 3 && vsPlanned[1] == 1) {
									return 'hunts, is happy, etc.'
									// return ['gen','is']
								} else {
									return 'hunt, are happy, etc.'
									// return ['i','are']
								}		
							}
							// if (this.state.cvvs[0] == 1 && this.state.cvvs[1] == 1)	{
							// 	return 'hunt, am happy, etc.'
							// } else if (this.state.cvvs.length === 0 || (this.state.cvvs[0] == 3 && this.state.cvvs[1] == 1)) {
							// 	return 'hunts, is happy, etc.'
							// } else {
							// 	return 'hunt, are happy, etc.'
							// }		
						} else if (
							verbtype === 'cv' && this.state.cvvMood === "Conc"
							) 
						{ 
							if (this.state.cvvs[0] == 1 && this.state.cvvs[1] == 1)	{
								return 'am hunting, happy, etc.'
							} else if (this.state.cvvs.length === 0 || (this.state.cvvs[0] == 3 && this.state.cvvs[1] == 1)) {
								return 'is hunting, happy, etc.'
							} else {
								return 'are hunting, happy, etc.'
							}		
						} else if (
								verbtype === 'cv' &&
								(this.state.cvvMood === "Cnsq" ||
								this.state.cvvMood === "CtmpI" ||
								this.state.cvvMood === "CtmpII")
							) 
						{
							if (this.state.cvvs[0] == 1 && this.state.cvvs[1] == 1)	{
								return 'hunted, was happy, etc.'
							} else if (this.state.cvvs.length === 0 || (this.state.cvvs[0] == 3 && this.state.cvvs[1] == 1)) {
								return 'hunted, was happy, etc.'
							} else {
								return 'hunted, were happy, etc.'
							}		
						} else if (
							verbtype === 'mv' &&
							(this.state.mvvType === "Intrg4" ||
							this.state.mvvType === "Intrg5")
							) 
						{
							return 'hunt, be happy, etc.'
						} else if (
							verbtype === 'mv' &&
							(this.state.mvvType === "Intrg6" ||
							this.state.mvvType === "Intrg7" ||
							this.state.mvvType === "Intrg8" ||
							this.state.mvvType === "Intrg9" ||
							this.state.mvvType === "IntrgA")
							) 
						{
							return 'hunting, being happy, etc.'
						} else if (
							verbtype === 'sv' &&
							(this.state.svvType === "by" ||
							this.state.svvType === "being")
							) 
						{
							return 'hunting, being happy, etc.'
						} else {
							if (vsPlanned.length === 0) {
								if (this.state.mvvs[0] == 1 && this.state.mvvs[1] == 1)	{
									// return 'am hunting, am happy, etc.'
								return 'am hunting, happy, etc.'
								} else if (this.state.mvvs.length === 0 || (this.state.mvvs[0] == 3 && this.state.mvvs[1] == 1)) {
								return 'is hunting, happy, etc.'
								} else {
								return 'are hunting, happy, etc.'
								}							
							} else {
								if (vsPlanned[0] == 1 && vsPlanned[1] == 1)	{
									// return 'am hunting, am happy, etc.'
								return 'am hunting, happy, etc.'
								} else if (vsPlanned[0] == 3 && vsPlanned[1] == 1) {
								return 'is hunting, happy, etc.'
								} else {
								return 'are hunting, happy, etc.'
								}			
							}					
						}
					}
				// } 
			}
		}
	}

	popularVPostbasesGetter = (mood,submood) => {
		let noFuture = false
		let noPast = false
		if (mood == 'CtmpI' || mood == 'CtmpII' || submood == 'Intrg4' || mood == 'Sbrd' || mood.includes('Opt')) {
			noFuture = true
		}
		if (mood == 'Sbrd' || mood.includes('Opt') || submood == 'Intrg5') {
			noPast = true
		}
		if ((noFuture && noPast) || this.state.containsTime) {
			return popularVPostbasesNoTime
		} else if (noFuture) {
			return popularVPostbasesOnlyPast
		} else if (noPast) {
			return popularVPostbasesOnlyFuture
		} else {
			return popularVPostbases
		}
	}

	getPopular = (endingNeeded, mood, submood) => {
		let popularPostbases = []
		let popularBases = []

		if (endingNeeded == 'n') {
			if (this.state.endingAdjusted === 'v') {
				popularPostbases = this.popularVPostbasesGetter(mood,submood)
				popularBases = popularVerbs
			} else {
				popularPostbases = popularNPostbases
				popularBases = popularNouns				
			}
		} else {
			if (this.state.endingAdjusted === 'n') {
				popularPostbases = popularNPostbases
				popularBases = popularNouns		
			} else {
				popularPostbases = this.popularVPostbasesGetter(mood,submood)
				popularBases = popularVerbs
			}
		}

		return [popularPostbases, popularBases]
	}

	// getNextTenses = (p) => {
	// 		if (this.state.nextTenses.length == 0) {
	// 			return this.state.nextTenses.concat(['gen'])
	// 		} else {
	// 			let lastTense = this.state.nextTenses[this.state.nextTenses.length-1]
	// 			if (p['match_case']) {
	// 				return this.state.nextTenses.concat([lastTense])
	// 			} else if (lastTense === 'g') {
	// 				return this.state.nextTenses.concat(p['ger_preverb_after'])
	// 			} else if (lastTense === 'i') {
	// 				return this.state.nextTenses.concat(p['inf_preverb_after'])
	// 			} else if (lastTense === 'gen') {
	// 				return this.state.nextTenses.concat(p['gen_preverb_after'])
	// 			} else if (lastTense === 'p') {
	// 				return this.state.nextTenses.concat(p['past_preverb_after'])
	// 			} else if (lastTense === 'past') {
	// 				return this.state.nextTenses.concat(p['past_preverb_after'])
	// 			} else if (lastTense === 'pp') {
	// 				return this.state.nextTenses.concat(p['past_preverb_after'])
	// 			} else if (lastTense === 'present') {
	// 				return this.state.nextTenses.concat(p['gen_preverb_after'])
	// 			}
	// 		}
	// }

	baseChooser = (itemUpdating,endingNeeded,update,mood,submood,forEnglish) => {
		let key;

		let popular = this.getPopular(endingNeeded,mood,submood)

		let popularPostbases = popular[0]
		let popularBases = popular[1]

		let mvvsPlanned = []
		if (forEnglish !== undefined) {
			mvvsPlanned = forEnglish[1]
		}


		// console.log(itemUpdating,endingNeeded,update,mood,submood,forEnglish)

		let subject = this.returnBaseChooserTitle(itemUpdating,endingNeeded,mood,submood,forEnglish)

		// console.log(subject)
		// if (this.state.currentlyOpen.length === 0) {
			// subject = ''
		// }

		// if (['npnBases10'].includes(itemUpdating[1].join(""))) {
		// 		subject = 'yes'				
		// } else if (['npnBases00'].includes(itemUpdating[1].join(""))) {
		// 		subject = '...'+this.state.npn[0][3]+'...'				
		// }



		// let currentTense;n
		// console.log(this.state)
		// console.log(this.state.currentEditMode, itemUpdating,endingNeeded,update,mood,submood)
		         return <Grid style={{width:'300px'}}>
		                	<Grid.Row columns={1} divided>
		                	<Grid.Column style={{paddingTop:'10px'}}>

									        <Segment style={{overflow: 'auto',padding:0}}>
									        	<List divided style={{margin:0,padding:0,}}>
									        	{subject.length !== 0 ?
											        <List.Item style={{color:'#545454',fontFamily:customFontFam,padding:'8px 15px',backgroundColor:'#f7f7f7'}}>{subject}</List.Item>
											        :
											        null
											      }
{/*
									        	{this.state.cvvMood.length > 0 && this.state.currentEditMode == 'cvupdate' ?
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
										        		<div style={{flex:1}}>
											        		<div style={{color:'#000000b3'}}>{retrieveMoodEnglish[this.state.cvvMood]['fst']}</div>
											        		<div style={{fontWeight:''}}>{retrieveMoodEnglish[this.state.cvvMood]['english']+' '}<span style={{fontStyle:'italic'}}>{mvSubjectOptionsEnglish[this.state.cvvs.join("")]}</span></div>
										        		</div>
										        		</List.Item>
									        		:
									        		null
									        	}*/}

									        	{this.state.candidateDisplay.map((k,kindex)=>{return (kindex===this.state.candidateBase.length-1 ?
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:'8px 15px',backgroundColor:'#f7f7f7'}}>
										        		<div style={{flex:1}}>
											        		<div style={{color:'#545454',fontFamily:customFontFam}}>{k[0]}</div>
											        		<div style={{color:'#c5c5c5',fontFamily:customFontFam,fontWeight:'200',marginLeft:'5px'}}>{k[1]}</div>
										        		</div>
										        		<Icon circular onClick={()=>{
												      			// if (newpostbases[popularPostbases[p]['expression']]['type']=="VV") {
												      			// 	if (!newpostbases[popularPostbases[p]['expression']]['match_case']) {
												      			// 		this.setState({addIs:false})
												      			// 	}
												      			// }
												      			// this.handleClick('vvpostbases',false); 
												      			this.handleClick('verbs',false); 
												      			if (this.state.candidateBase.length === 1) {
												      				this.setState({addIs:true})
												      			} else {
												      				if (!newpostbases[this.state.candidateBase[this.state.candidateBase.length-2][1]]['match_case']) {
												      					this.setState({addIs:false})
												      				} else {
												      					this.setState({addIs:true})												      					
												      				}
												      			}
											        			this.setState({
											        				candidateBase:this.state.candidateBase.slice(0,-1),
											        				candidateDisplay:this.state.candidateDisplay.slice(0,-1),
											        				nextTenses:(this.state.lockSubmit ? this.state.nextTenses:this.state.nextTenses.slice(0,-1)),
											        				unallowable_next_ids:(this.state.lockSubmit ? this.state.unallowable_next_ids:this.state.unallowable_next_ids.slice(0,-1)),
											        				lockSubmit:false,
											        				// endingAdjusted:'',
											        			},()=>{
																	    this.updateCandidateCall(endingNeeded,update,mood,submood,'')
																	  })
										        			}} style={{cursor:'pointer',width:30}} name='x' />
										        		</List.Item>
									        			:
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:'8px 15px',backgroundColor:'#f7f7f7'}}>
										        		<div style={{flex:1}}>										        		
											        		<div style={{color:'#545454',fontFamily:"Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"}}>{k[0]}</div>
											        		<div style={{color:'#c5c5c5',fontFamily:customFontFam,fontWeight:'200',marginLeft:'5px'}}>{k[1]}</div>
										        		</div>
										        		<div style={{width:30}} />
										        		</List.Item>
									        			)
									        	})}
									        	</List>



									        	{this.state.lockSubmit ?
									        		null
					                		:


									        <div style={{padding:0,margin:0}}>
		                		
											      <Input 
											      icon='search' 
											      iconPosition='left' 
											      name='search'     
											      autoComplete='off'
											      autoFocus
											      disabled={this.state.lockSubmit}
											      placeholder={this.returnPlaceholder(endingNeeded,forEnglish,itemUpdating[1][0],mood)}
											      // width='100%'
											      style={{width:'100%',padding:'5px 5px'}}
											 		  onChange={this.onChangeBaseSearch.bind(this,endingNeeded,forEnglish,itemUpdating[1][0],mood,submood)}
								            value={this.state.searchQuery}
								            // onClose={()=>{this.setState({searchQuery:'',wordsList:[]})}}
								            />

								            {this.state.wordsList.length === 0 && this.state.searchQuery.length > 0 ?
								            	<div style={{padding:'12px',fontStyle:'italic',color:'grey'}}> {'No results...'} </div>
								            	:
								            	null
								            }
								            {this.state.wordsList.length > 0 ?
								            	<span>
													      <Segment vertical style={{maxHeight:255,overflow: 'auto',padding:0,margin:"4px 9px",borderBottom:'0px solid #e2e2e2'}}>

												    		<Button.Group vertical basic fluid>
													      	{this.state.wordsList.map((k,index)=>{
													      		if (k['type'].includes('→')) {
														      		return <Button style={{textAlign:'left',padding:'10px'}} onClick={()=>{
														      			console.log(this.state.nextTenses, k, newpostbases[k['fsts']])
														      			this.setState({
																	    		searchQuery:'',
																	    		wordsList:[],
														      				candidateBase:this.state.candidateBase.concat([[newpostbases[k['fsts']]['keylookup'],k['fsts']]]),
																	    		candidateDisplay:this.state.candidateDisplay.concat([[this.processStyledPostbaseText(k['fsts'],'2',forEnglish,itemUpdating[1][0],mood),k['fsts']]]),
																	    		nextTenses:(
																	    			newpostbases[k['fsts']]['match_case'] && !('gen_preverb_after' in newpostbases[k['fsts']]) ? 
																		    			(this.state.nextTenses.length == 0 ? 
																		    				this.state.nextTenses.concat(['gen'])
																		    				:
																		    				this.state.nextTenses.concat([this.state.nextTenses[this.state.nextTenses.length-1]])
																		    			) 
																	    			: 
																		    			('verbType' in newpostbases[k['fsts']] ?
																			    			this.state.nextTenses.concat([newpostbases[k['fsts']]['verbType'],])
																			    			:
																			    			this.state.nextTenses.concat([newpostbases[k['fsts']]['gen_preverb_after'],])
																		    			)
																	    			),
														      			},()=>{
																	    		this.updateCandidateCall(endingNeeded,update,mood,submood,'p')
																	    	})
														      		}}>
															      		<div>
																      		<div style={{marginBottom:'5px',color:'#545454'}}>
																      		<span>{this.processStyledPostbaseText(k['fsts'],'2',forEnglish,itemUpdating[1][0],mood)}</span>
																      		<span style={{color:'#bdbdbd'}}>{'...'}</span></div>
																      		<div style={{color:'#c5c5c5',fontFamily:customFontFam,fontWeight:'200',marginLeft:'5px'}}>{k['fsts']}</div>
															      		</div>
														      		</Button>

													      		} else {
														      		return <Button style={{textAlign:'left',padding:'10px'}} onClick={()=>{
																	    	this.setState({
																	    		searchQuery:'',
																	    		wordsList:[],
																	    		candidateBase:this.state.candidateBase.concat(k),
																	    		candidateDisplay:this.state.candidateDisplay.concat([[this.processStyledMainText(k,forEnglish,itemUpdating[1][0],mood),k['fsts'].toString()+'-']]),
																	    	},()=>{
																	    		this.updateCandidateCall(endingNeeded,update,mood,submood,'b')
																	    	})
														      		}}>
															      		<div>
																      		<div style={{marginBottom:'5px',color:'#545454'}}>
																      		<span>{this.processStyledMainText(k,forEnglish,itemUpdating[1][0],mood)}</span>
																      		</div>
																      		<div style={{color:'#c5c5c5',fontFamily:customFontFam,fontWeight:'200',marginLeft:'5px'}}>{k['fsts'].toString()+'-'}</div>
															      		</div>
														      		</Button>
													      		}
													      	})}
												    		</Button.Group>
													      </Segment>
												    		<div style={{textAlign:'center',color:'#252525'}}>
												    		<Icon name="dropdown" />
												    		</div>
												    	</span>
												      :
												      null
												    }

									        {this.state.candidateBase.length < 2 ?
														<Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
												    		<Accordion.Title
												    			id={'verb'}
												    			style={{paddingBottom:'2px'}}
												    			active={this.state.activeIndexes1.includes('vvpostbases')}
											            onClick={()=>{this.handleClick1('vvpostbases',true)}}
												    		>
												    			<Icon name="dropdown" />
												    			{'Common Postbases'}
												    		</Accordion.Title>
												    		<Accordion.Content active={this.state.activeIndexes1.includes('vvpostbases')}>
													      <Segment vertical style={{maxHeight:255,overflow: 'auto',padding:0,marginTop:5,marginBottom:0,borderBottom:'0px solid #e2e2e2'}}>
												    		<Button.Group vertical basic fluid>
													      	{Object.keys(popularPostbases).map((p,index)=>{
													      		let removeItem = false
													      		if (this.state.unallowable_next_ids.length > 0) {
													      			removeItem = this.state.unallowable_next_ids[this.state.unallowable_next_ids.length-1][0].includes(popularPostbases[p]['id'])
													      		}
													      		if (!removeItem) {
														      		return <Button style={{textAlign:'left',padding:'10px'}} onClick={()=>{
														      			this.handleClick1('vvpostbases',false); 
												      					// this.handleClick('verbs',false); 
														      			this.setState({
														      				candidateBase:this.state.candidateBase.concat([[newpostbases[popularPostbases[p]['expression']]['keylookup'],popularPostbases[p]['expression']]]),
																	    		candidateDisplay:this.state.candidateDisplay.concat([[this.processStyledPostbaseText(popularPostbases[p],'1',forEnglish,itemUpdating[1][0],mood),newpostbases[popularPostbases[p]['expression']]['exp']]]),
																	    		unallowable_next_ids: this.state.unallowable_next_ids.concat([[popularPostbases[p]['allowable_next_ids'],]]),
																	    		nextTenses:
																	    		(newpostbases[popularPostbases[p]['expression']]['match_case'] && !('gen_preverb_after' in newpostbases[popularPostbases[p]['expression']]) 
																	    			? 
																	    			(this.state.nextTenses.length == 0 
																	    				? 
																	    				this.state.nextTenses.concat(['gen'])
																	    				:
																	    				this.state.nextTenses.concat([this.state.nextTenses[this.state.nextTenses.length-1]])) 
																	    			: 
																	    			this.state.nextTenses.concat([newpostbases[popularPostbases[p]['expression']]['gen_preverb_after'],])
																	    			),
														      			},()=>{
																	    		this.updateCandidateCall(endingNeeded,update,mood,submood,'p')
																	    	})
														      		}}>
															      		<div>
																      		<div style={{marginBottom:'5px',color:'#545454'}}>
																      		<span>{this.processStyledPostbaseText(popularPostbases[p],'1',forEnglish,itemUpdating[1][0],mood)}</span>
																      		<span style={{color:'#bdbdbd'}}>{'...'}</span></div>
																      		<div style={{color:'#c5c5c5',fontFamily:customFontFam,fontWeight:'200',marginLeft:'5px'}}>{newpostbases[popularPostbases[p]['expression']]['exp']}</div>
															      		</div>
														      		</Button>
													      		}
													      	})}
												    		</Button.Group>
												    		</Segment>
												    		<div style={{textAlign:'center',color:'#252525'}}>
												    		<Icon name="dropdown" />
												    		</div>
												    		</Accordion.Content>
												    </Accordion>	
												    :
												    null
												  }

									        <div style={{padding:0,margin:0}}>
														<Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
												    		<Accordion.Title
												    			id={'verb'}
												    			style={{paddingBottom:'2px'}}
												    			active={this.state.activeIndexes1.includes('verbs')}
											            onClick={()=>{this.handleClick1('verbs',true)}}
												    		>
												    			<Icon name="dropdown" />
												    			{'Common Bases'}
												    		</Accordion.Title>
												    		<Accordion.Content active={this.state.activeIndexes1.includes('verbs')}>
													      <Segment vertical style={{maxHeight:255,overflow: 'auto',padding:0,marginTop:5,marginBottom:0,borderBottom:'0px solid #e2e2e2'}}>
													    		<Button.Group vertical basic fluid>
														      	{Object.keys(popularBases).map((p)=>{
														      		return <Button style={{textAlign:'left',padding:'10px'}} onClick={()=>{
														      			// this.handleClick('vvpostbases',false); 
														      			this.handleClick1('verbs',false); 
																	    	this.setState({
																	    		searchQuery:'',
																	    		wordsList:[],
																	    		candidateBase:this.state.candidateBase.concat(popularBases[p]),
																	    		candidateDisplay:this.state.candidateDisplay.concat([[this.processStyledMainText(popularBases[p],forEnglish,itemUpdating[1][0],mood),popularBases[p]['fsts'].join("-, ")+'-']]),
																	    	},()=>{
																	    		this.updateCandidateCall(endingNeeded,update,mood,submood,'b')
																	    	})
														      		 }}>
																      		<div>
																	      		<div style={{marginBottom:'5px',color:'#545454'}}>
																	      		<span>{this.processStyledMainText(popularBases[p],forEnglish,itemUpdating[1][0],mood)}</span>
																	      		<span style={{color:'#bdbdbd'}}>{'.'}</span></div>
																	      		<div style={{color:'#c5c5c5',fontFamily:customFontFam,fontWeight:'200',marginLeft:'5px'}}>{popularBases[p]['fstsDisplay']}</div>
																      		</div>
														      		 </Button>
														      	})}

													    		</Button.Group>
												    		</Segment>
												    		<div style={{textAlign:'center',color:'#252525'}}>
												    		<Icon name="dropdown" />
												    		</div>
												    		</Accordion.Content>
												    </Accordion>	
											    </div>


												    </div>
					                	}



								        	</Segment>

											      <div style={{paddingBottom:10}}>  
											      <Link to={{pathname: '/sentencebuilder/2'}}>
					                		<Button size='small' color='blue' onClick={()=>{
					                			console.log(mood)
					                			this.setState({overlayOn:false})
					                			this.closeEditMenuRef(this.state.crecentlyOpen,'default',false)
					                			this.closeMainScreenMenuRef(this.state.crecentlyOpen,'default')
					                			if (mood === 'Intrg') {
					                				this.backEndCall([[itemUpdating[0],itemUpdating[1],this.state.candidateCall],["Insert",["mv","qWord"],[submood,1]]]); 		                				
					                			} else {
				                					if (mvvsPlanned.length > 0) {
							                			if (submood == 'qaa') {
				                							this.backEndCall([[itemUpdating[0],itemUpdating[1],this.state.candidateCall],["Update",["mv","vs"],mvvsPlanned],["Update",["mv","vType"],'qaa']])                						                									                						
							                			} else {
				                							this.backEndCall([[itemUpdating[0],itemUpdating[1],this.state.candidateCall],["Update",["mv","vs"],mvvsPlanned]])                						                									                													                				
							                			}
				                					} else {
					                					this.backEndCall([[itemUpdating[0],itemUpdating[1],this.state.candidateCall]]); 				                						
				                					}
					                			}
					                			console.log(submood)
					                			if (submood == 'qaa') {
					                				this.backEndCall([["Update",["mv","vType"],'qaa']])
					                			}
					                		}} disabled={!this.state.lockSubmit} style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}>
					                			<div style={{fontFamily:'Lato'}}>{'Submit'}</div>
					                			<Icon name='chevron right' />
					                		</Button>
				                		</Link>
				                		</div>
								        	{this.state.lockSubmit ?
								        		null
				                		:
								        		<div style={{fontFamily:customFontFam,fontSize:'14px',color:'#c7c7c7',marginBottom:'5px'}}>You need at least one base</div>
				                	}



							
		                	</Grid.Column>
		                	</Grid.Row>
									    </Grid>

	}


	// baseChooser2 = (itemUpdating,endingNeeded,update,mood,submood) => {
	// 	// console.log(itemUpdating,endingNeeded,update,mood,submood)
	// 	// console.log(this.state)
	// 	// console.log(this.state.currentEditMode, itemUpdating,endingNeeded,update,mood,submood)
	// 	         return <Grid style={{height:'400px',width:'505px'}}>
	// 	                	<Grid.Row columns={2} style={{paddingBottom:'0px'}}divided>
	// 	                	<Grid.Column >
	// 	                		<Button onClick={()=>{this.menuSelect('default'); this.setState({searchQuery:'',wordsList:[]})}} style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'13px',marginBottom:'10px'}}>
	// 	                			<Icon name='chevron left' />
	// 	                			<div style={{color:'#666666'}}>{'Back'}</div>
	// 	                		</Button>
	// 								      <Input 
	// 								      icon='search' 
	// 								      iconPosition='left' 
	// 								      name='search'     
	// 								      disabled={this.state.lockSubmit}
	// 								      // width='100%'
	// 								      style={{width:'220px'}}
	// 								 		  onChange={this.onChangeBaseSearch.bind(this,endingNeeded)}
	// 					            value={this.state.searchQuery}
	// 					            // onClose={()=>{this.setState({searchQuery:'',wordsList:[]})}}
	// 					            />
	// 								      <Segment vertical style={{height:255,overflow: 'auto',padding:0,marginTop:5,marginBottom:0,borderBottom:'0px solid #e2e2e2'}}>
	// 								      <List selection>
	// 									    {this.state.wordsList.map((k)=>{return <List.Item onClick={()=>{
	// 									    	// if (k['type']=='[→V]' || k['type']=='[V→V]')
	// 									    	console.log(k)
	// 									    	this.setState({
	// 									    		searchQuery:'',
	// 									    		wordsList:[],
	// 									    		candidateBase:this.state.candidateBase.concat(k),
	// 									    	},()=>{
	// 									    		this.updateCandidateCall(endingNeeded,update,mood,submood)
	// 									    	})

	// 									    }} style={{cursor:'pointer',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'15px',padding:5}}>
	// 										        <List.Description style={{paddingBottom:'4px'}}>{k['yupikword']}</List.Description>
	// 										        <List.Header style={{fontWeight:'400'}}>{this.processStyledText(k['englishraw'])}</List.Header>
	// 										      </List.Item>				      	
	// 									      })}
	// 								    	</List>
	// 								      </Segment>
	// 								      {this.state.wordsList.length > 0 ?
	// 									      <div style={{textAlign:'center'}}>
	// 										      <Icon color='grey' name='chevron down' />
	// 									      </div>
	// 									      :
	// 									      null
	// 									    }

	// 									  </Grid.Column>
	// 									  <Grid.Column style={{display:'flex',flexDirection:'column'}}>
									  
	// 								        <div style={{color:'#666666'}}>{'Candidate (English Order)'}</div>
	// 								        <Segment style={{height:290,overflow: 'auto',padding:10}}>
	// 								        	<List divided>
	// 								        	{this.state.cvvMood.length > 0 && this.state.currentEditMode == 'cvupdate' ?
	// 									        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
	// 									        		<div style={{flex:1}}>
	// 										        		<div style={{color:'#000000b3'}}>{retrieveMoodEnglish[this.state.cvvMood]['fst']}</div>
	// 										        		<div style={{fontWeight:''}}>{retrieveMoodEnglish[this.state.cvvMood]['english']+' '}<span style={{fontStyle:'italic'}}>{mvSubjectOptionsEnglish[this.state.cvvs.join("")]}</span></div>
	// 									        		</div>
	// 									        		</List.Item>
	// 								        		:
	// 								        		null
	// 								        	}
	// 								        	{this.state.candidateBase.map((k,kindex)=>{return (kindex===this.state.candidateBase.length-1 ?
	// 									        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
	// 									        		<div style={{flex:1}}>
	// 										        		<div style={{color:'#000000b3'}}>{k['yupikword']}</div>
	// 										        		<div style={{fontWeight:''}}>{this.processStyledText(k['englishraw'])}</div>
	// 									        		</div>
	// 									        		<Icon circular onClick={()=>{this.setState({candidateBase:this.state.candidateBase.slice(0,-1)},()=>{this.updateCandidateCall(endingNeeded,update,mood,submood)})}} style={{cursor:'pointer',width:30}} name='x' />
	// 									        		</List.Item>
	// 								        			:
	// 									        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
	// 									        		<div style={{flex:1}}>										        		
	// 										        		<div style={{color:'#000000b3'}}>{k['yupikword']}</div>
	// 										        		<div style={{fontWeight:''}}>{this.processStyledText(k['englishraw'])}</div>
	// 									        		</div>
	// 									        		<div style={{width:30}} />
	// 									        		</List.Item>
	// 								        			)
	// 								        	})}
	// 								        	</List>
	// 							        	</Segment>
	// 								      <div style={{paddingBottom:10}}>  
	// 	                		<Button color='blue' onClick={()=>{
	// 	                			if (mood === 'Intrg') {
	// 	                				this.backEndCall([[itemUpdating[0],itemUpdating[1],this.state.candidateCall],["Insert",["mv","qWord"],[submood,1]]]); 		                				
	// 	                			} else {
	// 	                				console.log([[itemUpdating[0],itemUpdating[1],this.state.candidateCall]])
	// 	                				this.backEndCall([[itemUpdating[0],itemUpdating[1],this.state.candidateCall]]); 		                						                				
	// 	                			}
	// 	                			this.setState({isOpen:false,currentEditMode:'default',searchQuery:'',wordsList:[],candidateBase:[],lockSubmit:false}) 
	// 	                		}} disabled={!this.state.lockSubmit} style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}>
	// 	                			<div>{'Submit'}</div>
	// 	                			<Icon name='chevron right' />
	// 	                		</Button>
	// 	                		</div>

	// 	                	</Grid.Column>
	// 	                	</Grid.Row>
	// 								    </Grid>

	// }

	arraysEqual = (a, b) => {
	  if (a === b) return true;
	  if (a == null || b == null) return false;
	  if (a.length !== b.length) return false;

	  // If you don't care about the order of the elements inside
	  // the array, you should sort both arrays here.
	  // Please note that calling sort on an array will modify that array.
	  // you might want to clone your array first.

	  for (var i = 0; i < a.length; ++i) {
	    if (a[i] !== b[i]) return false;
	  }
	  return true;
	}

	flipGlossary = (bool) => {
		this.setState({glossary:bool})
	}

  parserPopup = (parses) => {
  	// console.log(parses)

    return (
      <div style={{padding:'11px 14px',fontFamily:"Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"}}>
        {parses['yugtun'].map((q,qindex) =>
          <div style={{paddingBottom:(qindex !== parses['yugtun'].length-1 ? 15 : 0),paddingLeft:qindex*20,fontSize:'16px'}}>
              <div>
              <div style={{fontWeight:'bold',paddingBottom:'5px'}}>
                {parses['link'][qindex] !== "" ?
                <a style={{paddingBottom:'1px',borderBottom:'1px solid #4183c4'}} href={YUGTUNDOTCOM_URL+parses['link'][qindex]} target="_blank">
                {q}
                </a>
                :
                <span>
                {q}
                </span>
                }
              </div>                  
              {parses.endingIndex === qindex ?
              <div>
              <div>{parses.english[qindex][0]}</div>
              <div style={{color:'#00000066'}}>{parses.english[qindex][2]}</div>
              </div>
              :
              parses.english[qindex]
              }
              </div>
          </div>
        )}     
      </div>
    )  		
  }

	getColor = (pos,template,test) => {
		// console.log(pos, this.state)

		// console.log(this.state.npn[this.state.npn.length-1][0][0], this.state.npn[this.state.npn.length-1][0][0] === 1)
		let grey = '#5c5c5c'
		let black = '#000000'
		// console.log(test)
		// console.log(tensesSentenceTemplates.includes(test))

		let currentColorScheme = this.state.colorScheme

		if (template) {
				// console.log(pos,test)
				if (!(pos in colorsList[1])) {
					return black
				} else {
					return colorsList[1][pos]				
				}		
		}


		if (currentColorScheme === -1) {
			return '#000000'
		} else if (currentColorScheme === 0) {
				if (pos === 'mvno00.ps' && this.state.mvvBase[1] === 'it' && this.arraysEqual(this.state.mvno[0][0],[0,0,0,1])) {
					return colorsList[currentColorScheme]['mvns00.c']	
				} else if (pos === 'cvno00.ps' && this.state.cvvBase[1] === 'it' && this.arraysEqual(this.state.cvno[0][0],[0,0,0,1])) {
					return colorsList[currentColorScheme]['cvns00.c']	
				} else if (pos === 'svno00.ps' && this.state.svvBase[1] === 'it' && this.arraysEqual(this.state.svno[0][0],[0,0,0,1])) {
					return colorsList[currentColorScheme]['svns00.c']	
				} 
				if (pos === 'mvqWord' && (this.state.mvvType === 'Intrg0' || this.state.mvvType === 'Intrg2')) {
					return colorsList[currentColorScheme]['mvv.s']	
				}
				if (pos === 'mvqWord' && (this.state.mvvType === 'Intrg1' || this.state.mvvType === 'Intrg3')) {
					return colorsList[currentColorScheme]['mvv.o']	
				}

				if (this.state.mvvBase.length > 0) {
					if (pos == 'mvv.'+(this.state.mvvBase[0].length-1).toString()) {
		  			if (pastTensePostbases.includes(this.state.mvvBase[0][this.state.mvvBase[0].length-1][0])) {
			  			return colorsList[currentColorScheme]['past']	
		  			} else if (futureTensePostbases.includes(this.state.mvvBase[0][this.state.mvvBase[0].length-1][0])) {
			  			return colorsList[currentColorScheme]['future']	
		  			}
		  		}
	  		} else if (this.state.cvvBase.length > 0) {
					if (pos == 'cvv.'+(this.state.cvvBase[0].length-1).toString()) {
		  			if (pastTensePostbases.includes(this.state.cvvBase[0][this.state.cvvBase[0].length-1][0])) {
			  			return colorsList[currentColorScheme]['past']	
		  			} else if (futureTensePostbases.includes(this.state.cvvBase[0][this.state.cvvBase[0].length-1][0])) {
			  			return colorsList[currentColorScheme]['future']	
		  			}
		  		}
	  		} else if (this.state.svvBase.length > 0) {
					if (pos == 'svv.'+(this.state.svvBase[0].length-1).toString()) {
		  			if (pastTensePostbases.includes(this.state.svvBase[0][this.state.svvBase[0].length-1][0])) {
			  			return colorsList[currentColorScheme]['past']	
		  			} else if (futureTensePostbases.includes(this.state.svvBase[0][this.state.svvBase[0].length-1][0])) {
			  			return colorsList[currentColorScheme]['future']	
		  			}
		  		}
	  		}


				if (!(pos in colorsList[currentColorScheme])) {
					return grey
				} else {
					return colorsList[currentColorScheme][pos]				
				}		
		} else if (currentColorScheme === 1) {

			//IF 1st PERSON CHOOSE COLOR
			//IF 2nd PERSON CHOOSE COLOR
			//ALL OTHER COLORS BLACK


		// } else if (currentColorScheme === 1) {
		// 	if (pos === 'npn00.ps' || pos === 'npn10.ps') {
		// 		if (this.arraysEqual(this.state.npn[this.state.npn.length-1][0],[0,0,0,1])) {
		// 			return grey
		// 		} else {
		// 			return colorsList[currentColorScheme][pos]				
		// 		}
		// 	} else {
		// 		// console.log(colorsList[currentColorScheme], pos)
		// 		if (!(pos in colorsList[currentColorScheme])) {
		// 			return grey
		// 		} else {
		// 			return colorsList[currentColorScheme][pos]				
		// 		}
		// 	}
		} else {
			if (pos === 'npn00.ps') {
				if (this.arraysEqual(this.state.npn[this.state.npn.length-1][0],[0,0,0,1])) {
					return grey
				} else if (this.state.npn[this.state.npn.length-1][0][0] === 1) {
					// console.log('hi')
					return colorsList[currentColorScheme]['1st-1']
				} else {
					return colorsList[currentColorScheme][pos]				
				}
			} else if (pos === 'npn00.pd') {
				if (this.arraysEqual(this.state.npn[this.state.npn.length-1][0],[0,0,0,1])) {
					return colorsList[currentColorScheme]['npn00.b']
				} else if (this.state.npn[this.state.npn.length-1][0][0] === 1) {
					// console.log('hi')
					return colorsList[currentColorScheme]['1st-2']
				} else {
					return colorsList[currentColorScheme][pos]				
				}
			} else {
				// console.log(colorsList[currentColorScheme], pos)
				if (!(pos in colorsList[currentColorScheme])) {
					return '#000000'
				} else {
					return colorsList[currentColorScheme][pos]				
				}
			}
		}
	}

	getDropdownStyle=(color)=>{
		return {lineHeight:'33px',marginTop:'2px',marginBottom:'2px',border:'solid 1px #22242626',color:this.getColor(color),fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'2px',marginLeft:'2px',}
	}

	render() {
		console.log(this.state)
		// console.log("mvv",this.state.mvvMood)
		// console.log("mvvtype",this.state.mvvType)
		// console.log("cvv",this.state.cvvMood)
		// console.log("cvvtype",this.state.cvvType)

		return (
			<Container style={{ margin: 0, padding: 0 }} text>
			{this.state.overlayOn ?
				<div className="overlay" onClick={()=>{this.setState({overlayOn:false,currentEditMode:'default',})}} />
				:
				null
			}
			<div style={{fontFamily:customFontFam}}>

      <Grid textAlign='center'>
      <Grid.Row  style={{height:40,paddingBottom:0}}>
      <Grid.Column style={{ maxWidth: 800, padding: 0 }} textAlign='left'>

      {this.state.from === '/' ?
        <Link to={{pathname: "/", state: { history:this.state.history }}} >
          <Icon circular style={{margin:0,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}}  name='chevron left' />
        </Link>
        :
        <Icon onClick={()=>{this.props.history.goBack()}} circular style={{margin:0,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='chevron left' />
      }
      <Link to={{pathname: "/"}}>
      <Icon circular style={{margin:0,marginLeft:5,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='search' />
      </Link>     

					<div style={{border:'1px solid #E3E3E3',marginTop:'20px'}}>

				{!this.fromEntry && this.state.mvvBase.length === 0 && this.state.npnBases.length === 0 ?
					<div className='hierarchymain'>
					<span className='span1'>Build your own sentence!</span>
					</div>
					:
					<div className='hierarchymain'>
					<span className='span1'>Sentence Builder</span>
					</div>
				}



				{!this.fromEntry && this.state.mvvBase.length === 0 && this.state.npnBases.length === 0 ?
					null
					:
					<div style={{textAlign:'right'}}>
					<Link to={{pathname: '/sentencebuilder/1'}}>
	      		<Icon circular onClick={()=>{this.backEndCall([['Delete',['mv',],''],['Delete',['np',],'']])}} style={{margin:10,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='x' />
	      	</Link>
	      	</div>
				}

				<Container style={{marginTop:'30px',marginBottom:'30px'}}>
					<div>

							<div style={{marginBottom:'30px'}}>


								{this.state.mvqWordSegments.length > 0 ?
									<div>
										<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
												<div style={{paddingRight:10,paddingLeft:10}}>
													{this.editMenu('mvqWordParser',-1)}
												</div>
											</div>
										</div>
									</div>
									:
									null
								}
								

							 	{this.state.mvnsBases.length > 0 ? 
									<div>
										<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.mvnsSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('mvnsParser',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('mvnsappositiveParser',[kind,qind])}</span>												
													}
												})}
												</div>
											)}
											</div>	

										</div>
									</div>
									:
									null
								}

								{this.state.mvvBase.length > 0 && this.state.mvvSegments.length > 0 ?
									<div>
										<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
												<div style={{paddingRight:10,paddingLeft:10}}>
													{this.editMenu('mvParser',-1)}
												</div>
											</div>
										</div>
									</div>

									:
									null
								}
								

							 	{this.state.mvnoBases.length > 0 ? 
							 		<div>
										<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.mvnoSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('mvnoParser',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('mvnoappositiveParser',[kind,qind])}</span>												
													}
												})}
												</div>												

											)}
											</div>	
										</div>
									</div>
									:
									null
								}			



								{this.state.mvnObliquesSegments.length > 0 && this.state.mvnObliques.length === this.state.mvnObliquesSegments.length ?
									(this.state.mvnObliquesSegments.map((obliques,obliqueind)=>
										<div>
											<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
												<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
													{obliques.slice().reverse().map((x,xind)=> 
													<div style={{paddingRight:10,paddingLeft:10}}>
														{x.map((k,kind)=>
														{if (kind === 0) {
															return <span>{this.editMenu('mvnObliquesParser',[obliqueind,obliques.length-1-xind,kind])}</span>												
														} else {
															return <span>{this.editMenu('mvnObliquesAppositiveParser',[obliqueind,obliques.length-1-xind,kind])}</span>												
														}}
														)}
													</div>
													)}
												</div>
											</div>
										</div>									
									)):null
								}
								
								{this.state.npnSegments.length > 0 && this.state.npnSegments.length === this.state.npn.length ?
									<div>
										<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
												{this.state.npnSegments.slice().reverse().map((x,xind)=> 
													<div style={{paddingRight:10,paddingLeft:10}}>
													{x.map((k,kind)=>
														{if (kind === 0) {
															return <span>{this.editMenu('npnParser',[xind,kind])}</span>												
														} else {
															return <span>{this.editMenu('npnappositiveParser',[xind,kind])}</span>												
														}}											
													)}
													</div>
												)}
											</div>
										</div>
									</div>
									:
									null
								}


{/*

								{this.state.mvvs.length > 0 ?
									<div style={{display:'flex',justifyContent:'center',paddingBottom:10}}>
									{this.editMenu('defaultmv',-1)}
									</div>
									:
									null
								}
*/}

								<div style={{textAlign:'center',fontSize:'18px',fontWeight:'300',marginTop:'20px'}}>

								{this.state.mvEnglish1.length > 0 || (this.state.mvvType === 'Intrg1' || this.state.mvvType === 'Intrg3')?
										<span style={{height:45,display:'inline-flex',alignItems:'center',marginBottom:'2px',marginTop:'2px'}}>
										{this.editMenu('mvEnglish1',-1)}
										</span>
									:
									null
								}

								{this.state.mvvs.length > 0 ?
									(this.state.mvnsSegments.length > 0 ? 
										<div style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
											{this.state.mvnsSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('mvns'+(this.state.mvnsSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",this.state.mvnsSegments.length-1,0],(data.value+this.state.mvns[this.state.mvnsSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvns[this.state.mvnsSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsPossessorsNo4th} />
														<Dropdown inline scrolling style={this.getDropdownStyle('mvns'+(this.state.mvnsSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",this.state.mvnsSegments.length-1,0],this.state.mvns[this.state.mvnsSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvns[this.state.mvnsSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('mvnsEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('mvnsEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}

													</span>
													:
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('mvns'+(this.state.mvnsSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",this.state.mvnsSegments.length-1-xind,0],this.state.mvns[this.state.mvnsSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvns[this.state.mvnsSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('mvnsEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('mvnsEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}

													</span>
												}
												</span>
											)}
										</div>
										:
										<span>
											{this.state.mvvMood == "Opt][PRS][NEG" || this.state.mvvMood == "Opt][FUT][NEG" ?
												<Dropdown inline scrolling style={this.getDropdownStyle('mvv.s')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={mvSubjectOptionsOnly2nd} />
												:
												(this.state.mvvType == 'Intrg0' ?
													<Dropdown inline scrolling style={this.getDropdownStyle('mvv.s')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={mvSubjectOptionsWho} />
													:
													(this.state.mvvType == 'Intrg2' ?
														<Dropdown inline scrolling style={this.getDropdownStyle('mvv.s')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={mvSubjectOptionsWhat} />
														:
														this.editSubjectMenu(["Insert",["mv","ns"]],'a subject','mvv.s',this.state.mvvs,"Update",["mv","vs"],this.state.mvvs.join(""),this.state.mvSubjectOptions1)  
														)
													)
											}
										</span>
										)
									:
									null
								}


								{this.state.mvEnglish2.length > 0 ?
									(this.state.mvnsSegments.length === 0 || (this.state.mvvo.length > 0 && this.state.mvnoSegments.length === 0) ?
										<span style={{height:45,display:'inline-flex',alignItems:'center',marginBottom:'2px',marginTop:'2px'}}>
										{this.editMenu('mvEnglish2',-1)}
										</span>
										:
										<div style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
										{this.editMenu('mvEnglish2',-1)}
										</div>
										)
									:
									null
								}

								{this.state.mvvo.length > 0 ?
									(this.state.mvnoSegments.length > 0 && this.state.mvnoSegments.length === this.state.mvno.length ? 
										<div style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
											{this.state.mvnoSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.state.mvvBase[1] == 'it' && !this.arraysEqual(this.state.mvno[0][0],[0,0,0,1]) && !this.arraysEqual(this.state.mvno[0][0],[0,0,0,2]) && !this.arraysEqual(this.state.mvno[0][0],[0,0,0,3]) ?
															<span style={{color:this.getColor('mvns00.c')}}>{'(some of) '}</span>
															:
															null
														}
														{this.state.mvvBase[1] == 'it' && xind === this.state.mvnoSegments.length-1?
														<Dropdown inline scrolling style={this.getDropdownStyle('mvno'+(this.state.mvnoSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1,0],(data.value+this.state.mvno[this.state.mvnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvno[this.state.mvnoSegments.length-1][0].slice(0, -1).join("")} options={this.state.nounOptionsMVAblPossessors1} />
														:
														<Dropdown inline scrolling style={this.getDropdownStyle('mvno'+(this.state.mvnoSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1,0],(data.value+this.state.mvno[this.state.mvnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvno[this.state.mvnoSegments.length-1][0].slice(0, -1).join("")} options={this.state.nounOptionsMVPossessors1} />
														}
														<Dropdown inline scrolling style={this.getDropdownStyle('mvno'+(this.state.mvnoSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1,0],this.state.mvno[this.state.mvnoSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvno[this.state.mvnoSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('mvnoEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('mvnoEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}

													</span>
													:
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('mvno'+(this.state.mvnoSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1-xind,0],this.state.mvno[this.state.mvnoSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvno[this.state.mvnoSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('mvnoEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('mvnoEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}																					
													</span>
												}
												</span>
											)}
										</div>
										:
										<span>
											{this.state.mvvBase[1] == 'it' ?
												(this.state.mvvType == 'Intrg1' ?
													<Dropdown inline scrolling style={this.getDropdownStyle('mvv.o')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptionsWhomAbl} />		
													:
													(this.state.mvvType == 'Intrg3' ?
														<Dropdown inline scrolling style={this.getDropdownStyle('mvv.o')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptionsWhatAbl} />		
														:
														(this.editMenu('mvEnglishAbl',-1))
														)
													)
												:
												(this.state.mvvType == 'Intrg1' ?
													<Dropdown inline scrolling style={this.getDropdownStyle('mvv.o')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptionsWhom} />		
													:
													(this.state.mvvType == 'Intrg3' ?
														<Dropdown inline scrolling style={this.getDropdownStyle('mvv.o')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptionsWhat} />		
														:
														this.editSubjectMenu(["Insert",["mv","no"]],'an object','mvv.o',this.state.mvvo,"Update",["mv","vo"],this.state.mvvo.join(""),this.state.mvObjectOptions1)														
														)
													)										
											}
										</span>
									)
									:
									null
								}







								{this.state.mvEnglishQaa.length > 0 ? 
									this.editMenu('mvEnglishQaa',-1)
									:
									null
								}


								</div>


								{this.state.mvvs.length === 0 && this.state.npn.length === 0 ?
									<div style={{display:'flex',justifyContent:'center'}}>
										<div style={{width:'300px',display:'flex',flexDirection:'column'}}>
										<Accordion style={{color:'000000de',padding:'4px 9px',paddingBottom:'9px'}}>
							    		<Accordion.Title
							    			id={'vPhraseInsert'}
							    			active={this.state.activeIndexes.includes('vPhraseInsert')}
						            onClick={()=>{this.handleClick('vPhraseInsert',true)}}
							    		>
							    			<Icon name="dropdown" />
							    			{'Make a verb phrase'}
							    		</Accordion.Title>
							    		<Accordion.Content active={this.state.activeIndexes.includes('vPhraseInsert')}>
							    		{this.mainScreenMenu('I am _____','mvinsert','I',[],['',[1,1,0]])}
							    		{this.mainScreenMenu('you are _____','mvinsert','you',[],['',[2,1,0]])}
							    		{this.mainScreenMenu('he is _____','mvinsert','he',[],['',[3,1,1]])}
							    		{this.mainScreenMenu('she is _____','mvinsert','she',[],['',[3,1,2]])}
							    		{this.mainScreenMenu('it is _____','mvinsert','it',[],['',[3,1,3]])}
							    		{this.mainScreenMenu('the two of them are _____','mvinsert','they2',[],['',[3,2,0]])}
							    		{this.mainScreenMenu('they all (3+) are _____','mvinsert','they3',[],['',[3,3,0]])}
							    		</Accordion.Content>
							    	</Accordion>				
										<Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
							    		<Accordion.Title
							    			id={'nPhraseInsert'}
							    			active={this.state.activeIndexes.includes('nPhraseInsert')}
						            onClick={()=>{this.handleClick('nPhraseInsert',true)}}
							    		>
							    			<Icon name="dropdown" />
							    			{'Make a noun phrase'}
							    		</Accordion.Title>
							    		<Accordion.Content active={this.state.activeIndexes.includes('nPhraseInsert')}>
							    		{this.mainScreenMenu('the one _____','nPhraseInsert','npCase',['Abs',''],['',[]])}
							    		{this.mainScreenMenu('from the one _____','nPhraseInsert','npCase',['Abl_Mod','from'],['',[]])}
							    		{this.mainScreenMenu('in or at the one _____','nPhraseInsert','npCase',['Loc',''],['',[]])}
							    		{this.mainScreenMenu('toward the one _____','nPhraseInsert','npCase',['Ter',''],['',[]])}
							    		{this.mainScreenMenu('through, using the one _____','nPhraseInsert','npCase',['Via',''],['',[]])}
							    		{this.mainScreenMenu('like, similar to the one _____','nPhraseInsert','npCase',['Equ',''],['',[]])}
							    		<Divider />
							    		{this.mainScreenMenu('a or some _____','nPhraseInsert','npCase',['Abl_Mod','io'],['',[]])}
							    		{this.mainScreenMenu('the one (relative case) _____','nPhraseInsert','npCase',['Rel',''],['',[]])}
							    		</Accordion.Content>
							    	</Accordion>			
										<Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
							    		<Accordion.Title
							    			id={'questionInsert'}
							    			active={this.state.activeIndexes.includes('questionInsert')}
						            onClick={()=>{this.handleClick('questionInsert',true)}}
							    		>
							    			<Icon name="dropdown" />
							    			{'Ask a Question'}
							    		</Accordion.Title>
							    		<Accordion.Content active={this.state.activeIndexes.includes('questionInsert')}>
							    		{this.mainScreenMenu('he is _____ (yes or no)?','mvinsertqaa','mvinsertqaa',['Ind','qaa'],['',[3,1,1]])}
							    		{this.mainScreenMenu('who is he who is _____?','questionInsert','mvvType',['Intrg0',''],['',[3,1,1]])}
							    		{this.mainScreenMenu('she is _____ whom (object)?','questionInsert','mvvType',['Intrg1',''],['',[3,1,2]])}
							    		{this.mainScreenMenu('what is it that is _____ ?','questionInsert','mvvType',['Intrg2',''],['',[3,1,3]])}
							    		{this.mainScreenMenu('he is _____ what (object)?','questionInsert','mvvType',['Intrg3',''],['',[3,1,1]])}
							    		{this.mainScreenMenu('when did she _____?','questionInsert','mvvType',['Intrg4',''],['i',[3,1,2]])}
							    		{this.mainScreenMenu('when will he _____?','questionInsert','mvvType',['Intrg5',''],['i',[3,1,1]])}
							    		{this.mainScreenMenu('where is it _____?','questionInsert','mvvType',['Intrg6',''],['g',[3,1,3]])}
							    		{this.mainScreenMenu('from where is he _____?','questionInsert','mvvType',['Intrg7',''],['g',[3,1,1]])}
							    		{this.mainScreenMenu('to where is she _____?','questionInsert','mvvType',['Intrg8',''],['g',[3,1,2]])}
							    		{this.mainScreenMenu('why is it _____?','questionInsert','mvvType',['Intrg9',''],['g',[3,1,3]])}
							    		{this.mainScreenMenu('how is he _____?','questionInsert','mvvType',['IntrgA',''],['g',[3,1,1]])}
							    		</Accordion.Content>
							    	</Accordion>		

										<Accordion style={{color:'000000de',borderTop:'1px solid #2224261a',padding:'4px 9px',paddingBottom:'9px'}}>
							    		<Accordion.Title
							    			id={'commandInsert'}
							    			active={this.state.activeIndexes.includes('commandInsert')}
						            onClick={()=>{this.handleClick('commandInsert',true)}}
							    		>
							    			<Icon name="dropdown" />
							    			{'Make a Command'}
							    		</Accordion.Title>
							    		<Accordion.Content active={this.state.activeIndexes.includes('commandInsert')}>
							    		{this.mainScreenMenu('command right now','commandInsert','optCase',['Opt][PRS',''],['i',[2,1,0]])}
							    		{this.mainScreenMenu('command future','commandInsert','optCase',['Opt][FUT',''],['i',[2,1,0]])}
							    		{this.mainScreenMenu('do not ____','commandInsert','optCase',['Opt][PRS][NEG',''],['i',[2,1,0]])}
							    		{this.mainScreenMenu('do not ____ (future)?','commandInsert','optCase',['Opt][FUT][NEG',''],['i',[2,1,0]])}
							    		{this.mainScreenMenu('polite request','commandInsert','optCase',['Sbrd',''],['i',[2,1,0]])}
							    		{this.mainScreenMenu('polite do not ____','commandInsert','optCase',['Sbrd','neg'],['i',[2,1,0]])}
							    		</Accordion.Content>
							    	</Accordion>		
										</div>
									</div>
									:
									null
								}


								<div style={{textAlign:'center',fontSize:'18px',fontWeight:'300'}}>




								{this.state.mvnObliquesSegments.length > 0 && this.state.mvnObliquesSegments.length === this.state.mvnObliques.length && this.state.mvnObliquesSegments.length === this.state.mvnObliquesEnglish2.length ? 
									(this.state.mvnObliques.map((obliques,obliqueind)=>
										<div style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
											{obliques['n'].slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.editMenu('mvnObliquesEnglish1',obliqueind)}		
														{obliques['nCase'] == 'Equ' || obliques['nCase'] == 'Via' || obliques['nType'] == 'io' ? 
															<Dropdown inline scrolling style={this.getDropdownStyle('mvnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={this.state.nounOptionsMVAblPossessors1} />
															:
															<Dropdown inline scrolling style={this.getDropdownStyle('mvnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={this.state.nounOptionsMVPossessors1} />
														}					
														<Dropdown inline scrolling style={this.getDropdownStyle('mvnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('mvnObliquesEnglish2',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('mvnObliquesEnglish2appositive',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>															
															}}											
														)}														
													</span>
													:
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('mvnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('mvnObliquesEnglish2',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('mvnObliquesEnglish2appositive',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>															
															}}											
														)}				
													</span>
												}
												</span>
											)}
										</div>
										))
									:
									null
								}


								{this.state.npnSegments.length > 0 && this.state.npnSegments.length === this.state.npnEnglish2.length ? 
									<div>
										<span>					
											{/*{console.log(this.state.npn[this.state.npn.length-1][0], this.arraysEqual(this.state.npn[this.state.npn.length-1][0], [0,0,0,1]))}*/}

											<div style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
											{this.state.npnSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ? (
													<span>
													{this.editMenu('npnEnglish1',-1)}
													{this.state.npnCase == 'Equ' || this.state.npnCase == 'Via' || this.state.npCaseType == 'io' ? 
														<Dropdown inline scrolling style={this.getDropdownStyle('npn'+(this.state.npnSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1,0],(data.value+this.state.npn[this.state.npnSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.npn[this.state.npnSegments.length-1][0].slice(0, -1).join("")} options={this.state.nounOptionsMVAblPossessors1} />
														:
														<Dropdown inline scrolling style={this.getDropdownStyle('npn'+(this.state.npnSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1,0],(data.value+this.state.npn[this.state.npnSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.npn[this.state.npnSegments.length-1][0].slice(0, -1).join("")} options={this.state.nounOptionsMVPossessors1} />
													}
													<Dropdown inline scrolling style={this.getDropdownStyle('npn'+(this.state.npnSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1,0],this.state.npn[this.state.npnSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.npn[this.state.npnSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																

													{x.map((k,kind)=>
														{if (kind === x.length-1) {
															return <span>
																{this.editMenu('npnEnglish2',[xind,kind])}
															</span>
														} else {
															return <span>
																{this.editMenu('npnEnglish2appositive',[xind,kind])}
															</span>															
														}}											
													)}
													</span>
													)
													:
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('npn'+(this.state.npnSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1-xind,0],this.state.npn[this.state.npnSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.npn[this.state.npnSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('npnEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('npnEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}
													</span>
												}
												</span>
											)}

											</div>

										</span>
										{this.state.npnCase === 'Rel' ?
											<div style={{marginTop:'35px',fontSize:'12pt',color:'grey'}}>This ending (relative case) is used when the noun is a subject of a transitive verb or is the owner of something. By itself, it is likely a response to a question.</div>
											:
											null
										}
										{this.state.npnType === 'io' ?
											<div style={{marginTop:'35px',fontSize:'12pt',color:'grey'}}>This ending (ablative-modalis case) is used when a noun is an indirect object. For example, "Tangertuq yaqulegmek - He saw [a] bird" versus "Tangraa yaqulek - He saw [the] bird". By itself, it is likely a response to a question.</div>
											:
											null
										}
										</div>
										:
										null
								}


								

							</div>
							</div>



							<div style={{marginBottom:'30px'}}>

							 	{this.state.cvnsBases.length > 0 ? 
									<div>
										<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.cvnsSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('cvnsParser',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('cvnsappositiveParser',[kind,qind])}</span>												
													}
												})}
												</div>												

											)}
											</div>	

										</div>
									</div>
									:
									null
								}

								{this.state.cvvBase.length > 0 && this.state.cvvSegments.length > 0 ?
									this.editMenu('cvParser',-1)
									:
									null
								}
								

							 	{this.state.cvnoBases.length > 0 ? 
							 		<div>
										<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.cvnoSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('cvnoParser',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('cvnoappositiveParser',[kind,qind])}</span>												
													}
												})}
												</div>												

											)}
											</div>	
										</div>
									</div>
									:
									null
								}			

								{this.state.cvnObliquesSegments.length > 0 && this.state.cvnObliques.length === this.state.cvnObliquesSegments.length ?
									(this.state.cvnObliquesSegments.map((obliques,obliqueind)=>
										<div>
											<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
												<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
													{obliques.slice().reverse().map((x,xind)=> 
													<div style={{paddingRight:10,paddingLeft:10}}>
														{x.map((k,kind)=>
														{if (kind === 0) {
															return <span>{this.editMenu('cvnObliquesParser',[obliqueind,obliques.length-1-xind,kind])}</span>												
														} else {
															return <span>{this.editMenu('cvnObliquesAppositiveParser',[obliqueind,obliques.length-1-xind,kind])}</span>												
														}}
														)}
													</div>
													)}
												</div>
											</div>
										</div>									
									)):null
								}

{/*								{this.state.cvvs.length > 0 ?
									<div style={{display:'flex',justifyContent:'center',paddingBottom:10}}>
									{this.editMenu('defaultcv',-1)}
									</div>
									:
									null
								}								
*/}
								<div style={{textAlign:'center',fontSize:'18px',fontWeight:'300',marginTop:'20px'}}>

								{this.state.cvEnglish1.length > 0 ?
									this.editMenu('cvEnglish1',-1)
									:
									null
								}

								{this.state.cvvs.length > 0 ?
									(this.state.cvnsSegments.length > 0 && this.state.cvnsSegments.length === this.state.cvns.length ? 
										<span>					
											{this.state.cvnsSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('cvns'+(this.state.cvnsSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{console.log(event,data);this.backEndCall([["Update",["cv","ns",this.state.cvnsSegments.length-1,0],(data.value+this.state.cvns[this.state.cvnsSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvns[this.state.cvnsSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsPossessorsNo4th} />
														<Dropdown inline scrolling style={this.getDropdownStyle('cvns'+(this.state.cvnsSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{console.log(event,data);this.backEndCall([["Update",["cv","ns",this.state.cvnsSegments.length-1,0],this.state.cvns[this.state.cvnsSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvns[this.state.cvnsSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('cvnsEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('cvnsEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('cvns'+(this.state.cvnsSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{console.log(event,data);this.backEndCall([["Update",["cv","ns",this.state.cvnsSegments.length-1-xind,0],this.state.cvns[this.state.cvnsSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvns[this.state.cvnsSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('cvnsEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('cvnsEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}
													</span>
												}
												</span>
											)}
										</span>
										:
										this.editSubjectMenu(["Insert",["cv","ns"]],'a subject','cvv.s',this.state.cvvs,"Update",["cv","vs"],this.state.cvvs.join(""),this.state.cvSubjectOptions1)
										)
									:
									null
								}

								{this.state.cvEnglish2.length > 0 ? 
									<span style={{height:45,display:'inline-flex',alignItems:'center',marginBottom:'2px',marginTop:'2px'}}>
										{this.editMenu('cvEnglish2',-1)}
									</span>
									:
									null
								}


								{this.state.cvvo.length > 0 ?
									(this.state.cvnoSegments.length > 0 && this.state.cvnoSegments.length === this.state.cvno.length ? 
										<span>					
											{this.state.cvnoSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.state.cvvBase[1] == 'it' && !this.arraysEqual(this.state.cvno[0][0],[0,0,0,1]) ?
															<span style={{color:this.getColor('cvns00.c')}}>{'(some) '}</span>
															:
															null
														}

														{this.state.cvvBase[1] == 'it' && xind === this.state.cvnoSegments.length-1 ?
															<Dropdown inline scrolling style={this.getDropdownStyle('cvno'+(this.state.cvnoSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["cv","no",this.state.cvnoSegments.length-1,0],(data.value+this.state.cvno[this.state.cvnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvno[this.state.cvnoSegments.length-1][0].slice(0, -1).join("")} options={this.state.nounOptionsCVAblPossessors1} />
															:
															<Dropdown inline scrolling style={this.getDropdownStyle('cvno'+(this.state.cvnoSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["cv","no",this.state.cvnoSegments.length-1,0],(data.value+this.state.cvno[this.state.cvnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvno[this.state.cvnoSegments.length-1][0].slice(0, -1).join("")} options={this.state.nounOptionsCVPossessors1} />
														}
														<Dropdown inline scrolling style={this.getDropdownStyle('cvno'+(this.state.cvnoSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["cv","no",this.state.cvnoSegments.length-1,0],this.state.cvno[this.state.cvnoSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvno[this.state.cvnoSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('cvnoEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('cvnoEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('cvno'+(this.state.cvnoSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["cv","no",this.state.cvnoSegments.length-1-xind,0],this.state.cvno[this.state.cvnoSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvno[this.state.cvnoSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('cvnoEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('cvnoEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}
													</span>
												}
												</span>
											)}
										</span>
										:
										<span>
											{this.state.cvvBase[1] == 'it' ?
												(this.editMenu('cvEnglishAbl',-1))	
												:
												this.editSubjectMenu(["Insert",["cv","no"]],'an object','cvv.o',this.state.cvvo,"Update",["cv","vo"],this.state.cvvo.join(""),this.state.cvObjectOptions1)
											}
										</span>
									)
									:
									null
								}

{/*												<Dropdown inline scrolling style={this.getDropdownStyle('cvv.o')} onChange={(event,data)=>{if (data.value === 'mvsubject') {this.backEndCall([["Update",["cv","vo"],[4,1,["mv","vs"]]]])} else {this.backEndCall([["Update",["cv","vo"],data.value.split('').map(Number)]])}}}  value={this.state.cvvo.join("")} options={this.state.cvObjectOptions1} />								
*/}

								{this.state.cvnObliquesSegments.length > 0 && this.state.cvnObliquesSegments.length === this.state.cvnObliques.length ? 
									(this.state.cvnObliques.map((obliques,obliqueind)=>
										<div>					
											{obliques['n'].slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.editMenu('cvnObliquesEnglish1',obliqueind)}												
															{obliques['nCase'] == 'Equ' || obliques['nCase'] == 'Via' || obliques['nType'] == 'io' ? 
																<Dropdown inline scrolling style={this.getDropdownStyle('cvnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["cv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={this.state.nounOptionsCVAblPossessors1} />
																:
																<Dropdown inline scrolling style={this.getDropdownStyle('cvnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["cv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={this.state.nounOptionsCVPossessors1} />
															}
														<Dropdown inline scrolling style={this.getDropdownStyle('cvnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["cv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('cvnObliquesEnglish2',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('cvnObliquesEnglish2appositive',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>															
															}}											
														)}	
													</span>
													:
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('cvnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["cv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('cvnObliquesEnglish2',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('cvnObliquesEnglish2appositive',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>															
															}}											
														)}	
													</span>
												}
												</span>
											)}
										</div>
										))
									:
									null
								}


							</div>



								{this.state.svvBase.length > 0 && this.state.svvSegments.length > 0 ?
									this.editMenu('svParser',-1)
									:
									null
								}
								

							<div style={{textAlign:'center',fontSize:'18px',fontWeight:'300'}}>

							 	{this.state.svnoBases.length > 0 ? 
							 		<div>
										<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.svnoSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('svnoParser',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('svnoappositiveParser',[kind,qind])}</span>												
													}
												})}
												</div>												

											)}
											</div>	
										</div>
									</div>
									:
									null
								}		


								{this.state.svnObliquesSegments.length > 0 && this.state.svnObliques.length === this.state.svnObliquesSegments.length ?
									(this.state.svnObliquesSegments.map((obliques,obliqueind)=>
										<div>
											<div style={{marginBottom:'5px',fontSize:'30px',fontWeight:'400'}}>
												<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
													{obliques.slice().reverse().map((x,xind)=> 
													<div style={{paddingRight:10,paddingLeft:10}}>
														{x.map((k,kind)=>
														{if (kind === 0) {
															return <span>{this.editMenu('svnObliquesParser',[obliqueind,obliques.length-1-xind,kind])}</span>												
														} else {
															return <span>{this.editMenu('svnObliquesAppositiveParser',[obliqueind,obliques.length-1-xind,kind])}</span>												
														}}
														)}
													</div>
													)}
												</div>
											</div>
										</div>									
									)):null
								}
	
							<div style={{textAlign:'center',fontSize:'18px',fontWeight:'300',marginTop:'20px'}}>
								{this.state.svEnglish1.length > 0 ?
									<span style={{height:45,display:'inline-flex',alignItems:'center',marginBottom:'2px',marginTop:'2px'}}>
									{this.editMenu('svEnglish1',-1)}
									</span>
									:
									null
								}

								{this.state.svvo.length > 0 ?
									(this.state.svnoSegments.length > 0 && this.state.svnoSegments.length === this.state.svno.length ? 
										<span>
											{this.state.svnoSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.state.svvBase[1] == 'it' && !this.arraysEqual(this.state.svno[0][0],[0,0,0,1]) ?
															<span style={{color:this.getColor('svns00.c')}}>{'(some) '}</span>
															:
															null
														}

														{this.state.svvBase[1] == 'it' && xind === this.state.svnoSegments.length-1 ?
															<Dropdown inline scrolling style={this.getDropdownStyle('svno'+(this.state.svnoSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["sv","no",this.state.svnoSegments.length-1,0],(data.value+this.state.svno[this.state.svnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.svno[this.state.svnoSegments.length-1][0].slice(0, -1).join("")} options={this.state.nounOptionsSVAblPossessors1} />
															:
															<Dropdown inline scrolling style={this.getDropdownStyle('svno'+(this.state.svnoSegments.length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["sv","no",this.state.svnoSegments.length-1,0],(data.value+this.state.svno[this.state.svnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.svno[this.state.svnoSegments.length-1][0].slice(0, -1).join("")} options={this.state.nounOptionsSVPossessors1} />
														}
														<Dropdown inline scrolling style={this.getDropdownStyle('svno'+(this.state.svnoSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["sv","no",this.state.svnoSegments.length-1,0],this.state.svno[this.state.svnoSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.svno[this.state.svnoSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('svnoEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('svnoEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('svno'+(this.state.svnoSegments.length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["sv","no",this.state.svnoSegments.length-1-xind,0],this.state.svno[this.state.svnoSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.svno[this.state.svnoSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('svnoEnglish2',[xind,kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('svnoEnglish2appositive',[xind,kind])}
																</span>															
															}}											
														)}
													</span>
												}
												</span>
											)}
										</span>
										:
										<span>
											{this.state.svvBase[1] == 'it' ?
												(this.editMenu('svEnglishAbl',-1))		
												:
												this.editSubjectMenu(["Insert",["sv","no"]],'an object','svv.o',this.state.svvo,"Update",["sv","vo"],this.state.svvo.join(""),this.state.svObjectOptions1)			

											}
										</span>
									)
									:
									null
								}


								{this.state.svnObliquesSegments.length > 0 && this.state.svnObliquesSegments.length === this.state.svnObliques.length ? 
									(this.state.svnObliques.map((obliques,obliqueind)=>
										<div>					
											{obliques['n'].slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.editMenu('svnObliquesEnglish1',obliqueind)}														
															{obliques['nCase'] == 'Equ' || obliques['nCase'] == 'Via' || obliques['nType'] == 'io' ? 
																<Dropdown inline scrolling style={this.getDropdownStyle('svnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["sv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.svnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.svnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={this.state.nounOptionsSVAblPossessors1} />
																:
																<Dropdown inline scrolling style={this.getDropdownStyle('svnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.pd')} onChange={(event,data)=>{this.backEndCall([["Update",["sv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.svnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.svnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={this.state.nounOptionsSVPossessors1} />
															}
														<Dropdown inline scrolling style={this.getDropdownStyle('svnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["sv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.svnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.svnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('svnObliquesEnglish2',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('svnObliquesEnglish2appositive',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>															
															}}											
														)}	
													</span>
													:
													<span>
														<Dropdown inline scrolling style={this.getDropdownStyle('svnObliques'+obliqueind.toString()+(obliques['n'].length-1-xind).toString()+'0.ps')} onChange={(event,data)=>{this.backEndCall([["Update",["sv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.svnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.svnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{x.map((k,kind)=>
															{if (kind === x.length-1) {
																return <span>
																	{this.editMenu('svnObliquesEnglish2',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>
															} else {
																return <span>
																	{this.editMenu('svnObliquesEnglish2appositive',[obliqueind,obliques['n'].length-1-xind,x.length-1-kind])}
																</span>															
															}}											
														)}	
													</span>
												}
												</span>
											)}
										</div>
										))
									:
									null
								}



							</div>
							</div>

							</div>



							{this.state.mvvs.length > 0 && this.state.cvvBase.length == 0 && this.state.svvBase.length == 0 ?
									<div style={{display:'flex',justifyContent:'center',marginTop:'50px'}}>
										<div style={{width:'300px',display:'flex',flexDirection:'column'}}>
										<Accordion style={{padding:'4px 9px',paddingBottom:'9px'}}>
							    		<Accordion.Title
							    			id={'nObliqueInsert'}
                				style={{color:(this.state.activeIndexes.includes('nObliqueInsert') ? '#000000' : '#00000066')}}
							    			active={this.state.activeIndexes.includes('nObliqueInsert')}
						            onClick={()=>{
						            	this.handleClick('nObliqueInsert',true)
									      	this.setState({
													candidateCall:[],
													candidateBase:[],
													candidateDisplay:[],
													unallowable_next_ids:[],
													nextTenses:[],			      		
									      	})
						            }}
							    		>
							    			<Icon name="dropdown" />
							    			{'Add location, direction, etc.'}
							    		</Accordion.Title>
							    		<Accordion.Content active={this.state.activeIndexes.includes('nObliqueInsert')}>
							    		{this.mainScreenMenu('from the one _____','nObliqueInsert','npCase',['Abl_Mod','from'],['',[]])}
							    		{this.mainScreenMenu('in or at the one _____','nObliqueInsert','npCase',['Loc',''],['',[]])}
							    		{this.mainScreenMenu('toward the one _____','nObliqueInsert','npCase',['Ter',''],['',[]])}
							    		{this.mainScreenMenu('through, using the one _____','nObliqueInsert','npCase',['Via',''],['',[]])}
							    		{this.mainScreenMenu('like, similar to the one _____','nObliqueInsert','npCase',['Equ',''],['',[]])}
							    		</Accordion.Content>
							    		<Accordion.Title
							    			id={'cvinsert'}
                				style={{color:(this.state.activeIndexes.includes('nObliqueInsert') ? '#000000' : '#00000066')}}
							    			active={this.state.activeIndexes.includes('cvinsert')}
						            onClick={()=>{
						            	this.handleClick('cvinsert',true);
									      	this.setState({
													candidateCall:[],
													candidateBase:[],
													candidateDisplay:[],
													unallowable_next_ids:[],
													nextTenses:[],			      		
									      	})
						            }}
							    		>
							    			<Icon name="dropdown" />
							    			{'Add an additional verb phrase'}
							    		</Accordion.Title>
							    		<Accordion.Content active={this.state.activeIndexes.includes('cvinsert')}>
							    		{this.mainScreenMenu('before '+mvSubjectOptionsEnglish[this.state.mvvs.join("")]+' _____','cvinsert','cvvType',['Prec',''],['',this.state.mvvs])}
							    		{this.mainScreenMenu('because '+mvSubjectOptionsEnglish[this.state.mvvs.join("")]+' _____','cvinsert','cvvType',['Cnsq',''],['',this.state.mvvs])}
							    		{this.mainScreenMenu('whenever '+mvSubjectOptionsEnglish[this.state.mvvs.join("")]+' _____','cvinsert','cvvType',['Cont',''],['',this.state.mvvs])}
							    		{this.mainScreenMenu('even though '+mvSubjectOptionsEnglish[this.state.mvvs.join("")]+' _____','cvinsert','cvvType',['Conc',''],['',this.state.mvvs])}
							    		{this.mainScreenMenu('even if '+mvSubjectOptionsEnglish[this.state.mvvs.join("")]+' _____','cvinsert','cvvType',['Conc','evenif'],['',this.state.mvvs])}
							    		{this.mainScreenMenu('if '+mvSubjectOptionsEnglish[this.state.mvvs.join("")]+' _____','cvinsert','cvvType',['Cond','if'],['',this.state.mvvs])}
							    		{this.mainScreenMenu('when (in future) '+mvSubjectOptionsEnglish[this.state.mvvs.join("")]+' _____','cvinsert','cvvType',['Cond','wheninthefuture'],['',this.state.mvvs])}
							    		{this.mainScreenMenu('when (in past) '+mvSubjectOptionsEnglish[this.state.mvvs.join("")]+' _____','cvinsert','cvvType',['CtmpI',''],['',this.state.mvvs])}
							    		{this.mainScreenMenu('while '+mvSubjectOptionsEnglish[this.state.mvvs.join("")]+' _____','cvinsert','cvvType',['CtmpII',''],['',this.state.mvvs])}
							    		{this.mainScreenMenu('by _____','svinsert','svvType',['by',''],['g',[]])}
							    		{this.mainScreenMenu('being _____','svinsert','svvType',['being',''],['g',[]])}
							    		</Accordion.Content>
							    	</Accordion>		
										</div>
									</div>
								:
								<div style={{height:'40px'}} />
							}

				{!this.fromEntry && this.state.mvvBase.length === 0 && this.state.npnBases.length === 0 ?
					(this.state.glossary ? 
						<SentenceGlossary backEndCall={this.backEndCall.bind(this)} getColor={this.getColor.bind(this)} />
						:
	        	<SentenceTemplates flipGlossary={this.flipGlossary.bind(this)} backEndCall={this.backEndCall.bind(this)} getColor={this.getColor.bind(this)} />
	        )
					:
					null
				}


					</div>

				</Container>

			</div>

          <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',height:60,paddingBottom:16,paddingTop:25}}>
            <Image style={{height:'30px',opacity:0.65}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            <Image style={{height:'30px',opacity:0.65}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            <Image style={{height:'30px',opacity:0.65}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            <Image style={{height:'30px',opacity:0.65}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
          </div>

				<div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginTop:'10px'}}>
				<span style={{fontSize:'14px',color:'grey',padding:'15px',fontWeight:'400',lineHeight:'23px'}}>
				<span style={{textDecoration:'underline'}}>Disclaimer:</span> Please note that there may be mistakes with word results and translations. The automated computer rules that produce these words don't often reflect common language use, context, and cultural knowledge. 
				</span>
				<span style={{fontSize:'14px',color:'grey',padding:'15px',fontWeight:'400',lineHeight:'23px'}}>
				Website and sentence builder production provided by <a style={{color:'#306190'}} href="https://yuarcuun.github.io" target="_blank" >Yuarcuun Technologies</a> in partnership with the Native Village of Kwinhagak (NVK). This website was made possible by Grant Number 90XN0110-01-00 from Administration for Native Americans.
				</span>
				</div>



			</Grid.Column>  
			</Grid.Row>

				
			</Grid>

			</div>


			</Container>
		);
	}
}
export default SentenceBuilder;