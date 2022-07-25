import React from 'react';
import { Container, Divider, List, Label, Loader, Dimmer, Menu, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export const PopupCaller = (props) => {
  // console.log('hi',props.m)
  let mind = props.mind
  let n = props.n


  return (
      <Popup
                    trigger={
                      <span onClick={()=>{this.handleOpen('mvns'+mind.toString())}} style={{color:this.state.colorsList[n[1]]}}>{n[0]}</span>
                    }
                    on='click'
                    open={this.state.isOpen && this.state.currentlyOpen === 'mvns'+mind.toString()}
                    // onOpen={()=>{this.handleOpen('mvns'+mind.toString())}}
                    onClose={()=>{this.setState({isOpen:false,currentEditMode:'default'})}}
                    position='bottom center'
                    style={{
                      height:(this.state.currentEditMode==='default' ? 80 : '406px'),
                      padding:(this.state.currentEditMode==='default' ? 0 : null)}}
                    content={
                      this.state.currentEditMode==='default' ?
                      <Menu vertical>
                      <Menu.Item
                        name='messages'
                        // active={this.state.activeItem === 'messages'}
                        style={{display:'flex',flexDirection:'row',alignItems:'center',paddingRight:'13px'}}
                        onClick={()=>{this.menuSelect('changeverbbase')}}
                      >
                        <div>Change Main Verb</div>
                        <Icon name='chevron right' />
                      </Menu.Item>
                      <Menu.Item
                        name='messages'
                        // active={this.state.activeItem === 'messages'}
                        // onClick={()=>{this.setState({currentEditMode:'changeverbbase'})}}
                      >
                        Delete Main Verb
                      </Menu.Item>                      
                      </Menu>
                      :
                      null
                    }
                    />
    )
}


