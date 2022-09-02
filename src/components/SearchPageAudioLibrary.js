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
// import GitHubForkRibbon from 'react-github-fork-ribbon';
import { YugtunLoader, YugtunFooter, WordItem, AudioItem, tagColors } from './SearchPageHelpers.js';
// import TableEntry from './TableEntry.js';
// import {demPro, perPro} from './constants/pronounEndings.js';
// import {endingRules} from './constants/endingRules.js';

// Cache dictionary
// let dictionary = [];
// let audiolibrary = []
// let dictionary_dict = {};
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
  keys: ['y', 'e'],
  limit: 50, // don't return more results than you need!
  threshold: -10000, // don't return bad results
};


// const endingToEnglishTerms = {
//   "[Ind]":"Indicative (Statement Form)",
//   "[Intrg]":"Interrogative (Question Form)",
//   "[Opt]":"Optative (Command Form)",
//   "[Sbrd]":"Subordinative (Polite Command or -ing Form)",
//   "[Ptcp]":"Participial",
//   "[Prec]":"Precessive (before...)",
//   "[Cnsq]":"Consequential (because...)",
//   "[Cont]":"Contigent (whenever...)",
//   "[Conc]":"Concessive (although, even though, even if...)",
//   "[Cond]":"Conditional (if, when in the future...)",
//   "[CtmpI]":"Contemporative 1 (when in fthe past...)",
//   "[CtmpII]":"Contemporative 2 (while...)",
//   "[Abs]":"Absolutive",
//   "[Rel]":"Relative",
//   "[Abl_Mod]":"Ablative-Modalis (indirect object, from...)",
//   "[Loc]":"Localis (in, at...)",
//   "[Ter]":"Terminalis (toward...)",
//   "[Via]":"Vialis (through, using...)",
//   "[Equ]":"Equalis (like, similar to...)",
//   "[Quant_Qual]":"Quantifier/Qualifier Inflection",
//   "[S_3Sg]":"he,\xa0she,\xa0it",
//   "[S_3Du]":"they\xa0(2)",
//   "[S_3Pl]":"they\xa0all\xa0(3+)",
//   "[S_1Sg]":"I",
//   "[S_1Du]":"we\xa0(2)",
//   "[S_1Pl]":"we\xa0all\xa0(3+)",
//   "[S_2Sg]":"you",
//   "[S_2Du]":"you\xa0(2)",
//   "[S_2Pl]":"you\xa0all\xa0(3+)",
//   "[S_4Sg]":"he, she, it (itself)",
//   "[S_4Du]":"they (2) (themselves)",
//   "[S_4Pl]":"they all (3+) (themselves)",
//   "[A_3Sg]":"he,\xa0she,\xa0it",
//   "[A_3Du]":"they\xa0(2)",
//   "[A_3Pl]":"they\xa0all\xa0(3+)",
//   "[A_1Sg]":"I",
//   "[A_1Du]":"we\xa0(2)",
//   "[A_1Pl]":"we\xa0all\xa0(3+)",
//   "[A_2Sg]":"you",
//   "[A_2Du]":"you\xa0(2)",
//   "[A_2Pl]":"you\xa0all\xa0(3+)",
//   "[A_4Sg]":"he, she, it (itself)",
//   "[A_4Du]":"they (2) (themselves)",
//   "[A_4Pl]":"they all (3+) (themselves)",
// //   "[P_3Sg]":"her,\xa0him,\xa0it\xa0(other)",
// //   "[P_3Du]":"the\xa0two\xa0of\xa0them\xa0(others)",
// //   "[P_3Pl]":"them\xa0all\xa0(3+)\xa0(others)",
//   "[P_3Sg]":"another",
//   "[P_3Du]":"two others",
//   "[P_3Pl]":"3+ others",
//   "[P_1Sg]":"me",
//   "[P_1Du]":"the\xa0two\xa0of\xa0us",
//   "[P_1Pl]":"us\xa0all\xa0(3+)",
//   "[P_2Sg]":"you",
//   "[P_2Du]":"the\xa0two\xa0of\xa0you",
//   "[P_2Pl]":"you\xa0all\xa0(3+)",
//   "[P_4Sg]":"her,\xa0him,\xa0it\xa0(itself)",
//   "[P_4Du]":"the\xa0two\xa0of\xa0them\xa0(themselves)",
//   "[P_4Pl]":"them\xa0all\xa0(3+)\xa0(themselves)",
//   "[SgUnpd]":"the one",
//   "[DuUnpd]":"the two",
//   "[PlUnpd]":"the 3+",
//   "[SgPosd]":"one",
//   "[DuPosd]":"two",
//   "[PlPosd]":"three or more",
//   "[3SgPoss]":"his/her/its\xa0(other)",
//   "[3DuPoss]":"their\xa0(2)\xa0(other)",
//   "[3PlPoss]":"their\xa0(3+)\xa0(other)",
//   "[1SgPoss]":"my",
//   "[1DuPoss]":"our\xa0(2)",
//   "[1PlPoss]":"our\xa0(3+)",
//   "[2SgPoss]":"your\xa0(1)",
//   "[2DuPoss]":"your\xa0(2)",
//   "[2PlPoss]":"your\xa0(3+)",
//   "[4SgPoss]":"his/her/its\xa0own",
//   "[4DuPoss]":"their\xa0own\xa0(2)",
//   "[4PlPoss]":"their\xa0own\xa0(3+)",
//   "[3Sg]":"it\xa0(other)",
//   "[3Du]":"them\xa0(2)\xa0(other)",
//   "[3Pl]":"them\xa0(3+)\xa0(other)",
//   "[1Sg]":"me",
//   "[1Du]":"us\xa0(2)",
//   "[1Pl]":"us\xa0(3+)",
//   "[2Sg]":"you\xa0(1)",
//   "[2Du]":"you\xa0(2)",
//   "[2Pl]":"you\xa0(3+)",
//   "[4Sg]":"itself",
//   "[4Du]":"themselves\xa0(2)",
//   "[4Pl]":"themselves\xa0(3+)",
// };

// const endingEnglishDescriptions = {
//   "[Ind]":"(is, are, am)",
//   "[Intrg]":"(question)",
//   "[Opt]":"(do it!)",
//   "[Sbrd]":"(please do, being)",
//   "[Ptcp]":"(the one being, special case)",
//   "[Prec]":"(before)",
//   "[Cnsq]":"(because)",
//   "[Cont]":"(whenever)",
//   "[Conc]":"(although, even if)",
//   "[Cond]":"(if, when in future)",
//   "[CtmpI]":"(when in past)",
//   "[CtmpII]":"(while)",
//   "[Abs]":"the",
//   "[Rel]":"the",
//   "[Abl_Mod]":"[a, some, from]",
//   "[Loc]":"in or at",
//   "[Ter]":"toward",
//   "[Via]":"through or using",
//   "[Equ]":"like or similar to",
//   "[Quant_Qual]":"Quantifier/Qualifier Inflection",
// }

// const endingDescriptions = [
// "1) statements; 2) “yes-no” questions, usually with enclitic =qaa",
// "1) content questions; 2) exclamations with the postbase @5+pag- | ~vag-",
// "1) commands, requests, suggestions; 2) statements in narrative with the postbase ki- and a third person ending",
// "1) actions or states subordinate to that of the main verb and involving the same subject; 2) requests, commands, suggestions with a second person ending",
// "1) exclamations, usually with tang; 2) certain special constructions (see maaten and =wa)",
// "“before”",
// "“because”",
// "“whenever”",
// "“although, even though, even if” ",
// "“if, when (in the future)”",
// "“when (in the past)” ",
// "“while”",
// "1) subject of an intransitive verb; 2) object of a transitive verb",
// "1) subject of a transitive verb; 2) possessor; 3) “independent relative construction,” see section on roots in Generation Introduction, and Appendix 1, for further information",
// "1) place from which, time from which; 2) indefinite object of an intransitive verb; 3) specifying information about a noun within a verb; 4) secondary object especially with verbs of speaking and giving; 5) instrument (only in some dialects)",
// "1) place at which, time at which; 2) object of a comparison; 3) with postbase @+paa|~vaa and enclitic =lli in exclamations; 4) formal vocative",
// "1) place to which, time to which; 2) subject of an embedded verb",
// "1) route; 2) instrument; 3) part of a whole",
// "1) comparison; 2) language specification; 3) price specification",
// ];

// const exampleSentences = [
// "1) Pissurtuq. - It is hunting. 2) Maqillruuk-qaa? - Did they two took a steambath?",
// "1) Qangvaq ayallrua? - When did he go? Caqatarcit? - What will you do? 2) Caperrnaqvagta. - How difficult it is.",
// "1) Neri. - Eat. Taisgu. - Bring it here. 2) Tan'gaurluq qanqili, 'Maurluuq!, naw'un iterciqsia?' - The boy said (literally: let the boy say), 'Grandmother!, through where will I get in?'",
// "1) Cukaluni aqvaqurtuq. - She is running quickly. 2) Qantan painqegcaarluku. - Lick your plate clean, please.",
// "1) Tang, qavalria. - Look, it's sleeping. 2) Maaten itertua anelria. - I came in; lo and behold, he went out.",
// "Ayagpailgan payugeskiu. - Before he leaves, bring him food.",
// "Ayaksaituq arenqiapakaan ellalluk. - He hasn’t gone because of this bad weather.",
// "Ner'aqami tamuanqegcaalartuq. - Whenever she eats, she chews her food well.",
// "Pingraan ayagyugtua. - Even though that's the case, I want to go.",
// "Anglirikuni elitnauristen͞guyugtuq. - When he grows up, he wants to be a teacher.",
// "Akngirtuq atrallermini. - He got hurt when he was coming down.",
// "Ayainanermini igtellruuq. - While he was going, he fell.",
// "1) Saskaq kuv'uq. - The glass spilled. 2) Maqaruaq pissullrua. - He hunted the rabbit.",
// "1) Angutem quyavikaa. - The man was thankful to her. 2) Ciquyam pania cen̄irtuq. - Ciquyaq's daughter is visiting.",
// "1) Elitnaurvigmek utertuq. - She's coming home from the school. 2) Ner'uq akutamek. - She is eating some akutaq. 3) Nutaramek qayaliuq. - He is making a new kayak. 4) Aanama kuuvviaryuucimnek aptaanga. - My mother is asking me whether I want coffee.",
// "1) Mermi uitauq. - It is in the water. 2) Aatamni sugtunruunga. - I am taller than my dad. 3) Akertem̄i-lli puqlanirpaa! - How warm the sun is! 4) Elpet angutmi, niicugninga. - You man, listen to me.",
// "1) Kipusvigmun piyuaguq. - He's walking to the store. 2) Arnam neresqaa neqa taqukamun. - The woman asks/tells the bear to eat the fish.",
// "1) Tumyarakun ayallruuq. - He went by the path. 2) Angyakun ayagtut. - They are going by boat. 3) Qercuallruunga it'gamkun. - I got frostbitten on my feet.",
// "1) Aatamegcetun yurartut. - They are dancing like their father. 2) Una Yugtun cauga? - What is this in Yup'ik? 3) Akingqertuq malrugtun. - It is two dollars.",
// ];


class SearchPage extends Component {
  constructor(props) {
    super(props);
    // console.log("SearchPage props: ", props);
    this.state = {
      // dictionary: [],
      // dictionaryNouns: [],
      // dictionaryVerbs: [],
      // audiolibrary: [],
      wordsList: [],
      // yugtunAnalyzer: props.location.state === undefined ? false : props.location.state.yugtunAnalyzer,
      search: props.location.state === undefined ? '' : props.location.state.search,
      // currentWord: {},
      // onlyCommon: false,
      startingSearch: true,
      // smallestParseIndex: -1,
      // parses: props.location.state === undefined ? [] : props.location.state.parses,
      // segments: props.location.state === undefined ? [] : props.location.state.segments,
      // endingrule: props.location.state === undefined ? [] : props.location.state.endingrule,

      // parses:[],
      // segments:[],
      // endingrule:[],
      // currentTableOpen: -1,
      // getCall:false,
      // notFirstParse: false,
      // searchBarStuckTop: false,
      searchBarStuckTop: props.location.state === undefined ? false : props.location.state.searchBarStuckTop,
      // notFirstParse: props.location.state === undefined ? false : props.location.state.notFirstParse,
      // searchWord: props.location.state === undefined ? "" : props.location.state.searchWord,
      // activeSentenceIndex: props.location.state === undefined ? 0 : props.location.state.activeSentenceIndex,
      // exampleSentenceSearch: false,
      // smallestParse:[[],[]],
      // segmentOutputList:[],
      // searchWord:"",
      // activeSentenceIndex: 0,
      // activeTabIndex:0,
      // showMoreEnding: false,
      // moreIndex:-1,
      // updateSearchEntry: props.location.state === undefined ? false : props.location.state.updateSearchEntry,
      // activeTabIndex: props.location.state === undefined ? 0 : props.location.state.activeTabIndex,

      // exampleSentenceSearch: props.location.state === undefined ? false : props.location.state.exampleSentenceSearch,
      // newSearchList: props.location.state === undefined ? [] : props.location.state.newSearchList,
      // activeIndex:-1,
      // loaderOn:true,
      // entries:undefined,
      // hover:-1,
      // seeMoreActive:false,
      // segment: "",
      // possibleDefinition: ["","","","","","","","","",""],
      // moods: ["[Ind]","[Intrg]","[Opt]","[Sbrd]","[Ptcp]","[Prec]","[Cnsq]","[Cont]","[Conc]","[Cond]","[CtmpI]","[CtmpII]","[Abs]","[Rel]","[Abl_Mod]","[Loc]", "[Ter]","[Via]","[Equ]","%5BQuant_Qual%5D","[PerPro]","[PerPro]","[PerPro]","[PerPro]","[PerPro]","[PerPro]","[PerPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]","[DemPro]",],
      activeAudioIndex: {},
    }
    // this.getParse = this.getParse.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    // this.selectWord = this.selectWord.bind(this);
    this.search_container = React.createRef();
    // this.getEndings = this.getEndings.bind(this);
    // this.getLinks = this.getLinks.bind(this);
    // this.inputClicked = this.inputClicked.bind(this);
  }

  componentDidMount() {
    this.resetAll();
  }
  //   let start = now();
  //   if (this.state.updateSearchEntry) {
  //     this.inputClicked();
  //     this.setState({ updateSearchEntry: false });
  //   }
  //   if (dictionary.length === 0) {
  //     axios
  //       .get(API_URL + "/word/all2021")
  //       .then(response => {
  //         let end = now();
  //         ReactGA.timing({
  //           category: 'Loading',
  //           variable: 'dictionary',
  //           value: (end-start).toFixed(3),
  //           label: 'Dictionary loading'
  //         });
  //         dictionary = response.data;
  //         // fuse.setCollection(dictionary);
  //         // fuse1.setCollection(dictionary);
  //         console.log('Fetched dictionary');

  //         dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
  //         // dictionary_prepared = fuzzysort.prepare(dictionary)

  //         this.setState({ dictionary: dictionary });
  //       });

  //     axios
  //       .get(API_URL + "/audiolibrary/all")
  //       .then(response => {
  //         // let end = now();
  //         // ReactGA.timing({
  //         //   category: 'Loading',
  //         //   variable: 'dictionary',
  //         //   value: (end-start).toFixed(3),
  //         //   label: 'Dictionary loading'
  //         // });
  //         audiolibrary = response.data;
  //         // fuse.setCollection(dictionary);
  //         // fuse1.setCollection(dictionary);
  //         console.log('Fetched AudioLibrary');

  //         // dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
  //         // dictionary_prepared = fuzzysort.prepare(dictionary)

  //         this.setState({ audiolibrary: audiolibrary });
  //       });

  //   }
  //   else {
  //     // fuse.setCollection(dictionary);
  //     this.setState({ dictionary: dictionary });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.dictionary.length !== this.state.dictionary.length) {
    //   this.onChangeSearch(undefined, {value: this.state.search});
    // }

    // if (this.props.audiolibrary.length !== this.state.audiolibrary.length) {
    //   this.setState({audiolibrary:this.props.audiolibrary});
    //   // this.setState({dictionary_dict:this.props.dictionary_dict})
    // }

    if (this.props.reset !== prevProps.reset) {
      this.resetAll()
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

  // getParse(word) {
  //   if (word === "") {
  //     this.setState({
  //         parses: [],
  //         segments: [],
  //         endingrule: [],
  //         getCall:false,
  //       })
  //   } else {
  //   axios
  //     .get(API_URL + "/parse/" + word)
  //     .then(response => {
  //       // console.log(response)
  //       //  var lowest = 0;
  //        // var a = response.data.parses;
  //       //  for (var i = 1; i < a.length; i++) {
  //       //   if (a[i].length < a[lowest].length) 
  //       //     lowest = i;
  //       //  }
  //       // console.log(a)
  //       // let sortedParses = response.data.parses.sort(function(a,b){return a.length - b.length;}).slice(0, 5)
  //       // console.log(sortedParses)
  //       this.setState({
  //         parses: response.data.parses,
  //         segments: response.data.segments,
  //         endingrule: response.data.endingrule,
  //         getCall:false,
  //     	})

  //       // let segmentOutputList = [];
  //       // sortedParses.map((i,index)=>
  //       //   this.getSegment(i)
  //       //   )
  //       // console.log(segmentOutputList)
        

  //       // if (a.length > 0) {
	 //       // 	this.setState({
	 //       //    smallestParseIndex: lowest,
	 //       //    smallestParse: response.data.parses[lowest].split('-'),
	 //       //  });
  //         // this.getSegment(response.data.parses[lowest])
	 //      // }
  //     });
  //   }
  // }

  // getSegment(word) {
  //   axios
  //     .get(API_URL + "/segment/" + encodeURIComponent(word))
  //     .then(response => {
  //       // return response.data.words[0]
  //       console.log(response)
  //       // this.setState({
  //         // segment: response.data.words[0],
  //       // })
  //     });
  // }

  // getEndings(word, mood) {
  //   console.log("Word",word,mood)
  //   axios
  //     .get(API_URL + "/mood?underlying_form=" + encodeURIComponent(word) + "&mood=" + mood)
  //     .then(response => {
  //       this.setState({ entries: response.data.results,}); 
  //       this.setState({ loaderOn: false})
  //   });
  // }

  onChangeSearch(event, data) {
    // this.setState({entries:undefined, activeIndex:-1, loaderOn: true, seeMoreActive:false,currentTableOpen: -1,})
    let newStartingSearch = event === undefined;
    let new_search = data.value.replace("’","'");
    // console.log(new_search)
    // if (data.value === undefined) {new_search = this.state.search}


    let wordsList = fuzzysort.go(new_search, this.props.audiolibrary, optionsFuzzy).map(({ obj }) => (obj));
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

  // selectWord(word, event) {
  //   this.setState({ currentWord: word });
  // }

  // resetCurrentWord(event, data) {
  //   this.setState({ currentWord: {} });
  // }

  handleRef = (c) => {
    this.inputRef = c;
  }

  // handleClick = (e, titleProps) => {
  //   // console.log(e,titleProps)
  //   this.setState({ loaderOn: true,})
  //   const { index, currentIndex } = titleProps
  //   const { activeIndex } = this.state
  //   const newIndex = activeIndex === index ? -1 : index
  //   let mood = this.state.moods[index]
  //   this.getEndings(this.state.parses[currentIndex],mood)
  //   this.setState({activeIndex: newIndex, mood: mood})
  // }

  // handleClick2 = (e, titleProps) => {
  //   // console.log(e,titleProps)
  //   const { index, currentIndex } = titleProps
  //   const { activeIndex } = this.state
  //   const newIndex = activeIndex === index ? -1 : index
  //   console.log(index)
  //   let mood = this.state.moods[index]
  //   // console.log(mood)
  //   this.setState({loaderOn:false, entries: (mood === "[DemPro]" ? demPro: perPro), activeIndex: newIndex, mood: mood})
  // }

// onKeyPress = (e) => {
//   if(e.key === 'Enter') {//} && (this.state.activeTabIndex === 0 || this.state.search !== this.state.searchWord)){
//     // if (!this.state.yugtunAnalyzer && this.state.parses.length === 0) {this.setState({getCall:true})}
//     // this.setState({ yugtunAnalyzer: !this.state.yugtunAnalyzer}); 
//     // if (this.state.yugtunAnalyzer) {
//       // this.setState({activeTabsIndex:1})
//       this.inputClicked(true)
//     // }
//   }
// }

// inputClicked(search) {
//   this.setState({entries:undefined, activeIndex:-1, loaderOn: true, seeMoreActive:false,currentTableOpen: -1,yugtunAnalyzer:true,showMoreEnding: false,})
//   // console.log(search)
//   if (search === undefined || search === true) {
//   	search = this.state.search
//   }
//   console.log(search)
//   if (search.length > 0) {
//     this.setState({ 
//       newSearchList: search.split(" "), 
//       activeSentenceIndex: 0, 
//       searchWord: search.split(" ")[0].replace(/[^a-zA-Z\-̄͡͞ńḿ']/g, "").toLowerCase(),
//       getCall:true,
//       notFirstParse:true,
//     }); 
//     this.getParse(search.split(" ")[0].replace(/[^a-zA-Z\-̄͡͞ńḿ']/g, "").toLowerCase());                          
//   } 
//   //   this.inputRef.focus();
//   //   this.setState({
//   //     search: '', startingSearch: false
//   //   });
//   // }
// }

// endingToEnglish(ending,index,qindex) {
//   const tags = [...ending.matchAll(/\[.*?\]/g)];
//   var english1 = ""
//   var english2 = ""
//   var english3 = ""
//   var english4 = ""
//   var before = true;
// 	// console.log(this.state,tags[1])
//   if (ending.includes('[V]')) {
//     if (this.state.parses[index].includes('[Ind]') ||
//         this.state.parses[index].includes('[Intrg]') ||
//         this.state.parses[index].includes('[Opt]') ||
//         this.state.parses[index].includes('[Sbrd]')) {
//       before = false;
//     }
//     english1 += 'Verb Ending';
//     english2 += endingToEnglishTerms[tags[1]];
//     english4 += endingEnglishDescriptions[tags[1]];
//     if (ending.includes('[Trns]')) {
// 	  var subject = endingToEnglishTerms[tags[tags.length-2]]
// 	  if (subject === undefined ) {
// 	  	subject = 'unspecified'
// 	  }
//       english3 += subject + " to " + endingToEnglishTerms[tags[tags.length-1]];

//       } else if (ending.includes('[Intr]')) {
//         english3 += endingToEnglishTerms[tags[tags.length-1]];
//       }
//     } else if (ending.includes('[N]')) {
//       english1 += 'Noun Ending';
//       english2 += endingToEnglishTerms[tags[1]];
//   		if (ending.includes('[Abs]')) {
//   			english4 = ""
//   		} else {
//   			english4 += endingEnglishDescriptions[tags[1]];
//   		}      
//       if (ending.includes('Poss')) {
//         english3 += endingToEnglishTerms[tags[tags.length-2]] + "\xa0" + endingToEnglishTerms[tags[tags.length-1]];
//       } else {
//         english3 += endingToEnglishTerms[tags[tags.length-1]];
//       }
//     } else if (this.state.parses[index].includes('[D')) {
//       english1 += 'Demonstrative';
//       english2 += endingToEnglishTerms[tags[0]];
//       english4 += endingEnglishDescriptions[tags[0]];
//       if (endingToEnglishTerms[tags[1]] !== undefined) {
//       	english3 += endingToEnglishTerms[tags[1]];      	
//       }
//     } else if (this.state.parses[index].includes('[P')) {
//       english1 += 'Personal Pronoun';
//       english2 += endingToEnglishTerms[tags[0]];
//       english4 += endingEnglishDescriptions[tags[0]];
//       english3 += endingToEnglishTerms[tags[1]];      	
//     } else if (this.state.parses[index].includes('[Q')) {
//       english1 = '';
//       english2 += endingToEnglishTerms[tags[0]];
//       english4 += endingEnglishDescriptions[tags[0]];
//       if (endingToEnglishTerms[tags[1]] !== undefined) {
//       	english3 += endingToEnglishTerms[tags[1]];      	
//       }
//     } else {
//       english1 += ending;
//       english2 += endingToEnglishTerms[tags[0]];
//       english4 += endingEnglishDescriptions[tags[0]];
//       if (endingToEnglishTerms[tags[1]] !== undefined) {
//       	english3 += endingToEnglishTerms[tags[1]];      	
//       }	
//     }

//     // var possibleDefinition = this.state.possibleDefinition
//     // var entry = possibleDefinition[index]
//     // entry = entry + '\xa0' + english3
//     // possibleDefinition[index] = entry
//     // this.setState({possibleDefinition:possibleDefinition})

//     return (
//     <div style={{paddingTop:15,paddingLeft:20*qindex}}>
//     <div style={{fontWeight:'bold',fontSize:16,paddingBottom:'1px'}}>{this.state.endingrule[index][1].join(', ')}</div>
//     <div style={{fontSize:16}}>
//     {before && english4.length !== 0 ?
//     <span>
//     {english4+'\xa0'}
//     </span>
//     :
//     null
//     }
//     <span>{english3}</span>
//     {!before ?
//     <span>
//     {'\xa0'+english4}
//     </span>
//     :
//     null
//     }
//     </div>
//     <div onClick={()=>this.setState({showMoreEnding:(this.state.moreIndex !== index || !this.state.showMoreEnding ? true : false),moreIndex:index})}style={{color:'#bdbdbd',fontWeight:'100',paddingTop:10,paddingBottom:10,cursor:'pointer',fontSize:16}}>{'more'}<Icon style={{paddingLeft:5,fontSize:12}} name={this.state.showMoreEnding && index === this.state.moreIndex ? 'chevron up' : 'chevron down'} /></div>

//     {this.state.showMoreEnding && index === this.state.moreIndex ?
//     <div style={{marginLeft:15,fontSize:16}}>
// 	    <div>{english2}</div>
// 	    <div>{english1}</div>
// 	    <div onClick={()=> window.open("http://www.yugtun.com/symbols")} style={{color:'#4183c4',fontWeight:'100',textDecoration:'underline',paddingTop:10, cursor:'pointer'}}>{'Translation and Symbols'}</div>
//     </div>
//     :
//     null
// 	}
//     </div>
//     )
//   }

  resetAll = (e,data) => {
  	this.setState({
  		search:'',
      wordsList: [],
      activeAudioIndex: {},
      // newSearchList:[],
      // parses:[],
      // segments:[],
      // searchWord:"",
      // notFirstParse:false,
  	})
  }

  // handleTabChange = (e,data) => {
  //   // console.log(data.activeIndex, this.state.activeIndex)
  //   if (data.activeIndex === 0 && this.state.activeTabIndex !== 0) {
  //     this.setState({ yugtunAnalyzer: false, activeTabIndex:0,parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false,search:""})
  //   } else if (data.activeIndex === 1 && this.state.activeTabIndex !== 1) {
  //     // if (!this.state.yugtunAnalyzer) {
  //     this.setState({ yugtunAnalyzer: true, activeTabIndex:1, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false,search:""});                     
  //     // this.inputClicked()
  //     // }
  //   }
  // }

  // getLinks(index, parse) {
  // 	// console.log(parse)
  //   if (index === 0) {            // if base
  //     if ((parse[index].includes("[P") || parse[index].includes("[I")) && parse.length === 1) {  // if particle or ignorative
  //       return parse[index].split("[")[0].replace(/=/g,"-");
  //     } else if (parse[index].includes("[PerPro]")) {
  //       return parse[index].split("[")[0]
  //     } else if (parse[index].includes("[DemPro]") || parse[index].includes("[DemAdv]")) {
  //       var dem = parse[index].replace("n[DemPro]","n'a")
  //       dem = dem.replace("[DemPro]","na")
  //       dem = dem.replace("[DemAdv]","(ni)")
  //       return dem
  //     } else {
  //       var base = parse[0];
  //       base = base.split(/\[[^e]/)[0] // remove special tag
  //       var dictionaryForm = '';
  //       // console.log("getLinks:",base,index,parse)
  //       if (parse[1].includes('[N')) {                      // if Noun base:
  //         dictionaryForm = base.replace(/([aeiu])te\b/, "$1n");              // Vte -> n
  //         dictionaryForm = dictionaryForm.replace(/([^\[])e\b/, "$1a")      // e -> a
  //         dictionaryForm = dictionaryForm.replace(/g\b/, "k");      // g -> k
  //         dictionaryForm = dictionaryForm.replace(/r(\*)?\b/, "q$1"); // r(*) -> q(*)
  //       } else if (parse[1].includes('[V') || parse[1].includes('[Q')) {
  //         dictionaryForm = base+"-"       // if Verb or Quant_Qual base 
  //       } else {
  //         dictionaryForm = base
  //       }
  //       return dictionaryForm.replace(/=/g,"-");          
  //     }
  //   } else {
		// if (parse[index].includes("ete[N→V]")) {
  //     		return "ete[N→V]"
  //     	}
  //   }
  //   // else (["[N→N]","[N→V]","[V→V]","[V→N]","[Encl]"].some(v => parse[index].includes(v))) { //if postbase or enclitic
  //   return parse[index];
  // }

  repeatAudio(audio, event, data) {
    // console.log(audio.mp3)
    // var a = new Audio(API_URL+'static/WoW-Link.mp3');
    // a.play();
    // let a;
    // axios
    //   .get(API_URL + "/audiolibrary/" + audio.mp3)
    //   .then(response => {
    //     // let end = now();
    //     // ReactGA.timing({
    //     //   category: 'Loading',
    //     //   variable: 'dictionary',
    //     //   value: (end-start).toFixed(3),
    //     //   label: 'Dictionary loading'
    //     // });
    //     var a = new Audio(response.data);
    //     console.log(a)
    //     a.play();
    //     // fuse.setCollection(dictionary);
    //     // fuse1.setCollection(dictionary);
    //     // console.log('Fetched dictionary');

    //     // dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
    //     // // dictionary_prepared = fuzzysort.prepare(dictionary)

    //     // this.setState({ dictionary: dictionary });
    //   });

    let sound = new Audio(API_URL + "/audiolibrary/" +  audio.mp3);
    this.setState({loadingTTS: true});

    sound.play().then((e) => {
        this.setState({loadingTTS: false})
      }, (error) => {
        this.setState({loadingTTS: false, canTTS: false});
      }
    )

  }


  processUsageDefinition = (definition) => {
    // console.log(definition)
    let search = this.state.search
    let matches = definition.match(search)

    if (matches !== null) {
      matches.map((m) => definition = definition.replace(m,"<i>"+m+'</i>'))       
    }
    // let matches1 = definition.match(/\⎡.*?\⎤/g)
    // if (matches1 !== null) {
    //   matches1.map((m) => definition = definition.replace(m,'<i>'+m.slice(1,-1)+'</i>'))        
    // }

    // if (tag !== 'noun') {
    //   definition = '<i>it is </i>'+definition
    // } else {
    //   definition = '<i>the one </i>'+definition
    // }
    // console.log(sentence)
    // var dom = document.createElement('span');
    // dom.innerHTML = sentence;
    // console.log(definition)
    return <span dangerouslySetInnerHTML={{__html: definition}} />
  }   

  setActiveAudioIndex = (word, index) => {
    // console.log(word, index)
    let activeAudioIndex = this.state.activeAudioIndex
    if (index in activeAudioIndex) {
      delete activeAudioIndex[index]
      this.setState({activeAudioIndex:activeAudioIndex})
    } else {
      // activeAudioIndex.push(index)
      // console.log(word)


      axios
        .get(API_URL + "/audioentry/" + word.mp3)
        .then(response => {
          // let end = now();
          // ReactGA.timing({
          //   category: 'Loading',
          //   variable: 'dictionary',
          //   value: (end-start).toFixed(3),
          //   label: 'Dictionary loading'
          // });
          // audiolibrary = response.data;
          // fuse.setCollection(dictionary);
          // fuse1.setCollection(dictionary);
          // console.log(response.data);
          activeAudioIndex[index] = response.data
          this.setState({activeAudioIndex:activeAudioIndex})

          // dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
          // dictionary_prepared = fuzzysort.prepare(dictionary)

          // this.setState({ audiolibrary: audiolibrary });
        });


    }
    // console.log(activeAudioIndex)
    // this.setState({activeAudioIndex:activeAudioIndex})
  }



  render() {
    console.log("SearchPage state: ", this.state);
    // console.log("dictionary: ",dictionary_dict);
    // console.log("fuse.js: ",fuse.search('pissur'))
    // console.log("Fuzzysort: ",fuzzysort.go('pissur', dictionary, optionsFuzzy));
    // console.log("Fuzzysort_prepared: ",fuzzysort.go('pissur', dictionary_prepared, optionsFuzzy));

    // console.log("pissur-[V][Ind][Intr][S_3Sg]=qaa[Encl]".split('-'))

    let displayList = this.state.search.length >= 2 && this.state.wordsList.length > 0;
    let emptyList = this.state.search.length >= 2 && this.state.wordsList.length === 0;
    // let pressEnter = this.state.search.length > 0 && this.state.yugtunAnalyzer && this.state.newSearchList.length === 0;
    let wordsList = this.state.wordsList;
    // const { activeIndex } = this.state
    // let isCommonList = wordsList.map((word) => {
    //   return Object.keys(word).some((key) => {
    //     return word[key].properties && word[key].properties.indexOf('common') > -1;
    //   });
    // });
    // if (this.state.onlyCommon) {
    //   wordsList = wordsList.filter((word, i) => { return isCommonList[i]; });
    // }
    // let displayCommonOption = this.state.onlyCommon || (wordsList.some((word, i) => { return isCommonList[i]; }) && wordsList.some((word, i) => { return !isCommonList[i]; }));


    return (
          <Grid>
            <Grid.Row >
              <Grid.Column style={{ flex: 1, paddingTop:0 }}>
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
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{display:'flex',justifyContent:'center',padding:0,paddingLeft:14,paddingRight:14}}>
            <List style={{width:'100%'}} divided selection>
            {displayList  ? 
                wordsList.map((word, index) => 
                <List.Item >
                  <Button style={{float:'left', color:'#8F8F8F',cursor:'pointer'}} circular basic icon='volume up' onClick={()=>this.repeatAudio(word)} />
                  <Button style={{float:'right', color:'#8F8F8F',cursor:'pointer'}} basic icon='dropdown' onClick={()=>this.setActiveAudioIndex(word,index)} />
                  <List.Content>
                    <List.Header style={{width:'100%',display:'flex',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'16px',paddingBottom:'4px'}}>
                      {this.processUsageDefinition(word.y)}
                    </List.Header>
                    <List.Description style={{fontSize:'16px',fontWeight:'400'}}>{this.processUsageDefinition(word.e)}</List.Description>
                    {index in this.state.activeAudioIndex ?
                      <List.Description>
                        <div style={{paddingTop:'14px',paddingBottom:'6px'}}>
                            <div style={{marginBottom:'10px',paddingLeft:'6px',borderLeft:'solid 2px grey'}}>
                            <div>{'Speaker: '+this.state.activeAudioIndex[index]['content']['speaker']}</div>
                            <div>{'Collection: '+this.state.activeAudioIndex[index]['content']['collection']}</div>
                            <div>{'Source: '+this.state.activeAudioIndex[index]['content']['subtitleFilename']}</div>
                            </div>
                          {this.state.activeAudioIndex[index]['content']['link'].length !== 0 ?
                            <div>{'Link: '+this.state.activeAudioIndex[index]['content']['link']}</div>
                            :
                            null
                          }                       
                        </div>
                      </List.Description>
                      :
                      null
                    }
                    
                  </List.Content>
                </List.Item>
                )
              : 
              (this.state.search.length === 0 ?
                <div style={{display:'flex',justifyContent:'center'}}>
                  <div style={{fontSize:'1.2rem',color:'#666',lineHeight:1.6,maxWidth:500}}>

                    <div>
                    <div style={{textDecoration:'underline',marginBottom:10,marginTop:15}}> Audio Library </div>
                    <div style={{marginBottom:10}}> Type any English word or Yugtun word and matching audio entries will show automatically.</div>
                    <div> Examples: </div>
                    <div>
                    <span onClick={()=>{this.setState({search:'shaman',wordsList: fuzzysort.go('shaman', this.props.audiolibrary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>shaman</span>
                    <span>{', '}</span>
                    <span onClick={()=>{this.setState({search:'angalkuq',wordsList: fuzzysort.go('angalkuq', this.props.audiolibrary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>angalkuq</span>       
                    </div>
                    </div>

                  </div>
                </div>
                :
                null
              )
            }
            {displayList ? 
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
            {emptyList ? <p><i>Aren, no matches...</i></p> : ''}
            </List>

            </Grid.Row>

          </Grid>
    );
  }
}

export default SearchPage;
