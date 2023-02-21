import '../App.css';
import '../semantic/dist/semantic.min.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Container, Header, Grid, Input, List, Label, Icon, Image, Button, Accordion, Table, Segment, Loader, Divider, Tab, Dropdown } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
// import Fuse from 'fuse.js';
// import fuzzysort from 'fuzzysort'
import now from 'performance-now';
import ReactGA from 'react-ga';
// import GitHubForkRibbon from 'react-github-fork-ribbon';
// import TableEntry from './TableEntry.js';
// import {demPro, perPro} from './constants/pronounEndings.js';
import SearchPageDictionary from './SearchPageDictionary.js'
import SearchPageAudioLibrary from './SearchPageAudioLibrary.js'
import SearchPageYugtunToEnglish from './SearchPageYugtunToEnglish.js'
// import {endingRules} from './constants/endingRules.js';

// Cache dictionary
let dictionary = [];
let audiolibrary = []
let dictionary_dict = {};
// let dictionary_prepared = [];


class SearchPage extends Component {
  constructor(props) {
    super(props);
    console.log("SearchPage props: ", props);
    this.state = {
      dictionary: props.dictionary,
      audiolibrary: props.audiolibrary,
      dictionary_dict: props.dictionary_dict,
      reset: true,
      fromTab: false,
      // dictionaryNouns: [],
      // dictionaryVerbs: [],
      // wordsList: [],
      // yugtunAnalyzer: props.location.state === undefined ? false : props.location.state.yugtunAnalyzer,
      // search: props.location.state === undefined ? '' : props.location.state.search,
      // currentWord: {},
      // onlyCommon: false,
      // startingSearch: true,
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
      // searchBarStuckTop: props.location.state === undefined ? false : props.location.state.searchBarStuckTop,
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
      activeTabIndex: props.location.state === undefined ? 0 : props.location.state.activeTabIndex,
      // tabValue: 0,
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
    }
    // this.getParse = this.getParse.bind(this);
    // this.onChangeSearch = this.onChangeSearch.bind(this);
    // this.selectWord = this.selectWord.bind(this);
    this.search_container = React.createRef();
    // this.getEndings = this.getEndings.bind(this);
    // this.getLinks = this.getLinks.bind(this);
    // this.inputClicked = this.inputClicked.bind(this);
  }

  // componentDidMount() {
  //   let start = now();
  //   // if (this.state.updateSearchEntry) {
  //   //   this.inputClicked();
  //   //   this.setState({ updateSearchEntry: false });
  //   // }
  //   // console.log('hi',dictionary)
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
  //         console.log(dictionary)
  //         // fuse.setCollection(dictionary);
  //         // fuse1.setCollection(dictionary);
  //         console.log('Fetched dictionary');

  //         dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
  //         // dictionary_prepared = fuzzysort.prepare(dictionary)

  //         this.setState({ dictionary: dictionary, dictionary_dict: dictionary_dict});
  //       });
  //   }
  //   else {
  //     // fuse.setCollection(dictionary);
  //     this.setState({ dictionary: dictionary, dictionary_dict: dictionary_dict });
  //   }

  //   if (audiolibrary.length === 0) {
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
  //   } else {
  //     this.setState({ audiolibrary: audiolibrary });
  //   }


  // }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.dictionary.length !== this.state.dictionary.length) {
    //   this.onChangeSearch(undefined, {value: this.state.search});
    // }
    // if (prevState.search !== this.state.search) {
    // 	this.setState({searchBarStuckTop:true});
    // }


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

  // onChangeSearch(event, data) {
  //   // this.setState({entries:undefined, activeIndex:-1, loaderOn: true, seeMoreActive:false,currentTableOpen: -1,})
  //   let newStartingSearch = event === undefined;
  //   let new_search = data.value.replace("’","'");
  //   // console.log(new_search)
  //   // if (data.value === undefined) {new_search = this.state.search}


  //   let wordsList = fuzzysort.go(new_search, dictionary, optionsFuzzy).map(({ obj }) => (obj));
  //   this.setState({ startingSearch: newStartingSearch, wordsList: wordsList, search: new_search });

  //   // if (new_search.length >= 4 && !this.state.yugtunAnalyzer) {
  //   //   ReactGA.event({
  //   //     category: 'User',
  //   //     action: 'Search word',
  //   //     label: new_search
  //   //   });
  //   //   let start = now();
  //   //   let wordsList = fuse.search(new_search);
  //   //   let end = now();
  //   //   console.log('done! in ', (end-start).toFixed(3), 'ms');
  //   //   ReactGA.timing({
  //   //     category: 'Search',
  //   //     variable: 'fuse.search',
  //   //     value: (end-start).toFixed(3),
  //   //     label:'Fuse.js search duration'
  //   //   });
  //   //   this.setState({ startingSearch: newStartingSearch, wordsList: wordsList, search: new_search });
  //   // }
  //   // else {
  //   //   this.setState({ startingSearch: newStartingSearch, search: new_search });
  //   // }
  // }

  // selectWord(word, event) {
  //   this.setState({ currentWord: word });
  // }

  // resetCurrentWord(event, data) {
  //   this.setState({ currentWord: {} });
  // }

  // handleRef = (c) => {
  //   this.inputRef = c;
  // }

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
      reset:!this.state.reset,
  		// search:'',
    //   newSearchList:[],
    //   parses:[],
    //   segments:[],
    //   searchWord:"",
    //   notFirstParse:false,
  	})
  }

  handleTabChange = (e,data) => {
    // console.log(data.activeIndex, this.state.activeTabIndex)
    // if (data.activeIndex == 3) {
    //   console.log('hi')
    //   return <Redirect push to='/dialogues' />
    // }
    if (this.state.activeTabIndex !== data.activeIndex) {
      console.log('tested',data.activeIndex)
      this.resetAll();
      this.setState({ 
        activeTabIndex:data.activeIndex,
        fromTab:true,
      })
    }
    // } else if (data.activeIndex === 1 && this.state.activeTabIndex !== 1) {
    //   // if (!this.state.yugtunAnalyzer) {
    //   this.setState({ activeTabIndex:1, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false,search:""});                     
    //   // this.inputClicked()
    //   // }
    // } else if (data.activeIndex === 2 && this.state.activeTabIndex !== 2) {
    //   // if (!this.state.yugtunAnalyzer) {
    //   this.setState({ activeTabIndex:2, parses:[],segments:[],endingrule:[],newSearchList:[],notFirstParse:false,search:""});                     
    //   // this.inputClicked()
    //   // }
    // }
  }

  handleTabChange2 = (e, {value}) => {
    // if (value == 3) {
    //   console.log('hi')
    //   return <Redirect push to='/dialogues' />
    // }
    if (this.state.activeTabIndex !== value) {
      console.log(value)
      this.setState({ 
        activeTabIndex:value,
        fromTab:true,
      })
    }
    // } else if (value === 1 && this.state.activeTabIndex !== 1) {
    //   // if (!this.state.yugtunAnalyzer) {
    //   this.setState({ activeTabIndex:1, newSearchList:[],search:""});                     
    //   // this.inputClicked()
    //   // }
    // } else if (value === 2 && this.state.activeTabIndex !== 2) {
    //   // if (!this.state.yugtunAnalyzer) {
    //   this.setState({ activeTabIndex:2, newSearchList:[],search:""});                     
    //   // this.inputClicked()
    //   // }
    // }
    // this.setState({activeTabIndex: value})
  }


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

  render() {
    console.log("SearchPage state: ", this.state);
    console.log("SearchPage props: ", this.props);
    // console.log("dictionary: ",dictionary_dict);
    // console.log("fuse.js: ",fuse.search('pissur'))
    // console.log("Fuzzysort: ",fuzzysort.go('pissur', dictionary, optionsFuzzy));
    // console.log("Fuzzysort_prepared: ",fuzzysort.go('pissur', dictionary_prepared, optionsFuzzy));

    // console.log("pissur-[V][Ind][Intr][S_3Sg]=qaa[Encl]".split('-'))

    // let displayList = this.state.search.length >= 2 && this.state.wordsList.length > 0;
    // let emptyList = this.state.search.length >= 2 && this.state.wordsList.length === 0 && !this.state.yugtunAnalyzer;
    // let pressEnter = this.state.search.length > 0 && this.state.yugtunAnalyzer && this.state.newSearchList.length === 0;
    // let wordsList = this.state.wordsList;
    const { activeIndex } = this.state
    // let isCommonList = wordsList.map((word) => {
    //   return Object.keys(word).some((key) => {
    //     return word[key].properties && word[key].properties.indexOf('common') > -1;
    //   });
    // });
    // if (this.state.onlyCommon) {
      // wordsList = wordsList.filter((word, i) => { return isCommonList[i]; });
    // }
    // let displayCommonOption = this.state.onlyCommon || (wordsList.some((word, i) => { return isCommonList[i]; }) && wordsList.some((word, i) => { return !isCommonList[i]; }));
  const panes = [
    {
      menuItem: {content:'Dictionary',size:'massive'}
    },
    {
      menuItem: 'Yugtun to English',
    },
    {
      menuItem: 'Audio Library',
    },
    // {
    //   menuItem: 'Sentence Builder',
    // },
  ]
  const panes2 = [
    {
      menuItem: {content:'Dictionary',size:'massive'}
    },
    {
      menuItem: 'Yugtun to English',
    },
    {
      menuItem: 'Audio',
    },
    // {
    //   menuItem: 'Sentence Builder',
    // },
  ]

  const tabOptions = [
    {
      key: 0,
      text: <div><span>Dictionary</span></div>,
      value: 0,
    },
    {
      key: 1,
      text: <div><span>Yugtun to English</span></div>,
      value: 1,
    },
    {
      key: 2,
      text: <div><span>Audio Library</span></div>,
      value: 2,
    },
    // {
    //   key: 3,
    //   text: <div><span>Sentence Builder</span></div>,
    //   value: 3,
    // },
  ]

    return (
      <div>
      
      <Grid textAlign='center' style={{ height: window.innerHeight/1.5 }} verticalAlign={this.state.searchBarStuckTop ? 'top' : 'top'}>
      <Grid.Row style={{height:40,paddingBottom:0}}>
      <Grid.Column>
      <div style={{display:'flex',justifyContent:'flex-end',paddingBottom:5}}>
      <List horizontal divided>
        <List.Item> <Link style={{textDecoration:'underline',color:'#000000de'}} to='/about'>About</Link> </List.Item>
        <List.Item> <Link style={{textDecoration:'underline',color:'#000000de'}} to='/dialogues'>Dialogues</Link> </List.Item>
        <List.Item> <Link style={{textDecoration:'underline',color:'#000000de'}} to='/sentencebuilder/1'>Sentence Builder</Link> </List.Item>
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

          {window.innerWidth < 480 ?
            <Tab style={{paddingTop:15}} activeIndex={this.state.activeTabIndex} menu={{ secondary: true, pointing: true, size:'large' }} panes={panes2} onTabChange={this.handleTabChange} />
            :
            <Tab style={{paddingTop:10}} activeIndex={this.state.activeTabIndex} menu={{ secondary: true, pointing: true, size:'huge' }} panes={panes} onTabChange={this.handleTabChange} />
          }


            </Grid>
            {this.state.activeTabIndex === 0 ? 
              <SearchPageDictionary fromTab={this.state.fromTab} dictionary={this.state.dictionary} dictionary_dict={this.state.dictionary_dict} reset={this.state.reset} {...this.props} />
              :
              null
            }
            {this.state.activeTabIndex === 1 ? 
              <SearchPageYugtunToEnglish fromTab={this.state.fromTab} dictionary={this.state.dictionary} dictionary_dict={this.state.dictionary_dict} reset={this.state.reset} {...this.props} />
              :
              null
            }
            {this.state.activeTabIndex === 2 ? 
              <SearchPageAudioLibrary fromTab={this.state.fromTab} audiolibrary={this.state.audiolibrary} reset={this.state.reset} {...this.props} />
              :
              null
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
