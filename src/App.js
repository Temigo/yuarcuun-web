import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './semantic/dist/semantic.min.css';
import './style.css';

import SearchPage from './components/SearchPage.js';
import YupikDetails from './components/YupikDetails.js';
import WordBuilder from './components/WordBuilder.js';
import SentenceBuilder from './components/SentenceBuilder.js';
import SentenceGlossary from './components/SentenceGlossary.js';
import About from './components/About.js';
import Dialogues from './components/Dialogues.js';
import DialogueMenu from './components/DialogueMenu.js';
import Lksdreader from './components/Lksdreader.js';
import Support from './components/Support.js';
import Privacy from './components/Privacy.js';
import Symbols from './components/Symbols.js';
import YupikModifyLayout from './components/yupikModify/YupikModifyLayout.js';
import axios from 'axios';
import now from 'performance-now';
import ReactGA from 'react-ga';
import {YugtunLoader} from './components/SearchPageHelpers.js';

// export const API_URL = "https://yugtun-api.herokuapp.com";
export const API_URL = "http://localhost:5000";
export const TUTORIAL_URL = 'https://youtu.be/8xW36PYaZHo';
export const ICON_URL = "https://s3.amazonaws.com/yugtun-static/static/logo_final_1.jpg";

let dictionary = [];
let audiolibrary = []
let dictionary_dict = {};
let usageDictionary = []

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary: [],
      dictionary_dict: {},
      audiolibrary: [],
      usageDictionary: [],
      filteredDictV: [],
      filteredDictVit: [],
      filteredDictN: [],
      completedExercises: [],
      lessonsStarted: [],
    }
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
          // fuse.setCollection(dictionary);
          // fuse1.setCollection(dictionary);
          console.log('Fetched dictionary');

          dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
          // dictionary_prepared = fuzzysort.prepare(dictionary)

          this.setState({ dictionary: dictionary, dictionary_dict: dictionary_dict});
        });
    }
    else {
      // fuse.setCollection(dictionary);
      this.setState({ dictionary: dictionary, dictionary_dict: dictionary_dict });
    }

    if (audiolibrary.length === 0) {
      axios
        .get(API_URL + "/audiolibrary/all")
        .then(response => {
          // let end = now();
          // ReactGA.timing({
          //   category: 'Loading',
          //   variable: 'dictionary',
          //   value: (end-start).toFixed(3),
          //   label: 'Dictionary loading'
          // });
          console.log(response.data)
          audiolibrary = response.data;
          // fuse.setCollection(dictionary);
          // fuse1.setCollection(dictionary);
          console.log('Fetched AudioLibrary');

          // dictionary.forEach(entry => dictionary_dict[entry.keyString] = entry.definitionString) // create dictionary_dict dictionary
          // dictionary_prepared = fuzzysort.prepare(dictionary)

          this.setState({ audiolibrary: audiolibrary });
        });
    } else {
      this.setState({ audiolibrary: audiolibrary });
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

          // let filteredDictV = usageDictionary.filter(entry => (entry.type.includes('i')||entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')) )
          // let filteredDictN = usageDictionary.filter(entry => (entry.type.includes('n')||entry.type.includes('[V→N]')||entry.type.includes('[N→N]')))
          // let filteredDictVit = usageDictionary.filter(entry => (entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')))


          // this.setState({ usageDictionary: usageDictionary});

          let filteredDictV = usageDictionary.filter(entry => (entry.type.includes('i')||entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')) )
          let filteredDictN = usageDictionary.filter(entry => (entry.type.includes('n')||entry.type.includes('[V→N]')||entry.type.includes('[N→N]')))
          let filteredDictVit = usageDictionary.filter(entry => (entry.type.includes('t')||entry.type.includes('it')||entry.type.includes('[N→V]')||entry.type.includes('[V→V]')))

          this.setState({ usageDictionary: usageDictionary, filteredDictV: filteredDictV, filteredDictVit: filteredDictVit, filteredDictN: filteredDictN});
        });
    } else {
      this.setState({ usageDictionary: usageDictionary});      
    }

  }

  updateCompleted = (lessonIndex, exerciseNumber, data,value) => {
    // console.log(lessonIndex, exerciseNumber, data,value)
    let completedExercises = this.state.completedExercises
    let lessonsStarted = this.state.lessonsStarted
    let newentry = lessonIndex.toString()+'%'+exerciseNumber.toString()
    // console.log(completed, newentry, !completed.includes(newentry),completed.concat([newentry]))
    if (!completedExercises.includes(newentry)) {
      this.setState({completedExercises:completedExercises.concat([newentry])})
    }
    if (!lessonsStarted.includes(lessonIndex)) {
      this.setState({lessonsStarted:lessonsStarted.concat([lessonIndex])})
    }
  }

  render() {
    console.log(this.state)
    return (
      <div style={{margin:0,padding:0}}>
      <YugtunLoader criteria={this.state.dictionary.length === 0 && this.state.audiolibrary.length === 0 && this.state.usageDictionary.length === 0 && this.state.filteredDictV === 0 && this.state.filteredDictVit === 0 && this.state.filteredDictN === 0} />
        {
          this.state.audiolibrary.length !== 0 && this.state.dictionary.length !== 0 && this.state.usageDictionary !== 0 && this.state.filteredDictV !== 0 && this.state.filteredDictVit !== 0 && this.state.filteredDictN !== 0 ?
            <Switch>
              <Route exact path='/' render={(props) => <SearchPage audiolibrary={this.state.audiolibrary} dictionary_dict={this.state.dictionary_dict} usageDictionary={this.state.usageDictionary} dictionary={this.state.dictionary} filteredDictV={this.state.filteredDictV} filteredDictVit={this.state.filteredDictVit} filteredDictN={this.state.filteredDictN} {...props} />}/>
              <Route exact path='/about' component={About} />
              <Route exact path='/dialogues/:num' render={(props) => <Dialogues updateCompleted={this.updateCompleted} {...props} />}/>
              <Route exact path='/dialogues' render={(props) => <DialogueMenu completedExercises={this.state.completedExercises} lessonsStarted={this.state.lessonsStarted} {...props} />}/>
              <Route exact path='/lksdreader' component={Lksdreader} />
              <Route exact path='/support' component={Support} />
              <Route exact path='/privacy' component={Privacy} />
              <Route exact path='/symbols' component={Symbols} />
              <Route exact path='/sentenceglossary' component={SentenceGlossary} />
              <Route path='/:word/:entry_id/:usage_id/modify' component={YupikModifyLayout} />
              <Route exact path='/:word' component={YupikDetails} />
              <Route exact path='/wordbuilder/:word' component={WordBuilder}></Route>
              <Route exact path='/sentencebuilder/:num' render={(props) => <SentenceBuilder audiolibrary={this.state.audiolibrary} usageDictionary={this.state.usageDictionary} dictionary_dict={this.state.dictionary_dict} dictionary={this.state.dictionary} filteredDictV={this.state.filteredDictV} filteredDictVit={this.state.filteredDictVit} filteredDictN={this.state.filteredDictN} {...props} />}/>
            </Switch>       
            :
            null 
        }
      </div>
    );
  }

}

export default App;
