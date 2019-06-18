import React, { Component } from 'react';
import '../../semantic/dist/semantic.min.css';
import { Button, Card, Accordion, Icon} from 'semantic-ui-react';

class YupikNounEndingMoods extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <Card color='pink'>
        <Card.Content>
          <Card.Header>
            Ending moods
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Group>
            <Card><Button onClick={this.props.setMood.bind(this,'absolutive')} active={this.props.mood==='absolutive'}>absolutive (default)</Button></Card>
            {this.props.mood==='absolutive' ?
              <Accordion>
                Uses:
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  subject of an intransitive verb
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <p>
                    if used along with an intransitive form of a verb (such as pissurtuq, ‘[it] is hunting’), this form of the noun suggests that it is the subject of the verb, or the hunter.
                  </p>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  object of a transitive verb
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                  <p>
                  if used along with a transitive form of a verb (such as pissuraa, ‘[it] is hunting [it]’), this form of the noun reveals that it is the object of the verb, or the thing being hunted.
                  </p>
                </Accordion.Content>
              </Accordion>
            :
            ''
            }
            <Card><Button onClick={this.props.setMood.bind(this,'relative')} active={this.props.mood==='relative'}>relative</Button></Card>
            {this.props.mood==='relative' ?
              <Accordion>
                Uses:
                <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  subject of a transitive verb
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <p>
                  if used along with a transitive form of a verb (such as pissuraa, ‘[it] is hunting [it]’), this form of the noun reveals that it is the subject of the verb, or the hunter.
                  </p>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  possessor
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                  <p>
                  if used with another noun, this noun form will indicate that that it belongs to this noun
                  </p>
                </Accordion.Content>
              </Accordion>
            :
            ''
            }
            <Card><Button onClick={this.props.setMood.bind(this,'localis')} active={this.props.mood==='localis'}>localis</Button></Card>
            {this.props.mood==='localis' ?
              <Accordion>
                Uses:
                <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  place at which, time at which
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 4}>
                  <p>
                  (assuming this noun is an object, place, or time) if used with a verb, the localis form of this noun indicates that the verb phrase is happening at the noun, or place at which the noun is at
                  </p>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 5} index={5} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  object of a comparison
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 5}>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 6} index={6} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  with postbase @5+paa/~vaa and enclitic =lli in exclamations
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 6}>

                </Accordion.Content>

                <Accordion.Title active={activeIndex === 7} index={7} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  formal vocative
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 7}>

                </Accordion.Content>

              </Accordion>
            :
            ''
            }
            <Card><Button onClick={this.props.setMood.bind(this,'ablative')} active={this.props.mood==='ablative'}>ablative</Button></Card>
            {this.props.mood==='ablative' ?
              <Accordion>
                Uses:
                <Accordion.Title active={activeIndex === 8} index={8} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  place from which, time from which
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 8}>
                  <p>
                  (assuming this noun is an object, place, or time) if used with a verb, this noun form iindicates that the verb phrase is happening from the noun, or from the place where the the noun is at
                  </p>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 9} index={9} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  indefinite object of an intransitive verb
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 9}>
                  <p>
                  if used along with an intransitive form of a verb (such as pissurtuq, ‘[it] is hunting’), this form of the noun suggests that it is the indefinite object of the verb, or the indefinite thing that is being hunted.
                  </p>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 10} index={10} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  specifying information about a noun within a verb
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 10}>

                </Accordion.Content>

                <Accordion.Title active={activeIndex === 11} index={11} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  secondary object especially with verbs of speaking and giving
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 11}>

                </Accordion.Content>

                <Accordion.Title active={activeIndex === 12} index={12} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  instrument (only in some dialects)
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 12}>

                </Accordion.Content>

              </Accordion>
            :
            ''
            }
            <Card><Button onClick={this.props.setMood.bind(this,'terminalis')} active={this.props.mood==='terminalis'}>terminalis</Button></Card>
            {this.props.mood==='terminalis' ?
              <Accordion>
                Uses:
                <Accordion.Title active={activeIndex === 13} index={13} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  route
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 13}>

                </Accordion.Content>

                <Accordion.Title active={activeIndex === 14} index={14} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  instrument
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 14}>

                </Accordion.Content>

                <Accordion.Title active={activeIndex === 15} index={15} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  part of a whole
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 15}>

                </Accordion.Content>
              </Accordion>
            :
            ''
            }
            <Card><Button onClick={this.props.setMood.bind(this,'vialis')} active={this.props.mood==='vialis'}>vialis</Button></Card>
            {this.props.mood==='vialis' ?
              <Accordion>
                Uses:
                <Accordion.Title active={activeIndex === 16} index={16} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  route
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 16}>

                </Accordion.Content>

                <Accordion.Title active={activeIndex === 17} index={17} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  instrument
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 17}>

                </Accordion.Content>

                <Accordion.Title active={activeIndex === 18} index={18} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  part of a whole
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 18}>

                </Accordion.Content>
              </Accordion>
            :
            ''
            }
            <Card><Button onClick={this.props.setMood.bind(this,'equalis')} active={this.props.mood==='equalis'}>equalis</Button></Card>
            {this.props.mood==='equalis' ?
              <Accordion>
                Uses:
                <Accordion.Title active={activeIndex === 19} index={19} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  comparison
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 19}>

                </Accordion.Content>

                <Accordion.Title active={activeIndex === 20} index={20} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  language specific
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 20}>

                </Accordion.Content>

                <Accordion.Title active={activeIndex === 21} index={21} onClick={this.handleClick}>
                  <Icon name='dropdown' />
                  price specification
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 21}>

                </Accordion.Content>
              </Accordion>
            :
            ''
            }
          </Card.Group>
        </Card.Content>
      </Card>
    );
  }
}
export default YupikNounEndingMoods;
