import React, { PureComponent } from 'react';
import { Container, Segment, Table, Accordion, Icon, Button, List} from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import { sentenceTemplates } from './constants/sentence_templates.js'
import { colorsList } from './constants/newconstants.js'

let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"

let accordionTitles = [
  {
    key:'noun phrase only',
    name:'Noun phrases',
    // examples:[['piipirpak','the one large baby'],['qimugteka','my one dog']],
    examples:[['piipirpak','the one large baby']],
    values:[
      {key:'simple',values:['simple','possession','oblique nouns','descriptors']},
      {key:'postbases',values:['noun-noun postbases','verb-noun postbases']}
    ]
  },
  {
    key:'verb (+ noun) statements',
    name:'Verb phrases',
    // examples:[["piipiq ner'uq",'the baby is eating'],['angyangqertuq','he has a boat']],
    examples:[["piipiq ner'uq",'the baby is eating']],
    values:[
      {key:'statement sentence',values:['subject only','subject with object not marked on verb','subject and object marked on verb','verb + oblique noun']},
      {key:'postbases',values:['verb-verb postbases','noun-verb postbases']},
    ],
  },
  {
    key:'verb (+ noun) questions',
    name:'Ask a question',
    // examples:[['kaigtuten-qaa?','are you hungry?'],['nani iqvallrusit?','where did you pick berries?']],
    examples:[['kaigtuten-qaa?','are you hungry?']],
    values:[
      {key:'question sentence',values:['yes-no question','wh-question']},
    ],
  },
  {
    key:'verb (+ noun) commands',
    name:'Make a command',
    // examples:[["taiteqerr'u",'you, bring it over (please)'],['aqumluten','you, sit down (polite)']],
    examples:[["taiteqerru",'you, bring it over (please)']],
    values:[
      {key:'command sentence',values:['optative','subordinative','subject only','subject and object marked']}
    ],
  },
  {
    key:'verb + verb phrase sentence',
    name:'Advanced verb phrases',
    // examples:[['kaigciquten nerenrilkuvet','you will be hungry if you do not eat'],['itellruunga tangerrsugluku','I came in wanting to see her']],
    examples:[['kaigciquten nerenrilkuvet','you will be hungry if you do not eat']],
    values:[
      {key:'connective verb',values:['before...','because...','whenever...','even though...','if, when in the future...','when in the past...','while...']},
      {key:'subordinative verb',values:['adjectival',]}
    ]
  }
]

class SentenceTemplates extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // entries: props.entries,
      // mood: props.mood,
      activeIndexes: [],
      randomSentenceIndex: 0,
      randomSentences: [Object.keys(sentenceTemplates)[Math.floor(Math.random()*Object.keys(sentenceTemplates).length)]],
      seeMoreExamples: true,
    };
  }


  handleClick = (e, titleProps) => {
    // console.log(e,titleProps)
    // this.setState({ loaderOn: true });
    const { index } = titleProps;
    const { activeIndexes } = this.state;
    const newIndex = this.state.activeIndexes.slice()
    // const newIndex = activeIndex === index ? -1 : index;

    const currentIndexPosition = activeIndexes.indexOf(index);

    console.log(currentIndexPosition, activeIndexes, index)
    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1);
    } else {
      newIndex.push(index);
    }

    console.log(newIndex)

    // let mood = moods[index];
    // if (newIndex !== -1) {   
      // this.getEndings(this.state.parses[currentIndex], mood);
    // }
    this.setState({ activeIndexes: newIndex });
  };

  randomizeSentence = (direction) => {
    if (direction === '+') {
      if (this.state.randomSentences.length-1 === this.state.randomSentenceIndex) {
        this.setState({randomSentences: this.state.randomSentences.concat([Object.keys(sentenceTemplates)[Math.floor(Math.random()*Object.keys(sentenceTemplates).length)]])})
      }
      this.setState({randomSentenceIndex: this.state.randomSentenceIndex+1})
    } else {
      this.setState({randomSentenceIndex: this.state.randomSentenceIndex-1})
    }
  }

  // getColor = (pos) => {
  //   return colorsList[0][pos]  
  // }

  render() {
    // console.log(this.state)
    const {activeIndexes} = this.state;

        // <Link to={{pathname: "/sentencebuilder/0", state: { history:this.state.history }}} onClick={()=> {this.props.flipGlossary(true)}} >
        //   <div style={{display:'flex',justifyContent:'center',margin:'15px'}}>
        //   <Button basic>{'See Full Glossary of Examples'}<Icon style={{paddingLeft:10}} name='chevron right' /></Button>
        //   </div>
        // </Link>

    return (
      <div>

        <div className='hierarchymain'>
        <span className='span1'>Or click on a random example</span>
        </div>
        <div style={{display:'flex',marginTop:'10px',height:120}}>
          <div style={{flex:4,display:'flex',alignItems:'center',justifyContent:(window.innerWidth < 480 ? 'center':'flex-end')}}>
            <Link to={{pathname: '/sentencebuilder/2'}}>
              <Button style={{marginLeft:'10px',borderRadius:'4rem',paddingBottom:'14px'}} circular onClick={()=> {this.props.backEndCall(sentenceTemplates[this.state.randomSentences[this.state.randomSentenceIndex]][2],true);this.setState({activeIndexes: []})}}>
                <div style={{width:(window.innerWidth < 480 ? '':'350px'),textAlign:'center',fontSize:(window.innerWidth < 480 ? '18px':'20px'),lineHeight:'20px',paddingTop:'2px',marginBottom:'10px',fontFamily:customFontFam}}>
                  {sentenceTemplates[this.state.randomSentences[this.state.randomSentenceIndex]][6][0].map((t)=>
                    <span style={{color:'black'}}>{t[0]}</span>
                  )}
                </div>
                <div style={{width:(window.innerWidth < 480 ? '':'350px'),textAlign:'center',fontSize:(window.innerWidth < 480 ? '15px':'16px'),fontWeight:'400',lineHeight:'18px',fontFamily:customFontFam}}>
                  {sentenceTemplates[this.state.randomSentences[this.state.randomSentenceIndex]][6][1].map((t)=>
                    <span style={{color:'black'}}>{(t[0] === ', ' || t[0].includes(", do") || t[0] == '?' ? '' : ' ') + t[0]}</span>
                  )}
                </div>
              </Button>          
            </Link>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1}}>
            <Icon onClick={()=>this.randomizeSentence('+')} circular style={{margin:0,marginLeft:5,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='shuffle' />
          </div>
        </div>


          {this.state.seeMoreExamples ?
          <div style={{display:'flex',justifyContent:'center',margin:'15px'}}>
          <Button basic onClick={()=> {this.setState({seeMoreExamples: !this.state.seeMoreExamples})}}>{'See Glossary of Examples'}<Icon style={{paddingLeft:10}} name='chevron down' /></Button>
          </div>
          :
          <div>
          <div style={{display:'flex',justifyContent:'center',margin:'15px'}}>
          <Button basic onClick={()=> {this.setState({seeMoreExamples: !this.state.seeMoreExamples})}}>{'See Glossary of Examples'}<Icon style={{paddingLeft:10}} name='chevron up' /></Button>
          </div>
          <div className='hierarchymain'>
          <span className='span1'>More examples to try</span>
          </div>
          <Accordion style={{ fontSize: 16,padding:15, }} fluid styled>
            {accordionTitles.map((p, pindex) => 
              <div style={{fontFamily:customFontFam}}>
              <Accordion.Title
                style={{borderTop:(pindex !== 0 ? '1px solid #2224261a' : '0px solid #2224261a')}}
                active={activeIndexes.includes(pindex)}
                index={pindex}
                onClick={this.handleClick}
              >
              <div style={{display:(window.innerWidth < 480 ?'':'flex')}}>
                <div style={{flex:1}}>
                  <Icon name="dropdown" />
                  <span>{p.name}</span>
                </div>
                {p.examples.map((t)=>
                <div style={{flex:1,marginTop:'3px',fontSize:'14px',marginLeft:(window.innerWidth < 480 ?'40px':'0px'),fontFamily:customFontFam}}>
                <span style={{fontWeight:'300',marginRight:'10px'}}>
                {"Example:"}
                </span>
                <span style={{fontWeight:'400',marginRight:'10px'}}>
                  {t[0]}
                </span>
                <div style={{fontWeight:'400',marginLeft:'64px'}}>
                  {t[1]}
                </div>
                </div>                
                )}
              </div>
              </Accordion.Title>
                <Accordion.Content style={{paddingTop:0,}} active={activeIndexes.includes(pindex)}>
                  {p.values.map((q, qindex) =>
                    <div style={{fontVariant:'small-caps',fontWeight:'500',fontSize:'20px',color:"#000000cc",marginTop:'5px'}}>
                      <div>
                        {q.values.map((r, rindex) => 
                          <div>
                            <div style ={{textAlign:'center',borderRadius:'3px',marginTop:'10px',fontVariant:'none',fontSize:'15px',padding:'5px',color:"#00000066"}}>
                            <span style={{paddingLeft:'2px',fontWeight:'400'}}>{r}</span>
                            </div>
                            <div>
                              {Object.keys(sentenceTemplates).map((k,index)=>
                                {return sentenceTemplates[k][3] === p.key && sentenceTemplates[k][4] === q.key && sentenceTemplates[k][5] === r
                                ? 
                                (window.innerWidth < 480 ?
                                  <Link to={{pathname: '/sentencebuilder/2'}}>
                                  <Button style={{marginTop:'-1px'}} fluid basic onClick={()=> {this.props.backEndCall(sentenceTemplates[k][2],true);this.setState({activeIndexes: []})}}>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                    <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                      <div style={{textAlign:'center',fontWeight:'500',fontSize:'16px',fontFamily:customFontFam}}>
                                        {sentenceTemplates[k][6][0].map((t)=>
                                          <span style={{color:this.props.getColor(t[1],true,t[0],1),lineHeight:'18px'}}>{t[0]}</span>
                                        )}
                                      </div>
                                      <div style={{textAlign:'center',fontWeight:'400',fontSize:'14px',paddingTop:'5px',paddingRight:0,fontFamily:customFontFam}}>
                                        {sentenceTemplates[k][6][1].map((t)=>
                                          <span style={{color:this.props.getColor(t[1],true,t[0],1)}}>{(t[0] === ', ' || t[0].includes(", do") || t[0] == '?' ? '' : ' ') + t[0]}</span>
                                        )}
                                      </div>
                                    </div>
                                    <Icon style={{marginRight:'-5px',paddingLeft:'10px'}} name='chevron right' />
                                    </div>

                                  </Button> 
                                  </Link>
                                  :
                                  <Link to={{pathname: '/sentencebuilder/2'}}>
                                  <Button style={{marginTop:'-1px'}} fluid basic onClick={()=> {this.props.backEndCall(sentenceTemplates[k][2],true);this.setState({activeIndexes: []})}}>
                                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                      <span style={{flex:1,textAlign:'left',fontSize:'16px',fontFamily:customFontFam}}>
                                        {sentenceTemplates[k][6][0].map((t)=>
                                          <span style={{color:this.props.getColor(t[1],true,t[0],1)}}>{t[0]}</span>
                                        )}
                                      </span>
                                      <span style={{flex:1,textAlign:'right',paddingRight:0,fontFamily:customFontFam}}>
                                        {sentenceTemplates[k][6][1].map((t)=>
                                          <span style={{color:this.props.getColor(t[1],true,t[0],1),lineHeight:'18px',fontSize:'16px'}}>{(t[0] === ', ' || t[0].includes(", do") || t[0] == '?' ? '' : ' ') + t[0]}</span>
                                        )}
                                      </span>
                                      <Icon style={{marginRight:'-5px',paddingLeft:'10px'}} name='chevron right' />
                                    </div>
                                  </Button> 
                                  </Link>                                  
                                )
                                : null }            
                              )}
                            </div> 
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </Accordion.Content>            
              </div>
            )}
            </Accordion>
            </div>
          }




        </div>
      )
  }
}

export default withRouter(SentenceTemplates);
