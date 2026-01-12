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
// import { ReactMediaRecorder } from "react-media-recorder";
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
// import Mirt from 'react-mirt';
// import 'react-mirt/dist/css/react-mirt.css';
// import vmsg from "vmsg";
// import { MultiRecorder, type AudioFormat } from "react-ts-audio-recorder";
// import vmsgWasm from "react-ts-audio-recorder/assets/vmsg.wasm?url";
// import Dropzone from 'react-dropzone'
import useRecorder  from '../useRecorderEdited.js';
  
  const RecorderHook = (props) => {
    // console.log('props',props)
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

    const sentence = props.sentence
    const siteLocation = props.siteLocation
    const maximumClipSeconds = 20

    const [recaptchaAllowed, setrecaptchaAllowed] = useState(false);
    const [ageProvided, setageProvided] = useState('do_not_wish_to_say');
    const [genderProvided, setgenderProvided] = useState('do_not_wish_to_say');
    const [villageProvided, setvillageProvided] = useState('do_not_wish_to_say');
    const [nameProvided, setnameProvided] = useState('');
    const [donateCommonVoiceProvided, setdonateCommonVoiceProvided] = useState(false);
    const [recordingSent, setrecordingSent] = useState(false);

    // var recaptchaAllowed = false
    // var ageProvided = 'do_not_wish_to_say'
    // var genderProvided = 'do_not_wish_to_say'
    // var nameProvided = ''
    // var villageProvided = 'do_not_wish_to_say'
    // var donateCommonVoiceProvided = false

    // var recordingSent = false

    const genderOptions = [
      { key: 'male_masculine', text: 'Male / Masculine', value: 'male_masculine' },
      { key: 'female_feminine', text: 'Female / Feminine', value: 'female_feminine' },
      { key: "'non-binary'", text: 'Non-Binary', value: "'non-binary'" },
      { key: "do_not_wish_to_say", text: 'I prefer not to say', value: "do_not_wish_to_say" },
    ]

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


    const onButtonClick = async (audioURL) => {
        // console.log(audioURL)

        // this.setState({sendingRecording:true})
        const audioBlob = await fetch(audioURL).then((r) => r.blob());
        const audioFile = new File([audioBlob], 'voice.mp3', { type: 'audio/mp3' });
        const formData = new FormData(); // preparing to send to the server
        formData.append('file', audioFile);  // preparing to send to the server
        formData.append("data", JSON.stringify({"sentence":sentence,"name": nameProvided,"gender":genderProvided,"age": ageProvided,"village": villageProvided,"donate": donateCommonVoiceProvided,"siteLocation": siteLocation}));
        // console.log(formData)
        axios
          .post(API_URL + "yugtunCrowdsource", formData)
          .then(response => {
            console.log(response)

            setrecordingSent(true)
            // if (response.data) {
            // this.setState({returnedTranscript:response.data.transcription, retrievingRecording:false})
            // }
          })
        

        // send audio file to server or process it here
    }
  
    return (

    <div style={{textAlign:'center'}}>
    {console.log(audioLevel)}
{/*
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
              <span className="text-gray-900">Recording State: {recordingState}</span>*/}

            {recordingSent ?
              <div style={{fontSize:'18px', fontStyle:'italic', margin:10}}> Recording Sent. Quyana! </div>
              :
              <div>
                <div style={{fontSize:'14px',marginLeft:'42px'}}>Submit a Recording for Yugtun.com</div>
                <div style={{fontSize:'25px',margin:(sentence.length > 20 ? '10px':'25px'),marginBottom:'7px'}}>{sentence}</div>
                <div style={{textAlign:'center',height:'85px'}}>
                {
                  recordingState === "stopped" && audioFile && timeElapsed <= maximumClipSeconds ?
                    <div>
                      <audio controls style={{height:40}} src={audioURL} />
                      <div style={{marginTop:'5px'}}>
                        <Button basic onClick={resetRecording}>{'Reset'}</Button>
                      </div>
                    </div>
                    :
                    <div style={{height:'85px'}}>
                      {audioFile && timeElapsed > maximumClipSeconds && recordingState == 'stopped' ?
                        <div style={{color:'red'}}>Recording was too long (>20 seconds)</div>
                        :
                        null
                      }

                      {recordingState == 'stopped' || recordingState == 'idle' ?
                        <Icon size='big' color='grey' style={{cursor:'pointer',marginTop:7}} circular name='microphone' onClick={startRecording} />
                        :
                        <Icon size='big' color='red' style={{cursor:'pointer',marginTop:7}} circular name='stop' onClick={stopRecording} />
                      }

                    </div>
                }
              </div>
                <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                    <Form style={{width:'350px'}}>
                      <FormSelect style={{fontWeight:'normal'}} label='Qavcircit? (optional)' onChange={(event, data)=>setageProvided(data.value)} options={ageOptions} placeholder='20-29' />
                      <FormSelect label='Yuurucimikun naliucia? (optional)' onChange={(event, data)=>setgenderProvided(data.value)} options={genderOptions} placeholder='Male' />
                      <FormField style={{marginBottom:4}}>
                        <label>Kituusit? (optional)</label>
                        <input maxlength="40" onChange={(data)=>setnameProvided(data.target.value)} placeholder='Name' />
                      </FormField>
                      <div style={{marginBottom:10, color:'#bbbbbb',fontSize:'13px'}}>Your name will never be shared online.</div>
                      <label style={{fontSize:'13px'}}>Camiungusit? (optional)</label>
                      <Dropdown style={{marginBottom:14,marginTop:4}} fluid search selection onChange={(event, data)=>setvillageProvided(data.value)} options={hometownOptions} placeholder='Village or Dialect' />
                      <FormField>
                        <Checkbox onChange={(event, data)=>setdonateCommonVoiceProvided(data.checked)} style={{paddingTop:'3px',marginRight:'6px',fontSize:'13px'}}/> <span>{'I would also like to submit this clip to the '}</span><a target="_blank" href='https://commonvoice.mozilla.org/en'>Mozilla Data Collective</a><span>{' (optional)'}</span>
                      </FormField>
                          <ReCAPTCHA
                                style={{margin:(window.innerWidth < 480 ? 0:22),marginBottom:15}}
                              sitekey="6LekfyIsAAAAAMwm2_wOCDIlJ8i8YYrnZd0fYypu"
                              onChange={()=>{setrecaptchaAllowed(true)}}
                              onErrored={()=>{setrecaptchaAllowed(false)}}
                              onExpired={()=>{setrecaptchaAllowed(false)}}
                            />
                      <Button 
                       // disabled={this.state.newBlobUrl === null}
                       disabled={!recaptchaAllowed || audioFile == null || timeElapsed > maximumClipSeconds}
                       onClick={()=>onButtonClick(audioURL)}>{'Submit'}</Button>
                    </Form>
                </div>
              </div>
              }
    </div>
    );
  };

export default RecorderHook;