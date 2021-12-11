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
    <List horizontal bulleted>
      <List.Item> © Yuarcuun </List.Item>
      <List.Item> <Link to='/about'>About</Link> </List.Item>
      <List.Item> <a href='mailto:yuarcuun@gmail.com'>Contact</a> </List.Item>
    </List>
  </Container>
)

export const WordItem = (props) => {
  console.log(props.word)
  let word = props.word;
  let isNoun = props.word.pos.includes('noun');
  let isVerb = props.word.pos.includes('verb');
  let isParticle = props.word.pos.includes('particle');
  let isExclamation = props.word.pos.includes('exclamation');
  let isConjunction = props.word.pos.includes('conjunction');
  let isAdverb = props.word.pos.includes('adverb');
  let isPredicate = props.word.pos.includes('predicate');
  let isDemonstrative = props.word.pos.includes('demonstrative');
  let isInterjection = props.word.pos.includes('interjection');


  let isPostbase = props.word.pos.includes('postbase');
  let isEnclitic = props.word.pos.includes('enclitic');

  // let isExpression = props.word.pos.includes('expression');
  // let isCommon = props.word.pos.includes('grammar');
  // let isHBC = props.word.pos.includes('Hooper Bay Chevak');


  return (
    <List.Item key={word.keyString}>
    <Link to={{pathname: '/' + word.url, state: { word: word, search: props.search, wordsList: props.wordsList, yugtunAnalyzer: false, parses: [], segments: [],endingrule: []}}}>
      <List.Content>
        <List.Header style={{display:'flex',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'16px',paddingBottom:'4px'}}>
          {console.log(word.keySplit)}
          {word.keySplit.map((w,index) => 
              <span style={{'paddingRight':'3px'}}>
              {/*{console.log(w)}*/}
              {w[0]}
              {console.log(index, word.keySplit.length,w[1][0])}
              {w[1][0] !== '' ?
                  <Label style={{'marginLeft':'5px',marginRight:'5px'}} size='mini' color='white'>{w[1].join(', ')}</Label>
                :
                (index == word.keySplit.length-1 ?
                  ''
                  :
                  ', '
                )
            }
              </span>
            )}
          <span style={{ 'marginLeft': '15px'}}>
            {isNoun ? <Label size='mini' color='grey'>NOUN</Label> : ''}
            {isVerb ? <Label size='mini' color='brown'>VERB</Label> : ''}
            {isParticle ? <Label size='mini' color='purple'>PARTICLE</Label> : ''}
            {isExclamation ? <Label size='mini' color='red'>EXCLAMATION</Label> : ''}
            {isConjunction ? <Label size='mini' color='teal'>CONJUNCTION</Label> : ''}
            {isAdverb ? <Label size='mini' color='orange'>ADVERB</Label> : ''}
            {isPredicate ? <Label size='mini' color='purple'>PREDICATE</Label> : ''}
            {isDemonstrative ? <Label size='mini' color='yellow'>DEMONSTRATIVE</Label> : ''}
            {isInterjection ? <Label size='mini' color='blue'>INTERJECTION</Label> : ''}

            {isPostbase ? <Label size='mini' color='pink'>POSTBASE</Label> : ''}
            {isEnclitic ? <Label size='mini' color='green'>ENCLITIC</Label> : ''}

          </span>
        </List.Header>
        <List.Description style={{fontSize:'16px',fontWeight:'400'}}>{word.definitionString}</List.Description>
      </List.Content>
    </Link>
    </List.Item>
  );
}
