import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Form, Input, Transition, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
import {lessonsList, dialogueLibrary} from './constants/qaneryaurci.js';
import { dialogueGenerator, exerciseGenerator } from './constants/dialogueListGenerator.js';
import {sentenceTransitionTimings} from './constants/sentenceTransitionTimings.js';
import '../semantic/dist/semantic.min.css';



class Dialogues extends Component {
  constructor(props) {
    super(props);
    const currentLesson = decodeURI(props.match.params.num)
    const dialog_gen = dialogueGenerator()
    const exercise_gen = exerciseGenerator(dialog_gen.lessons[currentLesson],dialog_gen.dialogues,dialog_gen.bagOfWords)
    this.state = {
      show: false,
      currentLesson: currentLesson,
      exerciseNumber: props.location.state === undefined ? -1 : props.location.state.exerciseNumber,
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
      showEnglishMatrix:[true],
      showAlternateList:[false],
    }
  }

  componentDidUpdate(prevProps,prevState) {

    // if (prevState.currentCounter !== this.state.currentCounter && this.state.lessons[this.state.currentLesson]['exercises'].length !== this.state.currentCounter) {
    //   // console.log(this.state.lessons[this.state.currentLesson]['exercises'][this.state.currentCounter], this.state.exerciseNumber)
    //   if (this.state.exerciseNumber !== -1) {
    //     if (this.state.lessons[this.state.currentLesson]['exercises'][this.state.currentCounter][this.state.exerciseNumber].includes('listenchoose')) {
    //       this.repeatAudio(this.state.dialogues[this.state.lessons[this.state.currentLesson]['dialogues'][this.state.currentCounter][this.state.randomCounters['randomExerciseCounter'][this.state.currentCounter]]]['audio'])
    //     }
    //   }
    // }

    if (prevState.showEnglish !== this.state.showEnglish) {
      let showEnglishMatrix = []
      if (this.state.showEnglish) {
        this.state.lessons[this.state.currentLesson]['dialogues'].map((k)=>{
          showEnglishMatrix = showEnglishMatrix.concat(true)
        })
      } else {
        this.state.lessons[this.state.currentLesson]['dialogues'].map((k)=>{
          showEnglishMatrix = showEnglishMatrix.concat(false)
        })
      }
      this.setState({showEnglishMatrix:showEnglishMatrix})
    }
  }

  componentWillMount() {
      this.setState({exerciseNumberMatrix: [...Array(this.state.lesson.dialogues.length)].map(x => 0)})

      console.log(this.state.dialogues[this.state.lesson.dialogues[0][0]]['audio'])
      fetch(API_URL + "/audiolibrarydialogues/" +  this.state.dialogues[this.state.lesson.dialogues[0][0]]['audio'])
        .then(response => {console.log('contains audio')})
        .catch(error => {
          this.setState({
            audioExists: false,
          });      
        });     

  }

  // initialize = () => {
  //   let showEnglishMatrix = []
  //   let showAlternateList = []
  //   this.state.lessons[this.state.currentLesson]['dialogues'].map((k)=>{
  //     if (this.state.showEnglish) {
  //       k.map((j)=>{
  //         showEnglishMatrix = showEnglishMatrix.concat(j)
  //       })
  //     }
  //     showAlternateList = showAlternateList.concat(false)
  //   })

  //   this.setState({
  //     showEnglishMatrix:showEnglishMatrix,
  //     showAlternateList:showAlternateList,
  //     record:{},
  //     currentCounter:-1,
  //   })
  // }


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
    let sound = new Audio(API_URL + "/audiolibrarydialogues/" +  'correct_half.mp3');
    sound.play()
  }

  incorrectSound(event, data) {
    // console.log(audio)
    let sound = new Audio(API_URL + "/audiolibrarydialogues/" +  'incorrect_half.mp3');
    sound.play()
  }



  displayAlternates = (i, currentCounter, randomExerciseCounter, typeAttributes) => {
    // console.log(i, currentCounter, randomExerciseCounter, currentCounter)

    // console.log('currentCounter',currentCounter)
    // console.log('i',i)
    // console.log('randomExerciseCounter',randomExerciseCounter)
    // console.log('typeAttributes',typeAttributes)

    let showEnglishMatrix = this.state.showEnglishMatrix
    return <span>{i.map((k,index)=> 
      randomExerciseCounter !== index ?
        <div style={{fontSize:'20px',textAlign:(this.state.dialogues[i[index]]['speaker']=='a'?'left':'right')}}>
        <div style={{paddingBottom:'10px',fontSize:'18px',marginRight:'10px',marginLeft:'10px'}}>{"wall'u"}</div>
        <div style={{display:'inline-block',border:(this.state.currentlyPlaying === currentCounter && this.state.currentlyPlayingIndex == index ? "1px solid #b0d1e7": "1px solid #d7d7d7"),borderRadius:'10px',padding:'10px',maxWidth:'80%',marginBottom:'10px'}}>
        {this.state.dialogues[i[index]]['speaker']=='a' ?
          null
          :
          <span style={{paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(currentCounter, index)}} /></span>
        }

        {this.state.dialogues[i[index]]['yup'].split(" ").map((k,kindex)=>
            <span style={{opacity:(this.state.visible[kindex] && this.state.currentlyPlaying == currentCounter && this.state.currentlyPlayingIndex == index ? 1.0 : 0.5),marginRight:'6px'}}>
              {k}
            </span>
        )}

        {this.state.dialogues[i[index]]['speaker']=='a' ? 
          <span style={{paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(currentCounter, index)}} /></span>
          :
          null
        }

        {this.state.showEnglish ?
          null
          :
          <Icon onClick={()=>{{this.state.showEnglishMatrix.includes(i[index]) ? showEnglishMatrix.splice(showEnglishMatrix.indexOf(i[index]),1) : showEnglishMatrix = showEnglishMatrix.concat(i[index])}; this.setState({showEnglishMatrix:showEnglishMatrix})}} style={{color:'#d4d4d4',width:'22px',paddingLeft:'5px'}} link name='comment alternate outline'>{'\n'}</Icon>
        }
        {this.state.showEnglishMatrix.includes(i[index]) ?
          <div style={{color:'#b9b9b9',fontWeight:'200',marginTop:'5px'}}>{this.state.dialogues[i[index]]['eng']}</div>
          :
          null
        }
        </div>

      </div>
      :
      null
    )}</span>
  }

  checkInputCorrect(match, index, dialogueInfo, event, data) {
      if (this.state.inputtedWords === match) {
          this.correctSound.bind(this)();

          var record = this.state.record
          record[index] = {
          'userInput':this.state.inputtedWords, 
          'correct':true,
          }
          this.setState({record:record, currentScore:this.state.currentScore+1})

          setTimeout(function() {this.repeatAudio(dialogueInfo['audio'])}.bind(this),150)
      } else {
          this.incorrectSound.bind(this)();

          var record = this.state.record
          record[index] = {
          'userInput':this.state.inputtedWords, 
          'correct':false,
          }

          setTimeout(function() {this.repeatAudio(dialogueInfo['audio'])}.bind(this),150)
      }
      // this.iterateOne();
      this.setState({inputtedWords: '',currentCounter: this.state.currentCounter+1})
  }

  checkSelectCorrect(match, word, index, dialogueInfo, event, data) {

      console.log('hi')
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
            setTimeout(function() {this.repeatAudio(dialogueInfo['audio'])}.bind(this),150)              
            record[index] = {
              'optionsTried':optionsTried,
            }
        } else {
          this.incorrectSound.bind(this)();
          optionsTried = optionsTried.concat([word])
          if (optionsTried.length === 3) {
            optionsTried = optionsTried.concat([match])              
            this.setState({showContinue: true})
            setTimeout(function() {this.repeatAudio(dialogueInfo['audio'])}.bind(this),150)   
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
      if ([-1].includes(this.state.exerciseNumberMatrix[nextIndex])) {
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
    console.log(dialogueInfo)
    let customFont = {fontSize:'20px',display:'inline-block',border:"1px solid #d7d7d7",borderRadius:'10px',padding:'10px',maxWidth:'80%',marginTop:'5px',marginBottom:'5px'}
    let toptextStyle = {color:'#000000DE'}
    let textStyle = {color:'#000000DE',fontWeight:200}

    if (exerciseNum == -1) {
      return <div>
        {this.returnContent('yupikReadOnly',dialogueInfo,name,index,textStyle)}
      </div>             
    } else if (exerciseNum == 0) {
      if (isCurrent) {
        return <div style={customFont}>
          {this.returnContent('englishNotStyled',dialogueInfo,name,index,textStyle)}
          {this.state.showYupik ? 
            this.returnContent('yupikNotStyled',dialogueInfo,name,index,textStyle)
            :
            <Button onClick={()=>{this.stopCurrentSentence(); this.setState({showYupik:true,showContinue:true},()=>{this.playCurrentSentence(index,name)})}}>{"Show Yup'ik"}</Button>
          }
        </div>           
      } else {
        return <div style={customFont}>
          {this.returnContent('englishNotStyled',dialogueInfo,name,index,textStyle)}
          {this.returnContent('yupikNotStyled',dialogueInfo,name,index,textStyle)}
        </div>           
      }
    } else if (exerciseNum == 1) {
      if (isCurrent) {
        return <div style={customFont}>
          {this.returnContent('yupikInput',dialogueInfo,name,index,textStyle)}
          {this.returnContent('englishNotStyled',dialogueInfo,name,index,textStyle)}
        </div>           
      } else {
        return <div style={customFont}>
          {this.returnContent('yupikUserInput',dialogueInfo,name,index,textStyle)}
          {this.returnContent('yupikInputCorrect',dialogueInfo,name,index,textStyle)}
          {this.returnContent('englishNotStyled',dialogueInfo,name,index,textStyle)}
        </div>           
      }
    } else if (exerciseNum == 2) {
      if (isCurrent) {
        return <div style={customFont}>
          {this.returnContent('englishUnderlined',dialogueInfo,name,index,toptextStyle)}
          {index in this.state.record ?
            (this.state.record[index]['optionsTried'].includes(dialogueInfo['yupikQuestionCorrect']) ?
              this.returnContent('yupikUnderlined',dialogueInfo,name,index,textStyle)
              :
              this.returnContent('yupikSelection',dialogueInfo,name,index,textStyle)
            )
            :
            this.returnContent('yupikSelection',dialogueInfo,name,index,textStyle)
          }
          {this.returnContent('yupikOptions',dialogueInfo,name,index,textStyle)}
        </div>           
      } else {
        return <div style={customFont}>
          {this.returnContent('englishUnderlined',dialogueInfo,name,index,toptextStyle)}
          {this.returnContent('yupikUnderlined',dialogueInfo,name,index,textStyle)}
          {this.returnContent('yupikOptions',dialogueInfo,name,index,textStyle)}
        </div>           
      }
    }
  }

  returnContent(type, dialogueInfo, name, index, textStyle) {
    let showEnglishMatrix = this.state.showEnglishMatrix
    let correctColor = '#6cb590'
    let incorrectColor = "#ff5757"

    if (type === 'yupikNotStyled') {
               return <div>
   {dialogueInfo['speaker']=='a' ?
              null
              :
              (this.state.audioExists ? <span style={{display:'inline-block',fontSize:'20px',width:'35px',paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
            }
            <span>{dialogueInfo['yupik']}</span>
            {dialogueInfo['speaker']=='a' && this.state.audioExists  ? 
              (this.state.audioExists ? <span style={{display:'inline-block',fontSize:'20px',width:'35px',paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
              :
              null
            }
          </div>
    } else if (type === 'yupikUnderlined') {
      return <div style={{lineHeight:'30px',}}>
            {dialogueInfo['speaker']=='a' && this.state.audioExists  ?
              null
              :
              (this.state.audioExists ? <span style={{display:'inline-block',fontSize:'20px',width:'35px',paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
            }
            <span style={textStyle}>
              <span>{dialogueInfo['yupikQuestion'][0]}</span>
              <span style={{borderBottom:'1px solid black'}}>{dialogueInfo['yupikQuestionCorrect']}</span>
              <span>{dialogueInfo['yupikQuestion'][2]}</span>
            </span>
            {dialogueInfo['speaker']=='a' && this.state.audioExists  ? 
              (this.state.audioExists ? <span style={{display:'inline-block',fontSize:'20px',fontwidth:'35px',paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
              :
              null
            }
          </div>
    } else if (type === 'englishUnderlined') {
      return <div style={textStyle} style={{lineHeight:'30px'}}>
              <span>{dialogueInfo['englishQuestion'][0]}</span>
              <span style={{borderBottom:'1px solid #b9b9b9'}}>{dialogueInfo['englishQuestionCorrect']}</span>
              <span>{dialogueInfo['englishQuestion'][2]}</span>
            </div>
    } else if (type === 'yupikInput') {
      return <div style={{fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end')}}>
                <span>{dialogueInfo['yupikQuestion'][0]}</span>
                <Form autoComplete="off" onSubmit={this.checkInputCorrect.bind(this,dialogueInfo['yupikQuestionCorrect'],index)}>
                    <Form.Input autoFocus="autoFocus" placeholder='' value={this.state.inputtedWords} onChange={this.inputtedWord.bind(this)} />
                    <script type="text/javascript">document.theFormID.theFieldID.focus();</script>
                </Form>
                <span>{dialogueInfo['yupikQuestion'][2]}</span>
              </div>
            </div>
    } else if (type === 'yupikSelection') {
      return <div style={{lineHeight:'30px',}}>
              <div style={{fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end')}}>
                  <span style={textStyle}>
                    <span style={{marginLeft:(dialogueInfo['speaker']=='a'?'0px':'35px')}}>{dialogueInfo['yupikQuestion'][0]}</span>
                    <span style={{borderBottom:'1px solid black',color:'white'}}>{dialogueInfo['yupikQuestionCorrect']}</span>
                    <span style={{marginRight:(dialogueInfo['speaker']=='a'?'35px':'0px')}}>{dialogueInfo['yupikQuestion'][2]}</span>
                  </span>
                </div>
              </div>
            </div>
    } else if (type === 'yupikOptions') {
      return <div style={{paddingTop:'10px',fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:(dialogueInfo['speaker']=='a'?'flex-start':'flex-end')}}>
                  
                  {dialogueInfo['yupikQuestionOptions'].map((k,kindex)=>
                    <div onClick={this.checkSelectCorrect.bind(this,dialogueInfo['yupikQuestionCorrect'],k,index,dialogueInfo)} class='grid-verticaloptioncenter' style={{
                      fontWeight:200,
                      border:(index in this.state.record ? (this.state.record[index]['optionsTried'].includes(k) ? (k === dialogueInfo['yupikQuestionCorrect'] ? '1px solid #69cd6e':'1px solid #ffffff') : null) : null),
                      color:(index in this.state.record ? (this.state.record[index]['optionsTried'].includes(k) ? (k === dialogueInfo['yupikQuestionCorrect'] ? '#32a038':'#d4d4d4') : null) : null),
                    }}>
                    {k}
                    </div>
                  )}
                  
                </div>
              </div>
    } else if (type === 'yupikUserInput') {
      return <div style={{fontWeight:'200'}}>
              <span style={{color:'#b9b9b9'}}>{dialogueInfo['yupikQuestion'][0]}</span>
              <span style={{color:(this.state.record[index]['correct']?correctColor:incorrectColor),fontWeight:'200'}}>{this.state.record[index]['userInput']}</span>
              <span style={{color:'#b9b9b9'}}>{dialogueInfo['yupikQuestion'][2]}</span>
            </div>
    } else if (type === 'yupikInputCorrect') {
      return <div style={{fontWeight:'200',marginBottom:'20px'}}>
              <span style={{color:'#b9b9b9'}}>{dialogueInfo['yupikQuestion'][0]}</span>
              <span>{dialogueInfo['yupikQuestionCorrect']}</span>
              <span style={{color:'#b9b9b9'}}>{dialogueInfo['yupikQuestion'][2]}</span>
            </div>
    } else if (type === 'englishNotStyled') {
      return <div style={textStyle}>
            {dialogueInfo['english']}
            </div>
    } else if (type === 'yupikReadOnly') {
      return <div>
        <div style={{fontSize:'20px',textAlign:(dialogueInfo['speaker']=='a'?'left':'right')}}>
          <div style={{display:'inline-block',border:(this.state.currentlyPlaying === name ? "1px solid #b0d1e7": "1px solid #d7d7d7"),borderRadius:'10px',padding:'10px',maxWidth:'80%',marginBottom:'10px'}}>
            <div>
            {dialogueInfo['speaker']=='a' && this.state.audioExists  ?
              null
              :
              (this.state.audioExists ? <span style={{paddingRight:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
            }

            {dialogueInfo['yupik'].split(" ").map((k,kindex)=>
                <span style={{opacity:(this.state.visible[kindex] && this.state.currentlyPlaying == name ? 1.0 : 0.5),marginRight:'6px'}}>
                  {k}
                </span>
            )}

            {dialogueInfo['speaker']=='a' && this.state.audioExists  ? 
              (this.state.audioExists ? <span style={{paddingLeft:'5px', cursor:'pointer'}}><Icon name='volume up' color='black' onClick={()=>{this.playCurrentSentence(index,name)}} /></span> : null)
              :
              null
            }
            {this.state.showEnglish ?
              null
              :
              <Icon onClick={()=>{{this.state.showEnglishMatrix.includes(name) ? showEnglishMatrix.splice(showEnglishMatrix.indexOf(name),1) : showEnglishMatrix = showEnglishMatrix.concat(name)}; this.setState({showEnglishMatrix:showEnglishMatrix})}} style={{color:'#d4d4d4',width:'22px',paddingLeft:'5px'}} link name='comment alternate outline'>{'\n'}</Icon>
            }
            </div>
            {this.state.showEnglishMatrix.includes(name) ?
              <div style={{color:'#b9b9b9',fontWeight:'200',marginTop:'5px'}}>{dialogueInfo['english']}</div>
              :
              null
            }
          </div>
        </div>
      </div> 
    }

  }

  showContinue(index) {
    if ([-1].includes(this.state.exerciseNumberMatrix[index])) {
      return <Button icon circular size='huge' onClick={()=>{
        this.stopCurrentSentence();
        this.setState({
          showContinue:false,
          currentCounter:this.state.currentCounter+1,
        },
        ()=>{this.playNextSentence(index+1)}
        )}}><Icon name='chevron down' /></Button>
    } else if ([0].includes(this.state.exerciseNumberMatrix[index])) {
      if (this.state.showContinue) {
      return <Button icon circular size='huge' onClick={()=>{
        // this.stopCurrentSentence();
        this.setState({
          showContinue:false,
          showYupik:false,
          currentCounter:this.state.currentCounter+1,
        },
        ()=>{this.playNextSentence(index+1)}
        )}}><Icon name='chevron down' /></Button>
      }
    } else {
      if (this.state.showContinue) {
        return <Button icon circular size='huge' onClick={()=>{
          this.stopCurrentSentence();
          this.setState({
            showContinue:false,
            showYupik:false,
            currentCounter:this.state.currentCounter+1,
          },
          ()=>{this.playNextSentence(index+1)}
          )}}><Icon name='chevron down' /></Button>        
      }
    }
  }

  render() {
    console.log(this.state)
    // let exerciseNum = this.state.exerciseNumber
    // if (exerciseNum == '10') {
    //   //alternate between exerciseNumbers
    // }
    return (
      <Container>
        <div style={{justifyContent:'space-between',display:'flex'}}>
          <div>
          <Button primary icon circular onClick={this.props.history.goBack}>
            <Icon name='chevron left' />
          </Button>
          </div>
          <div>
            <div style={{textAlign:'center',fontWeight:'bold',fontSize:'14px'}}>{this.state.lesson.title}</div>
            <div style={{textAlign:'center',color:'grey',fontStyle:'italic'}}>{this.state.lesson.context}</div>
          </div>
          <div style={{width:36}} />
        </div>
        <Divider />
        <Container>
          
          {this.state.currentCounter == -1 ?
            <div style={{display:'flex',justifyContent:'center'}}>
            <Button onClick={()=>{this.setState({currentCounter:0, exerciseNumberMatrix: [-1,-1,-1,-1,-1,-1]},()=>{this.playNextSentence(0)})}}>Ayagnia -1</Button>
            <Button onClick={()=>{this.setState({currentCounter:0, exerciseNumberMatrix: [0,0,0,0,0,0]},()=>{this.playNextSentence(0)})}}>Ayagnia 0</Button>
            <Button onClick={()=>{this.setState({currentCounter:0, exerciseNumberMatrix: [1,1,1,1,1,1]},()=>{this.playNextSentence(0)})}}>Ayagnia 1</Button>
            <Button onClick={()=>{this.setState({currentCounter:0, exerciseNumberMatrix: [2,2,2,2,2,2]},()=>{this.playNextSentence(0)})}}>Ayagnia 2</Button>
            <Button onClick={()=>{this.setState({currentCounter:0, exerciseNumberMatrix: [3,3,3,3,3,3]},()=>{this.playNextSentence(0)})}}>Ayagnia 3</Button>
            </div>
            :
            (this.state.lesson.dialogues.map((k,index)=>
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
                      <div style={{display:'flex',justifyContent:'center'}}>
                        {this.showContinue(index)}
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
            ))
          }



        </Container>
        

      </Container>
    );
  }
}
export default Dialogues;
