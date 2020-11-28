import React, { Component } from 'react';
import { Segment, Table} from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';

class TableEntry1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: props.entries,
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
    let e = this.state.entries;
    let subjectsEnglishTerms = [
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
    console.log(subjectsEnglish)
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
    return (
    <div>
    <div style={{fontStyle:'italic'}}>INTRANSITIVE</div>
    <Segment style={{overflow: 'auto'}}>
      <Table unstackable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{textDecoration:'underline',color:"#002477"}}>Subject</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {subjectsEnglishTerms.map((i,index) => 
            <Table.Row>
              <Table.HeaderCell style={{color:"#002477"}}>{subjectsEnglish[index]}</Table.HeaderCell>
              <Table.Cell style={{paddingLeft:10}}>{e["[Intr]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            </Table.Row>
            )}
        </Table.Body>
      </Table>
    </Segment>

    <div style={{fontStyle:'italic'}}>TRANSITIVE</div>
    <Segment style={{overflow: 'auto'}}>
      <Table unstackable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
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
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_3Sg]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>they (2)</Table.HeaderCell>
            {objectsEnglish3.map((i,index) => 
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_3Du]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"they\xa0all\xa0(3+)"}</Table.HeaderCell>
            {objectsEnglish3.map((i,index) => 
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_3Pl]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    <Segment style={{overflow: 'auto'}}>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
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
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Sg]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>we (2)</Table.HeaderCell>
            {objectsEnglish1.map((i,index) => 
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Du]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"we\xa0all\xa03+"}</Table.HeaderCell>
            {objectsEnglish1.map((i,index) => 
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_1Pl]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    <Segment style={{overflow: 'auto'}}>
      <Table unstackable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell style={{textDecoration:'underline',paddingLeft:10,"color":"#7b0e0e"}}>Object</Table.HeaderCell>
            <Table.HeaderCell style={{paddingLeft:10}}></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
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
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_2Sg]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>you (2)</Table.HeaderCell>
            {objectsEnglish2.map((i,index) => 
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_2Du]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            )}
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell style={{color:"#002477"}}>{"you\xa0all\xa0(3+)"}</Table.HeaderCell>
            {objectsEnglish2.map((i,index) => 
            <Table.Cell style={{paddingLeft:10}}>{e["[Trns][A_2Pl]"+i].join(",\n").replaceAll(">","")}</Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
    </div>
    );
  }
}

export default withRouter(TableEntry1);
