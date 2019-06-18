import React, { Component } from 'react';
import '../../semantic/dist/semantic.min.css';
import { Accordion, Icon, Card, Button, Divider } from 'semantic-ui-react';
import { interrogative, optative, dependent, verb2noun, postbaseButtons, enclitics } from '../modifyWord/modifyVerbOptions.js';
import { postbases } from '../constants/constants.js';

class YupikAllPostbases extends Component {
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
    let question_forms = this.state.activeIndex === 0 || this.props.mood === 'interrogative';
    let make_a_command = this.state.activeIndex === 1 || this.props.mood === 'optative';
    let connective_endings = this.state.activeIndex === 2 || this.props.mood[0] === 'c' || this.props.mood[0] === 's';
    let noun_forms = this.state.activeIndex === 3 || this.props.nounEnding !== '';
    let is_enclitics = this.state.activeIndex === enclitics[this.props.mood].activeIndex;
    return (
      <div style={{ marginBottom: '2em' }}>
      <Accordion fluid styled exclusive={false}>
        <Accordion.Title active={question_forms} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Question forms
        </Accordion.Title>
        <Accordion.Content active={question_forms}>
          <Card.Group itemsPerRow={3} stackable>
          <Card>
            <Button onClick={() => this.props.setEnclitic('-qaa', '(yes or no?)')} toggle active={this.props.enclitic === '-qaa'}>Yes or no?</Button>
          </Card>
          {interrogative.map((e) => {
            return (
              <Card key={e.mood}>
              <Button onClick={() => this.props.setMood(e.group, e.text)} toggle active={this.props.moodSpecific === e.mood}>{e.mood}</Button>
              </Card>
            );
          })}
          </Card.Group>
        </Accordion.Content>

        <Accordion.Title active={make_a_command} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Make a command
        </Accordion.Title>
        <Accordion.Content active={make_a_command}>
          <Card.Group itemsPerRow={3} stackable>
          {optative.map((e) => {
            return (
              <Card key={e.mood}>
              <Button onClick={() => this.props.setMood(e.group, e.mood)} toggle active={this.props.moodSpecific === e.mood}>{e.mood}</Button>
              </Card>
            );
          })}
          </Card.Group>
        </Accordion.Content>

        <Accordion.Title active={connective_endings} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Connective endings
        </Accordion.Title>
        <Accordion.Content active={connective_endings}>
          <Card.Group itemsPerRow={3} stackable>
          {dependent.map((e) => {
            return (
              <Card key={e.mood}>
              <Button onClick={() => this.props.setMood(e.group, e.mood)} toggle active={this.props.moodSpecific === e.mood}>{e.mood}</Button>
              </Card>
            );
          })}
          </Card.Group>
        </Accordion.Content>

        <Accordion.Title active={noun_forms} index={3} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Noun forms
        </Accordion.Title>
        <Accordion.Content active={noun_forms}>
          <Card.Group itemsPerRow={3} stackable>
          {verb2noun.map((e) => {
            return (
              <Card key={e.text}>
              <Button onClick={() => this.props.setNounEnding(e.ending)} toggle active={this.props.nounEnding === e.ending}>{e.text}</Button>
              </Card>
            );
          })}
          </Card.Group>
        </Accordion.Content>
      </Accordion>

      <Divider />
      <div align="center">
      Postbases:
      </div>
      <Divider />
      <Accordion styled >
        {postbaseButtons.map((group) => {
          return (
            <div key={group.text}>
            <Accordion.Title active={this.state.activeIndex === group.activeIndex} index={group.activeIndex} onClick={this.handleClick}>
              <Icon name='dropdown' />
              {group.text}
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === group.activeIndex}>
              <Card.Group itemsPerRow={3} stackable>
              {group.indexes.map((e) => {
                return (
                  <Card key={e}>
                  <Button onClick={(event) => this.props.setPostbase(e, event)} disabled={(this.props.allowable_next_ids.indexOf(e) >= 0)} toggle active={this.props.currentPostbases.indexOf(e) >= 0}>{postbases[e].description}</Button>
                  </Card>
                );
              })}
              </Card.Group>
            </Accordion.Content>
            </div>
          );
        })}
      </Accordion>
      <Divider />


      {this.props.mood === 'indicative' || this.props.mood === 'interrogative' ?
      <Accordion styled >
        <Accordion.Title active={is_enclitics} index={enclitics[this.props.mood].activeIndex} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Enclitics
        </Accordion.Title>
        <Accordion.Content active={is_enclitics}>
          <Card.Group itemsPerRow={3} stackable>
          {enclitics[this.props.mood].items.map((e) => {
              return (
                <Card key={e.text}>
                <Button onClick={() => this.props.setEnclitic(e.ending, e.meaning)} toggle active={this.props.enclitic === e.ending}>{e.text}</Button>
                </Card>
              );
            })}
            </Card.Group>
          </Accordion.Content>
      </Accordion>
      :''}
      </div>
    );
  }
}
export default YupikAllPostbases;
