import React, { Component } from 'react';
import './semantic/dist/semantic.min.css';
import YupikModifyNoun from './YupikModifyNoun.js';
import YupikModifyVerb from './YupikModifyVerb.js';
import { Accordion, Icon, Card, Button, Divider } from 'semantic-ui-react';
import { interrogative, optative, dependent, verb2noun, postbaseButtons, enclitics } from './modifyVerbOptions.js';
import { postbases } from './constants.js';

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
    return (
      <div>
      <Accordion fluid styled exclusive={false}>
        <Accordion.Title active={this.state.activeIndex === 0 || this.props.mood === 'interrogative'} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Question form
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0 || this.props.mood === 'interrogative'}>
          <Card.Group itemsPerRow={3} stackable>
          {interrogative.map((e) => {
            return (
              <Card>
              <Button onClick={() => this.props.setMood(e.group, e.text)} toggle active={this.props.moodSpecific === e.mood}>{e.mood}</Button>
              </Card>
            );
          })}
          </Card.Group>
        </Accordion.Content>

        <Accordion.Title active={this.state.activeIndex === 1 || this.props.mood === 'optative'} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Make a command
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 1 || this.props.mood === 'optative'}>
          <Card.Group itemsPerRow={3} stackable>
          {optative.map((e) => {
            return (
              <Card>
              <Button onClick={() => this.props.setMood(e.group, e.mood)} toggle active={this.props.moodSpecific === e.mood}>{e.mood}</Button>
              </Card>
            );
          })}
          </Card.Group>
        </Accordion.Content>

        <Accordion.Title active={this.state.activeIndex === 2 || this.props.mood[0] == 'c' || this.props.mood[0] == 's'} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Dependent clause
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 2 || this.props.mood[0] == 'c' || this.props.mood[0] == 's'}>
          <Card.Group itemsPerRow={3} stackable>
          {dependent.map((e) => {
            return (
              <Card>
              <Button onClick={() => this.props.setMood(e.group, e.mood)} toggle active={this.props.moodSpecific === e.mood}>{e.mood}</Button>
              </Card>
            );
          })}
          </Card.Group>
        </Accordion.Content>

        <Accordion.Title active={this.state.activeIndex === 3 || this.props.nounEnding != ''} index={3} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Verb to noun
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 3 || this.props.nounEnding != ''}>
          <Card.Group itemsPerRow={3} stackable>
          {verb2noun.map((e) => {
            return (
              <Card>
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

      <Accordion styled >
        {postbaseButtons.map((group) => {
          return (
            <div>
            <Accordion.Title active={this.state.activeIndex === group.activeIndex} index={group.activeIndex} onClick={this.handleClick}>
              <Icon name='dropdown' />
              {group.text}
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === group.activeIndex}>
              <Card.Group itemsPerRow={3} stackable>
              {group.indexes.map((e) => {
                return (
                  <Card>
                  <Button onClick={(event) => this.props.setPostbase(e, event)} disabled={(this.props.allowable_next_ids.indexOf(e) < e)} toggle active={this.props.currentPostbases.indexOf(e) >= 0}>{postbases[e].description}</Button>
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


      {this.props.mood == 'indicative' || this.props.mood == 'interrogative' ?
      <Accordion styled >
        <Accordion.Title active={this.state.activeIndex === enclitics[this.props.mood].activeIndex} index={enclitics[this.props.mood].activeIndex} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Enclitics
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === enclitics[this.props.mood].activeIndex}>
          <Card.Group itemsPerRow={3} stackable>
          {enclitics[this.props.mood].items.map((e) => {
              return (
                <Card>
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
