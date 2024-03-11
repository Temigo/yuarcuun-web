import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Form, Input, Transition, Image, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
import {lessonsList, dialogueLibrary} from './constants/qaneryaurci.js';
import { dialogueGenerator, exerciseGenerator } from './constants/dialogueListGenerator.js';
import {sentenceTransitionTimings} from './constants/sentenceTransitionTimings.js';
import '../semantic/dist/semantic.min.css';
import * as Scroll from 'react-scroll';
import ReactGA from "react-ga4";
ReactGA.initialize("G-WDEJDCK7QT")

var scroll    = Scroll.animateScroll;


class Dialogues extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    const currentLesson = decodeURI(props.match.params.num)
    const dialog_gen = dialogueGenerator()
    const exercise_gen = exerciseGenerator(dialog_gen.lessons[currentLesson],dialog_gen.dialogues,dialog_gen.bagOfWords)
    this.state = {
      show: false,
      currentLesson: currentLesson,
      exerciseNumber: props.location.state === undefined ? -1 : props.location.state.exerciseNumber,
      lessonIndex: props.location.state === undefined ? -1 : props.location.state.lessonIndex,
      exerciseNumberMatrix: [],
      currentCounter: -1,
      // questionMode:0,
      showCurrent: false,
      correct:'assirpagta',
      inputtedWords: '',
      record:{},
      randomCounters:{},
      lesson: exercise_gen.lesson,
      dialogues: exercise_gen.dialogues,
      audioExists: true,
      visible:[true,true,true,true,true,true,true,true,true,true],
      playingAudio:false,
      showContinue:false,
      showAll:false,
      showEnglish: false,
      showEnglishMatrix:[],
      showAlternateList:[],
    }
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.exerciseNumber !== this.state.exerciseNumber) {
      this.initializeMatrix()
    }
  }

  componentWillMount() {
    this.initializeMatrix()
  }

  initializeMatrix = () => {
    this.setState({exerciseNumberMatrix: [...Array(this.state.lesson.dialogues.length)].map(x => this.state.exerciseNumber)})
    console.log(this.state.dialogues[this.state.lesson.dialogues[0][0]]['audio'])
    fetch(API_URL + "/audiolibrarydialogues/" +  this.state.dialogues[this.state.lesson.dialogues[0][0]]['audio'])
      .then(response => {console.log('contains audio')})
      .catch(error => {
        this.setState({
          audioExists: false,
        });      
      });        
  }

  initialize = () => {
    this.setState({
      record:{},
      currentCounter:0,
      showYupik:false,
      showEnglishMatrix:[],
    })
    this.playNextSentence(0)
  }


  inputtedWord = (event) => {
    this.setState({inputtedWords: event.target.value})
  }

  repeatAudio(audio, event, data) {
    let sound = new Audio(API_URL + "/audiolibrarydialogues/" +  audio);
    sound.play()

  }

  correctSound(event, data) {
    // console.log(audio)
    let sound = new Audio(API_URL + "/audiolibrarydialogues/" +  'correct_half.mp3');
    sound.play()
  }

  incorrectSound(event, data) {
    // console.log(audio)
    let sound = new Audio(API_URL + "/audiolibrarydialogues/" +  'incorrect_half.mp3');
    sound.play()
  }



  // displayAlternates = (i, currentCounter, randomExerciseCounter, typeAttributes) => {
  //   // console.log(i, currentCounter, randomExerciseCounter, currentCounter)

  //   // console.log('currentCounter',currentCounter)
  //   // console.log('i',i)
  //   // console.log('randomExerciseCounter',randomExerciseCounter)
  //   // console.log('typeAttributes',typeAttributes)

  //   let showEnglishMatrix = this.state.showEnglishMatrix
  //   return <span>{i.map((k,index)=> 
  //     randomExerciseCounter !== index ?
  //       <div style={{fontSize:'20px',textAlign:(this.state.dialogues[i[index]]['speaker']=='a'?'left':'right')}}>
  //       <div style={{paddingBottom:'10px',fontSize:'18px',marginRight:'10px',marginLeft:'10px'}}>{"wall'u"}</div>
  //       <div style={{display:'inline-block',border:(this.state.currentlyPlaying === currentCounter && this.state.currentlyPlayingIndex == index ? "1px solid #b0d1e7": "1px solid #d7d7d7"),borderRadius:'10px',padding:'10px',maxWidth:'80%',marginBottom:'10px'}}>
  //       {this.state.dialogues[i[index]]['speaker']=='a' ?
  //         null
  //         :
  //         <span style={{paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(currentCounter, index)}} /></span>
  //       }

  //       {this.state.dialogues[i[index]]['yup'].split(" ").map((k,kindex)=>
  //           <span style={{opacity:(this.state.visible[kindex] && this.state.currentlyPlaying == currentCounter && this.state.currentlyPlayingIndex == index ? 1.0 : 0.5),marginRight:'6px'}}>
  //             {k}
  //           </span>
  //       )}

  //       {this.state.dialogues[i[index]]['speaker']=='a' ? 
  //         <span style={{paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(currentCounter, index)}} /></span>
  //         :
  //         null
  //       }

  //       {this.state.showEnglish ?
  //         null
  //         :
  //         <Icon onClick={()=>{{this.state.showEnglishMatrix.includes(i[index]) ? showEnglishMatrix.splice(showEnglishMatrix.indexOf(i[index]),1) : showEnglishMatrix = showEnglishMatrix.concat(i[index])}; this.setState({showEnglishMatrix:showEnglishMatrix})}} style={{color:'#d4d4d4',width:'22px',paddingLeft:'5px'}} link name='comment alternate outline'>{'\n'}</Icon>
  //       }
  //       {this.state.showEnglishMatrix.includes(i[index]) ?
  //         <div style={{color:'#b9b9b9',fontWeight:(window.innerWidth < 480 ? '400':'200'),marginTop:'5px'}}>{this.state.dialogues[i[index]]['eng']}</div>
  //         :
  //         null
  //       }
  //       </div>

  //     </div>
  //     :
  //     null
  //   )}</span>
  // }

  normalize(text) {
    var newText = text.toLowerCase()
    newText = newText.replace(/[’ʼ]/,"'")
    newText = newText.replace(/[?!.,;:"]/,"")
    newText = newText.normalize()
    return newText
  }

  checkInputCorrect(match, index, dialogueInfo, language, event, data) {
      console.log(dialogueInfo)

      if (this.normalize(this.state.inputtedWords) === this.normalize(match.toLowerCase())) {
          this.correctSound.bind(this)();

          var record = this.state.record
          record[index] = {
          'userInput':this.state.inputtedWords, 
          'correct':true,
          }
          this.setState({record:record, currentScore:this.state.currentScore+1})
          if (language === 'yupik' && this.state.exerciseNumber !== 5) {
            setTimeout(function() {this.repeatAudio(dialogueInfo['audio'])}.bind(this),150)
          }
      } else {
          this.incorrectSound.bind(this)();

          var record = this.state.record
          record[index] = {
          'userInput':this.state.inputtedWords, 
          'correct':false,
          }
          if (language === 'yupik' && this.state.exerciseNumber !== 5) {
            setTimeout(function() {this.repeatAudio(dialogueInfo['audio'])}.bind(this),150)
          }
      }
      // this.iterateOne();
      this.setState({record:record,showContinue:true,inputtedWords: ''})
  }

  checkSelectCorrect(match, word, index, dialogueInfo, language, event, data) {

      console.log(dialogueInfo)
      let optionsTried = []
      let record = this.state.record
      if (index in this.state.record) {
        optionsTried = this.state.record[index]['optionsTried']
      }
      if (!optionsTried.includes(word) && !optionsTried.includes(match)) {
        if (word === match) {
            this.correctSound.bind(this)();
            optionsTried = optionsTried.concat([word])
            this.setState({showContinue: true})
            if (language === 'yupik') {
              setTimeout(function() {this.repeatAudio(dialogueInfo['audio'])}.bind(this),150)
            }
            record[index] = {
              'optionsTried':optionsTried,
            }
        } else {
          this.incorrectSound.bind(this)();
          optionsTried = optionsTried.concat([word])
          if (optionsTried.length === 3) {
            optionsTried = optionsTried.concat([match])              
            this.setState({showContinue: true})
            // if (language === 'yupik') {
            //   setTimeout(function() {this.repeatAudio(dialogueInfo['audio'])}.bind(this),150)
            // }
          }
          record[index]={
            'optionsTried':optionsTried,
          }                            
        }
        this.setState({record:record})
      }
  }

  playNextSentence(nextIndex) {
    if (this.state.lesson.dialogues.length > nextIndex) {
      if ([-1,3,4,5].includes(this.state.exerciseNumberMatrix[nextIndex])) {
        this.playCurrentSentence(nextIndex,this.state.lesson.dialogues[nextIndex][0])        
      }
    }
  }

  playCurrentSentence(index,name) {
    console.log(name)
    if (!this.state.playingAudio) {
      let audio = this.state.dialogues[name]['audio']
      if (audio.length > 0) {
        fetch(API_URL + "/audiolibrarydialogues/" +  audio)
          .then(response => {
            this.setState({playingAudio: true, currentlyPlaying: name});
            let dialogueName = name
            sentenceTransitionTimings[dialogueName].map((j,jindex)=>{
              this.setState({visible:[true,false,false,false,false,false,false,false,false,false]},()=>{
              setTimeout(()=>{
                  let visible = this.state.visible
                  visible[jindex+1]=true
                  this.setState({visible:visible})
                  if (jindex == sentenceTransitionTimings[dialogueName].length-1) {
                    this.setState({
                      visible:[true,true,true,true,true,true,true,true,true,true],
                    })
                  }
                  
                },j)
              })        
            })
            this.sound = new Audio(API_URL + "/audiolibrarydialogues/" +  audio); 
            this.sound.play()
            this.sound.onended=()=>{
              clearTimeout()
              this.setState({
                playingAudio: false,
                currentlyPlaying: -1,
              });
              if ([-1].includes(this.state.exerciseNumberMatrix[index])) {
                this.setState({
                  showContinue: true,
                })               
              }
            }   
          })
          .catch(error => {
            this.setState({
              audioExists: false,
              playingAudio: false,
              currentlyPlaying: -1,
            });
            if ([-1].includes(this.state.exerciseNumberMatrix[index])) {
              this.setState({
                showContinue: true,
              })               
            }
          });      
      }
    }
  }

  stopCurrentSentence() {
    clearTimeout()
    if (this.sound) {
      this.sound.pause()
    }
    this.setState({
      playingAudio: false,
      currentlyPlaying: -1,
    });        
  }

  returnBottomPart(name, dialogueInfo, exerciseNum) {
    if (exerciseNum == -1) {
      return null
    } else if (exerciseNum == 0) {

    }
  }

  returnTopPart(index,name, dialogueInfo,exerciseNum, isCurrent) {
    // console.log(dialogueInfo)
    let customFont = {fontSize:'20px',display:'inline-block',border:"1px solid #d7d7d7",borderRadius:'10px',padding:'10px',minWidth:'200px',maxWidth:'80%',marginTop:'5px',marginBottom:'5px'}
    let toptextStyle = {color:'#000000DE'}
    let textStyle = {color:'#000000DE',fontWeight:(window.innerWidth < 480 ? '400':'200')}

    if (exerciseNum == -1) {
      return <div>
        {this.returnContent('yupikReadOnly',dialogueInfo,name,index,textStyle)}
      </div>             
    } else if (exerciseNum == 0) {
      if (isCurrent) {
        return <div style={customFont}>
          <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end'),lineHeight:'30px'}}>
          {this.returnContent('englishNotStyled',dialogueInfo,name,index,textStyle)}
          </div>
          <div style={{height:'10px'}} />
          {this.state.showYupik ? 
            <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end'),lineHeight:'31px'}}>
            {this.returnContent('yupikNotStyled',dialogueInfo,name,index,textStyle)}
            </div>
            :
            <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end'), height:'30px',marginTop:'1px'}}>
            {this.returnContent('showYupikButton',dialogueInfo,name,index,textStyle)}
            </div>
          }
        </div>           
      } else {
        return <div style={customFont}>
          <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end'),lineHeight:'30px'}}>
            {this.returnContent('englishNotStyled',dialogueInfo,name,index,textStyle)}
          </div>
          <div style={{height:'10px'}} />
          <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end'),lineHeight:'31px'}}>
            {this.returnContent('yupikNotStyled',dialogueInfo,name,index,textStyle)}
          </div>
        </div>           
      }
    } else if (exerciseNum == 1) {
      if (isCurrent) {
        return <div style={customFont}>
          {this.returnContent('englishUnderlined',dialogueInfo,name,index,toptextStyle)}
          <div style={{height:'5px'}} />
          {index in this.state.record ?
            <div>
            {this.returnContent('yupikUnderlined',dialogueInfo,name,index,textStyle)}
            <div style={{height:'5px'}} />
            {this.returnContent('userRegularInput',dialogueInfo,name,index,textStyle,'yupik')}
            </div>
            :
            <div>
            {this.returnContent('selection',dialogueInfo,name,index,textStyle,'yupik')}
            <div style={{height:'5px'}} />
            {this.returnContent('regularInput',dialogueInfo,name,index,textStyle,'yupik')}
            </div>
          }
        </div>           
      } else {
        return <div style={customFont}>
          {this.returnContent('englishUnderlined',dialogueInfo,name,index,toptextStyle)}
          <div style={{height:'5px'}} />
          {this.returnContent('yupikUnderlined',dialogueInfo,name,index,textStyle)}
          <div style={{height:'5px'}} />
          {this.returnContent('userRegularInput',dialogueInfo,name,index,textStyle,'yupik')}
        </div>           
      }
    } else if (exerciseNum == 2) {
      if (isCurrent) {
        return <div style={customFont}>
          {this.returnContent('englishUnderlined',dialogueInfo,name,index,toptextStyle)}
          <div style={{height:'5px'}} />
          {index in this.state.record ?
            (this.state.record[index]['optionsTried'].includes(dialogueInfo['yupikQuestionCorrect']) ?
              this.returnContent('yupikUnderlined',dialogueInfo,name,index,textStyle)
              :
              this.returnContent('selection',dialogueInfo,name,index,textStyle,'yupik')
            )
            :
            this.returnContent('selection',dialogueInfo,name,index,textStyle,'yupik')
          }
          <div style={{height:'5px'}} />
          {this.returnContent('options',dialogueInfo,name,index,textStyle,'yupik')}
        </div>           
      } else {
        return <div style={customFont}>
          {this.returnContent('englishUnderlined',dialogueInfo,name,index,toptextStyle)}
          <div style={{height:'5px'}} />
          {this.returnContent('yupikUnderlined',dialogueInfo,name,index,textStyle)}
          <div style={{height:'5px'}} />
          {this.returnContent('options',dialogueInfo,name,index,textStyle,'yupik')}
        </div>           
      }
    } else if (exerciseNum == 3) {
      if (isCurrent) {
        return <div style={customFont}>
          {this.returnContent('yupikUnderlined',dialogueInfo,name,index,toptextStyle)}
          <div style={{height:'5px'}} />
            {index in this.state.record ?
              <div>
              {this.returnContent('englishUnderlined',dialogueInfo,name,index,textStyle)}
              {this.returnContent('userRegularInput',dialogueInfo,name,index,textStyle,'english')}
              </div>
              :
              <div>
              {this.returnContent('selection',dialogueInfo,name,index,textStyle,'english')}
              {this.returnContent('regularInput',dialogueInfo,name,index,textStyle,'english')}
              </div>
            }
        </div>           
      } else {
        return <div style={customFont}>
          {this.returnContent('yupikUnderlined',dialogueInfo,name,index,toptextStyle)}
          <div style={{height:'5px'}} />
          {this.returnContent('englishUnderlined',dialogueInfo,name,index,textStyle)}
          <div style={{height:'5px'}} />
          {this.returnContent('userRegularInput',dialogueInfo,name,index,textStyle,'english')}
        </div>           
      }
    } else if (exerciseNum == 4) {
      if (isCurrent) {
        return <div style={customFont}>
          {this.returnContent('yupikUnderlined',dialogueInfo,name,index,toptextStyle)}
          <div style={{height:'5px'}} />
          {index in this.state.record ?
            (this.state.record[index]['optionsTried'].includes(dialogueInfo['englishQuestionCorrect']) ?
              this.returnContent('englishUnderlined',dialogueInfo,name,index,textStyle)
              :
              this.returnContent('selection',dialogueInfo,name,index,textStyle,'english')
            )
            :
            this.returnContent('selection',dialogueInfo,name,index,textStyle,'english')
          }
          <div style={{height:'5px'}} />
          {this.returnContent('options',dialogueInfo,name,index,textStyle,'english')}
        </div>           
      } else {
        return <div style={customFont}>
          {this.returnContent('yupikUnderlined',dialogueInfo,name,index,toptextStyle)}
          <div style={{height:'5px'}} />
          {this.returnContent('englishUnderlined',dialogueInfo,name,index,textStyle)}
          <div style={{height:'5px'}} />
          {this.returnContent('options',dialogueInfo,name,index,textStyle,'english')}
        </div>           
      }
    } else if (exerciseNum == 5) {
      if (isCurrent) {
        return <div style={customFont}>
          {index in this.state.record ?
            <div>
            {this.returnContent('yupikUnderlined',dialogueInfo,name,index,textStyle)}
          <div style={{height:'5px'}} />
            {this.returnContent('userRegularInput',dialogueInfo,name,index,textStyle,'yupik')}
            </div>
            :
            <div>
            {this.returnContent('listeningselection',dialogueInfo,name,index,textStyle,'yupik')}
          <div style={{height:'5px'}} />
            {this.returnContent('regularInput',dialogueInfo,name,index,textStyle,'yupik')}
            </div>
          }
        </div>           
      } else {
        return <div style={customFont}>
          {this.returnContent('yupikUnderlined',dialogueInfo,name,index,textStyle)}
          <div style={{height:'5px'}} />
          {this.returnContent('userRegularInput',dialogueInfo,name,index,textStyle,'yupik')}
        </div>           
      }
    }
  }

  returnContent(type, dialogueInfo, name, index, textStyle, language) {
    let showEnglishMatrix = this.state.showEnglishMatrix
    let correctColor = '#6cb590'
    let incorrectColor = "#ff5757"
    let parts = [0,0,0]
    console.log(type)

    if (type === 'yupikNotStyled') {
        return <div style={{lineHeight:'24px', textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
            {dialogueInfo['speaker']=='a' ?
              null
              :
              (this.state.audioExists ? <span style={{display:'inline-block',height:'20px',fontSize:'19px',width:'35px',paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
            }
            <span>{dialogueInfo['yupik']}</span>
            {dialogueInfo['speaker']=='a' && this.state.audioExists  ? 
              (this.state.audioExists ? <span style={{display:'inline-block',height:'20px',fontSize:'19px',width:'35px',paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
              :
              null
            }
          </div>
    } else if (type === 'showYupikButton') {
      return <Button size='tiny' onClick={()=>{this.stopCurrentSentence(); this.setState({showYupik:true,showContinue:true},()=>{this.playCurrentSentence(index,name)})}}>{"Guess Yup'ik"}</Button>
    } else if (type === 'yupikUnderlined') {
      return <div style={{lineHeight:'30px'}}>
            {dialogueInfo['speaker']=='a' && this.state.audioExists  ?
              null
              :
              (this.state.audioExists ? <span style={{display:'inline-block',fontSize:'21px',width:'35px',paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
            }
            <span style={textStyle}>
              <span style={{marginLeft:(dialogueInfo['speaker']=='b' && !this.state.audioExists ?'35px':'0px')}}>{dialogueInfo['yupikQuestion'][0]}</span>
              <span style={{borderBottom:'1px solid #000000cc',paddingBottom:'1px'}}>{dialogueInfo['yupikQuestionCorrect']}</span>
              <span style={{marginRight:(dialogueInfo['speaker']=='a' && !this.state.audioExists ?'35px':'0px')}}>{dialogueInfo['yupikQuestion'][2]}</span>
            </span>
            {dialogueInfo['speaker']=='a' && this.state.audioExists  ? 
              (this.state.audioExists ? <span style={{display:'inline-block',fontSize:'21px',width:'35px',paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
              :
              null
            }
          </div>
    } else if (type === 'englishUnderlined') {
      return <div style={{lineHeight:'30px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right'),...textStyle}}>
              <span>{dialogueInfo['englishQuestion'][0]}</span>
              <span style={{borderBottom:'1px solid #000000cc',paddingBottom:'1px'}}>{dialogueInfo['englishQuestionCorrect']}</span>
              <span>{dialogueInfo['englishQuestion'][2]}</span>
            </div>
    } else if (type === 'regularInput') {
      if (language === 'english') {
        parts = [dialogueInfo['englishQuestionCorrect']]
      } else if (language === 'yupik') {
        parts = [dialogueInfo['yupikQuestionCorrect']]
      }
      return <div style={{marginTop:'8px',fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end')}}>
                <Form autoComplete="off" onSubmit={this.checkInputCorrect.bind(this,parts[0],index,dialogueInfo,language)}>
                    <Form.Input style={{fontSize:'16px'}} autoFocus="autoFocus" placeholder='' value={this.state.inputtedWords} onChange={this.inputtedWord.bind(this)} />
                    <script type="text/javascript">document.theFormID.theFieldID.focus();</script>
                </Form>
              </div>
              <Button disabled={this.state.inputtedWords.length == 0} type='submit' onClick={this.checkInputCorrect.bind(this,parts[0],index,dialogueInfo,language)}>Submit</Button>
            </div>
    } else if (type === 'userRegularInput') {
      return <div style={{display:'flex',alignItems:'flex-end',marginBottom:'5px',fontWeight:(window.innerWidth < 480 ? '400':'200'),height:'28px',justifyContent:(dialogueInfo['speaker']=='a'?'left':'right')}}>
              <span style={{color:(this.state.record[index]['correct']?correctColor:incorrectColor),fontWeight:(window.innerWidth < 480 ? '400':'200')}}>{this.state.record[index]['userInput']}</span>
            </div>
    } else if (type === 'yupikSelection') {
      return <div style={{lineHeight:'30px',}}>
              <div style={{fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end')}}>
                  <span style={textStyle}>
                    <span style={{marginLeft:(dialogueInfo['speaker']=='a'?'0px':'35px')}}>{dialogueInfo['yupikQuestion'][0]}</span>
                    <span style={{borderBottom:'1px solid #000000cc',color:'white',paddingBottom:'1px'}}>{dialogueInfo['yupikQuestionCorrect']}</span>
                    <span style={{marginRight:(dialogueInfo['speaker']=='a'?'35px':'0px')}}>{dialogueInfo['yupikQuestion'][2]}</span>
                  </span>
                </div>
              </div>
            </div>
    } else if (type === 'selection') {
      if (language === 'english') {
        parts = [dialogueInfo['englishQuestion'][0],dialogueInfo['englishQuestionCorrect'],dialogueInfo['englishQuestion'][2]]
      } else if (language === 'yupik') {
        parts = [dialogueInfo['yupikQuestion'][0],dialogueInfo['yupikQuestionCorrect'],dialogueInfo['yupikQuestion'][2]]
      }
      return <div style={{lineHeight:'30px',}}>
              <div style={{fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
                  {dialogueInfo['speaker']=='a' && this.state.audioExists  ?
                    null
                    :
                    (this.state.audioExists && language === 'yupik' ? <span style={{display:'inline-block',fontSize:'21px',width:'35px',paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' style={{color:'white'}} /></span> : null)
                  }
                  <span style={textStyle}>
                    <span>{parts[0]}</span>
                    <span style={{borderBottom:'1px solid #000000cc',color:'white',paddingBottom:'1px'}}>{parts[1]}</span>
                    <span>{parts[2]}</span>
                  </span>
                  {dialogueInfo['speaker']=='a' && this.state.audioExists  ? 
                    (this.state.audioExists && language === 'yupik' ? <span style={{display:'inline-block',fontSize:'21px',width:'35px',paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' style={{color:'white'}} /></span> : null)
                    :
                    null
                  }
              </div>
            </div>
    } else if (type === 'listeningselection') {
      parts = [dialogueInfo['yupikQuestion'][0],dialogueInfo['yupikQuestionCorrect'],dialogueInfo['yupikQuestion'][2]]
      return <div style={{lineHeight:'30px',}}>
              <div style={{fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end')}}>
                  <span style={textStyle}>
                    {dialogueInfo['speaker']=='a' && this.state.audioExists  ?
                      null
                      :
                      (this.state.audioExists ? <span style={{display:'inline-block',fontSize:'21px',width:'35px',paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
                    }
                    <span>{parts[0]}</span>
                    <span style={{borderBottom:'1px solid #000000cc',color:'white',paddingBottom:'1px'}}>{parts[1]}</span>
                    <span>{parts[2]}</span>
                    {dialogueInfo['speaker']=='a' && this.state.audioExists  ? 
                      (this.state.audioExists ? <span style={{display:'inline-block',fontSize:'21px',width:'35px',paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
                      :
                      null
                    }
                  </span>
                </div>
              </div>
            </div>
    } else if (type === 'options') {
      if (language === 'english') {
        parts = [dialogueInfo['englishQuestionOptions'],dialogueInfo['englishQuestionCorrect']]
      } else if (language === 'yupik') {
        parts = [dialogueInfo['yupikQuestionOptions'],dialogueInfo['yupikQuestionCorrect']]
      }      
      return <div style={{paddingTop:'10px',fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end')}}>
                  {parts[0].map((k,kindex)=>
                    <div onClick={this.checkSelectCorrect.bind(this,parts[1],k,index,dialogueInfo,language)} class='grid-verticaloptioncenter' style={{
                      cursor:'pointer',
                      fontWeight:(window.innerWidth < 480 ? '400':'200'),
                      border:(index in this.state.record ? (this.state.record[index]['optionsTried'].includes(k) ? (k === parts[1] ? '1px solid #69cd6e':'1px solid #ffffff') : null) : null),
                      color:(index in this.state.record ? (this.state.record[index]['optionsTried'].includes(k) ? (k === parts[1] ? '#32a038':'#d4d4d4') : null) : null),
                    }}>
                    {k}
                    </div>
                  )}
                  
                </div>
              </div>
    } else if (type === 'yupikUserInput') {
      return <div style={{fontWeight:(window.innerWidth < 480 ? '400':'200')}}>
              <span style={{color:'#b9b9b9'}}>{dialogueInfo['yupikQuestion'][0]}</span>
              <span style={{color:(this.state.record[index]['correct']?correctColor:incorrectColor),fontWeight:(window.innerWidth < 480 ? '400':'200')}}>{this.state.record[index]['userInput']}</span>
              <span style={{color:'#b9b9b9'}}>{dialogueInfo['yupikQuestion'][2]}</span>
            </div>
    } else if (type === 'yupikInputCorrect') {
      return <div style={{fontWeight:(window.innerWidth < 480 ? '400':'200'),marginBottom:'20px'}}>
              <span style={{color:'#b9b9b9'}}>{dialogueInfo['yupikQuestion'][0]}</span>
              <span>{dialogueInfo['yupikQuestionCorrect']}</span>
              <span style={{color:'#b9b9b9'}}>{dialogueInfo['yupikQuestion'][2]}</span>
            </div>
    } else if (type === 'englishNotStyled') {
      return <div style={{lineHeight:'24px', textAlign:(dialogueInfo['speaker']=='a'?'left':'right'),...textStyle}}>
            <span>{dialogueInfo['english']}</span>
            </div>
    } else if (type === 'yupikReadOnly') {
      return <div>
        <div style={{fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
          <div style={{display:'inline-block',border:(this.state.currentlyPlaying === name ? "1px solid #b0d1e7": "1px solid #d7d7d7"),borderRadius:'10px',padding:'10px',maxWidth:'80%',marginBottom:'10px'}}>
            <div style={{display:'inline-block'}}>

            <div>
            {dialogueInfo['speaker']=='a' && this.state.audioExists  ?
              null
              :
              (this.state.audioExists ? <span style={{paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
            }
            <span style={{lineHeight:'24px'}}>{dialogueInfo['yupik']}</span>
            {dialogueInfo['speaker']=='a' && this.state.audioExists  ? 
              (this.state.audioExists ? <span style={{paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
              :
              null
            }
            </div>

            {this.state.showEnglish ?
              null
              :
              <Icon onClick={()=>{{this.state.showEnglishMatrix.includes(name) ? showEnglishMatrix.splice(showEnglishMatrix.indexOf(name),1) : showEnglishMatrix = showEnglishMatrix.concat(name)}; this.setState({showEnglishMatrix:showEnglishMatrix})}} style={{color:'#d4d4d4',width:'22px',paddingLeft:'5px',marginTop:'5px',}} link name='comment alternate outline'>{'\n'}</Icon>
            }
            </div>
            {this.state.showEnglishMatrix.includes(name) ?
              <div style={{color:'#000000DE',fontWeight:(window.innerWidth < 480 ? '400':'200'),marginTop:'5px',lineHeight:'24px'}}>{dialogueInfo['english']}</div>
              :
              null
            }
          </div>
        </div>
      </div> 
    }

  }

  showContinue(index) {
      if (this.state.showContinue) {
        if (this.state.lesson.dialogues.length-1 === this.state.currentCounter) {
        this.props.updateCompleted(this.state.lessonIndex,this.state.exerciseNumber)
        return <div style={{display:'flex',justifyContent:'center',flexDirection:'row'}}>
            <Button onClick={()=>{this.initialize()}}>Redo</Button>
            <Link to={{pathname:'/dialogues'}}><Button>Continue</Button></Link>
            </div>
        } else {
        return <Button icon circular size='huge' onClick={()=>{
          this.stopCurrentSentence();
          if (![-1].includes(this.state.exerciseNumberMatrix[index])) {
            this.setState({
              showYupik:false,
            })
          }
          this.setState({
            showContinue:false,
            currentCounter:this.state.currentCounter+1,
          },
          ()=>{this.playNextSentence(index+1)}
          )}}><Icon name='chevron down' /></Button>
        }
      }          
    if (window.innerWidth >= 480) {
      scroll.scrollToBottom()
    }
    
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    // let exerciseNum = this.state.exerciseNumber
    // if (exerciseNum == '10') {
    //   //alternate between exerciseNumbers
    // }
    return (
      <div style={{paddingRight:5,paddingLeft:5}}>
      <Grid textAlign='center'>
      <Grid.Column style={{maxWidth:'800px'}}>

        <div style={{justifyContent:'space-between',display:'flex'}}>
          <div>

          <Icon onClick={()=>{this.props.history.goBack()}} circular style={{margin:0,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='chevron left' />

          </div>
          <div>
            <div style={{textAlign:'center',fontWeight:'bold',fontSize:'14px'}}>{this.state.lesson.title}</div>
            <div style={{textAlign:'center',color:'grey',fontStyle:'italic'}}>{this.state.lesson.context}</div>
          </div>
          <div style={{width:36}} />
        </div>
        <Divider />
        <div>
          
          {this.state.currentCounter == -1 ?
            <div style={{display:'flex',justifyContent:'center'}}>
            <Button style={{width:'200px'}} onClick={()=>{this.setState({currentCounter:0},()=>{this.playNextSentence(0)})}}>Ayagnia</Button>
            </div>
            :
            <div>
            {this.state.lesson.dialogues.map((k,index)=>
              <div>
              {index < this.state.currentCounter ?
                (k.map((j,jindex)=>
                    (jindex === 0 ?
                      <div style={{textAlign:(this.state.dialogues[j]['speaker']=='a'?'left':'right')}}>
                        {this.returnTopPart(index,j,this.state.dialogues[j],this.state.exerciseNumberMatrix[index],false)}
                      </div>
                      :
                      null
                    )
                  ))
                :
                null
            }
            
            {index == this.state.currentCounter ?
              (k.map((j,jindex)=>
                  (jindex === 0 ?
                    <div style={{textAlign:(this.state.dialogues[j]['speaker']=='a'?'left':'right')}}>
                      {this.returnTopPart(index,j,this.state.dialogues[j],this.state.exerciseNumberMatrix[index],true)}
                      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'80px'}}>
                        <div>
                        {this.showContinue(index)}
                        </div>
                      </div>
                    </div>
                    :
                    null
                  )
                ))
              :
              null
            }
            </div>
            )}

            </div>
          }



        </div>
      </Grid.Column>
      </Grid>

      </div>
    );
  }
}
export default Dialogues;
