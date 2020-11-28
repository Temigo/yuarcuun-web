import '../App.css';
import '../semantic/dist/semantic.min.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Container, Header, Grid, Input, List, Label, Icon, Image, Button, Accordion, Table, Segment, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
import Fuse from 'fuse.js';
import now from 'performance-now';
import ReactGA from 'react-ga';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { YugtunLoader, YugtunFooter, WordItem } from './SearchPageHelpers.js';
import TableEntry from './TableEntry.js';

// Cache dictionary
let dictionary = [];
// Search options
let options = {
  keys: ['yupik', 'english'],
  minMatchCharLength: 3,
  // includeScore: true,
  distance: 10,
  location: 2,
  shouldSort: true,
  //tokenize: true, // super slow!! 6x slower
  // matchAllTokens: true,
  threshold: 0.4,
  findAllMatches: true,
};
let fuse = new Fuse([], options);

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary: [],
      dictionaryNouns: [],
      dictionaryVerbs: [],
      wordsList: [],
      yugtunAnalyzer: false,
      search: props.location.state === undefined ? 'pissurtuq' : props.location.state.search,
      currentWord: {},
      onlyCommon: false,
      startingSearch: true,
      smallestParseIndex: -1,
      parses:[],
      smallestParse:[],
      activeIndex:-1,
      loaderOn:true,
      entries:undefined,
    }
    this.getParse = this.getParse.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.search_container = React.createRef();
    this.getEndings = this.getEndings.bind(this);
  }

  componentDidMount() {
    let start = now();
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
          fuse.setCollection(dictionary);
          console.log('Fetched dictionary');
          this.setState({ dictionary: dictionary });
        });
    }
    else {
      fuse.setCollection(dictionary);
      this.setState({ dictionary: dictionary });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dictionary.length !== this.state.dictionary.length) {
      this.onChangeSearch(undefined, {value: this.state.search});
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
        console.log(response)
         var lowest = 0;
         var a = response.data.parses;
         for (var i = 1; i < a.length; i++) {
          if (a[i].length < a[lowest].length) 
            lowest = i;
         }
        console.log(a)
        this.setState({
          parses: response.data.parses,
      	})

        if (a.length > 0) {
	       	this.setState({
	          smallestParseIndex: lowest,
	          smallestParse: response.data.parses[lowest].split('-'),
	        });
	    }
      });
  }

  getEndings(word, mood) {
    console.log("Word",word,encodeURIComponent(word))
    axios
      .get(API_URL + "/mood?underlying_form=" + encodeURIComponent(word) + "&mood=" + mood)
      .then(response => {
        this.setState({ entries: response.data.results,}); 
        this.setState({ loaderOn: false})
    });
  }

  onChangeSearch(event, data) {
    this.setState({yugtunAnalyzer:false, entries:undefined, activeIndex:-1, loaderOn: true})
    let newStartingSearch = event === undefined;
    let new_search = data.value;

    if (new_search.length >= 4) {
      ReactGA.event({
        category: 'User',
        action: 'Search word',
        label: new_search
      });
      let start = now();
      let wordsList = fuse.search(new_search);
      let end = now();
      console.log('done! in ', (end-start).toFixed(3), 'ms');
      ReactGA.timing({
        category: 'Search',
        variable: 'fuse.search',
        value: (end-start).toFixed(3),
        label:'Fuse.js search duration'
      });
      this.setState({ startingSearch: newStartingSearch, wordsList: wordsList, search: new_search });
    }
    else {
      this.setState({ startingSearch: newStartingSearch, search: new_search });
    }
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
    this.setState({ loaderOn: true,})
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    let mood = ''
    switch(index) {
        case 0:
        mood = "[Ind]"
        break;
        case 1:
        mood = "[Intrg]"
        break;
        case 2:
        mood = "[Opt]"
        break;
        case 3:
        mood = "[Sbrd]"
        break;
        case 4:
        mood = "[Ptcp]"
        break;
        case 5:
        mood = "[Prec]"
        break;
        case 6:
        mood = "[Cnsq]"
        break;
        case 7:
        mood = "[Cont]"
        break;
        case 8:
        mood = "[Conc]"
        break;
        case 9:
        mood = "[Cond]"
        break;
        case 10:
        mood = "[CtmpI]"
        break;
        case 11:
        mood = "[CtmpII]"
        break;
        default:
        mood = "none"
    }
    console.log(mood)
    this.getEndings(this.state.parses[this.state.smallestParseIndex],mood)
    this.setState({activeIndex: newIndex, mood: mood})
  }

  render() {
    console.log("SearchPage state: ", this.state);
    let displayList = this.state.search.length >= 4 && this.state.wordsList.length > 0;
    let emptyList = this.state.search.length >= 4 && this.state.wordsList.length === 0;
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
    return (
      <div>
      <YugtunLoader criteria={this.state.dictionary.length === 0} />
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign={(displayList || !this.state.startingSearch) ? 'top' : 'middle'}>
      <GitHubForkRibbon href={TUTORIAL_URL} target='_blank' position='right' color='orange'>Watch Tutorial</GitHubForkRibbon>
      <Grid.Row style={displayList ? {height: 'auto'} : {height: '80%'}}>
      <Grid.Column style={{ maxWidth: 800, padding: 10 }} textAlign='left'>
        <Header as='h1' dividing>
          <Image style={{'fontSize': '1.5em'}} src={ICON_URL}/>
          <Link to='/' style={{ color: 'black', verticalAlign: 'bottom' }}>Yugtun</Link>
        </Header>
        <Container ref={this.search_container} className='search_container'>
          <Grid stackable>
            <Grid.Row >
              <Grid.Column style={{ flex: 1 }}>
              <Input
                ref={this.handleRef}
                placeholder='Search by word...'
                icon='search'
                iconPosition='left'
                size='huge'
                onChange={this.onChangeSearch}
                value={this.state.search}
                fluid transparent />
              </Grid.Column>
              <Grid.Column floated='right' style={{ flex: '0 0 2em' }}>
                <Icon link name='close' onClick={() => { this.inputRef.focus(); this.setState({search: '', startingSearch: false});}}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated='left' style={{ flex: '0 0 17em' }}>
                <Label
                  as='a'
                  content='Yugtun Analyzer'
                  color='orange'
                  basic={!this.state.yugtunAnalyzer}
                  onClick={() => { 
                    this.setState({ yugtunAnalyzer: !this.state.yugtunAnalyzer }); 
                    this.getParse(this.state.search)
                  }}
                  />
              </Grid.Column>
            {displayCommonOption && !this.state.yugtunAnalyzer ?
              <Grid.Column floated='right' style={{ flex: '0 0 17em' }}>
                <Label
                  as='a'
                  content='Show Common Words Only'
                  color='teal'
                  basic={!this.state.onlyCommon}
                  onClick={() => { this.setState({ onlyCommon: !this.state.onlyCommon }); }}
                  />
              </Grid.Column>
            : ''}
            </Grid.Row>
          </Grid>
          {this.state.yugtunAnalyzer && this.state.parses.length === 0 ?
          	<div style={{fontStyle:'italic',marginTop:10}}>pisciigatuq... :(</div>
          	:
          	null
          } 
          {this.state.yugtunAnalyzer ?
            (this.state.smallestParse.map((i,index) => 
              (index === 0 ?
                <div>
                <Link to={{pathname: (this.state.smallestParse[1].includes('[V') ? '/' + i + '-' : '/' + i), state: { word: i, search: this.state.search, wordsList: this.state.wordsList }}}>
                  {this.state.smallestParse[1].includes('[V') ? i + '-' : i}
                </Link>         
                </div>
                :
                <div>{i}</div>
              )))
            :
          <List divided selection>
            {displayList ? wordsList.map((word) => <WordItem key={word} word={word} search={this.state.search} wordsList={this.state.wordsList} />)
            : ''}
          </List>
          }

                  <Accordion fluid styled>
                    <Accordion.Title
                      active={activeIndex === 0}
                      index={0}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Indicative (Statement Form)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}                  
                  />
                      }
                    </Accordion.Content>


                    <Accordion.Title
                      active={activeIndex === 1}
                      index={1}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Interrogative (Question Form)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}                
                  />
                      }
                    </Accordion.Content>


                    <Accordion.Title
                      active={activeIndex === 2}
                      index={2}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Optative (Command Form)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}                
                  />
                      }
                    </Accordion.Content>


                    <Accordion.Title
                      active={activeIndex === 3}
                      index={3}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Subordinative (Polite Command or -ing Form)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}                
                  />
                      }
                    </Accordion.Content>                    

                    <Accordion.Title
                      active={activeIndex === 4}
                      index={4}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Participial
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 4}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}
                  />
                      }
                    </Accordion.Content>

                    <Accordion.Title
                      active={activeIndex === 5}
                      index={5}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Precessive (before)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 5}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}
                  />
                      }
                    </Accordion.Content>

                    <Accordion.Title
                      active={activeIndex === 6}
                      index={6}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Consequential (because)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 6}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}
                  />
                      }
                    </Accordion.Content>

                    <Accordion.Title
                      active={activeIndex === 7}
                      index={7}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Contigent (whenever)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 7}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}
                  />
                      }
                    </Accordion.Content>

                    <Accordion.Title
                      active={activeIndex === 8}
                      index={8}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Concessive (although, even though, even if)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 8}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}
                  />
                      }
                    </Accordion.Content>

                    <Accordion.Title
                      active={activeIndex === 9}
                      index={9}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Conditional (if, when in the future)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 9}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}
                  />
                      }
                    </Accordion.Content>

                    <Accordion.Title
                      active={activeIndex === 10}
                      index={10}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Contemporative 1 (when in the past)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 10}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}
                  />
                      }
                    </Accordion.Content>

                    <Accordion.Title
                      active={activeIndex === 11}
                      index={11}
                      onClick={this.handleClick}
                    >
                      <Icon name='dropdown' />
                      Contemporative 2 (while)
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 11}>
                      {this.state.loaderOn ? 
                        <Loader indeterminate />
                        :
                  <TableEntry
                    entries={this.state.entries}
                    mood={this.state.mood}
                  />
                      }
                    </Accordion.Content>
                  </Accordion>    
        </Container>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign='bottom'>
          <Grid.Column>
            <YugtunFooter />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      </div>
    );
  }
}

export default SearchPage;
