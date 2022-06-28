import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Form, Input } from 'semantic-ui-react';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
import {lessonsList, dialogueLibrary} from './constants/qaneryaurci.js';
import '../semantic/dist/semantic.min.css';

// let library = {
// "ch3-001":{"eng":"How nice it is outside!","yup":"Ellami-lli assirpaa!","speaker":"a"},
// "ch3-002":{"eng":"Yes, it is really nice out.","yup":"Ii-i, ella assirtuq.","speaker":"b"},
// "ch3-003":{"eng":"Your parka is very nice!","yup":"Atkuun assirpagta!","speaker":"a"},
// "ch3-004":{"eng":"Thank you, my mother made it.","yup":"Quyana, aanama pilialqaa.","speaker":"b"},
// "ch3-005":{"eng":"Where are you from?","yup":"Camiungusit?","speaker":"a"},
// "ch3-006":{"eng":"I'm from Kuinerraq.","yup":"Kuinerrarmiunguunga.","speaker":"b"},
// "ch3-007":{"eng":"Who are you related to?","yup":"Kia ilakaten?","speaker":"a"},
// "ch3-008":{"eng":"I'm Apurin's offspring.","yup":"Apurinaam yukaanga.","speaker":"b"},
// }

// let exerciseOrder = [
// "ch3-001",
// "ch3-002",
// "ch3-003",
// "ch3-004",
// "ch3-005",
// "ch3-006",
// "ch3-007",
// "ch3-008",
// ]


class Dialogues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentLesson: -1,
      currentCounter: 0,
      questionMode:true,
      showCurrent: false,
      correct:'assirpagta',
      inputtedWords: '',
      record:[],
    }
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

  handleFormSubmit = (i, event,data) => {
  console.log('search:', this.state.inputtedWords, data);
  this.checkInputCorrect(i);
  }


  checkInputCorrect(i, event, data) {
      // console.log(this.state.inputtedWords, exerciseOrder[this.state.currentCounter]['yup'])
      if (this.state.inputtedWords === library[exerciseOrder[this.state.currentCounter]]['yup']) {
          console.log('right');
          this.correctSound.bind(this)();
          var record = this.state.record
          record.push(1)
          this.setState({record:record, currentScore:this.state.currentScore+1})
          setTimeout(function() {this.repeatAudio(i)}.bind(this),150)
      } else {
          console.log('wrong');
          this.incorrectSound.bind(this)();
          var record = this.state.record
          record.push(-1)
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

  render() {
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
        {this.state.currentLesson === -1 ?
          <div>
          <Button onClick={()=>{this.setState({currentLesson:1})}}>Go to Lesson 1</Button>
          </div>
          :
          <div>
          {!this.state.questionMode ?
            (exerciseOrder.map((i,index)=>
              <div>
              {index < this.state.currentCounter ?
                <div style={{padding:'10px',fontSize:'20px',textAlign:(library[i]['speaker']=='a'?'left':'right')}}>
                  <div>
                  <span>{library[i]['yup']}</span>
                  <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
                  </div>
                  <div style={{color:'#b9b9b9',fontWeight:'200'}}>{library[i]['eng']}</div>
                </div>
                :
                null
              }
              {index == this.state.currentCounter ?
                (this.state.showCurrent ?
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(library[i]['speaker']=='a'?'left':'right')}}>
                    <div>
                    <span>{library[i]['yup']}</span>
                    <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
                    </div>
                    <div style={{color:'#b9b9b9',fontWeight:'200'}}>{library[i]['eng']}</div>
                  </div>
                  :
                  <div style={{padding:'10px',fontSize:'20px',textAlign:(library[i]['speaker']=='a'?'left':'right')}}>
                  <span>{'-'}</span>
                  <div style={{color:'#b9b9b9',fontWeight:'200'}}>{library[i]['eng']}</div>
                  <Button onClick={()=>{this.setState({showCurrent:true}); this.repeatAudio(i)}}>{"Show Yup'ik"}</Button>
                  </div>
                )
                :
                null
              }
              {this.state.showCurrent && index == this.state.currentCounter ?
                <div style={{padding:'10px',fontSize:'20px',textAlign:(library[i]['speaker']=='a'?'right':'left')}}>
                  <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                </div>
                :
                null
              }
              </div>
            ))
            :
            (lessonsList[this.state.currentLesson].map((i,index)=>
              <div>
              {index < this.state.currentCounter ?
                <div style={{padding:'10px',fontSize:'20px',textAlign:(library[i]['speaker']=='a'?'left':'right')}}>
                  <div>
                  <span>{library[i]['yup']}</span>
                  <span style={{paddingLeft:'5px'}}><Icon name='volume up' color='black' onClick={this.repeatAudio.bind(this,i)} /></span>
                  </div>
                  <div style={{color:'#b9b9b9',fontWeight:'200'}}>{library[i]['eng']}</div>
                </div>
                :
                null
              }
              {index == this.state.currentCounter ?
                <div style={{padding:'10px',fontSize:'20px',textAlign:(library[i]['speaker']=='a'?'left':'right')}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:(library[i]['speaker']=='a'?'flex-start':'flex-end'),fontFamily:"Lato,Helvetica Neue,Arial,Helvetica,sans-serif"}}>
                    <Form autoComplete="off" onSubmit={this.handleFormSubmit.bind(this,i)}>
                        <Form.Input autoFocus="autoFocus" placeholder='' value={this.state.inputtedWords} onChange={this.inputtedWord.bind(this)} />
                        <script type="text/javascript">document.theFormID.theFieldID.focus();</script>
                    </Form>
                  </div>
                  <div style={{color:'#b9b9b9',fontWeight:'200'}}>{library[i]['eng']}</div>
                </div>
                :
                null
              }
              {this.state.showCurrent && index == this.state.currentCounter ?
                <div style={{padding:'10px',fontSize:'20px',textAlign:(library[i]['speaker']=='a'?'right':'left')}}>
                  <Button onClick={()=>{this.setState({showCurrent:false,currentCounter:this.state.currentCounter+1})}}>{'Show Next'}</Button>
                </div>
                :
                null
              }
              </div>
            ))
          }
          </div>
        }
        </Container>
        

      </Container>
    );
  }
}
export default Dialogues;
