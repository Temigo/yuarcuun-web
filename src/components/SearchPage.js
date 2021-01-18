import '../App.css';
import '../semantic/dist/semantic.min.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Container, Header, Grid, Input, List, Label, Icon, Image, Button, Accordion, Table, Segment, Loader, Divider, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
// import Fuse from 'fuse.js';
import fuzzysort from 'fuzzysort'
import now from 'performance-now';
import ReactGA from 'react-ga';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { YugtunLoader, YugtunFooter, WordItem } from './SearchPageHelpers.js';
import TableEntry from './TableEntry.js';
import {demPro, perPro} from './constants/pronounEndings.js';
// import {endingRules} from './constants/endingRules.js';

// Cache dictionary
let dictionary = [];
let dictionary_dict = {};
// let dictionary_prepared = [];

// Search options
// let options = {
//   keys: ['yupik', 'english'],
//   minMatchCharLength: 3,
//   // includeScore: true,
//   distance: 10,
//   location: 2,
//   shouldSort: true,
//   //tokenize: true, // super slow!! 6x slower
//   // matchAllTokens: true,
//   threshold: 0.4,
//   findAllMatches: true,
// };
// let fuse = new Fuse([], options);

// let options1 = {
//   keys: ['yupik'],
//   // minMatchCharLength: 3,
//   // includeScore: true,
//   distance: 0,
//   // location: 2,
//   // shouldSort: true,
//   //tokenize: true, // super slow!! 6x slower
//   // matchAllTokens: true,
//   threshold: 0.0,
//   // findAllMatches: true,
// };
// let fuse1 = new Fuse([], options1);

// fuzzysort search
const optionsFuzzy = {
  keys: ['yupik', 'english'],
  limit: 50, // don't return more results than you need!
  threshold: -10000, // don't return bad results
};


const endingToEnglishTerms = {
  "[Ind]":"Indicative (Statement Form)",
  "[Intrg]":"Interrogative (Question Form)",
  "[Opt]":"Optative (Command Form)",
  "[Sbrd]":"Subordinative (Polite Command or -ing Form)",
  "[Ptcp]":"Participial",
  "[Prec]":"Precessive (before...)",
  "[Cnsq]":"Consequential (because...)",
  "[Cont]":"Contigent (whenever...)",
  "[Conc]":"Concessive (although, even though, even if...)",
  "[Cond]":"Conditional (if, when in the future...)",
  "[CtmpI]":"Contemporative 1 (when in fthe past...)",
  "[CtmpII]":"Contemporative 2 (while...)",
  "[Abs]":"Absolutive",
  "[Rel]":"Relative",
  "[Abl_Mod]":"Ablative-Modalis (indirect object, from...)",
  "[Loc]":"Localis (in, at...)",
  "[Ter]":"Terminalis (toward...)",
  "[Via]":"Vialis (through, using...)",
  "[Equ]":"Equalis (like, similar to...)",
  "[Quant_Qual]":"Quantifier/Qualifier Inflection",
  "[S_3Sg]":"he,\xa0she,\xa0it",
  "[S_3Du]":"they\xa0(2)",
  "[S_3Pl]":"they\xa0all\xa0(3+)",
  "[S_1Sg]":"I",
  "[S_1Du]":"we\xa0(2)",
  "[S_1Pl]":"we\xa0all\xa0(3+)",
  "[S_2Sg]":"you",
  "[S_2Du]":"you\xa0(2)",
  "[S_2Pl]":"you\xa0all\xa0(3+)",
  "[S_4Sg]":"he, she, it (itself)",
  "[S_4Du]":"they (2) (themselves)",
  "[S_4Pl]":"they all (3+) (themselves)",
  "[A_3Sg]":"he,\xa0she,\xa0it",
  "[A_3Du]":"they\xa0(2)",
  "[A_3Pl]":"they\xa0all\xa0(3+)",
  "[A_1Sg]":"I",
  "[A_1Du]":"we\xa0(2)",
  "[A_1Pl]":"we\xa0all\xa0(3+)",
  "[A_2Sg]":"you",
  "[A_2Du]":"you\xa0(2)",
  "[A_2Pl]":"you\xa0all\xa0(3+)",
  "[A_4Sg]":"he, she, it (itself)",
  "[A_4Du]":"they (2) (themselves)",
  "[A_4Pl]":"they all (3+) (themselves)",
//   "[P_3Sg]":"her,\xa0him,\xa0it\xa0(other)",
//   "[P_3Du]":"the\xa0two\xa0of\xa0them\xa0(others)",
//   "[P_3Pl]":"them\xa0all\xa0(3+)\xa0(others)",
  "[P_3Sg]":"another",
  "[P_3Du]":"two others",
  "[P_3Pl]":"3+ others",
  "[P_1Sg]":"me",
  "[P_1Du]":"the\xa0two\xa0of\xa0us",
  "[P_1Pl]":"us\xa0all\xa0(3+)",
  "[P_2Sg]":"you",
  "[P_2Du]":"the\xa0two\xa0of\xa0you",
  "[P_2Pl]":"you\xa0all\xa0(3+)",
  "[P_4Sg]":"her,\xa0him,\xa0it\xa0(itself)",
  "[P_4Du]":"the\xa0two\xa0of\xa0them\xa0(themselves)",
  "[P_4Pl]":"them\xa0all\xa0(3+)\xa0(themselves)",
  "[SgUnpd]":"the one",
  "[DuUnpd]":"the two",
  "[PlUnpd]":"the 3+",
  "[SgPosd]":"one",
  "[DuPosd]":"two",
  "[PlPosd]":"three or more",
  "[3SgPoss]":"his/her/its\xa0(other)",
  "[3DuPoss]":"their\xa0(2)\xa0(other)",
  "[3PlPoss]":"their\xa0(3+)\xa0(other)",
  "[1SgPoss]":"my",
  "[1DuPoss]":"our\xa0(2)",
  "[1PlPoss]":"our\xa0(3+)",
  "[2SgPoss]":"your\xa0(1)",
  "[2DuPoss]":"your\xa0(2)",
  "[2PlPoss]":"your\xa0(3+)",
  "[4SgPoss]":"his/her/its\xa0own",
  "[4DuPoss]":"their\xa0own\xa0(2)",
  "[4PlPoss]":"their\xa0own\xa0(3+)",
  "[3Sg]":"it\xa0(other)",
  "[3Du]":"them\xa0(2)\xa0(other)",
  "[3Pl]":"them\xa0(3+)\xa0(other)",
  "[1Sg]":"me",
  "[1Du]":"us\xa0(2)",
  "[1Pl]":"us\xa0(3+)",
  "[2Sg]":"you\xa0(1)",
  "[2Du]":"you\xa0(2)",
  "[2Pl]":"you\xa0(3+)",
  "[4Sg]":"itself",
  "[4Du]":"themselves\xa0(2)",
  "[4Pl]":"themselves\xa0(3+)",
};

const endingEnglishDescriptions = {
  "[Ind]":"(is, are, am)",
  "[Intrg]":"(question)",
  "[Opt]":"(do it!)",
  "[Sbrd]":"(please do, being)",
  "[Ptcp]":"(the one being, special case)",
  "[Prec]":"(before)",
  "[Cnsq]":"(because)",
  "[Cont]":"(whenever)",
  "[Conc]":"(although, even if)",
  "[Cond]":"(if, when in future)",
  "[CtmpI]":"(when in past)",
  "[CtmpII]":"(while)",
  "[Abs]":"the",
  "[Rel]":"the",
  "[Abl_Mod]":"[a, some] from",
  "[Loc]":"in or at",
  "[Ter]":"toward",
  "[Via]":"through or using",
  "[Equ]":"like or similar to",
  "[Quant_Qual]":"Quantifier/Qualifier Inflection",
}

const endingDescriptions = [
"1) statements; 2) “yes-no” questions, usually with enclitic =qaa",
"1) content questions; 2) exclamations with the postbase @5+pag- | ~vag-",
"1) commands, requests, suggestions; 2) statements in narrative with the postbase ki- and a third person ending",
"1) actions or states subordinate to that of the main verb and involving the same subject; 2) requests, commands, suggestions with a second person ending",
"1) exclamations, usually with tang; 2) certain special constructions (see maaten and =wa)",
"“before”",
"“because”",
"“whenever”",
"“although, even though, even if” ",
"“if, when (in the future)”",
"“when (in the past)” ",
"“while”",
"1) subject of an intransitive verb; 2) object of a transitive verb",
"1) subject of a transitive verb; 2) possessor; 3) “independent relative construction,” see section on roots in Generation Introduction, and Appendix 1, for further information",
"1) place from which, time from which; 2) indefinite ob􏰑ect of an intransitive verb; 3) specifying information about a noun within a verb; 4) secondary object especially with verbs of speaking and giving; 5) instrument (only in some dialects)",
"1) place at which, time at which; 2) object of a comparison; 3) with postbase @5+paa | ~vaa and enclitic =lli in exclamations; 4) formal vocative",
"1) place to which, time to which; 2) subject of an embedded verb",
"1) route; 2) instrument; 3) part of a whole",
"1) comparison; 2) language specification; 3) price specification",
];

const exampleSentences = [
"Pissurtuq - It is hunting. Maqillruuk - They two took a steambath.",
"Qangvaq ayallrua? - When did he go? Caqatarcit? - What will you do?",
"Neri - Eat. Taisgu - You bring it here.",
"Cukaluni - quickly it being. Qantan painqercaarluku - Your plate, lick it clean please",
"Tang qavalria. - Look, it's sleeping. Maaten itertua anelria. - I came in; lo and behold, he went out.",
"Ayagpailgan tunluku. - Before he leaves, give it to him.",
"Ayaksaituq arenqiapakaan ellalluk. - He hasn’t gone because of this bad weather.",
"Ner'aqami tamuanqegcaalartuq. - Whenever she eats she chews her food well.",
"Pingraan ayagyugtua - Even though that's the case I want to go.",
"Paallakuvet. If you fall forward. Anglirikuni - When he grows up.",
"Akngirtuq atrallermini. - He got hurt when he was coming down.",
"Ayainanermini. - While he was going.",
"Kuv'uq saskaq. - It spilled (the glass). Pissullrua maqaruaq - It hunted the rabbit.",
"Angutem quyavikaa - the man was thankful to her. Ciquyam pania - Ciquyaq's daughter",
"Ner'uq akutamek - It is eating some akutaq. Elitnaurvigmek utertuq. - From the school, she's coming home. Kuuvviaryuucimnek aptuq. - He's asking about whether I am wanting coffee.",
"Mermi. - In the water. Nunani. - In the lands.",
"Kipusvigmun piyuaguq. To the store, he's walking.",
"Angyakun ayagtut. - They are going by boat.",
"Aatamegcetun yurartut. - They are dancing like they're father. Yugtun. - Like a Yuk.",
];


class SearchPage extends Component {
  constructor(props) {
    super(props);
    // console.log("SearchPage props: ", props);
    this.state = {
      dictionary: [],
      dictionaryNouns: [],
      dictionaryVerbs: [],
      wordsList: [],
      yugtunAnalyzer: props.location.state === undefined ? false : props.location.state.yugtunAnalyzer,
      search: props.location.state === undefined ? '' : props.location.state.search,
      currentWord: {},
      onlyCommon: false,
      startingSearch: true,
      // smallestParseIndex: -1,
      parses: props.location.state === undefined ? [] : props.location.state.parses,
      segments: props.location.state === undefined ? [] : props.location.state.segments,
      endingrule: props.location.state === undefined ? [] : props.location.state.endingrule,

      // parses:[],
      // segments:[],
      // endingrule:[],
      currentTableOpen: -1,
      getCall:false,
      // notFirstParse: false,
      // searchBarStuckTop: false,
      searchBarStuckTop: props.location.state === undefined ? false : props.location.state.searchBarStuckTop,
      notFirstParse: props.location.state === undefined ? false : props.location.state.notFirstParse,
      searchWord: props.location.state === undefined ? "" : props.location.state.searchWord,
      activeSentenceIndex: props.location.state === undefined ? 0 : props.location.state.activeSentenceIndex,
      // exampleSentenceSearch: false,
      // smallestParse:[[],[]],
      // segmentOutputList:[],
      // searchWord:"",
      // activeSentenceIndex: 0,
      // activeTabIndex:0,
      showMoreEnding: false,
      moreIndex:-1,
      updateSearchEntry: props.location.state === undefined ? false : props.location.state.updateSearchEntry,
      activeTabIndex: props.location.state === undefined ? 0 : props.location.state.activeTabIndex,

      // exampleSentenceSearch: props.location.state === undefined ? false : props.location.state.exampleSentenceSearch,
      newSearchList: props.location.state === undefined ? [] : props.location.state.newSearchList,
      activeIndex:-1,
      loaderOn:true,
      entries:undefined,
      hover:-1,
      seeMoreActive:false,
      segment: "",
      moods: ["[Ind]","[Intrg]","[Opt]","[Sbrd]","[Ptcp]","[Prec]","[Cnsq]","[Cont]","[Conc]","[Cond]","[CtmpI]","[CtmpII]","[Abs]","[Rel]","[Abl_Mod]","[Loc]", "[Ter]","[Via]","[Equ]","%5BQuant_Qual%5D","[PerPro]","[PerPro]","[PerPro]","[PerPro]","[PerPro]","[PerPro]","[PerPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]",],
    }
    this.getParse = this.getParse.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.search_container = React.createRef();
    this.getEndings = this.getEndings.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.inputClicked = this.inputClicked.bind(this);
  }

  componentDidMount() {
    let start = now();
    if (this.state.updateSearchEntry) {
      this.inputClicked();
      this.setState({ updateSearchEntry: false });
    }
    if (dictionary.length === 0) {
      axios
        .get(API_URL + "/word/all")
        .then(response => {
          let end = now();
          ReactGA.timing({
            category: 'Loading',
            variable: 'dictionary',
            value: (end-start).toFixed(3),
            label: 'Dictionary loading'
          });
          dictionary = response.data;
          // fuse.setCollection(dictionary);
          // fuse1.setCollection(dictionary);
          console.log('Fetched dictionary');

          dictionary.forEach(entry => dictionary_dict[entry.yupik] = entry.english) // create dictionary_dict dictionary
          // dictionary_prepared = fuzzysort.prepare(dictionary)

          this.setState({ dictionary: dictionary });
        });
    }
    else {
      // fuse.setCollection(dictionary);
      this.setState({ dictionary: dictionary });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dictionary.length !== this.state.dictionary.length) {
      this.onChangeSearch(undefined, {value: this.state.search});
    }
    if (prevState.search !== this.state.search) {
    	this.setState({searchBarStuckTop:true});
    }
    if (prevState.startingSearch && !this.state.startingSearch) {
      if(navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        let elts = ReactDOM.findDOMNode(this).getElementsByClassName('search_container');
        if (elts.length > 0) {
          elts[0].scrollIntoView();
        }
      }
    }
  }

  getParse(word) {
    axios
      .get(API_URL + "/parse/" + word)
      .then(response => {
        // console.log(response)
        //  var lowest = 0;
         // var a = response.data.parses;
        //  for (var i = 1; i < a.length; i++) {
        //   if (a[i].length < a[lowest].length) 
        //     lowest = i;
        //  }
        // console.log(a)
        // let sortedParses = response.data.parses.sort(function(a,b){return a.length - b.length;}).slice(0, 5)
        // console.log(sortedParses)
        this.setState({
          parses: response.data.parses,
          segments: response.data.segments,
          endingrule: response.data.endingrule,
          getCall:false,
      	})

        // let segmentOutputList = [];
        // sortedParses.map((i,index)=>
        //   this.getSegment(i)
        //   )
        // console.log(segmentOutputList)
        

        // if (a.length > 0) {
	       // 	this.setState({
	       //    smallestParseIndex: lowest,
	       //    smallestParse: response.data.parses[lowest].split('-'),
	       //  });
          // this.getSegment(response.data.parses[lowest])
	      // }
      });
  }

  getSegment(word) {
    axios
      .get(API_URL + "/segment/" + encodeURIComponent(word))
      .then(response => {
        // return response.data.words[0]
        console.log(response)
        // this.setState({
          // segment: response.data.words[0],
        // })
      });
  }

  getEndings(word, mood) {
    console.log("Word",word,mood)
    axios
      .get(API_URL + "/mood?underlying_form=" + encodeURIComponent(word) + "&mood=" + mood)
      .then(response => {
        this.setState({ entries: response.data.results,}); 
        this.setState({ loaderOn: false})
    });
  }

  onChangeSearch(event, data) {
    // this.setState({entries:undefined, activeIndex:-1, loaderOn: true, seeMoreActive:false,currentTableOpen: -1,})
    let newStartingSearch = event === undefined;
    let new_search = data.value;
    // console.log(new_search)
    // if (data.value === undefined) {new_search = this.state.search}

    let wordsList = fuzzysort.go(new_search, dictionary, optionsFuzzy).map(({ obj }) => (obj));
    this.setState({ startingSearch: newStartingSearch, wordsList: wordsList, search: new_search });

    // if (new_search.length >= 4 && !this.state.yugtunAnalyzer) {
    //   ReactGA.event({
    //     category: 'User',
    //     action: 'Search word',
    //     label: new_search
    //   });
    //   let start = now();
    //   let wordsList = fuse.search(new_search);
    //   let end = now();
    //   console.log('done! in ', (end-start).toFixed(3), 'ms');
    //   ReactGA.timing({
    //     category: 'Search',
    //     variable: 'fuse.search',
    //     value: (end-start).toFixed(3),
    //     label:'Fuse.js search duration'
    //   });
    //   this.setState({ startingSearch: newStartingSearch, wordsList: wordsList, search: new_search });
    // }
    // else {
    //   this.setState({ startingSearch: newStartingSearch, search: new_search });
    // }
  }

  selectWord(word, event) {
    this.setState({ currentWord: word });
  }

  resetCurrentWord(event, data) {
    this.setState({ currentWord: {} });
  }

  handleRef = (c) => {
    this.inputRef = c;
  }

  handleClick = (e, titleProps) => {
    // console.log(e,titleProps)
    this.setState({ loaderOn: true,})
    const { index, currentIndex } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    let mood = this.state.moods[index]
    this.getEndings(this.state.parses[currentIndex],mood)
    this.setState({activeIndex: newIndex, mood: mood})
  }

  handleClick2 = (e, titleProps) => {
    // console.log(e,titleProps)
    const { index, currentIndex } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    console.log(index)
    let mood = this.state.moods[index]
    // console.log(mood)
    this.setState({loaderOn:false, entries: (mood === "[DemPro]" ? demPro: perPro), activeIndex: newIndex, mood: mood})
  }

onKeyPress = (e) => {
  if(e.key === 'Enter') {//} && (this.state.activeTabIndex === 0 || this.state.search !== this.state.searchWord)){
    // if (!this.state.yugtunAnalyzer && this.state.parses.length === 0) {this.setState({getCall:true})}
    // this.setState({ yugtunAnalyzer: !this.state.yugtunAnalyzer}); 
    // if (this.state.yugtunAnalyzer) {
      // this.setState({activeTabsIndex:1})
      this.inputClicked(true)
    // }
  }
}

inputClicked(search) {
  this.setState({entries:undefined, activeIndex:-1, loaderOn: true, seeMoreActive:false,currentTableOpen: -1,yugtunAnalyzer:true,showMoreEnding: false,})
  // console.log(search)
  if (search === undefined || search === true) {
  	search = this.state.search
  }
  console.log(search)
  if (search.length > 0) {
    this.setState({ 
      newSearchList: search.split(" "), 
      activeSentenceIndex: 0, 
      searchWord: search.split(" ")[0].replace(/[^a-zA-Z\-̄͡͞ńḿ']/g, "").toLowerCase(),
      getCall:true,
      notFirstParse:true,
    }); 
    this.getParse(search.split(" ")[0].replace(/[^a-zA-Z\-̄͡͞ńḿ']/g, "").toLowerCase());                          
  } 
  //   this.inputRef.focus();
  //   this.setState({
  //     search: '', startingSearch: false
  //   });
  // }
}

endingToEnglish(ending,index,qindex) {
  const tags = [...ending.matchAll(/\[.*?\]/g)];
  var english1 = ""
  var english2 = ""
  var english3 = ""
  var english4 = ""
  var before = true;
	// console.log(this.state,tags[1])
  if (ending.includes('[V]')) {
    if (this.state.parses[index].includes('[Ind]') ||
        this.state.parses[index].includes('[Intrg]') ||
        this.state.parses[index].includes('[Opt]') ||
        this.state.parses[index].includes('[Sbrd]')) {
      before = false;
    }
    english1 += 'Verb Ending';
    english2 += endingToEnglishTerms[tags[1]];
    english4 += endingEnglishDescriptions[tags[1]];
    if (ending.includes('[Trns]')) {
	  var subject = endingToEnglishTerms[tags[tags.length-2]]
	  if (subject === undefined ) {
	  	subject = 'unspecified'
	  }
      english3 += subject + " to " + endingToEnglishTerms[tags[tags.length-1]];

      } else if (ending.includes('[Intr]')) {
        english3 += endingToEnglishTerms[tags[tags.length-1]];
      }
    } else if (ending.includes('[N]')) {
      english1 += 'Noun Ending';
      english2 += endingToEnglishTerms[tags[1]];
  		if (ending.includes('[Abs]')) {
  			english4 = ""
  		} else {
  			english4 += endingEnglishDescriptions[tags[1]];
  		}      
      if (ending.includes('Poss')) {
        english3 += endingToEnglishTerms[tags[tags.length-2]] + "\xa0" + endingToEnglishTerms[tags[tags.length-1]];
      } else {
        english3 += endingToEnglishTerms[tags[tags.length-1]];
      }
    } else if (this.state.parses[index].includes('[D')) {
      english1 += 'Demonstrative';
      english2 += endingToEnglishTerms[tags[0]];
      english4 += endingEnglishDescriptions[tags[0]];
      if (endingToEnglishTerms[tags[1]] !== undefined) {
      	english3 += endingToEnglishTerms[tags[1]];      	
      }
    } else if (this.state.parses[index].includes('[P')) {
      english1 += 'Personal Pronoun';
      english2 += endingToEnglishTerms[tags[0]];
      english4 += endingEnglishDescriptions[tags[0]];
      english3 += endingToEnglishTerms[tags[1]];      	
    } else if (this.state.parses[index].includes('[Q')) {
      english1 = '';
      english2 += endingToEnglishTerms[tags[0]];
      english4 += endingEnglishDescriptions[tags[0]];
      if (endingToEnglishTerms[tags[1]] !== undefined) {
      	english3 += endingToEnglishTerms[tags[1]];      	
      }
    } else {
      english1 += ending;
      english2 += endingToEnglishTerms[tags[0]];
      english4 += endingEnglishDescriptions[tags[0]];
      if (endingToEnglishTerms[tags[1]] !== undefined) {
      	english3 += endingToEnglishTerms[tags[1]];      	
      }	
    }
    return (
    <div style={{paddingTop:15,paddingLeft:20*qindex}}>
    <div style={{fontWeight:'bold'}}>{this.state.endingrule[index][1].join(', ')}</div>
    <div>
    {before && english4.length !== 0 ?
    <span>
    {english4+'\xa0'}
    </span>
    :
    null
    }
    <span>{english3}</span>
    {!before ?
    <span>
    {'\xa0'+english4}
    </span>
    :
    null
    }
    </div>
    <div onClick={()=>this.setState({showMoreEnding:(this.state.moreIndex !== index || !this.state.showMoreEnding ? true : false),moreIndex:index})}style={{color:'#bdbdbd',fontWeight:'100',paddingTop:5,paddingBottom:5,cursor:'pointer'}}>{'more'}<Icon style={{paddingLeft:5,fontSize:12}} name={this.state.showMoreEnding && index === this.state.moreIndex ? 'chevron up' : 'chevron down'} /></div>

    {this.state.showMoreEnding && index === this.state.moreIndex ?
    <div style={{marginLeft:15}}>
	    <div>{english2}</div>
	    <div>{english1}</div>
	    <div onClick={()=> window.open("http://www.yugtun.com/symbols")} style={{color:'#4183c4',fontWeight:'100',textDecoration:'underline',paddingTop:10, cursor:'pointer'}}>{'Caugat symbol-aat?'}</div>
    </div>
    :
    null
	}
    </div>
    )
  }

  resetAll = (e,data) => {
  	this.setState({
  		search:'',
      newSearchList:[],
      parses:[],
      segments:[],
      searchWord:"",
      notFirstParse:false,
  	})
  }

  handleTabChange = (e,data) => {
    // console.log(data.activeIndex, this.state.activeIndex)
    if (data.activeIndex === 0 && this.state.activeTabIndex !== 0) {
      this.setState({ yugtunAnalyzer: false, activeTabIndex:0,parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false,search:""})
    } else if (data.activeIndex === 1 && this.state.activeTabIndex !== 1) {
      // if (!this.state.yugtunAnalyzer) {
      this.setState({ yugtunAnalyzer: true, activeTabIndex:1, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false,search:""});                     
      // this.inputClicked()
      // }
    }
  }

  getLinks(index, parse) {
  	// console.log(parse)
    if (index === 0) {            // if base
      if ((parse[index].includes("[P") || parse[index].includes("[I")) && parse.length === 1) {  // if particle or ignorative
        return parse[index].split("[")[0].replace('u͡g','ug');
      } else if (parse[index].includes("[PerPro]")) {
        return parse[index].split("[")[0]
      } else if (parse[index].includes("[DemPro]") || parse[index].includes("[DemAdv]")) {
        var dem = parse[index].replace("n[DemPro]","n'a")
        dem = dem.replace("[DemPro]","na")
        dem = dem.replace("[DemAdv]","(ni)")
        return dem
      } else {
        var base = parse[0];
        base = base.split(/\[[^e]/)[0] // remove special tag
        var dictionaryForm = '';
        // console.log("getLinks:",base,index,parse)
        if (parse[1].includes('[N')) {                      // if Noun base:
          dictionaryForm = base.replace(/([aeiu])te\b/, "$1n");              // Vte -> n
          dictionaryForm = dictionaryForm.replace(/([^\[])e\b/, "$1a")      // e -> a
          dictionaryForm = dictionaryForm.replace(/g\b/, "k");      // g -> k
          dictionaryForm = dictionaryForm.replace(/r(\*)?\b/, "q$1"); // r(*) -> q(*)
        } else if (parse[1].includes('[V') || parse[1].includes('[Q')) {
          dictionaryForm = base+"-"       // if Verb or Quant_Qual base 
        } else {
          dictionaryForm = base
        }
        return dictionaryForm;          
      }
    } else {
		if (parse[index].includes("ete[N→V]")) {
      		return "ete[N→V]"
      	}
    }
    // else (["[N→N]","[N→V]","[V→V]","[V→N]","[Encl]"].some(v => parse[index].includes(v))) { //if postbase or enclitic
    return parse[index];
  }

  render() {
    console.log("SearchPage state: ", this.state);
    // console.log("dictionary: ",dictionary_dict);
    // console.log("fuse.js: ",fuse.search('pissur'))
    // console.log("Fuzzysort: ",fuzzysort.go('pissur', dictionary, optionsFuzzy));
    // console.log("Fuzzysort_prepared: ",fuzzysort.go('pissur', dictionary_prepared, optionsFuzzy));

    // console.log("pissur-[V][Ind][Intr][S_3Sg]=qaa[Encl]".split('-'))

    let displayList = this.state.search.length >= 2 && this.state.wordsList.length > 0;
    let emptyList = this.state.search.length >= 2 && this.state.wordsList.length === 0 && !this.state.yugtunAnalyzer;
    let pressEnter = this.state.search.length > 0 && this.state.yugtunAnalyzer && this.state.newSearchList.length === 0;
    let wordsList = this.state.wordsList;
    const { activeIndex } = this.state
    let isCommonList = wordsList.map((word) => {
      return Object.keys(word).some((key) => {
        return word[key].properties && word[key].properties.indexOf('common') > -1;
      });
    });
    if (this.state.onlyCommon) {
      wordsList = wordsList.filter((word, i) => { return isCommonList[i]; });
    }
    let displayCommonOption = this.state.onlyCommon || (wordsList.some((word, i) => { return isCommonList[i]; }) && wordsList.some((word, i) => { return !isCommonList[i]; }));
  const panes = [
    {
      menuItem: {content:'Dictionary',size:'massive'}
    },
    {
      menuItem: 'Yugtun to English',
    },
  ]
    const accordionTitlesVerbs = [
      "Indicative (it is...)",
      "Interrogative (question)",
      "Optative (do it...)",
      "Subordinative (please do or it being...)",
      "Participial (exclamation or special case)",
      "Precessive (before...)",
      "Consequential (because...)",
      "Contigent (whenever...)",
      "Concessive (although, even though, even if...)",
      "Conditional (if, when in the future...)",
      "Contemporative 1 (when in the past...)",
      "Contemporative 2 (while...)",
      ];
    // const accordionTitlesVerbs = [
    //   "it is... (indicative)",
    //   "question (interrogative)",
    //   "do it... (optative)",
    //   "please do or it being...(subordinative))",
    //   "exclamation or special case (participial)",
    //   "before... (precessive)",
    //   "because... (consequential)",
    //   "whenever... (contingent)",
    //   "although, even though, even if... (concessive)",
    //   "if, when in the future... (conditional)",
    //   "when in the past... (contemporative 1)",
    //   "while... (contemporative 2)",
    //   ];
    // const accordionTitlesVerbs = [
    //   "it is... (Indicative)",
    //   "question (Interrogative)",
    //   "do it... (Optative)",
    //   "please do or it being... (Subordinative))",
    //   "exclamation or special case (Participial)",
    //   "before... (Precessive)",
    //   "because... (Consequential)",
    //   "whenever... (Contingent)",
    //   "although, even though, even if... (Concessive)",
    //   "if, when in the future... (Conditional)",
    //   "when in the past... (Contemporative 1)",
    //   "while... (Contemporative 2)",
    //   ];
    const accordionTitlesNouns = [
      "Absolutive (the)",
      "Relative (the)",
      "Ablative-Modalis (a, some, from)",
      "Localis (in, at)",
      "Terminalis (toward)",
      "Vialis (through, using)",
      "Equalis (like, similar to)",
      ];
    const accordionTitlesQuantQual = [
      "Absolutive (the)",
      "Relative (the possessor, owner)",
      "Ablative-Modalis (a, some, from)",
      "Localis (in, at)",
      "Terminalis (toward)",
      "Vialis (through, using)",
      "Equalis (like, similar to)",
      ];
    const persPronounLabels = ["[Abs]","[Rel]","[Abl_Mod]","[Loc]","[Ter]","[Via]","[Equ]"];

    let persPronounSubjects = [
    "[3Sg]",
    "[3Du]",
    "[3Pl]",
    "[1Sg]",
    "[1Du]",
    "[1Pl]",
    "[2Sg]",
    "[2Du]",
    "[2Pl]",
    "[4Sg]",
    "[4Du]",
    "[4Pl]",
    ];
    let persPronounsEnglish = [
    "it\xa0(other)",
    "them\xa0(2)\xa0(other)",
    "them\xa0(3+)\xa0(other)",
    "me",
    "us\xa0(2)",
    "us\xa0(3+)",
    "you\xa0(1)",
    "you\xa0(2)",
    "you\xa0(3+)",
    "itself",
    "themselves\xa0(2)",
    "themselves\xa0(3+)",
    ]
    let demPronounTitles = [
    "over there or going away",
    "across there",                                                
    "up the slope",
    "up above",
    "inside, inland, or upriver",
    "outside",
    "down below or down the slope",
    "downriver or near the exit",
    "here, near speaker",
    "there, near listener or in context",                                        
    "coming this way",
    ]
    let demPronounSubjects = [
	"[Abs][SgUnpd]",
	"[Abs][DuUnpd]",
	"[Abs][PlUnpd]",
	"[Rel][SgUnpd]",
	"[Rel][DuUnpd]",
	"[Rel][PlUnpd]",
	"[Abl_Mod][SgUnpd]",
	"[Abl_Mod][DuUnpd]",
	"[Abl_Mod][PlUnpd]",
	"[Loc][SgUnpd]",
	"[Loc][DuUnpd]",
	"[Loc][PlUnpd]",
	"[Ter][SgUnpd]",
	"[Ter][DuUnpd]",
	"[Ter][PlUnpd]",
	"[Via][SgUnpd]",
	"[Via][DuUnpd]",
	"[Via][PlUnpd]",
	"[Equ][SgUnpd]",
	"[Equ][DuUnpd]",
	"[Equ][PlUnpd]",
	"[Voc][SgUnpd]",
	"[Voc][DuUnpd]",
	"[Voc][PlUnpd]",
	"",
	"[Loc]",
	"[Ter]",
	"[Sec_Ter]",
	"[Abl]",
	"[Via]",
	"=i[Encl]",
	]
	let demPronounEnglish = [
	"absolutive singular",
	"absolutive dual",
	"absolutive plural",
	"relative singular",
	"relative dual",
	"relative plural",
	"abl-modalis singular",
	"abl-modalis dual",
	"abl-modalis plural",
	"localis singular",
	"localis dual",
	"localis plural",
	"terminalis singular",
	"terminalis dual",
	"terminalis plural",
	"vialis singular",
	"vialis dual",
	"vialis plural",
	"equalis singular",
	"equalis dual",
	"equalis plural",
	"vocative singular",
	"vocative dual",
	"vocative plural",
	"",
	"localis",
	"terminalis",
	"second terminalis",
	"ablative",
	"vialis",
	"predicative",
	]
    return (
      <div>
      <YugtunLoader criteria={this.state.dictionary.length === 0} />
      <Grid textAlign='center' style={{ height: window.innerHeight/1.5 }} verticalAlign={this.state.searchBarStuckTop ? 'top' : 'top'}>
      <Grid.Row style={{height:40,paddingBottom:0}}>
      <Grid.Column>
      <div style={{display:'flex',justifyContent:'flex-end',paddingBottom:5}}>
      <List horizontal divided>
        <List.Item> <a style={{textDecoration:'underline',color:'#000000de'}} href={TUTORIAL_URL}>Tutorial</a> </List.Item>
        <List.Item> <Link style={{textDecoration:'underline',color:'#000000de'}} to='/about'>About</Link> </List.Item>
      </List>
      </div>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{paddingTop:0}}>
      <Grid.Column style={{ maxWidth: 800, padding: 10 }} textAlign='left'>
        <Header as='h1'>
          <Image onClick={this.resetAll} style={{'fontSize': '1.5em',cursor:'pointer'}} src={ICON_URL}/>          
          <span onClick={this.resetAll} style={{ color: 'black', verticalAlign: 'bottom',cursor:'pointer'}}>Yugtun</span>
        </Header>
        <Container style={{height: window.innerHeight}} ref={this.search_container} className='search_container'>
          	<Grid stackable>

          <Tab style={{paddingTop:10}} activeIndex={this.state.activeTabIndex} menu={{ secondary: true, pointing: true, size:'huge' }} panes={panes} onTabChange={this.handleTabChange} />

            <Grid.Row >
              <Grid.Column style={{ flex: 1, paddingTop:0 }}>
              {this.state.yugtunAnalyzer ?
              <Input
                ref={this.handleRef}
                placeholder='Search by Yugtun...'
                action={{ icon:'search', transparent:true,size:'huge', onClick: () => this.inputClicked()}}
                // icon={<Icon name='search' onClick={console.log('hi')} link />}
                iconPosition='right'
                size='huge'
                onChange={this.onChangeSearch}
                value={this.state.search}
                onKeyPress={this.onKeyPress}
                fluid  />
                :
              <Input
                ref={this.handleRef}
                placeholder='Search a word...'
                // action={{ icon: (this.state.yugtunAnalyzer ? 'search' : null), transparent:true,size:'huge', onClick: () => 
                // {this.state.yugtunAnalyzer ? this.inputClicked() : null}
                // }}
                // icon={<Icon name='x' onClick={console.log('hi')} link />}
                // iconPosition='right'
                size='huge'
                onChange={this.onChangeSearch}
                value={this.state.search}
                // onKeyPress={this.onKeyPress}
                fluid  />                
              }
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.yugtunAnalyzer && (this.state.search.length > 0 || this.state.notFirstParse) ?
            <Segment vertical style={{fontSize:22,padding:0,marginTop:20,maxHeight:145,overflow: 'auto',borderBottom:0}}>
            <div style={{display:'flex',flexWrap:'wrap'}}>
            {this.state.newSearchList.map((i,index) => 

              <span onClick={()=>{
                if (index !== this.state.activeSentenceIndex) {
                this.setState({ 
                  getCall:true,
                  activeSentenceIndex: index, 
                  searchWord: this.state.newSearchList[index].replace(/[^a-zA-Z\-̄͡͞ńḿ']/g, "").toLowerCase(),
                  parses:[],segments:[],endingrule:[],entries:undefined, activeIndex:-1, loaderOn: true, seeMoreActive:false,currentTableOpen: -1,
                });
                this.getParse(this.state.newSearchList[index].replace(/[^a-zA-Z\-̄͡͞ńḿ']/g, "").toLowerCase());
                }
              }} 
			  onMouseEnter={()=> {this.setState({hover:index})}}
			  onMouseLeave={()=> {this.setState({hover:-1})}}
              style={{marginTop:10,paddingBottom:(this.state.activeSentenceIndex === index || this.state.hover === index ? 3 : 5),cursor:'pointer',marginRight:6,borderBottomColor: 'red',
              borderBottom: (this.state.activeSentenceIndex === index || this.state.hover === index ? '3px solid #000000DE': '1px solid #000000DE'),
              color:'#000000DE',
            }}>{i}</span>
            )}
            </div>
            </Segment>
          :
          null
        }
          {this.state.getCall ?
          	<div style={{paddingTop:20}}>
            <Divider />
          	<Loader active inline />
          	</div>
          	:
          	null
          }
          
          {this.state.yugtunAnalyzer && this.state.parses.length === 0 && !this.state.getCall && this.state.notFirstParse ?
            <div style={{paddingTop:20}}>
            <Divider />
          	<div style={{fontStyle:'italic',marginTop:10}}>No results. Pisciigatuq. Type a complete Yugtun word.</div>
            </div>
          	:
          	null
          } 
          {pressEnter ? <p><i>Press enter to parse. Must be complete Yugtun word(s).</i></p> : ''}
          {this.state.yugtunAnalyzer && !this.state.getCall && (this.state.search.length > 0 || this.state.notFirstParse) ?
            <div style={{paddingTop:20}}>
            {this.state.parses.map((i,index)=>
              <div>
              <Divider />
              <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{paddingBottom:10}}>
              <Label circular color={'#E5E5E5'}>
              {index+1}
              </Label>
              </div>
              {index === 0 ?
	              <div style={{fontSize:16,color:'#deb103',fontWeight:'300'}}>
	              {'Most Likely Result'}
	              </div>
	              :
	              null
	          }
              </div>

              <div style={{fontSize:20}}>{this.state.segments[index].replace(/>/g,'·')}</div>

              {i.split('-').map((q,qindex) => 
                (qindex === this.state.endingrule[index][0] ?
                  (this.endingToEnglish(q,index,qindex))
                  :
                  <div style={{paddingTop:15,paddingLeft:qindex*20}}>
                    {this.getLinks(qindex,i.split('-')) in dictionary_dict ?
                      <div>
                      <div style={{fontWeight:'bold',fontFamily:'Lato',textDecoration:'underline'}}>
                      <Link to={{pathname: this.getLinks(qindex,i.split('-')), state: { word: this.getLinks(qindex,i.split('-')), search: this.state.search, newSearchList: this.state.newSearchList, wordsList: this.state.wordsList, yugtunAnalyzer: this.state.yugtunAnalyzer, parses: this.state.parses, segments:this.state.segments,endingrule:this.state.endingrule, searchBarStuckTop: this.state.searchBarStuckTop, notFirstParse:this.state.notFirstParse, searchWord:this.state.searchWord, activeSentenceIndex:this.state.activeSentenceIndex, activeTabIndex: this.state.activeTabIndex }}}>
                      <span>
                      {q}
                      </span>
                      </Link>
                      </div>                  
                      {dictionary_dict[this.getLinks(qindex,i.split('-'))]}
                      </div>
                      :
                      <div style={{fontWeight:'bold',fontFamily:'Lato',textDecoration:'underline'}}>
                      {q}
                      </div>   
                    }
                  </div>
                ))}
            <div style={{paddingTop:15, paddingBottom:15, textAlign:'center'}}>
            {!this.state.parses[index].includes('-') && (this.state.parses[index].includes('[I') || this.state.parses[index].includes('[P')) ?
	            null
	            :
	            <Button basic color='blue' style={{fontFamily:'sans-serif'}} onClick={()=>{this.setState({currentTableOpen:(this.state.currentTableOpen === index ? -1 : index), activeIndex:-1})}}>
	            {this.state.currentTableOpen === index ?
	              <div>
	              {"See Less Endings"}
	              <Icon style={{paddingLeft:10}} name='chevron up' />
	              </div>
	              :
	              <div>
	              {"See More Endings"}
	              <Icon style={{paddingLeft:10}} name='chevron down' />
	              </div>
	            }            
	            </Button>
        	}
            </div>
              {this.state.currentTableOpen === index ?
                (this.state.parses[index].includes('[V]') ?
                  <Accordion fluid styled>
                    {accordionTitlesVerbs.map((p,pindex) =>
                      <div>
                        <Accordion.Title
                          active={activeIndex === pindex}
                          index={pindex}
                          currentIndex={index}
                          onClick={this.handleClick}
                        >
                          <Icon name='dropdown' />
                          {p}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === pindex}>
                        <div style={{'paddingBottom':15}}>{endingDescriptions[pindex]}</div>   
                        <div style={{'paddingBottom':10,fontStyle:'italic'}}>{"Examples: "+exampleSentences[pindex]}</div>   
                          {this.state.loaderOn ? 
                            <Loader active inline />
                            :
                            <div>
                      <TableEntry
                        entries={this.state.entries}
                        mood={this.state.mood}                  
                      />
                        <div style={{fontStyle:'italic','paddingTop':15,'paddingBottom':5}}>{"Note: Many verb bases can be intransitive-only, transitive-only, or only allow certain endings. There are occasional mistakes."}</div>      
                        </div>                                        
                          }
                        </Accordion.Content>
                      </div>
                      )}
                  </Accordion> 
                  :
                  (this.state.parses[index].includes('[N]') ?
	                  <Accordion fluid styled>
	                    {accordionTitlesNouns.map((p,pindex) =>
	                      <div>
	                        <Accordion.Title
	                          active={activeIndex === pindex+12}
	                          index={pindex+12}
	                          currentIndex={index}
	                          onClick={this.handleClick}
	                        >
	                          <Icon name='dropdown' />
	                          {p}
	                        </Accordion.Title>
	                        <Accordion.Content active={activeIndex === pindex+12}>
	                        <div style={{'paddingBottom':15}}>{endingDescriptions[pindex+12]}</div>     
                        	<div style={{'paddingBottom':15,fontStyle:'italic'}}>{"Examples: "+exampleSentences[pindex+12]}</div>   	                                                             
	                          {this.state.loaderOn ? 
	                          	<div style={{'textAlign':'center'}}>
	                            <Loader active inline  />
	                            </div>
	                            :
	                      <TableEntry
	                        entries={this.state.entries}
	                        mood={this.state.mood}                  
	                      />
	                          }
	                        </Accordion.Content>
	                      </div>
	                      )}
	                  </Accordion> 
                  	:
                  	(this.state.parses[index].includes('[Q') ?
                  	  <Accordion fluid styled>
	                      <div>
	                        <Accordion.Title
	                          active={activeIndex === 19}
	                          index={19}
	                          currentIndex={index}
	                          onClick={this.handleClick}
	                        >
	                          <Icon name='dropdown' />
	                          {'Quantifier/Qualifier Inflections'}
	                        </Accordion.Title>
	                        <Accordion.Content active={activeIndex === 19}>
	                          {this.state.loaderOn ? 
	                          	<div style={{'textAlign':'center'}}>
	                            <Loader active inline  />
	                            </div>
	                            :
	                      <TableEntry
	                        entries={this.state.entries}
	                        mood={this.state.mood}                  
	                      />
	                          }
	                        </Accordion.Content>
	                      </div>
	                  </Accordion> 
                  		:
                  		(this.state.parses[index].includes('[P') ?
		                  <Accordion fluid styled> 
		                    {accordionTitlesNouns.map((p,pindex) =>
		                      <div>
		                        <Accordion.Title
		                          active={activeIndex === pindex+20}
		                          index={pindex+20}
		                          currentIndex={index}
		                          onClick={this.handleClick2}
		                        >
		                          <Icon name='dropdown' />
		                          {p}
		                        </Accordion.Title>
		                        <Accordion.Content active={activeIndex === pindex+20}>
		                          {this.state.loaderOn ? 
		                          	<div style={{'textAlign':'center'}}>
		                            <Loader active inline  />
		                            </div>
		                            :
							        <div>
							        <Segment style={{margin:0,overflow: 'auto'}}>
							          <Table unstackable celled>
							            <Table.Header>
							              <Table.Row>
							                <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
							                <Table.HeaderCell></Table.HeaderCell>
							              </Table.Row>
							            </Table.Header>
							            <Table.Body>
							                {persPronounSubjects.map((i,index) => 
							                    <Table.Row>
							                      <Table.HeaderCell style={{color:"#002477"}}>{persPronounsEnglish[index]}</Table.HeaderCell>
							                      <Table.Cell style={{paddingLeft:10}}>{this.state.entries[persPronounLabels[pindex]+i].join(",\n").replace(/>/g,'')}</Table.Cell>
							                    </Table.Row>
							                )}
							            </Table.Body>
							          </Table>
							        </Segment>
							        </div>
		                          }
		                        </Accordion.Content>
		                      </div>
		                      )}
		                  </Accordion> 
                  			:
		                  <Accordion fluid styled>
		                    {demPronounTitles.map((p,pindex) =>
		                      <div>
		                        <Accordion.Title
		                          active={activeIndex === pindex+27}
		                          index={pindex+27}
		                          currentIndex={index}
		                          onClick={this.handleClick2}
		                        >
		                          <Icon name='dropdown' />
		                          {p}
		                        </Accordion.Title>
		                        <Accordion.Content active={activeIndex === pindex+27}>
		                          {this.state.loaderOn ? 
		                          	<div style={{'textAlign':'center'}}>
		                            <Loader active inline  />
		                            </div>
		                            :
							        	<div>
							        		  <div style={{fontStyle:'italic',marginTop:5,marginBottom:10}}>Extended: moving, long, or of large extent</div>
							        		  <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>Restricted: stationary, localized, visible</div>
							        		  <div style={{fontStyle:'italic',marginTop:10,marginBottom:20}}>Obscured: stationary, indistinct or out of sight</div>							        	
							        		<Segment style={{margin:0,overflow: 'auto'}}>	
									          <Table unstackable celled>
									            <Table.Header>
									              <Table.Row>
									                <Table.HeaderCell></Table.HeaderCell>
									                <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>Extended</Table.HeaderCell>
									                <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>Restricted</Table.HeaderCell>
									                <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>Obscured</Table.HeaderCell>
									              </Table.Row>
									              <Table.Row>
									                <Table.Cell style={{fontStyle:'italic'}}>pronoun forms:</Table.Cell>
									              </Table.Row>									              
									            </Table.Header>							        			                         
									            <Table.Body>
							                    	{demPronounSubjects.map((i,index) => 
								                    	(index === 24 ? 
										              <Table.Row>
											                <Table.Cell style={{fontStyle:'italic'}}>adverb forms:</Table.Cell>
										              </Table.Row>
								                    		:
										              <Table.Row>
								                    	<Table.HeaderCell style={{color:"#002477"}}>{demPronounEnglish[index]}</Table.HeaderCell>
								                    	{"extended" in this.state.entries[p] ? 
								                    	<Table.Cell style={{paddingLeft:10}}>{this.state.entries[p]['extended'][i].join(",\n").replace(/>/g,'')}</Table.Cell>
								                    	:
								                    	<Table.Cell style={{paddingLeft:10}}>{'-'}</Table.Cell>
								                    	}
								                    	{"restricted" in this.state.entries[p] ? 
								                    	<Table.Cell style={{paddingLeft:10}}>{this.state.entries[p]['restricted'][i].join(",\n").replace(/>/g,'')}</Table.Cell>
								                    	:
								                    	<Table.Cell style={{paddingLeft:10}}>{'-'}</Table.Cell>
								                    	}
								                    	{"obscured" in this.state.entries[p] ? 
								                    	<Table.Cell style={{paddingLeft:10}}>{this.state.entries[p]['obscured'][i].join(",\n").replace(/>/g,'')}</Table.Cell>
								                    	:
								                    	<Table.Cell style={{paddingLeft:10}}>{'-'}</Table.Cell>
								                    	}	
								                      </Table.Row>		
								                    	)					                    									    
							                    	)}
									            </Table.Body>
									          </Table>							            
							        		</Segment>
							        	</div>
		                          }
		                        </Accordion.Content>
		                      </div>
		                      )}
		                  </Accordion> 
                  			)
                  		)
                  	)
                  )
                :
                null
              }
              </div>
              )}
          {this.state.newSearchList.length !== 0 ?
            <div>
            <Divider style={{paddingBottom:0}} />
            <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',height:60,paddingBottom:16}}>
              <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
              <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
              <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
              <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            </div>
            </div>
            :
            null
          }
            </div>
            :
            <List divided selection>
              {displayList && !this.state.yugtunAnalyzer ? 
              	wordsList.map((word) => 
              	<WordItem key={word} word={word} search={this.state.search} wordsList={this.state.wordsList} />)
              : 
              (this.state.search.length === 0 ?
				<div style={{display:'flex',justifyContent:'center'}}>
				<div style={{fontSize:'1.2rem',color:'#666',lineHeight:1.6,maxWidth:500}}>

          {!this.state.yugtunAnalyzer ?
          <div>
					<div style={{textDecoration:'underline',marginBottom:10,marginTop:15}}> Dictionary </div>
					<div style={{marginBottom:10}}> Type any English word or Yugtun base and the matching dictionary entries will show automatically.</div>
					<div> Examples: </div>
					<div>
					<span onClick={()=>{this.setState({search:'pissur',wordsList: fuzzysort.go('pissur', this.state.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>pissur-</span>
					<span>{', '}</span>
					<span onClick={()=>{this.setState({search:'akutaq',wordsList: fuzzysort.go('akutaq', this.state.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>akutaq</span>
					<span>{', '}</span>
					<span onClick={()=>{this.setState({search:'book',wordsList: fuzzysort.go('book', this.state.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>book</span>
          <span>{', '}</span>
          <span onClick={()=>{this.setState({search:'Christmas',wordsList: fuzzysort.go('Christmas', this.state.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>Christmas</span>					
          </div>
          </div>
          :
					<div>
					<div style={{textDecoration:'underline',marginBottom:10,marginTop:15}}> Yugtun to English </div>
					<div style={{marginBottom:10}}> Type any complete Yugtun word or sentence and press enter to see the meaning of each part of the word.  </div>
					<div> Examples: </div>
					<div>
          <span onClick={()=>{this.setState({search:"elitnaurvigmi",yugtunAnalyzer: true, activeTabIndex:1, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false}); this.inputClicked("elitnaurvigmi")}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>elitnaurvigmi</span>
          <span>{', '}</span>
					<span onClick={()=>{this.setState({search:"piipiqa popsicle-aamek ner'uq",yugtunAnalyzer: true, activeTabIndex:1, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false}); this.inputClicked("piipiqa popsicle-aamek ner'uq")}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>piipiqa popsicle-aamek ner'uq</span>
					<span>{', '}</span>
					<span onClick={()=>{this.setState({search:"ellami-lli assirpaa",yugtunAnalyzer: true, activeTabIndex:1, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false}); this.inputClicked("ellami-lli assirpaa")}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>ellami-lli assirpaa</span>
					</div>
					</div>
        }
				</div>
				</div>
				:
				null
				)
}
      {displayList && !this.state.yugtunAnalyzer ? 
        <div>
        <Divider style={{paddingBottom:0}} />
        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',height:60,paddingBottom:16}}>
          <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
          <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
          <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
          <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
        </div>
        </div>
        :
        null
      }
              {emptyList && !this.state.yugtunAnalyzer ? <p><i>Aren, no matches... for English you can only search by word... for Yugtun try Yugtun to English mode...</i></p> : ''}
            </List>
          }        
        </Container>
        </Grid.Column>
        </Grid.Row>
      </Grid>

      </div>
    );
  }
}

export default SearchPage;
