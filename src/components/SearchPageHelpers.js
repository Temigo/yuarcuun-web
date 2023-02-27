import React from 'react';
import { Container, Divider, List, Label, Loader, Dimmer, Icon } from 'semantic-ui-react';
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

export const TagColors = (props) => {
  console.log('hi',props.word)
  let isNoun = props.word == 'noun';
  let isVerb = props.word == 'verb';
  let isParticle = props.word == 'particle';
  let isRoot = props.word == 'root';
  let isExclamation = props.word == 'exclamation';
  let isConjunction = props.word == 'conjunction';
  let isAdverb = props.word == 'adverb';
  let isPredicate = props.word == 'predicate';
  let isDemonstrative = props.word == 'demonstrative';
  let isInterjection = props.word == 'interjection';
  let isPostbase = props.word == 'postbase';
  let isEnclitic = props.word == 'enclitic';
  let isTransitive = props.word == 't';
  let isIntransitive = props.word == 'i';
  let isNoun2 = props.word == 'n';

  return (
      <span style={{ display:'flex', height:'20px','marginLeft': props.padding}}>  
        {isNoun ? <Label size='mini' style={{backgroundColor:'#7F90B0',color:'white'}}>NOUN</Label> : ''}
        {isNoun2 ? <Label size='mini' style={{backgroundColor:'#7F90B0',color:'white'}}>NOUN</Label> : ''}
        {isVerb ? <Label size='mini' style={{backgroundColor:'#B07F7F',color:'white'}}>VERB</Label> : ''}
        {isIntransitive ? <Label size='mini' style={{backgroundColor:'#B07F7F',color:'white'}}>INTRANSITIVE VERB</Label> : ''}
        {isTransitive ? <Label size='mini' style={{backgroundColor:'#B07F7F',color:'white'}}>TRANSITIVE VERB</Label> : ''}
        {isParticle ? <Label size='mini'>PARTICLE</Label> : ''}
        {isRoot ? <Label size='mini'>ROOT</Label> : ''}
        {isExclamation ? <Label size='mini'>EXCLAMATION</Label> : ''}
        {isConjunction ? <Label size='mini'>CONJUNCTION</Label> : ''}
        {isAdverb ? <Label size='mini'>ADVERB</Label> : ''}
        {isPredicate ? <Label size='mini'>PREDICATE</Label> : ''}
        {isDemonstrative ? <Label size='mini'>DEMONSTRATIVE</Label> : ''}
        {isInterjection ? <Label size='mini'>INTERJECTION</Label> : ''}
        {isPostbase ? <Label size='mini' style={{backgroundColor:'#d56ea8',color:'white'}}>POSTBASE</Label> : ''}
        {isEnclitic ? <Label size='mini' style={{backgroundColor:'#60bf76',color:'white'}}>ENCLITIC</Label> : ''}
      </span>
    )
}

export const AudioItem = (props) => {
  // console.log(props)
  return (
      <List.Content>
        <List.Header style={{display:'flex',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'16px',paddingBottom:'4px'}}>
          {props.word.y}
        </List.Header>
        <List.Description style={{fontSize:'16px',fontWeight:'400'}}>{props.word.e}</List.Description>
      </List.Content>
  );
}

export const WordItemLikeInup = (props) => {
  // console.log(props)
  let verbkeyStringbool = false
  // console.log(props.word.verbkeyString.pos)
  if ('verbkeyString' in props.word) {
    if (props.word.verbkeyString.keyString.length !== 0 && props.word.pos == 'noun') {
      props.word.pos.push('verb')
      props.word.keyString = props.word.keyString.replace(',',', ')
      console.log('yes!')
      verbkeyStringbool = true
    }    
  }
  // let word = props.word;
  let isNoun = props.word.pos.includes('noun');
  let isVerb = props.word.pos.includes('verb');
  let isParticle = props.word.pos.includes('particle');
  let isRoot = props.word.pos.includes('root');
  let isExclamation = props.word.pos.includes('exclamation');
  let isConjunction = props.word.pos.includes('conjunction');
  let isAdverb = props.word.pos.includes('adverb');
  let isPredicate = props.word.pos.includes('predicate');
  let isDemonstrative = props.word.pos.includes('demonstrative');
  let isInterjection = props.word.pos.includes('interjection');


  let isPostbase = props.word.pos.includes('postbase');
  let isEnclitic = props.word.pos.includes('enclitic');
  let isUnlinked = props.word.pos.includes('unlinked');

  // let isExpression = props.word.pos.includes('expression');
  // let isCommon = props.word.pos.includes('grammar');
  // let isHBC = props.word.pos.includes('Hooper Bay Chevak');

  // console.log(props.word)
  if (isUnlinked) {
    return (
      <List.Item style={{'paddingLeft':props.paddingLeft,paddingTop:5,paddingBottom:8}} key={props.word.keyString}>
        <List.Content>
          <List.Header style={{display:'flex',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'18px'}}>
            {props.word.keyString}
            <span style={{ 'marginLeft': '15px'}}>  
              <Label size='mini'>UNLINKED</Label>
            </span>
          </List.Header>
        </List.Content>
      </List.Item>    
      )
  } else {
  return (
    <List.Item style={{'paddingLeft':props.paddingLeft,paddingTop:5,paddingBottom:8}} key={props.word.keyString}>
    
      <Link to={{pathname: '/' + props.word.url, state: { entry: props.entry, word: props.word, search: props.search, wordsList: props.wordsList, yugtunAnalyzer: false, parses: [], segments: [],endingrule: []}}}>
        <List.Content floated='right'>
          <Icon circular style={{marginTop:'5px', marginRight:'5px',color:'#8f8f8f',fontSize:'22px'}} size='large' name='chevron right' />
        </List.Content>
      </Link>

      <List.Content>
        <List.Header style={{lineHeight:'28px',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'18px',paddingBottom:'10px',paddingTop:'5px'}}>
          {/*{console.log(props.word.keySplit)}*/}
          {props.word.keySplit.map((w,index) => 
              <Link style={{fontSize:'18px',color:'#306190',fontWeight:'400',}} to={{pathname: '/' + props.word.url, state: { entry: props.entry, word: props.word, search: props.search, wordsList: props.wordsList, yugtunAnalyzer: false, parses: [], segments: [],endingrule: []}}}>
              <span style={{borderBottom:'1px solid #306190',paddingBottom:'1px'}}>
                {w[0]}
              </span>
             
              {w[1][0] !== '' ?
                  <Label style={{'marginLeft':'5px',marginRight:(index === props.word.keySplit.length-1 ? '0px' : '5px')}} size='mini' color='white'>{w[1].join(', ')}</Label>
                :
                
                (index == props.word.keySplit.length-1 ?
                  null
                  :
                  <span style={{borderBottom:'1px solid #306190',paddingBottom:'1px','paddingRight':'3px'}}>
                  {',\xa0'}
                  </span>
                )
                
              }
              
              </Link>
            )}

          <span style={{height:'20px','marginLeft': '18px'}}>  
            {isNoun ? <Label size='mini' style={{backgroundColor:'#7F90B0',color:'white'}}>NOUN</Label> : ''}
            {isVerb ? <Label size='mini' style={{backgroundColor:'#B07F7F',color:'white'}}>VERB</Label> : ''}
            {isParticle ? <Label size='mini'>PARTICLE</Label> : ''}
            {isRoot ? <Label size='mini'>ROOT</Label> : ''}
            {isExclamation ? <Label size='mini'>EXCLAMATION</Label> : ''}
            {isConjunction ? <Label size='mini'>CONJUNCTION</Label> : ''}
            {isAdverb ? <Label size='mini'>ADVERB</Label> : ''}
            {isPredicate ? <Label size='mini'>PREDICATE</Label> : ''}
            {isDemonstrative ? <Label size='mini'>DEMONSTRATIVE</Label> : ''}
            {isInterjection ? <Label size='mini'>INTERJECTION</Label> : ''}
            {isUnlinked ? <Label size='mini'>UNLINKED</Label> : ''}

            {isPostbase ? <Label size='mini' style={{backgroundColor:'#d56ea8',color:'white'}}>POSTBASE</Label> : ''}
            {isEnclitic ? <Label size='mini' style={{backgroundColor:'#60bf76',color:'white'}}>ENCLITIC</Label> : ''}

          </span>

          { props.word.entryDialect.length !== 0 ?
            <Label style={{'marginLeft':'5px',marginRight:'5px'}} size='mini' color='white'>{props.word.entryDialect.join(', ')}</Label>
          :
          null
          }

        </List.Header>
        <List.Description style={{fontSize:'16px',fontWeight:'400',lineHeight:'22px',color:'#000000b3'}}>{props.word.definitionString}</List.Description>
      </List.Content>
    </List.Item>
    );
  }
}

export const WordItem = (props) => {
  // console.log(props)
  let verbkeyStringbool = false
  // console.log(props.word.verbkeyString.pos)
  if ('verbkeyString' in props.word) {
    if (props.word.verbkeyString.keyString.length !== 0 && props.word.pos == 'noun') {
      props.word.pos.push('verb')
      props.word.keyString = props.word.keyString.replace(',',', ')
      console.log('yes!')
      verbkeyStringbool = true
    }    
  }
  // let word = props.word;
  let isNoun = props.word.pos.includes('noun');
  let isVerb = props.word.pos.includes('verb');
  let isParticle = props.word.pos.includes('particle');
  let isRoot = props.word.pos.includes('root');
  let isExclamation = props.word.pos.includes('exclamation');
  let isConjunction = props.word.pos.includes('conjunction');
  let isAdverb = props.word.pos.includes('adverb');
  let isPredicate = props.word.pos.includes('predicate');
  let isDemonstrative = props.word.pos.includes('demonstrative');
  let isInterjection = props.word.pos.includes('interjection');


  let isPostbase = props.word.pos.includes('postbase');
  let isEnclitic = props.word.pos.includes('enclitic');
  let isUnlinked = props.word.pos.includes('unlinked');

  // let isExpression = props.word.pos.includes('expression');
  // let isCommon = props.word.pos.includes('grammar');
  // let isHBC = props.word.pos.includes('Hooper Bay Chevak');

  // console.log(props.word)
  if (isUnlinked) {
    return (
      <List.Item key={props.word.keyString}>
        <List.Content>
          <List.Header style={{display:'flex',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'16px',paddingBottom:'4px'}}>
            {props.word.keyString}
            <span style={{ 'marginLeft': '15px'}}>  
              <Label size='mini'>UNLINKED</Label>
            </span>
          </List.Header>
        </List.Content>
      </List.Item>    
      )
  } else {
  return (
    <List.Item style={{'paddingLeft':8+props.paddingLeft}} key={props.word.keyString}>
    <Link to={{pathname: '/' + props.word.url, state: { entry: props.entry, word: props.word, search: props.search, wordsList: props.wordsList, yugtunAnalyzer: false, parses: [], segments: [],endingrule: []}}}>
      <List.Content>
        <List.Header style={{display:'flex',fontFamily:'Lato,Arial,Helvetica,sans-serif',fontSize:'16px',paddingBottom:'4px'}}>
          {/*{console.log(props.word.keySplit)}*/}
          {props.word.keySplit.map((w,index) => 
              <span>
              {w[0]}
              {/*{console.log(w)}*/}
              {w[1][0] !== '' ?
                  <Label style={{'marginLeft':'5px',marginRight:'5px'}} size='mini' color='white'>{w[1].join(', ')}</Label>
                :
                (index == props.word.keySplit.length-1 ?
                  ''
                  :
                  ',\xa0'
                )
            }
              </span>
            )}

          <span style={{ 'marginLeft': '18px'}}>  
            {isNoun ? <Label size='mini' style={{backgroundColor:'#7F90B0',color:'white'}}>NOUN</Label> : ''}
            {isVerb ? <Label size='mini' style={{backgroundColor:'#B07F7F',color:'white'}}>VERB</Label> : ''}
            {isParticle ? <Label size='mini'>PARTICLE</Label> : ''} 
            {isRoot ? <Label size='mini'>ROOT</Label> : ''}
            {isExclamation ? <Label size='mini'>EXCLAMATION</Label> : ''}
            {isConjunction ? <Label size='mini'>CONJUNCTION</Label> : ''}
            {isAdverb ? <Label size='mini'>ADVERB</Label> : ''}
            {isPredicate ? <Label size='mini'>PREDICATE</Label> : ''}
            {isDemonstrative ? <Label size='mini'>DEMONSTRATIVE</Label> : ''}
            {isInterjection ? <Label size='mini'>INTERJECTION</Label> : ''}
            {isUnlinked ? <Label size='mini'>UNLINKED</Label> : ''}

            {isPostbase ? <Label size='mini' style={{backgroundColor:'#d56ea8',color:'white'}}>POSTBASE</Label> : ''}
            {isEnclitic ? <Label size='mini' style={{backgroundColor:'#60bf76',color:'white'}}>ENCLITIC</Label> : ''}

          </span>
        </List.Header>
        <List.Description style={{fontSize:'16px',fontWeight:'400'}}>{props.word.definitionString}</List.Description>
      </List.Content>
    </Link>
    </List.Item>
    );
  }
}
