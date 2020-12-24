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
  "[P_3Sg]":"her,\xa0him,\xa0it\xa0(other)",
  "[P_3Du]":"the\xa0two\xa0of\xa0them\xa0(others)",
  "[P_3Pl]":"them\xa0all\xa0(3+)\xa0(others)",
  "[P_1Sg]":"me",
  "[P_1Du]":"the\xa0two\xa0of\xa0us",
  "[P_1Pl]":"us\xa0all\xa0(3+)",
  "[P_2Sg]":"you",
  "[P_2Du]":"the\xa0two\xa0of\xa0you",
  "[P_2Pl]":"you\xa0all\xa0(3+)",
  "[P_4Sg]":"her,\xa0him,\xa0it\xa0(itself)",
  "[P_4Du]":"the\xa0two\xa0of\xa0them\xa0(themselves)",
  "[P_4Pl]":"them\xa0all\xa0(3+)\xa0(themselves)",
  "[SgUnpd]":"singular (1)",
  "[DuUnpd]":"dual (2)",
  "[PlUnpd]":"plural (3+)",
  "[SgPosd]":"one thing",
  "[DuPosd]":"two things",
  "[PlPosd]":"three or more things",
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
};

const endingDescriptions = [
"1) statements; 2) “yes-no” questions, usually with enclitic = qaa",
"1) content questions; 2) exclamations with the postbase @5+pag- | ~vag-",
"1) commands, requests, suggestions; 2) statements in narrative with the postbase 􏰝􏰥i- and a third person ending",
"1) actions or states subordinate to that of the main verb and involving the same subject; 2) requests, commands, suggestions with a second person ending",
"1) exclamations, usually with tang; 2) certain special constructions (see maaten and = wa)",
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
"1) place at which, time at which; 2) object of a comparison; 3) with postbase @5 + paa | ~vaa and enclitic = lli in exclamations; 4) formal vocative",
"1) place to which, time to which; 2) subject of an embedded verb",
"1) route; 2) instrument; 3) part of a whole",
"1) comparison; 2) language specification; 3) price specification",
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
      moods: ["[Ind]","[Intrg]","[Opt]","[Sbrd]","[Ptcp]","[Prec]","[Cnsq]","[Cont]","[Conc]","[Cond]","[CtmpI]","[CtmpII]","[Abs]","[Rel]","[Abl_Mod]","[Loc]", "[Ter]","[Via]","[Equ]"],
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
    console.log(e,titleProps)
    this.setState({ loaderOn: true,})
    const { index, currentIndex } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    let mood = this.state.moods[index]
    this.getEndings(this.state.parses[currentIndex],mood)
    this.setState({activeIndex: newIndex, mood: mood})
  }

onKeyPress = (e) => {
  if(e.key === 'Enter' && (this.state.activeTabIndex === 0 || this.state.search !== this.state.searchWord)){
    // if (!this.state.yugtunAnalyzer && this.state.parses.length === 0) {this.setState({getCall:true})}
    // this.setState({ yugtunAnalyzer: !this.state.yugtunAnalyzer}); 
    // if (this.state.yugtunAnalyzer) {
      this.setState({activeTabIndex:1})
      this.inputClicked(true)
    // }
  }
}

inputClicked(search) {
  this.setState({entries:undefined, activeIndex:-1, loaderOn: true, seeMoreActive:false,currentTableOpen: -1,yugtunAnalyzer:true})
  console.log(search)
  if (search === undefined || search) {
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

endingToEnglish(ending,index) {
  const tags = [...ending.matchAll(/\[.*?\]/g)];
  var english1 = ""
  var english2 = ""
  var english3 = ""
  if (ending.includes('[V]')) {
    english1 += 'Verb Ending';
    english2 += endingToEnglishTerms[tags[1]];
    if (ending.includes('[Trns]')) {
      english3 += endingToEnglishTerms[tags[tags.length-2]] + " to " + endingToEnglishTerms[tags[tags.length-1]];

      } else if (ending.includes('[Intr]')) {
        english3 += endingToEnglishTerms[tags[tags.length-1]];
      }
    } else if (ending.includes('[N]')) {
      english1 += 'Noun Ending';
      english2 += endingToEnglishTerms[tags[1]];
      if (ending.includes('Poss')) {
        english3 += endingToEnglishTerms[tags[tags.length-2]] + "\xa0" + endingToEnglishTerms[tags[tags.length-1]];
      } else {
        english3 += endingToEnglishTerms[tags[tags.length-1]];
      }
    } else {
      english1 += ending;
      english2 += endingToEnglishTerms[tags[0]];
    }
    return (
    <div style={{paddingTop:15}}>
    <div style={{fontWeight:'bold'}}>{this.state.endingrule[index][1].join(', ')}</div>
    <div style={{fontStyle:'italic'}}>{english1}</div>
    <div style={{fontStyle:'italic'}}>{english2}</div>
    <div>{english3}</div>
    </div>
    )
  }

  handleTabChange = (e,data) => {
    if (data.activeIndex === 0) {
      this.setState({ yugtunAnalyzer: false, activeTabIndex:0})
    } else {
      if (!this.state.yugtunAnalyzer) {
      this.setState({ yugtunAnalyzer: true, activeTabIndex:1, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false});                     
      this.inputClicked()
      }
    }
  }

  getLinks(index, parse) {
    if (index === 0) {            // if base

      if ((parse[index].includes("[P") || parse[index].includes("[I")) && parse.length === 1) {  // if particle or ignorative
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
        } else {
          dictionaryForm = base+"-"       // if Verb base
        }
        return dictionaryForm;          
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
      "Indicative (Statement Form)",
      "Interrogative (Question Form)",
      "Optative (Command Form)",
      "Subordinative (Polite Command or -ing Form)",
      "Participial",
      "Precessive (before...)",
      "Consequential (because...)",
      "Contigent (whenever...)",
      "Concessive (although, even though, even if...)",
      "Conditional (if, when in the future...)",
      "Contemporative 1 (when in the past...)",
      "Contemporative 2 (while...)",
      ];
    const accordionTitlesNouns = [
      "Absolutive",
      "Relative",
      "Ablative-Modalis (indirect object, from...)",
      "Localis (in, at...)",
      "Terminalis (toward...)",
      "Vialis (through, using...)",
      "Equalis (like, similar to...)",
      ];
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
          <Image style={{'fontSize': '1.5em'}} src={ICON_URL}/>
          <span style={{ color: 'black', verticalAlign: 'bottom'}}>Yugtun</span>
        </Header>
        <Container style={{height: (this.state.searchBarStuckTop ? window.innerHeight+100 : null)}} ref={this.search_container} className='search_container'>
          	<Grid stackable>

          <Tab style={{paddingTop:10}} activeIndex={this.state.activeTabIndex} menu={{ secondary: true, pointing: true, size:'huge' }} panes={panes} onTabChange={this.handleTabChange} />

            <Grid.Row >
              <Grid.Column style={{ flex: 1, paddingTop:0 }}>
              <Input
                ref={this.handleRef}
                placeholder={this.state.yugtunAnalyzer ? 'Search multiple words...':'Search a word...'}
                action={{ icon: 'search', transparent:true,size:'huge', onClick: () => 
                this.inputClicked()
                }}
                // icon={<Icon name='search' onClick={console.log('hi')} link />}
                iconPosition='right'
                size='huge'
                onChange={this.onChangeSearch}
                value={this.state.search}
                onKeyPress={this.onKeyPress}
                fluid  />
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
          	<div style={{fontStyle:'italic',marginTop:10}}>No results. Pisciigatuq.</div>
            </div>
          	:
          	null
          } 
          {pressEnter ? <p><i>Press enter to parse.</i></p> : ''}
          {this.state.yugtunAnalyzer && !this.state.getCall && (this.state.search.length > 0 || this.state.notFirstParse) ?
            <div style={{paddingTop:20}}>
            {this.state.parses.map((i,index)=>
              <div>
              <Divider />
              <div style={{paddingBottom:10}}>
              <Label circular color={'#E5E5E5'}>
              {index+1}
              </Label>
              </div>

              <div style={{fontSize:20}}>{this.state.segments[index].replaceAll('>','·')}</div>

              {i.split('-').map((q,qindex) => 
                (qindex === this.state.endingrule[index][0] ?
                  (this.endingToEnglish(q,index))
                  :
                  <div style={{paddingTop:15}}>
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
            </div>
              {this.state.currentTableOpen === index ?
                (this.state.parses[index].includes('[V') ?
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
                        <div style={{fontStyle:'italic','paddingBottom':5}}>{"Note: Many verb bases can be intransitive-only, transitive-only, or only allow certain endings."}</div>                     
                          {this.state.loaderOn ? 
                            <Loader active inline />
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
                        <div style={{'paddingBottom':15}}>{endingDescriptions[pindex]}</div>                                              
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
                  )
                :
                null
              }
              </div>
              )}
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
					<div style={{textDecoration:'underline',marginBottom:10,marginTop:15}}> Dictionary </div>
					<div style={{marginBottom:10}}> Type any English word, Yugtun verb base, or Yugtun noun and the matching dictionary entries will show automatically. </div>
					<div> examples: </div>
					<div style={{marginBottom:25}}>
					<span onClick={()=>{this.setState({search:'pissur',wordsList: fuzzysort.go('pissur', this.state.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>pissur-</span>
					<span>{', '}</span>
					<span onClick={()=>{this.setState({search:'akutaq',wordsList: fuzzysort.go('akutaq', this.state.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>akutaq</span>
					<span>{', '}</span>
					<span onClick={()=>{this.setState({search:'book',wordsList: fuzzysort.go('book', this.state.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>book</span>
					</div>
					<div>
					<div style={{textDecoration:'underline',marginBottom:10}}> Yugtun to English </div>
					<div style={{marginBottom:10}}> Type any Yugtun word or sentence and press enter to see the meaning of each part of the word.  </div>
					<div> examples: </div>
					<div>
					<span onClick={()=>{this.setState({search:"piipiqa popsicle-aamek ner'uq",yugtunAnalyzer: true, activeTabIndex:1, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false}); this.inputClicked("piipiqa popsicle-aamek ner'uq")}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>piipiqa popsicle-aamek ner'uq</span>
					<span>{', '}</span>
					<span onClick={()=>{this.setState({search:"ellami-lli assirpaa",yugtunAnalyzer: true, activeTabIndex:1, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false}); this.inputClicked("ellami-lli assirpaa")}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>ellami-lli assirpaa</span>
					</div>
					</div>
				</div>
				</div>
				:
				null
				)
}
              {emptyList && !this.state.yugtunAnalyzer ? <p><i>No base matches... try the Yugtun Parser...</i></p> : ''}
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
