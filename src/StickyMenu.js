import React, { Component } from 'react';
import { Header, Icon, Button, Menu, Checkbox } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import { API_URL } from './App.js';

class StickyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchMode: false,
      allPostbasesMode: false,
    };
  }

  switchMode(event, data) {
    this.setState({ switchMode: !this.state.switchMode });
    this.props.switchMode(event, data);
  }

  allPostbasesMode(event, data) {
    this.setState({ allPostbasesMode: !this.state.allPostbasesMode });
    this.props.allPostbasesMode(event, data);
  }

  speak(event, data) {
    let audio = new Audio(API_URL + "/tts/" + this.props.word.replace('-', ''));
    audio.play();
  }
// <Icon circular name='list' color='teal' size='large' inverted={this.state.switchMode} onClick={this.switchMode.bind(this)}/>
// <Icon name='volume up' color='teal' size='big' onClick={this.speak.bind(this)} />


// This will enable all postbases mode  
//<Icon name='world' color='red' size='large' inverted={this.state.allPostbasesMode} onClick={this.allPostbasesMode.bind(this)}/>

  render() {
    return (
      <Menu borderless fixed='top' widths={3}>
          <Menu.Item>
          <Button primary icon circular onClick={this.props.goBack} floated='left'>
            <Icon name='chevron left' />
          </Button>
          {this.props.switchMode !== undefined ?
          <Button icon circular onClick={this.props.goBack}>
            <Icon name='search' />
          </Button>
          : ''}

          </Menu.Item>
          <Menu.Item>
        <Header as='h1' textAlign='center'>
          {this.props.word}
        </Header>
        </Menu.Item>
        <Menu.Item>
              {this.props.switchMode !== undefined ?
                <Button circular size='small' active={this.state.switchMode} onClick={this.switchMode.bind(this)}>All Options</Button>
              : ''}
        </Menu.Item>
      </Menu>
    );
  }
}

export default StickyMenu;
