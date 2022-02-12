import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider } from 'semantic-ui-react';
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
    this.state = {
      show: false,
      currentCounter: 0,
      showCurrent: false,
    }
  }

  repeatAudio(audio, event, data) {
    console.log(audio)
    var a = new Audio('https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/'+audio+'.mp3');
    a.play();
  }

  render() {
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
        <div>
        {exerciseOrder.map((i,index)=>
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
        )}
        </div>
        </Container>
        

      </Container>
    );
  }
}
export default Dialogues;
