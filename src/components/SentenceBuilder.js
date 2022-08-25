import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Image, Grid, Dropdown, List, Label, Input, Segment, Popup, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../App.js';
import axios from 'axios';
import {nounOptionsMVPossessors, nounOptionsMVAblPossessors,nounOptionsCVAblPossessors, mvSubjectOptionsWho, mvSubjectOptionsWhat, mvObjectOptionsWhom, mvObjectOptionsWhomAbl, mvObjectOptionsWhat, mvObjectOptionsWhatAbl,retrieveMoodEnglish, nounOptionsCVPossessors, nounOptionsSVPossessors, nounOptionsPossessorsNo4th, mvSubjectOptionsOnly2nd, nounOptionsNumbers, nounoptionsmodalis, mvSubjectOptions, mvSubjectOptionsNo4th, mvObjectOptions, mvSubjectOptionsEnglish, cvSubjectOptions, cvObjectOptions, mvObjectOptionsNo4th, verbPostbases, nounPostbases, VVpostbases, NNpostbases} from './constants/newconstants.js'
import {ending_underlying} from './constants/ending_underlying.js'
import palette from 'google-palette';
import shuffle from 'shuffle-array';
// import { TagColors } from './SentenceBulderHelpe.js';
import fuzzysort from 'fuzzysort'
import now from 'performance-now';
import ReactGA from 'react-ga';
// import SentenceTemplates from './SentenceTemplates.js'
import { sentenceTemplates } from './constants/sentence_templates.js'


let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"

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

let instructionSet = {
0:[["Insert", ["mv"], [[["yuvrir-", 0, 2, 0], ["@~+niar-", 0, 0, 0]], "t", "Ind"]], ["Update", ["mv", "vs"], [2, 1, 0]], ["Update", ["mv", "vo"], [3, 1, 3]], ["Insert", ["mv", "no"], [[["kaassaq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["cv"], [[["ayag¹-", 0, 0, 0]], "i", "Prec"]], ["Update", ["cv", "vs"], [2, 1, 0]]],
1:[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],
2:[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [1, 1, 0, 1], "Abs"]]],
3:[["Insert", ["np"], [[["pamyuq,pamsuq", 0, 0, 0]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", -1], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1]]]],
4:[["Insert", ["np"], [[["imarpik,imarpak", 0, 0, 0]], [0, 0, 0, 1], "Loc"]]],
5:[["Insert", ["np"], [[["kipusvik,kipuyvik", 0, 0, 0]], [0, 0, 0, 1], "Ter"]]],
6:[["Insert", ["np"], [[["Mamterilleq", 0, 0, 0]], [0, 0, 0, 1], "Abl_Mod"]]],
7:[["Insert", ["np"], [[["tengssuun", 0, 0, 0]], [0, 0, 0, 1], "Via"]]],
8:[["Insert", ["np"], [[["qimugta", 0, 0, 0]], [0, 0, 0, 1], "Equ"]]],
9:[["Insert", ["np"], [[[]], [0, 0, 0, 1], "Abs"]], ["Insert", ["np", "n", 0, -1], [[["arnaq", 0, 0, 0]], [0, 0, 0, 1]]]],
10:[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-rpak,-rpag-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],
11:[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-cuar(aq*)", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],
12:[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-ya(g)aq*,-yagaq*,-ya(g)ar-,-yagar-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],
13:[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["-kegtaar(aq*)", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],
14:[["Insert", ["np"], [[["piipiq", 0, 0, 0], ["+(ng)uaq,@~+(ng)uar-", 0, 0, 0]], [0, 0, 0, 1], "Abs"]]],
15:[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]]],
16:[["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]],
17:[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]]],
18:[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]],
19:[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],
20:[["Insert", ["mv"], [[["nere-", 0, 1, 0]], "it", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],
21:[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]]],
22:[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]]],
23:[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],
24:[["Insert", ["mv"], [[["nere-", 0, 2, 0]], "t", "Ind"]], ["Insert", ["mv", "ns"], [[["piipiq", 0, 0, 0]], [0, 0, 0, 1]]], ["Insert", ["mv", "no"], [[["akutaq", 0, 0, 1]], [0, 0, 0, 1]]]],}

const optionsFuzzy = {
  keys: ['yupikword', 'englishnorm'],
  limit: 10, // don't return more results than you need!
  threshold: -10000, // don't return bad results
};

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
	'npnEnglish1',
	'npnEnglish2',
	'mvnObliquesEnglish1',
	'mvnObliquesEnglish2',
	'cvnObliquesEnglish1',
	'cvnObliquesEnglish2',
]

// let retrieveMoodEnglish = {
// 	'Prec':'before'
// }


let dictionary = [];
let usageDictionary = [];
let dictionary_dict = {};

class OneVerbWordBuilder extends Component {
	constructor(props) {
		super(props);
		// console.log(decodeURI(props.match.params.num))
		this.state = {
			otherBases: [],
			colorsList: {
				'mvv.b':'#000000',
				'mvv.e':'#852828',
				'mvv.s':'#852828',
				'mvv.o':'#852828',
				'mvv.m':'#838383',
				'mvv.1':'#3455b5',
				'mvv.2':'#d3741e',
				'mvv.3':'#c062c3',
				'mvv.4':'#008000',
				'mvv.5':'#69b4b4',
				'mvv.6':'#e02323',


				'mvns00.b':'#852828',
				'mvns00.1':'#b53434',
				'mvns00.2':'#578f7f',
				'mvns00.e':'#f29090',
				// 'mvns10.b':'#852828',
				// 'mvv.4':'#000000',
			},
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
			svvs:[],
			svvo:[],
			svvCase:'',

			svvSegments:"",
			svnsSegments:[],
			svnoSegments:[],



			npn:[],
			npnBases:[],
			npnCase:[],
			npnSegments:[],


			mvnObliquesSegments: [],
			cvnObliquesSegments: [],

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

			mvnObliques:[],
			cvnObliques:[],

			candidateBase:[],
			candidateFST:[],
			candidateType:'',
			showUnderlying:false,
			lockSubmit:false,

			showShortcuts:false,
			svvText:'',
			interCase:'',
			endingAdjusted:'',

			requirePostbase: '',
			optCase: '',


		}
   //  if (decodeURI(props.match.params.num) in instructionSet) {
			// this.backEndCall(instructionSet[decodeURI(props.match.params.num)])
   //  }

    // if (decodeURI(props.match.params.num) in sentenceTemplates) {
			// this.backEndCall(sentenceTemplates[decodeURI(props.match.params.num)][2])
    // }
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
					let filteredDictVit = usageDictionary.filter(entry => (entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')))

    // let wordsList = fuzzysort.go(word, filteredDictionary, optionsFuzzy).map(({ obj }) => (obj));

          this.setState({ usageDictionary: usageDictionary, filteredDictV: filteredDictV, filteredDictVit: filteredDictVit, filteredDictN: filteredDictN});
        });
    }

}




	setDefaultInstructions = (num, event, data) => {
		// instructionSet[num].map((x)=>{
		// 	console.log(x)
		this.backEndCall(instructionSet[num])
		// })
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
				mvnObliques:[],
      	mvnObliquesSegments: [],
      	mvvSegments: [],
      	mvnsSegments: [],
      	mvnoSegments: [],
      	mvEnglish1: [],
      	mvEnglish2: [],
      	mvEnglish3: [],
      	mvEnglishAbl: [],
      	mvqWord: [],
      	mvqWordSegments: [],
      	optCase:'',
      	interCase:'',
			})

		} else if (type === 'cv') {
			this.setState({
				cvvBase:[],
				cvnsBases:[],
				cvnoBases:[],
				cvno:[],				
				cvns:[],
				cvvMood:"",
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
			})			
		} else if (type === 'sv') {
			this.setState({
				svvBase:[],
				svnsBases:[],
				svnoBases:[],
				svno:[],				
				svns:[],
				svvMood:"",
				svvs:[],
				svvo:[],
				svnObliques:[],
      	svnObliquesSegments: [],
      	svvSegments: [],
      	svnoSegments: [],
      	svEnglish1:[],
      	svEnglish2:[],
			})			
		} else if (type === 'np') {
			this.setState({
				npn:[],
				npnBases:[],
				npnCase:[],
		    npnSegments: [],
		    npnEnglish1: [],
		    npnEnglish2: [],
			})			
		}
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
			if (this.state.mvnsBases.length > 0) {mv['nsBases']=this.state.mvnsBases}
			if (this.state.mvnoBases.length > 0) {mv['noBases']=this.state.mvnoBases}
			if (this.state.mvno.length > 0) {mv['no']=this.state.mvno}
			if (this.state.mvns.length > 0) {mv['ns']=this.state.mvns}

			if (this.state.mvvMood.length > 0) {mv['vMood']=this.state.mvvMood}
			if (this.state.mvvs.length > 0) {mv['vs']=this.state.mvvs}
			if (this.state.mvvo.length > 0) {mv['vo']=this.state.mvvo}
			if (this.state.mvnObliques.length > 0) {mv['nObliques']=this.state.mvnObliques}
			if (this.state.mvqWord.length > 0) {mv['qWord']=this.state.mvqWord}

			if (this.state.cvvBase.length > 0) {cv['vBase']=this.state.cvvBase}
			if (this.state.cvnsBases.length > 0) {cv['nsBases']=this.state.cvnsBases}
			if (this.state.cvnoBases.length > 0) {cv['noBases']=this.state.cvnoBases}
			if (this.state.cvno.length > 0) {cv['no']=this.state.cvno}
			if (this.state.cvns.length > 0) {cv['ns']=this.state.cvns}
			if (this.state.cvvMood.length > 0) {cv['vMood']=this.state.cvvMood}
			if (this.state.cvvs.length > 0) {cv['vs']=this.state.cvvs}
			if (this.state.cvvo.length > 0) {cv['vo']=this.state.cvvo}
			if (this.state.cvnObliques.length > 0) {cv['nObliques']=this.state.cvnObliques}

			if (this.state.svvBase.length > 0) {sv['vBase']=this.state.svvBase}
			if (this.state.svnsBases.length > 0) {sv['nsBases']=this.state.svnsBases}
			if (this.state.svnoBases.length > 0) {sv['noBases']=this.state.svnoBases}
			if (this.state.svno.length > 0) {sv['no']=this.state.svno}
			if (this.state.svns.length > 0) {sv['ns']=this.state.svns}
			if (this.state.svvMood.length > 0) {sv['vMood']=this.state.svvMood}
			if (this.state.svvs.length > 0) {sv['vs']=this.state.svvs}
			if (this.state.svvo.length > 0) {sv['vo']=this.state.svvo}

			if (this.state.npn.length > 0) {np['n']=this.state.npn}
			if (this.state.npnBases.length > 0) {np['nBases']=this.state.npnBases}
			if (this.state.npnCase.length > 0) {np['nCase']=this.state.npnCase}

		}

		if (this.state.interCase == 'Intrg4' || this.state.interCase == 'Intrg5') {
			this.setState({
				requirePostbase:this.state.interCase,
			})
		} else if (this.state.cvvMood === 'Cont' || this.state.cvvMood === 'CtmpI' || this.state.cvvMood === 'CtmpII') {
			this.setState({
				requirePostbase:this.state.cvvMood,
			})			
		} else {
			this.setState({
				requirePostbase:'',
			})			
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
      	let vkey
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
      		vOptions.map((k)=>{
      			vkey = 'mv'+k
      			if (k in response.data['mv']) {
			        // this.setState({
			        	// [vkey]: response.data['mv'][k],
			        // })

      				updateDict[[vkey]] = response.data['mv'][k]

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
      		vOptions.map((k)=>{
      			vkey = 'cv'+k
      			if (k in response.data['cv']) {
      				updateDict[[vkey]] = response.data['cv'][k]
			        // this.setState({
			        	// [vkey]: response.data['cv'][k],
			        // })
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
      		if (this.state.svvCase.length > 0) {
      			updateDict['svEnglish1']=[[this.state.svvCase, 'svv.e']].concat(updateDict['svEnglish1'])
      			// this.setState({svEnglish1:[[this.state.svvCase, 'svv.e']].concat(this.state.svEnglish1)})
      		}
      	} else {
      		this.initialize('sv')
      	}

      	if ("np" in response.data) {
      		Object.keys(response.data['np']).map((k)=>{
      			let npkey = 'np'+k
		        // this.setState({
		        // 	[npkey]: response.data['np'][k],
		        // })
      			updateDict[[npkey]] = response.data['np'][k]

      		})
      	} else {
      		this.initialize('np')
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


      	this.setState(updateDict)

      	// Object.keys(updateDict).map((k)=>{
      		// this.setState({[k]:updateDict[k]})
      	// })
      	

  		})

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


	onChangeBaseSearch = (endingNeeded,event,data) => {
		let word = data.value
		let wordsList
		let filteredDictV = {}
		if (this.state.interCase == 'Intrg1' || this.state.interCase == 'Intrg3') {
			filteredDictV = this.state.filteredDictVit
		} else {
			filteredDictV = this.state.filteredDictV
		}
		console.log(this.state)
		if (this.state.endingAdjusted == 'n') {
	    	wordsList = fuzzysort.go(word, this.state.filteredDictN, optionsFuzzy).map(({ obj }) => (obj));
	    	this.setState({ wordsList: wordsList, searchQuery: word });
		} else if (this.state.endingAdjusted == 'v') {
	    	wordsList = fuzzysort.go(word, filteredDictV, optionsFuzzy).map(({ obj }) => (obj));
	    	this.setState({ wordsList: wordsList, searchQuery: word });
		} else {
			if (endingNeeded === 'v') {
	    	wordsList = fuzzysort.go(word, filteredDictV, optionsFuzzy).map(({ obj }) => (obj));
	    	this.setState({ wordsList: wordsList, searchQuery: word });
			} else if (endingNeeded === 'n') {
	    	wordsList = fuzzysort.go(word, this.state.filteredDictN, optionsFuzzy).map(({ obj }) => (obj));
	    	this.setState({ wordsList: wordsList, searchQuery: word });
			}
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
  	// console.log(this.state)
  	// console.log('trigger',type,ind)
  	if (type==='default') {
  		return <Button size='large' icon>
							 <Icon name='plus' />
						 </Button>
  	} else if (type==='defaultverbphrase') {
  		return <Button size='large' icon>
							 <Icon name='plus' />
						 </Button>
  	} else if (type==='defaultmv') {
  		return <Button size='small' icon>
							 <Icon name='plus' />
						 </Button>
  	} else if (type==='defaultcv') {
  		return <Button size='small' icon>
							 <Icon name='plus' />
						 </Button>
  	} else if (type==='defaultsv') {
  		return <Button size='small' icon>
							 <Icon name='plus' />
						 </Button>
  	} else if (type==='mvns') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.mvnsSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
										)}		
								</div>						
							</div>
  	} else if (type==='mvnsappositive') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.mvnsSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
										)}								
								</div>													
							</div>			
  	} else if (type==='mvno') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.mvnoSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
										)}
								</div>													
							</div>	
  	} else if (type==='mvnoappositive') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.mvnoSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>													
							</div>			
  	} else if (type==='cvns') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.cvnsSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>						
							</div>
  	} else if (type==='cvnsappositive') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.cvnsSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>													
							</div>			
  	} else if (type==='cvno') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.cvnoSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>													
							</div>	
  	} else if (type==='svno') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.svnoSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>													
							</div>	
  	} else if (type==='svnoappositive') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.svnoSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>													
							</div>			
  	} else if (type==='cvnoappositive') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.cvnoSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>													
							</div>			
  	} else if (type==='mv' || type == 'mvQuestion') {
  		return 	<div style={{marginBottom:10,fontSize:'30px',color:'#000000',fontWeight:'400'}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.mvvSegments.map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>
							</div>
  	} else if (type==='mvqWord') {
  		return 	<div style={{marginBottom:10,fontSize:'30px',color:'#000000',fontWeight:'400'}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.mvqWordSegments.map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>
							</div>
  	} else if (type==='cv') {
  		return 	<div style={{marginBottom:10,fontSize:'30px',color:'#000000',fontWeight:'400'}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.cvvSegments.map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>
							</div>
  	} else if (type==='sv') {
  		return 	<div style={{marginBottom:10,fontSize:'30px',color:'#000000',fontWeight:'400'}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.svvSegments.map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>
							</div>
  	} else if (type==='npn') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.npnSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>
							</div>
  	} else if (type==='npnappositive') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.npnSegments.slice().reverse()[ind[0]][ind[1]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>
							</div>
  	} else if (type==='mvnObliques' || type==='mvnObliquesAppositive') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.mvnObliquesSegments[ind[0]][ind[1]][ind[2]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>
							</div>
  	} else if (type==='cvnObliques' || type==='cvnObliquesAppositive') {
  		return 	<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
								<div style={{cursor:'pointer',display:'flex',justifyContent:'center', lineHeight:'35px'}}>
									{this.state.cvnObliquesSegments[ind[0]][ind[1]][ind[2]].map((t)=>
										<span style={{color:this.state.colorsList[t[1]]}}>{t[0]}</span>
									)}
								</div>
							</div>
  	}
    	
  }

  requiredPostbases = () => {
  	return <div>hi</div>
  }

  contentItems = (type,ind) => {
  	// console.log('content',type,ind)
  	if (this.state.currentEditMode==='default') {
  		if (type === 'default') {
  			return <Menu vertical>
			      {this.menuItem('BaseChooser','Add Main Verb Phrase','mvinsert',null,null)}
			      {this.menuItem('BaseChooser','Add Noun Phrase','npinsert',null,null)}
			      {this.subMenuItem('addQuestion')}
			      {this.subMenuItem('addCommand')}
			    	</Menu>  			
  		} else if (type === 'defaultmv') {
				return <Menu vertical>
						{this.state.mvvs.length > 0 && this.state.mvns.length == 0 && this.state.interCase !== 'Intrg0' && this.state.interCase !== 'Intrg2' ? this.menuItem('BaseChooser','Add Noun Subject','mvnsinsert',null) : null}
						{this.state.mvvo.length > 0 && this.state.mvno.length == 0 && this.state.interCase !== 'Intrg1' && this.state.interCase !== 'Intrg3' ? this.menuItem('BaseChooser','Add Noun Object','mvnoinsert',null) : null}
			      {this.subMenuItem('addnOblique')}
			    	</Menu>  			
  		} else if (type === 'defaultcv') {
				return <Menu vertical>
						{this.state.cvvs.length > 0 && this.state.cvns.length == 0 ? this.menuItem('BaseChooser','Add Connective Noun Subject','cvnsinsert',null) : null}
						{this.state.cvvo.length > 0 && this.state.cvno.length == 0 ? this.menuItem('BaseChooser','Add Connective Noun Object','cvnoinsert',null) : null}
			      {this.subMenuItem('caddnOblique')}
			    	</Menu>  			
  		}else if (type === 'defaultsv') {
				return <Menu vertical>
						{this.state.svvo.length > 0 && this.state.svno.length == 0 ? this.menuItem('BaseChooser','Add Subordinative Noun Object','svnoinsert',null) : null}
			    	</Menu>  			
  		} else if (type === 'defaultverbphrase' && this.state.cvvs.length === 0 ) {
				return <Menu vertical>
			      {this.subMenuItem('addCV')}
			      {this.subMenuItem('addSV')}
						{/*{this.menuItem('BaseChooser','Add Connective Verb Phrase','mvcvinsert',null)}*/}
						{/*{this.menuItem('BaseChooser','Add Subordinative Verb Phrase','mvcvinsert',null)}*/}
			    	</Menu>  			
  		} else if (type === 'mv') {
				return <Menu vertical>
			      {this.menuItem('BaseChooser','Change Main Verb','mvupdate',null)}
			      {this.state.requirePostbase.length > 0 ?
			      	this.subMenuItem('changeRequiredPostbase')
			      	:
			      	null
			      }
			      {this.state.optCase.length > 0 ?
			      	this.subMenuItem('switchOptative')
			      	:
			      	null
			      }
			      {this.menuItem('Delete','Delete Main Verb',null,null,[["Delete",["mv",],-1]])}
			    	</Menu>
 			} else if (type === 'mvqWord') {
				return <Menu vertical>
			      {this.subMenuItem('changeQuestiontype')}
			    	</Menu>
 			} else if (type === 'cv') {
				return <Menu vertical>
			      {this.menuItem('BaseChooser','Change Connective Verb','cvupdate',null)}
			      {this.subMenuItem('changeCVtype')}
			      {this.menuItem('Delete','Delete Connective Verb',null,null,[["Delete",["cv",],-1]])}
			    	</Menu>
 			} else if (type === 'sv') {
				return <Menu vertical>
			      {this.subMenuItem('changeSV')}
			      {this.menuItem('BaseChooser','Change Subordinative Verb','svupdate',null)}
			      {this.menuItem('Delete','Delete Subordinative Verb',null,null,[["Delete",["sv",],-1]])}
			    	</Menu>
 			} else if (type === 'svno') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Noun','svnoupdate',null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun','svnopossessorinsert',null) : null}
			      {ind[0] == this.state.svno.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun','svnopossessedinsert',null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun','svnoappositiveinsert',null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["sv","no",this.state.svno.length-1-ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type === 'mvns') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Noun','mvnsupdate',null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun','mvnspossessorinsert',null) : null}
			      {ind[0] == this.state.mvns.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun','mvnspossessedinsert',null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun','mvnsappositiveinsert',null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["mv","ns",this.state.mvns.length-1-ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type === 'mvnsappositive') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Descriptor Noun','mvnsupdate',null)}
			      {this.menuItem('Delete','Delete Descriptor Noun',null,null,[["Delete",["mv","ns",this.state.mvns.length-1-ind[0],ind[1]],-1]])}
			    	</Menu>  			
 			} else if (type === 'mvnoappositive') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Descriptor Noun','mvnoupdate',null)}
			      {this.menuItem('Delete','Delete Descriptor Noun',null,null,[["Delete",["mv","no",this.state.mvno.length-1-ind[0],ind[1]],-1]])}
			    	</Menu>  			
 			} else if (type === 'mvno') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Noun','mvnoupdate',null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun','mvnopossessorinsert',null) : null}
			      {ind[0] == this.state.mvno.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun','mvnopossessedinsert',null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun','mvnoappositiveinsert',null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["mv","no",this.state.mvno.length-1-ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type === 'cvns') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Noun','cvnsupdate',null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun','cvnspossessorinsert',null) : null}
			      {ind[0] == this.state.cvns.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun','cvnspossessedinsert',null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun','cvnsappositiveinsert',null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["cv","ns",this.state.cvns.length-1-ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type === 'cvno') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Noun','cvnoupdate',null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun','cvnopossessorinsert',null) : null}
			      {ind[0] == this.state.cvno.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun','cvnopossessedinsert',null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun','cvnoappositiveinsert',null)}
			      {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["cv","no",this.state.cvno.length-1-ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type === 'npn') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Noun','npnupdate',null)}
						{ind[0] == 0 ? this.menuItem('BaseChooser','Add Possessor Noun','npnpossessorinsert',null) : null}
			      {ind[0] == this.state.npn.length-1 ? this.menuItem('BaseChooser','Add Possessed Noun','npnpossessedinsert',null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun','npnappositiveinsert',null)}
						{this.menuItem('Delete','Delete Noun',null,null,[["Delete",["np","n",this.state.npn.length-1-ind[0]],-1]])}
			    	</Menu>  			
 			} else if (type==='mvnObliques') {
  					return <Menu vertical>
						{this.menuItem('BaseChooser','Change Oblique Noun','mvnObliqueUpdate',null)}
						{this.state.mvnObliques.length > 0 ?
						(ind[1] == this.state.mvnObliques[ind[0]].n.length-1 ? this.menuItem('BaseChooser','Add Oblique Possessor Noun','mvnObliquepossessorinsert',null) : null)
						:
						null
						}
			      {ind[1] == 0 ? this.menuItem('BaseChooser','Add Oblique Possessed Noun','mvnObliquepossessedinsert',null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun','mvnObliqueappositiveinsert',null)}
						{ind[1] == 0 ? 
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["mv","nObliques",ind[0],ind[1]],-1]]))
							:
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["mv","nObliques",ind[0],ind[1],ind[2]],-1]]))
						}
			      
			    	</Menu> 
	  	} else if (type==='cvnObliques') {
  					return <Menu vertical>
						{this.menuItem('BaseChooser','Change Oblique Noun','cvnObliqueUpdate',null)}
						{this.state.cvnObliques.length > 0 ?
						(ind[1] == this.state.cvnObliques[ind[0]].n.length-1 ? this.menuItem('BaseChooser','Add Oblique Possessor Noun','cvnObliquepossessorinsert',null) : null)
						:
						null
						}
			      {ind[1] == 0 ? this.menuItem('BaseChooser','Add Oblique Possessed Noun','cvnObliquepossessedinsert',null): null}
						{this.menuItem('BaseChooser','Add Descriptor Noun','cvnObliqueappositiveinsert',null)}
						{ind[1] == 0 ? 
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["cv","nObliques",ind[0],ind[1]],-1]]))
							:
							(this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["cv","nObliques",ind[0],ind[1],ind[2]],-1]]))
						}
			      
			    	</Menu> 
	  	} else if (type === 'cvnsappositive') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Descriptor Noun','cvnsupdate',null)}
			      {this.menuItem('Delete','Delete Descriptor Noun',null,null,[["Delete",["cv","ns",this.state.cvns.length-1-ind[0],ind[1]],-1]])}
			    	</Menu>  			
 			} else if (type === 'cvnoappositive') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Descriptor Noun','cvnoupdate',null)}
			      {this.menuItem('Delete','Delete Descriptor Noun',null,null,[["Delete",["cv","no",this.state.cvno.length-1-ind[0],ind[1]],-1]])}
			    	</Menu>  			
 			} else if (type === 'npnappositive') {
				return <Menu vertical>
						{this.menuItem('BaseChooser','Change Noun','npnupdate',null)}
				    {this.menuItem('Delete','Delete Noun',null,null,[["Delete",["np","n",this.state.npn.length-1-ind[0],ind[1]],-1]])}
			    	</Menu>  			
 			} else if (type==='mvnObliquesAppositive') {
  					return <Menu vertical>
						{this.menuItem('BaseChooser','Change Oblique Appositive Noun','mvnObliqueUpdate',null)}
			      {this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["mv","nObliques",ind[0],ind[1],ind[2]],-1]])}
			    	</Menu> 
	  	} else if (type==='cvnObliquesAppositive') {
  					return <Menu vertical>
						{this.menuItem('BaseChooser','Change Oblique Appositive Noun','cvnObliqueUpdate',null)}
			      {this.menuItem('Delete','Delete Oblique Noun',null,null,[["Delete",["cv","nObliques",ind[0],ind[1],ind[2]],-1]])}
			    	</Menu> 
	  	}
  	} else if (this.state.currentEditMode==='mvnObliqueUpdate') {
  		return this.baseChooser(["Update",["mv","nObliques",ind[0],'nBases',ind[1],ind[2]]],'n','updatebase','Ind')
  	} else if (this.state.currentEditMode==='cvnObliqueUpdate') {
  		return this.baseChooser(["Update",["cv","nObliques",ind[0],'nBases',ind[1],ind[2]]],'n','updatebase','Ind')
  	} else if (this.state.currentEditMode==='mvinsert') {
  		return this.baseChooser(["Insert",["mv"]],'v','insert','Ind')
  	} else if (this.state.currentEditMode==='cvinsert') {
  		return this.baseChooser(["Insert",["cv"]],'v','insert',this.state.cvvMood)
  	} else if (this.state.currentEditMode==='questionInsert') {
  		return this.baseChooser(["Insert",["mv"]],'v','insert','Intrg',this.state.interCase)
  	} else if (this.state.currentEditMode==='commandInsert') {
  		return this.baseChooser(["Insert",["mv"]],'v','insert','Opt',this.state.optCase)
  	} else if (this.state.currentEditMode==='svinsert') {
  		return this.baseChooser(["Insert",["sv"]],'v','insert','Sbrd',this.state.svvCase)
  	} else if (this.state.currentEditMode==='mvupdate') {
  		return this.baseChooser(["Update",["mv","vBase"]],'v','update')
  	} else if (this.state.currentEditMode==='svupdate') {
  		return this.baseChooser(["Update",["sv","vBase"]],'v','update')
  	} else if (this.state.currentEditMode==='nObliqueInsert') {
  		if (this.state.mvnObliques.length > 0) {
  		return this.baseChooser(["Insert",["mv","nObliques",-1]],'n','insert',this.state.npCase)
  		} else {
  		return this.baseChooser(["Insert",["mv","nObliques"]],'n','insert',this.state.npCase)  			
  		}
  	} else if (this.state.currentEditMode==='cnObliqueInsert') {
  		if (this.state.cvnObliques.length > 0) {
  		return this.baseChooser(["Insert",["cv","nObliques",-1]],'n','insert',this.state.npCase)
  		} else {
  		return this.baseChooser(["Insert",["cv","nObliques"]],'n','insert',this.state.npCase)  			
  		}
  	} else if (this.state.currentEditMode==='mvnObliquepossessorinsert') {
  		return this.baseChooser(["Insert",["mv","nObliques",ind[0],-1]],'n','insert',this.state.npCase)
  	} else if (this.state.currentEditMode==='mvnObliquepossessedinsert') {
  		return this.baseChooser(["Insert",["mv","nObliques",ind[0],0]],'n','insert',this.state.npCase)
  	} else if (this.state.currentEditMode==='cvnObliquepossessorinsert') {
  		return this.baseChooser(["Insert",["cv","nObliques",ind[0],-1]],'n','insert',this.state.npCase)
  	} else if (this.state.currentEditMode==='cvnObliquepossessedinsert') {
  		return this.baseChooser(["Insert",["cv","nObliques",ind[0],0]],'n','insert',this.state.npCase)
  	} else if (this.state.currentEditMode==='npnupdate') {
  		return this.baseChooser(["Update",["np","nBases",ind[0],ind[1]]],'n','updatebase')
  	} else if (this.state.currentEditMode==='npinsert') {
  		return this.baseChooser(["Insert",["np"]],'n','insert',this.state.npCase)
  	} else if (this.state.currentEditMode==='npnpossessorinsert') {
  		return this.baseChooser(["Insert",["np","n",-1]],'n','insert')
  	} else if (this.state.currentEditMode==='npnappositiveinsert') {
  		return this.baseChooser(["Insert",["np","n",ind[0],-1]],'n','insert')
  	} else if (this.state.currentEditMode==='npnpossessedinsert') {
  		return this.baseChooser(["Insert",["np","n",0]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnsinsert') {
  		return this.baseChooser(["Insert",["mv","ns"]],'n','insert','Ind')
  	} else if (this.state.currentEditMode==='mvnsupdate') {
  		return this.baseChooser(["Update",["mv","nsBases",this.state.mvnsSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (this.state.currentEditMode==='mvnsappositiveinsert') {
  		return this.baseChooser(["Insert",["mv","ns",this.state.mvnsSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnObliqueappositiveinsert') {
  		return this.baseChooser(["Insert",["mv","nObliques",ind[0],ind[1],-1]],'n','insert')
  	} else if (this.state.currentEditMode==='cvnObliqueappositiveinsert') {
  		return this.baseChooser(["Insert",["cv","nObliques",ind[0],ind[1],-1]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnspossessorinsert') {
  		return this.baseChooser(["Insert",["mv","ns",-1]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnspossessedinsert') {
  		return this.baseChooser(["Insert",["mv","ns",0]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnopossessedinsert') {
  		return this.baseChooser(["Insert",["mv","no",0]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnoinsert') {
  		return this.baseChooser(["Insert",["mv","no"]],'n','insert','Ind')
  	} else if (this.state.currentEditMode==='mvnoappositiveinsert') {
  		return this.baseChooser(["Insert",["mv","no",this.state.mvnoSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (this.state.currentEditMode==='mvnoupdate') {
  		return this.baseChooser(["Update",["mv","noBases",this.state.mvnoSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (this.state.currentEditMode==='mvnopossessorinsert') {
  		return this.baseChooser(["Insert",["mv","no",-1]],'n','insert',null)
  	} 
 		else if (this.state.currentEditMode==='cvupdate') {
  		return this.baseChooser(["Update",["cv","vBase"]],'v','update')
  	} else if (this.state.currentEditMode==='cvnsinsert') {
  		return this.baseChooser(["Insert",["cv","ns"]],'n','insert','Ind')
  	} else if (this.state.currentEditMode==='cvnsupdate') {
  		return this.baseChooser(["Update",["cv","nsBases",this.state.cvnsSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (this.state.currentEditMode==='cvnsappositiveinsert') {
  		return this.baseChooser(["Insert",["cv","ns",this.state.cvnsSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (this.state.currentEditMode==='cvnspossessorinsert') {
  		return this.baseChooser(["Insert",["cv","ns",-1]],'n','insert')
  	} else if (this.state.currentEditMode==='cvnoinsert') {
  		return this.baseChooser(["Insert",["cv","no"]],'n','insert','Ind')
  	} else if (this.state.currentEditMode==='cvnoappositiveinsert') {
  		return this.baseChooser(["Insert",["cv","no",this.state.cvnoSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (this.state.currentEditMode==='cvnoupdate') {
  		return this.baseChooser(["Update",["cv","noBases",this.state.cvnoSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (this.state.currentEditMode==='cvnopossessorinsert') {
  		return this.baseChooser(["Insert",["cv","no",-1]],'n','insert',null)
  	} else if (this.state.currentEditMode==='cvnopossessedinsert') {
  		return this.baseChooser(["Insert",["cv","no",0]],'n','insert')
  	} else if (this.state.currentEditMode==='cvnspossessedinsert') {
  		return this.baseChooser(["Insert",["cv","ns",0]],'n','insert')
  	} else if (this.state.currentEditMode==='svnopossessedinsert') {
  		return this.baseChooser(["Insert",["sv","no",0]],'n','insert')
  	} else if (this.state.currentEditMode==='svnoinsert') {
  		return this.baseChooser(["Insert",["sv","no"]],'n','insert','Ind')
  	} else if (this.state.currentEditMode==='svnoappositiveinsert') {
  		return this.baseChooser(["Insert",["sv","no",this.state.svnoSegments.length-1-ind[0],-1]],'n','insert')
  	} else if (this.state.currentEditMode==='svnoupdate') {
  		return this.baseChooser(["Update",["sv","noBases",this.state.svnoSegments.length-1-ind[0],ind[1]]],'n','updatebase')
  	} else if (this.state.currentEditMode==='svnopossessorinsert') {
  		return this.baseChooser(["Insert",["sv","no",-1]],'n','insert',null)
  	} 

  	 else if (this.state.currentEditMode==='question') {
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
		if (type==='addCV') {
	    return <Dropdown item text='Add Connective Verb Phrase'>
	      <Dropdown.Menu>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Prec'},()=>{this.menuSelect('cvinsert',-1)})}}>before...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Cnsq'},()=>{this.menuSelect('cvinsert',-1)})}}>because...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Cont'},()=>{this.menuSelect('cvinsert',-1)})}}>whenever...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Conc'},()=>{this.menuSelect('cvinsert',-1)})}}>although, even though, even if...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Cond'},()=>{this.menuSelect('cvinsert',-1)})}}>if, when in the future...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'CtmpI'},()=>{this.menuSelect('cvinsert',-1)})}}>when in the past...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'CtmpII'},()=>{this.menuSelect('cvinsert',-1)})}}>while...</Dropdown.Item>
	      </Dropdown.Menu>
	    </Dropdown>			
		} else if (type==='addQuestion') {
	    return <Dropdown item text='Ask a Question'>
	      <Dropdown.Menu>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg0'},()=>{this.menuSelect('questionInsert',-1)})}}>who is (subject)...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg1'},()=>{this.menuSelect('questionInsert',-1)})}}>to whom (object)...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg2'},()=>{this.menuSelect('questionInsert',-1)})}}>what is (subject)...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg3'},()=>{this.menuSelect('questionInsert',-1)})}}>to what (object)...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg4'},()=>{this.menuSelect('questionInsert',-1)})}}>when did...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg5'},()=>{this.menuSelect('questionInsert',-1)})}}>when will...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg6'},()=>{this.menuSelect('questionInsert',-1)})}}>where is...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg7'},()=>{this.menuSelect('questionInsert',-1)})}}>from where is...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg8'},()=>{this.menuSelect('questionInsert',-1)})}}>to where is...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg9'},()=>{this.menuSelect('questionInsert',-1)})}}>why is...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'IntrgA'},()=>{this.menuSelect('questionInsert',-1)})}}>how is...?</Dropdown.Item>
	      </Dropdown.Menu>
	    </Dropdown>			
		} else if (type==='addCommand') {
	    return <Dropdown item text='Make a Command'>
	      <Dropdown.Menu>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Opt][PRS'},()=>{this.menuSelect('commandInsert',-1)})}}>command right now</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Opt][FUT'},()=>{this.menuSelect('commandInsert',-1)})}}>command in future</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Opt][PRS][NEG'},()=>{this.menuSelect('commandInsert',-1)})}}>do not ...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Opt][FUT][NEG'},()=>{this.menuSelect('commandInsert',-1)})}}>do not ... (future)</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Sbrd'},()=>{this.menuSelect('commandInsert',-1)})}}>polite request</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'SbrdNeg'},()=>{this.menuSelect('commandInsert',-1)})}}>polite do not...</Dropdown.Item>
	      </Dropdown.Menu>
	    </Dropdown>			
		} else if (type==='addnOblique') {
	    return <Dropdown item text='Add Noun Obliques'>
	      <Dropdown.Menu>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Abl_Mod'},()=>{this.menuSelect('nObliqueInsert',-1)})}}>from, indirect object......</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Loc'},()=>{this.menuSelect('nObliqueInsert',-1)})}}>in, at...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Ter'},()=>{this.menuSelect('nObliqueInsert',-1)})}}>toward...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Via'},()=>{this.menuSelect('nObliqueInsert',-1)})}}>through, using...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Equ'},()=>{this.menuSelect('nObliqueInsert',-1)})}}>like, similar to...</Dropdown.Item>
	      </Dropdown.Menu>
	    </Dropdown>			
		} else if (type==='caddnOblique') {
	    return <Dropdown item text='Add Noun Obliques'>
	      <Dropdown.Menu>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Abl_Mod'},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>from, indirect object......</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Loc'},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>in, at...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Ter'},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>toward...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Via'},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>through, using...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({npCase:'Equ'},()=>{this.menuSelect('cnObliqueInsert',-1)})}}>like, similar to...</Dropdown.Item>
	      </Dropdown.Menu>
	    </Dropdown>			
		} else if (type==='addSV') {
	    return <Dropdown item text='Add Subordinative Verb Phrase'>
	      <Dropdown.Menu>
	        <Dropdown.Item onClick={()=>{this.setState({svvCase:'by'},()=>{this.menuSelect('svinsert',-1)})}}>By...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({svvCase:'being'},()=>{this.menuSelect('svinsert',-1)})}}>Being...</Dropdown.Item>
	      </Dropdown.Menu>
	    </Dropdown>					
		} else if (type==='changeCVtype') {
	    return <Dropdown item text='Change Connective Verb Phrase'>
	      <Dropdown.Menu>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Prec',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>before...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Cnsq',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>because...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Cont',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>whenever...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Conc',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>although, even though, even if...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'Cond',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>if, when in the future...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'CtmpI',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>when in the past...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({cvvMood:'CtmpII',isOpen: false},()=>{this.backEndCall([["Insert",["cv",],[this.state.cvvBase[0],this.state.cvvBase[1],this.state.cvvMood]]])})}}>while...</Dropdown.Item>
	      </Dropdown.Menu>
	    </Dropdown>					
		} else if (type==='changeQuestiontype') {
	    return <Dropdown item text='Change Question Type'>
	      <Dropdown.Menu>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg0',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg0',1]]])})}}>who is (subject)...?</Dropdown.Item>
	        {this.state.mvvBase[1] != 'i' ?
	        	<Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg1',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg1',1]]])})}}>to whom (object)...?</Dropdown.Item>
	        	:
	        	null
	        }
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg2',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg2',1]]])})}}>what is (subject)...?</Dropdown.Item>
	        {this.state.mvvBase[1] != 'i' ?
	        	<Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg3',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg3',1]]])})}}>to what (object)...?</Dropdown.Item>
	        	:
	        	null
	        }
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg4',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg4',1]]])})}}>when did...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg5',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg5',1]]])})}}>when will...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg6',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg6',1]]])})}}>where is...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg7',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg7',1]]])})}}>from where is...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg8',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg8',1]]])})}}>to where is...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'Intrg9',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['Intrg9',1]]])})}}>why is...?</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({interCase:'IntrgA',isOpen: false},()=>{this.backEndCall([["Insert",["mv","qWord"],['IntrgA',1]]])})}}>how is...?</Dropdown.Item>
	      </Dropdown.Menu>
	    </Dropdown>					
		} else if (type == 'changeRequiredPostbase') {
	    return <Dropdown item text='Change Postbase'>
	      <Dropdown.Menu>
	      	{requirePostbasesDictionary[this.state.requirePostbase].map((x)=>{
	      		if (x['fst'][0].toString() !== this.state.mvvBase[0][this.state.mvvBase[0].length-1].toString()) {
	      			return <Dropdown.Item onClick={()=>{this.setState({isOpen: false},()=>{this.backEndCall([["Update",['mv','vBase'],[this.state.mvvBase[0].slice(0,-1).concat(x['fst']),this.state.mvvBase[1],]]]); })}}>{x['english']}</Dropdown.Item>
	      		}
	      	})
	      	}
	      </Dropdown.Menu>
	    </Dropdown>						
		} else if (type == 'switchOptative') {
	    return <Dropdown item text='Change Command Type'>
	      <Dropdown.Menu>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Opt][PRS',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Opt][PRS']])})}}>command right now</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Opt][FUT',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Opt][FUT']])})}}>command in future</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Opt][PRS][NEG',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Opt][PRS][NEG']])})}}>do not ...</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Opt][FUT][NEG',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Opt][FUT][NEG']])})}}>do not ... (future)</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'Sbrd',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Sbrd']])})}}>polite request</Dropdown.Item>
	        <Dropdown.Item onClick={()=>{this.setState({optCase:'SbrdNeg',isOpen: false},()=>{this.backEndCall([["Update",["mv","vMood"],'Sbrd'],["Insert",["mv"],[this.state.candidateCall[0].concat([['+peke-|+vke-,+pege-|+vke-', 0, 0, 0]]),this.state.candidateCall[1],'Sbrd']]])})}}>polite do not...</Dropdown.Item>
	      </Dropdown.Menu>
	    </Dropdown>		
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
          		<Icon name='chevron right' />
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

	updateCandidateCall=(type,update,mood,submood)=>{

		console.log(type, update, mood, submood)


		let lockSubmit = false
		let candidateFST = []
		let transitivity = ''
		this.state.candidateBase.slice().reverse().map((x,xind)=>{
			if (xind === 0) {
				console.log(x)
				if (x['type'].length < 3) {
					lockSubmit = true
					transitivity = x['type']
					if (transitivity == 'n' && type == 'v') {
						transitivity = 'i'
					}			
					this.setState({endingAdjusted:''})					
				} else if (x['type'] == '[V→N]' || x['type'] == '[V→V]') {
					lockSubmit = false
					this.setState({endingAdjusted:'v'})
				} else {
					lockSubmit = false
					this.setState({endingAdjusted:'n'})					
				}
			}
			candidateFST.push([x['key'],0,x['usageIndex'],0])
		})
		// candidateFST = [candidateFST]
		console.log(candidateFST, transitivity)

		if (update==='insert') {
			if (type === 'n') {
				if (mood === undefined) {
			  	this.setState({
			  		candidateCall:[candidateFST,[0,0,0,1]],
			  		lockSubmit:lockSubmit,
			  	})							
				} else {
			  	this.setState({
			  		candidateCall:[candidateFST,[0,0,0,1],mood],
			  		lockSubmit:lockSubmit,
			  	})		
				}

			} else if (type === 'v') {
				if (mood === 'Ind') {
			  	this.setState({
			  		candidateCall:[candidateFST,transitivity,mood],
			  		lockSubmit:lockSubmit,
			  	})							
				} else if (submood == 'SbrdNeg') {
			  	this.setState({
			  		candidateCall:[candidateFST.concat([['+peke-|+vke-,+pege-|+vke-', 0, 0, 0]]),transitivity,'Sbrd'],
			  		lockSubmit:lockSubmit,
			  	})								
				} else if (mood === 'Opt') {
			  	this.setState({
			  		candidateCall:[candidateFST,transitivity,submood],
			  		lockSubmit:lockSubmit,
			  	})											
				} else if (mood ==='Intrg') {
			  	this.setState({
			  		candidateCall:[candidateFST,transitivity,mood],
			  		lockSubmit:lockSubmit,
			  	})	
				} else {
			  	this.setState({
			  		candidateCall:[candidateFST,transitivity,mood],
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

	baseChooser = (itemUpdating,endingNeeded,update,mood,submood) => {
		console.log(itemUpdating,endingNeeded,update,mood,submood)
		console.log(this.state)
		// console.log(this.state.currentEditMode, itemUpdating,endingNeeded,update,mood,submood)
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
										    	// if (k['type']=='[→V]' || k['type']=='[V→V]')
										    	console.log(k)
										    	this.setState({
										    		searchQuery:'',
										    		wordsList:[],
										    		candidateBase:this.state.candidateBase.concat(k),
										    	},()=>{
										    		this.updateCandidateCall(endingNeeded,update,mood,submood)
										    	})

										    }} style={{cursor:'pointer',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'15px',padding:5}}>
											        <List.Description style={{paddingBottom:'4px'}}>{k['yupikword']}</List.Description>
											        <List.Header style={{fontWeight:'400'}}>{this.processStyledText(k['englishraw'])}</List.Header>
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
									        	{this.state.cvvMood.length > 0 ?
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
										        		<div style={{flex:1}}>
											        		<div style={{color:'#000000b3'}}>{retrieveMoodEnglish[this.state.cvvMood]['fst']}</div>
											        		<div style={{fontWeight:''}}>{retrieveMoodEnglish[this.state.cvvMood]['english']+' '}<span style={{fontStyle:'italic'}}>{mvSubjectOptionsEnglish[this.state.cvvs.join("")]}</span></div>
										        		</div>
										        		</List.Item>
									        		:
									        		null
									        	}
									        	{this.state.candidateBase.map((k,kindex)=>{return (kindex===this.state.candidateBase.length-1 ?
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
										        		<div style={{flex:1}}>
											        		<div style={{color:'#000000b3'}}>{k['yupikword']}</div>
											        		<div style={{fontWeight:''}}>{this.processStyledText(k['englishraw'])}</div>
										        		</div>
										        		<Icon circular onClick={()=>{this.setState({candidateBase:this.state.candidateBase.slice(0,-1)},()=>{this.updateCandidateCall(endingNeeded,update,mood,submood)})}} style={{cursor:'pointer',width:30}} name='x' />
										        		</List.Item>
									        			:
										        		<List.Item style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
										        		<div style={{flex:1}}>										        		
											        		<div style={{color:'#000000b3'}}>{k['yupikword']}</div>
											        		<div style={{fontWeight:''}}>{this.processStyledText(k['englishraw'])}</div>
										        		</div>
										        		<div style={{width:30}} />
										        		</List.Item>
									        			)
									        	})}
									        	</List>
								        	</Segment>
									      <div style={{paddingBottom:10}}>  
		                		<Button color='blue' onClick={()=>{
		                			if (mood === 'Intrg') {
		                				this.backEndCall([[itemUpdating[0],itemUpdating[1],this.state.candidateCall],["Insert",["mv","qWord"],[submood,1]]]); 		                				
		                			} else {
		                				console.log([[itemUpdating[0],itemUpdating[1],this.state.candidateCall]])
		                				this.backEndCall([[itemUpdating[0],itemUpdating[1],this.state.candidateCall]]); 		                						                				
		                			}
		                			this.setState({isOpen:false,currentEditMode:'default',searchQuery:'',wordsList:[],candidateBase:[],lockSubmit:false}) 
		                		}} disabled={!this.state.lockSubmit} style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}>
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


			<Button onClick={()=>this.setState({showShortcuts:!this.state.showShortcuts})}>show shortcuts</Button>
			{this.state.showShortcuts ?
				<div>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv",],[[["pitalqegte-,pitacqegte-",0,2,0],],"t","Ind"]]])}}>Add mv</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv",],[[["pitalqegte-,pitacqegte-",0,2,0],["-laag-",0,0,0],["~+lar-,@~+lar-,-lar-",0,2,0],],"t","Ind"]]])}}>Add mv</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv",],[[["pissur-",0,0,0],["-curlak,-curlag-",0,1,0],["-cuar(aq*)",0,0,0],["+ci-",0,0,0],["@~+yug-,+(r)yug-",0,1,0],["~+lar-,@~+lar-,-lar-",0,2,0],],"i","Ind"]]])}}>Add mv vv nv boat</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv",],[[["angyaq,angyar-",0,0,0],["+ci-",0,0,0],],"i","Ind"]]])}}>Add mv nv boat</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv",],[[["pissur-",0,0,0],["-curlak,-curlag-",0,1,0],["+ci-",0,0,0],["@~+yug-,+(r)yug-",0,1,0],],"i","Ind"]]])}}>Add mv vv nv boat</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv",],[[["angyaq,angyar-",0,0,0],["+ci-",0,0,0],["@~+yug-,+(r)yug-",0,1,0],["-laag-",0,0,0]],"i","Ind"]]])}}>Add mv vv nv boat</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv",],[[["angyaq,angyar-",0,0,0],["+ci-",0,0,0],["-laag-",0,0,0]],"i","Ind"]]])}}>Add mv vv nv boat</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","ns"],[[["kuik",0,0,0],],[0,0,0,1]]]])}}>Add subject</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","ns"],[[["pissur-",0,0,0],["-curlak,-curlag-",0,1,0]],[0,0,0,1]]]])}}>Add subject</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","no"],[[["pissur-",0,0,0],["-curlak,-curlag-",0,1,0]],[0,0,0,1]]]])}}>Add object</Button>
					<Button onClick={()=>{this.backEndCall([[ "Insert", ["np"], 	[[["kuik",0,0,0],["-cuar(aq*)",0,0,0]],[0,0,0,1],"Equ"] ]])}}>Add np equalis equ</Button>
					<Button onClick={()=>{this.backEndCall([[ "Insert", ["np"], 	[[["kuik",0,0,0],["-cuar(aq*)",0,0,0]],[0,0,0,1],"Abs"] ]])}}>Add np equalis abs</Button>
					<Button onClick={()=>{this.backEndCall([[ "Insert", ["np","n",-1], 	[[["angun",0,0,1],],[0,0,0,1]] ]])}}>Add np equalis possessor</Button>
					<Button onClick={()=>{this.backEndCall([[ "Insert", ["np","n",0,-1], 	[[["tungulria",0,0,0]],[0,0,0,1]] ]])}}>Add np equalis appositive</Button>
					<Button onClick={()=>{this.backEndCall([[ "Insert", ["np","n",1,-1], 	[[["qatellria,qatelria",0,0,0]],[0,0,0,1]] ]])}}>Add np equalis appositive</Button>
					<Button onClick={()=>{this.backEndCall([[ "Insert", ["np","n",0,-1], 	[[["arnaq",0,0,0],],[0,0,0,1]] ]])}}>Add np equalis</Button>
					<Button onClick={()=>{this.backEndCall([[ "Insert", ["np","n",0,0,-1], 	[[["arnaq",0,0,0],],[0,0,0,1],] ]])}}>Add np equalis</Button>

					<Button onClick={()=>{this.backEndCall([[ "Insert", ["np"], 	[["arnar","–yagar*[N→N]"],[0,0,0,1]] ]])}}>Add np arnayagaq</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv",],[[["aqume-",0,0,0],["-a-|-ar-|-aa-|+a-|+aar-",0,0,0],],"i","Ind"]]])}}>Add mv</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","nObliques"],[[["kuik",0,0,0],["-cuar(aq*)",0,0,0]],[0,0,0,1],"Equ"]]])}}>Add mv noblique</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","nObliques",-1],[["arnar"],[0,0,0,1],"Equ"]]])}}>Add new oblique noun</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","nObliques",0,-1],[["paluqtar*"],[0,0,0,1]]]])}}>Add possessor</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","nObliques",0,0],[["angute"],[0,0,0,1]]]])}}>Add possessed</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","nObliques",0,0,-1],[["kameksag"],[0,0,0,1]]]])}}>Add add appositive</Button>

					<Button onClick={()=>{this.backEndCall([["Delete",["mv","nObliques",0,0],-1]])}}>Delete full 0 index</Button>
					<Button onClick={()=>{this.backEndCall([["Delete",["mv","nObliques",0,1],-1]])}}>Delete full 1 index</Button>

					<Button onClick={()=>{this.backEndCall([["Delete",["mv","nObliques",0,0,0],-1]])}}>Delete  0 0 0index</Button>
					<Button onClick={()=>{this.backEndCall([["Update",["mv","nObliques",0,'nBases',0,0],["kuig"]]])}}>Change possessor</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["cv",],[["nere"],"t","Prec"]]])}}>Add cv</Button>
					<Button onClick={()=>{this.backEndCall([["Update",["cv","vs"],[4,1,0]]])}}>Make 4th s cv</Button>
					<Button onClick={()=>{this.backEndCall([["Update",["cv","vo"],[4,1,0]]])}}>Make 4th o cv</Button>

					<Button onClick={()=>{this.backEndCall([["Insert",["sv",],[[["utaqa-",0,2,0]],"t","Sbrd"]]])}}>Add sv</Button>

					<Button onClick={()=>{this.backEndCall([["Update",["sv","vBase"],[["utaqa"],"t"]]])}}>Change sv trans</Button>
					<Button onClick={()=>{this.backEndCall([["Update",["sv","vo"],[1,1,0]]])}}>change sv object to 1st person</Button>

					<Button onClick={()=>{this.backEndCall([[ "Update",["mv","vBase"],[["nere","–llru[V→V]"],"i"]]])}}>Change mv</Button>
					<Button onClick={()=>{this.backEndCall([[ "Delete", ["mv"],	-1 ],])}}>Delete mv</Button>
					<Button onClick={()=>{this.backEndCall([[ "Delete", ["mv","ns",0,0],	-1 ],])}}>Delete mv ns 0 0</Button>
					<Button onClick={()=>{this.backEndCall([[ "Delete", ["mv","no",0,0],	-1 ],])}}>Delete mv no 0 0</Button>
					<Button onClick={()=>{this.backEndCall([[ "Delete", ["mv","ns",1,0],	-1 ],])}}>Delete mv ns 1 0</Button>

					<Button onClick={()=>{this.backEndCall([[ "Delete", ["np","n",0,0],	-1 ],])}}>Delete np 0 0</Button>
					<Button onClick={()=>{this.backEndCall([[ "Delete", ["np"],	-1 ],])}}>Delete np</Button>

					<Button onClick={()=>{this.backEndCall([["Update",["mv","vBase"],[["nere","–llru[V→V]"],"t"]]])}}>Change mv transitive</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["cv","ns",0,0],[["angute",],[0,0,0,1]]]])}}>Add connective subject</Button>

					<Button onClick={()=>{this.backEndCall([["Insert",["mv","ns"],[[["kuik",0,0,0],["-cuar(aq*)",0,0,0]],[0,0,0,1]]]])}}>Add subject</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["cv","ns",0,0],[["angute",],[0,0,0,1]]]])}}>Add cv subject</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["cv","ns",0,0],[["angute",],[0,0,0,1]]]])}}>Add cv subject</Button>

					<Button onClick={()=>{this.backEndCall([["Insert",["mv","ns",0,1],[[["tungulria",0,0,0]],[0,0,0,1]]]])}}>Add subject appositive</Button>
					
					<Button onClick={()=>{this.backEndCall([["Update",["mv","nsBases",0,0],["qimugte",]]])}}>Update subject</Button>

					<Button onClick={()=>{this.backEndCall([["Insert",["mv","ns",-1],[[["arnar",0,0,0]],[0,0,0,1]]]])}}>Add subject woman possessor</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","ns",0],[["qimugte",],[0,0,0,1]]]])}}>Add subject dog possessed</Button>

					<Button onClick={()=>{this.backEndCall([["Insert",["mv","no",0,0],[["tuntu",],[0,0,0,1]]]])}}>Add object</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","no",0,1],[["tungulria",],[0,0,0,1]]]])}}>Add object appositive</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","no",-1],[["kuig",],[0,0,0,1]]]])}}>Add object river possessor</Button>
					<Button onClick={()=>{this.backEndCall([["Insert",["mv","no",0],[["piipir",],[0,0,0,1]]]])}}>Add object babies possessor</Button>
				</div>
			:
			null
		}

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
											{this.state.mvnsSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('mvns',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('mvnsappositive',[kind,qind])}</span>												
													}
												})}
												</div>												

											)}
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

								{this.state.mvqWord.length > 0 && this.state.mvqWordSegments.length > 0 ?
									this.editMenu('mvqWord',-1)
									:
									null
								}
								

								{this.state.mvvBase.length > 0 && this.state.mvvSegments.length > 0 ?
									this.editMenu('mv',-1)
									:
									null
								}
								

							 	{this.state.mvnoBases.length > 0 ? 
							 		<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.mvnoSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('mvno',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('mvnoappositive',[kind,qind])}</span>												
													}
												})}
												</div>												

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



								{this.state.mvnObliquesSegments.length > 0 && this.state.mvnObliques.length === this.state.mvnObliquesSegments.length ?
									(this.state.mvnObliquesSegments.map((obliques,obliqueind)=>
										<div>
											<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
												<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
													{obliques.slice().reverse().map((x,xind)=> 
													<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
														{x.map((k,kind)=>
														{if (kind === 0) {
															return <span>{this.editMenu('mvnObliques',[obliqueind,obliques.length-1-xind,kind])}</span>												
														} else {
															return <span>{this.editMenu('mvnObliquesAppositive',[obliqueind,obliques.length-1-xind,kind])}</span>												
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
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
												{this.state.npnSegments.slice().reverse().map((x,xind)=> 
													<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
													{x.map((k,kind)=>
														{if (kind === 0) {
															return <span>{this.editMenu('npn',[xind,kind])}</span>												
														} else {
															return <span>{this.editMenu('npnappositive',[xind,kind])}</span>												
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
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",this.state.mvnsSegments.length-1,0],(data.value+this.state.mvns[this.state.mvnsSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvns[this.state.mvnsSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsPossessorsNo4th} />
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",this.state.mvnsSegments.length-1,0],this.state.mvns[this.state.mvnsSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvns[this.state.mvnsSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{this.state.mvnsEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","ns",this.state.mvnsSegments.length-1-xind,0],this.state.mvns[this.state.mvnsSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvns[this.state.mvnsSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{this.state.mvnsEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
															)}
													</span>
												}
												</span>
											)}
										</span>
										:
										<span>
											{this.state.mvvMood == "Opt][PRS][NEG" || this.state.mvvMood == "Opt][FUT][NEG" ?
												<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={mvSubjectOptionsOnly2nd} />
												:
												(this.state.interCase == 'Intrg0' ?
													<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={mvSubjectOptionsWho} />
													:
													(this.state.interCase == 'Intrg2' ?
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={mvSubjectOptionsWhat} />
														:
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={mvSubjectOptions} />
														)
													)
											}
										</span>
										)
									:
									null
								}

						
								{this.state.mvEnglish2.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}		


								{this.state.mvvo.length > 0 ?
									(this.state.mvnoSegments.length > 0 && this.state.mvnoSegments.length === this.state.mvno.length ? 
										<span>					
											{this.state.mvnoSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.state.mvvBase[1] == 'it' ?
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1,0],(data.value+this.state.mvno[this.state.mvnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvno[this.state.mvnoSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsMVAblPossessors} />
														:
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1,0],(data.value+this.state.mvno[this.state.mvnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvno[this.state.mvnoSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsMVPossessors} />
														}
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1,0],this.state.mvno[this.state.mvnoSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvno[this.state.mvnoSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{this.state.mvnoEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","no",this.state.mvnoSegments.length-1-xind,0],this.state.mvno[this.state.mvnoSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvno[this.state.mvnoSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{this.state.mvnoEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
															)}
													</span>
												}
												</span>
											)}
										</span>
										:
										<span>
											{this.state.mvvBase[1] == 'it' ?
												(this.state.interCase == 'Intrg1' ?
													<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptionsWhomAbl} />		
													:
													(this.state.interCase == 'Intrg3' ?
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptionsWhatAbl} />		
														:
														(this.state.mvEnglishAbl.map((w,wind)=>
															<span style={{color:this.state.colorsList[w[1]]}}>{w[0]}</span>
														))
														)
													)
												:
												(this.state.interCase == 'Intrg1' ?
													<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptionsWhom} />		
													:
													(this.state.interCase == 'Intrg3' ?
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptionsWhat} />		
														:
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={mvObjectOptions} />		
														)
													)										
											}
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

								<div style={{textAlign:'center',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>




								{this.state.mvnObliquesSegments.length > 0 && this.state.mvnObliquesSegments.length === this.state.mvnObliques.length && this.state.mvnObliquesSegments.length === this.state.mvnObliquesEnglish2.length ? 
									(this.state.mvnObliques.map((obliques,obliqueind)=>
										<div>					
											{obliques['n'].slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.state.mvnObliquesEnglish1[obliqueind].map((w,wind)=>
															<span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
															)}						
														{obliques['nCase'] == 'Equ' || obliques['nCase'] == 'Via' ? 
															<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={nounOptionsMVAblPossessors} />
															:
															<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={nounOptionsMVPossessors} />
														}					
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{this.state.mvnObliquesEnglish2[obliqueind][xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
															)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.mvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{console.log(xind)}
														{this.state.mvnObliquesEnglish2[obliqueind][xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
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



								{this.state.npnSegments.length > 0 && this.state.npnSegments.length === this.state.npn.length ? 
										<span>					
											{this.state.npnSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.state.npnEnglish1.map((w,wind)=>
															<span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
															)}
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1,0],(data.value+this.state.npn[this.state.npnSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.npn[this.state.npnSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsMVPossessors} />
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1,0],this.state.npn[this.state.npnSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.npn[this.state.npnSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{this.state.npnEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
															)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1-xind,0],this.state.npn[this.state.npnSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.npn[this.state.npnSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{this.state.npnEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
															)}
													</span>
												}
												</span>
											)}
										</span>
										:
										null
								}

							</div>




							 	{this.state.cvnsBases.length > 0 ? 
									<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.cvnsSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('cvns',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('cvnsappositive',[kind,qind])}</span>												
													}
												})}
												</div>												

											)}
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

								{this.state.cvvBase.length > 0 && this.state.cvvSegments.length > 0 ?
									this.editMenu('cv',-1)
									:
									null
								}
								

							 	{this.state.cvnoBases.length > 0 ? 
							 		<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.cvnoSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('cvno',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('cvnoappositive',[kind,qind])}</span>												
													}
												})}
												</div>												

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

								{this.state.cvnObliquesSegments.length > 0 && this.state.cvnObliques.length === this.state.cvnObliquesSegments.length ?
									(this.state.cvnObliquesSegments.map((obliques,obliqueind)=>
										<div>
											<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
												<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
													{obliques.slice().reverse().map((x,xind)=> 
													<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
														{x.map((k,kind)=>
														{if (kind === 0) {
															return <span>{this.editMenu('cvnObliques',[obliqueind,obliques.length-1-xind,kind])}</span>												
														} else {
															return <span>{this.editMenu('cvnObliquesAppositive',[obliqueind,obliques.length-1-xind,kind])}</span>												
														}}
														)}
													</div>
													)}
												</div>
											</div>
										</div>									
									)):null
								}

								{this.state.cvvs.length > 0 ?
									<div style={{display:'flex',justifyContent:'center',paddingBottom:10}}>
									{this.editMenu('defaultcv',-1)}
									</div>
									:
									null
								}								

								<div style={{textAlign:'center',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>

								{this.state.cvEnglish1.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}			

								{this.state.cvvs.length > 0 ?
									(this.state.cvnsSegments.length > 0 && this.state.cvnsSegments.length === this.state.cvns.length ? 
										<span>					
											{this.state.cvnsSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{console.log(event,data);this.backEndCall([["Update",["cv","ns",this.state.cvnsSegments.length-1,0],(data.value+this.state.cvns[this.state.cvnsSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvns[this.state.cvnsSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsPossessorsNo4th} />
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{console.log(event,data);this.backEndCall([["Update",["cv","ns",this.state.cvnsSegments.length-1,0],this.state.cvns[this.state.cvnsSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvns[this.state.cvnsSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{this.state.cvnsEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{console.log(event,data);this.backEndCall([["Update",["cv","ns",this.state.cvnsSegments.length-1-xind,0],this.state.cvns[this.state.cvnsSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvns[this.state.cvnsSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{this.state.cvnsEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
														)}
													</span>
												}
												</span>
											)}
										</span>
										:
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{console.log(data.value[0]===4);if (data.value[0] === 4) {this.backEndCall([["Update",["cv","vs"],[4,1,["mv","vs"]]]])} else {this.backEndCall([["Update",["cv","vs"],data.value.split('').map(Number)]])}}}  value={this.state.cvvs.join("")} options={mvSubjectOptions} />
										</span>
										)
									:
									null
								}

						
								{this.state.cvEnglish2.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}		


								{this.state.cvvo.length > 0 ?
									(this.state.cvnoSegments.length > 0 && this.state.cvnoSegments.length === this.state.cvno.length ? 
										<span>					
											{this.state.cvnoSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.state.cvvBase[1] == 'it' ?
															<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["cv","no",this.state.cvnoSegments.length-1,0],(data.value+this.state.cvno[this.state.cvnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvno[this.state.cvnoSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsCVAblPossessors} />
															:
															<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["cv","no",this.state.cvnoSegments.length-1,0],(data.value+this.state.cvno[this.state.cvnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvno[this.state.cvnoSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsCVPossessors} />
														}
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["cv","no",this.state.cvnoSegments.length-1,0],this.state.cvno[this.state.cvnoSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvno[this.state.cvnoSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{this.state.cvnoEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["cv","no",this.state.cvnoSegments.length-1-xind,0],this.state.cvno[this.state.cvnoSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvno[this.state.cvnoSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{this.state.cvnoEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
														)}
													</span>
												}
												</span>
											)}
										</span>
										:
										<span>
											{this.state.cvvBase[1] == 'it' ?
												(this.state.cvEnglishAbl.map((w,wind)=>{
													return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
												}))			
												:
												<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}   onChange={(event,data)=>{if (data.value === 'mvsubject') {this.backEndCall([["Update",["cv","vo"],[4,1,["mv","vs"]]]])} else {this.backEndCall([["Update",["cv","vo"],data.value.split('').map(Number)]])}}}  value={this.state.cvvo.join("")} options={mvObjectOptions} />								
											}
										</span>
									)
									:
									null
								}

								{this.state.cvEnglish3.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}

								{this.state.cvnObliquesSegments.length > 0 && this.state.cvnObliquesSegments.length === this.state.cvnObliques.length ? 
									(this.state.cvnObliques.map((obliques,obliqueind)=>
										<div>					
											{obliques['n'].slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														{this.state.cvnObliquesEnglish1[obliqueind].map((w,wind)=>
															<span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
															)}														
															{obliques['nCase'] == 'Equ' || obliques['nCase'] == 'Via' ? 
																<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={nounOptionsCVAblPossessors} />
																:
																<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],(data.value+this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).join("")} options={nounOptionsCVPossessors} />
															}
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{this.state.cvnObliquesEnglish2[obliqueind][xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
															)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","nObliques",obliqueind,'n',obliques['n'].length-1-xind,0],this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.cvnObliques[obliqueind]['n'][obliques['n'].length-1-xind][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{console.log(xind)}
														{this.state.cvnObliquesEnglish2[obliqueind][xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
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
									this.editMenu('sv',-1)
									:
									null
								}
								

								<div style={{textAlign:'center',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>

							 	{this.state.svnoBases.length > 0 ? 
							 		<div>
										<div style={{marginBottom:'5px',fontSize:'30px',color:'#000000',fontWeight:'400'}}>
											<div style={{display:'flex',justifyContent:'center',flexDirection:'row', lineHeight:'35px'}}>
											{this.state.svnoSegments.slice().reverse().map((k,kind)=> 
												<div style={{paddingRight:10,paddingLeft:10,cursor:'pointer',marginBottom:10,}}>
												{k.map((q,qind)=> {
													if (qind === 0) {
														return <span>{this.editMenu('svno',[kind,0])}</span>												
													} else {
														return <span>{this.editMenu('svnoappositive',[kind,qind])}</span>												
													}
												})}
												</div>												

											)}
											</div>	
										</div>
										{this.state.showUnderlying ?
											<div style={{display:'flex',justifyContent:'center',fontSize:'18px',marginBottom:'10px',fontWeight:'300'}}> 
											{this.state.svObjectUnderlyingDisplay.map((y)=>
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
						
								{this.state.svEnglish1.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{this.state.svvText+w[0]+" "}</span>
								})}		


								{this.state.svvo.length > 0 ?
									(this.state.svnoSegments.length > 0 && this.state.svnoSegments.length === this.state.svno.length ? 
										<span>					
											{this.state.svnoSegments.slice().reverse().map((x,xind)=>
												<span>
												{xind === 0 ?
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["sv","no",this.state.svnoSegments.length-1,0],(data.value+this.state.svno[this.state.svnoSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.svno[this.state.svnoSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsSVPossessors} />
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["sv","no",this.state.svnoSegments.length-1,0],this.state.svno[this.state.svnoSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.svno[this.state.svnoSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />																
														{this.state.svnoEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
														)}
													</span>
													:
													<span>
														<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["sv","no",this.state.svnoSegments.length-1-xind,0],this.state.svno[this.state.svnoSegments.length-1-xind][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.svno[this.state.svnoSegments.length-1-xind][0].slice(-1).join("")}  options={nounOptionsNumbers} />								
														{this.state.svnoEnglish2[xind].map((w,wind)=>
															(w.map((t)=> <span style={{color:this.state.colorsList[t[1]]}}>{t[0]+" "}</span>))
														)}
													</span>
												}
												</span>
											)}
										</span>
										:
										<span>
											<Dropdown inline scrolling style={{backgroundColor:'#F3F3F3',color:'#852828',fontSize:'18px',fontWeight:'300',padding:'5px',borderRadius:'5px',marginRight:'4px',marginLeft:'4px'}}  onChange={(event,data)=>{this.backEndCall([["Update",["sv","vo"],data.value.split('').map(Number)]])}}  value={this.state.svvo.join("")} options={mvObjectOptions} />
										</span>
									)
									:
									null
								}

								{this.state.svvo.length > 0 ?
									<div style={{display:'flex',justifyContent:'center',paddingBottom:10}}>
									{this.editMenu('defaultsv',-1)}
									</div>
									:
									null
								}								


								{this.state.svEnglish2.map((w,wind)=>{
									return <span style={{color:this.state.colorsList[w[1]]}}>{w[0]+" "}</span>
								})}

							</div>



							{this.state.mvvs.length > 0 && this.state.cvvBase.length == 0 && this.state.svvBase.length == 0 ?
								<div style={{display:'flex',justifyContent:'center',paddingBottom:10}}>
								{this.editMenu('defaultverbphrase',-1)}
								</div>
								:
								null
							}


					</div>
				</Container>





				<div style={{height:'15px'}} />
          <div>
            {Object.keys(sentenceTemplates).map((k)=>
              <Button basic onClick={()=>this.backEndCall(sentenceTemplates[k][2],true)}>
                <div>{sentenceTemplates[k][0]}</div>
                <div>{sentenceTemplates[k][1]}</div>
              </Button>             
            )}
          </div>
				</div>





			</Grid.Column>  
			</Grid.Row>
			</Grid>
			</div>
		);
	}
}
export default OneVerbWordBuilder;