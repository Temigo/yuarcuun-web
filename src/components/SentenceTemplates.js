import React, { PureComponent } from 'react';
import { Container, Segment, Table, Accordion, Icon, Button} from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import { sentenceTemplates } from './constants/sentence_templates.js'
import { colorsList } from './constants/newconstants.js'

let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"

let accordionTitles = [
  {
    key:'noun phrase only',
    values:[
      {key:'simple',values:['simple','possession','oblique nouns','descriptors']},
      {key:'postbases',values:['noun-noun postbases','verb-noun postbases']}
    ]
  },
  {
    key:'verb (+ noun) statements',
    values:[
      {key:'statement sentence',values:['subject only','subject with object not marked on verb','subject and object marked on verb','verb + oblique noun']},
      {key:'postbases',values:['verb-verb postbases','noun-verb postbases']},
    ],
  },
  {
    key:'verb (+ noun) questions',
    values:[
      {key:'question sentence',values:['yes-no question','wh-question']},
    ],
  },
  {
    key:'verb (+ noun) commands',
    values:[
      {key:'command sentence',values:['optative','subordinative','subject only','subject and object marked']}
    ],
  },
  {
    key:'verb + verb phrase sentence',
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

  // getColor = (pos) => {
  //   return colorsList[0][pos]  
  // }

  render() {
    // console.log(this.state)
    // console.log(this.state.activeIndexes)
    // console.log(sentenceTemplates)
    const {activeIndexes} = this.state;
    return (
        <Accordion style={{ fontSize: 16 }} fluid styled>
          {accordionTitles.map((p, pindex) => 
            <div style={{ fontFamily:customFontFam}}>
              <Accordion.Title
                active={activeIndexes.includes(pindex)}
                index={pindex}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {p.key}
              </Accordion.Title>
              <Accordion.Content style={{paddingTop:0,}} active={activeIndexes.includes(pindex)}>
                {p.values.map((q, qindex) =>
                  <div style={{fontVariant:'small-caps',fontWeight:'500',fontSize:'20px',color:"#000000cc",marginTop:'5px'}}>
                    {q.key}
                    <div>
                      {q.values.map((r, rindex) => 
                        <div>
                          <div style ={{textAlign:'center',borderRadius:'3px',marginTop:'10px',fontVariant:'none',fontSize:'15px',padding:'5px',color:"#000000bc",backgroundColor:"#F0F0F0"}}>
                          <span style={{paddingLeft:'2px',fontWeight:'400'}}>{r}</span>
                          </div>
                          <div>
                            {Object.keys(sentenceTemplates).map((k)=>
                              {return sentenceTemplates[k][3] === p.key && sentenceTemplates[k][4] === q.key && sentenceTemplates[k][5] === r
                              ? 
                                <Button fluid basic onClick={()=> {this.props.backEndCall(sentenceTemplates[k][2],true);this.setState({activeIndexes: []})}}>
                                  <div style={{textAlign:'left',fontSize:'16px',paddingTop:'2px',paddingBottom:'6px',fontFamily:customFontFam}}>
                                    {sentenceTemplates[k][6][0].map((t)=>
                                      <span style={{color:this.props.getColor(t[1],true,t[0])}}>{t[0]}</span>
                                    )}
                                  </div>
                                  <div style={{textAlign:'left',lineHeight:'16px',fontFamily:customFontFam}}>
                                    {sentenceTemplates[k][6][1].map((t)=>
                                      <span style={{color:this.props.getColor(t[1],true,t[0]),fontWeight:'200',fontSize:'16px'}}>{t[0]+' '}</span>
                                    )}
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
      )
  }
}

export default withRouter(SentenceTemplates);
