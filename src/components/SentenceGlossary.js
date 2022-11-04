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
    values:[
      {key:'simple',values:['simple','possession','oblique nouns','descriptors']},
      {key:'postbases',values:['noun-noun postbases','verb-noun postbases']}
    ]
  },
  {
    key:'verb (+ noun) statements',
    name:'Verb phrases',
    values:[
      {key:'statement sentence',values:['subject only','subject with object not marked on verb','subject and object marked on verb','verb + oblique noun']},
      {key:'postbases',values:['verb-verb postbases','noun-verb postbases']},
    ],
  },
  {
    key:'verb (+ noun) questions',
    name:'Ask a question',
    values:[
      {key:'question sentence',values:['yes-no question','wh-question']},
    ],
  },
  {
    key:'verb (+ noun) commands',
    name:'Make a command',
    values:[
      {key:'command sentence',values:['optative','subordinative','subject only','subject and object marked']}
    ],
  },
  {
    key:'verb + verb phrase sentence',
    name:'Advanced verb phrases',
    values:[
      {key:'connective verb',values:['before...','because...','whenever...','even though...','if, when in the future...','when in the past...','while...']},
      {key:'subordinative verb',values:['adjectival',]}
    ]
  }
]

class SentenceGlossary extends PureComponent {
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
    console.log(this.state)

                                  // <div style={{textAlign:'left',fontSize:'16px',paddingTop:'2px',paddingBottom:'6px',fontFamily:customFontFam}}>
                                  //   {sentenceTemplates[k][6][0].map((t)=>
                                  //     <span style={{color:this.props.getColor(t[1],true,t[0]),fontWeight:'bold'}}>{t[0]}</span>
                                  //   )}
                                  // </div>
                                  // <div style={{textAlign:'left',lineHeight:'16px',fontFamily:customFontFam}}>
                                  //   {sentenceTemplates[k][6][1].map((t)=>
                                  //     <span style={{color:this.props.getColor(t[1],true,t[0]),fontSize:'16px'}}>{t[0]+' '}</span>
                                  //   )}
                                  // </div>
    // console.log(this.state.activeIndexes)
    // console.log(sentenceTemplates)
let englishOffsets = [
// 0,
// 0,
// 0,
// 78,
// 120,
// 111,
// 101,
// 129,
// //the one woman teacher
// 47,
// 83,
// 81,
// 31,
// 83,
// 60,
// 57,
// 68,
// 34,
// 58,
// 0,
// 0,
// 7,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,      
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,      
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,      
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,      
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,      
]
    const {activeIndexes} = this.state;
    return (
      <div>

        <div className='hierarchymain'>
        <span className='span1'>Click on a random example to get started</span>
        </div>
        <div>
        	<Accordion style={{ fontSize: 16 }} fluid styled>
            {accordionTitles.map((p, pindex) => 
              <div style={{fontFamily:customFontFam}}>
              <Accordion.Title
                active={activeIndexes.includes(pindex)}
                index={pindex}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {p.name}
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
                                <Button fluid basic onClick={()=> {this.props.backEndCall(sentenceTemplates[k][2],true);this.setState({activeIndexes: []})}}>
                                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                    <span style={{textAlign:'left',fontSize:'16px',fontFamily:customFontFam}}>
                                      {sentenceTemplates[k][6][0].map((t)=>
                                        <span style={{color:this.props.getColor(t[1],true,t[0])}}>{t[0]}</span>
                                      )}
                                    </span>
                                    <span style={{textAlign:'right',paddingRight:englishOffsets[index],fontFamily:customFontFam}}>
                                      {sentenceTemplates[k][6][1].map((t)=>
                                        <span style={{color:this.props.getColor(t[1],true,t[0]),fontSize:'16px'}}>{t[0]+' '}</span>
                                      )}
                                    </span>
                                  </div>
                                </Button> 
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
        </div>
      )
  }
}

export default withRouter(SentenceGlossary);
