import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Form, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
import {lessonsList, dialogueLibrary} from './constants/qaneryaurci.js';
import dialogueGenerator from './constants/dialogueListGenerator.js';
import '../semantic/dist/semantic.min.css';

let library = {
"ch3-001":{"eng":"How nice it is outside!","yup":"Ellami-lli assirpaa!","speaker":"a"},
"ch3-002":{"eng":"Yes, it is really nice out.","yup":"Ii-i, ella assirtuq.","speaker":"b"},
"ch3-003":{"eng":"Your parka is very nice!","yup":"Atkuun assirpagta!","speaker":"a"},
"ch3-004":{"eng":"Thank you, my mother made it.","yup":"Quyana, aanama pilialqaa.","speaker":"b"},
"ch3-005":{"eng":"Where are you from?","yup":"Camiungusit?","speaker":"a"},
"ch3-006":{"eng":"I'm from Kuinerraq.","yup":"Kuinerrarmiunguunga.","speaker":"b"},
"ch3-007":{"eng":"Who are you related to?","yup":"Kia ilakaten?","speaker":"a"},
"ch3-008":{"eng":"I'm Apurin's offspring.","yup":"Apurinaam yukaanga.","speaker":"b"},
}

let exerciseOrder = [
"ch3-001",
"ch3-002",
"ch3-003",
"ch3-004",
"ch3-005",
"ch3-006",
"ch3-007",
"ch3-008",
]


class Dialogues extends Component {
  constructor(props) {
    super(props);
    const dialog_gen = dialogueGenerator()
    this.state = {
      show: false,
      currentLesson: decodeURI(props.match.params.num),
      exerciseNumber: props.location.state === undefined ? '' : props.location.state.exerciseNumber,
      currentCounter: 0,
      // questionMode:0,
      showCurrent: false,
      correct:'assirpagta',
      inputtedWords: '',
      record:[],
      randomCounters:{},
      lessons: dialog_gen.lessons,
      dialogues: dialog_gen.dialogues,
    }
    console.log(dialog_gen)
  }

  componentDidUpdate(prevProps,prevState) {

    if (prevState.currentCounter !== this.state.currentCounter && this.state.lessons[this.state.currentLesson]['exercises'].length !== this.state.currentCounter) {
      // console.log(this.state.lessons[this.state.currentLesson]['exercises'][this.state.currentCounter], this.state.exerciseNumber)
      if (this.state.exerciseNumber !== -1) {
        if (this.state.lessons[this.state.currentLesson]['exercises'][this.state.currentCounter][this.state.exerciseNumber].includes('listenchoose')) {
          this.repeatAudio(this.state.dialogues[this.state.lessons[this.state.currentLesson]['dialogues'][this.state.currentCounter][this.state.randomCounters['randomExerciseCounter'][this.state.currentCounter]]]['audio'])
        }
      }
    }
  }

  componentWillMount() {
    let randomCounters = {}
    let randomExerciseCounter = []
    let baseChooseRandom = {}
    let endingChooseRandom = {}
    this.state.lessons[this.state.currentLesson]['dialogues'].map((k)=>{
      randomExerciseCounter = randomExerciseCounter.concat(Math.floor(Math.random()*k.length))
      k.map((j)=>{
        baseChooseRandom[j] = this.shuffle(Array.from({length: this.state.dialogues[j]['baseYupikChoose'].length}, (v, i) => i))
        endingChooseRandom[j] = this.shuffle(Array.from({length: this.state.dialogues[j]['endingYupikChoose'].length}, (v, i) => i))
      })
    })

    randomCounters['randomExerciseCounter']=randomExerciseCounter
    randomCounters['baseChooseRandom']=baseChooseRandom
    randomCounters['endingChooseRandom']=endingChooseRandom
    this.setState({randomCounters:randomCounters})
  }

  shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  inputtedWord = (event) => {
    this.setState({inputtedWords: event.target.value})
  }

  repeatAudio(audio, event, data) {

    let sound = new Audio(API_URL + "/audiolibrarydialogues/" +  audio);
    sound.play()


    // console.log(audio)
    // var a = new Audio('https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/'+audio+'.mp3');
    // a.play();
  }

  correctSound(event, data) {
    // console.log(audio)
    let sound = new Audio(API_URL + "/audiolibrarydialogues/" +  'correct_half');
    sound.play()
  }

  incorrectSound(event, data) {
    // console.log(audio)
    let sound = new Audio(API_URL + "/audiolibrarydialogues/" +  'incorrect_half');
    sound.play()
  }

  handleFormSubmit = (i, randomExerciseCounter, match, event,data) => {
  console.log('search:', i, this.state.inputtedWords, data);
  this.setState({showCurrent:true})
  this.checkInputCorrect(i, randomExerciseCounter, match);
  }


  checkInputCorrect(i, randomExerciseCounter, match, event, data) {
      let exerciseNum = this.state.lessons[this.state.currentLesson]['exercises'][this.state.currentCounter][this.state.exerciseNumber]
      if (this.state.inputtedWords === match) {
          console.log('right');
          this.correctSound.bind(this)();
          var record = this.state.record
          record.push([exerciseNum, this.state.inputtedWords,true])
          this.setState({record:record, currentScore:this.state.currentScore+1})
          setTimeout(function() {this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}.bind(this),150)
      } else {
          console.log('wrong');
          this.incorrectSound.bind(this)();
          var record = this.state.record
          record.push([exerciseNum, this.state.inputtedWords,false])
          this.setState({record:record})
          setTimeout(function() {this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}.bind(this),150)
      }
      // this.iterateOne();
      this.setState({inputtedWords: '',})
  }

  checkSelectCorrect(i,randomExerciseCounter,correctIndex, index, lengthOfOptions, event, data) {
      let exerciseNum = this.state.lessons[this.state.currentLesson]['exercises'][this.state.currentCounter][this.state.exerciseNumber]
      let correct = correctIndex
      let record = this.state.record
      let optionsTried = []
      if (this.state.currentCounter === record.length-1) {
        optionsTried = record[this.state.currentCounter][1]
      }
      // console.log(correctIndex, index, lengthOfOptions, this.state.currentCounter, exerciseNum, optionsTried)
      // console.log(optionsTried, index)
      if (!optionsTried.includes(index) && !optionsTried.includes(correctIndex)) {
        if (index === correctIndex) {
            // console.log('right');
            this.correctSound.bind(this)();
            if (optionsTried.length > 0) {
              optionsTried = optionsTried.concat([index])
              record[this.state.currentCounter]=[exerciseNum, optionsTried, false]                  
            } else {
              record.push([exerciseNum, [index], true])            
            }
            this.setState({record:record, showCurrent: true})
            if (!exerciseNum.includes('listenchoose')) {
              setTimeout(function() {this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}.bind(this),150)              
            }
        } else {
            // console.log('wrong');
            this.incorrectSound.bind(this)();
            if (optionsTried.length > 0) {
              optionsTried = optionsTried.concat([index])
              if (optionsTried.length === lengthOfOptions-1) {
                optionsTried = optionsTried.concat([correctIndex])              
                this.setState({showCurrent: true})
                if (!exerciseNum.includes('listenchoose')) {
                  setTimeout(function() {this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}.bind(this),150)              
                }
                // this.iterateOne();
              }
              record[this.state.currentCounter]=[exerciseNum, optionsTried, false]          
            } else {
              if (lengthOfOptions == 2) {
                this.setState({showCurrent: true})
                // this.iterateOne();
                record.push([exerciseNum, [index,correctIndex], false])        
                if (!exerciseNum.includes('listenchoose')) {
                  setTimeout(function() {this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}.bind(this),150)              
                }
              } else {
                record.push([exerciseNum, [index], false])                            
              }
            }
            this.setState({record:record})
        }

      }

      // this.iterateOne();
  }

  iterateOne = () => {
      this.setState({
      currentCounter:this.state.currentCounter+1,
      inputtedWords: '',
      })
  }

  underlineRegion = (sentence) => {     
    let matches = sentence.match(/\<.*?\>/g)
    if (matches !== null) {
      matches.map((m) => sentence = sentence.replace(m,'<u>'+m.slice(1,-1)+'</u>'))   
      return <span dangerouslySetInnerHTML={{__html: sentence}} />    
    } else {
      return <span>{sentence}</span>
    }
  }

  splitCarrot = (sentence, displayBoolean) => {     
    let matches = sentence.match(/\<.*?\>/g)
    if (matches !== null) {
      if (displayBoolean) {
        matches.map((m) => sentence = sentence.replace(m,'<u>'+m.slice(1,-1)+'</u>'))           
      } else {
        matches.map((m) => sentence = sentence.replace(m,'____'))   
      }
      return <span dangerouslySetInnerHTML={{__html: sentence}} />    
    } else {
      return <span>{sentence}</span>
    }
  }


  splitCarrotReturn = (sentence, num, displayBoolean) => {     
    let matches = sentence.match(/\<.*?\>/g)
    if (matches !== null) {
      matches.map((m) => sentence = sentence.split(m))           
      // console.log(sentence,matches[0])
      if (num == 0) {
        // return(sentence[0])
        return <span dangerouslySetInnerHTML={{__html: sentence[0]}} />    
      } else if (num == 1) {
        // return(matches[0].slice(1,-1))
        return <span dangerouslySetInnerHTML={{__html: matches[0].slice(1,-1)}} />    
      } else if (num == 2) {
        return matches[0].slice(1,-1)
        // return <span dangerouslySetInnerHTML={{__html: matches[0].slice(1,-1)}} />    
      } else if (num == 3) {
        // return(sentence[1])
        return <span dangerouslySetInnerHTML={{__html: sentence[1]}} />    
      }
    } else {
      return <span>{sentence}</span>
    }
  }



  previousItem = (index, i, randomExerciseCounter, typeAttributes) => {

    // let ind = this.state.record[index][0]
    typeAttributes = this.retrieveContent(this.state.record[index][0])
    let ind = typeAttributes[0]
    console.log(ind, index, i, randomExerciseCounter, typeAttributes)

    if (ind == -1) {
      return <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
        <div>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ?
          null
          :
          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
        }
        <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
          :
          null
        }
        </div>
        <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
      </div>
    } else if (ind == 0) {
      return <div style={{padding:'10px',fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif",fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end')}}>
            <span>{this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],0)}</span>
            <span style={{color:(this.state.record[index][2] ? 'green' : 'red')}}>{this.state.record[index][1]}</span>
            <span>{this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],3)}</span>
          </div>
          <div>
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
              <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
            <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>               
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
              <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
          </div>          
          <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[2]])}</div>
          {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
        </div>
    } else if (ind == 1) {
      return <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
              <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
            <span>{this.splitCarrot(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],true)}</span>
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
              <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
          </div>
          <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[2]])}</div>
          {this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].map((k)=>
          {
            let optionsTried = []
            if (index < this.state.record.length) {
              optionsTried = this.state.record[index][1]
            }
            return <div> 
            <Button style={{backgroundColor:(optionsTried.includes(k) && k == 0 ? 'green' : (optionsTried.includes(k) ? 'red' : null ) )}} onClick={this.checkSelectCorrect.bind(this,i,randomExerciseCounter,0,k,this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].length)}>
            {this.state.dialogues[i[randomExerciseCounter]][typeAttributes[3]][k]}
            </Button>
            </div>
          })}
          {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
        </div>

    } else if (ind == 2) {
      return <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
              <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
            <span>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[2]])}</span>
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
              <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
          </div>
          <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.splitCarrot(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],true)}</div>
          {this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].map((k)=>
          {
            let optionsTried = []
            if (index < this.state.record.length) {
              optionsTried = this.state.record[index][1]
            }
            return <div> 
            <Button style={{backgroundColor:(optionsTried.includes(k) && k == 0 ? 'green' : (optionsTried.includes(k) ? 'red' : null ) )}} onClick={this.checkSelectCorrect.bind(this,i,randomExerciseCounter,0,k,this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].length)}>
            {this.state.dialogues[i[randomExerciseCounter]][typeAttributes[3]][k]}
            </Button>
            </div>
          })}
          {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
        </div>

    } else if (ind == 3) {
      return <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
              <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
            <span>{this.splitCarrot(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],true)}</span>
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
              <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
          </div>
          <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[2]])}</div>
          {this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].map((k)=>
          {
            let optionsTried = []
            if (index < this.state.record.length) {
              optionsTried = this.state.record[index][1]
            }
            return <div> 
            <Button style={{backgroundColor:(optionsTried.includes(k) && k == 0 ? 'green' : (optionsTried.includes(k) ? 'red' : null ) )}} onClick={this.checkSelectCorrect.bind(this,i,randomExerciseCounter,0,k,this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].length)}>
            {this.state.dialogues[i[randomExerciseCounter]][typeAttributes[3]][k]}
            </Button>
            </div>
          })}
          {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
        </div>

    } else if (ind == 4) {
        return <div style={{padding:'10px',fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif",fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end')}}>
            <span>{this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],0)}</span>
            <span style={{color:(this.state.record[index][2] ? 'green' : 'red')}}>{this.state.record[index][1]}</span>
            <span>{this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],3)}</span>
          </div>
          <div>
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
              <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
            <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>               
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
              <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
          </div>
          <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]]['eng'])}</div>
          {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
        </div>
    } else if (ind == -2) {
      return <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
              <div>
                {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
                  <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                  :
                  null
                }
                <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>               
                {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
                  <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                  :
                  null
                }
              </div>
              <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
              {i.map((k,kindex)=>{
                let optionsTried = []
                if (index < this.state.record.length) {
                  optionsTried = this.state.record[index][1]
                }
                return <div> 
                <Button style={{backgroundColor:(optionsTried.includes(kindex) && kindex == randomExerciseCounter ? 'green' : (optionsTried.includes(kindex) ? 'red' : null ) )}} onClick={this.checkSelectCorrect.bind(this,i,randomExerciseCounter,randomExerciseCounter,kindex,i.length)}>
                {this.state.dialogues[k]['yup']}
                </Button>
                </div>
              })}
            </div>
    } else if (ind == -3) {
      return <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
        <div style={{color:(this.state.record[index][2] ? 'green' : 'red')}}>{this.state.record[index][1]}</div>
        <div>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ?
          null
          :
          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
        }
        <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
          :
          null
        }
        </div>
        <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
      </div>
    } else if (ind == -4) {
      return <div style={{padding:'10px',fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif",fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end')}}>
            <span style={{color:(this.state.record[index][2] ? 'green' : 'red')}}>{this.state.record[index][1]}</span>
          </div>
          <div>
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
              <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
            <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>               
            {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
              <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
              :
              null
            }
          </div>          
          <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
          {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
        </div>
    }


  }

  displayAlternates = (i, ind, randomExerciseCounter, currentCounter) => {
    console.log(i, ind, randomExerciseCounter, currentCounter)
    return <span>{i.map((k,index)=> 
      randomExerciseCounter !== index && currentCounter === ind ?
        <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[index]]['speaker']=='a'?'left':'right')}}>
        <div>{"wall'u"}</div>
        <div>
        {this.state.dialogues[i[index]]['speaker']=='a' ?
          null
          :
          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[index]]['audio'])}} /></span>
        }
        <span>{this.state.dialogues[i[index]]['yup']}</span>
        {this.state.dialogues[i[index]]['speaker']=='a' ? 
          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[index]]['audio'])}} /></span>
          :
          null
        }
        </div>
        <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[index]]['eng']}</div>
      </div>
      :
      null
    )}</span>
  }

  retrieveContent = (exerciseType) => {
    let exerciseNum = -1;
    let typeQuestion = '';
    let typeAnswer = '';
    let typeChoose = [];
    let typeRandom = ''
    //fillinblank = 1
    if (exerciseType == 'fillinblank-endingYupik') {
      exerciseNum = 0
      typeQuestion = 'endingYupik'
      typeAnswer = 'endingEnglish'
      typeChoose = 'endingYupikChoose'
    } else if (exerciseType == 'fillinblank-baseYupik') {
      exerciseNum = 0
      typeQuestion = 'baseYupik'
      typeAnswer = 'baseEnglish'
      typeChoose = 'baseYupikChoose'
    } else if (exerciseType == 'chooseoption-endingYupik') {
      exerciseNum = 1
      typeQuestion = 'endingYupik'
      typeAnswer = 'endingEnglish'
      typeChoose = 'endingYupikChoose'
      typeRandom = 'endingChooseRandom'
    } else if (exerciseType == 'chooseoption-baseYupik') {
      exerciseNum = 1
      typeQuestion = 'baseYupik'
      typeAnswer = 'baseEnglish'
      typeChoose = 'baseYupikChoose'
      typeRandom = 'baseChooseRandom'
    } else if (exerciseType == 'chooseoption-endingEnglish') {
      exerciseNum = 2
      typeQuestion = 'endingEnglish'
      typeAnswer = 'endingYupik'
      typeChoose = 'endingEnglishChoose'
      typeRandom = 'endingChooseRandom'
    } else if (exerciseType == 'chooseoption-baseEnglish') {
      exerciseNum = 2
      typeQuestion = 'baseEnglish'
      typeAnswer = 'baseYupik'
      typeChoose = 'baseEnglishChoose'
      typeRandom = 'baseChooseRandom'
    } else if (exerciseType == 'listenchoose-baseYupik') {
      exerciseNum = 3
      typeQuestion = 'baseYupik'
      typeAnswer = 'baseEnglish'
      typeChoose = 'baseYupikChoose'
      typeRandom = 'baseChooseRandom'
    } else if (exerciseType == 'listenchoose-endingYupik') {
      exerciseNum = 3
      typeQuestion = 'endingYupik'
      typeAnswer = 'endingEnglish'
      typeChoose = 'endingYupikChoose'
      typeRandom = 'endingChooseRandom'
    } else if (exerciseType == 'chooseoption-full') {
      exerciseNum = -2
    } else if (exerciseType == 'fillinblank-full') {
      exerciseNum = -3
    } else if (exerciseType == 'listenchoose-full') {
      exerciseNum = -4
    } else if (exerciseType == 'fillinblank1' || exerciseType == 'fillinblank2') {
      exerciseNum = 4
      typeQuestion = exerciseType
    }

    return [exerciseNum, typeQuestion, typeAnswer, typeChoose, typeRandom]
  }

  render() {
    let finished = (this.state.lessons[this.state.currentLesson]['exercises'].length == this.state.currentCounter)
    let exerciseType;
    let typeAttributes = []
    let exerciseNum = -1;
    let randomExerciseCounter;
    // let typeQuestion = '';
    // let typeAnswer = '';
    // let typeChoose = [];
    if (this.state.exerciseNumber == -1) {
      exerciseNum = -1
    } else {
      if (!finished) {
        exerciseType = this.state.lessons[this.state.currentLesson]['exercises'][this.state.currentCounter][this.state.exerciseNumber]
        typeAttributes = this.retrieveContent(exerciseType) 
        exerciseNum = typeAttributes[0]
      }      
    }
    console.log(exerciseType, finished, exerciseNum)
    console.log(this.state)
    return (
      <Container>
        <div style={{justifyContent:'space-between',display:'flex'}}>
          <div>
          <Button primary icon circular onClick={this.props.history.goBack}>
            <Icon name='chevron left' />
          </Button>
          </div>

          <div>
          <Header as='h1'>Dialogues</Header>
          </div>
          <div style={{width:36}} />

        </div>
        <Divider />
        <Container>
          <div style={{textAlign:'center',fontStyle:'italic'}}>{this.state.lessons[this.state.currentLesson].title}</div>
          <div style={{textAlign:'center',color:'grey',fontStyle:'italic'}}>{this.state.lessons[this.state.currentLesson].context}</div>
          {finished ?
            <span>
            {this.state.lessons[this.state.currentLesson].dialogues.map((i,index)=>{
              randomExerciseCounter = this.state.randomCounters['randomExerciseCounter'][index]
              return <span>
              {index < this.state.currentCounter ?
                this.previousItem(index, i, randomExerciseCounter, typeAttributes)
                :
                null
              }
              </span>
              }
            )}
            <div style={{display:'flex',justifyContent:'center'}}><Link to={{pathname:'/dialogues'}}><Button>Continue</Button></Link></div>
            </span>
            :
            <div>
              {this.state.lessons[this.state.currentLesson].dialogues.map((i,index)=>{
                randomExerciseCounter = this.state.randomCounters['randomExerciseCounter'][index]
                return <div>
                {index < this.state.currentCounter ?
                  <span>
                  {this.previousItem(index, i, randomExerciseCounter, typeAttributes)}
                  {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
                  </span>
                  :
                  null
                }

                {exerciseNum === -1 ?
                  <div>
                    {index == this.state.currentCounter ?
                      (this.state.showCurrent ?
                        <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                          <div>
                          {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ?
                            null
                            :
                            <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                          }
                          <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>
                          {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
                            <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                            :
                            null
                          }
                          </div>
                          <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
                        </div>
                        :
                        <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                        <span>{'-'}</span>
                        <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
                        <Button style={{marginTop:'20px'}} onClick={()=>{this.setState({showCurrent:true,record:this.state.record.concat([[exerciseNum,'',true]])}); this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}}>{"Show Yup'ik"}</Button>
                        </div>
                      )
                      :
                      null
                    }
                    {this.state.showCurrent && index == this.state.currentCounter ?
                      <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                        <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                        {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, this.state.currentCounter):null}
                      </div>
                      :
                      null
                    }
                  </div>
                :
                  null
                }


              {exerciseNum === 0 ?
                <div>
                  {index == this.state.currentCounter ?


                  <div style={{padding:'10px',fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif",fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end')}}>
                      <span>{this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],0)}</span>
                      {this.state.showCurrent ? 
                        <span style={{color:(this.state.record[index][2] ? 'green' : 'red')}}>{this.state.record[index][1]}</span>
                        :
                        <Form autoComplete="off" onSubmit={this.handleFormSubmit.bind(this,i,randomExerciseCounter,this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],2))}>
                            <Form.Input autoFocus="autoFocus" placeholder='' value={this.state.inputtedWords} onChange={this.inputtedWord.bind(this)} />
                            <script type="text/javascript">document.theFormID.theFieldID.focus();</script>
                        </Form>
                      }
                      <span>{this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],3)}</span>
                    </div>
                    {this.state.showCurrent ? 
                      <div>
                        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
                          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                          :
                          null
                        }
                        <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>               
                        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
                          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                          :
                          null
                        }
                      </div>
                      :
                      null
                    }                  
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[2]])}</div>
                    {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
                  </div>


                  :
                  null
                }
                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
                :
                null
              }

              {exerciseNum === 1 ?
                <div>
                  {index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
                      {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' && this.state.showCurrent ?
                        <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                        :
                        null
                      }
                      <span>{this.splitCarrot(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],this.state.showCurrent)}</span>
                      {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' && this.state.showCurrent ? 
                        <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                        :
                        null
                      }
                    </div>
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[2]])}</div>
                    {this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].map((k)=>
                    {
                      let optionsTried = []
                      if (this.state.currentCounter < this.state.record.length) {
                        optionsTried = this.state.record[this.state.currentCounter][1]
                      }
                      return <div> 
                      <Button style={{backgroundColor:(optionsTried.includes(k) && k == 0 ? 'green' : (optionsTried.includes(k) ? 'red' : null ) )}} onClick={this.checkSelectCorrect.bind(this,i,randomExerciseCounter,0,k,this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].length)}>
                      {this.state.dialogues[i[randomExerciseCounter]][typeAttributes[3]][k]}
                      </Button>
                      </div>
                    })}
                    {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
                  </div>
                  :
                  null
                }
                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
                :
                null
              }

              {exerciseNum === 2 ?
                <div>
                  {index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
                      {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' && this.state.showCurrent ?
                        <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                        :
                        null
                      }
                      <span>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[2]])}</span>
                      {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' && this.state.showCurrent ? 
                        <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                        :
                        null
                      }
                    </div>
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>
                      {this.splitCarrot(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],this.state.showCurrent)}
                    </div>
                    {this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].map((k)=>
                    {
                      let optionsTried = []
                      if (this.state.currentCounter < this.state.record.length) {
                        optionsTried = this.state.record[this.state.currentCounter][1]
                      }
                      return <div> 
                      <Button style={{backgroundColor:(optionsTried.includes(k) && k == 0 ? 'green' : (optionsTried.includes(k) ? 'red' : null ) )}} onClick={this.checkSelectCorrect.bind(this,i,randomExerciseCounter,0,k,this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].length)}>
                      {this.state.dialogues[i[randomExerciseCounter]][typeAttributes[3]][k]}
                      </Button>
                      </div>
                    })}
                    {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
                  </div>
                  :
                  null
                }
                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
                :
                null
              }

              {exerciseNum === 3 ?
                <div>
                  {index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
                      {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
                        <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                        :
                        null
                      }
                      <span>{this.splitCarrot(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],this.state.showCurrent)}</span>
                      {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
                        <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                        :
                        null
                      }
                    </div>
                    {this.state.showCurrent ? 
                      <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[2]])}</div>
                      :
                      null
                    }
                    {this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].map((k)=>
                    {
                      let optionsTried = []
                      if (this.state.currentCounter < this.state.record.length) {
                        optionsTried = this.state.record[this.state.currentCounter][1]
                      }
                      return <div> 
                      <Button style={{backgroundColor:(optionsTried.includes(k) && k == 0 ? 'green' : (optionsTried.includes(k) ? 'red' : null ) )}} onClick={this.checkSelectCorrect.bind(this,i,randomExerciseCounter,0,k,this.state.randomCounters[typeAttributes[4]][i[randomExerciseCounter]].length)}>
                      {this.state.dialogues[i[randomExerciseCounter]][typeAttributes[3]][k]}
                      </Button>
                      </div>
                    })}
                    {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
                  </div>
                  :
                  null
                }
                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
                :
                null
              }

              {exerciseNum === 4 ?
                <div>
                  {index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif",fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end')}}>
                      <span>{this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],0)}</span>
                      {this.state.showCurrent ? 
                        <span style={{color:(this.state.record[index][2] ? 'green' : 'red')}}>{this.state.record[index][1]}</span>
                        :
                        <Form autoComplete="off" onSubmit={this.handleFormSubmit.bind(this,i,randomExerciseCounter,this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],2))}>
                            <Form.Input autoFocus="autoFocus" placeholder='' value={this.state.inputtedWords} onChange={this.inputtedWord.bind(this)} />
                            <script type="text/javascript">document.theFormID.theFieldID.focus();</script>
                        </Form>
                      }
                      <span>{this.splitCarrotReturn(this.state.dialogues[i[randomExerciseCounter]][typeAttributes[1]],3)}</span>
                    </div>
                    {this.state.showCurrent ? 
                      <div>
                        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
                          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                          :
                          null
                        }
                        <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>               
                        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
                          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                          :
                          null
                        }
                      </div>
                      :
                      null
                    }                  
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.underlineRegion(this.state.dialogues[i[randomExerciseCounter]]['eng'])}</div>
                    {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
                  </div>
                  :
                  null
                }


                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
                :
                null
              }


              {exerciseNum === -2 ?
                <div>
                  {index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                    {this.state.showCurrent ?
                      <div>
                        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
                          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                          :
                          null
                        }
                        <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>               
                        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
                          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                          :
                          null
                        }
                      </div>
                      :
                      null
                    }
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
                    {i.map((k,kindex)=>{
                      let optionsTried = []
                      if (this.state.currentCounter < this.state.record.length) {
                        optionsTried = this.state.record[this.state.currentCounter][1]
                      }
                      return <div> 
                      <Button style={{backgroundColor:(optionsTried.includes(kindex) && kindex == randomExerciseCounter ? 'green' : (optionsTried.includes(kindex) ? 'red' : null ) )}} onClick={this.checkSelectCorrect.bind(this,i,randomExerciseCounter,randomExerciseCounter,kindex,i.length)}>
                      {this.state.dialogues[k]['yup']}
                      </Button>
                      </div>
                    })}
                  </div>
                  :
                  null
                }
                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
                :
                null
              }

                {exerciseNum === -3 ?
                <div>
                  {index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
                      <Form autoComplete="off" onSubmit={this.handleFormSubmit.bind(this,i,randomExerciseCounter,this.state.dialogues[i[randomExerciseCounter]]['yup'])}>
                          <Form.Input autoFocus="autoFocus" placeholder='' value={this.state.inputtedWords} onChange={this.inputtedWord.bind(this)} />
                          <script type="text/javascript">document.theFormID.theFieldID.focus();</script>
                      </Form>
                    </div>
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
                    {i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
                  </div>
                  :
                  null
                }
                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
                :
                null
              }

              {exerciseNum === -4 ?
                <div>
                  {index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif",fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'flex-start':'flex-end')}}>
                      {this.state.showCurrent ? 
                        <span style={{color:(this.state.record[index][2] ? 'green' : 'red')}}>{this.state.record[index][1]}</span>
                        :
                        <Form autoComplete="off" onSubmit={this.handleFormSubmit.bind(this,i,randomExerciseCounter,this.state.dialogues[i[randomExerciseCounter]]['yup'])}>
                            <Form.Input autoFocus="autoFocus" placeholder='' value={this.state.inputtedWords} onChange={this.inputtedWord.bind(this)} />
                            <script type="text/javascript">document.theFormID.theFieldID.focus();</script>
                        </Form>
                      }
                    </div>
                    {this.state.showCurrent ? 
                      <div>
                        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='b' ?
                          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                          :
                          null
                        }
                        <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>               
                        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
                          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={()=>{this.repeatAudio(this.state.dialogues[i[randomExerciseCounter]]['audio'])}} /></span>
                          :
                          null
                        }
                      </div>
                      :
                      null
                    }                  
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
                    {this.state.showCurrent && i.length > 0 ? this.displayAlternates(i, index, randomExerciseCounter, index):null}
                  </div>
                  :
                  null
                }


                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
                :
                null
              }

              </div>
            })}






            </div>

          }

        </Container>
        

      </Container>
    );
  }
}
export default Dialogues;
