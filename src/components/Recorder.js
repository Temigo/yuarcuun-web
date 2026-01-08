import _ from 'lodash'
import React, { Component, useState, useRef } from 'react';
import { Container, Header, Button, Icon, Divider, Form, Loader, Segment, Dimmer, FormField, Dropdown, FormSelect, Checkbox, Image, Grid, Popup } from 'semantic-ui-react';
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
import { ReactMediaRecorder } from "react-media-recorder";
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import Mirt from 'react-mirt';
import 'react-mirt/dist/css/react-mirt.css';
// import vmsg from "vmsg";
// import { MultiRecorder, type AudioFormat } from "react-ts-audio-recorder";
// import vmsgWasm from "react-ts-audio-recorder/assets/vmsg.wasm?url";
// import Dropzone from 'react-dropzone'
import {useRecorder}  from 'react-microphone-recorder';
  
  const RecorderHook = () => {
    const {
      startRecording,
      pauseRecording,
      stopRecording,
      resetRecording,
      resumeRecording,
      audioLevel,
      timeElapsed,
      recordingState,
      audioURL,
      audioFile,
      isRecording
    } = useRecorder();

    const onButtonClick = () => {
        // send audio file to server or process it here
    }
  
    return (
      <div className="flex flex-col items-center justify-center p-4 ">
        <div className="w-full max-w-md p-8 bg-white rounded shadow">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-900">Audio Level:</span>
              <span className="text-gray-900">{audioLevel}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className={"h-full w-full bg-green-500 rounded-full"}></div>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-gray-900">Time: {timeElapsed}s</span>
          </div>
          <div className="flex justify-between">
            <button onClick={startRecording} className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600">Start</button>
            {
              recordingState=== "paused" ? 
              <button onClick={resumeRecording} className="px-4 py-2 text-white bg-green-500 rounded shadow hover:bg-green-600">Resume</button>
              : 
              <button onClick={pauseRecording} className="px-4 py-2 text-white bg-yellow-500 rounded shadow hover:bg-yellow-600">Pause</button>
  
            }
            <button onClick={stopRecording} className="px-4 py-2 text-white bg-red-500 rounded shadow hover:bg-red-600">Stop</button>
            <button onClick={resetRecording} className="px-4 py-2 text-white bg-gray-500 rounded shadow hover:bg-gray-600">Reset</button>
          </div>
          <div className="mt-4">
            <span className="text-gray-900">Recording State: {recordingState}</span>
            {
              recordingState === "stopped" && audioFile && (
                  <div className="mt-4">
                      <span className="text-gray-900">Audio File:</span>
                      <audio src={audioURL} controls className="mt-4"></audio>
                  </div>
              )
            }
          </div>
        </div>
      </div>
    );
  };

// var toWav = require('audiobuffer-to-wav')
var lamejs = require("lamejs");

// var xhr = require('xhr')

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

// const recorder = new vmsg.Recorder({
//   wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
// });



const AUDIO_CONFIG = {
    MP3_BITRATE: 192, // Increased from 128 for better quality
    CHUNK_SIZE: 4096, // Larger chunk size for better performance
    MAX_DURATION: 3600, // Maximum duration in seconds (1 hour)
    SAMPLE_RATE: 44100, // Standard sample rate
};

const genderOptions = [
  { key: 'male_masculine', text: 'Male / Masculine', value: 'male_masculine' },
  { key: 'female_feminine', text: 'Female / Feminine', value: 'female_feminine' },
  { key: "'non-binary'", text: 'Non-Binary', value: "'non-binary'" },
  { key: "do_not_wish_to_say", text: 'I prefer not to say', value: "do_not_wish_to_say" },
]

// const nameVisibleOptions = [
//   { key: 'v', text: 'Visible', value: 'visible' },
//   { key: 'h', text: 'Hidden', value: 'hidden' },
// ]

const hometownOptions = [
    {key:`Akiacuar (Akiachak)`, text:`Akiacuar (Akiachak)`, value:`Akiacuar (Akiachak)`},
    {key:`Akiaq (Akiak)`, text:`Akiaq (Akiak)`, value:`Akiaq (Akiak)`},
    {key:`Alaqnaqiq (Aleknagik)`, text:`Alaqnaqiq (Aleknagik)`, value:`Alaqnaqiq (Aleknagik)`},
    {key:`Alarneq (Alakanuk)`, text:`Alarneq (Alakanuk)`, value:`Alarneq (Alakanuk)`},
    {key:`Anyaraq (Aniak)`, text:`Anyaraq (Aniak)`, value:`Anyaraq (Aniak)`},
    {key:`Arviiq (Platinum)`, text:`Arviiq (Platinum)`, value:`Arviiq (Platinum)`},
    {key:`Asaacarsaq (Mountain Village)`, text:`Asaacarsaq (Mountain Village)`, value:`Asaacarsaq (Mountain Village)`},
    {key:`Atmaulluaq (Atmautluak)`, text:`Atmaulluaq (Atmautluak)`, value:`Atmaulluaq (Atmautluak)`},
    {key:`Cellitemiut (Sleetmute)`, text:`Cellitemiut (Sleetmute)`, value:`Cellitemiut (Sleetmute)`},
    {key:`Cetuyaraq (New Stuyahok)`, text:`Cetuyaraq (New Stuyahok)`, value:`Cetuyaraq (New Stuyahok)`},
    {key:`Cev'aq (Chevak)`, text:`Cev'aq (Chevak)`, value:`Cev'aq (Chevak)`},
    {key:`Cevv'arneq (Chefornak)`, text:`Cevv'arneq (Chefornak)`, value:`Cevv'arneq (Chefornak)`},
    {key:`Cingik (Golovin)`, text:`Cingik (Golovin)`, value:`Cingik (Golovin)`},
    {key:`Curarpalek (Chuathbaluk)`, text:`Curarpalek (Chuathbaluk)`, value:`Curarpalek (Chuathbaluk)`},
    {key:`Curyung (Dillingham)`, text:`Curyung (Dillingham)`, value:`Curyung (Dillingham)`},
    {key:`Evicuarmiut (Eek)`, text:`Evicuarmiut (Eek)`, value:`Evicuarmiut (Eek)`},
    {key:`Igyagiiq (Egegik)`, text:`Igyagiiq (Egegik)`, value:`Igyagiiq (Egegik)`},
    {key:`Igyaraq (Igiugig)`, text:`Igyaraq (Igiugig)`, value:`Igyaraq (Igiugig)`},
    {key:`Imangaq (Emmonak)`, text:`Imangaq (Emmonak)`, value:`Imangaq (Emmonak)`},
    {key:`Ingricuar (Twin Hills)`, text:`Ingricuar (Twin Hills)`, value:`Ingricuar (Twin Hills)`},
    {key:`Ingrirraller (Holy Cross)`, text:`Ingrirraller (Holy Cross)`, value:`Ingrirraller (Holy Cross)`},
    {key:`Iquaq (Ekwok)`, text:`Iquaq (Ekwok)`, value:`Iquaq (Ekwok)`},
    {key:`Iqugmiut (Russian Mission)`, text:`Iqugmiut (Russian Mission)`, value:`Iqugmiut (Russian Mission)`},
    {key:`Kangirnaq (Kongiganak)`, text:`Kangirnaq (Kongiganak)`, value:`Kangirnaq (Kongiganak)`},
    {key:`Kassigluq (Kasigluk)`, text:`Kassigluq (Kasigluk)`, value:`Kassigluq (Kasigluk)`},
    {key:`Kuiggayagaq (Oscarville)`, text:`Kuiggayagaq (Oscarville)`, value:`Kuiggayagaq (Oscarville)`},
    {key:`Kuiggluk (Kwethluk)`, text:`Kuiggluk (Kwethluk)`, value:`Kuiggluk (Kwethluk)`},
    {key:`Kuigilnguq (Kwigillingok)`, text:`Kuigilnguq (Kwigillingok)`, value:`Kuigilnguq (Kwigillingok)`},
    {key:`Kuinerraq (Quinhagak)`, text:`Kuinerraq (Quinhagak)`, value:`Kuinerraq (Quinhagak)`},
    {key:`Liivlek (Levelock)`, text:`Liivlek (Levelock)`, value:`Liivlek (Levelock)`},
    {key:`Mamterat (Goodnews Bay)`, text:`Mamterat (Goodnews Bay)`, value:`Mamterat (Goodnews Bay)`},
    {key:`Mamterilleq (Bethel)`, text:`Mamterilleq (Bethel)`, value:`Mamterilleq (Bethel)`},
    {key:`Manuquutaq (Manakotak)`, text:`Manuquutaq (Manakotak)`, value:`Manuquutaq (Manakotak)`},
    {key:`Marayaarmiut (Scammon Bay)`, text:`Marayaarmiut (Scammon Bay)`, value:`Marayaarmiut (Scammon Bay)`},
    {key:`Masserculleq (Marshall)`, text:`Masserculleq (Marshall)`, value:`Masserculleq (Marshall)`},
    {key:`Mikuryaq (Mekoryuk)`, text:`Mikuryaq (Mekoryuk)`, value:`Mikuryaq (Mekoryuk)`},
    {key:`Nakniq (Naknek)`, text:`Nakniq (Naknek)`, value:`Nakniq (Naknek)`},
    {key:`Napamiut (Napaimiut)`, text:`Napamiut (Napaimiut)`, value:`Napamiut (Napaimiut)`},
    {key:`Naparyaarmiut (Hooper Bay)`, text:`Naparyaarmiut (Hooper Bay)`, value:`Naparyaarmiut (Hooper Bay)`},
    {key:`Naparyarraq (Napakiak)`, text:`Naparyarraq (Napakiak)`, value:`Naparyarraq (Napakiak)`},
    {key:`Napaskiaq (Napaskiak)`, text:`Napaskiaq (Napaskiak)`, value:`Napaskiaq (Napaskiak)`},
    {key:`Negeqliim Painga (Pitka's Point)`, text:`Negeqliim Painga (Pitka's Point)`, value:`Negeqliim Painga (Pitka's Point)`},
    {key:`Negeqliq (St. Mary's)`, text:`Negeqliq (St. Mary's)`, value:`Negeqliq (St. Mary's)`},
    {key:`Negtemiut (Nightmute)`, text:`Negtemiut (Nightmute)`, value:`Negtemiut (Nightmute)`},
    {key:`Neviarcaurluq (Elim)`, text:`Neviarcaurluq (Elim)`, value:`Neviarcaurluq (Elim)`},
    {key:`Niugtaq (Newtok)`, text:`Niugtaq (Newtok)`, value:`Niugtaq (Newtok)`},
    {key:`Nunakauyaq (Toksook Bay)`, text:`Nunakauyaq (Toksook Bay)`, value:`Nunakauyaq (Toksook Bay)`},
    {key:`Nunam Iqua (Nunam Iqua)`, text:`Nunam Iqua (Nunam Iqua)`, value:`Nunam Iqua (Nunam Iqua)`},
    {key:`Nunapicuaq (Nunapitchuk)`, text:`Nunapicuaq (Nunapitchuk)`, value:`Nunapicuaq (Nunapitchuk)`},
    {key:`Nuuriileng (Newhalen)`, text:`Nuuriileng (Newhalen)`, value:`Nuuriileng (Newhalen)`},
    {key:`Paimiut (Paimiut)`, text:`Paimiut (Paimiut)`, value:`Paimiut (Paimiut)`},
    {key:`Qalirneq (Koliganek)`, text:`Qalirneq (Koliganek)`, value:`Qalirneq (Koliganek)`},
    {key:`Qalqaq (Kalskag)`, text:`Qalqaq (Kalskag)`, value:`Qalqaq (Kalskag)`},
    {key:`Qarr'unaq (Kokhanok)`, text:`Qarr'unaq (Kokhanok)`, value:`Qarr'unaq (Kokhanok)`},
    {key:`Qerrulliik (Kotlik)`, text:`Qerrulliik (Kotlik)`, value:`Qerrulliik (Kotlik)`},
    {key:`Qinuyang (South Naknek)`, text:`Qinuyang (South Naknek)`, value:`Qinuyang (South Naknek)`},
    {key:`Qipneq (Kipnuk)`, text:`Qipneq (Kipnuk)`, value:`Qipneq (Kipnuk)`},
    {key:`Saguyaq (Clark's Point)`, text:`Saguyaq (Clark's Point)`, value:`Saguyaq (Clark's Point)`},
    {key:`Taciq (St. Michael)`, text:`Taciq (St. Michael)`, value:`Taciq (St. Michael)`},
    {key:`Tapraq (Stebbins)`, text:`Tapraq (Stebbins)`, value:`Tapraq (Stebbins)`},
    {key:`Tevyaraq (Crooked Creek)`, text:`Tevyaraq (Crooked Creek)`, value:`Tevyaraq (Crooked Creek)`},
    {key:`Tuntutuliaq (Tuntutuliak)`, text:`Tuntutuliaq (Tuntutuliak)`, value:`Tuntutuliaq (Tuntutuliak)`},
    {key:`Tununeq (Tununak)`, text:`Tununeq (Tununak)`, value:`Tununeq (Tununak)`},
    {key:`Tuulkessaaq (Tuluksak)`, text:`Tuulkessaaq (Tuluksak)`, value:`Tuulkessaaq (Tuluksak)`},
    {key:`Tuutalgarmiut (Pilot Station)`, text:`Tuutalgarmiut (Pilot Station)`, value:`Tuutalgarmiut (Pilot Station)`},
    {key:`Tuyuryaq (Togiak)`, text:`Tuyuryaq (Togiak)`, value:`Tuyuryaq (Togiak)`},
    {key:`Uksurnarli (Portage Creek)`, text:`Uksurnarli (Portage Creek)`, value:`Uksurnarli (Portage Creek)`},
    {key:`Ungalaqliit (Unalakleet)`, text:`Ungalaqliit (Unalakleet)`, value:`Ungalaqliit (Unalakleet)`},
    {key: 'do_not_wish_to_say', text: 'I prefer not to say', value: 'do_not_wish_to_say' },
]


const ageOptions = [
  { key: 'teens', text: '0-19', value: 'teens' },
  { key: 'twenties', text: '20-29', value: 'twenties' },
  { key: 'thirties', text: '30-39', value: 'thirties' },
  { key: 'forties', text: '40-49', value: 'forties' },
  { key: 'fifties', text: '50-59', value: 'fifties' },
  { key: 'sixties', text: '60-69', value: 'sixties' },
  { key: 'seventies', text: '70-79', value: 'seventies' },
  { key: 'eighties', text: '80-89', value: 'eighties' },
  { key: 'nineties', text: '90 or above', value: 'nineties' },
  { key: 'do_not_wish_to_say', text: 'I prefer not to say', value: 'do_not_wish_to_say'},

]


class Recorder extends Component {
	constructor(props) {
        console.log(props)
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
			recordedBlob:[],
			sending:false,
			retrievingRecording:false,
			// returnedTranscript:'',
			returnedTranscript:"",
			recaptchaAllowed:false,
			currentAudioFileToSave:[],
			start:0,
			current:0,
			end:0,
			fileLoaded:false,


            sentence:props.sentence,
            siteLocation:props.siteLocation,
            recaptchaAllowed:false,
            ageProvided:'do_not_wish_to_say',
            genderProvided:'do_not_wish_to_say',
            nameProvided:'',
            villageProvided:'do_not_wish_to_say',
            donateCommonVoiceProvided:false,
            recordingTooLarge:false,

            useTrimmableAudio:false,
            // isRecording:false,
            // setIsRecording:false,
            // recordingBlob:null,

            isLoading: false,
            isRecording: false,
            recordings: []

		}
        this.recorder = null
	}

	// componentDidMount() {
	// 	let eldersList = []
	// 	Object.keys(categories).map((k) => {
	// 		if (k.includes('23.')) {
	// 			eldersList.push(k)
	// 		}
	// 	})
	// 	this.setState({eldersList:eldersList})
	// }


	sendFileFromBlobUrl = async (blob) => {
		const audioBlob = await fetch(blob).then((r) => r.blob());
		const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
		this.sendRecordingForASR(audioFile)
	}

	sendRecordingForASR = (audioFile) => {
		this.setState({retrievingRecording:true})
		console.log(audioFile)
		const formData = new FormData(); // preparing to send to the server
    formData.append('file', audioFile);  // preparing to send to the server
    axios
      .post(API_URL + "yugtunASR", formData)
      .then(response => {
      	console.log(response)
      	// if (response.data) {
      	this.setState({returnedTranscript:response.data.transcription, retrievingRecording:false})
      	// }
      })

	}

	// trimRecording = async () => {

	// 	let audioFile = this.state.currentAudioFileToSave
  //   const startTime = 0; // Start time in seconds
  //   const endTime = 1; // End time in seconds

  //   const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  //   const fileBuffer = await audioFile.arrayBuffer();
  //   const audioBuffer = await audioContext.decodeAudioData(fileBuffer);

  //   // Trim the audio buffer
  //   const trimmedBuffer = this.trimAudioBuffer(audioContext, audioBuffer, startTime, endTime);

  //   // Create a Blob from the trimmed buffer
  //   const trimmedAudioBlob = await this.createBlobFromAudioBuffer(trimmedBuffer);

  //   const newAudioFile = new File([trimmedAudioBlob], 'temp.wav', { type: 'audio/wav' });

  //   this.setState({currentAudioFileToSave:newAudioFile})
  //   // // Create an <audio> element to play the trimmed audio
  //   // const audioElement = document.createElement('audio');
  //   // audioElement.controls = true;
  //   // const audioUrl = URL.createObjectURL(trimmedAudioBlob);
  //   // audioElement.src = audioUrl;

  //   // document.body.appendChild(audioElement);

	// }

	// trimAudioBuffer = (audioContext, buffer, startTime, endTime) => {
	//     const sampleRate = buffer.sampleRate;
	//     const startFrame = startTime * sampleRate;
	//     const endFrame = endTime * sampleRate;
	//     const duration = endTime - startTime;
	//     const channels = buffer.numberOfChannels;

	//     // Create a new AudioBuffer for the trimmed audio
	//     const trimmedBuffer = audioContext.createBuffer(
	//         channels,
	//         (endFrame - startFrame),
	//         sampleRate
	//     );

	//     for (let channel = 0; channel < channels; channel++) {
	//         const sourceData = buffer.getChannelData(channel).subarray(startFrame, endFrame);
	//         trimmedBuffer.getChannelData(channel).set(sourceData);
	//     }

	//     return trimmedBuffer;
	// }

		trimAudio = async () => {
				let startTime = this.state.timeRange.start/1000
				let endTime = this.state.timeRange.end/1000

				// let startTime = 0
				// let endTime = 1

				// console.log(startTime,endTime)
				var bufferToWav = require('../')
				const arrayBuffer = await this.state.currentAudioFileToSave.arrayBuffer()
				// console.log(arrayBuffer)
				var audioContext = new (window.AudioContext || window.webkitAudioContext)()
				var audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const sampleRate = audioBuffer.sampleRate;
        const startOffset = Math.floor(startTime * sampleRate);
        const endOffset = Math.floor(endTime * sampleRate);
        const length = endOffset - startOffset;

        // console.log(audioBuffer.numberOfChannels,length,sampleRate)
        // Process in chunks to avoid memory issues
        const chunkSize = AUDIO_CONFIG.CHUNK_SIZE;
        const trimmedBuffer = audioContext.createBuffer(
            audioBuffer.numberOfChannels,
            length,
            sampleRate
        );

        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
            const channelData = audioBuffer.getChannelData(channel);
            for (let i = 0; i < length; i += chunkSize) {
                const currentChunkSize = Math.min(chunkSize, length - i);
                const chunk = channelData.slice(startOffset + i, startOffset + i + currentChunkSize);
                trimmedBuffer.copyToChannel(chunk, channel, i);

                // Allow UI to update and prevent blocking
                if (i % (chunkSize * 4) === 0) {
                    await new Promise(resolve => setTimeout(resolve, 0));
                    // setButtonLoading(true, `Trimming... ${Math.round((i / length) * 100)}%`);
                }
            }
        }


			const mp3Blob = await this.convertToMp3(trimmedBuffer);
			// let mp3file = new File([mp3Blob], 'recording.mp3');

			// const audioBlob2 = await fetch(mp3Blob).then((r) => r.blob());
			const audioFile2 = new File([mp3Blob], 'voice.mp3', { type: 'audio/mp3' });


      console.log(audioFile2)
			// arrayBuffer = encodeWAV(trimmedBuffer, [opt])
		  // audioContext.decodeAudioData(trimmedBuffer, function (buffer) {
		  //   // encode AudioBuffer to WAV
		  //   var wav = toWav(buffer)

		  //   console.log(wav)
		  //   // this.setState({currentAudioFileToSave:wav})

		  //   // do something with the WAV ArrayBuffer ...
		  // })

      // var wav = bufferToWav(trimmedBuffer)
      if (audioBuffer) {
          audioBuffer = null;
      }
      if (audioContext && audioContext.state !== 'closed') {
          audioContext.close();
          audioContext = null;
      }
      // Clear any object URLs
      // if (elements.audioPlayer.src) {
      //     URL.revokeObjectURL(elements.audioPlayer.src);
      // }
      // if (elements.previewPlayer.src) {
      //     URL.revokeObjectURL(elements.previewPlayer.src);
      // }

      this.setState({currentAudioFileToSave:audioFile2})
        // return trimmedBuffer;
    }

		// cleanup = () => {
    //     if (audioBuffer) {
    //         audioBuffer = null;
    //     }
    //     if (audioContext && audioContext.state !== 'closed') {
    //         audioContext.close();
    //         audioContext = null;
    //     }
    //     // Clear any object URLs
    //     if (elements.audioPlayer.src) {
    //         URL.revokeObjectURL(elements.audioPlayer.src);
    //     }
    //     if (elements.previewPlayer.src) {
    //         URL.revokeObjectURL(elements.previewPlayer.src);
    //     }
    // }

    // window.addEventListener('unload', cleanup);

    convertToMp3 = async (audioBuffer) => {
        if (!audioBuffer || !audioBuffer.numberOfChannels) {
            throw new Error('Invalid audio buffer');
        }

        const channels = audioBuffer.numberOfChannels;
        const sampleRate = audioBuffer.sampleRate;

        // Initialize MP3 encoder with better quality settings
        const mp3encoder = new lamejs.Mp3Encoder(
            channels,
            sampleRate,
            AUDIO_CONFIG.MP3_BITRATE
        );

        const mp3Data = [];
        const sampleBlockSize = AUDIO_CONFIG.CHUNK_SIZE;
        const numSamples = audioBuffer.length;
        let processedSamples = 0;

        // Get audio data
        const channelData = [];
        for (let channel = 0; channel < channels; channel++) {
            channelData[channel] = audioBuffer.getChannelData(channel);
        }

        try {
            for (let i = 0; i < numSamples; i += sampleBlockSize) {
                const currentBlockSize = Math.min(sampleBlockSize, numSamples - i);
                const leftInt16 = new Int16Array(currentBlockSize);
                const rightInt16 = channels > 1 ? new Int16Array(currentBlockSize) : null;

                // Convert samples to Int16
                for (let j = 0; j < currentBlockSize; j++) {
                    // Improved conversion with dithering to reduce quantization noise
                    const dither = (Math.random() * 2 - 1) * 0.5;
                    leftInt16[j] = Math.max(-32768, Math.min(32767,
                        Math.round(channelData[0][i + j] * 32767 + dither)));

                    if (channels > 1) {
                        rightInt16[j] = Math.max(-32768, Math.min(32767,
                            Math.round(channelData[1][i + j] * 32767 + dither)));
                    }
                }

                // Encode the block
                const mp3buf = channels > 1
                    ? mp3encoder.encodeBuffer(leftInt16, rightInt16)
                    : mp3encoder.encodeBuffer(leftInt16);

                if (mp3buf && mp3buf.length > 0) {
                    mp3Data.push(mp3buf);
                }

                processedSamples += currentBlockSize;

                // Update progress and allow UI to update
                if (i % (sampleBlockSize * 4) === 0) {
                    await new Promise(resolve => setTimeout(resolve, 0));
                    const progress = Math.round((processedSamples / numSamples) * 100);
                    // setButtonLoading(true, `Converting... ${progress}%`);
                }
            }

            const mp3buf = mp3encoder.flush();
            if (mp3buf && mp3buf.length > 0) {
                mp3Data.push(mp3buf);
            }

            return new Blob(mp3Data, { type: 'audio/mp3' });

        } catch (error) {
            console.error('MP3 conversion error:', error);
            throw new Error('Failed to convert audio to MP3: ' + error.message);
        }
    }


  createBlobFromAudioBuffer = (audioBuffer) => {
      return new Promise((resolve) => {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const audioBufferSource = audioContext.createBufferSource();
          audioBufferSource.buffer = audioBuffer;

          audioBufferSource.connect(audioContext.destination);

          audioBufferSource.onended = () => {
              const audioData = audioBuffer.getChannelData(0);
              const audioBlob = new Blob([audioData], { type: 'audio/wav' });
              resolve(audioBlob);
          };

          audioBufferSource.start();
          audioBufferSource.stop(audioContext.currentTime + audioBuffer.duration);
      });
  }

	seeRecording = async (recording, blob) => {
		console.log(recording, blob.size)
        if (blob.size < 450000) {
            const audioBlob = await fetch(recording).then((r) => r.blob());
            const audioFile = new File([blob], 'voice.wav', { type: 'audio/wav' });
            console.log(audioFile.duration)
            this.setState({currentAudioFileToSave:audioFile})
        } else {
            this.setState({recordingTooLarge:true,currentAudioFileToSave:[]})
        }
	}

	sendRecordingToSave = async (recording) => {
		console.log('SAVEsent',recording)
		this.setState({sendingRecording:true})
		const audioBlob = await fetch(recording).then((r) => r.blob());
		const audioFile = new File([audioBlob], 'voice.mp3', { type: 'audio/mp3' });
		const formData = new FormData(); // preparing to send to the server
        formData.append('file', audioFile);  // preparing to send to the server
		formData.append("data", JSON.stringify({"sentence":this.state.sentence,"name": this.state.nameProvided,"gender":this.state.genderProvided,"age": this.state.ageProvided,"village": this.state.villageProvided,"donate": this.state.donateCommonVoiceProvided,"siteLocation": this.state.siteLocation}));
    axios
      .post(API_URL + "yugtunCrowdsource", formData)
      .then(response => {
      	console.log(response)
        this.setState({sendingRecording:false})
      	// if (response.data) {
      	// this.setState({returnedTranscript:response.data.transcription, retrievingRecording:false})
      	// }
      })
	}
          
    // startRecording = async () => {
    //     this.recorder = new MultiRecorder({
    //       format: "mp3", // or "mp3"
    //       sampleRate: 48000,
    //       wasmURL: vmsgWasm,
    //     });
    //     // console.log(this.recorderRef)            
    //     // this.recorderRef.current = recorder;
    //     await this.recorder.init();
    //     await this.recorder.startRecording();
    //     this.setState({setIsRecording:true});
    // };

    // stopRecording = async () => {
    //     if (!this.recorder) return;
    //     // console.log(this.recorder)
    //     const blob = await this.recorder.stopRecording();
    //     // console.log(this.recorder)
    //     await this.recorder.close();
    //     this.recorder = null;
    //     this.setState({setIsRecording:false, recordingBlob:blob, blobUrl: URL.createObjectURL(blob)});
    // };

      // record = async () => {
      //   this.setState({ isLoading: true });

      //   if (this.state.isRecording) {
      //     const blob = await recorder.stopRecording();
      //     this.setState({
      //       isLoading: false,
      //       isRecording: false,
      //       recordings: this.state.recordings.concat(URL.createObjectURL(blob))
      //     });
      //   } else {
      //     try {
      //       await recorder.initAudio();
      //       await recorder.initWorker();
      //       recorder.startRecording();
      //       this.setState({ isLoading: false, isRecording: true });
      //     } catch (e) {
      //       console.error(e);
      //       this.setState({ isLoading: false });
      //     }
      //   }
      // };

	render() {




		console.log(this.state)
		return (
            <div>
{/*            <button disabled={this.state.isLoading} onClick={this.record}>
              {this.state.isRecording ? "Stop" : "Record"}
            </button>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {this.state.recordings.map(url => (
                <li key={url}>
                  <audio src={url} controls />
                </li>
              ))}
            </ul>*/}
            <RecorderHook />
		    <ReactMediaRecorder
		      audio
		      onStop={this.seeRecording}
              onStart={()=>{this.setState({recordingTooLarge:false})}}
		      render={({ status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl }) => (
		        <div style={{textAlign:'center'}}>
                    <div style={{fontSize:'14px',marginLeft:'42px'}}>Submit a Recording for Yugtun.com</div>
				      <div style={{fontSize:'26px',margin:'25px',marginBottom:'7px'}}>{this.state.sentence}</div>
                    
		          <div>
				      </div>
		        	{mediaBlobUrl !== null && this.state.currentAudioFileToSave.length !== 0 ?
		        		<div style={{textAlign:'center',height:'85px'}}>
		        			{'name' in this.state.currentAudioFileToSave ?
		        				<div>
                                    {this.state.useTrimmableAudio ?
    		        					<Mirt onChange={(timeRange) => {this.setState({timeRange:timeRange})}} file={this.state.currentAudioFileToSave} />
                                        :
                                        <audio controls style={{width:(window.innerWidth < 480 ? '100%':'50%'),height:40}} src={mediaBlobUrl} />
                                    }
							        <div style={{marginTop:'5px'}}>
                                        {this.state.useTrimmableAudio ?
							        	    <Button onClick={()=>{this.trimAudio()}}>Trim Recording</Button>
                                            :
                                            false
                                        }
							          <Button disabled={this.state.retrievingRecording} basic onClick={clearBlobUrl}>{'Redo'}</Button>
							        </div>
							      </div>
			        			:
			        			null
			        		}
					      </div>
				        :
                        <div style={{height:'85px'}}>
			            {status == 'recording' ?
				          <Icon size='big' color='red' style={{cursor:'pointer',marginTop:7}} circular name='stop' onClick={stopRecording} />
				          :
				          <Icon size='big' color='grey' style={{cursor:'pointer',marginTop:7}} circular name='microphone' onClick={startRecording} />
				        }
                        {this.state.recordingTooLarge ?
                            <div style={{color:'red'}}>Recording was too long (>30 seconds)</div>
                            :
                            null
                        }
                        </div>
				      }

                    <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                      <Form loading={this.state.sendingRecording} style={{width:'350px'}}>
                        <FormSelect style={{fontWeight:'normal'}} label='Qavcircit? (optional)' onChange={(event, data)=>this.setState({ageProvided:data.value})} options={ageOptions} placeholder='20-29' />
                        <FormSelect label='Yuurucimikun naliucia? (optional)' onChange={(event, data)=>this.setState({genderProvided:data.value})} options={genderOptions} placeholder='Male' />
                        <FormField style={{marginBottom:4}}>
                          <label>Kituusit? (optional)</label>
                          <input maxlength="40" onChange={(data)=>this.setState({nameProvided:data.target.value})} placeholder='Name' />
                        </FormField>
                        <div style={{marginBottom:10, color:'#bbbbbb',fontSize:'13px'}}>Your name will never be shared online.</div>
                        <label style={{fontSize:'13px'}}>Camiungusit? (optional)</label>
                        <Dropdown style={{marginBottom:14,marginTop:4}} fluid search selection onChange={(event, data)=>this.setState({villageProvided:data.value})} options={hometownOptions} placeholder='Village or Dialect' />
                        <FormField>
                          <Checkbox onChange={(event, data)=>this.setState({donateCommonVoiceProvided:data.checked})} style={{paddingTop:'3px',marginRight:'6px',fontSize:'13px'}}/> <span>{'I would also like to submit this clip to the '}</span><a target="_blank" href='https://commonvoice.mozilla.org/en'>Mozilla Data Collective</a><span>{' (optional)'}</span>
                        </FormField>
                            <ReCAPTCHA
                                  style={{margin:(window.innerWidth < 480 ? 0:22),marginBottom:15}}
                                sitekey="6LekfyIsAAAAAMwm2_wOCDIlJ8i8YYrnZd0fYypu"
                                onChange={()=>{this.setState({recaptchaAllowed:true})}}
                                onErrored={()=>{this.setState({recaptchaAllowed:false})}}
                                onExpired={()=>{this.setState({recaptchaAllowed:false})}}
                              />
                        <Button 
                         // disabled={mediaBlobUrl === null}
                         disabled={!this.state.recaptchaAllowed || mediaBlobUrl == null}
                         onClick={()=>this.sendRecordingToSave(mediaBlobUrl)}>{'Submit'}</Button>
                      </Form>
                    </div>

		        </div>
		      )}
		    />
        </div>
		);
	}
}
export default Recorder;