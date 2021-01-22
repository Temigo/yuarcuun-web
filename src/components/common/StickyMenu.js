import React, { Component } from 'react';
import { Header, Icon, Button, Menu } from 'semantic-ui-react';
import '../../semantic/dist/semantic.min.css';
import { API_URL } from '../../App.js';
import { connect } from "react-redux";
import { toggleAllPostbases } from '../../redux/actions';

class StickyMenu extends Component {
  switchMode(event, data) {
    this.props.switchMode();
    this.props.toggleAllPostbases();
  }

  speak(event, data) {
    let audio = new Audio(API_URL + "/tts/" + this.props.word.replace('-', ''));
    audio.play();
  }

  render() {
    console.log(this.props);
    return (
      <Menu borderless fixed='top' widths={3}>
          <Menu.Item>
          <Button primary icon circular onClick={this.props.goBack} floated='left'>
            <Icon name='chevron left' />
          </Button>
          {this.props.displaySimple ? '' :
          <Button icon circular onClick={() => {this.props.history.push('/')}} style={{marginLeft: '10px' }}>
            <Icon name='search' />
          </Button>
          }

          </Menu.Item>
          <Menu.Item>
        <Header style={{fontFamily:'Lato,Arial,Helvetica,sans-serif'}} as='h1' textAlign='center'>
          {this.props.word}
        </Header>
        </Menu.Item>

        <Menu.Item>
        {this.props.displaySimple ? '' :
          <Button circular size='small' active={this.props.allPostbasesMode} onClick={this.switchMode.bind(this)}>All Options</Button>
        }
        </Menu.Item>

      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.allPostbases };
};
export default connect(mapStateToProps, { toggleAllPostbases })(StickyMenu);
