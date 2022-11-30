import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Form, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
import { lessonsList, dialogueLibrary } from './constants/qaneryaurci.js';
import { dialogueGenerator } from './constants/dialogueListGenerator.js';
import '../semantic/dist/semantic.min.css';


const dialog_gen = dialogueGenerator()

class DialogueMenu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      lessons: dialog_gen.lessons,
    }
  }


  render() {
    console.log(this.state)
    return (
      <div style={{paddingRight:5,paddingLeft:5}}>
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
              {i.context === "chunk" ?
                <div style={{padding:'10px',fontSize:'20px'}}>
                  {i.title}
                </div>
              :
                <div>
                  <div>{i.title}</div>
                  <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:-1}}}>
                  <Button size='tiny' style={{marginBottom:'5px'}}>
                  {'Read Only'}
                  </Button>
                  </Link>

                  <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:0}}}>
                  <Button size='tiny' style={{marginBottom:'5px'}}>
                  {"Guess Yup'ik"}
                  </Button>
                  </Link>

                  <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:1}}}>
                  <Button size='tiny' style={{marginBottom:'5px'}}>
                  {"Fill-In Yup'ik"}
                  </Button>
                  </Link>

                  <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:2}}}>
                  <Button size='tiny' style={{marginBottom:'5px'}}>
                  {"Select Yup'ik"}
                  </Button>
                  </Link>

                  <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:3}}}>
                  <Button size='tiny' style={{marginBottom:'5px'}}>
                  {'Fill-In English'}
                  </Button>
                  </Link>

                  <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:4}}}>
                  <Button size='tiny' style={{marginBottom:'5px'}}>
                  {'Select English'}
                  </Button>
                  </Link>

                  <Link to={{pathname: 'dialogues/'+ index, state: {exerciseNumber:5}}}>
                  <Button size='tiny' style={{marginBottom:'5px'}}>
                  {"Listening Yup'ik"}
                  </Button>
                  </Link>

                </div>
              }
            </div>
            )}
        </Container>
      </div>
    );
  }
}
export default DialogueMenu;
