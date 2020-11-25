import '../App.css';
import '../semantic/dist/semantic.min.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Container, Header, Grid, Input, List, Label, Icon, Image, Button, Accordion, Table, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
import Fuse from 'fuse.js';
import now from 'performance-now';
import ReactGA from 'react-ga';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { YugtunLoader, YugtunFooter, WordItem } from './SearchPageHelpers.js';

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
      search: props.location.state === undefined ? '' : props.location.state.search,
      currentWord: {},
      onlyCommon: false,
      startingSearch: true,
      smallestParseIndex: -1,
      parses:[],
      smallestParse:[],
      activeIndex:0,
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
        console.log(lowest)
        this.setState({
          parses: response.data.parses,
          smallestParseIndex: lowest,
          smallestParse: response.data.parses[lowest].split('-'),
        });
      });
  }

  getEndings(word, mood) {
    console.log("Word",word,encodeURIComponent(word))
    axios
      .get(API_URL + "/mood?underlying_form=" + encodeURIComponent(word) + "&mood=" + mood)
      .then(response => {
        console.log(response)

        // this.setState({ modifiedWord: response.data.concat,}); 
    });
  }

  onChangeSearch(event, data) {
    this.setState({yugtunAnalyzer:false})
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
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
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
          {this.state.yugtunAnalyzer ?
            (this.state.smallestParse.map((i,index) => 
              (index === 0 ?
                <div>
                <Link to={{pathname: (this.state.smallestParse[1].includes('[V') ? '/' + i + '-' : '/' + i), state: { word: i, search: this.state.search, wordsList: this.state.wordsList }}}>
                  {this.state.smallestParse[1].includes('[V') ? i + '-' : i}
                </Link>

                {this.state.parses[this.state.smallestParseIndex].includes("[V]") ?
                  <div>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Ind]');}}>{'Indicative'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Ptcp]');}}>{'Participial'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Opt]');}}>{'Optative'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Intrg]');}}>{'Interrogative'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Sbrd]');}}>{'Subordinative'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Prec]');}}>{'Precessive'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Cnsq]');}}>{'Consequential'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Cont]');}}>{'Contingent'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Conc]');}}>{'Concessive'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Cond]');}}>{'Conditional'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[CtmpI]');}}>{'Contemporative 1'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[CtmpII]');}}>{'Contemporative 2'}</Button>
                  </div>
                  :
                  <div>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Abs]');}}>{'Absolutive'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Rel]');}}>{'Relative'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Abl_Mod]');}}>{'Abl Modalis'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Loc]');}}>{'Localis'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Ter]');}}>{'Terminalis'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Via]');}}>{'Vialis'}</Button>
                  <Button onClick={()=>{this.getEndings(this.state.parses[this.state.smallestParseIndex],'[Equ]');}}>{'Equalis'}</Button>
                  </div>
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
<div style={{fontStyle:'italic'}}>INTRANSITIVE</div>
<Segment style={{overflow: 'auto'}}>
  <Table unstackable celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{textDecoration:'underline'}}>Subject</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell>he, she, it</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutuq</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>they (2)</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutuk</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>they all (3+)</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutut</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>I</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutua</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>we (2)</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutukuk</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>we all (3+)</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutukut</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>you</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagututen</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>you (2)</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagututek</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>you all (3+)</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutuci</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</Segment>

<div style={{fontStyle:'italic'}}>TRANSITIVE</div>
<Segment style={{overflow: 'auto'}}>
  <Table unstackable celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10}}>Object</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell style={{textDecoration:'underline'}}>Subject</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,fontStyle:'italic'}}>her, him, it </Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,fontStyle:'italic'}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,fontStyle:'italic'}}>them all (3+)</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,fontStyle:'italic'}}>me</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,fontStyle:'italic'}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,fontStyle:'italic'}}>us all (3+)</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,fontStyle:'italic'}}>you</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,fontStyle:'italic'}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,fontStyle:'italic'}}>you all (3+)</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell>{"he,\xa0she,\xa0it"}</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutaa</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutak</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>they (2)</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutaak</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagkek</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>{"they\xa0all\xa0(3+)"}</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutaat</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutakek</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</Segment>
<Segment style={{overflow: 'auto'}}>
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10}}>Object</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell style={{textDecoration:'underline',fontStyle:'italic'}}>Subject</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10}}>her, him, it </Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10}}>them all (3+)</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10}}>you</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10}}>you all (3+)</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell style={{fontStyle:'italic'}}>I</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutaa</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutak</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell style={{fontStyle:'italic'}}>we (2)</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutaak</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagkek</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell style={{fontStyle:'italic'}}>{"we\xa0all\xa03+"}</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutaat</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutakek</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</Segment>
<Segment style={{overflow: 'auto'}}>
  <Table unstackable celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>her, him, it </Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>them all (3+)</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>me</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
        <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>us all (3+)</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell style={{color:"#002477"}}>you</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutaa</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutak</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutai</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell style={{color:"#002477"}}>you (2)</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutaak</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagkek</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutagket</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell style={{color:"#002477"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutaat</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutakek</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
        <Table.Cell style={{paddingLeft:10}}>nalluyagutait</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</Segment>
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
                      <p>
                        There are many breeds of dogs. Each breed varies in size and
                        temperament. Owners often select a breed of dog that they find to be
                        compatible with their own lifestyle and desires from a companion.
                      </p>
                    </Accordion.Content>
                  </Accordion>             
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
