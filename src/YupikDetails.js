import React, { Component } from 'react';
import { Container, Header, Image, Divider, Grid, Icon, Input, List, Button } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';

class YupikDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      currentWord: "pissur-",
      // wantModifier: false
    };
  }
   displayWord(event, data) {
     //this.setState({currentWord: "help"})
     this.state.currentWord
   }
  // }
  // constructWord(event, data) {
  //   this.setState({currentWord:'blue'})
  // }
  // wantModifier(event, data){
  //   this.setState({wantModifier: true} );
  //   console.log(this.state.wantModifier); // why is this calling false the first time?
  // } 
  //  this.setState({ wordsList: wordsList

  render() {
    return (
      <Container>
        <p>{this.state.currentWord} </p>
        <p>How many people are you talking about?</p>
        <Button.Group widths='3' type="checkbox">
          <Button inverted color='blue'>1</Button>
          <Button inverted color='blue'>2</Button>
          <Button inverted color='blue'>3+</Button>
        </Button.Group>
        <Divider />
        <p>1st, 2nd, or 3rd person point-of-view?</p>
        <Button.Group widths='3'>
          <Button inverted color='blue'>I, us two, we</Button>
          <Button inverted color='blue'>you, you all</Button>
          <Button inverted color='blue'>he, she, them, it</Button>
        </Button.Group>
        <Divider />
        
      </Container>
    );
  }
}

export default YupikDetails;
