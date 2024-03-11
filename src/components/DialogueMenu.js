import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Form, Input, List, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API_URL, TUTORIAL_URL, ICON_URL } from '../App.js';
import { lessonsList, dialogueLibrary } from './constants/qaneryaurci.js';
import { dialogueGenerator } from './constants/dialogueListGenerator.js';
import '../semantic/dist/semantic.min.css';
import * as Scroll from 'react-scroll';
import ReactGA from "react-ga4";
ReactGA.initialize("G-WDEJDCK7QT")

var scroll = Scroll.animateScroll;

let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"
let iconStyle = {paddingLeft:10,fontSize:12,color:'#2185d0'}

const dialog_gen = dialogueGenerator()

class DialogueMenu extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      lessons: dialog_gen.lessons,
      // showExercise: [],
      showExercise: this.props.lessonsStarted === undefined ? [] : this.props.lessonsStarted,
    }
  }

  remove = (array, element) => {
    const index = array.indexOf(element);
    array.splice(index, 1);
    return array
  }

  toggleExercise = (index) => {
    let showEx = this.state.showExercise
    if (showEx.includes(index)) {
      this.setState({showExercise:this.remove(showEx,index)})
    } else {
      this.setState({showExercise:[...showEx,index]})      
    }
  }


  render() {
    console.log(this.state)
    console.log(this.props)
    return (
      <div style={{paddingRight:5,paddingLeft:5}}>
        <Grid textAlign='center'>
        <Grid.Column style={{maxWidth:'800px'}}>
        <div style={{justifyContent:'space-between',display:'flex'}}>
          <div>

      <Link to={{pathname: "/"}}>
      <Icon circular style={{margin:0,marginLeft:5,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='chevron left' />
      </Link>     

          </div>

          <div>
          <Header as='h1'>Dialogues</Header>
          </div>
          <div style={{width:36}} />
        </div>
        <div>
          <div style={{border:'1px solid #E3E3E3',marginTop:'10px'}}>
            <List style={{marginBottom:'5px'}}>
              {this.state.lessons.map((i,index)=>
                <List.Item style={{padding:0,borderBottom:(index === 60 ? '0px solid #E3E3E3' : '1px solid #E3E3E3')}}>
                  {i.context === "chunk" ?
                  <div className='hierarchymain'>
                    <span className='span1'>{i.title}</span>
                  </div>
                  :
                  <div>
                    <div style={{paddingTop:'20px',paddingBottom:'10px',fontSize:'16px'}}>
                      <div style={{fontWeight:'bold'}}>{i.title.split(':')[0]}</div>
                      <div>{i.title.split(':')[1]}</div>
                    </div>
                    <div style={{paddingBottom:'20px'}}>
                      <Link to={{pathname: 'dialogues/'+ index, state: {lessonIndex:index, exerciseNumber:-1}}}>
                        <Button basic compact style={{margin:'5px'}}>
                          {'Listen Only'}
                          {this.props.completedExercises.includes(index.toString()+'%-1') ?
                            <Icon
                              style={iconStyle}
                              name="check"
                            />
                            :
                            null
                          }
                        </Button>
                      </Link>
                      <Button basic compact style={{fontSize:'14px',fontWeight:'400'}} onClick={()=>{this.toggleExercise(index)}}>
                        {'Exercises'}
                        {this.state.showExercise.includes(index) ?
                          <Icon
                            style={{paddingLeft:10,fontSize:12}}
                            name="chevron up"
                          />
                          :
                          <Icon
                            style={{paddingLeft:10,fontSize:12}}
                            name="chevron down"
                          />                          
                        }
                      </Button>
                      {this.state.showExercise.includes(index) ?
                        <div style={{display:'flex',flexDirection:'column',paddingTop:'10px'}}>
                          
                          <div>
                          <Link to={{pathname: 'dialogues/'+ index, state: {lessonIndex:index, exerciseNumber:0}}}>
                          <Button basic compact style={{margin:'5px'}}>
                          {"Guess Yup'ik"}
                          {this.props.completedExercises.includes(index.toString()+'%0') ?
                            <Icon
                              style={iconStyle}
                              name="check"
                            />
                            :
                            null
                          }
                          </Button>
                          </Link>
                          </div>

                          <div>
                          <Link to={{pathname: 'dialogues/'+ index, state: {lessonIndex:index, exerciseNumber:5}}}>
                          <Button basic compact style={{margin:'5px'}}>
                          {"Listening Yup'ik"}
                          {this.props.completedExercises.includes(index.toString()+'%5') ?
                            <Icon
                              style={iconStyle}
                              name="check"
                            />
                            :
                            null
                          }
                          </Button>
                          </Link>
                          </div>

                          <div>
                          <Link to={{pathname: 'dialogues/'+ index, state: {lessonIndex:index, exerciseNumber:1}}}>
                          <Button basic compact style={{margin:'5px'}}>
                          {"Fill-In Yup'ik"}
                          {this.props.completedExercises.includes(index.toString()+'%1') ?
                            <Icon
                              style={iconStyle}
                              name="check"
                            />
                            :
                            null
                          }
                          </Button>
                          </Link>
                          </div>

                          <div>
                          <Link to={{pathname: 'dialogues/'+ index, state: {lessonIndex:index, exerciseNumber:2}}}>
                          <Button basic compact style={{margin:'5px'}}>
                          {"Select Yup'ik"}
                          {this.props.completedExercises.includes(index.toString()+'%2') ?
                            <Icon
                              style={iconStyle}
                              name="check"
                            />
                            :
                            null
                          }
                          </Button>
                          </Link>
                          </div>

                          <div>
                          <Link to={{pathname: 'dialogues/'+ index, state: {lessonIndex:index, exerciseNumber:4}}}>
                          <Button basic compact style={{margin:'5px'}}>
                          {'Select English'}
                          {this.props.completedExercises.includes(index.toString()+'%4') ?
                            <Icon
                              style={iconStyle}
                              name="check"
                            />
                            :
                            null
                          }
                          </Button>
                          </Link>
                          </div>


                        </div>
                        :
                        null
                      }
                    </div>
                  </div>
                  }
                </List.Item>
              )}
            </List>
          </div>
        </div>

          <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',height:60,paddingBottom:16,paddingTop:25}}>
            <Image style={{height:'30px',opacity:0.65}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            <Image style={{height:'30px',opacity:0.65}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            <Image style={{height:'30px',opacity:0.65}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            <Image style={{height:'30px',opacity:0.65}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
          </div>

        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginTop:'10px'}}>
        <span style={{fontSize:'14px',color:'grey',padding:'15px',fontWeight:'400',lineHeight:'23px'}}>
        Website, audio library, and dialogue module production provided by <a style={{color:'#306190'}} href="https://yuarcuun.github.io" target="_blank" >Yuarcuun Technologies</a> in partnership with Orutsararmiut Native Council (ONC). Dialogues from textbook Qaneryaurci Yup'igtun (Hensel et al., 1983). Recordings done by Maklak Liu and Cikigaq John. This website was made possible by Grant Number 90XN0110-01-00 from Administration for Native Americans.
        </span>
        </div>




        </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default DialogueMenu;
