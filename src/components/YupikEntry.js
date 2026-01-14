import React, { Component } from 'react';
import { Segment, List, Header, Label, Grid , Icon, Divider, Table, Transition, Image, Modal, Button, ModalContent, Popup, ListItem} from 'semantic-ui-react';
import '../App.css';
import '../semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import { API_URL } from '../App.js';
import { TagColors, WordItemLikeInup } from './SearchPageHelpers.js';
import SimpleWordBuilder from './SimpleWordBuilder.js';
import Recorder from './Recorder.js';
import SimpleWordBuilderUpdated from './SimpleWordBuilderUpdated.js';
import {DialectDictionary} from './constants/DialectDictionary.js';
import ReactGA from "react-ga4";
ReactGA.initialize("G-WDEJDCK7QT")

let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"

class YupikEntry extends Component {
  constructor(props) {
    super(props);
    console.log("YupikEntry props: ", props);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const record = urlParams.get('record') 
    this.state = {
      entry: props.entry,
      word: props.word,
      audioRetrieved: [],
      showModal:-1,
      openPopup:-1,
      audioParameterBool:record !== null || true ? true : false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) {
      this.setState({
        entry: this.props.entry,
        word: this.props.word,
      });
    }
  }
  fontUsage(word) {
    if (this.state.entry.descriptor[0] === 'noun') {
      return ['(root form)','','','','']
    }
    let text1 = ''
    let sub = ''
    let text2 = ''
    let obj = ''
    let text3 = ''

    let res = word.replace(/\^/g,"")
    var rx1 = /\[([^\]]+)]/;
    var rx2 = /<([^\]]+)>/;
    let subject = word.match(rx1);
    let object = word.match(rx2);
    if (subject !== null) {
      res = res.split(rx1);
      text1 = res[0]
      sub = res[1]
      text2 = res[2]
      res = res[2];
    }
    if (object !== null) {
      res = res.split(rx2);
      text2 = res[0]
      obj = res[1]
      text3 = res[2]
    }
    return [text1, sub, text2, obj, text3]
  }

  retrieveDialect = (dialect) => {
    console.log(dialect)
    if (dialect in DialectDictionary) {
      return DialectDictionary[dialect]
    }
  }

  retrieveDialects = (dialects) => {
    console.log(dialects)
    let dialectList = []
    dialects.map((dialect)=>{
      if (dialect in DialectDictionary) {
        dialectList.push(DialectDictionary[dialect])
      }
    })
    return dialectList.join(', ')
  }
  processStyledText = (sentence) => {     
    sentence = sentence.replace("⟨","").replace("⟩","")
    let matches = sentence.match(/⎡.*?⎤/g)
    if (matches !== null) {
      matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))   
      return <span dangerouslySetInnerHTML={{__html: sentence}} />    
    } else {
      return <span>{sentence}</span>
    }
  }


  processPostbaseExampleRow = (sentence) => {     
    sentence = sentence.replaceAll(/{(.*?)}⟨.*?⟩/g,"$1")

    let matches = sentence.match(/`.*(`|')/g)
    let matches2 = sentence.match(/\(.*?\)/g)

    console.log(matches2)
    if (matches !== null) {
      matches.map((m) => sentence = '<b>'+sentence.replace(m,'<span style="font-weight:normal">'+m.slice(1,-1)+'</span>'))+'</b>'
    }      
    if (matches2 !== null) {
      matches2.map((m) => sentence = sentence.replace(m,'<span style="font-weight:normal"><i>'+m+'</i></span>'))      
    }
    if (matches !== null || matches2 !== null) {
      return <span dangerouslySetInnerHTML={{__html: sentence}} />          
    } else {
      return <span>{sentence}</span>
    }
  }

  recordClip = (sentenceid, sentence, siteLocation, english) => {
        return <Modal
            on='click'
            open={this.state.showModal==sentenceid}
            style={{
              maxWidth:500,
              marginTop:(window.innerWidth < 480 ? 10 : 10),
            }}
            closeOnDimmerClick={false}
            onOpen={()=>{
            }}
            onClose={()=>{
              this.setState({showModal:-1})
            }}
          >
          <ModalContent>
            <Icon circular style={{margin:0,color:'#929292',cursor:'pointer',position:'relative',float:'right'}} size='large' onClick={()=>{this.setState({showModal:-1});}} name='x' />
            <Recorder english={english} sentence={sentence} siteLocation={siteLocation} />          
          </ModalContent>
          </Modal>
  }

  // recordClip = (sentenceid, sentence, siteLocation) => {
  //   console.log(sentence)
  //       return <Modal
  //           trigger={<Button circular basic style={{marginLeft:10}} onClick={()=>{this.setState({showModal:sentenceid})}} icon='microphone' />}
  //           on='click'
  //           open={this.state.showModal==sentenceid}
  //           style={{
  //             maxWidth:500,
  //             marginTop:(window.innerWidth < 480 ? 10 : 10),
  //           }}
  //           closeOnDimmerClick={false}
  //           onOpen={()=>{
  //           }}
  //           onClose={()=>{
  //             this.setState({showModal:-1,wordsList:[],searchQuery:''})
  //           }}
  //         >
  //         <ModalContent>
  //           <Icon circular style={{margin:0,color:'#B1B1B1',cursor:'pointer',position:'relative',float:'right'}} size='large' onClick={()=>{this.setState({showModal:-1})}} name='x' />
  //           <Recorder sentence={sentence} siteLocation={siteLocation} />          
  //         </ModalContent>
  //         </Modal>
  // }

  repeatAudio(audio, event, data) {
    // console.log(audio)
    if (!this.state.playingAudio) {

      let sound = new Audio(API_URL + "yugtunCrowdsourceAudio/" + audio);
      this.setState({playingAudio: true});

      sound.play()

      sound.onended=()=>{
        this.setState({playingAudio: false});
      }
    }
  }


  displayAudioMic = (audioRetrieved,sentenceid) => {
    return <Popup
            content={
              <List style={{fontFamily:customFontFam}} divided verticalAlign='middle'>
                {audioRetrieved.map((k)=>{
                  return <ListItem style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <Icon circular onClick={()=>this.repeatAudio(k['filename'])} style={{color:'#106181',opacity:0.9,fontSize:'20px', margin:3, cursor:'pointer'}} name='volume up' />
                          <div style={{display:'flex',flexDirection:'column',marginLeft:10,padding:'5px 0px'}}>
                            {k['gender'] != 'do_not_wish_to_say' ?
                              <div>{k['gender'].replaceAll('_',' / ')}</div>
                              :
                              null
                            }
                            {k['age'] != 'do_not_wish_to_say' ?
                              <div>{k['age']}</div>
                              :
                              null
                            }
                            {k['village'] != 'do_not_wish_to_say' ?
                              <div>{k['village']}</div>
                              :
                              null
                            }
                            {k['gender'] == 'do_not_wish_to_say' && k['age'] == 'do_not_wish_to_say' && k['village'] == 'do_not_wish_to_say' ?
                              <div>{'Anonymous Clip'}</div>
                              :
                              null
                            }                            
                          </div>
                        </ListItem>
                })}
                <ListItem style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                  <Button circular basic style={{opacity:0.9,marginLeft:5,fontSize:'14px'}} onClick={()=>{this.setState({openPopup:-1},()=>{this.setState({showModal:sentenceid})})}} icon='microphone' />
                  <div style={{marginLeft:10,padding:'5px 0px'}}>Submit a Recording for Yugtun.com</div>
                </ListItem>
              </List>
              }
            on='click'
            open={this.state.openPopup==sentenceid}
            onClose={()=>this.setState({openPopup:-1})}
            style={{padding:8}}
            position='bottom center'
            trigger={<Button onClick={()=>{this.setState({openPopup:sentenceid})}} style={{paddingRight:15, marginLeft:10,marginTop:1}} circular basic icon>{audioRetrieved.length == 0 ? <Icon style={{color:'#929292'}} name='microphone' />:<Icon style={{color:'#106181',fontSize:'16px'}} name='volume up' />}<Icon style={{color:'#d2d2d2',paddingLeft:'6px',fontSize:'11px'}} name='chevron down' /> </Button>}
          />
  }

  displayIfClipExists = (sentence) => {
    // console.log(sentence)
    // axios
    //   .get(API_URL + "/yugtunCrowdsourceAudioLookup/" + sentence)
    //   .then(response => {
    //     // console.log(response.data);
    //     this.setState({audioRetrieved:response.data})
    //   });
  }


  processPostbaseTableRowHTML = (sentence) => {
    let matchesNormal = sentence.match(/‘.*?’(?!\w)/g)
    let matchesItalics = sentence.match(/\s\(.*?\)/g)

    if (matchesNormal !== null || matchesItalics !== null) {
      if (matchesNormal !== null) {
        matchesNormal.map((m) => sentence = '<b style="color:black">'+sentence.replaceAll(m,'<span style="font-weight:normal;color:#000000b3">'+m+'</span>')+'</b>')
      }
      if (matchesItalics !== null) {
        matchesItalics.map((m) => sentence = sentence.replaceAll(m,'<span style="font-weight:normal"><i>'+m+'</i></span>'))      
      }
      return sentence
    } else {
      return sentence
    }
  }

  processPostbaseTableRow = (sentence) => {     
    let matchesBnL = sentence.match(/\{(.*?)\}⟨(.*?)⟩/g)
    let splitSentence = []
    let sentenceBank = []
    let restOfSentence = sentence
    if (matchesBnL !== null) {
        let before = ''
        let after = ''
        matchesBnL.map((m) => {
          before = restOfSentence.slice(0, restOfSentence.indexOf(m));
          after = restOfSentence.slice(restOfSentence.indexOf(m)+m.length + 1);
          sentenceBank.push(before)
          restOfSentence = after
        })
        sentenceBank.push(after)
        splitSentence = sentence.split(matchesBnL[0])
        return <span>
        <span dangerouslySetInnerHTML={{__html: this.processPostbaseTableRowHTML(sentenceBank[0])}} />
          {matchesBnL.map((k,index)=><span>
          <Link style={{color:'#306190'}} to={{pathname: k.match(/⟨.*?⟩/g)[0].slice(1,-1)}} onClick={()=>{this.setState({key:k.match(/⟨.*?⟩/g)[0].slice(1,-1), from:this.props.location.pathname})}}><b>{k.match(/\{.*?\}/g)[0].slice(1,-1)}</b></Link>
          {' '}
          <span dangerouslySetInnerHTML={{__html: this.processPostbaseTableRowHTML(sentenceBank[index+1])}} />      
          </span>       
        )}
        </span>
    } else {
      return <span dangerouslySetInnerHTML={{__html: this.processPostbaseTableRowHTML(sentence)}} />    
    }
  }

  processAdditionalInformationRow = (sentence) => {     
    let matchesBnL = sentence.match(/⎡(.*?)⎤⟨(.*?)⟩/g)
    let splitSentence = []
    let sentenceBank = []
    let restOfSentence = sentence
    if (matchesBnL !== null) {
        let before = ''
        let after = ''
        matchesBnL.map((m) => {
          before = restOfSentence.slice(0, restOfSentence.indexOf(m));
          after = restOfSentence.slice(restOfSentence.indexOf(m)+m.length + 1);
          sentenceBank.push(before)
          restOfSentence = after
        })
        sentenceBank.push(after)
        splitSentence = sentence.split(matchesBnL[0])
        return <span>
          <span dangerouslySetInnerHTML={{__html: this.processPostbaseTableRowHTML(sentenceBank[0])}} />
          {matchesBnL.map((k,index)=><span>
          <Link style={{color:'#306190'}} to={{pathname: k.match(/⟨.*?⟩/g)[0].slice(1,-1)}} onClick={()=>{this.setState({key:k.match(/⟨.*?⟩/g)[0].slice(1,-1), from:this.props.location.pathname})}}>{k.match(/⎡.*?⎤/g)[0].slice(1,-1)}</Link>
          {' '}
          <span dangerouslySetInnerHTML={{__html: this.processPostbaseTableRowHTML(sentenceBank[index+1])}} />      
          </span>       
        )}
        </span>
    } else {
      return <span dangerouslySetInnerHTML={{__html: this.processPostbaseTableRowHTML(sentence)}} />    
    }
  }

  // processPostbaseTableRowHTML = (sentence) => {     
    // sentence = sentence.trim()
    // let words = sentence.trim().split(' ')
    // console.log(words)
    // if (words.length > 2 && words[1] === 'or') {
    //    return <div>
    //       <span style={{fontWeight:'bold',paddingRight:'5px'}}>{words.slice(0,3)}</span>
    //       <span>{words.slice(3,).join(' ')}</span>
    //     </div>     
    // } else {
    //  return <div>
    //     <span style={{fontWeight:'bold',paddingRight:'5px'}}>{words[0]}</span>
    //     <span>{words.slice(1,).join(' ')}</span>
    //   </div>
    // }

  //   let matches = sentence.match(/‘.*?’(?!\w)/g)
  //   let matches2 = sentence.match(/\s\(.*?\)/g)
  //   console.log(matches)
  //   if (matches !== null) {
  //     matches.map((m) => sentence = '<b style="color:black">'+sentence.replace(m,'<span style="font-weight:normal;color:#000000b3">'+m+'</span>'))+'</b>'
  //   }
  //   if (matches2 !== null) {
  //     matches2.map((m) => sentence = sentence.replace(m,'<span style="font-weight:normal"><i>'+m+'</i></span>'))      
  //   }
  //   if (matches !== null || matches2 !== null) {
  //     return <span dangerouslySetInnerHTML={{__html: sentence}} />          
  //   } else {
  //     return <span>{sentence}</span>
  //   }
  // }

  unlinked = (word) => {
    return <List.Item key={word.keyString} style={{marginLeft:'15px',marginTop:'12px',marginBottom:'12px'}}>
      <List.Content>
        <List.Header style={{display:'flex',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'18px',fontWeight:400,paddingBottom:'4px'}}>
          {word}
          <span style={{ 'marginLeft': '15px'}}>  
            <Label size='mini'>UNLINKED</Label>
          </span>
        </List.Header>
      </List.Content>
    </List.Item>    
  }

  render() {
    console.log(this.state)
    let postbaseTableOn = false
    let postbaseExampleOn = false
    return (

    <div style={{padding: 0, margin:0, fontFamily:customFontFam}}>
      <Transition visible={this.state.loaded} animation='fade' duration={300}>
        <Grid textAlign='center'>

        {this.state.entry !== "" ?
        <Grid.Row  style={{height:40,paddingBottom:0}}>
          <Grid.Column style={{ maxWidth: 800, padding: 0, margin:0 }} textAlign='left'>

            {this.state.from === '/' ?
              <Link to={{pathname: "/", state: { history:this.state.history }}} >
                <Icon circular style={{margin:0,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}}  name='chevron left' />
              </Link>
              :
              <Icon onClick={()=>{this.props.history.goBack()}} circular style={{margin:0,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='chevron left' />
            }
            <Link to={{pathname: "/"}}>
            <Icon circular style={{margin:0,marginLeft:5,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='search' />
            </Link>     

            <div style={{fontSize:'25px',marginTop:'20px',fontFamily:customFontFam}}>
            {this.state.entry.keySplit.map((key,keyid) => {
              return <div style={{display:'flex',alignItems:'center',flexDirection:'row'}}>
              <span style={{fontWeight:'500',marginRight:('keySplitAudio' in this.state.entry ? '0px':'10px')}}>{key[0]}</span>
              {'keySplitAudio' in this.state.entry ?
                <span style={{marginRight:3}}>
                  {this.state.audioParameterBool ?
                    this.displayAudioMic(this.state.entry.keySplitAudio[keyid],'a'+keyid.toString())
                    :
                    null
                  }
                  {this.state.showModal != -1 ?
                    this.recordClip('a'+keyid.toString(),key[0],'entryKeySplit',this.state.entry.definitionString)
                    :
                    null
                  }
                </span>
                :
                null
              }
              {key[1][0] !== '' ?
                (key[1].map((dialect)=> 
                  <Label size='mini' style={{marginLeft:'5px'}}>{dialect}</Label>
                ))
                :
                null
                }
              {this.state.entry.pos.map((descriptor) => 
                {return <span style={{marginLeft:'5px'}}><TagColors key={descriptor} word={descriptor} padding={3} /></span>}
              )}
              </div>
            })}
            </div>

          <div style={{border:'1px solid #E3E3E3',marginTop:'10px'}}>

          <div className='hierarchymain'>
          <span className='span1'>Definition</span>
          </div>

            {this.state.entry.definition.map((entry,i) => {
              return <div style={{display:'flex',flexDirection:'row',alignItems:'center', marginTop:'8px',marginBottom:'8px'}}>
              <div style={{marginLeft:'10px',color:'#000000',fontSize:'18px','fontWeight':'300'}}>{'○'}</div>
              <div style={{marginLeft:'20px',marginRight:'15px',color:'#000000',fontSize:'18px',lineHeight:'27px'}}>{this.processStyledText(entry[0])}</div>
              {entry[1][0] !== '' ?
                (entry[1].map((dialect)=> 
                  <Label style={{height:'20px',fontSize:'10px'}} horizontal>{dialect}</Label>
                ))
                :
                null
                }
              </div>;
            })}

          </div>


          {this.state.entry.verbkeyString.keyString.length !== 0  && this.state.entry.usage.length !== 0 ?
            <div style={{border:'1px solid #E3E3E3',marginTop:'10px'}}>
            {this.state.entry.usage.map((entry,i) => {
              if (entry[3].constructor === Array) {
                return entry[3].map((k,index) => <span>
                  {index === 0 ? 
                    <div className='hierarchymain'>
                      <span className='span1'>Usage</span>
                    </div>
                    :
                    null
                  }
                  <SimpleWordBuilderUpdated usageStartingAudio={this.state.entry.usageStartingAudio[i]} entry={entry} index={i} definitionIndex={index} word={this.state.word} />
                  {entry[3].length-1 != index && k[2].length !== 0 ? <Divider style={{margin:0}}/> : null}
                  </span>
                  )
              }
            })}
            </div>
            :
            (this.state.entry.usage.length !== 0 ? 
              <div style={{border:'1px solid #E3E3E3',marginTop:'10px'}}>
              {this.state.entry.usage.map((entry,i) => {
                if (entry[3].constructor === Array) {
                  return entry[3].map((k,index) => <span>
                    {index === 0 ? 
                      <div className='hierarchymain'>
                        <span className='span1'>Usage</span>
                      </div>
                      :
                      null
                    }
                    <SimpleWordBuilderUpdated usageStartingAudio={this.state.entry.usageStartingAudio[i]} entry={entry} index={i} definitionIndex={index} word={this.state.word} />
                      {entry[3].length-1 != index && k[2].length !== 0 ? <Divider style={{margin:0}}/> : null}
                    </span>
                    )
                } else {
                  return <span>
                  {i === 0 ? 
                    <div className='hierarchymain'>
                      <span className='span1'>Usage</span>
                    </div>
                    :
                    null
                  }
                  <SimpleWordBuilderUpdated usageStartingAudio={this.state.entry.usageStartingAudio[i]} entry={entry} index={i} word={this.state.word} /> 
                  {this.state.entry.usage.length-1 != i ? <Divider style={{margin:0}}/> : null}
                  </span>
                }
              })}
              </div>
              :
              null
            )
          }




          {this.state.entry.verbkeyString.keyString.length !== 0 ?
            <div>

            <div style={{fontSize:'25px',marginTop:'20px',fontFamily:customFontFam}}>
            {this.state.entry.verbkeyString.keySplit.map((key) => {
              return <div style={{display:'flex',alignItems:'center',flexDirection:'row'}}>
              <span style={{fontWeight:'500',marginRight:'15px'}}>{key[0]}</span>
              {key[1][0] !== '' ?
                (key[1].map((dialect)=> 
                  <Label horizontal>{dialect}</Label>
                ))
                :
                null
                }
              {this.state.entry.verbkeyString.pos.map((descriptor) =>  
                {return <TagColors key={descriptor} word={descriptor} padding={3} />}
              )}
              </div>
            })}
            </div>

            <div style={{border:'1px solid #E3E3E3',marginTop:'10px'}}>

            <div className='hierarchymain'>
            <span className='span1'>Definition</span>
            </div>

            {this.state.entry.verbkeyString.definition.map((entry,i) => {
              return <div style={{marginTop:'8px',marginBottom:'8px'}}>
              <span style={{marginLeft:'10px',color:'#777777',fontSize:'18px','fontWeight':'300'}}>{'○'}</span>
              <span style={{marginLeft:'20px',color:'#000000',fontSize:'18px',lineHeight:'24px',marginRight:'15px'}}>{this.processStyledText(entry[0])}</span>
              {entry[1][0] !== '' ?
                (entry[1].map((dialect)=> 
                  <Label style={{fontSize:'10px'}} horizontal>{dialect}</Label>
                ))
                :
                null
                }
              </div>;
            })}
            </div>

            {this.state.entry.usage.length !== 0 ?
              <div style={{border:'1px solid #E3E3E3',marginTop:'10px'}}>
                <div className='hierarchymain'>
                  <span className='span1'>Usage</span>
                </div>
              {this.state.entry.usage.map((entry,i) => {
                if (entry[3].constructor !== Array) {
                  return <span>
                  <SimpleWordBuilderUpdated usageStartingAudio={this.state.entry.usageStartingAudio[i]} entry={entry} index={i} word={this.state.word} /> 
                  {this.state.entry.usage.length-1 != i ? <Divider style={{margin:0}} /> : null}
                  </span>
                }
              })}
              </div>
              :
              null
            }



            </div>
            :
            null
          }

          <div style={{border:'1px solid #E3E3E3',marginTop:'10px'}}>

  {/*        {this.state.entry.usagekeys.length !== 0 ?
            <div className='hierarchy'>
            <Header as='h2'>Usage</Header>
            {this.state.entry.usagekeys.map((entry,i) => {
              return <div>
              <div style={{marginRight:'10px'}}>
                {this.state.entry.usagekeys[i].map((e,k) => {
                  return e
                })}
              </div>
              <div style={{marginRight:'10px'}}>
                {this.state.entry.usagedefinitions[i].map((e,k) => {
                  return e
                })}
              </div>
              </div>
            })}
            </div>
            :
            null
          }
  */}


{/*
          {this.state.entry.usage.length !== 0 ?
            <div>
            {this.state.entry.usage.map((entry,i) => {
              console.log(entry,i)
              if (entry[3].constructor === Array) {
                return entry[3].map((k,index) => <span>
                  {index === 0 ? 
                    <div className='hierarchymain'>
                    <span className='span1'>Usage</span>
                    </div>
                    :
                    null
                  }
                  <SimpleWordBuilderUpdated entry={entry} index={i} definitionIndex={index} word={this.state.word} />
                  {this.state.entry.usage.length-1 != i ? <Divider /> : null}
                  </span>
                  )
              } else {
                return <span>
                <SimpleWordBuilderUpdated entry={entry} index={i} word={this.state.word} /> 
                {this.state.entry.usage.length-1 != i ? <Divider /> : null}
                </span>
              }
            })}
            </div>
            :
            null
          }
*/}

          {this.state.entry.entryDialect.length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Dialect</span>
              </div>

              <div style={{padding:15,fontSize:'16px',color:'#000000b3'}}><span>{this.retrieveDialects(this.state.entry.entryDialect)}</span></div>

            </div>
            :
            null
          }


          {this.state.entry.additionalInfoNearDefinition.length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Additional Information</span>
              </div>
            {this.state.entry.additionalInfoNearDefinition.map((entry,i) => {
              return <div style={{padding:15,fontSize:'16px',color:'#000000b3'}}><span>{entry}</span></div>
            })}
            </div>
            :
            null
          }



          {this.state.entry.baseExamples.length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Example Sentences</span>
              </div>
              <div style={{paddingTop:'5px',paddingBottom:'5px'}}>
              {this.state.entry.baseExamples.map((sentence, sentenceid) => {
                return (
                  <List.Item style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'15px',paddingRight:'10px'}} key={sentence[0]}>
                    <List.Header style={{paddingBottom:'7px'}}>
                      <Link to={{pathname:'/', state: {...this.props.location.state, updateSearchEntry:true, search: sentence[0], newSearchList: sentence[0].split(" "), activeTabIndex:1}}}>
                        <span style={{fontSize:'18px',color:'black',fontWeight:'400',borderBottom:'1px solid #858585',paddingBottom:'2px',fontWeight:'400',}}>
                        {sentence[0]}
                        </span>
                      </Link>
                            {this.state.audioParameterBool ?
                              this.displayAudioMic(this.state.entry.baseExamplesAudio[sentenceid],'b'+sentenceid.toString())
                              :
                              null
                            }
                            {this.state.showModal != -1 ?
                              this.recordClip('b'+sentenceid.toString(),sentence[0],'exampleSentence',sentence[1])
                              :
                              null
                            }


                    </List.Header>
                    <List.Description style={{fontSize:'16px',fontWeight:'400',color:'#000000b3'}}>{sentence[1]}</List.Description>
                  </List.Item>
                 );
              })
                }
              </div>
            </div>
            :
            null
          }

          {this.state.entry.postbaseExamples.length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Postbase Examples</span>
              </div>

              {this.state.entry.postbaseExamples.map((entry,i) => {
                if (postbaseTableOn) {
                  if (entry === '</table>') {
                    postbaseTableOn = false
                  } else {
                    let items = []
                    if (entry.split("\"").length > 1) {
                      entry = entry.replace("\",\"","@@").replace(",\"","@@").replace("\",","@@").replaceAll("\"","")
                      items = entry.split('@@') ;                 
                    } else {
                      items = entry.split(',')
                    }

                    let rightside = items[1].split(';');
                    return <div style={{margin:15,color:'#000000cc',display:'flex'}}>
                            <div style={{flex:1}}>
                              {this.processPostbaseTableRow(items[0])}
                            </div>
                            <div style={{flex:1}}>
                              {rightside.map((k)=>{
                                return <div>{this.processPostbaseTableRow(k)}</div>
                              })}
                            </div>
                          </div> 
                  }
                } else if (postbaseExampleOn) {
                  if (entry === '</example>') { 
                    postbaseExampleOn = false                  
                  } else {
                    return <div style={{display:'flex',marginBottom:'5px',marginLeft:'15px',marginRight:'15px'}}>{this.processPostbaseExampleRow(entry)}</div> 
                  }
                } else {
                  if (entry === '<table>') {              
                    postbaseTableOn = true
                  } else if (entry === '<example>') { 
                    postbaseExampleOn = true       
                    return <div style={{marginTop:'20px',marginBottom:'20px',marginLeft:'15px',marginRight:'15px'}}><span style={{fontStyle:'italic'}}>{'Example Sentences'}</span></div>           
                  } else {
                    return <div style={{marginTop:'20px',marginBottom:'20px',marginLeft:'15px',marginRight:'15px'}}><span style={{fontStyle:'italic'}}>{this.processAdditionalInformationRow(entry)}</span></div>                                                    
                  }               
                }
              })}
              <div style={{marginBottom:'20px'}}></div>
            </div>
            :
            null
          }

          {this.state.entry.additionalInfo.length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Additional Information</span>
              </div>
              <div style={{padding:5}}>
              {this.state.entry.additionalInfo.map((entry,i) => {
                return <div style={{padding:10,fontSize:'16px',color:'#000000b3'}}><span>- {this.processAdditionalInformationRow(entry)}</span></div>
              })}
              </div>
            </div>
            :
            null
          }


          {Object.keys(this.state.entry.childrenEntries).length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Related Entries</span>
              </div>
                <List style={{marginTop:'5px',marginBottom:'5px'}}>
                {Object.keys(this.state.entry.childrenEntries).map((word, index) =>
                  (Object.keys(this.state.entry.childrenEntries[word]).length !== 0 ?
                    <WordItemLikeInup paddingLeft={15} key={word} word={this.state.entry.childrenEntries[word]} />
                    :
                    this.unlinked(word)               
                  )
                )}
                </List>
            </div>
            :
            null
          }


          {Object.keys(this.state.entry.synonyms).length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Synonyms</span>
              </div>
                <List style={{marginTop:'5px',marginBottom:'5px'}}>
                {Object.keys(this.state.entry.synonyms).map((word, index) =>
                  (Object.keys(this.state.entry.synonyms[word]).length !== 0 ?
                    <WordItemLikeInup paddingLeft={15} key={word} word={this.state.entry.synonyms[word]} />
                    :
                    this.unlinked(word)
                  )
                  )}
                </List>
            </div>
            :
            null
          }

          {Object.keys(this.state.entry.questionablyrelated).length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Possibly Related</span>
              </div>
                <List style={{marginTop:'5px',marginBottom:'5px'}}>
                {Object.keys(this.state.entry.questionablyrelated).map((word, index) =>
                  (Object.keys(this.state.entry.questionablyrelated[word]).length !== 0 ?
                    <WordItemLikeInup paddingLeft={15} key={word} word={this.state.entry.questionablyrelated[word]} />
                    :
                    this.unlinked(word)               
                  )
                  )}
                </List>
            </div>
            :
            null
          }





          {this.state.entry.fromLanguage.length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Language Origin</span>
              </div>
            {this.state.entry.fromLanguage.map((entry) => {
              return <div style={{padding:15,fontSize:'16px',color:'#000000b3'}}><span>{entry}</span></div>
            })}
            </div>
            :
            null
          }



          {Object.keys(this.state.entry.etymology).length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Etymology</span>
              </div>
                <List style={{marginTop:'5px',marginBottom:'5px'}}>
                {Object.keys(this.state.entry.etymology).map((key, index) =>
                  (this.state.entry.etymology[key].map((word,i)=>
                      <WordItemLikeInup paddingLeft={15*i+15} key={word} word={this.state.entry.etymology[key][i]} />
                    ))
                  )}
                </List>
            </div>
            :
            null
          }


          {this.state.entry.protolessthan.length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Proto-Etymology</span>
              </div>
            {this.state.entry.protolessthan.map((entry) => {
              return <div style={{padding:15,fontSize:'16px',color:'#000000b3'}}><span>{entry}</span></div>
            })}
            </div>
            :
            null
          }

          {this.state.entry.extra.length !== 0 ?
            <div>
              <div className='hierarchymain'>
              <span className='span1'>Extra Information</span>
              </div>
            {this.state.entry.extra.map((entry) => {
              return <div style={{padding:15,fontSize:'16px',color:'#000000b3'}}><span>{entry}</span></div>
            })}
            </div>
            :
            null
          }

          </div>



          <div>
          <div style={{margin:'10px'}}>
            <a href="https://goo.gl/forms/be5L5cgSQmCJeVDl1" target="_blank" rel="noopener noreferrer">
              <Icon style={{marginBottom:'2px'}} inverted name='exclamation circle' color='grey' size='large' />
              <span style={{color:'grey'}}>Report a mistake</span>
            </a>
          </div>
          <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',height:60,paddingBottom:16,paddingTop:10}}>
            <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
            <Image style={{height:'30px',opacity:0.7}} src={'https://yupikmodulesweb.s3.amazonaws.com/static/exercise1/ellanguaq1.svg'}/>
          </div>
          </div>

          </Grid.Column>
        </Grid.Row>
        :
        null
        }


        </Grid>
      </Transition>
    </div>
    );
  }
}

export default withRouter(YupikEntry);
