import React from 'react';
import { Container, Divider, List, Label, Loader, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const YugtunLoader = (props) => (
  <Dimmer active={props.criteria}>
    <Loader size='massive'>
      Yugtun is loading...
    </Loader>
  </Dimmer>
);

export const YugtunFooter = (props) => (
  <Container textAlign='left'>
    <Divider fluid />
    <List> <i> This website is still being improved, please let us know of any issues. Quyana. </i></List>
    <List horizontal bulleted>
      <List.Item> © Yuarcuun </List.Item>
      <List.Item> <Link to='/about'>About</Link> </List.Item>
      <List.Item> <a href='mailto:yuarcuun@gmail.com'>Contact</a> </List.Item>
    </List>
  </Container>
)

export const WordItem = (props) => {
  let word = props.word;
  let isCommon = Object.keys(word).some((key) => { return word[key].properties && word[key].properties.indexOf('common') > -1; });
  let isHBC = Object.keys(word).some((key) => { return word[key].properties && word[key].properties.indexOf('HBC') > -1; });
  let isNoun = Object.keys(word).some((key) => { return word[key].descriptor && word[key].descriptor.indexOf('noun') > -1; });
  let isVerb = Object.keys(word).some((key) => { return word[key].descriptor && word[key].descriptor.indexOf('verb') > -1; });
  let isParticle = Object.keys(word).some((key) => { return word[key].descriptor && word[key].descriptor.indexOf('particle') > -1; });
  let isExpression = Object.keys(word).some((key) => { return word[key].descriptor && word[key].descriptor.indexOf('Common Expression') > -1; });
  return (
    <List.Item key={word.yupik}>
    <Link to={{pathname: '/' + word.yupik, state: { word: word, search: props.search, wordsList: props.wordsList, yugtunAnalyzer: false, parses: [], segments: [],endingrule: []}}}>
      <List.Content>
        <List.Header>
          {word.yupik}
          <span style={{ 'marginLeft': '10px' }}>
            {isCommon ? <Label size='mini' color='teal'>COMMON</Label> : ''}
            {isHBC ? <Label size='mini' color='orange'>HBC DIALECT</Label> : ''}
            {isNoun ? <Label size='mini' color='grey'>NOUN</Label> : ''}
            {isVerb ? <Label size='mini' color='brown'>VERB</Label> : ''}
            {isParticle ? <Label size='mini' color='red'>PARTICLE</Label> : ''}
            {isExpression ? <Label size='mini' color='green'>EXPRESSION</Label> : ''}
          </span>
        </List.Header>
        <List.Description>{word.english}</List.Description>
      </List.Content>
    </Link>
    </List.Item>
  );
}
