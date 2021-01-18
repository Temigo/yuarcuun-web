import React, { Component } from 'react';
import { Segment, Table} from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';

class TableEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: props.entries,
      mood: props.mood,
    };
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.word !== this.props.word) {
  //     this.setState({
  //       entry: this.props.entry,
  //       word: this.props.word,
  //       displayEntryNumber: this.props.displayEntryNumber,
  //       entryNumber: this.props.entryNumber
  //     });
  //   }
  // }


  render() {
    console.log(this.state)
    let e = this.state.entries;
    // console.log(this.state)
    let subjectsEnglishTerms = []
    let optativeIdentifiers = []
    let transitiveTitles = []
    let intransitiveTitles = []
    if (this.state.mood === '[Ptcp]' || this.state.mood === '[Ind]' || this.state.mood === '[Intrg]' || this.state.mood === '[Sbrd]') {
	    subjectsEnglishTerms = [
	    "[S_3Sg]",
	    "[S_3Du]",
	    "[S_3Pl]",
	    "[S_1Sg]",
	    "[S_1Du]",
	    "[S_1Pl]",
	    "[S_2Sg]",
	    "[S_2Du]",
	    "[S_2Pl]",
	    // "[S_4Sg]",
	    // "[S_4Du]",
	    // "[S_4Pl]",
	    ]
	}
    if (this.state.mood === '[Prec]' || this.state.mood === "[Cnsq]" || this.state.mood === "[Cont]" || this.state.mood === "[Conc]" || this.state.mood === "[Cond]" || this.state.mood === "[CtmpI]" || this.state.mood === "[CtmpII]") {
	    subjectsEnglishTerms = [
	    "[S_3Sg]",
	    "[S_3Du]",
	    "[S_3Pl]",
	    "[S_1Sg]",
	    "[S_1Du]",
	    "[S_1Pl]",
	    "[S_2Sg]",
	    "[S_2Du]",
	    "[S_2Pl]",
	    "[S_4Sg]",
	    "[S_4Du]",
	    "[S_4Pl]",
	    ]
	}
    if (this.state.mood === '[Opt]') {
		subjectsEnglishTerms = [
	    "[S_3Sg]",
	    "[S_3Du]",
	    "[S_3Pl]",
	    "[S_1Sg]",
	    "[S_1Du]",
	    "[S_1Pl]",
	    "[S_2Sg]",
	    "[S_2Du]",
	    "[S_2Pl]",
	    // "[S_4Sg]",
	    // "[S_4Du]",
	    // "[S_4Pl]",
	    ]
	    optativeIdentifiers = [
	    "[PRS]",
	    "[FUT]",
	    "[PRS][NEG]",
	    "[FUT][NEG]",
	    ]
	    transitiveTitles = [
	    "TRANSITIVE (COMMAND PRESENT TENSE)",
	    "TRANSITIVE (COMMAND FUTURE TENSE)",
	    "TRANSITIVE (NEGATIVE COMMAND RIGHT NOW)",
	    "TRANSITIVE (NEGATIVE COMMAND IN THE FUTURE)",
	    ]
	    intransitiveTitles = [
	    "INTRANSITIVE (COMMAND PRESENT TENSE)",
	    "INTRANSITIVE (COMMAND FUTURE TENSE)",
	    "INTRANSITIVE (NEGATIVE COMMAND RIGHT NOW)",
	    "INTRANSITIVE (NEGATIVE COMMAND IN THE FUTURE)",
	    ]
    }
    let subjectOptativeTerms = [
	    "[S_2Sg]",
	    "[S_2Du]",
	    "[S_2Pl]",
    ]
    let subjectOptativeTermsEnglish = [
        "you (don't)",
        "you 2 (don't)",
        "you 3+ (don't)",
    ]
    let subjectsEnglishTermsSbrd = [
	    "[S_4Sg]",
	    "[S_4Du]",
	    "[S_4Pl]",
	    "[S_1Sg]",
	    "[S_1Du]",
	    "[S_1Pl]",
	    "[S_2Sg]",
	    "[S_2Du]",
	    "[S_2Pl]",
    ]
    let subjectsEnglishSbrd = [
    "he, she, it (itself)",
    "they (2) (themselves)",
    "they all (3+) (themselves)",
    "I",
    "we\xa0(2)",
    "we\xa0all\xa0(3+)",
    "you",
    "you\xa0(2)",
    "you\xa0all\xa0(3+)",
    ]
    let subjectsEnglish = [
    "he,\xa0she,\xa0it",
    "they\xa0(2)",
    "they\xa0all\xa0(3+)",
    "I",
    "we\xa0(2)",
    "we\xa0all\xa0(3+)",
    "you",
    "you\xa0(2)",
    "you\xa0all\xa0(3+)",
    // "he, she, it (itself)",
    // "they (2) (themselves)",
    // "they all (3+) (themselves)",
    ]

    let subjectsEnglishConnective = [
    "he,\xa0she,\xa0it",
    "they\xa0(2)",
    "they\xa0all\xa0(3+)",
    "I",
    "we\xa0(2)",
    "we\xa0all\xa0(3+)",
    "you",
    "you\xa0(2)",
    "you\xa0all\xa0(3+)",
    "he, she, it (itself)",
    "they (2) (themselves)",
    "they all (3+) (themselves)",
    ]


    let subjectsEnglishQuantQual = [
    "it (him or her)",
    "both of them",
    "all of them",
    "all of me",
    "both of us",
    "all of us",
    "you",
    "both of you",
    "all of you",
    "it (he or she)",
    "both of them",
    "all of them",
    ]


    // console.log(subjectsEnglish)
    // objectsEnglish = [
    // "[P_3Sg]": "him, her, it",
    // "[P_3Du]": "them (2)",
    // "[P_3Pl]": "{"them\xa0all\xa0(3+)"}",
    // "[P_1Sg]": "me",
    // "[P_1Du]": "us (2)",
    // "[P_1Pl]": "{"us\xa0all\xa0(3+)"}",
    // "[P_2Sg]": "you",
    // "[P_2Du]": "you (2)",
    // "[P_2Pl]": "{"you\xa0all\xa0(3+)"}",
    // // "[P_4Sg]": "he",
    // // "[P_4Du]": "he",
    // // "[P_4Pl]": "he",
    // ]
    let objectsEnglish3 = [
    "[P_3Sg]",
    "[P_3Du]",
    "[P_3Pl]",
    "[P_1Sg]",
    "[P_1Du]",
    "[P_1Pl]",
    "[P_2Sg]",
    "[P_2Du]",
    "[P_2Pl]",
    ]
    let objectsEnglish1 = [
    "[P_3Sg]",
    "[P_3Du]",
    "[P_3Pl]",
    "[P_2Sg]",
    "[P_2Du]",
    "[P_2Pl]",
    ]
    let objectsEnglish2 = [
    "[P_3Sg]",
    "[P_3Du]",
    "[P_3Pl]",
    "[P_1Sg]",
    "[P_1Du]",
    "[P_1Pl]",
    ]

    let objectsEnglishConnective3 = [
    "[P_3Sg]",
    "[P_3Du]",
    "[P_3Pl]",
    "[P_1Sg]",
    "[P_1Du]",
    "[P_1Pl]",
    "[P_2Sg]",
    "[P_2Du]",
    "[P_2Pl]",
    "[P_4Sg]",
    "[P_4Du]",
    "[P_4Pl]",
    ]
    let objectsEnglishConnective1 = [
    "[P_3Sg]",
    "[P_3Du]",
    "[P_3Pl]",
    "[P_2Sg]",
    "[P_2Du]",
    "[P_2Pl]",
    "[P_4Sg]",
    "[P_4Du]",
    "[P_4Pl]",
    ]
    let objectsEnglishConnective2 = [
    "[P_3Sg]",
    "[P_3Du]",
    "[P_3Pl]",
    "[P_1Sg]",
    "[P_1Du]",
    "[P_1Pl]",
    "[P_4Sg]",
    "[P_4Du]",
    "[P_4Pl]",
    ]
    let objectsEnglishConnective4 = [
    "[P_3Sg]",
    "[P_3Du]",
    "[P_3Pl]",
    "[P_1Sg]",
    "[P_1Du]",
    "[P_1Pl]",
    "[P_2Sg]",
    "[P_2Du]",
    "[P_2Pl]",
    ]

    let unpossessedNounIdentifiers = [
    "[SgUnpd]",
    "[DuUnpd]",
    "[PlUnpd]",
    ]
    let possessedNumberOfNounIdentifiers = [
    "[SgPosd]",
    "[DuPosd]",
    "[PlPosd]",
    ]
    let possessedNounIdentifiers = [
    "[3SgPoss]",
    "[3DuPoss]",
    "[3PlPoss]",
    "[1SgPoss]",
    "[1DuPoss]",
    "[1PlPoss]",
    "[2SgPoss]",
    "[2DuPoss]",
    "[2PlPoss]",
    "[4SgPoss]",
    "[4DuPoss]",
    "[4PlPoss]",
    ]
    let unpossessedNouns = [
    "Singular",
    "Dual",
    "Plural",
    ]
    let possessedNouns = [
    "his/her/its\xa0(other)",
    "their\xa0(2)\xa0(other)",
    "their\xa0(3+)\xa0(other)",
    "my",
    "our\xa0(2)",
    "our\xa0(3+)",
    "your\xa0(1)",
    "your\xa0(2)",
    "your\xa0(3+)",
    "his/her/its\xa0own",
    "their\xa0own\xa0(2)",
    "their\xa0own\xa0(3+)",
    ]

    let quantQual = [
    "[P_3Sg]",
    "[P_3Du]",
    "[P_3Pl]",
    "[S_1Sg]",
    "[S_1Du]",
    "[S_1Pl]",
    "[S_2Sg]",
    "[S_2Du]",
    "[S_2Pl]",
    "[S_4Sg]",
    "[S_4Du]",
    "[S_4Pl]",
    ]

    return (
    <div>
    {this.state.mood === "[Abs]" || this.state.mood === "[Rel]" || this.state.mood === "[Abl_Mod]" || this.state.mood === "[Loc]" || this.state.mood === "[Ter]" || this.state.mood === "[Via]" || this.state.mood === "[Equ]" ?
        <div>
        <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
            <Table.Body>
                {unpossessedNounIdentifiers.map((i,index) =>
                    <Table.Row>
                      <Table.HeaderCell style={{color:"#002477"}}>{unpossessedNouns[index]}</Table.HeaderCell>
                      <Table.Cell style={{paddingLeft:10}}>{e[i].join(",\n").replace(/>/g,'')}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
          </Table>
        </Segment>
        <div style={{fontStyle:'italic',fontWeight:'bold',marginTop:10,marginBottom:10}}>{"POSSESSED"}</div>
        <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>number of noun</Table.HeaderCell>
                <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>possessor</Table.HeaderCell>
                <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"singular (1)"}</Table.HeaderCell>
                <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"dual (2)"}</Table.HeaderCell>
                <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"plural (3+)"}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {possessedNouns.map((l,lindex) =>
              <Table.Row>
                <Table.HeaderCell style={{color:"#002477"}}>{l}</Table.HeaderCell>
                {possessedNumberOfNounIdentifiers.map((i,index) =>
                <Table.Cell style={{paddingLeft:10}}>{e[possessedNounIdentifiers[lindex]+possessedNumberOfNounIdentifiers[index]].join(",\n").replace(/>/g,'')}</Table.Cell>
                )}
              </Table.Row>
            )}

            </Table.Body>
          </Table>
        </Segment>
        </div>
    :
    <div>
    {this.state.mood === '[Opt]' ?
	(intransitiveTitles.map((k,kindex) =>
    <div>
    <div style={{fontStyle:'italic',marginTop:20,marginBottom:10,fontWeight:'bold'}}>{k}</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        	{kindex < 2 ?
            (subjectsEnglishTerms.map((i,index) =>
            <Table.Row>
              <Table.HeaderCell style={{color:"#002477"}}>{subjectsEnglish[index]}</Table.HeaderCell>
              <Table.Cell style={{paddingLeft:10}}>{e["[Intr]"+optativeIdentifiers[kindex]+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            </Table.Row>
            ))
            :
            (subjectOptativeTerms.map((i,index) =>
            <Table.Row>
              <Table.HeaderCell style={{color:"#002477"}}>{subjectOptativeTermsEnglish[index]}</Table.HeaderCell>
              <Table.Cell style={{paddingLeft:10}}>{e["[Intr]"+optativeIdentifiers[kindex]+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            </Table.Row>
            ))
        }
        </Table.Body>
      </Table>
    </Segment>
    </div>
    ))
    :
    (this.state.mood === '[Prec]' || this.state.mood === "[Cnsq]" || this.state.mood === "[Cont]" || this.state.mood === "[Conc]" || this.state.mood === "[Cond]" || this.state.mood === "[CtmpI]" || this.state.mood === "[CtmpII]" ?
	    <div>
	    <div style={{fontStyle:'italic',fontWeight:'bold',marginTop:10,marginBottom:10}}>INTRANSITIVE</div>
	    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
	        <Table.Header>
	          <Table.Row>
	            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
	            <Table.HeaderCell></Table.HeaderCell>
	          </Table.Row>
	        </Table.Header>
	        <Table.Body>
	            {subjectsEnglishTerms.map((i,index) =>
		            <Table.Row>
		              <Table.HeaderCell style={{color:"#002477"}}>{subjectsEnglishConnective[index]}</Table.HeaderCell>
		              <Table.Cell style={{paddingLeft:10}}>{e["[Intr]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
		            </Table.Row>
	            )}
	        </Table.Body>
	      </Table>
	    </Segment>
	    </div>
	:
        (this.state.mood === '%5BQuant_Qual%5D' ?
        <div>
        <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
                {quantQual.map((i,index) =>
                    <Table.Row>
                      <Table.HeaderCell style={{color:"#002477"}}>{subjectsEnglishQuantQual[index]}</Table.HeaderCell>
                      <Table.Cell style={{paddingLeft:10}}>{e[i].join(",\n").replace(/>/g,'')}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
          </Table>
        </Segment>
        </div>
        :
        <div>
        <div style={{fontStyle:'italic',fontWeight:'bold',marginTop:10,marginBottom:10}}>INTRANSITIVE</div>
        <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
                {subjectsEnglishTerms.map((i,index) =>
                    (this.state.mood === '[Sbrd]' ?
                    <Table.Row>
                      <Table.HeaderCell style={{color:"#002477"}}>{subjectsEnglishSbrd[index]}</Table.HeaderCell>
                      <Table.Cell style={{paddingLeft:10}}>{e["[Intr]"+subjectsEnglishTermsSbrd[index]].join(",\n").replace(/>/g,'')}</Table.Cell>
                    </Table.Row>
                    :
                    <Table.Row>
                      <Table.HeaderCell style={{color:"#002477"}}>{subjectsEnglish[index]}</Table.HeaderCell>
                      <Table.Cell style={{paddingLeft:10}}>{e["[Intr]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
                    </Table.Row>
                )
                )}
            </Table.Body>
          </Table>
        </Segment>
        </div>
        )
	)
}

    {this.state.mood === '[Ind]' || this.state.mood === '[Ptcp]' || this.state.mood === '[Intrg]' ?
    <div>
    <div style={{fontStyle:'italic',fontWeight:'bold',marginTop:20,marginBottom:10}}>TRANSITIVE</div>
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>3rd Person Subject</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>me</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"us\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>you</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"he,\xa0she,\xa0it"}</Table.HeaderCell>
            {objectsEnglish3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_3Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>they (2)</Table.HeaderCell>
            {objectsEnglish3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_3Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"they\xa0all\xa0(3+)"}</Table.HeaderCell>
            {objectsEnglish3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_3Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>1st Person Subject</div>
    {this.state.mood === "[Intrg]" ?
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>you</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477",width:80}}>I</Table.HeaderCell>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Sg][P_2Sg]"].join(",\n").replace(/>/g,'')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    :
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>you</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>I</Table.HeaderCell>
            {objectsEnglish1.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>we (2)</Table.HeaderCell>
            {objectsEnglish1.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"we\xa0all\xa03+"}</Table.HeaderCell>
            {objectsEnglish1.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
	}
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>2nd Person Subject</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>me</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"us\xa0all\xa0(3+)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>you</Table.HeaderCell>
            {objectsEnglish2.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_2Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>you (2)</Table.HeaderCell>
            {objectsEnglish2.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_2Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
            {objectsEnglish2.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_2Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    </div>
    :
    null
}

    {this.state.mood === '[Opt]' ?
    (optativeIdentifiers.map((k,index) =>
    <div>
    <div style={{fontStyle:'italic',fontWeight:'bold',marginTop:20,marginBottom:10}}>{transitiveTitles[index]}</div>
    {index < 2 ?
    <div>
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>3rd Person Subject</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>me</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"us\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>you</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"he,\xa0she,\xa0it"}</Table.HeaderCell>
            {objectsEnglish3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+k+"[A_3Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>they (2)</Table.HeaderCell>
            {objectsEnglish3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+k+"[A_3Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"they\xa0all\xa0(3+)"}</Table.HeaderCell>
            {objectsEnglish3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+k+"[A_3Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>1st Person Subject</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>you</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>I</Table.HeaderCell>
            {objectsEnglish1.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+k+"[A_1Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>we (2)</Table.HeaderCell>
            {objectsEnglish1.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+k+"[A_1Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"we\xa0all\xa03+"}</Table.HeaderCell>
            {objectsEnglish1.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+k+"[A_1Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    </div>
        :
        null
    }
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>2nd Person Subject</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>me</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"us\xa0all\xa0(3+)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>you</Table.HeaderCell>
            {objectsEnglish2.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+k+"[A_2Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>you (2)</Table.HeaderCell>
            {objectsEnglish2.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+k+"[A_2Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
            {objectsEnglish2.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+k+"[A_2Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    </div>
    	))
    :
    null
}


    {this.state.mood === '[Sbrd]' ?
    <div>
    <div style={{fontStyle:'italic',fontWeight:'bold',marginTop:20,marginBottom:10}}>TRANSITIVE</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>me</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"us\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>you</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477",fontStyle:'italic'}}>{"all"}</Table.HeaderCell>
            {objectsEnglish3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    </div>
    :
    null
}



    {this.state.mood === '[Prec]' || this.state.mood === "[Cnsq]" || this.state.mood === "[Cont]" || this.state.mood === "[Conc]" || this.state.mood === "[Cond]" || this.state.mood === "[CtmpI]" || this.state.mood === "[CtmpII]" ?
    <div>
    <div style={{fontStyle:'italic',fontWeight:'bold',marginTop:20,marginBottom:10}}>TRANSITIVE</div>
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>3rd Person Subject (other)</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it\xa0(other)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them\xa0(others)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)\xa0(others)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>me</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"us\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>you</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it\xa0(itself)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them\xa0(themselves)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)\xa0(themselves)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"he,\xa0she,\xa0it\xa0(other)"}</Table.HeaderCell>
            {objectsEnglishConnective3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_3Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>they (2) (others)</Table.HeaderCell>
            {objectsEnglishConnective3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_3Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"they\xa0all\xa0(3+)\xa0(others)"}</Table.HeaderCell>
            {objectsEnglishConnective3.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_3Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>1st Person Subject</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it\xa0(other)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them\xa0(others)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)\xa0(others)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>you</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it\xa0(itself)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them\xa0(themselves)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)\xa0(themselves)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>I</Table.HeaderCell>
            {objectsEnglishConnective1.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>we (2)</Table.HeaderCell>
            {objectsEnglishConnective1.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"we\xa0all\xa03+"}</Table.HeaderCell>
            {objectsEnglishConnective1.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>2nd Person Subject</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it\xa0(other)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them\xa0(others)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)\xa0(others)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>me</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"us\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it\xa0(itself)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them\xa0(themselves)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)\xa0(themselves)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>you</Table.HeaderCell>
            {objectsEnglishConnective2.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_2Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>you (2)</Table.HeaderCell>
            {objectsEnglishConnective2.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_2Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
            {objectsEnglishConnective2.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_2Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    <div style={{fontStyle:'italic',marginTop:10,marginBottom:10}}>3rd Person Reflexive Subject (itself)</div>
    <Segment style={{margin:0,overflow: 'auto'}}>
          <Table unstackable basic compact collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"her,\xa0him,\xa0it\xa0(other)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0them\xa0(others)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"them\xa0all\xa0(3+)\xa0(others)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>me</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0us"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"us\xa0all\xa0(3+)"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>you</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"the\xa0two\xa0of\xa0you"}</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10,"color":"#7b0e0e"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"her,\xa0him,\xa0it\xa0(itself)"}</Table.HeaderCell>
            {objectsEnglishConnective4.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_4Sg]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"they\xa0(2)\xa0(themselves)"}</Table.HeaderCell>
            {objectsEnglishConnective4.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_4Du]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"they\xa0all\xa0(3+)\xa0(themselves)"}</Table.HeaderCell>
            {objectsEnglishConnective4.map((i,index) =>
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_4Pl]"+i].join(",\n").replace(/>/g,'')}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    </div>
    :
    null
}
    </div>
    }
    </div>
    );
  }
}

export default withRouter(TableEntry);
