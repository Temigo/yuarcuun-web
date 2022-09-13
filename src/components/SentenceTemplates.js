import React, { PureComponent } from 'react';
import { Segment, Table, Accordion, Icon, Button} from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import { sentenceTemplates } from './constants/sentence_templates.js'


let accordionTitles = [
  'Noun Phrases',
  'Verb (+Noun)'
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

  render() {
    console.log(this.state)
    console.log(this.state.activeIndexes)
    const {activeIndexes} = this.state;
    return (
        <Accordion style={{ fontSize: 16 }} fluid styled>
          {accordionTitles.map((p, pindex) => 
            <div>
              <Accordion.Title
                active={activeIndexes.includes(pindex)}
                index={pindex}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {p}
              </Accordion.Title>
              <Accordion.Content active={activeIndexes.includes(pindex)}>
                {Object.keys(sentenceTemplates).map((k)=>
                  <Button basic onClick={()=>this.props.backEndCall(sentenceTemplates[k][2],true)}>
                    <div>{sentenceTemplates[k][0]}</div>
                    <div>{sentenceTemplates[k][1]}</div>
                  </Button>             
                )}                
              </Accordion.Content>
            </div>
          )}
        </Accordion>
      )
  }
}

export default withRouter(SentenceTemplates);
