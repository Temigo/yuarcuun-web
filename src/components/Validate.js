import _ from 'lodash'
import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider, Form, Loader, Segment, Dimmer, FormField, FormSelect, Checkbox, Image, Grid, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import {YouTubeLinks} from './info/YouTubeLinks.js';

// import {summaries} from './info/summaries.js';
// import {categories} from './info/categories.js';
// import { FeaturedVideos } from './Helpers.js';
// import RecordingStorageHook from './RecordingStorageHook.js';
import { API_URL, WEB_URL } from '../App.js';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactGA from "react-ga4";
// import { customFontFam3, customTitleFontFam3, customFirefoxTitleFontFam } from './constants/constants.js';
// import { ReactMediaRecorder } from "react-media-recorder";
import axios from 'axios';
// import ReCAPTCHA from "react-google-recaptcha";
// import Mirt from 'react-mirt';
// import 'react-mirt/dist/css/react-mirt.css';


ReactGA.initialize("G-JZB9CXH4GJ")
// const categories = _.times(6, (i) => (
//   <Grid.Column key={i}>
//   	<div>
// 	    <Image src='/images/categories1.jpg' />
// 	    <h3 className='yugtun'>Ellavut</h3>
// 	    Weather, Climate
// 	  </div>
//   </Grid.Column>
// ))

// const keywords = _.times(6, (i) => (
//   <Grid.Column key={i}>
//   	<Button basic color='blue' size='mini'>Yugtun<br /><em>inYup'ik</em></Button>
//   </Grid.Column>
// ))

// let customFontFam = customFontFam3
// let customTitleFontFam = customTitleFontFam3
// let customFontFam2 = {fontFamily:customTitleFontFam3}
// let letterbutton = {fontFamily:customFontFam3,paddingTop:'10px',paddingBottom:'10px',paddingRight:'14px',paddingLeft:'14px',fontSize:'16px'}
// const isFirefox = typeof InstallTrigger !== 'undefined';

// if (isFirefox) {
//   customFontFam = customFirefoxTitleFontFam
//   customTitleFontFam = customFirefoxTitleFontFam
//   customFontFam2 = {fontFamily:customFirefoxTitleFontFam}
//   letterbutton = {fontFamily:customFirefoxTitleFontFam,paddingTop:'10px',paddingBottom:'10px',paddingRight:'14px',paddingLeft:'14px',fontSize:'16px'}
// }


class Validate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// show: false,
			// showAllElders: false,
			// categoriesDisplayed: ['1','2','3','4','5','6'],
			// featuredVideoIDs:['3TIkchKpXqY','F_bWrmqQB74',],
			// featuredVideoIDs2:['XcMTNy-xdF4','E6h9Cryzk3M',],
			// featuredZooms:['sS4vCvvOj8M','r78afbyVauw','kGCA7_Gc2ys','UbhmhRJClhg','NaYBwnGnA_0','tNLboGKVYhY'],
			// // eldersList: [],
			// showMoreVideos:false,
			// recordedBlob:[],
			// sending:false,
			// retrievingRecording:false,
			// // returnedTranscript:'',
			// returnedTranscript:"",
			// recaptchaAllowed:false,
			// currentAudioFileToSave:[],
			validationData:{},
			validationDataNew:{},
			validationEdit:{},
		}
	}

	componentDidMount() {
      axios
        .post(API_URL + "yugtunCrowdsourceValidation", {})
        .then(response => {
        	console.log(response)
        	this.setState({validationData:response.data})
        })
	}

	submitEdits = () => {
      axios
        .post(API_URL + "yugtunCrowdsourceValidation", this.state.validationEdit)
        .then(response => {
        	console.log(response)
        	this.setState({validationData:response.data})
        })
	}


  repeatAudio(audio, event, data) {
  	// console.log(audio)
    if (!this.state.playingAudio) {

      let sound = new Audio(API_URL + "yugtunCrowdsourceAudio/" + audio);
      this.setState({playingAudio: true});

      sound.play()

      sound.onended=()=>{
        this.setState({playingAudio: false});
      }
    }
  }


  buttonClicked = (d,status,currentstatus) => {
		let newvalidation = this.state.validationEdit

		console.log(d in newvalidation, newvalidation[d], currentstatus)
		if (d in newvalidation && newvalidation[d] == status) {
			console.log(newvalidation[d], currentstatus)
			delete newvalidation[d]
		} else {
			newvalidation[d]=status
		}

		if (currentstatus != status) {
			this.setState({validationEdit:newvalidation})	
		}
  }

	render() {
		console.log(this.state)
		let showLargerTable = window.innerWidth >= 480
		let clipStatus = ['new','accept','hold','reject']
		let clipTitles = ['New Clips', 'Accepted Clips', 'Held Clips', 'Rejected Clips']
		let clipColors = ['#E0E1E2', '#a8e1af', '#fee1a1', '#f2a4a1']
		return (
			<div>
				{[0,1,2,3].map((k)=>{
					return <div style={{borderLeft:'5px solid '+clipColors[k],borderRight:'5px solid '+clipColors[k]}}>
					<div style={{textAlign:'center',fontWeight:'bold',fontSize:'24px',margin:40,textDecoration:'underline'}}>{clipTitles[k]}</div>
					<Grid divided='vertically'>
						{Object.keys(this.state.validationData).map((d, dindex)=>
							{if (this.state.validationData[d]['validation'] == clipStatus[k]) {
								return <Grid.Row columns={5}>
												<Grid.Column width={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
													<div style={{fontSize:"20px"}}>{this.state.validationData[d]['sentence']}</div>
													<audio controls style={{height:40,margin:20}} src={API_URL + "yugtunCrowdsourceAudio/" + this.state.validationData[d]['filename']} />
												</Grid.Column>
												<Grid.Column width={2}>
													<div>{'Age: '}</div>
													<div>{'Gender: '}</div>
													<div>{'Name: '}</div>
													<div>{'Village: '}</div>
													<div>{'Date: '}</div>
													<div>{'Donate to CV: '}</div>
													<div>{'Sent to CV: '}</div>
													<div>{'Site Location: '}</div>
													<div>{'Status: '}</div>
												</Grid.Column>
												<Grid.Column width={4}>
													<div>{this.state.validationData[d]['age'].replace('do_not_wish_to_say','')}<span style={{color:'white'}}>`</span></div>
													<div>{this.state.validationData[d]['gender'].replace('do_not_wish_to_say','')}<span style={{color:'white'}}>`</span></div>
													<div>{this.state.validationData[d]['name']}<span style={{color:'white'}}>`</span></div>
													<div>{this.state.validationData[d]['village'].replace('do_not_wish_to_say','')}<span style={{color:'white'}}>`</span></div>
													<div>{this.state.validationData[d]['datetime']}<span style={{color:'white'}}>`</span></div>
													<div>{this.state.validationData[d]['donate']}<span style={{color:'white'}}>`</span></div>
													<div>{this.state.validationData[d]['sent']}<span style={{color:'white'}}>`</span></div>
													<div>{this.state.validationData[d]['siteLocation']}<span style={{color:'white'}}>`</span></div>
													<div>{this.state.validationData[d]['validation']}<span style={{color:'white'}}>`</span></div>
												</Grid.Column>
												<Grid.Column width={3} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
													<Button disabled={this.state.validationData[d]['validation']=='accept'} style={{margin:3}} onClick={()=>this.buttonClicked(d,'accept',this.state.validationData[d]['validation'])} color={(this.state.validationData[d]['validation'] == 'accept' || (d in this.state.validationEdit && this.state.validationEdit[d] == 'accept')) ? 'green' : ''}>Accept</Button>
													<Button disabled={this.state.validationData[d]['validation']=='hold'} style={{margin:3}} onClick={()=>this.buttonClicked(d,'hold',this.state.validationData[d]['validation'])} color={(this.state.validationData[d]['validation'] == 'hold' || (d in this.state.validationEdit && this.state.validationEdit[d] == 'hold')) ? 'yellow' : ''}>Hold</Button>
													<Button disabled={this.state.validationData[d]['validation']=='reject'} style={{margin:3}} onClick={()=>this.buttonClicked(d,'reject',this.state.validationData[d]['validation'])} color={(this.state.validationData[d]['validation'] == 'reject' || (d in this.state.validationEdit && this.state.validationEdit[d] == 'reject')) ? 'red' : ''}>Reject</Button>
												</Grid.Column>
											</Grid.Row>
										}
						})}
					</Grid>
				</div>
				})}
				<div style={{textAlign:'center'}}><Button color='blue' style={{margin:30}} size='large' onClick={()=>this.submitEdits()}>Submit Changes</Button></div>
			</div>
		);
	}
}
export default Validate;