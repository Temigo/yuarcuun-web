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
      randomExerciseCounter:[0],
      lessons: dialog_gen.lessons,
      dialogues: dialog_gen.dialogues,
    }
    console.log(dialog_gen)
  }

  componentDidMount() {
    let randomExerciseCounter = []
    this.state.lessons[this.state.currentLesson]['dialogues'].map((k)=>{
      randomExerciseCounter = randomExerciseCounter.concat(Math.floor(Math.random()*k.length))
    })
    this.setState({randomExerciseCounter:randomExerciseCounter})
  }

  inputtedWord = (event) => {
    this.setState({inputtedWords: event.target.value})
  }

  repeatAudio(audio, event, data) {

    let sound = new Audio(API_URL + "/audiolibrarydialogues/" +  audio);
    sound.play()


    console.log(audio)
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

  handleFormSubmit = (i, match, event,data) => {
  console.log('search:', i, this.state.inputtedWords, data);
  this.checkInputCorrect(i, match);
  }


  checkInputCorrect(i, match, event, data) {
      let exerciseNum = this.state.lessons[this.state.currentLesson]['exercises'][this.state.currentCounter][this.state.exerciseNumber]
      if (this.state.inputtedWords === match) {
          console.log('right');
          this.correctSound.bind(this)();
          var record = this.state.record
          record.push([exerciseNum, this.state.inputtedWords,true])
          this.setState({record:record, currentScore:this.state.currentScore+1})
          setTimeout(function() {this.repeatAudio(i)}.bind(this),150)
      } else {
          console.log('wrong');
          this.incorrectSound.bind(this)();
          var record = this.state.record
          record.push([exerciseNum, this.state.inputtedWords,false])
          this.setState({record:record})
          setTimeout(function() {this.repeatAudio(i)}.bind(this),300)
      }
      this.iterateOne();
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

  previousItem = (index, i, randomExerciseCounter) => {
    let ind = this.state.record[index][0]
    if (ind == -1) {
      return <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
        <div>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ?
          null
          :
          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
        }
        <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
          :
          null
        }
        </div>
        <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
      </div>
    } else if (ind == 0) {
      return <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
        <div style={{color:(this.state.record[index][2] ? 'green' : 'red')}}>{this.state.record[index][1]}</div>
        <div>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ?
          null
          :
          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
        }
        <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
          :
          null
        }
        </div>
        <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
      </div>
    } else if (ind == 1) {
      return <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a'?'left':'right')}}>
        <div>
        <span>{this.state.dialogues[i[randomExerciseCounter]]['chooseEnding'].split('_')[0]}</span>
        <span style={{color:(this.state.record[index][2] ? 'green' : 'red')}}>{this.state.record[index][1]}</span>
        <span>{this.state.dialogues[i[randomExerciseCounter]]['chooseEnding'].split('_')[1]}</span>
        </div>
        <div>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ?
          null
          :
          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
        }
        <span>{this.state.dialogues[i[randomExerciseCounter]]['yup']}</span>
        {this.state.dialogues[i[randomExerciseCounter]]['speaker']=='a' ? 
          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
          :
          null
        }
        </div>
        <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[randomExerciseCounter]]['eng']}</div>
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
          <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
        }
        <span>{this.state.dialogues[i[index]]['yup']}</span>
        {this.state.dialogues[i[index]]['speaker']=='a' ? 
          <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
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

  render() {
    let finished = (this.state.lessons[this.state.currentLesson]['exercises'].length == this.state.currentCounter)
    let exerciseNum;
    if (this.state.exerciseNumber == -1) {
      exerciseNum = -1
    } else {
      if (!finished) {
        exerciseNum = this.state.lessons[this.state.currentLesson]['exercises'][this.state.currentCounter][this.state.exerciseNumber]
      }      
    }
    console.log(finished, exerciseNum)
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
            {this.state.lessons[this.state.currentLesson].dialogues.map((i,index)=>
              <span>
              {index < this.state.currentCounter ?
                this.previousItem(index, i, this.state.randomExerciseCounter[index])
                :
                null
              }
              {i.length > 0 ? this.displayAlternates(i, index, this.state.randomExerciseCounter[index], index):null}
              </span>
            )}
            <Link to={{pathname:'/dialogues'}}><Button>Continue</Button></Link>
            </span>
            :

            <div>
            {exerciseNum === -1 ?
              (this.state.lessons[this.state.currentLesson].dialogues.map((i,index)=>
                <div>
                {index < this.state.currentCounter ?
                  <span>
                  {this.previousItem(index, i, this.state.randomExerciseCounter[index])}
                  {i.length > 0 ? this.displayAlternates(i, index, this.state.randomExerciseCounter[index], index):null}
                  </span>
                  :
                  null
                }
                {index == this.state.currentCounter ?
                  (this.state.showCurrent ?
                    <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[this.state.randomExerciseCounter[index]]]['speaker']=='a'?'left':'right')}}>
                      <div>
                      {this.state.dialogues[i[this.state.randomExerciseCounter[index]]]['speaker']=='a' ?
                        null
                        :
                        <span style={{paddingRight:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
                      }
                      <span>{this.state.dialogues[i[this.state.randomExerciseCounter[index]]]['yup']}</span>
                      {this.state.dialogues[i[this.state.randomExerciseCounter[index]]]['speaker']=='a' ? 
                        <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
                        :
                        null
                      }
                      </div>
                      <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[this.state.randomExerciseCounter[index]]]['eng']}</div>
                    </div>
                    :
                    <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[this.state.randomExerciseCounter[index]]]['speaker']=='a'?'left':'right')}}>
                    <span>{'-'}</span>
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[this.state.randomExerciseCounter[index]]]['eng']}</div>
                    <Button style={{marginTop:'20px'}} onClick={()=>{this.setState({showCurrent:true,record:this.state.record.concat([[exerciseNum,'',true]])}); this.repeatAudio(this.state.dialogues[i[this.state.randomExerciseCounter[index]]]['audio'])}}>{"Show Yup'ik"}</Button>
                    </div>
                  )
                  :
                  null
                }
                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[this.state.randomExerciseCounter[index]]]['speaker']=='a'?'left':'right')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                    {i.length > 0 ? this.displayAlternates(i, index, this.state.randomExerciseCounter[index], this.state.currentCounter):null}
                  </div>
                  :
                  null
                }
                </div>
              ))
              :
              null
            }

            {exerciseNum === 0 ?
              (this.state.lessons[this.state.currentLesson].dialogues.map((i,index)=>
                <div>
                {index < this.state.currentCounter ?
                  <span>
                  {this.previousItem(index, i, this.state.randomExerciseCounter[index])}
                  {i.length > 0 ? this.displayAlternates(i, index, this.state.randomExerciseCounter[index], index):null}
                  </span>
                  :
                  null
                }
                {index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[0]]['speaker']=='a'?'left':'right')}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[0]]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
                      <Form autoComplete="off" onSubmit={this.handleFormSubmit.bind(this,i,this.state.dialogues[i[0]]['yup'])}>
                          <Form.Input autoFocus="autoFocus" placeholder='' value={this.state.inputtedWords} onChange={this.inputtedWord.bind(this)} />
                          <script type="text/javascript">document.theFormID.theFieldID.focus();</script>
                      </Form>
                    </div>
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.state.dialogues[i[0]]['eng']}</div>
                    {i.length > 0 ? this.displayAlternates(i, index, this.state.randomExerciseCounter[index], index):null}
                  </div>
                  :
                  null
                }
                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[0]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
              ))
              :
              null
            }

            {exerciseNum === 1 ?
              (this.state.lessons[this.state.currentLesson].dialogues.map((i,index)=>
                <div>
                {index < this.state.currentCounter ?
                  <span>
                  {this.previousItem(index, i, this.state.randomExerciseCounter[index])}
                  {i.length > 0 ? this.displayAlternates(i, index, this.state.randomExerciseCounter[index], index):null}
                  </span>
                  :
                  null
                }
                {index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[0]]['speaker']=='a'?'left':'right')}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:(this.state.dialogues[i[0]]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
                      <span>{this.state.dialogues[i[0]]['chooseEnding'].split('_')[0]}</span>
                      <Form autoComplete="off" onSubmit={this.handleFormSubmit.bind(this,i,this.state.dialogues[i[0]]['chooseEndingOptions'][0])}>
                          <Form.Input autoFocus="autoFocus" placeholder='' value={this.state.inputtedWords} onChange={this.inputtedWord.bind(this)} />
                          <script type="text/javascript">document.theFormID.theFieldID.focus();</script>
                      </Form>
                      <span>{this.state.dialogues[i[0]]['chooseEnding'].split('_')[1]}</span>

                    </div>
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{this.underlineRegion(this.state.dialogues[i[0]]['chooseEndingEnglish'])}</div>
                    {i.length > 0 ? this.displayAlternates(i, index, this.state.randomExerciseCounter[index], index):null}
                  </div>
                  :
                  null
                }
                {this.state.showCurrent && index == this.state.currentCounter ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(this.state.dialogues[i[0]]['speaker']=='a'?'right':'left')}}>
                    <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                  </div>
                  :
                  null
                }
                </div>
              ))
              :
              null
            }




            </div>

          }

        </Container>
        

      </Container>
    );
  }
}
export default Dialogues;
