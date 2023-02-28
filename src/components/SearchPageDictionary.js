import '../App.css';
import '../semantic/dist/semantic.min.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Grid, Input, List, Image, Divider } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import { API_URL } from '../App.js';
// import Fuse from 'fuse.js';
import fuzzysort from 'fuzzysort'
// import now from 'performance-now';
// import ReactGA from 'react-ga';
// import GitHubForkRibbon from 'react-github-fork-ribbon';
import { WordItem, WordItemLikeInup } from './SearchPageHelpers.js';
// import TableEntry from './TableEntry.js';
// import {demPro, perPro} from './constants/pronounEndings.js';
// import {endingRules} from './constants/endingRules.js';

// Cache dictionary
// let dictionary = [];
// let audiolibrary = []
// let dictionary_dict = {};

const optionsFuzzy = {
  keys: ['keyString', 'definitionString'],
  limit: 50, // don't return more results than you need!
  threshold: -10000, // don't return bad results
};



class SearchPageDictionary extends Component {
  constructor(props) {
    super(props);
    console.log("SearchPageDictionary props: ", props);
    this.state = {
      // dictionary: [],
      // dictionary_dict: {},
      // dictionaryNouns: [],
      // dictionaryVerbs: [],
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
    window.history.replaceState({}, document.title)
    this.resetAll();
  }
  //   let start = now();
  //   if (this.state.updateSearchEntry) {
  //     this.inputClicked();
  //     this.setState({ updateSearchEntry: false });
  //   }
    // if (dictionary.length === 0) {
    //   axios
    //     .get(API_URL + "/word/all2021")
    //     .then(response => {
    //       let end = now();
    //       ReactGA.timing({
    //         category: 'Loading',
    //         variable: 'dictionary',
    //         value: (end-start).toFixed(3),
    //         label: 'Dictionary loading'
    //       });
    //       dictionary = response.data;
    //       // fuse.setCollection(dictionary);
    //       // fuse1.setCollection(dictionary);
    //       console.log('Fetched dictionary');

    //       dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
    //       // dictionary_prepared = fuzzysort.prepare(dictionary)

    //       this.setState({ dictionary: dictionary });
    //     });

    //   // axios
    //   //   .get(API_URL + "/audiolibrary/all")
    //   //   .then(response => {
    //   //     // let end = now();
    //   //     // ReactGA.timing({
    //   //     //   category: 'Loading',
    //   //     //   variable: 'dictionary',
    //   //     //   value: (end-start).toFixed(3),
    //   //     //   label: 'Dictionary loading'
    //   //     // });
    //   //     audiolibrary = response.data;
    //   //     // fuse.setCollection(dictionary);
    //   //     // fuse1.setCollection(dictionary);
    //   //     console.log('Fetched AudioLibrary');

    //   //     // dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
    //   //     // dictionary_prepared = fuzzysort.prepare(dictionary)

    //   //     this.setState({ audiolibrary: audiolibrary });
    //   //   });

    // }
    // else {
    //   // fuse.setCollection(dictionary);
    //   this.setState({ dictionary: dictionary });
    // }
  // }


  componentDidUpdate(prevProps, prevState) {
    // if (prevState.dictionary.length !== this.state.dictionary.length) {
    //   this.onChangeSearch(undefined, {value: this.state.search});
    // }
    if (this.props.reset !== prevProps.reset) {
      this.resetAll()
    }


    // if (this.props.location.state.activeTabIndex !== prevProps.activeTabIndex) {
    //   this.resetAll()      
    //   console.log('hi')
    // }

    // if (this.props.dictionary.length !== this.state.dictionary.length) {
    //   this.setState({dictionary:this.props.dictionary});
    //   this.setState({dictionary_dict:this.props.dictionary_dict})
    // }

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
    let new_search = data.value.replace("’","'").replace("0","⁰").replace("1","¹").replace("2","²").replace("3","³").replace("4","⁴").replace("5","⁵").replace("6","⁶").replace("7","⁷").replace("8","⁸").replace("9","⁹");
    // console.log(new_search)
    // if (data.value === undefined) {new_search = this.state.search}


    let wordsList = fuzzysort.go(new_search, this.props.dictionary, optionsFuzzy).map(({ obj }) => (obj));
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
//       // notFirstParse:true,
//     }); 
//     this.getParse(search.split(" ")[0].replace(/[^a-zA-Z\-̄͡͞ńḿ']/g, "").toLowerCase());                          
//   } 
//   //   this.inputRef.focus();
//   //   this.setState({
//   //     search: '', startingSearch: false
//   //   });
//   // }
// }


  resetAll = (e,data) => {
  	this.setState({
  		search:'',
      wordsList:[],
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

  render() {
    // console.log("SearchPage state: ", this.state);
    // console.log("props:",this.props)
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
            <Grid.Row style={{paddingBottom:14,}}>
              <Grid.Column style={{ flex: 1, paddingLeft:0,paddingRight:0}}>
              <Input
                ref={this.handleRef}
                placeholder='Search a word...'
                disabled={this.props.dictionary.length === 0}
                // action={{ icon: (this.state.yugtunAnalyzer ? 'search' : null), transparent:true,size:'huge', onClick: () => 
                // {this.state.yugtunAnalyzer ? this.inputClicked() : null}
                // }}
                // icon={<Icon name='x' onClick={console.log('hi')} link />}
                // iconPosition='right'

                // action={{ icon:'x', transparent:true,size:'huge', onClick: () => this.inputClicked()}}
                // // icon={<Icon name='search' onClick={console.log('hi')} link />}
                // iconPosition='right'

                size='huge'
                onChange={this.onChangeSearch}
                value={this.state.search}
                // onKeyPress={this.onKeyPress}
                fluid  />                
              </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{display:'flex',justifyContent:'center',padding:0,paddingLeft:(window.innerWidth < 480 ? 7:16),paddingRight:(window.innerWidth < 480 ? 7:16)}}>
            <List style={{width:'100%',}} divided>
            {displayList  ? 
                wordsList.map((word) => 
                <WordItemLikeInup key={word} word={word} search={this.state.search} wordsList={this.state.wordsList} />)
              : 
              (this.state.search.length === 0 ?
                <div style={{display:'flex',justifyContent:'center',paddingLeft:(window.innerWidth < 480 ? 7:0),paddingRight:(window.innerWidth < 480 ? 7:0)}}>
                  <div style={{fontSize:'1.2rem',color:'#666',lineHeight:1.6,maxWidth:500}}>
                    <div>
                    <div style={{textDecoration:'underline',marginBottom:10,marginTop:15}}> Dictionary </div>
                    <div style={{marginBottom:10}}> Type any English word or Yugtun base and the matching dictionary entries will show automatically.</div>
                    <div> Examples: </div>
                    <div>
                    <span onClick={()=>{this.setState({search:'pissur',wordsList: fuzzysort.go('pissur', this.props.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>pissur-</span>
                    <span>{', '}</span>
                    <span onClick={()=>{this.setState({search:'akutaq',wordsList: fuzzysort.go('akutaq', this.props.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>akutaq</span>
                    <span>{', '}</span>
                    <span onClick={()=>{this.setState({search:'book',wordsList: fuzzysort.go('book', this.props.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>book</span>
                    <span>{', '}</span>
                    <span onClick={()=>{this.setState({search:'Christmas',wordsList: fuzzysort.go('Christmas', this.props.dictionary, optionsFuzzy).map(({ obj }) => (obj)),newStartingSearch:true})}} style={{textDecoration:'underline',color:'#4A80B5',cursor:'pointer'}}>Christmas</span>         
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
              <Divider style={{paddingBottom:0,marginTop:'3px'}} />
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
            {emptyList ? <p><i>Aren, no matches... for English you can only search by word... for Yugtun try Yugtun to English mode...</i></p> : ''}
            </List>

            </Grid.Row>

          </Grid>
    );
  }
}

export default SearchPageDictionary;