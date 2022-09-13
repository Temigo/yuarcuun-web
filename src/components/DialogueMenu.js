import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Form, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
import {lessonsList, dialogueLibrary} from './constants/qaneryaurci.js';
import dialogueGenerator from './constants/dialogueListGenerator.js';
import '../semantic/dist/semantic.min.css';


class DialogueMenu extends Component {
  constructor(props) {
    super(props);
    const dialog_gen = dialogueGenerator()
    this.state = {
      lessons: dialog_gen.lessons,
    }
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
          {this.state.lessons.map((i,index)=>
            <div>
              {console.log(i)}
              {i.context === "chunk" ?
                <div style={{padding:'10px',fontSize:'20px'}}>
                  {i.title}
                </div>
              :
                <div>
                  <div>{i.title}</div>
                  <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:-1}}}>
                  <Button style={{marginBottom:'5px'}}>
                  {'Read Only'}
                  </Button>
                  </Link>
                  {i.exercises[0][0] !== "" && 
                    <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:0}}}>
                    <Button style={{marginBottom:'5px'}}>
                    {'Exercise 1'}
                    </Button>
                    </Link>
                  }
                  {i.exercises[0][1] !== "" && 
                    <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:1}}}>
                    <Button style={{marginBottom:'5px'}}>
                    {'Exercise 2'}
                    </Button>
                    </Link>
                  }
                  {i.exercises[0][2] !== "" && 
                    <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:2}}}>
                    <Button style={{marginBottom:'5px'}}>
                    {'Exercise 3'}
                    </Button>
                    </Link>
                  }
                  {i.exercises[0][3] !== "" && 
                    <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:3}}}>
                    <Button style={{marginBottom:'5px'}}>
                    {'Exercise 4'}
                    </Button>
                    </Link>
                  }
                </div>
              }
            </div>
            )}
        </Container>
      </Container>
    );
  }
}
export default DialogueMenu;
