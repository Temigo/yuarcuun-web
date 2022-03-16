import React, { Component } from 'react';
import { Segment, List, Header, Label, Grid , Icon, Divider, Table} from 'semantic-ui-react';
import '../App.css';
import '../semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import { TagColors, WordItem } from './SearchPageHelpers.js';
import SimpleWordBuilder from './SimpleWordBuilder.js';


class YupikEntry extends Component {
  constructor(props) {
    super(props);
    console.log("YupikEntry props: ", props);
    this.state = {
      entry: props.entry,
      word: props.word,
      // postbaseTableOn: false,
      // displayEntryNumber: props.displayEntryNumber,
      // entryNumber: props.entryNumber
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) {
      this.setState({
        entry: this.props.entry,
        word: this.props.word,
        // displayEntryNumber: this.props.displayEntryNumber,
        // entryNumber: this.props.entryNumber
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

  processStyledText = (sentence) => {     
    sentence = sentence.replace("⟨","").replace("⟩","")
    let matches = sentence.match(/\⎡.*?\⎤/g)
    if (matches !== null) {
      matches.map((m) => sentence = sentence.replace(m,'<i>'+m.slice(1,-1)+'</i>'))   
      return <span dangerouslySetInnerHTML={{__html: sentence}} />    
    } else {
      return <span>{sentence}</span>
    }
  }


  processPostbaseExampleRow = (sentence) => {     
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

    let matches = sentence.match(/\`.*?(\`|\')/g)
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

  processPostbaseTableRow = (sentence) => {     
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

    let matches = sentence.match(/\‘.*?\’(?!\w)/g)
    let matches2 = sentence.match(/\(.*?\)/g)
    // console.log(matches)
    if (matches !== null) {
      matches.map((m) => sentence = '<b>'+sentence.replace(m,'<span style="font-weight:normal">'+m+'</span>'))+'</b>'
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

  unlinked = (word) => {
    return <List.Item key={word.keyString}>
      <List.Content>
        <List.Header style={{display:'flex',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'16px',paddingBottom:'4px'}}>
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
      <Segment style={{fontSize:'1em'}}>
      <Grid>

      {this.state.entry !== "" ?
      <Grid.Row>
        <Grid.Column>
        <Header as='h2'>Definition</Header>

          {this.state.entry.keySplit.map((key) => {
            return <div>
            <span style={{fontSize:'20px'}}>{key[0]}</span>
            {key[1][0] !== '' ?
              (key[1].map((dialect)=> 
                <Label horizontal>{dialect}</Label>
              ))
              :
              null
              }

              {this.state.entry.pos.map((descriptor) => 
                {return <TagColors key={descriptor} word={descriptor} />}
              )}

            </div>
          })}





          {this.state.entry.definition.map((entry,i) => {
            return <div style={{marginLeft:'10px'}}>
            <span>{i+1+'. '+entry[0]}</span>
            {entry[1][0] !== '' ?
              <Label horizontal>{entry[1]}</Label>
              :
              null
              }
            </div>;
          })}


        {this.state.entry.verbkeyString.keyString.length !== 0 ?
          <div>
            <Divider />
            {this.state.entry.verbkeyString.keySplit.map((entry,i) => {
              return <div>
              <span style={{fontSize:'20px'}}>{entry[0]}</span>
              {entry[1][0] !== '' ?
                (entry[1].map((dialect)=> 
                  <Label horizontal>{entry[1]}</Label>
                ))
                :
                null
                }
              </div>;
            })}

            <Label color='blue' horizontal key={'verb'}>{'verb'.toUpperCase()}</Label>
            


            {this.state.entry.verbkeyString.definition.map((entry,i) => {
              return <div>
              <span style={{paddingRight:'5px'}}>{i+1+'. '+entry[0]}</span>
              {entry[1][0] !== '' ?
                (entry[1].map((dialect,i)=> 
                  <Label horizontal>{entry[1][i]}</Label>
                ))
                :
                null
                }
              </div>;
            })}
          </div>
          :
          null
        }

        {this.state.entry.usagekeys.length !== 0 ?
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


        {this.state.entry.usagekeys.length !== 0 ?
          <div className='hierarchy'>
          <Header as='h2'>Usage</Header>
          {this.state.entry.usagekeys.map((entry,i) => {
            return <SimpleWordBuilder definition={this.state.entry.usagedefinitions[i]} base={this.state.word} />
          })}
          </div>
          :
          null
        }

        

        {this.state.entry.entryDialect.length !== 0 ?
          <div className='hierarchy'>
          <Header as='h2'>Dialect</Header>
          {this.state.entry.entryDialect.map((entry,i) => {
            return <div><span>{entry}</span></div>
          })}
          </div>
          :
          null
        }


        {this.state.entry.additionalInfoNearDefinition.length !== 0 ?
          <div className='hierarchy'>
          <Header as='h2'>Additional Info Near Definition</Header>
          {this.state.entry.additionalInfoNearDefinition.map((entry,i) => {
            return <div><span>{entry}</span></div>
          })}
          </div>
          :
          null
        }


        {this.state.entry.baseExamples.length !== 0 ?
          <div className='hierarchy'>
            <Header as='h2'>Example Sentences</Header>
            {this.state.entry.baseExamples.map((sentence) => {
              return (
                <List.Item style={{paddingBottom:'10px'}} key={sentence[0]}>
                  <List.Header>
                <Link to={{pathname:'/', state: {...this.props.location.state, updateSearchEntry:true, search: sentence[0], activeTabIndex:1}}}>
                  <span style={{textDecoration:'underline'}}>
                  {sentence[0]}
                  </span>
                </Link>
                  </List.Header>
                  <List.Description>{sentence[1]}</List.Description>
                </List.Item>
               );
            })
              }
          </div>
          :
          null
        }

        {this.state.entry.postbaseExamples.length !== 0 ?
          <div className='hierarchy'>
          <Header as='h2'>Postbase Examples</Header>

            {this.state.entry.postbaseExamples.map((entry,i) => {
              if (postbaseTableOn) {
                if (entry == '</table>') {
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
                  return <div style={{display:'flex'}}>
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
                if (entry == '</example>') { 
                  postbaseExampleOn = false                  
                } else {
                  return <div style={{display:'flex'}}>{this.processPostbaseExampleRow(entry)}</div> 
                }
              } else {
                if (entry == '<table>') {              
                  postbaseTableOn = true
                } else if (entry == '<example>') { 
                  postbaseExampleOn = true       
                  return <div style={{marginTop:'20px',marginBottom:'20px'}}><span style={{fontStyle:'italic'}}>{'Example Sentences'}</span></div>           
                } else {
                  return <div style={{marginTop:'20px',marginBottom:'20px'}}><span style={{fontStyle:'italic'}}>{entry}</span></div>                                                    
                }               
              }
            })}
          </div>
          :
          null
        }

        {this.state.entry.additionalInfo.length !== 0 ?
          <div className='hierarchy'>
          <Header as='h2'>Additional Info</Header>
            {this.state.entry.additionalInfo.map((entry,i) => {
              return <div><span>{'- '+entry}</span></div>
            })}
          </div>
          :
          null
        }


        {Object.keys(this.state.entry.childrenEntries).length !== 0 ?
          <div className='hierarchy'>
            <Header as='h2'>Related Entries (greaterthan)</Header>
              <List style={{marginTop:0}} divided selection>
              {Object.keys(this.state.entry.childrenEntries).map((word, index) =>
                (Object.keys(this.state.entry.childrenEntries[word]).length !== 0 ?
                  <WordItem key={word} word={this.state.entry.childrenEntries[word]} />
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
          <div className='hierarchy'>
            <Header as='h2'>Synonyms (equal)</Header>
              <List style={{marginTop:0}} divided selection>
              {Object.keys(this.state.entry.synonyms).map((word, index) =>
                (Object.keys(this.state.entry.synonyms[word]).length !== 0 ?
                  <WordItem key={word} word={this.state.entry.synonyms[word]} />
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
          <div className='hierarchy'>
            <Header as='h2'>Possibly Related (cf.)</Header>
              <List style={{marginTop:0}} divided selection>
              {Object.keys(this.state.entry.questionablyrelated).map((word, index) =>
                (Object.keys(this.state.entry.questionablyrelated[word]).length !== 0 ?
                  <WordItem key={word} word={this.state.entry.questionablyrelated[word]} />
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
          <div className='hierarchy'>
        <Header as='h2'>from language</Header>
          {this.state.entry.fromLanguage.map((entry) => {
            return <div><span>{entry}</span></div>
          })}
          </div>
          :
          null
        }



        {Object.keys(this.state.entry.etymology).length !== 0 ?
          <div className='hierarchy'>
            <Header as='h2'>Etymology (lessthan)</Header>
              <List style={{marginTop:0}} divided selection>
              {Object.keys(this.state.entry.etymology).map((key, index) =>
                (this.state.entry.etymology[key].map((word,i)=>
                    <WordItem paddingLeft={15*i} key={word} word={this.state.entry.etymology[key][i]} />
                  ))
                )}
              </List>
          </div>
          :
          null
        }


        {this.state.entry.protolessthan.length !== 0 ?
          <div className='hierarchy'>
        <Header as='h2'>proto-etymology</Header>
          {this.state.entry.protolessthan.map((entry) => {
            return <div><span>{entry}</span></div>
          })}
          </div>
          :
          null
        }

        {this.state.entry.extra.length !== 0 ?
          <div className='hierarchy'>

        <Header as='h2'>extra</Header>
          {this.state.entry.extra.map((entry) => {
            return <div><span>{entry}</span></div>
          })}
          </div>
          :
          null
        }

        </Grid.Column>
      </Grid.Row>
      :
      null
      }
      <a href="https://goo.gl/forms/be5L5cgSQmCJeVDl1" target="_blank" rel="noopener noreferrer">
        <Icon inverted name='exclamation circle' color='grey' size='large' />
        <span style={{color:'grey'}}>Report a mistake</span>
      </a>

      </Grid>
      </Segment>
    );
  }
}

export default withRouter(YupikEntry);
