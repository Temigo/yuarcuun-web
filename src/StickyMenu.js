import React, { Component } from 'react';
import { Header, Icon, Button, Menu } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import { API_URL } from './App.js';

class StickyMenu extends Component {
  speak(event, data) {
      let audio = new Audio(API_URL + "/tts/" + this.props.word.replace('-', ''));
      audio.play();
  }

  render() {
    return (
      <Menu borderless fixed='top' widths={3}>
          <Menu.Item>
          <Button primary icon circular onClick={this.props.goBack} floated='left'>
            <Icon name='chevron left' />
          </Button>
          </Menu.Item>
          <Menu.Item>
        <Header as='h1' textAlign='center'>
          {this.props.word}
        </Header>
        </Menu.Item>
        <Menu.Item>
          <Icon name='volume up' color='teal' size='big' onClick={this.speak.bind(this)} />
        </Menu.Item>
      </Menu>
    );
  }
}

export default StickyMenu;
