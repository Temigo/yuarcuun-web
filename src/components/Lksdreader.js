import '../App.css';
import '../semantic/dist/semantic.min.css';
// import ReactPlayer from 'react-player'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Container, Header, Grid, Input, List, Label, Icon, Image, Button, Accordion, Table, Segment, Loader, Divider, Tab, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
// import Fuse from 'fuse.js';
import fuzzysort from 'fuzzysort'
import now from 'performance-now';
import ReactGA from 'react-ga';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { YugtunLoader, YugtunFooter, WordItem } from './SearchPageHelpers.js';
import TableEntry from './TableEntry.js';
import StoriesRetrieved from './constants/StoriesRetrieved.js';
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
  "[Abl_Mod]":"[a, some, from]",
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
"1) place from which, time from which; 2) indefinite object of an intransitive verb; 3) specifying information about a noun within a verb; 4) secondary object especially with verbs of speaking and giving; 5) instrument (only in some dialects)",
"1) place at which, time at which; 2) object of a comparison; 3) with postbase @+paa|~vaa and enclitic =lli in exclamations; 4) formal vocative",
"1) place to which, time to which; 2) subject of an embedded verb",
"1) route; 2) instrument; 3) part of a whole",
"1) comparison; 2) language specification; 3) price specification",
];

const exampleSentences = [
"1) Pissurtuq. - It is hunting. 2) Maqillruuk-qaa? - Did they two took a steambath?",
"1) Qangvaq ayallrua? - When did he go? Caqatarcit? - What will you do? 2) Caperrnaqvagta. - How difficult it is.",
"1) Neri. - Eat. Taisgu. - Bring it here. 2) Tan'gaurluq qanqili, 'Maurluuq!, naw'un iterciqsia?' - The boy said (literally: let the boy say), 'Grandmother!, through where will I get in?'",
"1) Cukaluni aqvaqurtuq. - She is running quickly. 2) Qantan painqegcaarluku. - Lick your plate clean, please.",
"1) Tang, qavalria. - Look, it's sleeping. 2) Maaten itertua anelria. - I came in; lo and behold, he went out.",
"Ayagpailgan payugeskiu. - Before he leaves, bring him food.",
"Ayaksaituq arenqiapakaan ellalluk. - He hasn’t gone because of this bad weather.",
"Ner'aqami tamuanqegcaalartuq. - Whenever she eats, she chews her food well.",
"Pingraan ayagyugtua. - Even though that's the case, I want to go.",
"Anglirikuni elitnauristen͞guyugtuq. - When he grows up, he wants to be a teacher.",
"Akngirtuq atrallermini. - He got hurt when he was coming down.",
"Ayainanermini igtellruuq. - While he was going, he fell.",
"1) Saskaq kuv'uq. - The glass spilled. 2) Maqaruaq pissullrua. - He hunted the rabbit.",
"1) Angutem quyavikaa. - The man was thankful to her. 2) Ciquyam pania cen̄irtuq. - Ciquyaq's daughter is visiting.",
"1) Elitnaurvigmek utertuq. - She's coming home from the school. 2) Ner'uq akutamek. - She is eating some akutaq. 3) Nutaramek qayaliuq. - He is making a new kayak. 4) Aanama kuuvviaryuucimnek aptaanga. - My mother is asking me whether I want coffee.",
"1) Mermi uitauq. - It is in the water. 2) Aatamni sugtunruunga. - I am taller than my dad. 3) Akertem̄i-lli puqlanirpaa! - How warm the sun is! 4) Elpet angutmi, niicugninga. - You man, listen to me.",
"1) Kipusvigmun piyuaguq. - He's walking to the store. 2) Arnam neresqaa neqa taqukamun. - The woman asks/tells the bear to eat the fish.",
"1) Tumyarakun ayallruuq. - He went by the path. 2) Angyakun ayagtut. - They are going by boat. 3) Qercuallruunga it'gamkun. - I got frostbitten on my feet.",
"1) Aatamegcetun yurartut. - They are dancing like their father. 2) Una Yugtun cauga? - What is this in Yup'ik? 3) Akingqertuq malrugtun. - It is two dollars.",
];


class SearchPage extends Component {
  constructor(props) {
    super(props);
    // console.log("SearchPage props: ", props);
    this.state = {
      video:'',
      audio:'',
      dictionary: [],
      dictionaryNouns: [],
      dictionaryVerbs: [],
      wordsList: [],
      yugtunAnalyzer: props.location.state === undefined ? false : props.location.state.yugtunAnalyzer,
      search: props.location.state === undefined ? '' : props.location.state.search,
      currentWord: {},
      onlyCommon: false,
      startingSearch: true,
      source:'',
      // smallestParseIndex: -1,
      parses: props.location.state === undefined ? [] : props.location.state.parses,
      segments: props.location.state === undefined ? [] : props.location.state.segments,
      endingrule: props.location.state === undefined ? [] : props.location.state.endingrule,
      storyClicked:false,
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
      possibleDefinition: ["","","","","","","","","",""],
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
    if (word === "") {
      this.setState({
          parses: [],
          segments: [],
          endingrule: [],
          getCall:false,
        })
    } else {
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
    let new_search = data.value.replace("’","'");
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

  retrieveStory = (title) => {
    let items = StoriesRetrieved(title)
    // console.log(items)
    let search = items[0]
    // let video = items[1]
    // let audio = items[2]
    this.setState({entries:undefined, activeIndex:-1, loaderOn: true, seeMoreActive:false,currentTableOpen: -1,yugtunAnalyzer:true,showMoreEnding: false,})
    // console.log(search)
    if (search === undefined || search === true) {
      search = this.state.search
    }
    console.log(search)
    if (search.length > 0) {
      this.setState({ 
        storyClicked:true,
        newSearchList: search.split(" "), 
        activeSentenceIndex: 0, 
        searchWord: search.split(" ")[0].replace(/[^a-zA-Z\-̄͡͞ńḿ']/g, "").toLowerCase(),
        getCall:true,
        notFirstParse:true,
        search:search,
        video:items[1],
        audio:items[2],
        source:items[3],
      }); 
      this.getParse(search.split(" ")[0].replace(/[^a-zA-Z\-̄͡͞ńḿ']/g, "").toLowerCase());                          
    } 
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

    // var possibleDefinition = this.state.possibleDefinition
    // var entry = possibleDefinition[index]
    // entry = entry + '\xa0' + english3
    // possibleDefinition[index] = entry
    // this.setState({possibleDefinition:possibleDefinition})

    return (
    <div style={{paddingTop:15,paddingLeft:20*qindex}}>
    <div style={{fontWeight:'bold',fontSize:16,paddingBottom:'1px'}}>{this.state.endingrule[index][1].join(', ')}</div>
    <div style={{fontSize:16}}>
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
    <div onClick={()=>this.setState({showMoreEnding:(this.state.moreIndex !== index || !this.state.showMoreEnding ? true : false),moreIndex:index})}style={{color:'#bdbdbd',fontWeight:'100',paddingTop:10,paddingBottom:10,cursor:'pointer',fontSize:16}}>{'more'}<Icon style={{paddingLeft:5,fontSize:12}} name={this.state.showMoreEnding && index === this.state.moreIndex ? 'chevron up' : 'chevron down'} /></div>

    {this.state.showMoreEnding && index === this.state.moreIndex ?
    <div style={{marginLeft:15,fontSize:16}}>
	    <div>{english2}</div>
	    <div>{english1}</div>
	    <div onClick={()=> window.open("http://www.yugtun.com/symbols")} style={{color:'#4183c4',fontWeight:'100',textDecoration:'underline',paddingTop:10, cursor:'pointer'}}>{'Translation and Symbols'}</div>
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
        return parse[index].split("[")[0].replace(/=/g,"-");
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
        return dictionaryForm.replace(/=/g,"-");          
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
        <Menu fixed='top'inverted>
          <Container>
            <Menu.Item onClick={()=>{this.setState({search:'',storyClicked:false})}} as='a' header>
              <Image style={{borderRadius:'2px',height:'30px',marginRight: '1.5em',}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/logo.jpg'}/>
              Conversational Yup'ik III
            </Menu.Item>
            <Dropdown item simple text='Materials'>
              <Dropdown.Menu>
                <Dropdown.Header>Weeks</Dropdown.Header>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Processing Food & Prep</span>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(0)}}>Week 1: Neqet Aklut-llu Auluklerkaat; Neqallret-gguq Akiinauyuut</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(1)}}>Week 2: Tepet</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(2)}}>Week 3: Yaqulegmek Uklilleq Nalugalria-llu</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(3)}}>Week 4: Uquucillret</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Celebrations & Ceremonies</span>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(4)}}>Week 1: Yuralallrat</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(5)}}>Week 2: Yuram Arulaciit Kangiit</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(6)}}>Week 3: Arnaulriim Ciuniuryaraa Issurimuq</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(7)}}>Week 4: Uqiqulleq</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Physical & Mental Health</span>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(8)}}>Week 1: Aqumgaurpeknak</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(9)}}>Week 2: Ulu Mik'lengermi Akngirnarquq</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(10)}}>Week 3: Tatailnguq</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(11)}}>Week 4: Ayagina'ar - Prevention Video</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Survival Skills</span>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(12)}}>Week 1: Ayaruicaqunak</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(13)}}>Week 2: Iqalluguat Negeqvam Taqellri Nallunailkutaugut</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(14)}}>Week 3: Agevkarluni Qanikcamun</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(15)}}>Week 4: Imarpigmi Augna Pilleq</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Kinship/Family Relations</span>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(16)}}>Week 1: Irniaput ayuqucirtuagaqluki piarkauyaaqelliniukut</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(17)}}>Week 2: Tuqluuucaraq</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(18)}}>Week 3: Ilakucaraq Atellgutkellriakun</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(19)}}>Week 4: Asmuuriyunaituq</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Yup'ik Lore</span>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(20)}}>Week 1: Saanigem Alangrua</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(21)}}>Week 2: Apanuugpak</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(22)}}>Week 3: Cetugpak</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(23)}}>Week 4: Uugnar Kaviaq-llu</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>        
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Our Environment</span>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(24)}}>Week 1: Yup'igtaat Ellangvikelput</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(25)}}>Week 2: C/Yuuyaraq</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(26)}}>Week 3: Nunam Qigciksaraa</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(27)}}>Week 4: Nutemllarput</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Seasonal Camps</span>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(28)}}>Week 1: Up'nerkillerni</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(29)}}>Week 2: Neqlilleq</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(30)}}>Week 3: Uksuilleq</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{this.retrieveStory(31)}}>Week 4: Uksillernun Uterrluteng Pilallrat</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>                
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
      <Grid textAlign='center'>
      <Grid.Row style={{paddingTop:0}}>
      <Grid.Column textAlign='left'>
        <Container style={{height: window.innerHeight}} ref={this.search_container} className='search_container'>
        {this.state.search.length > 0 && this.state.storyClicked  ?
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{flex:2}}>
              {this.state.video.length > 0 ?
                <div>
                <video key={this.state.video} style={{marginTop:'30px',marginBottom:'20px'}} width='600' controls>
                  <source src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/'+this.state.video} type="video/mp4" />
                </video>
                <div style={{fontStyle:'italic',marginBottom:'5px'}}>{'Source: '+this.state.source}</div> 
                </div>
                :
                (this.state.audio.length > 0 ?
                  <div style={{flex:1,marginTop:40}}>
                    <audio key={this.state.audio} controls>
                      <source src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/'+this.state.audio} type="audio/mpeg" />
                    </audio>
                    <div style={{fontStyle:'italic'}}>{'Source: '+this.state.source}</div> 
                  </div>
                  :
                  <div style={{marginTop:'35px',fontStyle:'italic'}}> 
                  <div style={{fontStyle:'italic'}}>{'Source: '+this.state.source}</div> 
                  </div>
                  )
              }
            </div>
            <div style={{flex:1,marginTop:40}}>
              {this.state.audio.length > 0 && this.state.video.length > 0 ?
                <audio key={this.state.audio}  controls>
                  <source src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/'+this.state.audio} type="audio/mpeg" />
                </audio>
                :
                null
              }
            </div>

          </div>
          :
          null
        }

        <div style={{display:'flex',flexDirection:'row'}}>

        <div style={{flex:2}}>
          {this.state.search.length > 0 && this.state.storyClicked ?
            <Segment vertical style={{fontSize:22,padding:0,marginTop:20,maxHeight:500,overflow: 'auto',borderBottom:0}}>
            <div style={{flexWrap:'wrap'}}>
            {this.state.newSearchList.map((i,index) => 
              (i === '\r' ?
                <br />
                :
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
              style={{display:'inline-block',marginTop:10,paddingBottom:(this.state.activeSentenceIndex === index || this.state.hover === index ? 2 : 5),cursor:'pointer',marginRight:6,borderBottomColor: 'red',
              borderBottom: (this.state.activeSentenceIndex === index ? '3px solid #000000DE' : (this.state.hover === index ? '1px solid #000000DE': '0px solid #000000DE')),
              color:'#000000DE',
            }}>{i}</span>
            )
            )}
            </div>
            </Segment>
          :
          null
        }
        </div>
        <div style={{flex:1}}>
          <Segment vertical style={{fontSize:22,padding:0,marginTop:20,maxHeight:500,overflow: 'auto',borderBottom:0}}>
          {this.state.getCall ?
          	<div style={{paddingTop:20,paddingLeft:15}}>
          	<Loader active inline />
          	</div>
          	:
          	null
          }
          
          {this.state.yugtunAnalyzer && this.state.parses.length === 0 && !this.state.getCall && this.state.notFirstParse && this.state.storyClicked  ?
            <div style={{paddingTop:20,paddingLeft:15}}>
          	<div style={{fontStyle:'italic',marginTop:10}}>No results. Pisciigatuq.</div>
            </div>
          	:
          	null
          } 
          
          {this.state.yugtunAnalyzer && !this.state.getCall && this.state.storyClicked  && (this.state.search.length > 0 || this.state.notFirstParse) ?
            <div style={{paddingTop:20,paddingLeft:15}}>
            {this.state.parses.map((i,index)=>
              <div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{paddingBottom:10}}>
              <Label circular color={'#E5E5E5'}>
              {index+1}
              </Label>
              </div>
              </div>
                <div style={{paddingLeft:25}}>
                  <div style={{fontSize:22}}>{this.state.segments[index].replace(/>/g,'·')}</div>
                  {i.split('-').map((q,qindex) => 
                    (qindex === this.state.endingrule[index][0] ?
                      (this.endingToEnglish(q,index,qindex))
                      :
                      <div style={{paddingTop:15,paddingLeft:qindex*20,fontSize:'16px'}}>
                        {this.getLinks(qindex,i.split('-')) in dictionary_dict ?
                          <div>
                          <div style={{fontWeight:'bold',fontFamily:'Lato,Arial,Helvetica,sans-serif',textDecoration:'underline',paddingBottom:'5px'}}>
                          <Link to={{pathname: this.getLinks(qindex,i.split('-')), state: { word: this.getLinks(qindex,i.split('-')), search: this.state.search, newSearchList: this.state.newSearchList, wordsList: this.state.wordsList, yugtunAnalyzer: this.state.yugtunAnalyzer, parses: this.state.parses, segments:this.state.segments,endingrule:this.state.endingrule, searchBarStuckTop: this.state.searchBarStuckTop, notFirstParse:this.state.notFirstParse, searchWord:this.state.searchWord, activeSentenceIndex:this.state.activeSentenceIndex, activeTabIndex: this.state.activeTabIndex }}}>
                          <span>
                          {q}
                          </span>
                          </Link>
                          </div>                  
                          {dictionary_dict[this.getLinks(qindex,i.split('-'))]}
                          </div>
                          :
                          <div style={{fontWeight:'bold',fontFamily:'Lato,Arial,Helvetica,sans-serif',textDecoration:'underline'}}>
                          {q}
                          </div>   
                        }
                      </div>
                  ))}
                </div>
              </div>
            )}
            </div>
            :
  					null
          }
          </Segment>
        </div>   
        </div>
        {!this.state.storyClicked ? 
          <div>
          <div style={{marginTop:30,fontSize:20,lineHeight:1.3,fontStyle:'italic'}}> 
            This interactive reader was created for the Yup'ik Conversation III course at the Lower Kuskokwim School District. It is designed for use on computer browsers. You can also use the Materials tab above.
          </div>
          <div style={{marginTop:25,fontSize:20,fontWeight:'bold',textDecoration:'underline'}}>
            Table of Contents:
          </div>
          <List bulleted style={{marginLeft:30}}>
            <List.Item>
              Processing Food & Prep
              <List.List>
                <List.Item href='#' onClick={()=>{this.retrieveStory(0)}}>Week 1: Neqet Aklut-llu Auluklerkaat; Neqallret-gguq Akiinauyuut</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(1)}}>Week 2: Tepet</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(2)}}>Week 3: Yaqulegmek Uklilleq Nalugalria-llu</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(3)}}>Week 4: Uquucillret</List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Celebrations & Ceremonies
              <List.List>
                <List.Item href='#' onClick={()=>{this.retrieveStory(4)}}>Week 1: Yuralallrat</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(5)}}>Week 2: Yuram Arulaciit Kangiit</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(6)}}>Week 3: Arnaulriim Ciuniuryaraa Issurimuq</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(7)}}>Week 4: Uqiqulleq</List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Physical & Mental Health
              <List.List>
                <List.Item href='#' onClick={()=>{this.retrieveStory(8)}}>Week 1: Aqumgaurpeknak</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(9)}}>Week 2: Ulu Mik'lengermi Akngirnarquq</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(10)}}>Week 3: Tatailnguq</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(11)}}>Week 4: Ayagina'ar - Prevention Video</List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Survival Skills
              <List.List>
                <List.Item href='#' onClick={()=>{this.retrieveStory(12)}}>Week 1: Ayaruicaqunak</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(13)}}>Week 2: Iqalluguat Negeqvam Taqellri Nallunailkutaugut</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(14)}}>Week 3: Agevkarluni Qanikcamun</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(15)}}>Week 4: Imarpigmi Augna Pilleq</List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Kinship/Family Relations
              <List.List>
                <List.Item href='#' onClick={()=>{this.retrieveStory(16)}}>Week 1: Irniaput ayuqucirtuagaqluki piarkauyaaqelliniukut</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(17)}}>Week 2: Tuqluuucaraq</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(18)}}>Week 3: Ilakucaraq Atellgutkellriakun</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(19)}}>Week 4: Asmuuriyunaituq</List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Yup'ik Lore
              <List.List>
                <List.Item href='#' onClick={()=>{this.retrieveStory(20)}}>Week 1: Saanigem Alangrua</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(21)}}>Week 2: Apanuugpak</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(22)}}>Week 3: Cetugpak</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(23)}}>Week 4: Uugnar Kaviaq-llu</List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Our Environment
              <List.List>
                <List.Item href='#' onClick={()=>{this.retrieveStory(24)}}>Week 1: Yup'igtaat Ellangvikelput</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(25)}}>Week 2: C/Yuuyaraq</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(26)}}>Week 3: Nunam Qigciksaraa</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(27)}}>Week 4: Nutemllarput</List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Seasonal Camps
              <List.List>
                <List.Item href='#' onClick={()=>{this.retrieveStory(28)}}>Week 1: Up'nerkillerni</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(29)}}>Week 2: Neqlilleq</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(30)}}>Week 3: Uksuilleq</List.Item>
                <List.Item href='#' onClick={()=>{this.retrieveStory(31)}}>Week 4: Uksillernun Uterrluteng Pilallrat</List.Item>
              </List.List>
            </List.Item>                                                                        
          </List>
          </div>
          : 
          null
        } 
        <div>
        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',height:60,paddingBottom:16,marginTop:30}}>
          <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
          <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
          <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
          <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
        </div>
        </div>
        </Container>
        </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    );
  }
}

export default SearchPage;
